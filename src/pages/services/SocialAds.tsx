import { usePageMeta } from '@/hooks/usePageMeta';
import { motion } from 'framer-motion';
import { Check, ArrowRight, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import imgHero from '@/assets/marketing-service.jpg';

const whatWeDo = [
  'Meta Ads (Facebook & Instagram) — prospecting, retargeting, lookalike audiences',
  'TikTok Ads — UGC-style creative strategy and spark ads',
  'Google Shopping & Performance Max campaigns',
  'Amazon Sponsored Products, Brands & Display ads',
  'A/B creative testing and ad fatigue management',
  'ROAS tracking, attribution, and monthly reporting',
  'Content calendar creation (30 posts/month)',
  'Branded graphic & video content creation',
  'Community management and comment response',
  'Influencer outreach and UGC coordination',
];

const process = [
  { num: '01', title: 'Audit', desc: 'We review your ad account, social presence, creative assets, and competitors before spending a rupee.' },
  { num: '02', title: 'Strategy', desc: 'A 90-day growth plan with creative direction, audience targeting, and budget allocation — for your approval.' },
  { num: '03', title: 'Launch', desc: 'First campaigns live within 5 business days. Creative produced in-house, no freelancer handoffs.' },
  { num: '04', title: 'Optimise', desc: 'Weekly bid adjustments, creative swaps, audience refinement. We chase ROAS, not vanity metrics.' },
  { num: '05', title: 'Report', desc: 'Monthly performance reports with clear KPIs, spend breakdown, and a concrete plan for the next month.' },
];

const whoFor = [
  'Ecommerce brands wanting profitable, scalable growth beyond organic traffic',
  'Sellers frustrated with burning ad budget without clear attribution',
  'Multi-channel sellers needing consistent creative across Meta, TikTok, and Google',
  'Brands wanting full social media management alongside paid ads',
];

const stats = [
  { value: '250%', label: 'Avg. campaign ROI' },
  { value: '5 days', label: 'First campaign live' },
  { value: '4 platforms', label: 'Managed simultaneously' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const W = 'px-6 md:px-12 lg:px-20 xl:px-28';

const SocialAds = () => {
  usePageMeta({
    title: 'Social & Paid Ads — Saleixo',
    description: 'Google & Meta ad campaigns with 3.1× average ROAS. Full creative, targeting, optimisation, and reporting for ecommerce sellers.',
  });
  return (
  <>
    <Header />
    <main className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '92vh' }}>
        <div className="absolute inset-0 pointer-events-none hidden dark:block">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(215 45% 14%) 0%, hsl(220 35% 10%) 40%, hsl(222 30% 9%) 100%)' }} />
          <div className="absolute rounded-full" style={{ top: '-10%', left: '-5%', width: '560px', height: '560px', background: 'radial-gradient(circle, hsl(258 70% 55% / 0.22) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        </div>
        <div className="absolute inset-0 pointer-events-none dark:hidden">
          <div className="absolute rounded-full" style={{ top: '-10%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, hsl(258 90% 66% / 0.07) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row" style={{ minHeight: '92vh' }}>
          {/* Left text */}
          <div className={`flex flex-col justify-center ${W} pt-32 pb-16`} style={{ flex: '0 0 52%' }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase"
                style={{ background: 'hsl(var(--surface-elevated))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
                <BarChart2 className="w-3 h-3" strokeWidth={1.5} />
                Social Media & Paid Ads
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-extrabold leading-[1.04] tracking-tight mb-5 text-foreground"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 3.6rem)' }}>
              Turn scrollers into buyers{' '}
              <span className="text-primary">with ads that work.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base leading-relaxed text-muted-foreground mb-8 max-w-md">
              We run Meta, TikTok, and Google campaigns for ecommerce brands — combining creative strategy, precise targeting, and constant optimisation to bring you profitable, scalable growth.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8">
              {stats.map(s => (
                <span key={s.label} className="inline-flex flex-col px-4 py-2.5 rounded-lg text-center"
                  style={{ background: 'hsl(var(--surface-elevated))', border: '1px solid hsl(var(--border))' }}>
                  <span className="text-base font-extrabold text-foreground leading-none">{s.value}</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">{s.label}</span>
                </span>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.38 }}
              className="flex flex-wrap gap-3">
              <Link to="/get-started"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                Get a Free Ad Audit <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
              <Link to="/custom-pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-border text-foreground transition-all duration-200 hover:border-primary hover:text-primary">
                See Pricing
              </Link>
            </motion.div>
          </div>

          {/* Right — full-bleed image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
            style={{ flex: '1 1 48%', minHeight: 400 }}
          >
            <img src={imgHero} alt="Social media and paid ads management" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="inline-block px-4 py-3 rounded-xl"
                style={{ background: 'rgba(10,10,10,0.72)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="text-white text-sm font-semibold">250% average campaign ROI.</p>
                <p className="text-white/55 text-xs mt-0.5">Tracked, attributed, and reported every month.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className={`py-14 ${W}`} style={{ background: 'hsl(var(--surface))' }}>
        <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="rounded-2xl p-8 md:p-10"
          style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-muted-foreground mb-4">The problem</p>
          <p className="text-xl md:text-2xl font-semibold text-foreground leading-snug">
            Running ads without a strategy is expensive guesswork.{' '}
            <span className="text-muted-foreground font-normal">Most sellers waste thousands before finding what works. We use a data-first approach — find your ideal customer, test what converts, scale what works.</span>
          </p>
        </motion.div>
      </section>

      {/* What We Do */}
      <section className={`py-20 ${W}`}>
        <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">What we do</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Paid ads and social — under one roof.</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {whatWeDo.map((item, i) => (
            <motion.div key={item} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: 'hsl(var(--surface))', border: '1px solid hsl(var(--border))' }}>
              <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" strokeWidth={2} />
              <span className="text-sm text-foreground/85">{item}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className={`py-20 ${W}`} style={{ background: 'hsl(var(--surface))' }}>
        <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">Our process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Strategy to live campaigns in 5 days.</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {process.map((step, i) => (
            <motion.div key={step.num} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
              className="flex flex-col gap-3 p-5 rounded-2xl"
              style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
              <div className="text-3xl font-extrabold leading-none" style={{ color: 'hsl(var(--border-strong))', fontFamily: '"Inter Tight", Inter, sans-serif' }}>{step.num}</div>
              <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Who It's For */}
      <section className={`py-20 ${W}`}>
        <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">Who this is for</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">For brands ready to scale beyond organic.</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-4">
          {whoFor.map((item, i) => (
            <motion.div key={item} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex items-start gap-4 p-5 rounded-2xl"
              style={{ background: 'hsl(var(--surface))', border: '1px solid hsl(var(--border))' }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'hsl(var(--primary)/0.12)' }}>
                <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
              </div>
              <span className="text-sm text-foreground/85 leading-relaxed">{item}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 ${W}`}>
        <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="rounded-3xl p-10 md:p-14 text-center"
          style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">Free ad account audit</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
            See what's costing you money<br />before we spend a rupee.
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm leading-relaxed">
            We'll audit your ad account and social presence and tell you the top 3 things wasting your budget. Free, no strings attached.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/get-started"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
              Get Free Audit <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
            <Link to="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold border border-border text-foreground transition-all duration-200 hover:border-primary hover:text-primary">
              View All Services
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
    <Footer />
    <ScrollToTop />
  </>
  );
};

export default SocialAds;
