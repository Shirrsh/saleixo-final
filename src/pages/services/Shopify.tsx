import { motion } from 'framer-motion';
import { Check, ArrowRight, Globe, Zap, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import imgHero from '@/assets/portfolio-3.jpg';

const whatWeDo = [
  'Custom Shopify theme setup or full development from scratch',
  'Mobile-first, high-conversion page design across all breakpoints',
  'Product page optimisation for maximum add-to-cart rate',
  'App integration — reviews, upsells, bundles, email capture',
  'Payment gateway setup (Stripe, PayPal, Razorpay, Klarna)',
  'Shipping rules, tax configuration, and checkout flow optimisation',
  'SEO foundation — meta tags, URLs, schema markup, page speed',
  'Google Analytics 4 and Meta Pixel setup',
  'Training and handoff so you can manage the store independently',
];

const process = [
  { num: '01', title: 'Kickoff', desc: 'We review your brand, products, competitors, and conversion goals before a single pixel is designed.' },
  { num: '02', title: 'Design', desc: 'Wireframes and mockups for your approval — no code is written until the design is signed off.' },
  { num: '03', title: 'Build', desc: 'We develop your store with conversion and page speed as the primary design constraints.' },
  { num: '04', title: 'Test', desc: 'Full QA across desktop, tablet, and mobile on multiple browsers before anything goes live.' },
  { num: '05', title: 'Launch', desc: 'Domain connection, payment testing, final checks, and go-live support. Your store is ready to sell.' },
];

const whoFor = [
  'Amazon sellers expanding to direct-to-consumer (DTC) for the first time',
  'Brand owners leaving Etsy or WooCommerce for a more scalable platform',
  'New ecommerce entrepreneurs starting their first online store',
  'Existing Shopify sellers whose store needs a redesign or performance upgrade',
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const W = 'px-6 md:px-12 lg:px-20 xl:px-28';

const Shopify = () => (
  <>
    <Header />
    <main className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '92vh' }}>
        <div className="absolute inset-0 pointer-events-none hidden dark:block">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(215 45% 14%) 0%, hsl(220 35% 10%) 40%, hsl(222 30% 9%) 100%)' }} />
          <div className="absolute rounded-full" style={{ bottom: '-10%', right: '-5%', width: '560px', height: '560px', background: 'radial-gradient(circle, hsl(258 70% 55% / 0.18) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        </div>
        <div className="absolute inset-0 pointer-events-none dark:hidden">
          <div className="absolute rounded-full" style={{ top: '-10%', left: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, hsl(258 90% 66% / 0.06) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row" style={{ minHeight: '92vh' }}>
          {/* Left text */}
          <div className={`flex flex-col justify-center ${W} pt-32 pb-16`} style={{ flex: '0 0 52%' }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase"
                style={{ background: 'hsl(var(--surface-elevated))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
                <Globe className="w-3 h-3" strokeWidth={1.5} />
                Shopify Setup & Design
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-extrabold leading-[1.04] tracking-tight mb-5 text-foreground"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 3.6rem)' }}>
              Your dream Shopify store,{' '}
              <span className="text-primary">built to convert.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base leading-relaxed text-muted-foreground mb-8 max-w-md">
              From blank canvas to fully operational Shopify store — we handle design, development, apps, payments, and launch. You focus on your product. We build your selling machine.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Zap, label: 'Fast turnaround' },
                { icon: BarChart2, label: 'Conversion-optimised' },
                { icon: Globe, label: 'SEO-ready from day 1' },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ background: 'hsl(var(--surface-elevated))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}>
                  <Icon className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                  {label}
                </span>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.38 }}
              className="flex flex-wrap gap-3">
              <Link to="/get-started"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                Get a Free Quote <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
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
            <img src={imgHero} alt="Shopify store design" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="inline-block px-4 py-3 rounded-xl"
                style={{ background: 'rgba(10,10,10,0.72)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="text-white text-sm font-semibold">Live in days, not weeks.</p>
                <p className="text-white/55 text-xs mt-0.5">Design approval on day 3. Build and launch by day 14.</p>
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
            DIY Shopify stores lose customers.{' '}
            <span className="text-muted-foreground font-normal">A slow, confusing, or poorly-designed store — even with great products — kills conversions before buyers ever reach checkout. Most sellers lose 60–80% of visitors before they add to cart.</span>
          </p>
        </motion.div>
      </section>

      {/* What We Do */}
      <section className={`py-20 ${W}`}>
        <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">What we do</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Everything from design to handoff.</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Kickoff to launch in 14 days.</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">For sellers ready to own their channel.</h2>
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
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">Let's build your store</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
            Share your idea.<br />Get a free quote in 24 hours.
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm leading-relaxed">
            No commitment. Tell us what you're building and we'll scope it honestly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/get-started"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
              Get a Free Quote <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
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

export default Shopify;
