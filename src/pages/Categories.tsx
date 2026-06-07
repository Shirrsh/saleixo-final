import { useEffect, useState } from 'react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { motion } from 'framer-motion';
import { ArrowRight, Camera } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';
import { supabase } from '@/integrations/supabase/client';

import jewelryNecklace from '@/assets/categories/jewelry-necklace.jpg';
import jewelryEarrings from '@/assets/categories/jewelry-earrings.jpg';
import incensePackaging from '@/assets/categories/incense-packaging.jpg';
import spiritualProducts from '@/assets/categories/spiritual-products.jpg';
import aquamarineB from '@/assets/categories/aquamarine-bracelet.jpg';

interface Category {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  alt_text: string | null;
  slug: string;
}

const fallbackCategories: Category[] = [
  { id: '1', name: 'Jewelry Photography', description: 'Exquisite gold, silver, and gemstone jewelry captured with precision and elegance. We showcase the brilliance, craftsmanship, and intricate details of your precious pieces.', image_url: jewelryNecklace, alt_text: 'Ornate gold necklace jewelry photography showcasing intricate craftsmanship', slug: 'jewelry-photography' },
  { id: '2', name: 'Pearl & Fine Jewelry', description: 'Stunning pearl earrings and fine jewelry photography that highlights luster, texture, and sophistication. Perfect for luxury brands and boutique collections.', image_url: jewelryEarrings, alt_text: 'Elegant pearl drop earrings on white background professional jewelry photography', slug: 'pearl-fine-jewelry' },
  { id: '3', name: 'Spiritual & Wellness', description: 'Sacred incense, spiritual artifacts, and wellness products photographed with reverence and authenticity. We capture the essence and cultural significance of each item.', image_url: spiritualProducts, alt_text: 'Spiritual wellness products and incense sticks product photography', slug: 'spiritual-wellness' },
  { id: '4', name: 'Premium Incense & Packaging', description: 'Packaging and product photography for premium incense brands. We highlight the heritage, quality, and visual appeal of your spiritual product lines.', image_url: incensePackaging, alt_text: 'Premium incense stick packaging photography with traditional design', slug: 'incense-packaging' },
  { id: '6', name: 'Gemstone Accessories', description: 'Natural gemstone bracelets and accessories photographed to highlight their unique colors, textures, and healing properties. Ideal for lifestyle and wellness brands.', image_url: aquamarineB, alt_text: 'Aquamarine gemstone bracelet lifestyle photography', slug: 'gemstone-accessories' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const CategoryCard = ({ category, index, isLight }: { category: Category; index: number; isLight: boolean }) => {
  const cardBg = isLight ? '#ffffff' : 'hsl(220 28% 11%)';
  const cardBorder = isLight ? 'hsl(0 0% 88%)' : 'hsl(215 40% 22% / 0.7)';
  const textPrimary = isLight ? '#0a0a0a' : '#ffffff';
  const textMuted = isLight ? 'hsl(0 0% 40%)' : 'hsl(215 20% 62%)';
  const accentBlue = isLight ? 'hsl(210 85% 45%)' : '#60a5fa';

  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.5}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="group overflow-hidden rounded-2xl h-full flex flex-col cursor-default"
        style={{
          background: cardBg,
          border: `1px solid ${cardBorder}`,
          boxShadow: isLight
            ? '0 2px 16px hsl(0 0% 0% / 0.07)'
            : '0 4px 32px hsl(220 30% 5% / 0.5)',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = isLight ? 'hsl(210 85% 55% / 0.4)' : 'hsl(210 85% 55% / 0.45)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = isLight
            ? '0 8px 40px hsl(210 85% 55% / 0.12)'
            : '0 8px 48px hsl(210 85% 55% / 0.18)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = cardBorder;
          (e.currentTarget as HTMLDivElement).style.boxShadow = isLight
            ? '0 2px 16px hsl(0 0% 0% / 0.07)'
            : '0 4px 32px hsl(220 30% 5% / 0.5)';
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3] flex-shrink-0">
          <img
            src={category.image_url || '/placeholder.svg'}
            alt={category.alt_text || category.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={e => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{ background: isLight ? '#0a0a0a' : '#ffffff', color: isLight ? '#ffffff' : '#0a0a0a' }}
            >
              Get a Quote <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-2 flex-1">
          <h3
            className="text-xl font-bold leading-tight tracking-tight transition-colors duration-200 group-hover:text-[hsl(210_85%_55%)]"
            style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}
          >
            {category.name}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: textMuted }}>{category.description}</p>
          <div className="mt-auto pt-3 flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: accentBlue }}>
            Book a shoot <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Categories = () => {
  usePageMeta({
    title: 'Product Categories — Saleixo',
    description: 'Browse Saleixo ecommerce services by product category — jewelry, home goods, fashion, leather, incense, and more.',
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLight, setIsLight] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'light';
    return !window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const sync = () => setIsLight(document.documentElement.classList.contains('light'));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.title = 'Photography Categories | Saleixo — Professional Product Photography';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', 'Explore our specialized photography categories: Jewelry, Spiritual & Wellness, Gemstone Accessories, and more. Studio-grade product photography built to convert.');
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, description, image_url, alt_text, slug')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      if (error || !data || data.length === 0) setCategories(fallbackCategories);
      else setCategories(data);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const bg = isLight ? '#ffffff' : 'hsl(220 30% 7%)';
  const textPrimary = isLight ? '#0a0a0a' : '#ffffff';
  const textMuted = isLight ? 'hsl(0 0% 38%)' : 'hsl(215 20% 62%)';
  const accentBlue = isLight ? 'hsl(210 85% 45%)' : '#60a5fa';
  const borderColor = isLight ? 'hsl(0 0% 88%)' : 'hsl(215 40% 24% / 0.6)';

  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: bg }}>

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-24 px-4 overflow-hidden">
          {/* Ambient glow */}
          {!isLight && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(215 45% 14%) 0%, hsl(220 35% 10%) 40%, hsl(222 30% 9%) 100%)' }} />
              <div className="absolute rounded-full pointer-events-none" style={{ top: '-15%', left: '-8%', width: '600px', height: '600px', background: 'radial-gradient(circle, hsl(210 85% 55% / 0.35) 0%, hsl(220 70% 35% / 0.15) 45%, transparent 70%)', filter: 'blur(70px)' }} />
              <div className="absolute rounded-full pointer-events-none" style={{ bottom: '-10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, hsl(258 70% 55% / 0.2) 0%, transparent 65%)', filter: 'blur(60px)' }} />
            </div>
          )}
          {isLight && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute rounded-full" style={{ top: '-10%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, hsl(210 85% 55% / 0.06) 0%, transparent 65%)', filter: 'blur(40px)' }} />
            </div>
          )}

          <div className="relative z-10 container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              {/* Eyebrow chip */}
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
                style={isLight ? {
                  background: 'hsl(0 0% 94%)', border: '1px solid hsl(0 0% 82%)', color: 'hsl(0 0% 25%)',
                } : {
                  background: 'hsl(210 85% 55% / 0.15)', border: '1px solid hsl(210 85% 65% / 0.4)', color: '#93c5fd',
                }}
              >
                <Camera className="w-3 h-3" />
                Studio-Grade Photography
              </motion.span>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-extrabold leading-[1.04] tracking-tight mb-5"
                style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', color: textPrimary }}
              >
                Every Product.{' '}
                <span style={{ color: accentBlue }}>
                  Shot to{' '}
                </span>
                <span style={{ color: accentBlue }}>Sell.</span>
              </motion.h1>

              {/* Subhead */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22 }}
                className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
                style={{ color: textMuted }}
              >
                Specialized product photography for ecommerce sellers and brands — from fine jewelry to spiritual accessories, every category handled with precision.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.34 }}
                className="flex flex-col sm:flex-row gap-3 mb-12"
              >
                <button
                  onClick={scrollToContact}
                  className="px-6 py-3 rounded-xl font-semibold text-sm transition-opacity duration-200"
                  style={{ background: isLight ? '#0a0a0a' : '#ffffff', color: isLight ? '#ffffff' : '#0a0a0a' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.82')}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
                >
                  Book a Shoot
                </button>
                <a
                  href="#categories-grid"
                  className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                  style={{ color: textMuted, border: `1.5px solid ${borderColor}` }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = textPrimary; el.style.borderColor = isLight ? '#0a0a0a' : '#ffffff'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = textMuted; el.style.borderColor = borderColor; }}
                >
                  Browse Categories
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.46 }}
                className="flex gap-10 pt-6"
                style={{ borderTop: `1px solid ${borderColor}` }}
              >
                {[
                  { value: '500+', label: 'Products Shot' },
                  { value: '6', label: 'Specializations' },
                  { value: '48hr', label: 'Turnaround' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-extrabold" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}>{s.value}</div>
                    <div className="text-xs font-medium mt-0.5" style={{ color: isLight ? 'hsl(0 0% 45%)' : '#94a3b8' }}>{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Categories Grid ── */}
        <section id="categories-grid" className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="flex gap-2">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentBlue, animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                  <CategoryCard key={category.id} category={category} index={index} isLight={isLight} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="relative rounded-2xl p-10 md:p-14 text-center overflow-hidden"
              style={{
                background: isLight ? 'hsl(0 0% 97%)' : 'hsl(220 28% 11%)',
                border: `1px solid ${isLight ? 'hsl(0 0% 88%)' : 'hsl(210 85% 55% / 0.2)'}`,
                boxShadow: isLight ? '0 4px 32px hsl(0 0% 0% / 0.06)' : '0 8px 48px hsl(210 85% 55% / 0.12)',
              }}
            >
              {!isLight && (
                <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, hsl(210 85% 55% / 0.08) 0%, transparent 70%)' }} />
              )}
              <div className="relative z-10">
                <span
                  className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-5"
                  style={isLight ? { background: 'hsl(0 0% 92%)', border: '1px solid hsl(0 0% 82%)', color: 'hsl(0 0% 30%)' } : { background: 'hsl(210 85% 55% / 0.15)', border: '1px solid hsl(210 85% 55% / 0.3)', color: '#93c5fd' }}
                >
                  Get Started
                </span>
                <h2
                  className="font-extrabold tracking-tight mb-4"
                  style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: textPrimary }}
                >
                  Ready to Showcase Your Products?
                </h2>
                <p className="text-base max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: textMuted }}>
                  Our team of experienced photographers, editors, and stylists will bring your products to life with visuals that convert.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={scrollToContact}
                    className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
                    style={{ background: isLight ? '#0a0a0a' : '#ffffff', color: isLight ? '#ffffff' : '#0a0a0a' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.82')}
                    onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
                  >
                    Book a Consultation
                  </button>
                  <button
                    onClick={scrollToContact}
                    className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
                    style={{ color: textMuted, border: `1.5px solid ${borderColor}` }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = textPrimary; el.style.borderColor = isLight ? '#0a0a0a' : '#ffffff'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = textMuted; el.style.borderColor = borderColor; }}
                  >
                    Get In Touch
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
};

export default Categories;
