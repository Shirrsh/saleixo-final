import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, CheckCircle2, Video, Calendar, Loader2, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { openCalendarBooking } from '@/lib/booking';
import { cn } from '@/lib/utils';

interface InstantAuditBarProps {
  className?: string;
  id?: string;
}

export default function InstantAuditBar({ className = '', id = 'instant-audit-bar' }: InstantAuditBarProps) {
  const [url, setUrl] = useState('');
  const [contact, setContact] = useState('');
  const [brandName, setBrandName] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-detect marketplace badge from URL
  const detectedPlatform = React.useMemo(() => {
    const lower = url.toLowerCase();
    if (lower.includes('amazon.') || /^[B0-9]{10}$/i.test(url.trim())) return 'Amazon';
    if (lower.includes('walmart.')) return 'Walmart';
    if (lower.includes('myshopify.com') || lower.includes('shopify')) return 'Shopify';
    if (lower.includes('etsy.')) return 'Etsy';
    return null;
  }, [url]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedUrl = url.trim();
    const trimmedContact = contact.trim();

    if (!trimmedUrl) {
      setError('Please provide your product link, ASIN, or store URL.');
      return;
    }

    if (!trimmedContact) {
      setError('Please provide an email or WhatsApp number so we can send the audit.');
      return;
    }

    const isEmail = trimmedContact.includes('@');
    const isPhone = /^[+\d\s\-()]{7,}$/.test(trimmedContact);

    if (!isEmail && !isPhone) {
      setError('Please enter a valid email address or phone number.');
      return;
    }

    setLoading(true);

    try {
      const emailVal = isEmail ? trimmedContact : `${trimmedContact.replace(/\D/g, '')}@lead.saleixo.com`;
      const phoneVal = !isEmail ? trimmedContact : null;

      // 1. Insert into Supabase leads table
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await supabase.from('leads' as any).insert([
        {
          name: brandName.trim() || 'Instant Audit Request',
          email: emailVal,
          phone: phoneVal,
          business: brandName.trim() || null,
          message: `Product / Store Link: ${trimmedUrl}\nDetected Platform: ${detectedPlatform || 'Unspecified'}\nPreferred Contact: ${trimmedContact}`,
          services: ['Free Listing Audit'],
          source: 'instant-audit-bar',
          status: 'new',
          priority: 'high',
        },
      ]);

      // 2. Log activity
      await supabase.from('activity_log').insert({
        action: `New Instant Listing Audit requested: ${trimmedUrl}`,
        item_type: 'lead',
      });

      // 3. Trigger email notification edge function (Zoho SMTP)
      await supabase.functions.invoke('notify-lead', {
        body: {
          name: brandName.trim() || 'Instant Audit Request',
          email: emailVal,
          phone: phoneVal,
          services: ['Free Listing Audit'],
          message: `Instant Audit requested for product/store: ${trimmedUrl}`,
          source: 'instant-audit-bar',
        },
      });
    } catch (_) {
      // Graceful fallback — don't block user experience
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div id={id} className={cn('relative w-full max-w-4xl mx-auto', className)}>
      <div className="relative rounded-3xl p-6 sm:p-8 bg-card/90 backdrop-blur-md border border-primary/30 shadow-xl overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-1/4 w-96 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/4 w-80 h-36 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center text-center py-6 sm:py-8"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                Audit Request Received!
              </h3>
              <p className="text-sm text-muted-foreground max-w-lg mb-6 leading-relaxed">
                Our lead marketplace strategist is analyzing your images, keyword indexing, and conversion rate for{' '}
                <span className="font-semibold text-foreground break-all">{url}</span>. You will receive your 3-minute video breakdown within 24 hours at{' '}
                <span className="font-semibold text-foreground">{contact}</span>.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="https://wa.me/917011441159?text=Hi%2C%20we%20just%20requested%20a%20free%20listing%20audit%20for%20our%20product%3A%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-sm"
                >
                  <Video className="w-4 h-4" /> Message Us on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => openCalendarBooking()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-muted text-foreground hover:bg-muted/80 border border-border transition-all"
                >
                  <Calendar className="w-4 h-4 text-primary" /> Book 15-Min Strategy Call
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Free 3-Point Teardown — Zero Commitment</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                    Get a Free Visual & SEO Listing Audit
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Paste your Amazon ASIN, Walmart link, or Shopify URL. We’ll show you where you're losing Buy Boxes and sales.
                  </p>
                </div>

                {detectedPlatform && (
                  <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/30 animate-in fade-in">
                    Detected: {detectedPlatform}
                  </span>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  {/* URL / ASIN Input */}
                  <div className="md:col-span-6 relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                      <Search className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Paste Amazon ASIN or Product Link..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all outline-none"
                    />
                  </div>

                  {/* Contact Input (Email or WhatsApp) */}
                  <div className="md:col-span-4">
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="Your Email or WhatsApp..."
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-full min-h-[46px] px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50 whitespace-nowrap"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Scanning...</span>
                        </>
                      ) : (
                        <>
                          <span>Audit Free</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-xs font-medium text-destructive mt-2 animate-in fade-in">
                    {error}
                  </p>
                )}

                {/* Micro proof points */}
                <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 100% Free · No sales pitch
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Delivered within 24 hours
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Visual creative & A9 search diagnosis
                  </span>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
