import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSiteImages } from '@/hooks/useSiteImages';
import Parallax, { ParallaxBlob } from '@/components/Parallax';

// Selected-work images
import apparelSilkDetail from '@/assets/selected-work/apparel-silk-detail.webp';
import jewelryEarringsHero from '@/assets/selected-work/jewelry-earrings-hero.webp';
import beautyPedestalAlt from '@/assets/services/beauty-pedestal-alt.webp';
import homeStorageWardrobe from '@/assets/selected-work/home-storage-wardrobe.webp';
import handmadePottery from '@/assets/selected-work/handmade-pottery.webp';
import wellnessGiftFlatlay from '@/assets/selected-work/wellness-gift-flatlay.webp';

// ── Image key → fallback mapping ─────────────────────────────────────────────
const PORTFOLIO_SLOTS = [
  { key: 'portfolio_1', fallback: apparelSilkDetail, alt: 'Silk Apparel Detail Shoot — Saleixo', category: 'Apparel & Fashion' },
  { key: 'portfolio_hero_4', fallback: jewelryEarringsHero, alt: 'Jewelry Earrings Hero Shoot — Saleixo', category: 'Fine Jewelry' },
  { key: 'portfolio_3', fallback: beautyPedestalAlt, alt: 'Luxury Beauty & Cosmetics Editorial Shoot — Saleixo', category: 'Beauty & Cosmetics' },
  { key: 'portfolio_4', fallback: homeStorageWardrobe, alt: 'Home Storage Product Shoot — Saleixo', category: 'Home & Living' },
  { key: 'portfolio_5', fallback: handmadePottery, alt: 'Handmade Pottery Photography — Saleixo', category: 'Artisan Craft' },
  { key: 'portfolio_6', fallback: wellnessGiftFlatlay, alt: 'Wellness Gift Flatlay — Saleixo', category: 'Wellness & Ritual' },
];

// ── Single image cell ─────────────────────────────────────────────────────────
const Cell = ({
  src, alt, fallback, category, className = '', delay = 0, style,
}: {
  src: string; alt: string; fallback?: string; category?: string; className?: string; delay?: number; style?: React.CSSProperties;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.97, y: 12 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`group relative overflow-hidden rounded-2xl border border-border/60 dark:border-border/40 bg-card/60 shadow-xs hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30 transition-all duration-500 ${className}`}
    style={style}
  >
    {/* Category micro-tag */}
    {category && (
      <div className="absolute top-3.5 left-3.5 z-10 px-2.5 py-1 rounded-full text-[10.5px] font-semibold tracking-wider uppercase backdrop-blur-md bg-background/85 dark:bg-card/90 text-foreground/90 border border-border/40 shadow-xs pointer-events-none transition-transform duration-300 group-hover:scale-105">
        {category}
      </div>
    )}

    {/* Subtle gradient sheen at bottom on hover */}
    <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      loading="lazy"
      onError={fallback ? (e) => { (e.currentTarget as HTMLImageElement).src = fallback; } : undefined}
    />
  </motion.div>
);

// ── Mobile swipe carousel ─────────────────────────────────────────────────────
const MobileCarousel = ({ images }: { images: { src: string; alt: string; fallback?: string; category?: string }[] }) => {
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
      {/* Image frame - 3:4 ratio */}
      <div
        className="relative overflow-hidden rounded-2xl border border-border/50 shadow-sm max-w-[340px] mx-auto aspect-[3/4]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Category micro-tag */}
        {item.category && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10.5px] font-semibold tracking-wider uppercase backdrop-blur-md bg-background/85 text-foreground/90 border border-border/40 shadow-xs pointer-events-none">
            {item.category}
          </div>
        )}

        <motion.img
          key={current}
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover object-center"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
          onError={item.fallback ? (e) => { (e.currentTarget as HTMLImageElement).src = item.fallback!; } : undefined}
        />

        {/* Counter badge */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold"
          style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}
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
    category: slot.category,
  }));

  return (
    <section id="portfolio" className="relative overflow-hidden py-14 md:py-20 bg-background">
      <ParallaxBlob hue="258 90% 66%" opacity={0.05} size={560} speed={0.4} style={{ top: '-12%', right: '-10%' }} />
      <div className="container relative z-10 mx-auto px-4 max-w-5xl">

        {/* Header */}
        <Parallax speed={-0.07}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-2">Selected Work</p>
          <h2
            className="font-bold tracking-tight text-foreground mb-2"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)' }}
          >
            Product photography. Multiple marketplaces. One studio.
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            Jewelry, apparel, home, beauty, food, and craft — shot, listed, and grown.
          </p>
        </motion.div>
        </Parallax>

        {/* ── Desktop & Tablet: 3-col × 2-row balanced editorial grid (Native 3:4 ratio, zero crop) ── */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {images.map((img, i) => (
            <Cell
              key={PORTFOLIO_SLOTS[i].key}
              src={img.src}
              alt={img.alt}
              fallback={img.fallback}
              category={PORTFOLIO_SLOTS[i].category}
              delay={i * 0.05}
              className="aspect-[3/4] w-full"
            />
          ))}
        </div>

        {/* Mobile carousel */}
        <MobileCarousel images={images} />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex justify-center mt-9 md:mt-12"
        >
          <Link
            to="/services/photography"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-85 active:scale-[0.97] shadow-xs hover:shadow-md"
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
