import { motion } from 'framer-motion';
import { ArrowRight, Check, Camera, ShoppingCart, BarChart2, Palette, Video, Star, TrendingUp, Users, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';

import imgPhotography from '@/assets/photography-service.jpg';
import imgDesign from '@/assets/design-service.jpg';
import imgMarketing from '@/assets/marketing-service.jpg';
import imgPortfolio1 from '@/assets/portfolio-1.jpg';
import imgPortfolio2 from '@/assets/portfolio-2.jpg';
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
    icon: Camera, color: '#3b82f6',
    title: 'Product Photography',
    desc: 'Studio-grade product photography that converts browsers into buyers. Every shot crafted to highlight your product\'s best features.',
    tags: ['White Background', 'Lifestyle Shoots', 'On-Model', '24–48hr Delivery'],
    img: imgPhotography,
  },
  {
    icon: ShoppingCart, color: '#10b981',
    title: 'Ecommerce Listing Design',
    desc: 'End-to-end listing optimization across Amazon, Flipkart, Etsy, Shopify and more. A+ content, PDPs, and brand storefronts.',
    tags: ['A+ Content', 'SEO Optimized', 'Multi-Platform', 'Brand Storefront'],
    img: imgDesign,
  },
  {
    icon: BarChart2, color: '#8b5cf6',
    title: 'Digital Marketing & Ads',
    desc: 'Data-driven ad campaigns on Google, Meta, and marketplaces. Average 250% ROI across all campaigns — every rupee tracked.',
    tags: ['Google Ads', 'Meta Ads', '250% Avg. ROI', 'A/B Testing'],
    img: imgMarketing,
  },
  {
    icon: Palette, color: '#f97316',
    title: 'Brand Identity & Design',
    desc: 'Stand out from every competitor with a premium brand identity — logos, brand kits, packaging design, and visual language.',
    tags: ['Logo Design', 'Brand Kit', 'Packaging', 'Print & Digital'],
    img: imgPortfolio1,
  },
  {
    icon: Video, color: '#ec4899',
    title: 'Product Video Production',
    desc: 'Short-form product videos and reels that dominate social feeds. Delivered in 3–5 days at a fraction of traditional costs.',
    tags: ['Product Reels', '3-Day Delivery', 'Social Ready', 'Amazon Video'],
    img: imgPortfolio2,
  },
  {
    icon: TrendingUp, color: '#d4af37',
    title: 'Marketplace Strategy',
    desc: 'Full marketplace setup, keyword research, competitor analysis, and ongoing optimization to dominate your category.',
    tags: ['Keyword Research', 'Competitor Analysis', 'Rank Optimization', 'Analytics'],
    img: imgPortfolio3,
  },
];

const PRICING = [
  {
    badge: 'ONE-TIME',
    title: 'Product Photography',
    price: '₹4,999',
    unit: 'starting at',
    desc: 'Best for new sellers & product launches',
    features: [
      'Up to 10 products, white background',
      'Delivered in 24–48 hours',
      'High-res retouched images',
      'Amazon/Flipkart ready formats',
    ],
    cta: 'Get a Quote',
    featured: false,
    color: '#3b82f6',
  },
  {
    badge: 'ONE-TIME',
    title: 'Listing Design Package',
    price: '₹9,999',
    unit: 'starting at',
    desc: 'Complete listing makeover for one product',
    features: [
      'A+ Content (5 modules)',
      'Main image + 6 infographic images',
      'SEO-optimized title & bullets',
      'Brand storefront design',
    ],
    cta: 'Get a Quote',
    featured: true,
    color: '#10b981',
  },
  {
    badge: 'PER MONTH',
    title: 'Growth Retainer',
    price: '₹24,999',
    unit: 'starting at',
    desc: 'Full-service monthly management',
    features: [
      'Photography + listing design',
      'Google & Meta ad management',
      'Social media content (12 posts)',
      'Monthly analytics report',
    ],
    cta: 'Book Free Call',
    featured: false,
    color: '#8b5cf6',
  },
  {
    badge: 'PER MONTH',
    title: 'Social Media Management',
    price: '₹7,999',
    unit: 'starting at',
    desc: 'Consistent content that builds trust',
    features: [
      'Month-on-month, cancel anytime',
      '3 platforms (Instagram, Facebook, Pinterest)',
      '15 posts/month, professional design',
      'Captions + hashtags + monthly report',
    ],
    cta: 'Get a Quote',
    featured: false,
    color: '#f97316',
  },
  {
    badge: 'PER VIDEO',
    title: 'Product Video',
    price: '₹2,999',
    unit: 'starting at',
    desc: 'Broadcast-quality at fraction of cost',
    features: [
      'Delivered in 3–5 days',
      'Up to 60 sec, professional edit',
      'Text animations + music',
      'Ready for Instagram, Amazon & YouTube',
    ],
    cta: 'Get a Quote',
    featured: false,
    color: '#ec4899',
  },
  {
    badge: 'CUSTOM',
    title: 'Enterprise Package',
    price: 'Custom',
    unit: 'tailored pricing',
    desc: 'Full-service for large sellers & brands',
    features: [
      'Dedicated account manager',
      'Unlimited photography & design',
      'Full ads management + CRM',
      'Priority support & weekly calls',
    ],
    cta: 'Talk to Us',
    featured: false,
    color: '#d4af37',
  },
];

const STATS = [
  { value: '500+', label: 'Products Shot', icon: Camera },
  { value: '3×', label: 'Avg. Sales Lift', icon: TrendingUp },
  { value: '9', label: 'Marketplaces', icon: ShoppingCart },
  { value: '98%', label: 'Client Retention', icon: Users },
];

const STEPS = [
  { num: '01', title: 'Free Consultation', badge: 'DISCOVERY CALL', desc: 'We start with a free 30-minute call to understand your products, target markets, and goals — zero obligation.' },
  { num: '02', title: 'Custom Strategy', badge: 'GROWTH ROADMAP', desc: 'Our team builds a tailored plan with clear deliverables, timelines, and expected outcomes for your brand.' },
  { num: '03', title: 'Shoot & Design', badge: 'BUILD & LAUNCH', desc: 'We handle everything — photography, editing, listing design, and publishing — on time and on budget.' },
  { num: '04', title: 'Scale & Optimise', badge: 'ONGOING GROWTH', desc: 'Track results with transparent reports, optimise what works, and scale your sales every single month.' },
];

const WHY = [
  { icon: Shield, title: 'All-in-One Studio', desc: 'Stop juggling multiple vendors. One team handles photography, design, ads, and marketing — saving you time and money.' },
  { icon: Clock, title: 'Fast Turnaround', desc: 'Product photography in 24–48 hours. Listing design in 3–5 days. Ad campaigns live in 48 hours. We respect your timeline.' },
  { icon: TrendingUp, title: 'Results-Focused', desc: 'Every deliverable is optimised for conversion. We track sales lift, CTR, and ROI — not just vanity metrics.' },
  { icon: Users, title: 'Dedicated Manager', desc: 'Your own account manager on WhatsApp. Direct access, weekly updates, and response within 2 hours.' },
  { icon: Star, title: 'Studio-Grade Quality', desc: 'International-trained photographers with 20+ years of experience. We\'ve worked with Pottery Barn, FNP, and Pepperfry.' },
  { icon: BarChart2, title: 'Transparent Reporting', desc: 'Real-time dashboards and monthly reports so you always know exactly what\'s working and where your money goes.' },
];

const scrollToContact = () =>
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

export default function Services() {
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>

        {/* ── HERO ── */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(215 45% 14%) 0%, hsl(220 35% 10%) 40%, hsl(222 30% 9%) 100%)' }} />
            <div className="absolute rounded-full" style={{ top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, hsl(210 85% 55% / 0.25) 0%, transparent 70%)', filter: 'blur(70px)' }} />
            <div className="absolute rounded-full" style={{ bottom: '-10%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, hsl(43 65% 52% / 0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          </div>
          <div className="relative z-10 container mx-auto max-w-5xl text-center">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6"
                style={{ background: 'hsl(43 65% 52% / 0.12)', border: '1px solid hsl(43 65% 52% / 0.35)', color: '#d4af37' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                Our Services & Pricing
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-extrabold leading-[1.04] tracking-tight mb-5 text-white"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}>
              Every Service. Every Price.<br />
              <span style={{ color: '#60a5fa' }}>No Surprises.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
              className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed text-white/60">
              Studio-grade photography, ecommerce design, and digital marketing — built to convert. Transparent pricing, zero hidden charges.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
              {['No Long-Term Contracts', 'Results in 30 Days', 'Dedicated Account Manager', '500+ Products Shot'].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#d4af37]" />{t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-12 px-4 border-y" style={{ borderColor: 'hsl(var(--border))' }}>
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div key={s.label} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="text-center">
                    <div className="text-4xl font-extrabold text-foreground mb-1" style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}>{s.value}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest">{s.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SERVICES GRID ── */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">OUR SERVICES</p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                Complete Digital Solutions<br />
                <span style={{ color: 'hsl(174 37% 45%)' }}>for Online Sellers</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Stop juggling multiple agencies. One dedicated team handles your photography, design, ads, and marketing — so you get results, not headaches.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <motion.div key={svc.title} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                    className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
                    <div className="relative overflow-hidden" style={{ height: '180px' }}>
                      <img src={svc.img} alt={svc.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${svc.color}22`, border: `1px solid ${svc.color}55`, backdropFilter: 'blur(8px)' }}>
                        <Icon className="w-5 h-5" style={{ color: svc.color }} />
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold text-foreground mb-2">{svc.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{svc.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {svc.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: `${svc.color}15`, color: svc.color, border: `1px solid ${svc.color}30` }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button onClick={scrollToContact}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 hover:gap-2.5"
                        style={{ color: svc.color }}>
                        Get a Free Quote <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="py-20 px-4" style={{ background: 'hsl(var(--surface))' }}>
          <div className="container mx-auto max-w-6xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">TRANSPARENT PRICING</p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                Every Service. Every Price.<br />
                <span style={{ color: '#d4af37' }}>No Surprises.</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Packages built for ecommerce sellers. No hidden fees, no lock-in contracts.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {PRICING.map((plan, i) => (
                <motion.div key={plan.title} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
                  className="relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: plan.featured ? `linear-gradient(135deg, hsl(174 37% 14%), hsl(220 30% 10%))` : 'hsl(var(--card))',
                    border: plan.featured ? `1px solid ${plan.color}55` : '1px solid hsl(var(--border))',
                    boxShadow: plan.featured ? `0 8px 40px ${plan.color}20` : '0 2px 16px rgba(0,0,0,0.06)',
                  }}>
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-black"
                      style={{ background: plan.color }}>
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                      style={{ background: `${plan.color}18`, color: plan.color, border: `1px solid ${plan.color}35` }}>
                      {plan.badge}
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold mb-1 ${plan.featured ? 'text-white' : 'text-foreground'}`}>{plan.title}</h3>
                  <p className={`text-xs mb-4 ${plan.featured ? 'text-white/60' : 'text-muted-foreground'}`}>{plan.desc}</p>
                  <div className="mb-5">
                    <span className={`text-xs block mb-0.5 ${plan.featured ? 'text-white/50' : 'text-muted-foreground'}`}>{plan.unit}</span>
                    <span className={`text-3xl font-extrabold ${plan.featured ? 'text-white' : 'text-foreground'}`} style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}>
                      {plan.price}
                    </span>
                  </div>
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {plan.features.map(f => (
                      <li key={f} className={`flex items-start gap-2.5 text-sm ${plan.featured ? 'text-white/75' : 'text-muted-foreground'}`}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={scrollToContact}
                    className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
                    style={plan.featured
                      ? { background: plan.color, color: '#fff' }
                      : { background: 'transparent', color: plan.color, border: `1.5px solid ${plan.color}55` }}>
                    {plan.cta}
                  </button>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-center rounded-2xl p-6"
              style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
              <p className="text-sm text-muted-foreground mb-3">Need a custom package? We'll build one for you.</p>
              <button onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={{ background: '#d4af37', color: '#000' }}>
                Get Custom Quote <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-muted-foreground mt-3">All prices exclude GST. Ad spend is paid directly to the platform.</p>
            </motion.div>
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">PROVEN RESULTS</p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                Data-Driven Results That<br />
                <span style={{ color: 'hsl(174 37% 45%)' }}>Actually Deliver</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                We don't just shoot products — we engineer growth. Here's what our clients achieve.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                { value: '3×', label: 'Average Sales Lift', desc: 'Our clients consistently see 3× more sales within the first 90 days of professional photography and listing optimization.' },
                { value: '98%', label: 'Client Retention Rate', desc: 'Our clients stay because we deliver measurable ROI month after month — not just promises, but proof.' },
                { value: '500+', label: 'Products Shot', desc: 'Total products photographed and listed across Amazon, Flipkart, Etsy, Shopify, and 5 other marketplaces.' },
                { value: '9', label: 'Marketplaces Covered', desc: 'We publish optimised listings across every major marketplace simultaneously — in every target market.' },
              ].map((stat, i) => (
                <motion.div key={stat.label} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                  className="flex gap-5 p-6 rounded-2xl"
                  style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
                  <div className="text-4xl font-extrabold flex-shrink-0" style={{ color: '#d4af37', fontFamily: '"Inter Tight", Inter, sans-serif' }}>{stat.value}</div>
                  <div>
                    <div className="font-bold text-foreground mb-1">{stat.label}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{stat.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-20 px-4" style={{ background: 'hsl(var(--surface))' }}>
          <div className="container mx-auto max-w-5xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">HOW IT WORKS</p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                Simple 4-Step Process
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {STEPS.map((step, i) => (
                <motion.div key={step.num} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                  className="flex gap-5 p-6 rounded-2xl"
                  style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
                  <div className="text-5xl font-extrabold flex-shrink-0 leading-none" style={{ color: 'hsl(var(--border))', fontFamily: '"Inter Tight", Inter, sans-serif' }}>{step.num}</div>
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 rounded-full mb-2 inline-block"
                      style={{ background: 'hsl(43 65% 52% / 0.12)', color: '#d4af37', border: '1px solid hsl(43 65% 52% / 0.3)' }}>
                      {step.badge}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    <button onClick={scrollToContact}
                      className="mt-3 text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 hover:gap-2.5"
                      style={{ color: '#d4af37' }}>
                      Get started <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mt-10">
              <button onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold transition-all duration-200 hover:opacity-90"
                style={{ background: '#d4af37', color: '#000' }}>
                Start Your Growth Journey — Free Call <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* ── WHY SALEIXO ── */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">WHY SALEIXO</p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                Your Growth Is<br />
                <span style={{ color: 'hsl(174 37% 45%)' }}>Our Only Metric</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
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
                      <Icon className="w-5 h-5" style={{ color: '#d4af37' }} />
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
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, hsl(174 37% 14%) 0%, hsl(220 30% 10%) 100%)', border: '1px solid hsl(174 30% 22% / 0.6)' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, hsl(43 65% 52% / 0.15), transparent 70%)' }} />
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: '#d4af37' }}>FREE 30-MIN STRATEGY CALL</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stop Losing Sales to<br />Competitors with Better Images.
              </h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                Book a free 30-minute strategy call. We'll audit your current listings and give you a custom action plan to double your sales — absolutely free.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm text-white/50">
                {['No Commitment Required', '100% Free Strategy Call', 'Custom Growth Plan Included'].map(t => (
                  <span key={t} className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#d4af37]" />{t}</span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={scrollToContact}
                  className="px-8 py-4 rounded-full text-base font-semibold transition-all duration-200 hover:opacity-90"
                  style={{ background: '#d4af37', color: '#000' }}>
                  Book My Free Strategy Call
                </button>
                <a href="https://wa.me/917011441159" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full text-base font-semibold transition-all duration-200 hover:opacity-90"
                  style={{ background: '#25D366', color: '#fff' }}>
                  WhatsApp Us Directly
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
