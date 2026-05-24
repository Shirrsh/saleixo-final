import { useEffect, useState } from 'react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';

import { Globe, Phone, Users, Camera, Search, BarChart3, Megaphone, Target, Headphones, Shield, CheckCircle2, TrendingUp, Film, UserCheck, Palette, Store, Star, ArrowRight } from 'lucide-react';

import CoreServices from '@/components/design/CoreServices';
import StrategySection from '@/components/design/StrategySection';
import WhyChooseUs from '@/components/design/WhyChooseUs';
import SocialMediaMarketing from '@/components/design/SocialMediaMarketing';
import FreeAuditCTA from '@/components/design/FreeAuditCTA';
import PlatformsTabs from '@/components/design/PlatformsTabs';

const processSteps = [
  { icon: Phone, title: 'Onboarding Call', bullets: ['Understand your products & brand vision', 'Market research & competitor analysis', 'Define target platforms & pricing strategy'] },
  { icon: Camera, title: 'Product Photography', bullets: ['Studio-grade catalog shots', 'Lifestyle & contextual imagery', 'Short-form video content for listings'] },
  { icon: Search, title: 'Listing Creation & Optimization', bullets: ['SEO-optimized titles & descriptions', 'A+ / A++ content for Amazon & Flipkart', 'Backend keyword optimization'] },
  { icon: Store, title: 'Store Setup & Launch', bullets: ['Multi-platform account setup', 'Brand storefront design', 'Payment & shipping configuration'] },
  { icon: Megaphone, title: 'Marketing & Ads', bullets: ['PPC campaign management', 'Social media promotions', 'Deal & coupon strategy'] },
  { icon: BarChart3, title: 'Growth & Reporting', bullets: ['Weekly sales analytics dashboard', 'Inventory & pricing optimization', 'Ongoing listing improvements'] },
];

const teamRoles = [
  { icon: Camera, title: 'Product Photographers', desc: 'Studio-grade product & lifestyle photography that sells.' },
  { icon: Film, title: 'Photo & Video Editors', desc: 'Professional retouching, infographics & short-form video.' },
  { icon: Search, title: 'Listing & SEO Specialists', desc: 'Keyword research, A+ content & conversion-focused copy.' },
  { icon: Target, title: 'PPC & Marketing Managers', desc: 'Ad campaigns, social media & promotional strategy.' },
  { icon: Palette, title: 'Brand Designers', desc: 'Logos, packaging, storefronts & marketing collateral.' },
  { icon: UserCheck, title: 'Dedicated Account Managers', desc: 'Single point of contact for seamless communication.' },
];

const resultsColumns = [
  { icon: TrendingUp, title: 'Sales Growth', points: ['Optimized, conversion-ready listings', 'Targeted PPC ad campaigns', 'Dynamic pricing strategy', 'Cross-platform sales channels'] },
  { icon: Globe, title: 'Brand Visibility', points: ['Professional brand storefronts', 'A+ / Enhanced brand content', 'Social-proof & review strategy', 'Multi-marketplace presence'] },
  { icon: Headphones, title: 'Ongoing Support', points: ['Weekly performance reports', 'Direct WhatsApp access', 'Dedicated account manager', 'Continuous listing improvements'] },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const Design = () => {
  usePageMeta({
    title: 'Ecommerce Design Services — Saleixo',
    description: 'Brand identity, listing design, and storefront design for ecommerce sellers. Built for Amazon, Shopify, and all major marketplaces.',
  });
  const [isLight, setIsLight] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'light';
    return !window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const sync = () => setIsLight(document.documentElement.classList.contains('light'));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const bg = isLight ? '#ffffff' : 'hsl(220 30% 7%)';
  const textPrimary = isLight ? '#0a0a0a' : '#ffffff';
  const textMuted = isLight ? 'hsl(0 0% 38%)' : 'hsl(215 20% 62%)';
  const accentBlue = isLight ? 'hsl(210 85% 45%)' : '#60a5fa';
  const borderColor = isLight ? 'hsl(0 0% 88%)' : 'hsl(215 40% 24% / 0.6)';
  const cardBg = isLight ? 'hsl(0 0% 97%)' : 'hsl(220 28% 11%)';
  const cardBorder = isLight ? 'hsl(0 0% 88%)' : 'hsl(215 40% 22% / 0.6)';

  const scrollToContact = () => { window.location.href = '/#contact'; };

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: bg }}>

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          {!isLight && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(215 45% 14%) 0%, hsl(220 35% 10%) 40%, hsl(222 30% 9%) 100%)' }} />
              <div className="absolute rounded-full" style={{ top: '-15%', left: '-8%', width: '650px', height: '650px', background: 'radial-gradient(circle, hsl(210 85% 55% / 0.32) 0%, hsl(220 70% 35% / 0.14) 45%, transparent 70%)', filter: 'blur(70px)' }} />
              <div className="absolute rounded-full" style={{ bottom: '-10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, hsl(258 70% 55% / 0.18) 0%, transparent 65%)', filter: 'blur(60px)' }} />
            </div>
          )}
          {isLight && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute rounded-full" style={{ top: '-10%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, hsl(210 85% 55% / 0.06) 0%, transparent 65%)', filter: 'blur(40px)' }} />
            </div>
          )}

          <div className="relative z-10 container mx-auto text-center max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
              style={isLight ? { background: 'hsl(0 0% 94%)', border: '1px solid hsl(0 0% 82%)', color: 'hsl(0 0% 25%)' } : { background: 'hsl(210 85% 55% / 0.15)', border: '1px solid hsl(210 85% 65% / 0.4)', color: '#93c5fd' }}
            >
              <Globe className="w-3 h-3" />
              30+ Marketplaces · 7 Countries
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-extrabold leading-[1.04] tracking-tight mb-5"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)', color: textPrimary }}
            >
              Your Products. Our Expertise.{' '}
              <span style={{ color: accentBlue }}>Global Sales.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
              style={{ color: textMuted }}
            >
              End-to-end ecommerce management — from product photography to marketplace ads — so you can focus on your craft while we drive revenue.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
            >
              <button
                onClick={scrollToContact}
                className="px-6 py-3 rounded-xl font-semibold text-sm transition-opacity duration-200"
                style={{ background: isLight ? '#0a0a0a' : '#ffffff', color: isLight ? '#ffffff' : '#0a0a0a' }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.82')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
              >
                Get Started
                <ArrowRight className="inline ml-2 w-4 h-4" />
              </button>
              <button
                onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{ color: textMuted, border: `1.5px solid ${borderColor}` }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = textPrimary; el.style.borderColor = isLight ? '#0a0a0a' : '#ffffff'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = textMuted; el.style.borderColor = borderColor; }}
              >
                See Our Process
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.46 }}
              className="flex flex-wrap justify-center gap-10 pt-6"
              style={{ borderTop: `1px solid ${borderColor}` }}
            >
              {[
                { value: '500+', label: 'Artisans Helped' },
                { value: '30+', label: 'Marketplaces' },
                { value: '7', label: 'Countries' },
                { value: '98%', label: 'Satisfaction Rate' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-extrabold" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}>{s.value}</div>
                  <div className="text-xs font-medium mt-0.5" style={{ color: isLight ? 'hsl(0 0% 45%)' : '#94a3b8' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Core Services ── */}
        <CoreServices />

        {/* ── How It Works ── */}
        <section id="process" className="py-20 px-4" style={{ background: isLight ? 'hsl(0 0% 97%)' : 'hsl(220 28% 9%)' }}>
          <div className="container mx-auto max-w-5xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-14"
            >
              <span
                className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
                style={isLight ? { background: 'hsl(0 0% 92%)', border: '1px solid hsl(0 0% 82%)', color: 'hsl(0 0% 30%)' } : { background: 'hsl(210 85% 55% / 0.15)', border: '1px solid hsl(210 85% 55% / 0.3)', color: '#93c5fd' }}
              >
                Process
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-3" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}>
                How It Works
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: textMuted }}>
                A transparent 6-step process — you'll know exactly what's happening at every stage.
              </p>
            </motion.div>

            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: borderColor }} />
              <div className="space-y-10 md:space-y-14">
                {processSteps.map((step, i) => {
                  const isLeft = i % 2 === 0;
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      custom={i * 0.5}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      className="relative md:flex md:items-start md:gap-8"
                    >
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-11 h-11 rounded-full items-center justify-center font-bold text-sm z-10"
                        style={{ background: isLight ? '#0a0a0a' : '#ffffff', color: isLight ? '#ffffff' : '#0a0a0a', border: `3px solid ${isLight ? '#ffffff' : 'hsl(220 30% 7%)'}` }}>
                        {i + 1}
                      </div>
                      <div className={`md:w-[calc(50%-2rem)] ${isLeft ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'}`}>
                        <div
                          className="rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300"
                          style={{ background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: isLight ? '0 2px 12px hsl(0 0% 0% / 0.06)' : '0 4px 20px hsl(220 30% 5% / 0.4)' }}
                        >
                          <div className={`flex items-center gap-3 mb-3 md:hidden`}>
                            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                              style={{ background: isLight ? '#0a0a0a' : '#ffffff', color: isLight ? '#ffffff' : '#0a0a0a' }}>
                              {i + 1}
                            </div>
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={isLight ? { background: 'hsl(0 0% 92%)' } : { background: 'hsl(210 85% 55% / 0.12)', border: '1px solid hsl(210 85% 55% / 0.2)' }}>
                              <Icon className="w-4 h-4" style={{ color: accentBlue }} strokeWidth={1.5} />
                            </div>
                            <h3 className="font-bold text-base" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}>{step.title}</h3>
                          </div>
                          <div className={`hidden md:flex mb-3 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                              style={isLight ? { background: 'hsl(0 0% 92%)' } : { background: 'hsl(210 85% 55% / 0.12)', border: '1px solid hsl(210 85% 55% / 0.2)' }}>
                              <Icon className="w-4 h-4" style={{ color: accentBlue }} strokeWidth={1.5} />
                            </div>
                          </div>
                          <h3 className="hidden md:block font-bold text-base mb-2" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}>{step.title}</h3>
                          <ul className={`space-y-1.5 ${isLeft ? 'md:text-right' : ''}`}>
                            {step.bullets.map((b, j) => (
                              <li key={j} className={`flex items-start gap-2 text-xs ${isLeft ? 'md:flex-row-reverse' : ''}`} style={{ color: textMuted }}>
                                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: accentBlue }} strokeWidth={1.5} />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Strategy ── */}
        <StrategySection />

        {/* ── Expert Team ── */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-12"
            >
              <span
                className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
                style={isLight ? { background: 'hsl(0 0% 92%)', border: '1px solid hsl(0 0% 82%)', color: 'hsl(0 0% 30%)' } : { background: 'hsl(210 85% 55% / 0.15)', border: '1px solid hsl(210 85% 55% / 0.3)', color: '#93c5fd' }}
              >
                The Team
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-3" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}>
                Our <span style={{ color: accentBlue }}>Expert Team</span>
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: textMuted }}>
                Every client gets a dedicated team of specialists — not a single freelancer.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {teamRoles.map((role, i) => {
                const Icon = role.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    custom={i * 0.5}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="group rounded-2xl p-6 text-center"
                    style={{ background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: isLight ? '0 2px 12px hsl(0 0% 0% / 0.05)' : '0 4px 20px hsl(220 30% 5% / 0.35)' }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.borderColor = isLight ? 'hsl(210 85% 55% / 0.4)' : 'hsl(210 85% 55% / 0.4)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.borderColor = cardBorder;
                    }}
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={isLight ? { background: 'hsl(0 0% 92%)' } : { background: 'hsl(210 85% 55% / 0.12)', border: '1px solid hsl(210 85% 55% / 0.2)' }}>
                      <Icon className="w-7 h-7" style={{ color: accentBlue }} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-base mb-1.5" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}>{role.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: textMuted }}>{role.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              variants={fadeUp}
              custom={6}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-8 flex items-center justify-center gap-2 font-semibold text-sm"
              style={{ color: accentBlue }}
            >
              <Users className="w-4 h-4" />
              Dedicated team assigned from Day 1
            </motion.div>
          </div>
        </section>

        {/* ── Platforms ── */}
        <PlatformsTabs />

        {/* ── Why Choose Us ── */}
        <WhyChooseUs />

        {/* ── Social Media Marketing ── */}
        <SocialMediaMarketing />

        {/* ── What You Get ── */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-12"
            >
              <span
                className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
                style={isLight ? { background: 'hsl(0 0% 92%)', border: '1px solid hsl(0 0% 82%)', color: 'hsl(0 0% 30%)' } : { background: 'hsl(210 85% 55% / 0.15)', border: '1px solid hsl(210 85% 55% / 0.3)', color: '#93c5fd' }}
              >
                Deliverables
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-3" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}>
                What You <span style={{ color: accentBlue }}>Get</span>
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: textMuted }}>
                Measurable results backed by a satisfaction guarantee.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5 mb-8">
              {resultsColumns.map((col, i) => {
                const Icon = col.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    custom={i * 0.5}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl p-6"
                    style={{ background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: isLight ? '0 2px 12px hsl(0 0% 0% / 0.05)' : '0 4px 20px hsl(220 30% 5% / 0.35)' }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={isLight ? { background: 'hsl(0 0% 92%)' } : { background: 'hsl(210 85% 55% / 0.12)', border: '1px solid hsl(210 85% 55% / 0.2)' }}>
                      <Icon className="w-6 h-6" style={{ color: accentBlue }} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-lg mb-3" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}>{col.title}</h3>
                    <ul className="space-y-2.5">
                      {col.points.map((pt, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-xs" style={{ color: textMuted }}>
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: accentBlue }} strokeWidth={1.5} />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            {/* Guarantee badges */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center"
              style={{
                background: isLight ? 'hsl(210 85% 55% / 0.04)' : 'hsl(210 85% 55% / 0.07)',
                border: `1px solid ${isLight ? 'hsl(210 85% 55% / 0.25)' : 'hsl(210 85% 55% / 0.22)'}`,
              }}
            >
              {[
                { icon: Shield, label: '100% Satisfaction' },
                { icon: Star, label: 'Unlimited Revisions' },
                { icon: UserCheck, label: 'Dedicated Manager' },
              ].map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <div key={i} className="flex items-center gap-2 font-semibold text-sm" style={{ color: textPrimary }}>
                    <Icon className="w-4 h-4" style={{ color: accentBlue }} strokeWidth={1.5} />
                    {badge.label}
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── Free Audit CTA ── */}
        <FreeAuditCTA />

        {/* ── Final CTA ── */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative rounded-2xl p-10 md:p-14 text-center overflow-hidden"
              style={{
                background: isLight ? 'hsl(0 0% 97%)' : 'hsl(220 28% 11%)',
                border: `1px solid ${isLight ? 'hsl(0 0% 88%)' : 'hsl(210 85% 55% / 0.2)'}`,
                boxShadow: isLight ? '0 4px 32px hsl(0 0% 0% / 0.06)' : '0 8px 48px hsl(210 85% 55% / 0.12)',
              }}
            >
              {!isLight && (
                <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, hsl(210 85% 55% / 0.08) 0%, transparent 70%)' }} />
              )}
              <div className="relative z-10">
                <span
                  className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-5"
                  style={isLight ? { background: 'hsl(0 0% 92%)', border: '1px solid hsl(0 0% 82%)', color: 'hsl(0 0% 30%)' } : { background: 'hsl(210 85% 55% / 0.15)', border: '1px solid hsl(210 85% 55% / 0.3)', color: '#93c5fd' }}
                >
                  Ready to Scale?
                </span>
                <h2
                  className="font-extrabold tracking-tight mb-4"
                  style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: textPrimary }}
                >
                  Ready to Sell <span style={{ color: accentBlue }}>Globally?</span>
                </h2>
                <p className="text-base max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: textMuted }}>
                  Book a free consultation and let our team build your ecommerce success story.
                </p>
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-opacity duration-200"
                  style={{ background: isLight ? '#0a0a0a' : '#ffffff', color: isLight ? '#ffffff' : '#0a0a0a' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.82')}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
                >
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </button>
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

export default Design;
