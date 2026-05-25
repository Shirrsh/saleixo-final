import { usePageMeta } from '@/hooks/usePageMeta';
import { motion } from 'framer-motion';
import {
  ArrowRight, Check, Camera, ShoppingCart, BarChart2, Globe,
  Users, TrendingUp, Shield, Clock, Star, Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useCurrency } from '@/context/CurrencyContext';
import CurrencyToggle from '@/components/CurrencyToggle';

import imgPhotography from '@/assets/photography-service.jpg';
import imgDesign from '@/assets/design-service.jpg';
import imgMarketing from '@/assets/marketing-service.jpg';
import imgPortfolio1 from '@/assets/portfolio-1.jpg';
import imgPortfolio3 from '@/assets/portfolio-3.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const SERVICES = [
  {
    icon: Camera,
    color: '#3b82f6',
    badge: 'Photography',
    title: 'Product Photography',
    headline: 'Studio-grade images that stop the scroll and sell.',
    desc: 'Professional product photography optimised for Amazon, Flipkart, Shopify, and social — white background, lifestyle, and on-model shoots delivered in 24–48 hours.',
    bullets: [
      'White background + lifestyle + on-model shoots',
      'Delivered in 24–48 hours, retouched',
      'Amazon, Etsy & Shopify ready formats',
    ],
    img: imgPhotography,
    href: '/services/photography',
    cta: 'Explore Photography',
  },
  {
    icon: ShoppingCart,
    color: '#10b981',
    badge: 'Amazon',
    title: 'Amazon FBA & Listing Optimisation',
    headline: 'Rank higher, win the Buy Box, dominate search.',
    desc: 'End-to-end Amazon listing management — keyword research, A+ content, brand storefront, suppression recovery, and ongoing listing health monitoring.',
    bullets: [
      'A9/A10 keyword-optimised titles & bullets',
      'A+ Content, brand storefront, and infographics',
      'Suppression recovery within 24–72 hours',
    ],
    img: imgDesign,
    href: '/services/amazon',
    cta: 'Explore Amazon',
  },
  {
    icon: Globe,
    color: '#8b5cf6',
    badge: 'Shopify',
    title: 'Shopify Setup & Design',
    headline: 'Your dream store — live, fast, and built to convert.',
    desc: 'From blank canvas to fully operational Shopify store. Mobile-first design, conversion-optimised layouts, app integrations, and full launch support — in 14 days.',
    bullets: [
      'Custom theme design or setup from scratch',
      'Payments, shipping, SEO, and apps wired in',
      'Kickoff to launch in 14 days',
    ],
    img: imgPortfolio3,
    href: '/services/shopify',
    cta: 'Explore Shopify',
  },
  {
    icon: BarChart2,
    color: '#ec4899',
    badge: 'Social & Ads',
    title: 'Social Media & Paid Ads',
    headline: 'Turn scrollers into buyers with ads that work.',
    desc: 'Meta, TikTok, and Google campaigns built for ecommerce — combining creative strategy, precise targeting, and constant optimisation for profitable, scalable growth.',
    bullets: [
      'Meta, TikTok, Google & Amazon ads managed',
      'First campaign live in 5 business days',
      'Monthly reporting with clear ROAS tracking',
    ],
    img: imgMarketing,
    href: '/services/social-ads',
    cta: 'Explore Social & Ads',
  },
  {
    icon: Users,
    color: '#d4af37',
    badge: 'Management',
    title: 'Ecommerce Management',
    headline: "Run your business. We'll run your ecommerce.",
    desc: 'Fully managed ecommerce operations — listings, inventory planning, order management, competitor monitoring, and monthly performance reviews across every marketplace.',
    bullets: [
      'Dedicated account manager via WhatsApp or Slack',
      'Amazon, Shopify, Flipkart, Walmart & more',
      'Stabilised and managed within 2 weeks',
    ],
    img: imgPortfolio1,
    href: '/services/ecommerce-management',
    cta: 'Explore Management',
  },
];

const TIERS = [
  {
    label: 'Visibility',
    desc: 'For new sellers who need a professional presence fast.',
    priceUSD: 4999 / 83, // ~$60 — kept as INR-primary tier
    priceINR: 4999,
    unit: 'starting at',
    color: '#3b82f6',
    href: '/services/visibility',
    features: ['Photography (up to 10 products)', 'Basic listing optimisation', 'White background shots'],
  },
  {
    label: 'Professional',
    desc: 'For growing sellers ready to scale across marketplaces.',
    priceUSD: 14999 / 83, // ~$180
    priceINR: 14999,
    unit: 'starting at',
    color: '#10b981',
    href: '/services/professional',
    featured: true,
    features: ['Photography + A+ Content', 'Full listing + SEO copywriting', 'Brand storefront design'],
  },
  {
    label: 'Enterprise',
    desc: 'For established brands needing a dedicated growth team.',
    priceUSD: null,
    priceINR: null,
    unit: 'tailored pricing',
    color: '#d4af37',
    href: '/services/enterprise',
    features: ['Unlimited photography & design', 'Full ads management', 'Dedicated account manager'],
  },
];

const STATS = [
  { value: '500+', label: 'Products Shot' },
  { value: '3×', label: 'Avg. Sales Lift' },
  { value: '30+', label: 'Marketplaces' },
  { value: '98%', label: 'Client Retention' },
];

const WHY = [
  { icon: Shield, title: 'All-in-One Studio', desc: 'One team for photography, design, ads, and listings. No juggling vendors.' },
  { icon: Clock, title: 'Fast Turnaround', desc: 'Photography in 24–48 hrs. Listings in 3–5 days. Ad campaigns live in 5 days.' },
  { icon: TrendingUp, title: 'Results-Focused', desc: 'We track sales lift, CTR, and ROAS — not vanity metrics.' },
  { icon: Users, title: 'Dedicated Manager', desc: 'Your own account manager on WhatsApp. 2-hour response guarantee.' },
  { icon: Star, title: 'Studio-Grade Quality', desc: 'Studio-grade output across jewelry, fashion, home décor, beauty, and electronics categories.' },
  { icon: Zap, title: 'Transparent Pricing', desc: 'No hidden fees. No lock-in contracts. Cancel anytime.' },
];

export default function Services() {
  usePageMeta({
    title: 'Our Services — Saleixo',
    description: 'Product photography, Amazon listing optimisation, Shopify store design, social ads, and ecommerce management for online sellers.',
  });
  const { fmt } = useCurrency();
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>

        {/* ── HERO ── */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none hidden dark:block">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(215 45% 14%) 0%, hsl(220 35% 10%) 40%, hsl(222 30% 9%) 100%)' }} />
            <div className="absolute rounded-full" style={{ top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, hsl(210 85% 55% / 0.22) 0%, transparent 70%)', filter: 'blur(70px)' }} />
            <div className="absolute rounded-full" style={{ bottom: '-10%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, hsl(43 65% 52% / 0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          </div>
          <div className="absolute inset-0 pointer-events-none dark:hidden">
            <div className="absolute rounded-full" style={{ top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, hsl(210 85% 55% / 0.07) 0%, transparent 65%)', filter: 'blur(50px)' }} />
          </div>

          <div className="relative z-10 container mx-auto max-w-5xl text-center">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6"
                style={{ background: 'hsl(43 65% 52% / 0.12)', border: '1px solid hsl(43 65% 52% / 0.35)', color: '#d4af37' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                Our Services
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-extrabold leading-[1.04] tracking-tight mb-5 text-foreground"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>
              Everything your ecommerce brand<br />
              <span className="text-primary">needs to grow.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
              className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed text-muted-foreground">
              Photography, Amazon listings, Shopify stores, paid ads, and full account management — one studio, one team, measurable results.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              {['No Long-Term Contracts', 'Dedicated Account Manager', '30+ Marketplaces Covered', '500+ Products Shot'].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#d4af37]" />{t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-10 px-4 border-y" style={{ borderColor: 'hsl(var(--border))' }}>
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((s, i) => (
                <motion.div key={s.label} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="text-center">
                  <div className="text-4xl font-extrabold text-foreground mb-1" style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}>{s.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICE CARDS ── */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">WHAT WE DO</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                Five services. One studio.
              </h2>
            </motion.div>

            <div className="space-y-6">
              {SERVICES.map((svc, i) => {
                const Icon = svc.icon;
                const imageLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={svc.title}
                    variants={fadeUp}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}
                  >
                    <div className={`flex flex-col ${imageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

                      {/* Image */}
                      <div className="relative overflow-hidden lg:w-2/5 flex-shrink-0" style={{ minHeight: '280px' }}>
                        <img
                          src={svc.img}
                          alt={svc.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          style={{ minHeight: '280px' }}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
                        {/* Badge */}
                        <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full"
                          style={{ background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <Icon className="w-3.5 h-3.5" style={{ color: svc.color }} strokeWidth={1.5} />
                          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white">{svc.badge}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col justify-center p-7 md:p-10 lg:w-3/5">
                        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 tracking-tight">
                          {svc.title}
                        </h2>
                        <p className="text-base font-semibold mb-3" style={{ color: svc.color }}>
                          {svc.headline}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-lg">
                          {svc.desc}
                        </p>

                        <ul className="space-y-2 mb-7">
                          {svc.bullets.map(b => (
                            <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                              <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: svc.color }} strokeWidth={2} />
                              {b}
                            </li>
                          ))}
                        </ul>

                        <div>
                          <Link
                            to={svc.href}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
                            style={{ background: svc.color, color: '#fff' }}
                          >
                            {svc.cta} <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PRICING TIERS ── */}
        <section className="py-20 px-4" style={{ background: 'hsl(var(--surface))' }}>
          <div className="container mx-auto max-w-5xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">PRICING PLANS</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
                Three plans. Every stage of growth.
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto text-sm">
                Not sure which plan fits? Book a free call — we'll recommend the right one for your current stage.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TIERS.map((tier, i) => (
                <motion.div
                  key={tier.label}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  className="relative flex flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: tier.featured
                      ? `linear-gradient(135deg, hsl(174 37% 13%), hsl(220 30% 10%))`
                      : 'hsl(var(--card))',
                    border: `1px solid ${tier.featured ? `${tier.color}55` : 'hsl(var(--border))'}`,
                    boxShadow: tier.featured ? `0 8px 40px ${tier.color}18` : '0 2px 16px rgba(0,0,0,0.05)',
                  }}
                >
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold text-black"
                      style={{ background: tier.color }}>
                      Most Popular
                    </div>
                  )}

                  <div className="mb-1">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                      style={{ background: `${tier.color}18`, color: tier.color, border: `1px solid ${tier.color}35` }}>
                      {tier.label}
                    </span>
                  </div>

                  <div className="mt-4 mb-1">
                    <span className={`text-xs block mb-0.5 ${tier.featured ? 'text-white/50' : 'text-muted-foreground'}`}>{tier.unit}</span>
                    <span className={`text-3xl font-extrabold ${tier.featured ? 'text-white' : 'text-foreground'}`}
                      style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}>
                      {tier.priceUSD != null ? fmt(tier.priceUSD, tier.priceINR) : 'Custom'}
                    </span>
                  </div>

                  <p className={`text-xs mt-2 mb-5 leading-relaxed ${tier.featured ? 'text-white/60' : 'text-muted-foreground'}`}>
                    {tier.desc}
                  </p>

                  <ul className="space-y-2.5 flex-1 mb-7">
                    {tier.features.map(f => (
                      <li key={f} className={`flex items-start gap-2.5 text-sm ${tier.featured ? 'text-white/75' : 'text-muted-foreground'}`}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: tier.color }} strokeWidth={2} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={tier.href}
                    className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 text-center flex items-center justify-center gap-2"
                    style={tier.featured
                      ? { background: tier.color, color: '#fff' }
                      : { background: 'transparent', color: tier.color, border: `1.5px solid ${tier.color}55` }}
                  >
                    See {tier.label} Plan <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-center mt-8 rounded-2xl p-6"
              style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
              <p className="text-sm text-muted-foreground mb-3">Need a custom package across multiple services?</p>
              <Link
                to="/custom-pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={{ background: '#d4af37', color: '#000' }}>
                View Custom Pricing <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-muted-foreground mt-3">All prices exclude GST. Ad spend paid directly to the platform.</p>
            </motion.div>
          </div>
        </section>

        {/* ── WHY SALEIXO ── */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">WHY SALEIXO</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
                Your growth is our only metric.
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm">
                We're not just another studio. We're your dedicated growth partner — obsessed with delivering measurable ROI.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {WHY.map((w, i) => {
                const Icon = w.icon;
                return (
                  <motion.div key={w.title} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                    className="p-6 rounded-2xl"
                    style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: 'hsl(43 65% 52% / 0.12)', border: '1px solid hsl(43 65% 52% / 0.25)' }}>
                      <Icon className="w-5 h-5" style={{ color: '#d4af37' }} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{w.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-20 px-4" style={{ background: 'hsl(var(--surface))' }}>
          <div className="container mx-auto max-w-4xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, hsl(174 37% 13%) 0%, hsl(220 30% 10%) 100%)', border: '1px solid hsl(174 30% 22% / 0.5)' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, hsl(43 65% 52% / 0.15), transparent 70%)' }} />
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 relative z-10" style={{ color: '#d4af37' }}>FREE 30-MIN STRATEGY CALL</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
                Not sure which service is right?<br />Talk to us — it's free.
              </h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto text-sm relative z-10">
                Book a free 30-minute call. We'll review your current setup and recommend exactly which services will move the needle for your brand.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
                <Link to="/get-started"
                  className="px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
                  style={{ background: '#d4af37', color: '#000' }}>
                  Book My Free Call
                </Link>
                <a href="https://wa.me/917011441159" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
                  style={{ background: '#25D366', color: '#fff' }}>
                  WhatsApp Us
                </a>
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
}
