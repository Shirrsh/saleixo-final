import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles, ShieldCheck, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface PricingLeadGateProps {
  onUnlock: () => void;
  className?: string;
}

export const PricingLeadGate: React.FC<PricingLeadGateProps> = ({ onUnlock, className }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    marketplace: 'Amazon (US & Global)',
    storeUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      setError('Please enter a valid work or business email.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Insert into Supabase leads table
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await supabase.from('leads' as any).insert([{
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        business: form.storeUrl.trim() || null,
        message: `Platform: ${form.marketplace}\nStore URL / ASIN: ${form.storeUrl.trim() || 'N/A'}\nUnlocked 2026 Transparent Pricing Rate Card`,
        services: ['Pricing Gate Unlock', form.marketplace],
        source: 'pricing-gate-unlock',
        status: 'new',
        priority: 'high',
      }]);

      // 2. Log activity
      await supabase.from('activity_log').insert({
        action: `Pricing rate card unlocked by ${form.name.trim()} (${form.email.trim()})`,
        item_type: 'lead',
      });

      // 3. Dispatch instant email notification via notify-lead edge function
      await supabase.functions.invoke('notify-lead', {
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          services: ['Pricing Rate Card Unlock', form.marketplace],
          message: `Client unlocked full pricing rate card.\nName: ${form.name.trim()}\nEmail: ${form.email.trim()}\nPhone/WhatsApp: ${form.phone.trim() || 'N/A'}\nMarketplace: ${form.marketplace}\nStore / Link: ${form.storeUrl.trim() || 'N/A'}`,
          source: 'pricing-gate-unlock',
        },
      });
    } catch (err) {
      console.error('Lead submission note:', err);
      // Fail gracefully so the customer is never locked out of pricing if network flinches
    } finally {
      // 4. Persist unlock state locally
      if (typeof window !== 'undefined') {
        localStorage.setItem('saleixo_pricing_unlocked', 'true');
        localStorage.setItem('saleixo_lead_name', form.name.trim());
        localStorage.setItem('saleixo_lead_email', form.email.trim());
      }
      setSuccess(true);
      setTimeout(() => {
        setLoading(false);
        onUnlock();
      }, 600);
    }
  };

  return (
    <div className={cn('relative z-20 max-w-xl mx-auto', className)}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl border border-border bg-card/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-primary/10 relative overflow-hidden"
      >
        {/* Subtle accent glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="text-center mb-6 relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-3 shadow-inner">
            <Lock className="w-5 h-5" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border mb-3">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>2026 Transparent Studio Rates</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Unlock Full Pricing & Sprints
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
            We maintain 100% transparent pricing for serious brand owners. Enter your details below to instantly reveal our monthly retainers, 14-day launch sprints, and on-demand studio deliverables.
          </p>
        </div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-3"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-500 mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Pricing Unlocked!</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Revealing full rate card and sprint packages now...
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {error && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Sarah Jenkins"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground text-xs placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Business Email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="sarah@yourbrand.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground text-xs placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground text-xs placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Primary Platform <span className="text-primary">*</span>
                </label>
                <select
                  name="marketplace"
                  value={form.marketplace}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                >
                  <option value="Amazon (US & Global)">Amazon (US & Global)</option>
                  <option value="Shopify / DTC Store">Shopify / DTC Store</option>
                  <option value="Walmart Marketplace">Walmart Marketplace</option>
                  <option value="Etsy / Handmade">Etsy / Handmade</option>
                  <option value="Multi-Marketplace / Other">Multi-Marketplace / Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Store URL or Amazon Brand / ASIN <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <input
                type="text"
                name="storeUrl"
                value={form.storeUrl}
                onChange={handleChange}
                placeholder="yourbrand.com or amazon.com/dp/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground text-xs placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-95 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Unlocking Rate Card...</span>
                </>
              ) : (
                <>
                  <span>Unlock Full Pricing Instantly</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-3 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Instant Unlock
              </span>
              <span>·</span>
              <span>Zero Spam Guarantee</span>
              <span>·</span>
              <span>Direct Studio Pricing</span>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default PricingLeadGate;
