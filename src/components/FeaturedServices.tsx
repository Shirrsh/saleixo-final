import { Button } from '@/components/ui/button';
import {
  Camera,
  ShoppingCart,
  Palette,
  BarChart3,
  Check,
  ArrowRight,
  ArrowDown,
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import MarketplaceMockup from '@/components/MarketplaceMockup';

import photographyImg from '@/assets/photography-service.jpg';
import designImg      from '@/assets/design-service.jpg';
import marketingImg   from '@/assets/marketing-service.jpg';

// ── Fade-up motion variant (shared) ──────────────────────────────────────────
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
  anchor: string;
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
    anchor: 'svc-ecommerce',
    tag: 'Ecommerce',
    short: 'Multi-marketplace account management',
    Icon: ShoppingCart,
    colorVar: 'hsl(var(--accent-purple))',
    colorClassText: 'text-accent-purple',
    colorClassBg: 'bg-accent-purple/15',
    colorClassBorder: 'border-accent-purple/40',
    headline: 'Listings that rank, convert, and stay live.',
    body: 'End-to-end account management across multiple marketplaces and 7 countries. SEO-optimized titles, A+ content that converts, storefronts that look brand-built — and a team that watches your dashboard so you don\'t have to.',
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
    anchor: 'svc-photography',
    tag: 'Studio Photography',
    short: 'Catalog, lifestyle & on-model shoots',
    Icon: Camera,
    colorVar: 'hsl(var(--accent-pink))',
    colorClassText: 'text-accent-pink',
    colorClassBg: 'bg-accent-pink/15',
    colorClassBorder: 'border-accent-pink/40',
    headline: 'Photos that pass compliance and earn the click.',
    body: 'White-background catalog shots that meet Amazon\'s RGB 255,255,255 rule. Lifestyle that earns the scroll-stop. On-model that makes apparel scan as premium. We deliver in 48 hours.',
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
    anchor: 'svc-design',
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
    anchor: 'svc-marketing',
    tag: 'Marketing',
    short: 'PPC, Google, Meta & conversion creative',
    Icon: BarChart3,
    colorVar: 'hsl(28 90% 55%)',
    colorClassText: 'text-[hsl(28,90%,55%)]',
    colorClassBg: 'bg-[hsl(28,90%,55%)]/15',
    colorClassBorder: 'border-[hsl(28,90%,55%)]/40',
    headline: 'Ad spend that actually pays back.',
    body: 'Google + Meta + Amazon PPC managed by operators who\'ve run their own stores. Conversion-tested creative, weekly ROAS reporting, and campaigns built to scale — not just to spend.',
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

// ── ServiceMatrix ─────────────────────────────────────────────────────────────
const ServiceMatrix = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
    {services.map((s) => (
      <a
        key={s.slug}
        href={`#${s.anchor}`}
        className={`group relative flex flex-col gap-3 rounded-2xl border bg-card p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${s.colorClassBorder}`}
        style={{ borderTopWidth: '2px', borderTopColor: s.colorVar }}
      >
        {/* Number */}
        <span className={`text-xs font-bold tracking-[0.2em] tabular-nums ${s.colorClassText}`}>
          {s.num}
        </span>

        {/* Icon container */}
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center border ${s.colorClassBg} ${s.colorClassBorder}`}
        >
          <s.Icon className="w-4 h-4" style={{ color: s.colorVar }} aria-hidden />
        </div>

        {/* Label */}
        <div>
          <p className="text-sm font-bold text-foreground leading-tight">{s.tag}</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{s.short}</p>
        </div>

        {/* Footer */}
        <span
          className="mt-auto text-xs font-semibold flex items-center gap-1 transition-gap duration-200"
          style={{ color: s.colorVar }}
        >
          Jump <ArrowDown className="w-3 h-3" aria-hidden />
        </span>
      </a>
    ))}
  </div>
);

// ── PhotographyVisual ─────────────────────────────────────────────────────────
const PhotographyVisual = ({ stat }: { stat: Service['stat'] }) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashCount, setFlashCount]   = useState(0);
  const [lightProgress, setLightProgress] = useState(0);

  const imgRef        = useRef<HTMLDivElement>(null);
  const hasAutoFlashed = useRef(false);
  const isMobile      = useRef(false);

  useEffect(() => {
    isMobile.current = window.matchMedia('(hover: none)').matches;
  }, []);

  const triggerFlash = useCallback(() => {
    if (isFlashing) return;
    setIsFlashing(true);
    setFlashCount(c => c + 1);
    setTimeout(() => setIsFlashing(false), 600);
  }, [isFlashing]);

  // Scroll-driven light intensity — mobile only
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

  // Auto-flash once at 50% visibility on mobile
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
        className="w-full h-[320px] md:h-[420px] object-cover"
        style={{ transform: `scale(${imgScale})`, transformOrigin: 'center center', transition: 'transform 0.1s linear' }}
        loading="lazy"
      />

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Left light cone */}
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

      {/* Right light cone */}
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

      {/* Rim light */}
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

      {/* Warm ambient tint — mobile only */}
      {isMobile.current && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 90% 70% at 50% 30%, hsl(43 80% 70% / 0.35) 0%, transparent 65%)',
            opacity: warmTint,
          }}
        />
      )}

      {/* Flash burst */}
      <AnimatePresence>
        {isFlashing && (
          <>
            <motion.div
              key={`flash1-${flashCount}`}
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0, 0.6, 0, 0.4, 0] }}
              transition={{ duration: 0.55, times: [0, 0.1, 0.25, 0.35, 0.5, 0.65, 1] }}
              style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 20%, hsl(0 0% 100% / 1) 0%, hsl(220 80% 90% / 0.6) 40%, transparent 70%)' }}
            />
            <motion.div
              key={`flash2-${flashCount}`}
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0.7, 0, 0.5, 0] }}
              transition={{ duration: 0.55, times: [0, 0.2, 0.3, 0.45, 0.6, 1] }}
              style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 15%, hsl(0 0% 100% / 1) 0%, hsl(43 80% 80% / 0.5) 40%, transparent 70%)' }}
            />
            <motion.div
              key={`flash3-${flashCount}`}
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0, 0.5, 0] }}
              transition={{ duration: 0.55, times: [0, 0.3, 0.4, 0.55, 1] }}
              style={{ background: 'radial-gradient(ellipse 100% 40% at 50% 100%, hsl(0 0% 100% / 0.6) 0%, transparent 60%)' }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Stat chip */}
      <div
        className="absolute bottom-4 left-4 flex items-baseline gap-1.5 rounded-xl px-3 py-2 pointer-events-none"
        style={{ background: 'rgba(10,10,10,0.72)', backdropFilter: 'blur(12px)', border: '1px solid hsl(var(--accent-pink) / 0.4)' }}
      >
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
      className="w-full h-[320px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />

    {/* Stat chip */}
    <div
      className="absolute bottom-4 left-4 flex items-baseline gap-1.5 rounded-xl px-3 py-2 pointer-events-none"
      style={{ background: 'rgba(10,10,10,0.72)', backdropFilter: 'blur(12px)', border: `1px solid ${accentVar.replace(')', ' / 0.4)')}` }}
    >
      <span className="text-white text-sm font-extrabold">{stat.value}</span>
      <span className="text-white/60 text-xs">/ {stat.label}</span>
    </div>

    <div className="absolute inset-0 ring-1 ring-inset ring-border-glow/20 rounded-2xl" />
  </motion.div>
);

// ── ServiceBlock ──────────────────────────────────────────────────────────────
interface ServiceBlockProps {
  service: Service;
  imgRight: boolean;
  visual: ReactNode;
}

const ServiceBlock = ({ service: s, imgRight, visual }: ServiceBlockProps) => {
  const scrollToContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <motion.div
      id={s.anchor}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 scroll-mt-20"
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

        {/* Visual column */}
        <div className={`relative ${imgRight ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}>
          {/* Radial color halo */}
          <div
            className="absolute -inset-6 rounded-[2rem] blur-3xl opacity-60 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at center, ${s.colorVar.replace(')', ' / 0.22)')} 0%, transparent 70%)` }}
            aria-hidden
          />
          <div className="relative">{visual}</div>
        </div>

        {/* Text column */}
        <div className={`flex flex-col ${imgRight ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>

          {/* Tag row */}
          <motion.div variants={fadeUp} custom={1} className="flex items-center gap-3 mb-5">
            <span className={`text-xs font-bold tracking-[0.2em] tabular-nums ${s.colorClassText}`}>{s.num}</span>
            <div className="h-px w-8 bg-border" />
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${s.colorClassBg} ${s.colorClassBorder}`}
              style={{ color: s.colorVar }}
            >
              <s.Icon className="w-3 h-3" aria-hidden />
              {s.tag}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            custom={2}
            className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-balance text-foreground mb-4"
          >
            {s.headline}
          </motion.h2>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            custom={3}
            className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-6"
          >
            {s.body}
          </motion.p>

          {/* Features */}
          <motion.ul
            variants={fadeUp}
            custom={4}
            className="grid sm:grid-cols-2 gap-x-5 gap-y-3 mb-8"
          >
            {s.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div
                  className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${s.colorVar.replace(')', ' / 0.15)')}` }}
                >
                  <Check className="w-2.5 h-2.5" style={{ color: s.colorVar }} aria-hidden />
                </div>
                <span className="text-sm text-foreground/90 leading-snug">{feature}</span>
              </li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div variants={fadeUp} custom={5} className="flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="rounded-full px-7 font-semibold text-white transition-all duration-300"
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
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                See live storefronts
                <ArrowRight className="w-3.5 h-3.5" aria-hidden />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ── Divider ───────────────────────────────────────────────────────────────────
const Divider = () => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="h-px bg-border" />
  </div>
);

// ── FeaturedServices ──────────────────────────────────────────────────────────
const FeaturedServices = () => {
  const [ecommerce, photography, design, marketing] = services;

  return (
    <section id="services" className="py-16 md:py-24 bg-transparent">

      {/* ── Section header + matrix ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
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

        <motion.div variants={fadeUp} custom={1}>
          <ServiceMatrix />
        </motion.div>
      </motion.div>

      {/* ── 01 Ecommerce — image right ── */}
      <ServiceBlock
        service={ecommerce}
        imgRight={true}
        visual={
          <motion.div variants={fadeUp} custom={0} className="w-full max-w-full overflow-hidden">
            <MarketplaceMockup />
          </motion.div>
        }
      />

      <Divider />

      {/* ── 02 Studio Photography — image left ── */}
      <ServiceBlock
        service={photography}
        imgRight={false}
        visual={<PhotographyVisual stat={photography.stat} />}
      />

      <Divider />

      {/* ── 03 Design — image right ── */}
      <ServiceBlock
        service={design}
        imgRight={true}
        visual={
          <StaticVisual
            src={designImg}
            alt="Marketplace-spec product image design work showing A+ content and infographics"
            stat={design.stat}
            accentVar={design.colorVar}
          />
        }
      />

      <Divider />

      {/* ── 04 Marketing — image left ── */}
      <ServiceBlock
        service={marketing}
        imgRight={false}
        visual={
          <StaticVisual
            src={marketingImg}
            alt="Marketing dashboard showing ad campaign performance and ROAS metrics"
            stat={marketing.stat}
            accentVar={marketing.colorVar}
          />
        }
      />
    </section>
  );
};

export default FeaturedServices;
