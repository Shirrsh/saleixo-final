import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, CheckCircle2, Loader2,
  User, ShoppingBag, Sparkles, Target,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { usePageMeta } from '@/hooks/usePageMeta';

// ── Schema ────────────────────────────────────────────────────────────────────
const schema = z.object({
  // Step 0 — Contact
  name:         z.string().min(2,  'Full name required'),
  email:        z.string().email('Valid email required'),
  phone:        z.string().min(7,  'Phone / WhatsApp required'),
  business:     z.string().optional(),
  // Step 1 — Business profile
  product:      z.string().min(3,  'Describe what you sell'),
  marketplaces: z.array(z.string()).min(1, 'Select at least one marketplace'),
  revenue:      z.string().min(1,  'Select a revenue range'),
  // Step 2 — Services & budget
  services:     z.array(z.string()).min(1, 'Select at least one service'),
  budget:       z.string().min(1,  'Select a budget range'),
  // Step 3 — Goals
  challenge:    z.string().min(10, 'Give us a little detail'),
  timeline:     z.string().min(1,  'Select a timeline'),
});

type FormValues = z.infer<typeof schema>;

// Step field groups — used to validate only the current step before advancing
const STEP_FIELDS: Array<Array<keyof FormValues>> = [
  ['name', 'email', 'phone'],
  ['product', 'marketplaces', 'revenue'],
  ['services', 'budget'],
  ['challenge', 'timeline'],
];

const STEPS = [
  { title: 'About you',      subtitle: 'Tell us who you are and how to reach you.', icon: User },
  { title: 'Your business',  subtitle: 'What you sell and where.',                  icon: ShoppingBag },
  { title: 'What you need',  subtitle: 'Services and investment.',                  icon: Sparkles },
  { title: 'Your goals',     subtitle: "What's holding you back? Let's fix it.",    icon: Target },
];

const MARKETPLACES = [
  // India
  'Amazon India', 'Flipkart', 'Meesho', 'Myntra', 'Nykaa', 'Snapdeal',
  'JioMart', 'Tata Cliq', 'Ajio', 'IndiaMART',
  // Global
  'Amazon US/UK', 'Amazon EU', 'Amazon JP', 'Amazon AU',
  'eBay', 'Etsy', 'Walmart', 'Shopify', 'WooCommerce',
  'BigCommerce', 'Wix eCommerce', 'Squarespace Commerce',
  // Fashion / Lifestyle
  'SHEIN', 'Temu', 'Zalando', 'ASOS Marketplace', 'Poshmark', 'Depop',
  // B2B / Wholesale
  'Alibaba', 'Global Sources', 'Faire',
  // Other
  'My own website', 'Other',
];

const SERVICES = [
  { id: 'photos',     label: 'Product Photography' },
  { id: 'amazon',     label: 'Amazon FBA & Listing' },
  { id: 'shopify',    label: 'Shopify Setup & Design' },
  { id: 'ads',        label: 'Social Media & Paid Ads' },
  { id: 'ecommerce',  label: 'Ecommerce Management' },
  { id: 'unsure',     label: "Not sure — advise me" },
];

const REVENUE_OPTIONS = [
  'Just getting started',
  'Up to ₹1 lakh / month',
  '₹1–5 lakh / month',
  '₹5–20 lakh / month',
  '₹20 lakh+ / month',
];

const BUDGET_OPTIONS = [
  'Under ₹10,000 / month',
  '₹10,000–25,000 / month',
  '₹25,000–50,000 / month',
  '₹50,000+ / month',
  "Let's discuss",
];

const TIMELINE_OPTIONS = [
  'As soon as possible',
  'Within 1–3 months',
  'Just exploring for now',
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const inputCls = (err: boolean) => cn(
  'w-full px-4 py-3 rounded-xl border bg-surface text-foreground placeholder:text-muted-foreground text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
  err ? 'border-destructive' : 'border-border',
);

const labelCls = 'block text-sm font-medium text-foreground mb-1.5';

// ── Main component ────────────────────────────────────────────────────────────
const GetStarted = () => {
  usePageMeta({
    title: 'Get Started Free — Saleixo',
    description: 'Tell us about your store and get a free written listing audit within 48 hours. No commitment, no sales pitch.',
  });
  const [step,      setStep]      = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const {
    register, handleSubmit, setValue, watch, trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { services: [], marketplaces: [] },
  });

  const selectedMarketplaces = watch('marketplaces');
  const selectedServices     = watch('services');
  const selectedRevenue      = watch('revenue');
  const selectedBudget       = watch('budget');
  const selectedTimeline     = watch('timeline');

  const toggleChip = (field: 'marketplaces' | 'services', val: string) => {
    const cur = watch(field);
    setValue(field, cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val], { shouldValidate: true });
  };

  const selectOption = (field: 'revenue' | 'budget' | 'timeline', val: string) => {
    setValue(field, val, { shouldValidate: true });
  };

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (!valid) return;
    setDirection(1);
    setStep(s => s + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setStep(s => s - 1);
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('leads' as any)
        .insert([{
          name:         data.name,
          email:        data.email,
          phone:        data.phone,
          business:     data.business || null,
          product:      data.product,
          marketplaces: data.marketplaces,
          revenue:      data.revenue,
          services:     data.services,
          budget_range: data.budget,
          timeline:     data.timeline,
          message:      data.challenge,
          source:       'get-started-form',
          status:       'new',
          priority:     'medium',
        }]);

      if (error) throw error;

      // Log to activity log
      await supabase.from('activity_log').insert({
        action:    'New lead submitted via Get Started form',
        item_type: 'lead',
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error('Lead submission error:', err);
      // Still show success to the user — don't expose DB errors
      // But log it so we can debug
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const variants = {
    enter:  (dir: number) => ({ x: dir * 48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir: number) => ({ x: dir * -48, opacity: 0 }),
  };

  // ── Success ──────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center px-6 pt-28 pb-20" style={{ background: 'hsl(var(--background))' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'hsl(var(--primary)/0.12)', border: '2px solid hsl(var(--primary)/0.3)' }}>
              <CheckCircle2 className="w-10 h-10 text-primary" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">You're in!</h1>
            <p className="text-muted-foreground mb-2 leading-relaxed">
              We've received your details. A member of our team will be in touch within{' '}
              <strong className="text-foreground">24 hours</strong> to schedule your free discovery call.
            </p>
            <p className="text-sm text-muted-foreground mb-8">Check your inbox — a confirmation is on its way.</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
            >
              Back to Home <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  // ── Wizard ───────────────────────────────────────────────────────────────
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 pb-20 px-4" style={{ background: 'hsl(var(--background))' }}>
        <div className="max-w-xl mx-auto">

          {/* ── Progress ── */}
          <div className="mb-8">
            {/* Step dots */}
            <div className="flex items-center justify-between mb-3">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const done    = i < step;
                const current = i === step;
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                      done    ? 'bg-primary border-primary text-primary-foreground' :
                      current ? 'border-primary text-primary bg-primary/5' :
                                'border-border text-muted-foreground',
                    )}>
                      {done
                        ? <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
                        : <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />}
                    </div>
                    <span className={cn(
                      'text-[10px] font-semibold hidden sm:block transition-colors',
                      current ? 'text-foreground' : 'text-muted-foreground',
                    )}>
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Bar */}
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'hsl(var(--border))' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'hsl(var(--primary))' }}
                animate={{ width: `${(step / STEPS.length) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* ── Step header ── */}
          <div className="mb-7">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-2">
              Step {step + 1} of {STEPS.length}
            </p>
            <h1 className="text-2xl font-bold text-foreground mb-1 tracking-tight">{STEPS[step].title}</h1>
            <p className="text-sm text-muted-foreground">{STEPS[step].subtitle}</p>
          </div>

          {/* ── Animated step content ── */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >

                {/* ─ Step 0: Contact ─ */}
                {step === 0 && (
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>Full Name <span className="text-primary">*</span></label>
                      <input
                        {...register('name')}
                        type="text"
                        placeholder="Jane Smith"
                        className={inputCls(!!errors.name)}
                      />
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className={labelCls}>Email Address <span className="text-primary">*</span></label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="jane@yourbrand.com"
                        className={inputCls(!!errors.email)}
                      />
                      {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className={labelCls}>WhatsApp / Phone <span className="text-primary">*</span></label>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="+91 98765 43210"
                        className={inputCls(!!errors.phone)}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <label className={labelCls}>
                        Brand / Business Name{' '}
                        <span className="text-muted-foreground font-normal">(optional)</span>
                      </label>
                      <input
                        {...register('business')}
                        type="text"
                        placeholder="e.g. The Pottery Co."
                        className={inputCls(false)}
                      />
                    </div>
                  </div>
                )}

                {/* ─ Step 1: Business ─ */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className={labelCls}>What are you selling? <span className="text-primary">*</span></label>
                      <input
                        {...register('product')}
                        type="text"
                        placeholder="e.g. Handmade leather wallets"
                        className={inputCls(!!errors.product)}
                      />
                      {errors.product && <p className="mt-1 text-xs text-destructive">{errors.product.message}</p>}
                    </div>

                    <div>
                      <label className={labelCls}>Where do you sell? <span className="text-primary">*</span></label>
                      <p className="text-xs text-muted-foreground mb-3">Select all that apply</p>
                      <div className="flex flex-wrap gap-2">
                        {MARKETPLACES.map(m => {
                          const active = selectedMarketplaces.includes(m);
                          return (
                            <button
                              key={m}
                              type="button"
                              onClick={() => toggleChip('marketplaces', m)}
                              className={cn(
                                'px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150',
                                active
                                  ? 'border-primary bg-primary/8 text-primary'
                                  : 'border-border bg-surface text-muted-foreground hover:border-primary/50 hover:text-foreground',
                              )}
                            >
                              {active && <span className="mr-1">✓</span>}{m}
                            </button>
                          );
                        })}
                      </div>
                      {errors.marketplaces && <p className="mt-2 text-xs text-destructive">{errors.marketplaces.message}</p>}
                    </div>

                    <div>
                      <label className={labelCls}>Monthly revenue from ecommerce <span className="text-primary">*</span></label>
                      <div className="space-y-2">
                        {REVENUE_OPTIONS.map(opt => {
                          const active = selectedRevenue === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => selectOption('revenue', opt)}
                              className={cn(
                                'w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all duration-150',
                                active
                                  ? 'border-primary bg-primary/5 text-foreground'
                                  : 'border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground',
                              )}
                            >
                              <div className={cn(
                                'w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all',
                                active ? 'border-primary' : 'border-border',
                              )}>
                                {active && <div className="w-2 h-2 rounded-full bg-primary" />}
                              </div>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {errors.revenue && <p className="mt-1 text-xs text-destructive">{errors.revenue.message}</p>}
                    </div>
                  </div>
                )}

                {/* ─ Step 2: Services & budget ─ */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className={labelCls}>Which services interest you? <span className="text-primary">*</span></label>
                      <p className="text-xs text-muted-foreground mb-3">Select all that apply</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {SERVICES.map(svc => {
                          const active = selectedServices.includes(svc.id);
                          return (
                            <button
                              key={svc.id}
                              type="button"
                              onClick={() => toggleChip('services', svc.id)}
                              className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all duration-150',
                                active
                                  ? 'border-primary bg-primary/5 text-primary'
                                  : 'border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground',
                              )}
                            >
                              <div className={cn(
                                'w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all',
                                active ? 'bg-primary border-primary' : 'border-border',
                              )}>
                                {active && <CheckCircle2 className="w-3 h-3 text-primary-foreground" strokeWidth={2.5} />}
                              </div>
                              {svc.label}
                            </button>
                          );
                        })}
                      </div>
                      {errors.services && <p className="mt-2 text-xs text-destructive">{errors.services.message}</p>}
                    </div>

                    <div>
                      <label className={labelCls}>Monthly marketing budget <span className="text-primary">*</span></label>
                      <div className="space-y-2">
                        {BUDGET_OPTIONS.map(opt => {
                          const active = selectedBudget === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => selectOption('budget', opt)}
                              className={cn(
                                'w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all duration-150',
                                active
                                  ? 'border-primary bg-primary/5 text-foreground'
                                  : 'border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground',
                              )}
                            >
                              <div className={cn(
                                'w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all',
                                active ? 'border-primary' : 'border-border',
                              )}>
                                {active && <div className="w-2 h-2 rounded-full bg-primary" />}
                              </div>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {errors.budget && <p className="mt-1 text-xs text-destructive">{errors.budget.message}</p>}
                    </div>
                  </div>
                )}

                {/* ─ Step 3: Goals ─ */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className={labelCls}>
                        What's your biggest challenge right now? <span className="text-primary">*</span>
                      </label>
                      <textarea
                        {...register('challenge')}
                        rows={4}
                        placeholder="e.g. My Amazon listing has a low click-through rate and I don't know why. Sales have been flat for 3 months."
                        className={cn(inputCls(!!errors.challenge), 'resize-none')}
                      />
                      {errors.challenge && <p className="mt-1 text-xs text-destructive">{errors.challenge.message}</p>}
                    </div>

                    <div>
                      <label className={labelCls}>When are you looking to get started? <span className="text-primary">*</span></label>
                      <div className="space-y-2">
                        {TIMELINE_OPTIONS.map(opt => {
                          const active = selectedTimeline === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => selectOption('timeline', opt)}
                              className={cn(
                                'w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all duration-150',
                                active
                                  ? 'border-primary bg-primary/5 text-foreground'
                                  : 'border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground',
                              )}
                            >
                              <div className={cn(
                                'w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all',
                                active ? 'border-primary' : 'border-border',
                              )}>
                                {active && <div className="w-2 h-2 rounded-full bg-primary" />}
                              </div>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {errors.timeline && <p className="mt-1 text-xs text-destructive">{errors.timeline.message}</p>}
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                      By submitting you agree to our{' '}
                      <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>{' '}
                      and{' '}
                      <a href="/terms" className="text-primary hover:underline">Terms of Service</a>.
                      We'll never spam you.
                    </p>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            {/* ── Navigation ── */}
            <div className={cn('flex gap-3 mt-8', step === 0 ? 'justify-end' : 'justify-between')}>
              {step > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-sm font-semibold text-foreground hover:border-primary/50 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back
                </button>
              )}

              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
                >
                  Continue <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
                >
                  {loading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                    : <>Send My Request <ArrowRight className="w-4 h-4" strokeWidth={1.5} /></>}
                </button>
              )}
            </div>
          </form>

        </div>
      </main>
      <Footer />
    </>
  );
};

export default GetStarted;
