import { Button } from '@/components/ui/button';
import { Camera, ShoppingCart, Check, Layers } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import MarketplaceMockup from '@/components/MarketplaceMockup';

// Import service images
import photographyImg from '@/assets/photography-service.jpg';
import designImg from '@/assets/design-service.jpg';

const photoshootFeatures = [
  'White-background catalog (Amazon · Walmart compliant out of the gate)',
  'Lifestyle & creative scenes for A+ content and ads',
  'On-model fashion, jewelry, accessories',
  '360° spin and short-form product videos',
  'Ghost mannequin, flat-lay, hero, infographic-ready',
  '48-hour turnaround on standard shoots',
];

const ecommerceFeatures = [
  'Listing creation and SEO-optimized title/bullet/description writing',
  'A+ Content and A++ Premium content design',
  'Brand storefront design (Amazon, Etsy, Shopify)',
  'Variation parent-child setup, FBA prep, PPC launch',
  'Suppressed listing recovery (24–72 hr turnaround)',
  'Weekly reporting on traffic, conversion, ad spend, and unit economics',
];

const graphicsFeatures = [
  'Amazon-spec main images (1000–2000px, RGB 255,255,255, 85% frame fill)',
  'Walmart marketplace images (1500×1500px min, white BG, 4+ images per SKU)',
  'Etsy lifestyle sets (2000px+, warm artisan styling)',
  'Shopify product galleries (2048×2048px, optimized <300KB)',
  'A+/A++ infographics, comparison charts, lifestyle banners',
  'Logo, packaging, brand identity, social creative',
];

const marketplaceGrid = [
  'Amazon', 'eBay', 'Etsy',
  'Shopify', 'WooCommerce', 'Walmart',
  'Flipkart', 'Meesho', 'Shein',
];

// Defined outside component to avoid re-creation and TS Variants type issues
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.1 },
  }),
};

/** Clamp a number between min and max */
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const FeaturedServices = () => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashCount, setFlashCount] = useState(0);
  // 0 = dark, 1 = fully lit — driven by scroll position on mobile
  const [lightProgress, setLightProgress] = useState(0);

  const imgRef = useRef<HTMLDivElement>(null);
  const hasAutoFlashed = useRef(false);
  const isMobile = useRef(false);

  // Detect touch/mobile once on mount
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
      const vh = window.innerHeight;
      // progress: 0 when bottom of image is at bottom of screen,
      //           1 when top of image is at 20% from top of screen
      const progress = clamp(
        (vh - rect.bottom + rect.height) / (rect.height * 0.8),
        0,
        1,
      );
      setLightProgress(progress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount in case already in view
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-flash once when image is 50% in view on mobile
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

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Derived light values from scroll progress
  const leftConeOpacity  = clamp(lightProgress * 1.4, 0, 0.55);
  const rightConeOpacity = clamp((lightProgress - 0.1) * 1.6, 0, 0.55);
  const rimOpacity       = clamp((lightProgress - 0.3) * 1.8, 0, 0.35);
  const warmTint         = clamp((lightProgress - 0.5) * 2, 0, 0.18);
  // Subtle scale-up as lights come on
  const imgScale         = 1 + lightProgress * 0.03;

  return (
    <section className="py-12 md:py-16 bg-transparent">
      {/* ── Photography Block ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Photography Image */}
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
              alt="Professional product photography studio setup"
              className="w-full h-[320px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ transform: `scale(${imgScale})`, transformOrigin: 'center center', transition: 'transform 0.1s linear' }}
              loading="lazy"
            />

            {/* Base gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-60" />

            {/* ── Scroll-driven studio lights (mobile) / hover (desktop) ── */}

            {/* Left light cone */}
            <div
              className="absolute top-0 left-[15%] w-36 h-56 pointer-events-none"
              style={{
                background: 'conic-gradient(from 160deg at 50% 0%, transparent 28%, hsl(0 0% 100% / 0.18) 50%, transparent 72%)',
                filter: 'blur(10px)',
                // mobile: scroll-driven; desktop: hover via CSS
                opacity: isMobile.current ? leftConeOpacity : undefined,
              }}
              // desktop fallback via Tailwind group-hover
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

            {/* Rim light — bottom edge */}
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

            {/* Warm ambient tint — appears last as lights fully on */}
            {isMobile.current && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 90% 70% at 50% 30%, hsl(43 80% 70% / 0.35) 0%, transparent 65%)',
                  opacity: warmTint,
                }}
              />
            )}

            {/* Flash burst — fires on tap/hover */}
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

            {/* Camera icon hint */}
            <div className="absolute top-4 right-4 glass-purple rounded-full p-2 opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              <Camera className="w-4 h-4 text-white" />
            </div>

            <div className="absolute inset-0 ring-1 ring-inset ring-border-glow/20 rounded-2xl" />
          </motion.div>

          {/* Content */}
          <div className="lg:pl-8">
            <motion.div variants={fadeUp} custom={1} className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl glass-purple">
                <Camera className="w-6 h-6 text-accent-violet" />
              </div>
              <span className="text-sm font-semibold text-accent-violet uppercase tracking-wider">Photography</span>
            </motion.div>

            <motion.h2 variants={fadeUp} custom={2} className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4 tracking-tight">
              Photos that pass compliance and earn the click.
            </motion.h2>

            <motion.p variants={fadeUp} custom={3} className="text-lg text-muted-foreground mb-6">
              White-background catalog shots that meet Amazon's RGB 255,255,255 rule. Lifestyle that earns the scroll-stop. On-model that makes apparel scan as premium. We deliver in 48 hours.
            </motion.p>

            <ul className="space-y-3 mb-8">
              {photoshootFeatures.map((feature, index) => (
                <motion.li key={index} variants={fadeUp} custom={4 + index * 0.2} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-accent-violet" />
                  </div>
                  <span className="text-foreground/90">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div variants={fadeUp} custom={6}>
              <Button
                size="lg"
                onClick={scrollToContact}
                className="rounded-full px-8 bg-primary hover:bg-primary-hover hover:shadow-[0_0_30px_hsl(43_65%_52%/0.4)] transition-all duration-300"
              >
                Book a Shoot
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Ecommerce Block ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 lg:pr-8">
            <motion.div variants={fadeUp} custom={1} className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl glass-purple">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Ecommerce</span>
            </motion.div>

            <motion.h2 variants={fadeUp} custom={2} className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4 tracking-tight">
              Listings that rank, convert, and stay live.
            </motion.h2>

            <motion.p variants={fadeUp} custom={3} className="text-lg text-muted-foreground mb-6">
              End-to-end account management across multiple marketplaces and 7 countries. SEO-optimized titles, A+ content that converts, storefronts that look brand-built — and a team that watches your dashboard so you don't have to.
            </motion.p>

            {/* Marketplace Grid */}
            <motion.div variants={fadeUp} custom={4} className="grid grid-cols-3 gap-2 mb-6">
              {marketplaceGrid.map((platform) => (
                <div
                  key={platform}
                  className="text-center py-2 px-3 glass-purple rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  {platform}
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} custom={5} className="glass-purple rounded-xl px-4 py-3 mb-6 inline-flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Markets:</span>
              <span className="text-sm font-semibold text-foreground">US · UK · FR · DE · AU · CA · IN</span>
            </motion.div>

            <ul className="space-y-3 mb-8">
              {ecommerceFeatures.map((feature, index) => (
                <motion.li key={index} variants={fadeUp} custom={6 + index * 0.2} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-indigo/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-accent-indigo" />
                  </div>
                  <span className="text-foreground/90">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div variants={fadeUp} custom={8}>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToContact}
                className="rounded-full px-8 border-border-glow/50 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_30px_hsl(43_65%_52%/0.3)] transition-all duration-300"
              >
                Boost Your Sales
              </Button>
            </motion.div>
          </div>

          {/* Marketplace Mockup Slideshow */}
          <motion.div variants={fadeUp} custom={0} className="order-1 lg:order-2 w-full max-w-full overflow-hidden">
            <MarketplaceMockup />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Graphics & Compliance Block ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="relative group overflow-hidden rounded-2xl shadow-2xl border border-border-glow/20"
          >
            <img
              src={designImg}
              alt="Marketplace compliance image design"
              className="w-full h-[320px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-60" />

            {/* Compliance proof callout */}
            <div
              className="absolute bottom-4 left-4 right-4 rounded-xl p-4"
              style={{ background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <p className="text-white text-sm font-semibold mb-0.5">200+ suppressed listings fixed.</p>
              <p className="text-white/60 text-xs">Average recovery time: 36 hours.</p>
            </div>

            <div className="absolute inset-0 ring-1 ring-inset ring-border-glow/20 rounded-2xl" />
          </motion.div>

          {/* Content */}
          <div className="lg:pl-8">
            <motion.div variants={fadeUp} custom={1} className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl glass-purple">
                <Layers className="w-6 h-6 text-accent-violet" />
              </div>
              <span className="text-sm font-semibold text-accent-violet uppercase tracking-wider">Graphics · Compliance</span>
            </motion.div>

            <motion.h2 variants={fadeUp} custom={2} className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4 tracking-tight">
              Every image, exact-spec for every marketplace.
            </motion.h2>

            <motion.p variants={fadeUp} custom={3} className="text-lg text-muted-foreground mb-6">
              One product image rejected and your listing goes dark. We design once, deliver in every spec — Amazon, Walmart, Etsy, Shopify, eBay — so your shoot runs everywhere without rework.
            </motion.p>

            <ul className="space-y-3 mb-8">
              {graphicsFeatures.map((feature, index) => (
                <motion.li key={index} variants={fadeUp} custom={4 + index * 0.2} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-accent-violet" />
                  </div>
                  <span className="text-foreground/90">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div variants={fadeUp} custom={6}>
              <Button
                size="lg"
                onClick={scrollToContact}
                className="rounded-full px-8 bg-primary hover:bg-primary-hover hover:shadow-[0_0_30px_hsl(43_65%_52%/0.4)] transition-all duration-300"
              >
                Fix My Listings →
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedServices;
