import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  ArrowRight, ArrowLeft, CheckCircle2, Loader2,
  User, ShoppingBag, Sparkles, Target, MessageCircle, Check,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { usePageMeta } from '@/hooks/usePageMeta';

const ROTATING_PHRASES = [
  'More Conversions',
  'Higher Rankings',
  'More Sales',
  'Better Reviews',
  'Faster Growth',
  '5× More Clicks',
  'Less Ad Spend',
];

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

// ── Calendly inline embed ─────────────────────────────────────────────────────
const CalendlyEmbed = ({ url }: { url: string }) => {
  useEffect(() => {
    const id = 'calendly-widget-script';
    if (!document.getElementById(id)) {
      const script = document.createElement('script');
      script.id = id;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className="calendly-inline-widget w-full rounded-2xl overflow-hidden"
      data-url={url}
      style={{ minWidth: '320px', height: '700px' }}
    />
  );
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const inputCls = (err: boolean) => cn(
  'w-full px-4 py-3 rounded-xl border bg-surface text-foreground placeholder:text-muted-foreground text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
  err ? 'border-destructive' : 'border-border',
);

const labelCls = 'block text-sm font-medium text-foreground mb-1.5';

// ── Small contact form (quick enquiry) ───────────────────────────────────────
const quickServices = [
  'Product Photography',
  'Amazon Listing & FBA',
  'Ecommerce Management',
  'Shopify Setup & Design',
  'Social & Paid Ads',
  'Ecommerce Design',
  'Full-Service Package',
  'Other / Not Sure',
];

const quickInputCls = `w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors`;

const QuickContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await supabase.from('leads' as any).insert([{
        name:     form.name,
        email:    form.email,
        phone:    form.whatsapp || null,
        services: form.service ? [form.service] : [],
        message:  form.message,
        source:   'get-started-quick-form',
        status:   'new',
        priority: 'medium',
      }]);
      await supabase.from('activity_log').insert({
        action: 'New quick enquiry via Get Started page', item_type: 'lead',
      });
      // Fire-and-forget email notification
      supabase.functions.invoke('notify-lead', {
        body: { name: form.name, email: form.email, phone: form.whatsapp || null,
                services: form.service ? [form.service] : [], message: form.message,
                source: 'get-started-quick-form' },
      }).catch(() => {});
    } catch (_) { /* silent */ } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
        <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <Check className="w-7 h-7 text-green-600 dark:text-green-400" strokeWidth={2} />
        </div>
        <h3 className="text-xl font-bold text-foreground">We've got your message!</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          We'll review your details and get back to you within 24 hours with a tailored plan.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">Full Name <span className="text-red-500">*</span></label>
          <input required className={quickInputCls} placeholder="John Doe" value={form.name} onChange={set('name')} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">Business Email <span className="text-red-500">*</span></label>
          <input required type="email" className={quickInputCls} placeholder="name@company.com" value={form.email} onChange={set('email')} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">WhatsApp (optional)</label>
          <input type="tel" className={quickInputCls} placeholder="+91 98765 43210" value={form.whatsapp} onChange={set('whatsapp')} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">Service Required <span className="text-red-500">*</span></label>
          <select required className={quickInputCls} value={form.service} onChange={set('service')}>
            <option value="">Select Service</option>
            {quickServices.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-foreground mb-1.5">Tell us about your project <span className="text-red-500">*</span></label>
        <textarea
          required rows={3} className={quickInputCls}
          placeholder="What are you selling, where, and what do you need help with?"
          value={form.message} onChange={set('message')}
          style={{ resize: 'none' }}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
        style={{ background: 'hsl(var(--primary))', color: '#fff' }}
      >
        {loading ? 'Sending…' : (<>Send Message <ArrowRight className="w-4 h-4" /></>)}
      </button>
    </form>
  );
};

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
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [mounted,   setMounted]   = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === 'dark';

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const t = setInterval(() => setPhraseIdx(i => (i + 1) % ROTATING_PHRASES.length), 2800);
    return () => clearInterval(t);
  }, []);

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

      // Fire-and-forget email notification
      supabase.functions.invoke('notify-lead', {
        body: {
          name: data.name, email: data.email, phone: data.phone,
          business: data.business, product: data.product,
          services: data.services, marketplaces: data.marketplaces,
          budget_range: data.budget, timeline: data.timeline,
          message: data.challenge, source: 'get-started-form',
        },
      }).catch(() => {});

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
        <main className="min-h-screen px-6 pt-28 pb-20" style={{ background: 'hsl(var(--background))' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto"
          >
            {/* Confirmation */}
            <div className="text-center mb-10">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'hsl(var(--primary)/0.12)', border: '2px solid hsl(var(--primary)/0.3)' }}>
                <CheckCircle2 className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-3">You're in!</h1>
              <p className="text-muted-foreground mb-2 leading-relaxed">
                We've received your details. A member of our team will be in touch within{' '}
                <strong className="text-foreground">24 hours</strong> to schedule your free discovery call.
              </p>
              <p className="text-sm text-muted-foreground mb-6">Check your inbox — a confirmation is on its way.</p>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
              >
                Back to Home <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>

            {/* Calendly booking */}
            <div className="relative flex items-center gap-4 mb-8">
              <div className="flex-1 h-px" style={{ background: 'hsl(var(--border))' }} />
              <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">or book a discovery call now</span>
              <div className="flex-1 h-px" style={{ background: 'hsl(var(--border))' }} />
            </div>
            <CalendlyEmbed url="https://calendly.com/sshirrsh/new-meeting" />
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

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-36 pb-24 text-center transition-colors duration-300"
        style={{
          background: isDark
            ? '#060d0a'
            : 'linear-gradient(160deg, #ffffff 0%, #f8f4ff 50%, #fff0f6 100%)',
        }}
      >
        {/* Background glow — adapts to theme */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 65% 60% at 50% 65%, rgba(26,74,58,0.55) 0%, transparent 70%)'
              : 'radial-gradient(ellipse 65% 60% at 50% 65%, rgba(236,72,153,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold tracking-tight leading-[1.1]"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 5rem)', fontFamily: '"Inter Tight", Inter, sans-serif' }}
          >
            <span style={{ color: isDark ? '#ffffff' : '#0a0a0a' }}>
              Free audit. Honest answers.
            </span>
            <br />

            {/* ── Dynamic rotating phrase ── */}
            <span
              className="inline-block relative"
              style={{
                minWidth: '1ch',
                minHeight: '1.15em',
                verticalAlign: 'top',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={phraseIdx}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {ROTATING_PHRASES[phraseIdx]}
                </motion.span>
              </AnimatePresence>
            </span>

            <br />
            <span style={{ color: isDark ? '#ffffff' : '#0a0a0a' }}>Zero pressure.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-6 mx-auto leading-relaxed"
            style={{
              fontSize: '1.05rem',
              color: isDark ? 'rgba(255,255,255,0.52)' : 'rgba(10,10,10,0.55)',
              maxWidth: '480px',
            }}
          >
            Send us your top three listings or your storefront URL. We'll come back inside 48 hours with a written diagnosis — what's leaking, what's working, and what we'd fix first. No deck. No sales call ambush.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-7"
          >
            {['No commitment required', '48hr written diagnosis', 'Keep the audit doc — free'].map(item => (
              <span
                key={item}
                className="flex items-center gap-1.5 text-sm"
                style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(10,10,10,0.55)' }}
              >
                <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#22c55e' }} strokeWidth={2.5} />
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            <a
              href="#audit-wizard"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: '#d4af37', color: '#0a0a0a', minHeight: '48px' }}
            >
              Send Me the Audit <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </a>
            <a
              href="https://wa.me/917011441159?text=Hi%2C%20I%27d%20like%20a%20free%20listing%20audit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: '#25d366', color: '#fff', minHeight: '48px' }}
            >
              <MessageCircle className="w-4 h-4" strokeWidth={2} />
              WhatsApp Us Directly
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Quick contact form ── */}
      <section className="bg-background py-14 px-4 border-b border-border">
        <div className="max-w-xl mx-auto">
          <div className="mb-6">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-primary mb-2">Quick Enquiry</p>
            <h2 className="text-2xl font-bold text-foreground mb-1">Have a question? Just ask.</h2>
            <p className="text-sm text-muted-foreground">Drop us a message and we'll reply within 24 hours.</p>
          </div>
          <QuickContactForm />
        </div>
      </section>

      <main id="audit-wizard" className="min-h-screen pt-14 pb-20 px-4" style={{ background: 'hsl(var(--background))' }}>
        <div className="max-w-xl mx-auto">

          {/* ── Section label ── */}
          <div className="mb-8 pb-6 border-b border-border">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-primary mb-1">Free Listing Audit</p>
            <h2 className="text-2xl font-bold text-foreground mb-1">Send Me the Audit</h2>
            <p className="text-sm text-muted-foreground">
              Tell us about your store in detail — we'll come back with a written diagnosis within 48 hours.
            </p>
          </div>

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
