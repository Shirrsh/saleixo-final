import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSiteImages } from '@/hooks/useSiteImages';
import Parallax, { ParallaxBlob } from '@/components/Parallax';

// Portfolio images
import port1 from '@/assets/portfolio-1.jpg';
import port2 from '@/assets/portfolio-2.jpg';
import port3 from '@/assets/portfolio-3.jpeg';
import port4 from '@/assets/portfolio-4.jpeg';
// Hero showcase images
import hero4  from '@/assets/hero/showcase-4.jpeg';
import hero5  from '@/assets/hero/showcase-5.jpg';
import hero9  from '@/assets/hero/showcase-9.jpeg';

// ── Image key → fallback mapping ─────────────────────────────────────────────
const PORTFOLIO_SLOTS = [
  { key: 'portfolio_1', fallback: port1, alt: 'Product Studio Shoot — Saleixo'         },
  { key: 'portfolio_hero_4', fallback: hero4, alt: 'Jewelry Studio Shoot — Saleixo'     },
  { key: 'portfolio_3', fallback: port3, alt: 'Studio Photography — Saleixo'           },
  { key: 'portfolio_4', fallback: port4, alt: 'Ecommerce Shoot — Full Service'         },
  { key: 'portfolio_5', fallback: hero5, alt: 'Product Collection — Saleixo Studio'    },
  { key: 'portfolio_6', fallback: port2, alt: 'Brand Design — The Weave Studio'        },
];

// ── Single image cell ─────────────────────────────────────────────────────────
const Cell = ({
  src, alt, fallback, className = '', delay = 0, style,
}: {
  src: string; alt: string; fallback?: string; className?: string; delay?: number; style?: React.CSSProperties;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.97 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`overflow-hidden rounded-xl ${className}`}
    style={style}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      loading="lazy"
      onError={fallback ? (e) => { (e.currentTarget as HTMLImageElement).src = fallback; } : undefined}
    />
  </motion.div>
);

// ── Mobile swipe carousel ─────────────────────────────────────────────────────
const MobileCarousel = ({ images }: { images: { src: string; alt: string }[] }) => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const go = (dir: 1 | -1) =>
    setCurrent(c => Math.max(0, Math.min(images.length - 1, c + dir)));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = Math.abs((touchStartY.current ?? 0) - e.changedTouches[0].clientY);
    if (Math.abs(dx) > 44 && Math.abs(dx) > dy) go(dx > 0 ? 1 : -1);
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const item = images[current];
  const canPrev = current > 0;
  const canNext = current < images.length - 1;

  return (
    <div className="md:hidden">
      {/* Image frame */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ height: 'clamp(260px, 72vw, 380px)' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <motion.img
          key={current}
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
        />

        {/* Counter badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-semibold"
          style={{ background: 'rgba(0,0,0,0.52)', color: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)' }}
        >
          {current + 1} / {images.length}
        </div>

        {/* Prev arrow */}
        {canPrev && (
          <button
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(10px)' }}
          >
            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
        )}

        {/* Next arrow */}
        {canNext && (
          <button
            onClick={() => go(1)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(10px)' }}
          >
            <ChevronRight className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
        )}
      </div>

      {/* Dot indicators — 32px tap area each, pill-shaped active */}
      <div className="flex justify-center items-center gap-0.5 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to image ${i + 1}`}
            className="flex items-center justify-center"
            style={{ width: 32, height: 32 }}
          >
            <span
              style={{
                display: 'block',
                width: i === current ? 22 : 7,
                height: 7,
                borderRadius: 999,
                background: i === current
                  ? 'hsl(var(--foreground))'
                  : 'hsl(var(--muted-foreground) / 0.22)',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

// ── Portfolio section ─────────────────────────────────────────────────────────
const Portfolio = () => {
  const { getImageUrl, getAltText } = useSiteImages('portfolio');

  const images = PORTFOLIO_SLOTS.map(slot => ({
    src: getImageUrl(slot.key, slot.fallback),
    alt: getAltText(slot.key, slot.alt),
    fallback: slot.fallback,
  }));

  return (
    <section id="portfolio" className="relative overflow-hidden py-12 md:py-16 bg-background">
      <ParallaxBlob hue="258 90% 66%" opacity={0.05} size={560} speed={0.4} style={{ top: '-12%', right: '-10%' }} />
      <div className="container relative z-10 mx-auto px-4 max-w-5xl">

        {/* Header */}
        <Parallax speed={-0.07}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-7 md:mb-9"
        >
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-2">Selected Work</p>
          <h2
            className="font-bold tracking-tight text-foreground mb-2"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)' }}
          >
            500+ products. Multiple marketplaces. One studio.
          </h2>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
            Jewelry, apparel, home, beauty, food, and craft — shot, listed, and grown.
          </p>
        </motion.div>
        </Parallax>

        {/* ── Desktop: grid + banner wrapped for bottom fade ── */}
        <div className="relative hidden md:block">
          {/* 3-col asymmetric grid */}
          <div className="grid gap-2.5" style={{
            gridTemplateColumns: '1fr 1.15fr 1fr',
            gridTemplateRows: '220px 200px',
          }}>
            {/* Row 1 */}
            <Cell src={images[0].src} alt={images[0].alt} fallback={images[0].fallback} delay={0}    />
            <Cell src={images[1].src} alt={images[1].alt} fallback={images[1].fallback} delay={0.06} style={{ gridRow: '1 / 3' }} />
            <Cell src={images[2].src} alt={images[2].alt} fallback={images[2].fallback} delay={0.12} />
            {/* Row 2 */}
            <Cell src={images[3].src} alt={images[3].alt} fallback={images[3].fallback} delay={0.18} />
            {/* images[1] spans here */}
            <Cell src={images[4].src} alt={images[4].alt} fallback={images[4].fallback} delay={0.24} />
          </div>

          {/* 6th image as a wide banner below — slight parallax drift */}
          <Parallax speed={0.1}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2.5 overflow-hidden rounded-xl"
            style={{ height: 130 }}
          >
            <img
              src={images[5].src}
              alt={images[5].alt}
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              loading="lazy"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = images[5].fallback; }}
            />
          </motion.div>
          </Parallax>

          {/* Bottom fade overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--background)))' }}
          />
        </div>

        {/* Mobile carousel */}
        <MobileCarousel images={images} />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex justify-center mt-7 md:mt-8"
        >
          <Link
            to="/services/photography"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-85 active:scale-[0.97]"
            style={{
              background: 'hsl(var(--foreground))',
              color: 'hsl(var(--background))',
            }}
          >
            View Photoshoot Services
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Portfolio;
