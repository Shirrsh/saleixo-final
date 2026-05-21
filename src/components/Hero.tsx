import { useSiteImages } from '@/hooks/useSiteImages';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import img1Src from '@/assets/hero/showcase-1.jpg';
import img2Src from '@/assets/hero/showcase-2.jpg';
import img3Src from '@/assets/hero/showcase-3.jpg';
import img4Src from '@/assets/hero/showcase-4.jpg';
import img5Src from '@/assets/hero/showcase-5.jpg';
import img6Src from '@/assets/hero/showcase-6.jpg';
import img7Src from '@/assets/hero/showcase-7.jpg';
import img8Src from '@/assets/hero/showcase-8.jpg';

// ── Auto-scrolling image column ───────────────────────────────────────────────
const ScrollColumn = ({
  srcs,
  direction,
  duration,
  startOffset = 0,
  isLight,
}: {
  srcs: string[];
  direction: 'up' | 'down';
  duration: number;
  startOffset?: number;
  isLight: boolean;
}) => {
  const cardH = 300;
  const gap = 12;
  const oneSetH = srcs.length * (cardH + gap);
  // Duplicate for seamless loop
  const items = [...srcs, ...srcs];

  return (
    <div className="relative flex-1 overflow-hidden" style={{ height: '100%' }}>
      {/* Outer: handles initial stagger offset */}
      <div style={{ transform: `translateY(${startOffset}px)`, height: '100%' }}>
        {/* Inner: animates */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: `${gap}px`,
            animation: `${direction === 'up' ? 'gallery-up' : 'gallery-down'} ${duration}s linear infinite`,
            willChange: 'transform',
            ['--one-set' as string]: `${oneSetH}px`,
          }}
        >
          {items.map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl flex-shrink-0"
              style={{
                height: `${cardH}px`,
                border: isLight
                  ? '1px solid hsl(0 0% 88%)'
                  : '1px solid hsl(215 50% 35% / 0.25)',
                boxShadow: isLight
                  ? '0 4px 20px hsl(0 0% 0% / 0.10)'
                  : '0 4px 24px hsl(220 30% 5% / 0.5)',
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
    </div>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const { getImageUrl } = useSiteImages('hero');
  const sectionRef = useRef<HTMLElement>(null);

  // Read theme from DOM class — next-themes adds 'dark' class for dark mode
  const [isLight, setIsLight] = useState(() => {
    if (typeof window === 'undefined') return false;
    // DOM class is the ground truth (next-themes sets it synchronously via script)
    return !document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    // Keep in sync if user toggles theme after mount
    const sync = () =>
      setIsLight(!document.documentElement.classList.contains('dark'));
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
    getImageUrl('hero_showcase_5', img5Src),
    getImageUrl('hero_showcase_7', img7Src),
  ];
  const col2 = [
    getImageUrl('hero_showcase_2', img2Src),
    getImageUrl('hero_showcase_4', img4Src),
    getImageUrl('hero_showcase_6', img6Src),
    getImageUrl('hero_showcase_8', img8Src),
  ];

  const bg = isLight ? '#ffffff' : 'hsl(220 30% 7%)';
  // Solid and transparent versions for gradients (hex alpha suffix breaks on hsl strings)
  const bgSolid = isLight ? 'rgb(255,255,255)' : 'hsl(220 30% 7%)';
  const bgT80 = isLight ? 'rgba(255,255,255,0.8)' : 'hsl(220 30% 7% / 0.8)';
  const bgT40 = isLight ? 'rgba(255,255,255,0.4)' : 'hsl(220 30% 7% / 0.4)';
  const bgT0 = isLight ? 'rgba(255,255,255,0)' : 'hsl(220 30% 7% / 0)';
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
      {/* ── Dark mode background ── */}
      {!isLight && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: bgOpacity }}
        >
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, hsl(215 45% 14%) 0%, hsl(220 35% 10%) 40%, hsl(222 30% 9%) 100%)',
          }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(115deg, transparent 0%, hsl(210 60% 30% / 0.1) 40%, transparent 65%)',
          }} />
          <div className="absolute rounded-full pointer-events-none" style={{
            top: '-10%', left: '-5%', width: '700px', height: '700px',
            background: 'radial-gradient(circle, hsl(210 85% 55% / 0.45) 0%, hsl(220 70% 35% / 0.2) 45%, transparent 70%)',
            filter: 'blur(60px)',
          }} />
        </motion.div>
      )}

      {/* ── Desktop layout: text left | gallery right ── */}
      <div className="relative z-10 hidden lg:flex w-full" style={{ minHeight: '100vh' }}>

        {/* Decorative left-side elements — aria-hidden, pointer-events none */}

        {/* Glow blob 1 — dark only, top-left */}
        {!isLight && (
          <div aria-hidden="true" className="absolute pointer-events-none" style={{
            top: '-5%', left: '-8%', width: '820px', height: '820px',
            background: 'radial-gradient(circle, hsl(210 85% 55% / 0.4) 0%, hsl(258 90% 66% / 0.1) 45%, transparent 70%)',
            filter: 'blur(80px)', zIndex: 1,
          }} />
        )}
        {/* Glow blob 2 — dark only, bottom-left */}
        {!isLight && (
          <div aria-hidden="true" className="absolute pointer-events-none" style={{
            bottom: '-15%', left: '12%', width: '600px', height: '600px',
            background: 'radial-gradient(circle, hsl(258 90% 66% / 0.19) 0%, transparent 70%)',
            filter: 'blur(90px)', zIndex: 1,
          }} />
        )}

        {/* Vertical rail */}
        <div aria-hidden="true" className="absolute pointer-events-none hidden xl:flex flex-col items-center gap-3" style={{
          left: 28, top: '50%', transform: 'translateY(-50%)', zIndex: 5,
        }}>
          <div style={{ width: 1, height: 28, background: isLight ? 'hsl(0 0% 75%)' : 'hsl(215 30% 35%)' }} />
          <span style={{
            writingMode: 'vertical-rl', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.34em', textTransform: 'uppercase',
            color: isLight ? 'hsl(0 0% 55%)' : 'hsl(215 20% 50%)',
            userSelect: 'none',
          }}>
            <span style={{ color: isLight ? 'hsl(210 85% 45%)' : 'hsl(var(--accent-pink))' }}>01 / 04</span>
            {' · Studio Photography'}
          </span>
          <div style={{ width: 1, height: 28, background: isLight ? 'hsl(0 0% 75%)' : 'hsl(215 30% 35%)' }} />
        </div>

        {/* "studio" watermark */}
        <div aria-hidden="true" className="absolute pointer-events-none hidden xl:block" style={{
          left: -20, bottom: -60, zIndex: 2,
          fontSize: 'clamp(180px, 18vw, 320px)', fontWeight: 800,
          letterSpacing: '-0.06em', lineHeight: 0.82,
          color: isLight ? 'rgba(10,10,10,0.04)' : 'rgba(255,255,255,0.035)',
          whiteSpace: 'nowrap', userSelect: 'none',
          fontFamily: '"Inter Tight", Inter, sans-serif',
        }}>
          studio
        </div>

        {/* Scroll cue */}
        <div aria-hidden="true" className="absolute pointer-events-none hidden lg:flex flex-col items-center gap-2" style={{
          left: 'clamp(72px, 7vw, 140px)', bottom: 36, zIndex: 10,
        }}>
          <div style={{ width: 36, height: 1, background: isLight ? 'hsl(0 0% 70%)' : 'hsl(215 25% 40%)' }} />
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: isLight ? 'hsl(0 0% 55%)' : 'hsl(215 20% 55%)',
          }}>Scroll</span>
          <span style={{
            fontSize: 14, color: isLight ? 'hsl(210 85% 45%)' : 'hsl(var(--accent-pink))',
            animation: 'scrollNudge 1.8s ease-in-out infinite',
            display: 'inline-block',
          }}>↓</span>
        </div>

        {/* Viewport-padded frame — no max-width cap */}
        <div className="relative z-10 flex items-center w-full" style={{
          padding: '120px clamp(72px, 7vw, 140px) 80px',
          minHeight: '100vh',
        }}>

        {/* LEFT — text */}
        <div className="flex flex-col justify-center" style={{ width: 'min(720px, 52%)', paddingRight: 32 }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase mb-6"
            style={{
              alignSelf: 'flex-start',
              whiteSpace: 'nowrap',
              ...(isLight ? {
                background: 'hsl(0 0% 94%)', border: '1px solid hsl(0 0% 82%)', color: 'hsl(0 0% 20%)',
              } : {
                background: 'hsl(210 85% 55% / 0.15)', border: '1px solid hsl(210 85% 65% / 0.5)', color: '#93c5fd',
              }),
            }}
          >
            ✦ The studio built for artisans & independent sellers
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: '"Inter Tight", Inter, sans-serif',
              fontSize: 'clamp(3rem, 5.6vw, 5.75rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.042em',
              textWrap: 'balance' as React.CSSProperties['textWrap'],
              margin: '0 0 22px',
              fontWeight: 800,
            }}
          >
            <span style={{ color: textPrimary, display: 'block' }}>Your products</span>
            <span style={{ color: textPrimary, display: 'block' }}>are great.</span>
            <span style={{ color: textAccent, display: 'block', textShadow: isLight ? 'none' : '0 0 40px hsl(210 90% 65% / 0.6)' }}>Your listings are</span>
            <span style={{ color: textPrimary, display: 'block' }}>killing them.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ color: textMuted, fontSize: 17, lineHeight: 1.65, marginBottom: 30, maxWidth: 460 }}
          >
            Studio-grade product photos, compliant listings, and conversion-tested creative — built by ecommerce operators, not freelancers. We find the problem in your funnel, then fix it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="flex flex-row gap-3 mb-8"
          >
            <button
              onClick={scrollToContact}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-opacity duration-200"
              style={{ background: isLight ? '#0a0a0a' : '#ffffff', color: isLight ? '#ffffff' : '#0a0a0a' }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.82')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
            >
              Get a Free Listing Audit
            </button>
            <Link
              to="/categories"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap"
              style={{ color: textMuted }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = textPrimary; el.style.background = isLight ? 'hsl(0 0% 94%)' : 'hsl(210 85% 55% / 0.1)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = textMuted; el.style.background = 'transparent'; }}
            >
              See How We Fix It
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex gap-8 pt-5"
            style={{ borderTop: `1px solid ${borderColor}` }}
          >
            {[
              { value: '3.1×', label: 'Avg. ROAS' },
              { value: '+187%', label: 'Avg. CTR Lift' },
              { value: '0', label: 'Compliance Rejections' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold" style={{ color: textPrimary }}>{s.value}</div>
                <div className="text-xs font-medium mt-0.5" style={{ color: isLight ? 'hsl(0 0% 45%)' : '#94a3b8' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — spacer so gallery has room */}
        <div style={{ flex: 1 }} />

        </div>{/* end viewport-padded frame */}

        {/* RIGHT — scrolling gallery — full height, absolutely positioned */}
        <div className="absolute right-0 top-0 bottom-0" style={{ width: '48%', overflow: 'hidden' }}>
          {/* Left fade */}
          <div className="absolute inset-y-0 left-0 z-20 pointer-events-none"
            style={{ width: '140px', background: `linear-gradient(to right, ${bgSolid}, ${bgT0})` }} />
          {/* Right edge */}
          <div className="absolute inset-y-0 right-0 z-20 pointer-events-none"
            style={{ width: '20px', background: `linear-gradient(to left, ${bgSolid}, ${bgT0})` }} />
          {/* Top fade — deep fade behind header */}
          <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none"
            style={{ height: '160px', background: `linear-gradient(to bottom, ${bgSolid} 0%, ${bgSolid} 30%, ${bgT80} 55%, ${bgT40} 75%, ${bgT0} 100%)` }} />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
            style={{ height: '120px', background: `linear-gradient(to top, ${bgSolid}, ${bgT0})` }} />

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-4 h-full"
            style={{ paddingLeft: '16px' }}
          >
            <ScrollColumn srcs={col1} direction="up" duration={25} startOffset={0} isLight={isLight} />
            <ScrollColumn srcs={col2} direction="up" duration={32} startOffset={-156} isLight={isLight} />
          </motion.div>
        </div>
      </div>

      {/* ── Mobile layout: stacked ── */}
      <div className="lg:hidden relative z-10 flex flex-col w-full max-w-full overflow-hidden">

        {/* Text content */}
        <div className="flex flex-col items-center text-center px-5 pt-28 pb-8 w-full">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex self-center px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase mb-5 whitespace-nowrap"
            style={isLight ? {
              background: 'hsl(0 0% 94%)', border: '1px solid hsl(0 0% 82%)', color: 'hsl(0 0% 20%)',
            } : {
              background: 'hsl(210 85% 55% / 0.15)', border: '1px solid hsl(210 85% 65% / 0.5)', color: '#93c5fd',
            }}
          >
            ✦ Built for artisans · Amazon · Etsy · Shopify
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold leading-[1.02] tracking-tight mb-4"
            style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(2.4rem, 10vw, 3.5rem)' }}
          >
            <span style={{ color: textPrimary, display: 'block' }}>Your products</span>
            <span style={{ color: textPrimary, display: 'block' }}>are great.</span>
            <span style={{ color: textAccent, display: 'block' }}>Your listings are</span>
            <span style={{ color: textPrimary, display: 'block' }}>killing them.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm mb-6 leading-relaxed font-medium"
            style={{ color: textMuted }}
          >
            Studio-grade product photos, compliant listings, and conversion-tested creative — built by ecommerce operators, not freelancers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col gap-3 mb-7"
          >
            <button
              onClick={scrollToContact}
              className="w-full px-6 py-3.5 rounded-xl font-semibold text-sm transition-opacity duration-200"
              style={{ background: isLight ? '#0a0a0a' : '#ffffff', color: isLight ? '#ffffff' : '#0a0a0a', minHeight: '48px' }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.82')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
            >
              Get a Free Listing Audit
            </button>
            <Link
              to="/categories"
              className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
              style={{ color: textMuted, border: `1.5px solid ${borderColor}`, minHeight: '48px' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = textPrimary; el.style.borderColor = isLight ? '#0a0a0a' : '#ffffff'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = textMuted; el.style.borderColor = borderColor; }}
            >
              See How We Fix It
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex justify-center gap-8 pt-5 w-full"
            style={{ borderTop: `1px solid ${borderColor}` }}
          >
            {[
              { value: '3.1×', label: 'Avg. ROAS' },
              { value: '+187%', label: 'Avg. CTR Lift' },
              { value: '0', label: 'Compliance Rejections' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold" style={{ color: textPrimary }}>{s.value}</div>
                <div className="text-xs font-medium mt-0.5" style={{ color: isLight ? 'hsl(0 0% 45%)' : '#94a3b8' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile image strip */}
        <div className="relative overflow-hidden w-full" style={{ height: '200px' }}>
          <div className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{ width: '40px', background: `linear-gradient(to right, ${bgSolid}, ${bgT0})` }} />
          <div className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{ width: '40px', background: `linear-gradient(to left, ${bgSolid}, ${bgT0})` }} />
          <div
            className="flex gap-3 h-full items-center"
            style={{ animation: 'mobile-scroll 20s linear infinite', willChange: 'transform', width: 'max-content', paddingLeft: '16px' }}
          >
            {[...col1, ...col2, ...col1].map((src, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl flex-shrink-0"
                style={{
                  width: '150px', height: '180px',
                  border: `1px solid ${borderColor}`,
                  boxShadow: isLight ? '0 4px 16px hsl(0 0% 0% / 0.08)' : '0 4px 16px hsl(220 30% 5% / 0.4)',
                }}
              >
                <img src={src} alt="Portfolio" className="w-full h-full object-cover" loading="eager" />
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: '32px' }} />
      </div>
    </section>
  );
};

export default Hero;
