import { useSiteImages } from '@/hooks/useSiteImages';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import img1Src from '@/assets/hero/showcase-1.jpg';
import img2Src from '@/assets/hero/showcase-2.jpg';
import img3Src from '@/assets/hero/showcase-3.jpg';
import img4Src from '@/assets/hero/showcase-4.jpg';

// ── Auto-scrolling image column ───────────────────────────────────────────────
const ScrollColumn = ({
  srcs,
  direction,
  duration,
  offset = 0,
  isLight,
}: {
  srcs: string[];
  direction: 'up' | 'down';
  duration: number;
  offset?: number;
  isLight: boolean;
}) => {
  const doubled = [...srcs, ...srcs];
  const cardH = 260;
  const gap = 10;
  const totalH = srcs.length * (cardH + gap);

  return (
    <div className="relative flex-1 overflow-hidden" style={{ height: '100%' }}>
      <div
        className="flex flex-col"
        style={{
          gap: `${gap}px`,
          marginTop: offset ? `${offset}px` : undefined,
          animation: `scroll-${direction} ${duration}s linear infinite`,
          willChange: 'transform',
          ['--scroll-total' as string]: `-${totalH}px`,
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl flex-shrink-0"
            style={{
              height: `${cardH}px`,
              border: isLight
                ? '1px solid hsl(0 0% 88%)'
                : '1px solid hsl(215 50% 35% / 0.3)',
              boxShadow: isLight
                ? '0 2px 12px hsl(0 0% 0% / 0.08)'
                : '0 2px 16px hsl(220 30% 5% / 0.5)',
            }}
          >
            <img
              src={src}
              alt="Portfolio showcase"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const { getImageUrl } = useSiteImages('hero');
  const sectionRef = useRef<HTMLElement>(null);

  // Sync theme from localStorage on first render — avoids flash of wrong theme
  const [isLight, setIsLight] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'light';
    return !window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const sync = () =>
      setIsLight(document.documentElement.classList.contains('light'));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => obs.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  const col1 = [
    getImageUrl('hero_showcase_1', img1Src),
    getImageUrl('hero_showcase_3', img3Src),
    getImageUrl('hero_showcase_2', img2Src),
    getImageUrl('hero_showcase_4', img4Src),
  ];
  const col2 = [
    getImageUrl('hero_showcase_2', img2Src),
    getImageUrl('hero_showcase_4', img4Src),
    getImageUrl('hero_showcase_1', img1Src),
    getImageUrl('hero_showcase_3', img3Src),
  ];

  // Design tokens
  const bg = isLight ? '#ffffff' : 'hsl(220 30% 7%)';
  const textPrimary = isLight ? '#0a0a0a' : '#ffffff';
  const textAccent = isLight ? 'hsl(210 85% 45%)' : '#60a5fa';
  const textMuted = isLight ? 'hsl(0 0% 35%)' : '#cbd5e1';
  const borderColor = isLight ? 'hsl(0 0% 88%)' : 'hsl(215 40% 30% / 0.6)';

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden w-full"
      style={{ background: bg }}
    >
      {/* ── Dark mode background layers ── */}
      {!isLight && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: bgOpacity }}
        >
          {/* Base gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, hsl(215 45% 14%) 0%, hsl(220 35% 10%) 40%, hsl(222 30% 9%) 100%)',
            }}
          />
          {/* Blue shimmer */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(115deg, transparent 0%, hsl(210 60% 30% / 0.1) 40%, transparent 65%)',
            }}
          />
          {/* Top aura */}
          <div
            className="absolute rounded-full"
            style={{
              top: '-10%',
              left: '-5%',
              width: '700px',
              height: '700px',
              background:
                'radial-gradient(circle, hsl(210 85% 55% / 0.45) 0%, hsl(220 70% 35% / 0.2) 45%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </motion.div>
      )}

      {/* ── Full-width layout: left text | right gallery ── */}
      {/* Desktop: side-by-side flex row at full viewport height */}
      {/* Mobile: stacked — text on top, image strip below */}
      <div className="relative z-10 w-full">

        {/* Text content — full width on mobile, half on desktop */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 w-full lg:w-1/2 lg:h-screen pt-24 pb-8 lg:py-0">

          {/* Eyebrow badge */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex self-start px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-5"
            style={
              isLight
                ? {
                    background: 'hsl(0 0% 94%)',
                    border: '1px solid hsl(0 0% 82%)',
                    color: 'hsl(0 0% 20%)',
                  }
                : {
                    background: 'hsl(210 85% 55% / 0.15)',
                    border: '1px solid hsl(210 85% 65% / 0.5)',
                    color: '#93c5fd',
                  }
            }
          >
            ✦ Studio-Grade Photography
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold leading-[1.02] tracking-tight mb-4"
            style={{
              fontFamily: '"Inter Tight", Inter, sans-serif',
              fontSize: 'clamp(2.4rem, 7vw, 5.2rem)',
            }}
          >
            <span style={{ color: textPrimary, display: 'block' }}>Transform Your</span>
            <span style={{ color: textPrimary, display: 'block' }}>Brand Into</span>
            <span style={{ display: 'block' }}>
              <span style={{ color: textPrimary }}>Market-</span>
              <span style={{ color: textAccent, textShadow: isLight ? 'none' : '0 0 40px hsl(210 90% 65% / 0.6)' }}>
                Winning
              </span>
            </span>
            <span
              style={{
                display: 'block',
                WebkitTextStroke: isLight ? '2px hsl(0 0% 15%)' : '2px hsl(215 60% 55%)',
                color: 'transparent',
                opacity: isLight ? 0.18 : 0.55,
              }}
            >
              Brands
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base lg:text-lg mb-6 max-w-sm leading-relaxed font-medium"
            style={{ color: textMuted }}
          >
            Studio-grade product photography and ecommerce design — built to convert.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="flex flex-col sm:flex-row gap-3 mb-7"
          >
            <button
              onClick={scrollToContact}
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-opacity duration-200 whitespace-nowrap text-center"
              style={{
                background: isLight ? '#0a0a0a' : '#ffffff',
                color: isLight ? '#ffffff' : '#0a0a0a',
                minHeight: '48px',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.82')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
            >
              Book Free Strategy Call
            </button>

            <Link
              to="/categories"
              className="group flex items-center justify-center sm:justify-start gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap"
              style={{
                color: textMuted,
                border: `1.5px solid ${borderColor}`,
                minHeight: '48px',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = textPrimary;
                el.style.borderColor = isLight ? '#0a0a0a' : '#ffffff';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = textMuted;
                el.style.borderColor = borderColor;
              }}
            >
              View Our Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex gap-8 pt-5"
            style={{ borderTop: `1px solid ${borderColor}` }}
          >
            {[
              { value: '500+', label: 'Products Shot' },
              { value: '9', label: 'Marketplaces' },
              { value: '3×', label: 'Avg Sales Lift' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold" style={{ color: textPrimary }}>
                  {s.value}
                </div>
                <div className="text-xs font-medium mt-0.5" style={{ color: isLight ? 'hsl(0 0% 45%)' : '#94a3b8' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Desktop right gallery — absolutely positioned to fill right half */}
        <div
          className="hidden lg:block absolute top-0 right-0 w-1/2 h-screen"
          style={{ overflow: 'hidden', zIndex: 5 }}
        >
          {/* Left edge fade */}
          <div className="absolute inset-y-0 left-0 z-20 pointer-events-none"
            style={{ width: '80px', background: `linear-gradient(to right, ${bg}, transparent)` }} />
          {/* Right edge fade */}
          <div className="absolute inset-y-0 right-0 z-20 pointer-events-none"
            style={{ width: '60px', background: `linear-gradient(to left, ${bg}, transparent)` }} />
          {/* Top fade */}
          <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none"
            style={{ height: '80px', background: `linear-gradient(to bottom, ${bg}, transparent)` }} />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
            style={{ height: '80px', background: `linear-gradient(to top, ${bg}, transparent)` }} />

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-3 h-full"
            style={{ padding: '0 12px' }}
          >
            <ScrollColumn srcs={col1} direction="up" duration={22} offset={0} isLight={isLight} />
            <ScrollColumn srcs={col2} direction="down" duration={28} offset={-130} isLight={isLight} />
          </motion.div>
        </div>

        {/* Mobile image strip — flows naturally below text */}
        <div className="lg:hidden relative overflow-hidden w-full" style={{ height: '200px' }}>
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{ width: '40px', background: `linear-gradient(to right, ${bg}, transparent)` }} />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{ width: '40px', background: `linear-gradient(to left, ${bg}, transparent)` }} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-3 h-full items-center"
            style={{
              animation: 'mobile-scroll 18s linear infinite',
              willChange: 'transform',
              width: 'max-content',
              paddingLeft: '16px',
            }}
          >
            {[...col1, ...col2, ...col1].map((src, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl flex-shrink-0"
                style={{
                  width: '150px',
                  height: '180px',
                  border: `1px solid ${borderColor}`,
                  boxShadow: isLight ? '0 4px 16px hsl(0 0% 0% / 0.08)' : '0 4px 16px hsl(220 30% 5% / 0.4)',
                }}
              >
                <img src={src} alt="Portfolio" className="w-full h-full object-cover" loading="eager" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile bottom padding */}
        <div className="lg:hidden h-8" />

      </div>
    </section>
  );
};

export default Hero;
