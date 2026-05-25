import { usePageMeta } from '@/hooks/usePageMeta';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, ShoppingCart, Palette, BarChart2, MapPin, Award, Users, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';

const W = 'px-6 md:px-12 lg:px-20 xl:px-28';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const stats = [
  { value: '500+', label: 'Sellers helped' },
  { value: '98%',  label: 'Satisfaction rate' },
  { value: '20+',  label: 'Marketplaces' },
  { value: '48 hr', label: 'Avg. delivery' },
];

const disciplines = [
  {
    icon: ShoppingCart, color: '#10b981',
    title: 'Ecommerce Operations',
    desc: 'End-to-end account management on Amazon, Flipkart, Meesho, and more — listings, inventory, FBA, account health, suppression recovery.',
  },
  {
    icon: BarChart2, color: '#8b5cf6',
    title: 'Paid & Organic Marketing',
    desc: 'Meta Ads, Google Shopping, Amazon Sponsored, and TikTok — data-driven campaigns with transparent reporting and no hidden retainers.',
  },
  {
    icon: Camera, color: '#3b82f6',
    title: 'Product Photography',
    desc: 'Studio-grade shoots compliant with every major marketplace — white background, lifestyle, 360°, infographic, and ghost-mannequin.',
  },
  {
    icon: Palette, color: '#f97316',
    title: 'Design & Brand Identity',
    desc: 'Logos, packaging, A+ Content, Shopify storefronts, and marketing creatives — everything built to convert, not just look good.',
  },
];

const values = [
  {
    num: '01',
    title: 'Diagnose before prescribing',
    desc: 'Every engagement starts with a written audit — what is leaking, what is working, what to fix first. We never propose a solution before we understand the problem.',
  },
  {
    num: '02',
    title: 'Fixed pricing, no surprises',
    desc: 'Every project is quoted with a fixed price, a delivery date, and an itemised deliverable list. No hourly billing, no scope creep, no hidden fees.',
  },
  {
    num: '03',
    title: 'In-house only',
    desc: 'We do not outsource. Your photography, copy, ads, and design are handled by the same team you brief — not resold to a freelancer pool.',
  },
  {
    num: '04',
    title: 'Full-stack by design',
    desc: 'One team covers photography, design, listings, and marketing. That means fewer briefings, no blame gaps between vendors, and faster execution.',
  },
];

const About = () => {
  usePageMeta({
    title: 'About Saleixo — The Diagnostic-First Ecommerce Studio',
    description: 'Saleixo is a full-stack ecommerce studio based in Noida, India. We help artisans and D2C sellers with photography, design, listings, and marketing across 20+ global marketplaces.',
    canonical: 'https://saleixo.com/about',
  });

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className={`relative pt-36 pb-20 ${W}`}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute rounded-full" style={{ top: '-5%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, hsl(var(--accent-purple) / 0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          </div>

          <div className="relative max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase"
                style={{ background: 'hsl(var(--surface-elevated))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
                <Users className="w-3 h-3" strokeWidth={1.5} />
                About Saleixo
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-extrabold leading-[1.05] tracking-tight mb-6 text-foreground"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
            >
              We build the engine.<br />
              <span className="text-primary">You run the brand.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg leading-relaxed text-muted-foreground max-w-2xl"
            >
              Saleixo is a full-stack ecommerce studio based in Noida, India. We help artisans, D2C brands, and online sellers look professional, list correctly, and market effectively — across every major marketplace.
            </motion.p>
          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-2xl"
          >
            {stats.map(s => (
              <div key={s.label} className="rounded-xl px-5 py-4 text-center"
                style={{ background: 'hsl(var(--surface-elevated))', border: '1px solid hsl(var(--border))' }}>
                <p className="text-2xl font-extrabold text-foreground leading-none">{s.value}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── Our story ────────────────────────────────────────────────────── */}
        <section className={`py-20 ${W}`} style={{ background: 'hsl(var(--surface))' }}>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-4">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-6 leading-tight"
                style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}>
                Great products were<br />failing online.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                We kept seeing the same pattern — talented artisans and independent brands with genuinely excellent products, losing to inferior competitors because of poor photography, non-compliant listings, and scattered marketing.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                The problem wasn't the products. It was that the tools to present them professionally were fragmented across dozens of freelancers, agencies, and self-service platforms — each with their own scope gaps, hidden costs, and no accountability for results.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Saleixo was built to be the single team that handles all of it — with a diagnostic-first approach, fixed pricing, and full in-house execution.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="space-y-4">
              {[
                { icon: MapPin, label: 'Headquartered in Noida, UP, India', sub: 'Awfis, A-41, Sector 62, Noida 201309' },
                { icon: Award, label: 'MSME Registered', sub: 'Udyam No: UDYAM-BR-06-0036869' },
                { icon: Star,  label: '98% client satisfaction rate', sub: 'Across 500+ completed projects' },
                { icon: Clock, label: '48-hour average delivery', sub: 'For standard photography & listing packages' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-4 rounded-xl p-4"
                  style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: 'hsl(var(--surface-elevated))' }}>
                    <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── What we do ───────────────────────────────────────────────────── */}
        <section className={`py-20 ${W}`}>
          <div className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">What We Do</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight"
                style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}>
                Four disciplines.<br />One team.
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {disciplines.map(({ icon: Icon, color, title, desc }, i) => (
                <motion.div key={title} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="rounded-2xl p-6"
                  style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${color}18` }}>
                    <Icon className="w-5 h-5" style={{ color }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our values ───────────────────────────────────────────────────── */}
        <section className={`py-20 ${W}`} style={{ background: 'hsl(var(--surface))' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">How We Work</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight"
                style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}>
                Principles we don't<br />compromise on.
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {values.map(({ num, title, desc }, i) => (
                <motion.div key={num} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <p className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground mb-2">{num}</p>
                  <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Location + registration ───────────────────────────────────────── */}
        <section className={`py-20 ${W}`}>
          <div className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8"
              style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
              <div>
                <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">Registered Business</p>
                <h3 className="text-xl font-bold text-foreground mb-1">Saleixo Digital Studio</h3>
                <p className="text-sm text-muted-foreground">Awfis, A-41, A Block, Industrial Area, Sector 62</p>
                <p className="text-sm text-muted-foreground">Noida, Uttar Pradesh 201309, India</p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: 'hsl(var(--surface-elevated))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
                  🏛️ MSME Registered &nbsp;·&nbsp; Udyam No: UDYAM-BR-06-0036869
                </div>
              </div>
              <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
                <Link to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-border text-foreground hover:border-primary hover:text-primary transition-colors duration-200">
                  Get in Touch
                </Link>
                <Link to="/get-started"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                  Work With Us <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
};

export default About;
