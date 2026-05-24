import { usePageMeta } from '@/hooks/usePageMeta';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import imgHero from '@/assets/design-service.jpg';

const whatWeDo = [
  'Keyword research using Helium 10, Jungle Scout & Amazon Brand Analytics',
  'SEO-optimised titles, bullet points & descriptions (A9/A10 algorithm)',
  'A+ Content / EBC design & copywriting — up to 5 modules',
  'Backend search terms and hidden keyword strategy',
  'Competitor analysis and ranking gap identification',
  'Listing audit and full optimisation for existing sellers',
  'Brand Registry setup and storefront design',
  'Review strategy and social proof optimisation',
  'Suppressed listing recovery — 24–72 hr turnaround in 90% of cases',
];

const process = [
  { num: '01', title: 'Discovery', desc: 'We audit your listing or product brief. Written diagnosis back to you in 48 hours.' },
  { num: '02', title: 'Research', desc: 'Deep keyword and competitor analysis to find every ranking opportunity in your category.' },
  { num: '03', title: 'Creation', desc: 'We write every element — title, bullets, description, backend terms, A+ Content — for your approval.' },
  { num: '04', title: 'Review', desc: 'You approve, we refine. Up to 2 revision rounds included in every project.' },
  { num: '05', title: 'Launch', desc: 'Listings go live. We track ranking changes in the first 30 days and flag anomalies fast.' },
];

const whoFor = [
  'New sellers launching their first Amazon product who want to rank from day one',
  'Existing sellers with low click-through rate or stagnant rankings',
  'Brand owners moving from retail to Amazon for the first time',
  'Private label brands scaling their catalog across multiple ASINs',
];

const stats = [
  { value: '24–72 hr', label: 'Suppression recovery' },
  { value: 'A9/A10', label: 'Algorithm-native copy' },
  { value: '200+', label: 'Suppressed listings fixed' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const W = 'px-6 md:px-12 lg:px-20 xl:px-28';

const Amazon = () => {
  usePageMeta({
    title: 'Amazon Listing & FBA Services — Saleixo',
    description: 'Full Amazon seller support — keyword-optimised listings, A+ content, FBA setup, and account management. 0 compliance rejections.',
  });
  return (
  <>
    <Header />
    <main className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '92vh' }}>
        <div className="absolute inset-0 pointer-events-none hidden dark:block">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(215 45% 14%) 0%, hsl(220 35% 10%) 40%, hsl(222 30% 9%) 100%)' }} />
          <div className="absolute rounded-full" style={{ top: '-10%', right: '-5%', width: '560px', height: '560px', background: 'radial-gradient(circle, hsl(142 70% 40% / 0.2) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        </div>
        <div className="absolute inset-0 pointer-events-none dark:hidden">
          <div className="absolute rounded-full" style={{ top: '-10%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, hsl(210 85% 55% / 0.07) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row" style={{ minHeight: '92vh' }}>
          {/* Left text */}
          <div className={`flex flex-col justify-center ${W} pt-32 pb-16`} style={{ flex: '0 0 52%' }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase"
                style={{ background: 'hsl(var(--surface-elevated))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
                <ShoppingCart className="w-3 h-3" strokeWidth={1.5} />
                Amazon FBA & Listing
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-extrabold leading-[1.04] tracking-tight mb-5 text-foreground"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 3.6rem)' }}>
              Rank higher.{' '}
              <span className="text-primary">Sell more.</span>{' '}
              Dominate Amazon.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base leading-relaxed text-muted-foreground mb-8 max-w-md">
              Expert Amazon listing optimisation with data-driven keywords, A+ Content, and A9/A10 SEO — so your products show up when buyers are ready to purchase.
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
                Get a Free Listing Audit <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
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
            <img src={imgHero} alt="Amazon listing optimisation" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="inline-block px-4 py-3 rounded-xl"
                style={{ background: 'rgba(10,10,10,0.72)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="text-white text-sm font-semibold">200+ suppressed listings fixed.</p>
                <p className="text-white/55 text-xs mt-0.5">Average recovery time: 36 hours.</p>
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
            Most Amazon sellers lose sales not because their product is bad —{' '}
            <span className="text-muted-foreground font-normal">but because their listing doesn't communicate value. Poor titles, weak keywords, and missing A+ content cost you ranking and revenue every single day.</span>
          </p>
        </motion.div>
      </section>

      {/* What We Do */}
      <section className={`py-20 ${W}`}>
        <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">What we do</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">End-to-end listing optimisation.</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Discovery to live listing in 14–21 days.</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">For sellers who are done leaving money on the table.</h2>
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
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">Free audit</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
            Tell us your ASIN.<br />We'll show you exactly what's holding back your ranking.
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm leading-relaxed">
            30-minute call + written 1–2 page diagnosis. You keep the document whether you hire us or not.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/get-started"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
              Request Free Audit <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
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

export default Amazon;
