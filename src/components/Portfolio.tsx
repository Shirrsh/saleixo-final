import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import cat1 from '@/assets/categories/jewelry-earrings.jpg';
import cat2 from '@/assets/categories/jewelry-necklace.jpg';
import cat3 from '@/assets/categories/incense-packaging.jpg';
import cat4 from '@/assets/categories/rudraksha-bracelet.jpg';
import cat5 from '@/assets/categories/aquamarine-bracelet.jpg';
import cat6 from '@/assets/categories/spiritual-products.jpg';

// ── Image data ────────────────────────────────────────────────────────────────
const images = [
  { src: cat1, alt: 'Diamond Earrings — Studio Photography'    },
  { src: cat2, alt: 'Necklace Collection — Product Photography' },
  { src: cat3, alt: 'Incense Packaging — Brand Design'          },
  { src: cat4, alt: 'Rudraksha Collection — Lifestyle Shoot'    },
  { src: cat5, alt: 'Aquamarine Bracelet — Product Photography' },
  { src: cat6, alt: 'Spiritual Products — Full Service'         },
];

// ── Single image cell ─────────────────────────────────────────────────────────
const Cell = ({
  src, alt, className, delay = 0, style,
}: {
  src: string; alt: string; className?: string; delay?: number; style?: React.CSSProperties;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`overflow-hidden rounded-2xl ${className ?? ''}`}
    style={style}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      loading="lazy"
    />
  </motion.div>
);

// ── Mobile swipe carousel ─────────────────────────────────────────────────────
const MobileCarousel = () => {
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
        className="relative overflow-hidden rounded-2xl"
        style={{ height: 340 }}
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
        {/* Counter badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-[11px] font-semibold"
          style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}
        >
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to image ${i + 1}`}
            style={{
              width: 14, height: 14,
              borderRadius: '50%',
              background: i === current ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground) / 0.25)',
              transition: 'background 0.3s ease',
              padding: 0, border: 'none', cursor: 'pointer',
              flexShrink: 0,
            }}
          />
        ))}
      </div>
      <p className="text-center text-[11px] text-muted-foreground mt-2.5 tracking-widest uppercase">Swipe to browse</p>
    </div>
  );
};

// ── Portfolio section ─────────────────────────────────────────────────────────
const Portfolio = () => (
  <section id="portfolio" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 max-w-5xl">

      {/* Header — centered */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10 md:mb-14"
      >
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">Selected Work</p>
        <h2
          className="font-bold tracking-tight text-foreground mb-3"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
        >
          500+ products. Multiple marketplaces. One studio.
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto leading-relaxed">
          A few of the brands we've shot, listed, and grown — across jewelry, apparel, home, beauty, food, and craft categories.
        </p>
      </motion.div>

      {/* ── Desktop grid with bottom fade ── */}
      <div className="hidden md:block relative">
        {/*
          Layout (3 cols):
            [0: square]  [1: tall — spans 2 rows]  [2: square]
            [3: square]  [1 continues            ]  [4: square]
                         [5: wide — spans 2 cols, bottom row]
        */}
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '300px 260px',
          }}
        >
          {/* Top-left */}
          <Cell src={images[0].src} alt={images[0].alt} delay={0}    />
          {/* Center tall — spans both rows */}
          <Cell src={images[1].src} alt={images[1].alt} delay={0.07} style={{ gridRow: '1 / 3' }} />
          {/* Top-right */}
          <Cell src={images[2].src} alt={images[2].alt} delay={0.14} />
          {/* Bottom-left */}
          <Cell src={images[3].src} alt={images[3].alt} delay={0.21} />
          {/* Bottom-right */}
          <Cell src={images[4].src} alt={images[4].alt} delay={0.28} />
        </div>

        {/* Bottom fade overlay — fades grid into page background */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '55%',
            background: 'linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 100%)',
          }}
        />
      </div>

      {/* Mobile carousel */}
      <MobileCarousel />

      {/* CTA pill */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex justify-center mt-10 md:mt-8"
      >
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-85 active:scale-[0.97]"
          style={{
            background: 'hsl(var(--foreground))',
            color: 'hsl(var(--background))',
          }}
        >
          Explore All 500+ Products
        </Link>
      </motion.div>

    </div>
  </section>
);

export default Portfolio;
