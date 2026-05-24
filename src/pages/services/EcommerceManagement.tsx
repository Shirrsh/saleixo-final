import { useState } from 'react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus, ShoppingCart, TrendingUp, Shield, BarChart2, Package, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import MarketplaceMockup from '@/components/MarketplaceMockup';

import img1 from '@/assets/hero/showcase-1.jpg';
import img2 from '@/assets/hero/showcase-2.jpg';
import img3 from '@/assets/hero/showcase-3.jpg';
import img4 from '@/assets/hero/showcase-4.jpg';
import portfolioImg from '@/assets/portfolio-1.jpg';

// ── Motion ────────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 },
  }),
};

// ── Layout ────────────────────────────────────────────────────────────────────
const W = 'px-6 md:px-12 lg:px-20 xl:px-28';

// ── Data ──────────────────────────────────────────────────────────────────────
const pillars = [
  {
    num: '01',
    icon: TrendingUp,
    title: 'Marketplace Strategy',
    body: 'We run a full diagnostic of your existing account performance — identifying wasted ad spend, ranking gaps, and suppression risks. Then we build a 90-day growth plan with clear KPIs for revenue, contribution margin, and efficient ad spend.',
  },
  {
    num: '02',
    icon: ShoppingCart,
    title: 'Organic Brand Management',
    body: 'Organic is the lifeblood of any profitable marketplace program. We continuously optimise keywords, titles, bullets, and backend metadata to build an organic flywheel that offsets paid spend and compounds over time.',
  },
  {
    num: '03',
    icon: Package,
    title: 'Creative & A+ Content',
    body: 'We bring DTC-quality creative to every storefront we manage. From brand story alignment to A+ / A++ content refreshes, infographics, and lifestyle imagery — every asset is built to convert, not just comply.',
  },
  {
    num: '04',
    icon: BarChart2,
    title: 'Advertising & PPC',
    body: 'Full-funnel ad management across Sponsored Products, Sponsored Brands, and DSP. Manual and automated bidding, weekly optimisation, and ROAS-first reporting — so every rupee of ad spend is accountable.',
  },
  {
    num: '05',
    icon: RefreshCw,
    title: 'Inventory & Operations',
    body: 'FBA prep, shipment creation, reorder alerts, and suppression recovery (24–72 hr turnaround in 90% of cases). We reduce the operational complexity of multi-marketplace selling so you can focus on sourcing.',
  },
  {
    num: '06',
    icon: Shield,
    title: 'Account Health & Protection',
    body: 'Policy flags, performance notifications, and account suspensions are handled before they escalate. We monitor your dashboard daily and act fast — because a suspended account costs more than any management fee.',
  },
];

const results = [
  { value: '9', suffix: '+', label: 'Marketplaces managed', sub: 'Amazon, Flipkart, Etsy, Shopify, Walmart, eBay, Meesho, WooCommerce, SHEIN' },
  { value: '48', suffix: 'hr', label: 'Avg. suppression recovery', sub: 'Most cases resolved within 24–72 hours' },
  { value: '200', suffix: '+', label: 'Suppressed listings fixed', sub: 'Across categories, geographies, and account types' },
  { value: '7', suffix: '', label: 'Countries served', sub: 'US · UK · FR · DE · AU · CA · IN' },
];

const faqs = [
  { q: 'What does ecommerce management actually include?', a: 'Everything from daily listing health monitoring and suppression fixes to inventory planning, FBA prep, A+ content, PPC management, and monthly performance reviews. You get a dedicated account manager who acts as your in-house ecommerce team.' },
  { q: 'How quickly can you get started?', a: 'Onboarding takes 5–7 business days. We audit your account, document your workflows, gain platform access, and resolve any active issues in the first two weeks. Most clients are fully stabilised within 14 days.' },
  { q: 'Do you manage multiple marketplaces simultaneously?', a: 'Yes. We manage accounts across Amazon, Flipkart, Etsy, Shopify, Walmart, eBay, Meesho, WooCommerce, and SHEIN. You get one point of contact for all platforms.' },
  { q: 'How do you handle suppressed listings?', a: 'We monitor listing health daily. When a suppression is detected, we diagnose the root cause and submit the fix within hours. Our average recovery time is 48 hours, with 90% of cases resolved within 72 hours.' },
  { q: 'What does reporting look like?', a: 'Weekly WhatsApp or Slack updates on key metrics. Monthly performance review with a full breakdown of traffic, conversion, ad spend, unit economics, and the priority actions for the next month.' },
  { q: 'What is your pricing structure?', a: 'Engagements start at a flat monthly retainer based on the number of platforms and SKUs managed, with an optional performance incentive tied to revenue growth. Book a call and we\'ll scope it honestly for your situation.' },
];

const marketplaceLogos = [
  'Amazon', 'Flipkart', 'Etsy', 'Shopify', 'Walmart', 'eBay', 'Meesho', 'WooCommerce', 'SHEIN',
];

// ── FAQ Item ──────────────────────────────────────────────────────────────────
const FaqItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp} custom={index}
      initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="border-b border-border/40"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
      >
        <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
          {q}
        </span>
        <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full border border-border flex items-center justify-center transition-colors duration-200 group-hover:border-primary">
          {open
            ? <Minus className="w-3.5 h-3.5 text-primary" />
            : <Plus className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted-foreground leading-relaxed pb-6 max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
const EcommerceManagement = () => {
  usePageMeta({
    title: 'Ecommerce Management — Saleixo',
    description: 'Full-service ecommerce operations — inventory, orders, listings, and account health across 20+ marketplaces. Let us run your store.',
  });
  const scrollToContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <Header />
      <main className="min-h-screen overflow-x-hidden" style={{ background: 'hsl(var(--background))' }}>

        {/* ── HERO ── */}
        <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">
          {/* Full-bleed image collage */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1">
            {[img1, img2, img3, img4].map((src, i) => (
              <div key={i} className="relative overflow-hidden">
                <img src={src} alt="" className="w-full h-full object-cover" loading="eager" aria-hidden />
              </div>
            ))}
          </div>
          {/* Dark overlay — heavier at bottom for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/90" />

          {/* Content */}
          <div className={`relative z-10 ${W} pb-16 pt-36`}>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold tracking-[0.3em] uppercase text-white/50 mb-5"
            >
              Ecommerce Management
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-extrabold tracking-tight text-white leading-[1.02] mb-6 max-w-4xl"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)' }}
            >
              Run your business.
              <br />
              <span style={{ color: 'hsl(var(--primary))' }}>We'll run your ecommerce.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-base md:text-lg text-white/65 max-w-xl leading-relaxed mb-10"
            >
              Saleixo acts as your dedicated ecommerce operations team across 9 marketplaces and 7 countries — so you can focus on building your brand while we handle the day-to-day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to="/get-started"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: 'hsl(var(--primary))', color: '#fff' }}
              >
                Book a Free Call <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <Link
                to="/custom-pricing"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold border transition-all duration-200 hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}
              >
                See Pricing
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── STAT STRIP ── */}
        <section style={{ background: 'hsl(var(--surface))' }}>
          <div className={W}>
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border/40">
              {results.map((r, i) => (
                <motion.div
                  key={r.label}
                  variants={fadeUp} custom={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="px-6 py-10 flex flex-col gap-1"
                >
                  <div className="flex items-end gap-1 leading-none mb-2">
                    <span className="font-extrabold text-foreground" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontFamily: '"Inter Tight", Inter, sans-serif' }}>
                      {r.value}
                    </span>
                    <span className="text-2xl font-extrabold pb-1" style={{ color: 'hsl(var(--primary))' }}>{r.suffix}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{r.label}</p>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">{r.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTRO STATEMENT ── */}
        <section className={`py-20 md:py-28 ${W}`}>
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Why it matters
            </p>
            <p className="font-semibold text-foreground leading-[1.2] tracking-tight text-balance"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)' }}>
              Marketplace management is a full-time job.{' '}
              <span className="text-muted-foreground font-normal">
                Suppression alerts, inventory gaps, policy updates, competitor repricing — every hour you spend managing your store is an hour not spent building your business. We take the whole operation off your plate.
              </span>
            </p>
          </motion.div>
        </section>

        {/* ── MARKETPLACE LOGOS ── */}
        <section className={`pb-16 ${W}`}>
          <motion.p variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-6">
            Platforms we manage
          </motion.p>
          <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-wrap gap-3">
            {marketplaceLogos.map(name => (
              <span key={name}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-foreground/70 border border-border/60 hover:border-primary/50 hover:text-foreground transition-colors duration-200"
                style={{ background: 'hsl(var(--surface))' }}>
                {name}
              </span>
            ))}
          </motion.div>
        </section>

        {/* ── SERVICE PILLARS ── */}
        <section className={`py-20 md:py-28 ${W}`} style={{ background: 'hsl(var(--surface))' }}>
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">Our service</p>
            <h2 className="font-bold text-foreground tracking-tight leading-[1.1]"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
              End-to-end marketplace management.
            </h2>
          </motion.div>

          <div className="space-y-0">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.num}
                  variants={fadeUp} custom={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
                  className="grid md:grid-cols-[80px_1fr] gap-6 py-10 border-b border-border/40 group"
                >
                  {/* Number + icon */}
                  <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3">
                    <span className="text-xs font-bold tracking-[0.2em] tabular-nums"
                      style={{ color: 'hsl(var(--primary))' }}>{p.num}</span>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'hsl(var(--primary)/0.1)', border: '1px solid hsl(var(--primary)/0.25)' }}>
                      <Icon className="w-4.5 h-4.5 text-primary" strokeWidth={1.5} aria-hidden />
                    </div>
                  </div>
                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{p.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── LIVE MOCKUP ── */}
        <section className={`py-20 md:py-28 ${W}`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">Live dashboards</p>
              <h2 className="font-bold text-foreground tracking-tight leading-[1.1] mb-5"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
                One team. Every marketplace. Real results.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
                We manage your seller dashboards across all platforms — monitoring performance, catching issues before they escalate, and optimising every lever that drives revenue.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Daily listing health monitoring across all platforms',
                  'Weekly ad spend optimisation and bid adjustments',
                  'Inventory reorder alerts and FBA prep coordination',
                  'Suppression recovery with 24–72 hr turnaround',
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'hsl(var(--primary)/0.12)' }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'hsl(var(--primary))' }} />
                    </div>
                    <span className="text-sm text-foreground/85">{item}</span>
                  </motion.div>
                ))}
              </div>
              <Link to="/get-started"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90"
                style={{ background: 'hsl(var(--primary))', color: '#fff' }}>
                Get a Free Account Audit <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="w-full max-w-full overflow-hidden">
              <MarketplaceMockup />
            </motion.div>
          </div>
        </section>

        {/* ── TESTIMONIAL ── */}
        <section className={`py-20 md:py-24 ${W}`} style={{ background: 'hsl(var(--surface))' }}>
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-foreground/10 mb-6 select-none" aria-hidden>"</p>
            <blockquote className="font-semibold text-foreground leading-snug tracking-tight text-balance mb-8"
              style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)' }}>
              The Saleixo team took over our Amazon account and turned it into a revenue engine within 60 days. Suppressions we'd been fighting for months were fixed in 48 hours.
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
                <img src={portfolioImg} alt="Client" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-foreground">Arjun Mehta</p>
                <p className="text-xs text-muted-foreground">Founder, Artisan Collective India</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── RESULTS ── */}
        <section className={`py-20 md:py-28 ${W}`}>
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">What to expect</p>
            <h2 className="font-bold text-foreground tracking-tight leading-[1.1]"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
              Within 90 days of working together, on average our clients see:
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/40">
            {[
              { pct: '30%', label: 'Increase in revenue', desc: 'Through listing optimisation, A+ content, and targeted ad spend across all managed platforms.' },
              { pct: '48hr', label: 'Avg. suppression fix', desc: 'Listing health issues resolved fast — before they cost you ranking, revenue, or account standing.' },
              { pct: '25%', label: 'Reduction in wasted ad spend', desc: 'By auditing existing campaigns and rebuilding targeting around contribution margin, not just ROAS.' },
            ].map((r, i) => (
              <motion.div key={r.label} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="p-8 md:p-10 flex flex-col gap-3"
                style={{ background: 'hsl(var(--card))' }}>
                <span className="font-extrabold text-foreground leading-none"
                  style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontFamily: '"Inter Tight", Inter, sans-serif', color: 'hsl(var(--primary))' }}>
                  {r.pct}
                </span>
                <p className="text-base font-bold text-foreground">{r.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── PRICING ── */}
        <section className={`py-20 md:py-24 ${W}`} style={{ background: 'hsl(var(--surface))' }}>
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="rounded-3xl p-10 md:p-14 border border-border"
            style={{ background: 'hsl(var(--card))' }}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">Plans & Pricing</p>
                <h2 className="font-bold text-foreground tracking-tight leading-[1.1] mb-4"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
                  Transparent, performance-aligned pricing.
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mb-6">
                  Engagements start at a flat monthly retainer based on the number of platforms and SKUs managed, with an optional performance incentive tied to revenue growth. No lock-in contracts for the first 90 days.
                </p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">Starts at</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="font-extrabold text-foreground leading-none"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: '"Inter Tight", Inter, sans-serif' }}>
                    ₹25,000
                  </span>
                  <span className="text-base text-muted-foreground pb-1">/ month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Custom scoping for multi-platform or high-SKU accounts.</p>
              </div>
              <div className="flex flex-col gap-3 md:flex-shrink-0">
                <Link to="/get-started"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90 whitespace-nowrap"
                  style={{ background: 'hsl(var(--primary))', color: '#fff' }}>
                  Book a Free Call <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Link>
                <Link to="/custom-pricing"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold border border-border text-foreground transition-all duration-200 hover:border-primary hover:text-primary whitespace-nowrap">
                  View Full Pricing
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── FAQ ── */}
        <section className={`py-20 md:py-28 ${W}`}>
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">FAQ</p>
            <h2 className="font-bold text-foreground tracking-tight leading-[1.1]"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
              Frequent questions,<br />
              <span className="text-muted-foreground font-normal italic">with specific answers.</span>
            </h2>
          </motion.div>
          <div>
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </section>

        {/* ── CROSS-SELL ── */}
        <section className={`py-16 ${W} border-t border-border/40`} style={{ background: 'hsl(var(--surface))' }}>
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">Pair with</p>
            <h3 className="text-xl font-bold text-foreground">Work with Saleixo on full-funnel growth.</h3>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Studio Photography', desc: 'Marketplace-compliant product images in 48 hours.', href: '/services/photography' },
              { label: 'Amazon Listing & FBA', desc: 'SEO-optimised listings, A+ content, and account management.', href: '/services/amazon' },
              { label: 'Social & Paid Ads', desc: 'Google, Meta, and Amazon PPC — ROAS-first.', href: '/services/social-ads' },
            ].map((s, i) => (
              <motion.div key={s.label} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Link to={s.href}
                  className="group flex flex-col gap-2 p-5 rounded-2xl border border-border hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: 'hsl(var(--card))' }}>
                  <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-200">{s.label}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{s.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold mt-1"
                    style={{ color: 'hsl(var(--primary))' }}>
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className={`py-24 md:py-32 ${W}`}>
          <div className="text-center">
            <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-5">Let's talk</p>
              <h2 className="font-extrabold text-foreground tracking-tight leading-[1.05] mb-6 text-balance"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                Book a free 30-minute call.
                <br />
                <span className="text-muted-foreground font-light italic">We'll show you exactly where your store is leaking revenue.</span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
                No obligation. We'll audit your account, identify the top 3 issues costing you sales, and explain what managed support would look like for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/get-started"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90"
                  style={{ background: 'hsl(var(--primary))', color: '#fff' }}>
                  Book a Free Call <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Link>
                <Link to="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold border border-border text-foreground transition-all duration-200 hover:border-primary hover:text-primary">
                  View All Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default EcommerceManagement;
