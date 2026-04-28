import { useSiteImages } from '@/hooks/useSiteImages';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import img1Src from '@/assets/hero/showcase-1.jpg';
import img2Src from '@/assets/hero/showcase-2.jpg';
import img3Src from '@/assets/hero/showcase-3.jpg';
import img4Src from '@/assets/hero/showcase-4.jpg';

// ── Auto-scrolling column ─────────────────────────────────────────────────────
const ScrollColumn = ({
  srcs, direction, duration, startOffset = 0, isLight = false,
}: {
  srcs: string[]; direction: 'up' | 'down'; duration: number;
  startOffset?: number; isLight?: boolean;
}) => {
  const doubled = [...srcs, ...srcs];
  const cardH = 260;
  const gap = 10;
  const totalH = srcs.length * (cardH + gap);
  const bg = isLight ? '#ffffff' : 'hsl(220 30% 7%)';

  return (
    <div className="relative flex-1 overflow-hidden" style={{ height: '100%' }}>
      <div
        className="flex flex-col"
        style={{
          gap: `${gap}px`,
          animation: `scroll-${direction} ${duration}s linear infinite`,
          willChange: 'transform',
          '--scroll-total': `-${totalH}px`,
          marginTop: startOffset ? `${startOffset}px` : undefined,
        } as React.CSSProperties}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl flex-shrink-0 group"
            style={{
              height: `${cardH}px`,
              border: isLight ? '1px solid hsl(0 0% 88%)' : '1px solid hsl(215 50% 35% / 0.3)',
              boxShadow: isLight ? '0 2px 12px hsl(0 0% 0% / 0.08)' : '0 2px 16px hsl(220 30% 5% / 0.5)',
            }}
          >
            <img
              src={src}
              alt="Portfolio showcase"
              className="w-full h-full object-cover"
              style={{ transition: 'transform 0.6s cubic-bezier(0.25,0.1,0.25,1)' }}
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-xl"
              style={{
                transition: 'opacity 0.3s ease',
                boxShadow: `inset 0 0 0 1.5px ${isLight ? 'hsl(0 0% 0% / 0.15)' : 'hsl(210 85% 60% / 0.65)'}`,
              }}
            />
          </div>
        ))}
      </div>
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-10"
        style={{ height: '120px', background: `linear-gradient(to bottom, ${bg} 0%, transparent 100%)` }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
        style={{ height: '120px', background: `linear-gradient(to top, ${bg} 0%, transparent 100%)` }} />
    </div>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const { getImageUrl } = useSiteImages('hero');
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [btn1Hovered, setBtn1Hovered] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const check = () => setIsLight(document.documentElement.classList.contains('light'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const leftY   = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const rightY  = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const auraY   = useTransform(scrollYProgress, [0, 1], [0, 100]);
  // bgOpacity fades background atmosphere only — content clips naturally via overflow:hidden
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

  const bg = isLight ? '#ffffff' : 'hsl(220 30% 7%)';

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative overflow-hidden"
      style={{ background: bg, height: '100vh' }}
    >
      {/* Dark mode: metallic texture + aura + blob */}
      {!isLight && (
        <>
          {/* Metallic gradient texture */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg, hsl(215 45% 14%) 0%, hsl(220 35% 10%) 30%, hsl(218 40% 12%) 60%, hsl(222 30% 9%) 100%)',
            }} />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(115deg, transparent 0%, hsl(210 60% 30% / 0.12) 35%, hsl(210 80% 50% / 0.06) 50%, transparent 65%)',
            }} />
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'linear-gradient(hsl(210 80% 70%) 1px, transparent 1px), linear-gradient(90deg, hsl(210 80% 70%) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />
          </div>

          {/* Aura glows */}
          <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: bgOpacity }}>
            <motion.div
              className="absolute top-[-5%] left-[-10%] w-[750px] h-[750px] rounded-full"
              style={{
                background: 'radial-gradient(circle, hsl(210 85% 55% / 0.5) 0%, hsl(220 70% 35% / 0.25) 40%, transparent 70%)',
                filter: 'blur(50px)',
                x: mousePos.x * -14,
                y: mousePos.y * -10,
              }}
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute top-[35%] left-[8%] w-[400px] h-[400px] rounded-full"
              style={{
                background: 'radial-gradient(circle, hsl(215 75% 45% / 0.22) 0%, transparent 70%)',
                filter: 'blur(45px)',
                x: mousePos.x * 5,
                y: mousePos.y * 4,
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
          </motion.div>

          {/* Blob */}
          <motion.div
            className="absolute left-[-5%] top-[15%] w-[420px] h-[420px] pointer-events-none"
            style={{ y: auraY, opacity: bgOpacity, x: mousePos.x * -8 }}
          >
            <motion.div
              className="w-full h-full"
              style={{
                background: `
                  radial-gradient(circle at 35% 35%, hsl(210 85% 70% / 0.4) 0%, transparent 50%),
                  radial-gradient(circle at 65% 65%, hsl(220 60% 45% / 0.4) 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, hsl(215 50% 20% / 0.6) 0%, transparent 70%)
                `,
                filter: 'blur(4px)',
              }}
              animate={{
                borderRadius: [
                  '60% 40% 55% 45% / 50% 60% 40% 50%',
                  '45% 55% 40% 60% / 60% 40% 55% 45%',
                  '55% 45% 60% 40% / 45% 55% 50% 50%',
                  '60% 40% 55% 45% / 50% 60% 40% 50%',
                ],
                rotate: [0, 10, -6, 0],
                scale: [1, 1.05, 0.97, 1],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute inset-[10%] rounded-full"
                style={{ background: 'radial-gradient(circle at 30% 25%, hsl(0 0% 100% / 0.12) 0%, transparent 50%)' }} />
            </motion.div>
          </motion.div>
        </>
      )}

      {/* ── CONTENT ── */}
      <div className="absolute inset-0 container mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl z-10 flex flex-col">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 flex-1 items-center pt-16 pb-6">

          {/* LEFT */}
          <motion.div style={{ y: leftY }} className="flex flex-col justify-center lg:justify-center pt-4 lg:pt-0 pb-48 lg:pb-0">

            {/* Eyebrow badge */}
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-5 self-start"
              style={isLight ? {
                background: 'hsl(0 0% 94%)',
                border: '1px solid hsl(0 0% 82%)',
                color: 'hsl(0 0% 20%)',
              } : {
                background: 'hsl(210 85% 55% / 0.18)',
                border: '1px solid hsl(210 85% 65% / 0.6)',
                color: '#bfdbfe',
                boxShadow: '0 0 16px hsl(210 85% 55% / 0.2)',
              }}
            >
              ✦ Studio-Grade Photography
            </motion.span>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-extrabold leading-[1.0] tracking-tight mb-4"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(2.2rem, 4.8vw, 4.5rem)' }}
            >
              <span style={{ color: isLight ? '#0a0a0a' : '#ffffff', display: 'block' }}>Transform Your</span>
              <span style={{ color: isLight ? '#0a0a0a' : '#ffffff', display: 'block' }}>Brand Into</span>
              <span style={{ color: isLight ? '#0a0a0a' : '#ffffff', display: 'block' }}>
                Market-<span style={{
                  color: isLight ? 'hsl(210 85% 45%)' : '#60a5fa',
                  textShadow: isLight ? 'none' : '0 0 30px hsl(210 90% 65% / 0.8)',
                }}>Winning</span>
              </span>
              <span style={{
                display: 'block',
                WebkitTextStroke: isLight ? '2.5px #0a0a0a' : '2.5px #60a5fa',
                color: 'transparent',
                opacity: isLight ? 0.2 : 0.65,
              }}>
                Brands
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-sm md:text-lg mb-6 max-w-md leading-relaxed font-medium"
              style={{ color: isLight ? 'hsl(0 0% 35%)' : '#cbd5e1' }}
            >
              Studio-grade product photography and ecommerce design — built to convert.
            </motion.p>

            {/* CTAs — row on mobile too */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="flex flex-row flex-wrap gap-3 mb-6"
            >
              <button
                onClick={scrollToContact}
                className="relative px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap"
                style={{
                  background: isLight ? '#0a0a0a' : (btn1Hovered ? '#ffffff' : 'transparent'),
                  border: isLight ? '2px solid #0a0a0a' : '2px solid #ffffff',
                  color: isLight ? '#ffffff' : (btn1Hovered ? 'hsl(220 30% 7%)' : '#ffffff'),
                  boxShadow: btn1Hovered && !isLight ? '0 0 30px hsl(210 85% 70% / 0.5)' : 'none',
                }}
                onMouseEnter={() => setBtn1Hovered(true)}
                onMouseLeave={() => setBtn1Hovered(false)}
              >
                Book Free Strategy Call
              </button>

              <Link
                to="/categories"
                className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap"
                style={{ color: isLight ? 'hsl(0 0% 35%)' : 'hsl(215 25% 75%)' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = isLight ? '#000' : '#fff';
                  el.style.background = isLight ? 'hsl(0 0% 94%)' : 'hsl(210 85% 55% / 0.12)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = isLight ? 'hsl(0 0% 35%)' : 'hsl(215 25% 75%)';
                  el.style.background = 'transparent';
                }}
              >
                View Our Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex gap-8 pt-5"
              style={{ borderTop: `1px solid ${isLight ? 'hsl(0 0% 88%)' : 'hsl(215 40% 30% / 0.6)'}` }}
            >
              {[
                { value: '500+', label: 'Products Shot'  },
                { value: '9',    label: 'Marketplaces'   },
                { value: '3×',   label: 'Avg Sales Lift' },
              ].map(s => (
                <div key={s.label} className="cursor-default">
                  <div
                    className="text-2xl font-extrabold transition-all duration-300"
                    style={{ color: isLight ? '#0a0a0a' : '#f1f5f9' }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.color = isLight ? 'hsl(210 85% 45%)' : '#60a5fa';
                      if (!isLight) el.style.textShadow = '0 0 20px hsl(210 85% 60% / 0.7)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.color = isLight ? '#0a0a0a' : '#f1f5f9';
                      el.style.textShadow = 'none';
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs font-medium mt-0.5"
                    style={{ color: isLight ? 'hsl(0 0% 45%)' : '#94a3b8' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — scrolling columns, flush top to bottom */}
          <motion.div
            style={{ y: rightY }}
            className="relative hidden lg:block h-full"
          >
            {/* Right edge fade */}
            <div className="absolute inset-0 z-20 pointer-events-none" style={{
              background: `linear-gradient(to right, transparent 50%, ${isLight ? 'rgba(255,255,255,0.6)' : 'hsl(220 30% 7% / 0.6)'} 82%, ${bg} 100%)`,
            }} />

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-3 h-full"
            >
              <ScrollColumn srcs={col1} direction="up"   duration={22} startOffset={0}    isLight={isLight} />
              <ScrollColumn srcs={col2} direction="down" duration={28} startOffset={-130} isLight={isLight} />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Mobile horizontal strip — below stats, only on mobile */}
      <div
        className="lg:hidden absolute bottom-0 left-0 right-0 overflow-hidden z-10"
        style={{ height: '200px' }}
      >
        {/* Left + right fade */}
        <div className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${bg}, transparent)` }} />
        <div className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${bg}, transparent)` }} />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-12 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, ${bg}, transparent)` }} />

        <div
          className="flex gap-3 h-full items-center"
          style={{
            animation: 'mobile-scroll 18s linear infinite',
            willChange: 'transform',
            width: 'max-content',
          }}
        >
          {[...col1, ...col1].map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl flex-shrink-0"
              style={{
                width: '140px',
                height: '170px',
                border: `1px solid ${isLight ? 'hsl(0 0% 88%)' : 'hsl(215 40% 25% / 0.4)'}`,
              }}
            >
              <img src={src} alt="Portfolio" className="w-full h-full object-cover" loading="eager" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Hero;
