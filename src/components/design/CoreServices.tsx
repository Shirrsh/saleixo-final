import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Globe, Zap, Monitor, BarChart3, Store, Camera, Film, Palette } from 'lucide-react';

const services = [
  { icon: ShoppingCart, title: 'E-Commerce Account Management', desc: 'End-to-end seller account management on Amazon, Flipkart & more for sustained sales growth.' },
  { icon: Globe, title: 'Global Seller Management', desc: 'International expansion across Amazon US/UK/UAE, eBay, Walmart & cross-border marketplaces.' },
  { icon: Zap, title: 'Quick Commerce Onboarding', desc: 'Launch on Blinkit, Zepto & Swiggy Instamart with optimized catalogs and pricing.' },
  { icon: Monitor, title: 'Website Design & Development', desc: 'Custom ecommerce websites on Shopify, WooCommerce & WordPress with conversion-focused UX.' },
  { icon: BarChart3, title: 'Digital Marketing', desc: 'SEO, Google Ads, Meta Ads, social media marketing & lead generation campaigns.' },
  { icon: Store, title: 'Shopify Store Management', desc: 'Complete Shopify setup, theme customization, app integrations & checkout optimization.' },
  { icon: Camera, title: 'Product Photography', desc: 'Studio-grade catalog, lifestyle & 360° product photography that converts browsers to buyers.' },
  { icon: Film, title: 'Video Editing & Reels', desc: 'Product videos, brand reels, unboxing content & short-form video for social & listings.' },
  { icon: Palette, title: 'Branding & Packaging', desc: 'Complete brand identity — logo design, packaging, brand guidelines & marketing collateral.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

const CoreServices = () => {
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

  const textPrimary = isLight ? '#0a0a0a' : '#ffffff';
  const textMuted = isLight ? 'hsl(0 0% 38%)' : 'hsl(215 20% 62%)';
  const accentBlue = isLight ? 'hsl(210 85% 45%)' : '#60a5fa';
  const cardBg = isLight ? '#ffffff' : 'hsl(220 28% 11%)';
  const cardBorder = isLight ? 'hsl(0 0% 88%)' : 'hsl(215 40% 22% / 0.6)';

  return (
    <section className="py-20 px-4" style={{ background: isLight ? 'hsl(0 0% 97%)' : 'hsl(220 28% 9%)' }}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <span
            className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
            style={isLight ? { background: 'hsl(0 0% 92%)', border: '1px solid hsl(0 0% 82%)', color: 'hsl(0 0% 30%)' } : { background: 'hsl(210 85% 55% / 0.15)', border: '1px solid hsl(210 85% 55% / 0.3)', color: '#93c5fd' }}
          >
            Services
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mt-3 mb-3"
            style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}
          >
            Everything Under <span style={{ color: accentBlue }}>One Roof</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: textMuted }}>
            Everything you need to launch, grow & scale your ecommerce business — under one roof.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i * 0.5}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="group rounded-2xl p-6"
                style={{ background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: isLight ? '0 2px 12px hsl(0 0% 0% / 0.05)' : '0 4px 20px hsl(220 30% 5% / 0.35)' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = isLight ? 'hsl(210 85% 55% / 0.35)' : 'hsl(210 85% 55% / 0.4)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = cardBorder;
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={isLight ? { background: 'hsl(0 0% 92%)' } : { background: 'hsl(210 85% 55% / 0.12)', border: '1px solid hsl(210 85% 55% / 0.2)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: accentBlue }} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}>{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: textMuted }}>{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
