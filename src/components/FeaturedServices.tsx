import { Button } from '@/components/ui/button';
import {
  Camera,
  ShoppingCart,
  Palette,
  BarChart3,
  Check,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import MarketplaceMockup from '@/components/MarketplaceMockup';

import photographyImg from '@/assets/photography-service.jpg';
import designImg      from '@/assets/design-service.jpg';
import marketingImg   from '@/assets/marketing-service.jpg';

// ── Fade-up motion variant ────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.1 },
  }),
};

// ── Service data ──────────────────────────────────────────────────────────────
interface Service {
  num: string;
  slug: string;
  tag: string;
  short: string;
  Icon: React.ElementType;
  colorVar: string;
  colorClassText: string;
  colorClassBg: string;
  colorClassBorder: string;
  headline: string;
  body: string;
  features: [string, string, string, string];
  stat: { value: string; label: string };
  cta: string;
}

const services: Service[] = [
  {
    num: '01',
    slug: 'ecommerce',
    tag: 'Ecommerce',
    short: 'Multi-marketplace account management',
    Icon: ShoppingCart,
    colorVar: 'hsl(var(--accent-purple))',
    colorClassText: 'text-accent-purple',
    colorClassBg: 'bg-accent-purple/15',
    colorClassBorder: 'border-accent-purple/40',
    headline: 'Listings that rank, convert, and stay live.',
    body: "End-to-end account management across multiple marketplaces and 7 countries. SEO-optimized titles, A+ content that converts, storefronts that look brand-built — and a team that watches your dashboard so you don't have to.",
    features: [
      'Listing creation + SEO-optimized title / bullet / description writing',
      'A+ Content and A++ Premium content design',
      'Brand storefronts — Amazon, Etsy, Shopify',
      'Suppressed-listing recovery in 24–72 hrs',
    ],
    stat: { value: '9', label: 'marketplaces' },
    cta: 'Boost Your Sales',
  },
  {
    num: '02',
    slug: 'photography',
    tag: 'Studio Photography',
    short: 'Catalog, lifestyle & on-model shoots',
    Icon: Camera,
    colorVar: 'hsl(var(--accent-pink))',
    colorClassText: 'text-accent-pink',
    colorClassBg: 'bg-accent-pink/15',
    colorClassBorder: 'border-accent-pink/40',
    headline: 'Photos that pass compliance and earn the click.',
    body: "White-background catalog shots that meet Amazon's RGB 255,255,255 rule. Lifestyle that earns the scroll-stop. On-model that makes apparel scan as premium. We deliver in 48 hours.",
    features: [
      'White-background catalog — Amazon · Walmart spec',
      'Lifestyle scenes for A+ content and ads',
      'On-model fashion, jewelry, accessories',
      '360° spin & short-form product video',
    ],
    stat: { value: '48hr', label: 'turnaround' },
    cta: 'Book a Shoot',
  },
  {
    num: '03',
    slug: 'design',
    tag: 'Design',
    short: 'Marketplace-spec images & brand identity',
    Icon: Palette,
    colorVar: 'hsl(var(--primary))',
    colorClassText: 'text-primary',
    colorClassBg: 'bg-primary/15',
    colorClassBorder: 'border-primary/40',
    headline: 'Every image, exact-spec for every marketplace.',
    body: 'One product image rejected and your listing goes dark. We design once, deliver in every spec — Amazon, Walmart, Etsy, Shopify, eBay — so your shoot runs everywhere without rework.',
    features: [
      'Marketplace-spec main images for every platform',
      'A+ / A++ infographics, comparison charts, banners',
      'Logo, packaging, and brand identity',
      'Social creative built from the same kit',
    ],
    stat: { value: '200+', label: 'listings fixed' },
    cta: 'See Design Work',
  },
  {
    num: '04',
    slug: 'marketing',
    tag: 'Marketing',
    short: 'PPC, Google, Meta & conversion creative',
    Icon: BarChart3,
    colorVar: 'hsl(28 90% 55%)',
    colorClassText: 'text-[hsl(28,90%,55%)]',
    colorClassBg: 'bg-[hsl(28,90%,55%)]/15',
    colorClassBorder: 'border-[hsl(28,90%,55%)]/40',
    headline: 'Ad spend that actually pays back.',
    body: "Google + Meta + Amazon PPC managed by operators who've run their own stores. Conversion-tested creative, weekly ROAS reporting, and campaigns built to scale — not just to spend.",
    features: [
      'Amazon PPC / Sponsored Brands / DSP',
      'Google Shopping + Performance Max + Meta',
      'Conversion-tested ad creative & A/B testing',
      'Weekly reporting on spend, ROAS, and rank',
    ],
    stat: { value: '5 days', label: 'to first campaign' },
    cta: 'Plan a Campaign',
  },
];

// ── Utility ───────────────────────────────────────────────────────────────────
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

// ── PhotographyVisual ─────────────────────────────────────────────────────────
const PhotographyVisual = ({ stat }: { stat: Service['stat'] }) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashCount, setFlashCount] = useState(0);
  const [lightProgress, setLightProgress] = useState(0);

  const imgRef         = useRef<HTMLDivElement>(null);
  const hasAutoFlashed = useRef(false);
  const isMobile       = useRef(false);

  useEffect(() => {
    isMobile.current = window.matchMedia('(hover: none)').matches;
  }, []);

  const triggerFlash = useCallback(() => {
    if (isFlashing) return;
    setIsFlashing(true);
    setFlashCount(c => c + 1);
    setTimeout(() => setIsFlashing(false), 600);
  }, [isFlashing]);

  useEffect(() => {
    if (!isMobile.current) return;
    const el = imgRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh   = window.innerHeight;
      const progress = clamp(
        (vh - rect.bottom + rect.height) / (rect.height * 0.8),
        0, 1,
      );
      setLightProgress(progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoFlashed.current && isMobile.current) {
          hasAutoFlashed.current = true;
          setTimeout(triggerFlash, 500);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerFlash]);

  const leftConeOpacity  = clamp(lightProgress * 1.4, 0, 0.55);
  const rightConeOpacity = clamp((lightProgress - 0.1) * 1.6, 0, 0.55);
  const rimOpacity       = clamp((lightProgress - 0.3) * 1.8, 0, 0.35);
  const warmTint         = clamp((lightProgress - 0.5) * 2, 0, 0.18);
  const imgScale         = 1 + lightProgress * 0.03;

  return (
    <motion.div
      variants={fadeUp}
      custom={0}
      ref={imgRef}
      className="relative group overflow-hidden rounded-2xl shadow-2xl border border-border-glow/20 cursor-pointer"
      onHoverStart={triggerFlash}
      onClick={triggerFlash}
    >
      <img
        src={photographyImg}
        alt="Professional product photography studio setup with studio lights"
        className="w-full h-[240px] sm:h-[320px] md:h-[380px] lg:h-[420px] object-cover"
        style={{ transform: `scale(${imgScale})`, transformOrigin: 'center center', transition: 'transform 0.1s linear' }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      <div
        className="absolute top-0 left-[15%] w-36 h-56 pointer-events-none"
        style={{
          background: 'conic-gradient(from 160deg at 50% 0%, transparent 28%, hsl(0 0% 100% / 0.18) 50%, transparent 72%)',
          filter: 'blur(10px)',
          opacity: isMobile.current ? leftConeOpacity : undefined,
        }}
        {...(!isMobile.current && {
          className: 'absolute top-0 left-[15%] w-36 h-56 pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity duration-500',
          style: {
            background: 'conic-gradient(from 160deg at 50% 0%, transparent 28%, hsl(0 0% 100% / 0.18) 50%, transparent 72%)',
            filter: 'blur(10px)',
          },
        })}
      />
      <div
        className="absolute top-0 right-[15%] w-36 h-56 pointer-events-none"
        style={{
          background: 'conic-gradient(from 20deg at 50% 0%, transparent 28%, hsl(0 0% 100% / 0.18) 50%, transparent 72%)',
          filter: 'blur(10px)',
          opacity: isMobile.current ? rightConeOpacity : undefined,
        }}
        {...(!isMobile.current && {
          className: 'absolute top-0 right-[15%] w-36 h-56 pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity duration-500',
          style: {
            background: 'conic-gradient(from 20deg at 50% 0%, transparent 28%, hsl(0 0% 100% / 0.18) 50%, transparent 72%)',
            filter: 'blur(10px)',
          },
        })}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 35% at 50% 100%, hsl(0 0% 100% / 0.55) 0%, transparent 60%)',
          opacity: isMobile.current ? rimOpacity : undefined,
        }}
        {...(!isMobile.current && {
          className: 'absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-700',
          style: { background: 'radial-gradient(ellipse 100% 35% at 50% 100%, hsl(0 0% 100% / 0.55) 0%, transparent 60%)' },
        })}
      />
      {isMobile.current && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 90% 70% at 50% 30%, hsl(43 80% 70% / 0.35) 0%, transparent 65%)',
            opacity: warmTint,
          }}
        />
      )}

      <AnimatePresence>
        {isFlashing && (
          <>
            <motion.div key={`flash1-${flashCount}`} className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }} animate={{ opacity: [0, 0.85, 0, 0.6, 0, 0.4, 0] }}
              transition={{ duration: 0.55, times: [0, 0.1, 0.25, 0.35, 0.5, 0.65, 1] }}
              style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 20%, hsl(0 0% 100% / 1) 0%, hsl(220 80% 90% / 0.6) 40%, transparent 70%)' }}
            />
            <motion.div key={`flash2-${flashCount}`} className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 0.7, 0, 0.5, 0] }}
              transition={{ duration: 0.55, times: [0, 0.2, 0.3, 0.45, 0.6, 1] }}
              style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 15%, hsl(0 0% 100% / 1) 0%, hsl(43 80% 80% / 0.5) 40%, transparent 70%)' }}
            />
            <motion.div key={`flash3-${flashCount}`} className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 0, 0.5, 0] }}
              transition={{ duration: 0.55, times: [0, 0.3, 0.4, 0.55, 1] }}
              style={{ background: 'radial-gradient(ellipse 100% 40% at 50% 100%, hsl(0 0% 100% / 0.6) 0%, transparent 60%)' }}
            />
          </>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 left-4 flex items-baseline gap-1.5 rounded-xl px-3 py-2 pointer-events-none"
        style={{ background: 'rgba(10,10,10,0.72)', backdropFilter: 'blur(12px)', border: '1px solid hsl(var(--accent-pink) / 0.4)' }}>
        <span className="text-white text-sm font-extrabold">{stat.value}</span>
        <span className="text-white/60 text-xs">/ {stat.label}</span>
      </div>
      <div className="absolute inset-0 ring-1 ring-inset ring-border-glow/20 rounded-2xl" />
    </motion.div>
  );
};

// ── StaticVisual ──────────────────────────────────────────────────────────────
interface StaticVisualProps {
  src: string;
  alt: string;
  stat: Service['stat'];
  accentVar: string;
}

const StaticVisual = ({ src, alt, stat, accentVar }: StaticVisualProps) => (
  <motion.div
    variants={fadeUp}
    custom={0}
    className="relative group overflow-hidden rounded-2xl shadow-2xl border border-border-glow/20"
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-[240px] sm:h-[320px] md:h-[380px] lg:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
    <div className="absolute bottom-4 left-4 flex items-baseline gap-1.5 rounded-xl px-3 py-2 pointer-events-none"
      style={{ background: 'rgba(10,10,10,0.72)', backdropFilter: 'blur(12px)', border: `1px solid ${accentVar.replace(')', ' / 0.4)')}` }}>
      <span className="text-white text-sm font-extrabold">{stat.value}</span>
      <span className="text-white/60 text-xs">/ {stat.label}</span>
    </div>
    <div className="absolute inset-0 ring-1 ring-inset ring-border-glow/20 rounded-2xl" />
  </motion.div>
);

// ── FeaturedServices — responsive tabbed layout ───────────────────────────────
//
// Responsive behaviour:
//   < sm  (< 640px)  — Tabs scroll horizontally, panel stacks (visual above text),
//                       visual height 240px, CTA buttons full-width,
//                       body + features collapsed behind "See what's included ↓" toggle
//   sm–md (640–1024px) — Tabs wrap to two rows if needed, 2-col grid at md (768px),
//                        visual height 320–380px, body + features always visible
//   lg+   (≥ 1024px)   — Single pill row, 2-col grid with alternating L/R image per
//                        tab index (even = image right, odd = image left),
//                        visual height 420px, generous side-by-side spacing
//
const FeaturedServices = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    setIsMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (!e.matches) setShowDetails(false); // reset when going to desktop
    };
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  const switchTab = (i: number) => {
    if (i === activeIdx) return;
    setDirection(i > activeIdx ? 1 : -1);
    setActiveIdx(i);
    setShowDetails(false); // collapse details on tab change
  };

  const s = services[activeIdx];

  const getVisual = (idx: number) => {
    const svc = services[idx];
    switch (svc.slug) {
      case 'ecommerce':
        return (
          <motion.div variants={fadeUp} custom={0} className="w-full max-w-full overflow-hidden">
            <MarketplaceMockup />
          </motion.div>
        );
      case 'photography':
        return <PhotographyVisual stat={svc.stat} />;
      case 'design':
        return (
          <StaticVisual
            src={designImg}
            alt="Marketplace-spec product image design work showing A+ content and infographics"
            stat={svc.stat}
            accentVar={svc.colorVar}
          />
        );
      case 'marketing':
        return (
          <StaticVisual
            src={marketingImg}
            alt="Marketing dashboard showing ad campaign performance and ROAS metrics"
            stat={svc.stat}
            accentVar={svc.colorVar}
          />
        );
      default:
        return null;
    }
  };

  // Slide direction based on which tab is chosen
  const panelVariants = {
    enter: (d: number) => ({ x: d > 0 ? 56 : -56, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
    exit:  (d: number) => ({ x: d > 0 ? -56 : 56, opacity: 0, transition: { duration: 0.2 } }),
  };

  const scrollToContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  // Alternate visual position L/R on desktop (even idx = image right, odd = image left)
  const imgIsRight = activeIdx % 2 === 0;

  return (
    <section id="services" className="py-14 md:py-20 lg:py-24 bg-transparent">

      {/* ── Section header ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-10"
      >
        <motion.div variants={fadeUp} custom={0} className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.28em] uppercase text-muted-foreground mb-3">
            Four Disciplines · One Studio
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance text-foreground leading-[1.1] mb-4">
            Everything your store needs,{' '}
            <span className="font-light italic text-muted-foreground">under one roof.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            One integrated team handles your photography, listings, design, and ads — so every asset is built to the same brief and nothing falls through the cracks.
          </p>
        </motion.div>

        {/* ── Tab pills ──
            Mobile  : scroll horizontally (overflow-x-auto), no-wrap
            Tablet+ : allow wrapping so all tabs stay visible
        */}
        <motion.div
          variants={fadeUp}
          custom={1}
          className="flex gap-2 mt-7 overflow-x-auto sm:overflow-x-visible sm:flex-wrap pb-1 scrollbar-hide -mx-1 px-1"
        >
          {services.map((svc, i) => {
            const active = i === activeIdx;
            return (
              <button
                key={svc.slug}
                onClick={() => switchTab(i)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap flex-shrink-0 sm:flex-shrink transition-all duration-300 active:scale-95"
                style={{
                  background: active ? svc.colorVar : 'transparent',
                  color: active ? '#ffffff' : 'hsl(var(--muted-foreground))',
                  border: `1.5px solid ${active ? svc.colorVar : 'hsl(var(--border))'}`,
                  boxShadow: active ? `0 4px 20px ${svc.colorVar.replace(')', ' / 0.28)')}` : 'none',
                }}
              >
                <svc.Icon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} />
                <span>{svc.tag}</span>
              </button>
            );
          })}
        </motion.div>
      </motion.div>

      {/* ── Animated service panel ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeIdx}
            custom={direction}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            // Mobile: single column (visual above, text below)
            // md+: 2-column side-by-side
            className="grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center"
          >
            {/* Visual column — always first on mobile, alternates on desktop */}
            <div
              className={`relative ${
                imgIsRight ? 'md:order-2' : 'md:order-1'
              }`}
            >
              {/* Color halo */}
              <div
                className="absolute -inset-4 sm:-inset-6 rounded-[2rem] blur-3xl opacity-50 pointer-events-none"
                aria-hidden
                style={{ background: `radial-gradient(ellipse at center, ${s.colorVar.replace(')', ' / 0.20)')} 0%, transparent 70%)` }}
              />
              <div className="relative">{getVisual(activeIdx)}</div>
            </div>

            {/* Text column */}
            <div
              className={`flex flex-col ${
                imgIsRight ? 'md:order-1' : 'md:order-2'
              }`}
            >
              {/* Tag row */}
              <div className="flex items-center gap-3 mb-4 md:mb-5">
                <span className={`text-xs font-bold tracking-[0.2em] tabular-nums ${s.colorClassText}`}>{s.num}</span>
                <div className="h-px w-8 bg-border" />
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${s.colorClassBg} ${s.colorClassBorder}`}
                  style={{ color: s.colorVar }}
                >
                  <s.Icon className="w-3 h-3" aria-hidden />
                  {s.tag}
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-balance text-foreground mb-3 md:mb-4">
                {s.headline}
              </h2>

              {/* Mobile-only toggle — collapses body + features */}
              <button
                className="sm:hidden flex items-center gap-2 text-sm font-semibold mb-3 active:scale-95 transition-transform"
                style={{ color: s.colorVar }}
                onClick={() => setShowDetails(v => !v)}
              >
                {showDetails ? 'Hide details' : "See what's included"}
                <ChevronDown
                  className="w-4 h-4 transition-transform duration-300"
                  style={{ transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  strokeWidth={2}
                />
              </button>

              {/* Body + Features — always visible sm+, collapsible on mobile */}
              <AnimatePresence initial={false}>
                {(!isMobile || showDetails) && (
                  <motion.div
                    key="details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-5 md:mb-6">
                      {s.body}
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2.5 md:gap-y-3 mb-6 md:mb-8">
                      {s.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2.5">
                          <div
                            className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: `${s.colorVar.replace(')', ' / 0.15)')}` }}
                          >
                            <Check className="w-2.5 h-2.5" style={{ color: s.colorVar }} aria-hidden />
                          </div>
                          <span className="text-sm text-foreground/90 leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTAs — full-width on mobile, auto-width on sm+ */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                <Button
                  size="lg"
                  onClick={scrollToContact}
                  className="rounded-full px-7 font-semibold text-white transition-all duration-300 w-full sm:w-auto"
                  style={{
                    background: s.colorVar,
                    boxShadow: `0 0 0 0 ${s.colorVar.replace(')', ' / 0.35)')}`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 28px ${s.colorVar.replace(')', ' / 0.45)')}`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 0 0 ${s.colorVar.replace(')', ' / 0.35)')}`;
                  }}
                >
                  {s.cta}
                </Button>

                {s.slug === 'ecommerce' && (
                  <a
                    href="#portfolio"
                    className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    See live storefronts
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Progress dots ── */}
        <div className="flex justify-center items-center gap-2 mt-8 md:mt-10">
          {services.map((svc, i) => (
            <button
              key={svc.slug}
              onClick={() => switchTab(i)}
              aria-label={`Switch to ${svc.tag}`}
              style={{ width: 36, height: 36 }}
              className="flex items-center justify-center"
            >
              <motion.span
                animate={{
                  width: i === activeIdx ? 24 : 8,
                  background: i === activeIdx
                    ? s.colorVar
                    : 'hsl(var(--muted-foreground) / 0.25)',
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                style={{ display: 'block', height: 8, borderRadius: 999 }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
