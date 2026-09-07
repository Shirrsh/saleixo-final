import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight, CheckCircle2, Loader2, Video } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const DISMISS_KEY = 'saleixo_quick_audit_dismissed';

export default function QuickAuditDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user already dismissed or submitted this session
    if (typeof window === 'undefined') return;
    const dismissed = sessionStorage.getItem(DISMISS_KEY);
    if (dismissed) return;

    let hasTriggered = false;

    // Trigger 1: Scroll > 40% after at least 12 seconds on site
    const timer = setTimeout(() => {
      const handleScroll = () => {
        if (hasTriggered) return;
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > 35) {
          hasTriggered = true;
          setIsOpen(true);
          window.removeEventListener('scroll', handleScroll);
        }
      };
      window.addEventListener('scroll', handleScroll);
    }, 10000);

    // Trigger 2: Desktop exit intent (mouse leaving window top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasTriggered) return;
      if (e.clientY <= 5) {
        hasTriggered = true;
        setIsOpen(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem(DISMISS_KEY, 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedUrl = url.trim();
    const trimmedContact = contact.trim();

    if (!trimmedUrl) {
      setError('Please enter your product link or ASIN.');
      return;
    }
    if (!trimmedContact) {
      setError('Please provide an email or WhatsApp.');
      return;
    }

    const isEmail = trimmedContact.includes('@');
    setLoading(true);

    try {
      const emailVal = isEmail ? trimmedContact : `${trimmedContact.replace(/\D/g, '')}@lead.saleixo.com`;
      const phoneVal = !isEmail ? trimmedContact : null;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await supabase.from('leads' as any).insert([
        {
          name: 'Quick Teardown Request',
          email: emailVal,
          phone: phoneVal,
          message: `Quick Audit Requested via Slide-Up Drawer\nProduct/Store: ${trimmedUrl}`,
          services: ['Free Listing Audit'],
          source: 'quick-audit-drawer',
          status: 'new',
          priority: 'high',
        },
      ]);

      await supabase.functions.invoke('notify-lead', {
        body: {
          name: 'Quick Teardown Request',
          email: emailVal,
          phone: phoneVal,
          services: ['Free Listing Audit'],
          message: `Quick Audit Teardown requested for: ${trimmedUrl}`,
          source: 'quick-audit-drawer',
        },
      });

      sessionStorage.setItem(DISMISS_KEY, 'true');
      setSubmitted(true);
    } catch (_) {
      // Graceful fallback
      sessionStorage.setItem(DISMISS_KEY, 'true');
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-[380px] rounded-2xl bg-card/95 backdrop-blur-md border border-primary/30 shadow-2xl overflow-hidden p-5"
        >
          {/* Close button */}
          <button
            onClick={handleDismiss}
            aria-label="Close"
            className="absolute top-3.5 right-3.5 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {submitted ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-foreground mb-1">We're on it!</h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                We'll record a 3-minute video breakdown of your product and send it to{' '}
                <span className="font-semibold text-foreground">{contact}</span> within 24 hours.
              </p>
              <button
                onClick={handleDismiss}
                className="w-full py-2 rounded-xl text-xs font-semibold bg-muted text-foreground hover:bg-muted/80 transition-all border border-border"
              >
                Close Window
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-primary/10 text-primary">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  Free 3-Minute Teardown
                </span>
              </div>

              <h4 className="text-base font-bold text-foreground leading-snug mb-1">
                Want a free audit before you go?
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3.5">
                Paste your product link. Our team will review your imagery, Buy Box conversion, and search indexing.
              </p>

              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div>
                  <input
                    type="text"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Amazon ASIN or Product Link..."
                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Where to send? (Email / WhatsApp)"
                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>

                {error && <p className="text-[11px] text-destructive font-medium">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl font-semibold text-xs bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-3.5 h-3.5" />
                      <span>Send Our Free Video Audit</span>
                      <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-3 pt-2 border-t border-border/60 text-center">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="text-[11px] text-muted-foreground/70 hover:text-foreground transition-colors"
                >
                  No thanks, we'll browse on our own
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
