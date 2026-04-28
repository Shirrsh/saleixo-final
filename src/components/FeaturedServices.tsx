import { Button } from '@/components/ui/button';
import { Camera, ShoppingCart, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import MarketplaceMockup from '@/components/MarketplaceMockup';

// Import service images
import photographyImg from '@/assets/photography-service.jpg';
import designImg from '@/assets/design-service.jpg';

const photoshootFeatures = [
  'White Background / Catalog Photography',
  'Creative & Lifestyle Shoots',
  'On-Model Photography',
  'Short-form Product Videos',
  '24-48hr Turnaround',
];

const ecommerceFeatures = [
  'Multi-platform Listing Management',
  'A+/A++ Content Creation',
  'SEO & Keyword Optimization',
  'Product Description Pages (PDPs)',
  'Brand Storefront Design',
  'Sales Analytics & Reporting',
];

const marketplaceGrid = [
  'Amazon', 'eBay', 'Etsy',
  'Shopify', 'WooCommerce', 'Walmart',
  'Flipkart', 'Meesho', 'Shein',
];

const FeaturedServices = () => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashCount, setFlashCount] = useState(0);

  const triggerFlash = () => {
    if (isFlashing) return;
    setIsFlashing(true);
    setFlashCount(c => c + 1);
    // 3 rapid flashes then stop
    setTimeout(() => setIsFlashing(false), 600);
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut', delay: i * 0.1 },
    }),
  };

  return (
    <section className="py-12 md:py-16 bg-transparent">
      {/* Photoshoot Services Block */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Photography Image — studio flash on hover */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="relative group overflow-hidden rounded-2xl shadow-2xl border border-border-glow/20 cursor-pointer"
            onHoverStart={triggerFlash}
          >
            <img
              src={photographyImg}
              alt="Professional product photography studio setup"
              className="w-full h-[320px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />

            {/* Base gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-60" />

            {/* Studio light spots — visible on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              {/* Top-left light cone */}
              <div
                className="absolute top-0 left-[15%] w-32 h-48"
                style={{
                  background: 'conic-gradient(from 160deg at 50% 0%, transparent 30%, hsl(0 0% 100% / 0.12) 50%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />
              {/* Top-right light cone */}
              <div
                className="absolute top-0 right-[15%] w-32 h-48"
                style={{
                  background: 'conic-gradient(from 20deg at 50% 0%, transparent 30%, hsl(0 0% 100% / 0.12) 50%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />
            </div>

            {/* Flash burst — fires on hover */}
            <AnimatePresence>
              {isFlashing && (
                <>
                  {/* Flash 1 */}
                  <motion.div
                    key={`flash1-${flashCount}`}
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.85, 0, 0.6, 0, 0.4, 0] }}
                    transition={{ duration: 0.55, times: [0, 0.1, 0.25, 0.35, 0.5, 0.65, 1], ease: 'easeOut' }}
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 20%, hsl(0 0% 100% / 1) 0%, hsl(220 80% 90% / 0.6) 40%, transparent 70%)' }}
                  />
                  {/* Flash 2 — from right light */}
                  <motion.div
                    key={`flash2-${flashCount}`}
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 0.7, 0, 0.5, 0] }}
                    transition={{ duration: 0.55, times: [0, 0.2, 0.3, 0.45, 0.6, 1], ease: 'easeOut' }}
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 15%, hsl(0 0% 100% / 1) 0%, hsl(43 80% 80% / 0.5) 40%, transparent 70%)' }}
                  />
                  {/* Rim light flash — bottom edge */}
                  <motion.div
                    key={`flash3-${flashCount}`}
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 0, 0.5, 0] }}
                    transition={{ duration: 0.55, times: [0, 0.3, 0.4, 0.55, 1], ease: 'easeOut' }}
                    style={{ background: 'radial-gradient(ellipse 100% 40% at 50% 100%, hsl(0 0% 100% / 0.6) 0%, transparent 60%)' }}
                  />
                </>
              )}
            </AnimatePresence>

            {/* Camera flash icon hint */}
            <div className="absolute top-4 right-4 glass-purple rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
              Professional Product Photography
            </motion.h2>

            <motion.p variants={fadeUp} custom={3} className="text-lg text-muted-foreground mb-6">
              Studio-grade visuals that convert browsers to buyers. Every shot is crafted to highlight your product's best features.
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

      {/* Ecommerce Services Block */}
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
              Global Marketplace Excellence
            </motion.h2>

            <motion.p variants={fadeUp} custom={3} className="text-lg text-muted-foreground mb-6">
              End-to-end ecommerce management across 9 platforms and 7 countries. We optimize your presence everywhere that matters.
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
          <motion.div variants={fadeUp} custom={0} className="order-1 lg:order-2">
            <MarketplaceMockup />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedServices;
