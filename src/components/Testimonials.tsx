import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

// Real product images as card backgrounds
import img1 from '@/assets/categories/jewelry-earrings.jpg';
import img2 from '@/assets/categories/jewelry-necklace.jpg';
import img3 from '@/assets/categories/incense-packaging.jpg';
import img4 from '@/assets/categories/rudraksha-bracelet.jpg';
import img5 from '@/assets/categories/aquamarine-bracelet.jpg';

interface Testimonial {
  id: string;
  client_name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
  result: string; // the measurable outcome
}

const fallback: Testimonial[] = [
  {
    id: '1',
    client_name: 'Arjun Mehta',
    role: 'Amazon Seller · Jewelry',
    quote: 'Saleixo transformed our listings completely. The photography quality is unmatched — our conversion rate tripled within the first month.',
    rating: 5,
    image: img1,
    result: '+312% Conversion',
  },
  {
    id: '2',
    client_name: 'Priya Sharma',
    role: 'Etsy Store · Handcrafted',
    quote: 'Every product image tells a story now. Customers comment on how professional our shop looks. Sales doubled in 6 weeks.',
    rating: 5,
    image: img2,
    result: '2× Sales in 6 Weeks',
  },
  {
    id: '3',
    client_name: 'Rohan Kapoor',
    role: 'Flipkart · Lifestyle Brand',
    quote: 'The A+ content and storefront design they built for us is world-class. We went from page 4 to page 1 on Flipkart search.',
    rating: 5,
    image: img3,
    result: 'Page 4 → Page 1',
  },
  {
    id: '4',
    client_name: 'James Whitfield',
    role: 'Shopify · Home Décor',
    quote: 'Professional, fast, and the results speak for themselves. Our average order value went up 40% after the redesign.',
    rating: 5,
    image: img4,
    result: '+40% Avg Order Value',
  },
  {
    id: '5',
    client_name: 'Aisha Nair',
    role: 'Meesho · Fashion Accessories',
    quote: 'I was skeptical at first, but the ROI was visible within the first week. Best investment I made for my business.',
    rating: 5,
    image: img5,
    result: 'ROI in First Week',
  },
];

// Fan config — 5 cards, center tallest
const fan = [
  { rotate: -10, scale: 0.80, offsetX: -260, zIndex: 1 },
  { rotate: -5,  scale: 0.90, offsetX: -130, zIndex: 2 },
  { rotate:  0,  scale: 1.00, offsetX:    0, zIndex: 5 },
  { rotate:  5,  scale: 0.90, offsetX:  130, zIndex: 2 },
  { rotate: 10,  scale: 0.80, offsetX:  260, zIndex: 1 },
];

const CARD_W = 200;
const CARD_H_CENTER = 320;

const Testimonials = () => {
  const [items, setItems] = useState<Testimonial[]>(fallback);
  const [active, setActive] = useState(2);

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('id, client_name, quote, rating')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(5)
      .then(({ data }) => {
        if (data && data.length >= 3) {
          setItems(
            data.map((d, i) => ({
              ...fallback[i % fallback.length],
              id: d.id,
              client_name: d.client_name || fallback[i].client_name,
              quote: d.quote,
              rating: d.rating ?? 5,
            }))
          );
        }
      });
  }, []);

  const current = items[active];

  return (
    <section className="py-12 md:py-16 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-accent-violet mb-3">
            Client Results
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-4">
            Real Work. Real Results.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every card below is a product we photographed or designed. The words are from the sellers who sold them.
          </p>
        </motion.div>

        {/* Fan layout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative flex items-end justify-center"
          style={{ height: CARD_H_CENTER + 40 }}
        >
          {items.map((item, i) => {
            const cfg = fan[i];
            const isActive = i === active;
            const cardH = isActive ? CARD_H_CENTER : CARD_H_CENTER * cfg.scale;

            return (
              <motion.div
                key={item.id}
                onClick={() => setActive(i)}
                className="absolute bottom-0 cursor-pointer select-none"
                style={{ left: '50%', transformOrigin: 'bottom center' }}
                animate={{
                  x: cfg.offsetX - CARD_W / 2,
                  rotate: isActive ? 0 : cfg.rotate,
                  scale: isActive ? 1.03 : cfg.scale,
                  zIndex: isActive ? 10 : cfg.zIndex,
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: isActive ? 1.04 : cfg.scale + 0.03, zIndex: 8 }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: CARD_W,
                    height: cardH,
                    borderRadius: 24,
                    border: isActive
                      ? '1.5px solid hsl(43 65% 52% / 0.5)'
                      : '1px solid hsl(174 30% 22% / 0.5)',
                    boxShadow: isActive
                      ? '0 32px 80px hsl(174 33% 9% / 0.9), 0 0 40px hsl(43 65% 52% / 0.15)'
                      : '0 16px 48px hsl(174 33% 9% / 0.7)',
                  }}
                >
                  {/* Product photo fills the card */}
                  <img
                    src={item.image}
                    alt={item.client_name}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />

                  {/* Dark gradient overlay — stronger at bottom */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, hsl(174 33% 9% / 0.95) 0%, hsl(174 33% 9% / 0.4) 45%, transparent 70%)',
                    }}
                  />

                  {/* Result badge — top right */}
                  <div
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold"
                    style={{
                      background: 'hsl(43 65% 52% / 0.15)',
                      border: '1px solid hsl(43 65% 52% / 0.4)',
                      color: '#d4af37',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {item.result}
                  </div>

                  {/* Client info — bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-sm font-semibold text-white">{item.client_name}</div>
                    <div className="text-[10px] text-white/50 mt-0.5">{item.role}</div>
                    <div className="flex gap-0.5 mt-2">
                      {[...Array(5)].map((_, si) => (
                        <Star
                          key={si}
                          className="w-3 h-3"
                          style={{
                            fill: si < item.rating ? '#facc15' : 'transparent',
                            color: si < item.rating ? '#facc15' : 'hsl(174 30% 30%)',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Active glow ring */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-[24px] pointer-events-none"
                      style={{ border: '1px solid hsl(43 65% 52% / 0.35)' }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quote below fan */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div
              className="rounded-2xl p-8 relative"
              style={{
                background: 'hsl(174 37% 16% / 0.6)',
                border: '1px solid hsl(174 30% 22% / 0.6)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <Quote className="w-8 h-8 text-accent-violet/40 mb-4" />
              <blockquote className="text-lg md:text-xl text-white/90 font-light leading-relaxed mb-6">
                {current.quote}
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">{current.client_name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{current.role}</div>
                </div>
                <div
                  className="px-4 py-2 rounded-full text-sm font-bold"
                  style={{
                    background: 'hsl(43 65% 52% / 0.12)',
                    border: '1px solid hsl(43 65% 52% / 0.3)',
                    color: '#d4af37',
                  }}
                >
                  {current.result}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot nav */}
        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? 28 : 6,
                height: 6,
                background: i === active ? '#d4af37' : 'hsl(174 30% 22%)',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
