import { usePageMeta } from '@/hooks/usePageMeta';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Camera, Clock, Star, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import imgHero from '@/assets/photography-service.jpg';

import jewelryNecklace   from '@/assets/categories/jewelry-necklace.jpg';
import jewelryEarrings   from '@/assets/categories/jewelry-earrings.jpg';
import incensePackaging  from '@/assets/categories/incense-packaging.jpg';
import spiritualProducts from '@/assets/categories/spiritual-products.jpg';
import aquamarineB       from '@/assets/categories/aquamarine-bracelet.jpg';

const categoryPreviews = [
  { name: 'Jewelry Photography',         image: jewelryNecklace,   alt: 'Ornate gold necklace jewelry photography' },
  { name: 'Pearl & Fine Jewelry',        image: jewelryEarrings,   alt: 'Elegant pearl drop earrings photography' },
  { name: 'Spiritual & Wellness',        image: spiritualProducts, alt: 'Spiritual wellness products photography' },
  { name: 'Premium Incense & Packaging', image: incensePackaging,  alt: 'Premium incense packaging photography' },
  { name: 'Gemstone Accessories',        image: aquamarineB,       alt: 'Aquamarine gemstone bracelet photography' },
];

const whatWeDo = [
  'White-background hero shots (Amazon / Walmart / Flipkart compliant)',
  'Lifestyle photography — product in context, real-world settings',
  '360° photography and product rotation sequences',
  'Detail and texture close-up shots',
  'Infographic images — features, dimensions, benefits overlaid',
  'Bundle and variation photography',
  'Short product video clips and GIFs for enhanced listings',
  'Full post-production — retouching, color correction, background removal',
];

const process = [
  { num: '01', title: 'Brief',   desc: 'Tell us your product, platform requirements, and visual direction. We confirm the shot list within 24 hours.' },
  { num: '02', title: 'Shot List', desc: 'We prepare a detailed shot list for your approval before any shoot day is scheduled.' },
  { num: '03', title: 'Shoot',   desc: 'Professional studio photography with ecommerce-trained photographers at our primary or partner studios.' },
  { num: '04', title: 'Edit',    desc: 'Full post-production — retouched, color-corrected, and marketplace-ready. Express 48-hr delivery or standard 3–5 business days (see conditions below).' },
  { num: '05', title: 'Deliver', desc: 'High-res files + web-optimised versions, organised by marketplace spec. Ready to upload.' },
];

const whoFor = [
  'New sellers wanting a professional presence from day one',
  'Existing sellers with low CTR or conversion on their current images',
  'Etsy artisans and handcraft brands needing warm, lifestyle-first photography',
  'Multi-SKU brands launching or refreshing a product catalog',
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

// Shared wide-padding shorthand
const W = 'px-6 md:px-12 lg:px-20 xl:px-28';

const Photography = () => {
  usePageMeta({
    title: 'Product Photography Services — Saleixo',
    description: 'Studio-grade product photography for Amazon, Shopify, and all major marketplaces. White-background, lifestyle, 360°, and infographic shots.',
  });
  return (
  <>
    <Header />
    <main className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>

      {/* ── Hero — full-bleed split ── */}
      <section className="relative overflow-hidden" style={{ minHeight: '92vh' }}>

        {/* Dark mode ambient */}
        <div className="absolute inset-0 pointer-events-none hidden dark:block">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(215 45% 14%) 0%, hsl(220 35% 10%) 40%, hsl(222 30% 9%) 100%)' }} />
          <div className="absolute rounded-full" style={{ top: '-10%', left: '-5%', width: '560px', height: '560px', background: 'radial-gradient(circle, hsl(210 85% 55% / 0.28) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        </div>
        <div className="absolute inset-0 pointer-events-none dark:hidden">
          <div className="absolute rounded-full" style={{ top: '-10%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, hsl(210 85% 55% / 0.07) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row" style={{ minHeight: '92vh' }}>

          {/* Left — text */}
          <div
            className={`flex flex-col justify-center ${W} pt-32 pb-16`}
            style={{ flex: '0 0 52%' }}
          >
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase"
                style={{ background: 'hsl(var(--surface-elevated))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
                <Camera className="w-3 h-3" strokeWidth={1.5} />
                Product Photography
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-extrabold leading-[1.04] tracking-tight mb-5 text-foreground"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)' }}>
              First impressions sell.{' '}
              <span className="text-primary">Make yours count.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base leading-relaxed text-muted-foreground mb-8 max-w-lg">
              High-quality product photography is the single highest-ROI investment an ecommerce seller can make. We deliver studio-grade images in 48 hours — marketplace-compliant and built to convert.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Clock,   label: '48-hr express delivery' },
                { icon: Star,    label: 'Amazon compliant' },
                { icon: Package, label: 'All marketplaces' },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ background: 'hsl(var(--surface-elevated))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}>
                  <Icon className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                  {label}
                </span>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.38 }}
              className="flex flex-wrap gap-3">
              <Link to="/get-started"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                Request a Quote <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
              <Link to="/custom-pricing"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-border text-foreground transition-all duration-200 hover:border-primary hover:text-primary">
                See Pricing
              </Link>
            </motion.div>
          </div>

          {/* Right — full-bleed image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
            style={{ flex: '1 1 48%', minHeight: 400 }}
          >
            <img src={imgHero} alt="Product photography studio" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="inline-block px-4 py-3 rounded-xl"
                style={{ background: 'rgba(10,10,10,0.72)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="text-white text-sm font-semibold">48-hr express delivery available<sup className="text-[10px] font-normal ml-px" style={{ verticalAlign: 'super' }}>*</sup></p>
                <p className="text-white/55 text-xs mt-0.5">Standard delivery: 3–5 business days.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Problem callout ── */}
      <section className={`py-14 ${W}`} style={{ background: 'hsl(var(--surface))' }}>
        <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="rounded-2xl p-8 md:p-12"
          style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-muted-foreground mb-4">The problem</p>
          <p className="text-xl md:text-2xl font-semibold text-foreground leading-snug max-w-4xl">
            Buyers can't touch your product.{' '}
            <span className="text-muted-foreground font-normal">Your images are your sales team. Blurry, dark, or generic photos lose sales to competitors who invested in professional photography — even if their product is inferior.</span>
          </p>
        </motion.div>
      </section>

      {/* ── What We Do ── */}
      <section className={`py-20 ${W}`}>
        <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">What we do</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">Every shot type. Every marketplace spec.</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {whatWeDo.map((item, i) => (
            <motion.div key={item} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
              className="flex items-start gap-3 p-5 rounded-xl"
              style={{ background: 'hsl(var(--surface))', border: '1px solid hsl(var(--border))' }}>
              <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" strokeWidth={2} />
              <span className="text-sm text-foreground/85">{item}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section className={`py-20 ${W}`} style={{ background: 'hsl(var(--surface))' }}>
        <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">Our process</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            From brief to delivered. Express in 48 hrs.<sup className="text-base font-normal text-primary ml-0.5" style={{ verticalAlign: 'super' }}>*</sup>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {process.map((step, i) => (
            <motion.div key={step.num} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
              className="flex flex-col gap-3 p-6 rounded-2xl"
              style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
              <div className="text-3xl font-extrabold leading-none" style={{ color: 'hsl(var(--border-strong))', fontFamily: '"Inter Tight", Inter, sans-serif' }}>{step.num}</div>
              <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Delivery Conditions ── */}
      <section className={`py-10 ${W}`}>
        <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="rounded-2xl p-6 md:p-8 border border-primary/20"
          style={{ background: 'hsl(var(--surface-elevated))' }}>
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: 'hsl(var(--primary))' }}>
            48-Hour Express Delivery — Conditions
          </p>
          <div className="grid sm:grid-cols-2 gap-6 text-sm text-muted-foreground leading-relaxed">
            <div>
              <p className="font-semibold text-foreground mb-1">What's included</p>
              <ul className="space-y-1">
                <li>· White-background hero shots (up to 10 SKUs)</li>
                <li>· Product must be received at our studio by 10 AM IST on the shoot day</li>
                <li>· Standard retouching and background removal</li>
                <li>· Files delivered in marketplace-ready specs</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Standard delivery (3–5 business days) applies to</p>
              <ul className="space-y-1">
                <li>· Lifestyle photography and complex setups</li>
                <li>· Large catalogs (11+ SKUs)</li>
                <li>· 360° spins, video clips, and infographics</li>
                <li>· Orders without prior brief approval</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-5 pt-4 border-t border-border">
            Rush fee for 48-hr express: +25% of service price. See the <Link to="/custom-pricing" className="underline underline-offset-2 hover:text-foreground transition-colors">Pricing page</Link> for full details.
          </p>
        </motion.div>
      </section>

      {/* ── Who It's For ── */}
      <section className={`py-20 ${W}`}>
        <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">Who this is for</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">Built for sellers who take listings seriously.</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-4">
          {whoFor.map((item, i) => (
            <motion.div key={item} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex items-start gap-4 p-6 rounded-2xl"
              style={{ background: 'hsl(var(--surface))', border: '1px solid hsl(var(--border))' }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'hsl(var(--primary)/0.12)' }}>
                <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
              </div>
              <span className="text-sm text-foreground/85 leading-relaxed">{item}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className={`py-20 ${W}`} style={{ background: 'hsl(var(--surface))' }}>
        <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">What we shoot</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Specialised in every category.
            </h2>
            <Link to="/categories"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4 flex-shrink-0">
              View all categories <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {categoryPreviews.map((cat, i) => (
            <motion.div key={cat.name} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
              <Link to="/categories" className="group block overflow-hidden rounded-2xl relative aspect-[3/4]"
                style={{ border: '1px solid hsl(var(--border))' }}>
                <img src={cat.image} alt={cat.alt} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-semibold leading-tight">{cat.name}</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={`py-20 ${W}`}>
        <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">Get started</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            Tell us what you're selling.<br />We'll send a quote in 24 hours.
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-sm leading-relaxed">
            No commitment required. Share your product and platform, and we'll come back with a photography package tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/get-started"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
              Request a Quote <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
            <Link to="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold border border-border text-foreground transition-all duration-200 hover:border-primary hover:text-primary">
              View All Services
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
    <Footer />
    <ScrollToTop />
  </>
  );
};

export default Photography;
