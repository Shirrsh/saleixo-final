import { usePageMeta, buildBreadcrumbSchema, ORG_ID } from '@/hooks/usePageMeta';
import { motion } from 'framer-motion';
import {
  ArrowRight, Check, Camera, ShoppingBag, Layers, Store,
  Palette, Sparkles, Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';

// Hero — embroidery hands
import imgHero from '@/assets/categories/handmade-artisan-craft.webp';

// Section 3 — service block visuals
import imgMacro     from '@/assets/selected-work/jewelry-necklace-flatlay.webp';
import imgPottery   from '@/assets/selected-work/handmade-pottery.webp';
import imgBaskets   from '@/assets/services/handmade-basket-collection.webp';
import imgTerracotta from '@/assets/selected-work/handmade-terracotta-planter.webp';

// Section 4 — category cards (unique assets — none reused elsewhere on this page)
import imgCatBeaded   from '@/assets/categories/jewelry-beaded-photography.webp';
import imgCatCraft    from '@/assets/services/brass-diya-hero.webp';
import imgCatWellness from '@/assets/categories/wellness-incense-pooja.webp';
import imgCatApparel  from '@/assets/categories/apparel-sleepwear.webp';

// ── Motion ────────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

// Shared wide-padding shorthand
const W = 'px-6 md:px-12 lg:px-20 xl:px-28';

// ── Section 2 data — artisan-specific pain ────────────────────────────────────
const problems = [
  {
    icon: Palette,
    title: 'Colours die under normal lights.',
    body: 'Beads, glaze, zari and gemstones need macro lenses and controlled light — phone photos flatten exactly the detail customers pay a premium for.',
  },
  {
    icon: Layers,
    title: 'Every marketplace wants a different file.',
    body: 'Amazon Handmade, Etsy, eBay and Shopify each have their own image specs, title rules and category quirks. One shoot should serve all of them — if it\'s planned that way.',
  },
  {
    icon: Clock,
    title: 'Craft time keeps disappearing into listings.',
    body: 'Makers lose shooting-and-listing days that should go into making. That\'s the actual cost of DIY.',
  },
];

// ── Section 3 data — what we do for artisan brands ────────────────────────────
const services = [
  {
    icon: Camera,
    title: 'Macro product photography',
    body: 'Individual-bead-sharp detail shots, lifestyle scenes, flat-lays. Standard shoots delivered in 48 hours.',
    href: '/services/photography',
    cta: 'Photography',
    image: imgMacro,
    alt: 'Macro flat-lay of a handcrafted beaded necklace showing individual-bead detail',
  },
  {
    icon: ShoppingBag,
    title: 'Etsy & Amazon Handmade listings',
    body: 'Titles, tags and attributes written for handmade search — not generic Amazon SEO recycled.',
    href: '/services/amazon',
    cta: 'Listings',
    image: imgPottery,
    alt: 'Handmade glazed pottery bowl styled for a marketplace product listing',
  },
  {
    icon: Layers,
    title: 'One shoot, every marketplace',
    body: 'Amazon, Etsy, eBay, Walmart, Shopify specs delivered from a single session.',
    href: '/services/ecommerce-management',
    cta: 'Management',
    image: imgBaskets,
    alt: 'Collection of handwoven artisan baskets photographed for multiple marketplace specs',
  },
  {
    icon: Store,
    title: 'A store of your own',
    body: 'Shopify D2C stores that match the craft — so wholesale buyers take you seriously.',
    href: '/services/shopify',
    cta: 'Shopify',
    image: imgTerracotta,
    alt: 'Handmade terracotta planter photographed for a direct-to-consumer Shopify store',
  },
];

// ── Section 4 data — categories we shoot weekly ───────────────────────────────
const categories = [
  { name: 'Jewelry & Beaded Accessories', image: imgCatBeaded,   alt: 'Handcrafted beaded jewelry photographed to show colour and pattern detail' },
  { name: 'Handmade & Artisan Craft',     image: imgCatCraft,    alt: 'Engraved brass diya oil lamp — handmade artisan metalwork product shot' },
  { name: 'Wellness, Incense & Pooja',    image: imgCatWellness, alt: 'Incense and pooja essentials styled with warm, authentic lighting' },
  { name: 'Apparel & Sleepwear',          image: imgCatApparel,  alt: 'Handmade apparel photographed to show fabric texture and drape' },
];

// ── Section 5 data — handmade testimonials (static) ───────────────────────────
const testimonials = [
  {
    quote: 'They shot five different product categories for me in one session and every marketplace got exactly the files it needed. I finally got my weekends back.',
    name: 'Brijesh',
    role: 'Handmade seller · 5+ categories',
  },
  {
    quote: 'My beadwork photographs badly on a phone — the colour just disappears. Their macro shots actually look like the piece in your hand. That changed how my listings convert.',
    name: 'Abhinav',
    role: 'Beaded accessories brand',
  },
];

// ── Section 7 data — FAQ (mirrored into FAQPage JSON-LD) ───────────────────────
const faqs = [
  {
    q: 'Do you work with single-person artisan businesses?',
    a: 'Yes; most of our handmade clients are founder-run. Starter tiers exist exactly for this.',
  },
  {
    q: 'Can you shoot very small or reflective items — beads, kundan, silver?',
    a: 'Yes; macro lenses and controlled lighting are our core setup. See the jewelry portfolio.',
  },
  {
    q: 'Do you handle Amazon Handmade\'s application and category rules?',
    a: 'Yes, including attributes, artisan profile and compliance.',
  },
  {
    q: 'I sell on Etsy and Amazon both — do I need two shoots?',
    a: 'No. One session is planned against every marketplace\'s spec from the start.',
  },
  {
    q: 'Where are you located, and do you take international clients?',
    a: 'Production Studio HQ in Noida Sector 62; serving brands across the US (EST & PST), UK, EU, Australia, and worldwide with daily US timezone overlap and 3D digital staging.',
  },
];

const Handmade = () => {
  usePageMeta({
    title: 'Ecommerce Studio for Handmade & Artisan Brands — Saleixo',
    description: 'Product photography, Etsy & Amazon Handmade listings, and Shopify stores for artisan brands. Serving US & global brands with production studio HQ in Noida Sector 62.',
    structuredData: [
      buildBreadcrumbSchema([
        { name: 'Home', url: 'https://saleixo.com/' },
        { name: 'Handmade & Artisan Brands', url: 'https://saleixo.com/handmade' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Ecommerce Services for Handmade & Artisan Brands',
        url: 'https://saleixo.com/handmade',
        serviceType: 'Ecommerce services for handmade and artisan brands',
        provider: { '@id': ORG_ID },
        areaServed: ['IN', 'US', 'GB', 'FR', 'DE', 'AU', 'CA'],
        description: 'Product photography, Etsy & Amazon Handmade listings, and Shopify stores for artisan brands — beadwork, jewelry, textiles, pottery, incense.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  });

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>

        {/* ── Section 1 — Hero ── */}
        <section className="relative overflow-hidden" style={{ minHeight: '90vh' }}>
          {/* Dark-mode ambient */}
          <div className="absolute inset-0 pointer-events-none hidden dark:block">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(215 45% 14%) 0%, hsl(220 35% 10%) 40%, hsl(222 30% 9%) 100%)' }} />
            <div className="absolute rounded-full" style={{ top: '-10%', left: '-5%', width: '560px', height: '560px', background: 'radial-gradient(circle, hsl(210 85% 55% / 0.26) 0%, transparent 70%)', filter: 'blur(70px)' }} />
          </div>
          <div className="absolute inset-0 pointer-events-none dark:hidden">
            <div className="absolute rounded-full" style={{ top: '-10%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, hsl(210 85% 55% / 0.07) 0%, transparent 65%)', filter: 'blur(50px)' }} />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row" style={{ minHeight: '90vh' }}>
            {/* Left — text */}
            <div className={`flex flex-col justify-center ${W} pt-32 pb-16`} style={{ flex: '0 0 52%' }}>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-5">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase"
                  style={{ background: 'hsl(var(--surface-elevated))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
                  <Sparkles className="w-3 h-3" strokeWidth={1.5} />
                  Handmade &amp; Artisan Brands
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-extrabold leading-[1.04] tracking-tight mb-5 text-foreground"
                style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)' }}>
                Handmade sells on detail.{' '}
                <span className="text-primary">Most photos lose it.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base leading-relaxed text-muted-foreground mb-8 max-w-lg">
                Macro photography, marketplace-ready listings, and Shopify stores for artisan brands — beadwork, jewelry, textiles, pottery, incense. One studio, every marketplace spec.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.32 }}
                className="flex flex-wrap gap-3">
                <Link to="/get-started"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                  Get a quote <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Link>
                <Link to="/custom-pricing"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-border text-foreground transition-all duration-200 hover:border-primary hover:text-primary">
                  See pricing
                </Link>
              </motion.div>
            </div>

            {/* Right — image */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden" style={{ flex: '1 1 48%', minHeight: 400 }}>
              <img src={imgHero} alt="Artisan hands embroidering fabric on a hoop, overhead flat-lay" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </section>

        {/* ── Section 2 — The problem ── */}
        <section className={`py-10 md:py-14 ${W}`} style={{ background: 'hsl(var(--surface))' }}>
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 max-w-2xl">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">The problem</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Craft is in the detail. So is the drop-off.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {problems.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
                  className="flex flex-col gap-4 p-7 rounded-2xl"
                  style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'hsl(var(--primary)/0.1)', border: '1px solid hsl(var(--primary)/0.2)' }}>
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground leading-snug">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Section 3 — What we do for artisan brands ── */}
        <section className={`py-10 md:py-14 ${W}`}>
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 max-w-2xl">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">What we do</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              One studio for the whole craft-to-cart journey.
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div key={svc.title} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
                  <Link to={svc.href}
                    className="group flex flex-col h-full overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img src={svc.image} alt={svc.alt} loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
                        style={{ background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Icon className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                        <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white">{svc.cta}</span>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">{svc.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{svc.body}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        Explore {svc.cta}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={1.5} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Section 4 — Categories we shoot weekly ── */}
        <section className={`py-10 md:py-14 ${W}`} style={{ background: 'hsl(var(--surface))' }}>
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">What we shoot</p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                Categories we shoot every week.
              </h2>
              <Link to="/categories"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4 flex-shrink-0">
                View all categories <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.name} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                <Link to="/categories" className="group block overflow-hidden rounded-2xl relative aspect-[3/4]"
                  style={{ border: '1px solid hsl(var(--border))' }}>
                  <img src={cat.image} alt={cat.alt} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-semibold leading-tight">{cat.name}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Section 5 — Testimonials ── */}
        <section className={`py-10 md:py-14 ${W}`}>
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 max-w-2xl">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">In their words</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Makers who stopped losing the detail.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
                className="flex flex-col gap-5 p-7 rounded-2xl"
                style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
                <p className="text-base text-foreground/85 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-auto flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: 'hsl(174 37% 28%)' }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-6">Brand names withheld at our clients&rsquo; request.</p>
        </section>

        {/* ── Section 6 — Transparent pricing strip ── */}
        <section className={`py-8 md:py-12 ${W}`}>
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10"
            style={{ background: 'linear-gradient(135deg, hsl(174 37% 13%) 0%, hsl(220 30% 10%) 100%)', border: '1px solid hsl(174 30% 22% / 0.5)' }}>
            <div className="flex-1">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold mb-3">Transparent pricing</p>
              <p className="text-xl md:text-2xl font-semibold text-white leading-snug">
                Our prices are on the website.{' '}
                <span className="text-white/70 font-normal">
                  On-demand commercial photography, structured marketplace management — transparent rate sheets available online.
                </span>
              </p>
            </div>
            <Link to="/custom-pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 flex-shrink-0"
              style={{ background: 'hsl(var(--gold))', color: '#000' }}>
              See pricing <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </section>

        {/* ── Section 7 — FAQ ── */}
        <section className={`py-10 md:py-14 ${W}`} style={{ background: 'hsl(var(--surface))' }}>
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 max-w-2xl">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">Common questions</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Answers for artisan sellers.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl">
            {faqs.map((f, i) => (
              <motion.div key={f.q} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
                className="p-6 rounded-2xl"
                style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
                <h3 className="text-sm font-bold text-foreground mb-2 flex items-start gap-2">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" strokeWidth={2} />
                  {f.q}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Section 8 — CTA ── */}
        <section className={`py-10 md:py-14 ${W}`}>
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
            style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">Get started</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4 max-w-3xl mx-auto">
              Tell us what you make. We&rsquo;ll show you how it should look online.
            </h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-sm leading-relaxed">
              Share your craft and the marketplaces you sell on. We&rsquo;ll come back with a photography and listing plan built for handmade.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/get-started"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                Get a quote <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
              <Link to="/custom-pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold border border-border text-foreground transition-all duration-200 hover:border-primary hover:text-primary">
                See pricing
              </Link>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
};

export default Handmade;
