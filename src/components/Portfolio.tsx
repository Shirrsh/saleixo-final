import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSiteImages } from '@/hooks/useSiteImages';

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
  { key: 'portfolio_2', fallback: hero4, alt: 'Jewelry Studio Shoot — Saleixo'         },
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

  const go = (dir: 1 | -1) =>
    setCurrent(c => Math.max(0, Math.min(images.length - 1, c + dir)));

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const item = images[current];

  return (
    <div className="md:hidden">
      <div
        className="relative overflow-hidden rounded-xl"
        style={{ height: 280 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <motion.img
          key={current}
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
        />
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-semibold"
          style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}
        >
          {current + 1} / {images.length}
        </div>
      </div>
      <div className="flex justify-center gap-2.5 mt-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to image ${i + 1}`}
            style={{
              width: 8, height: 8,
              borderRadius: '50%',
              background: i === current ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground) / 0.25)',
              transition: 'background 0.3s ease',
              padding: 0, border: 'none', cursor: 'pointer',
              flexShrink: 0,
            }}
          />
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
    <section id="portfolio" className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Header */}
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

          {/* 6th image as a wide banner below */}
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
