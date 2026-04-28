import { useState, useEffect } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

import img1 from '@/assets/categories/jewelry-earrings.jpg';
import img2 from '@/assets/categories/jewelry-necklace.jpg';
import img3 from '@/assets/categories/incense-packaging.jpg';
import img4 from '@/assets/categories/rudraksha-bracelet.jpg';
import img5 from '@/assets/categories/aquamarine-bracelet.jpg';
import featuredImg from '@/assets/categories/spiritual-products.jpg';

interface Testimonial {
  id: string;
  client_name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
  result: string;
  initials: string;
}

const fallback: Testimonial[] = [
  {
    id: '1',
    client_name: 'Arjun Mehta',
    role: 'Amazon Seller · Jewelry',
    quote: 'Saleixo transformed our listings completely. The photography quality is unmatched — conversion rate tripled in the first month.',
    rating: 5,
    image: img1,
    result: '+312% Conversion',
    initials: 'AM',
  },
  {
    id: '2',
    client_name: 'Priya Sharma',
    role: 'Etsy Store · Handcrafted',
    quote: 'Every product image tells a story now. Customers comment on how professional our shop looks. Sales doubled in 6 weeks.',
    rating: 5,
    image: img2,
    result: '2× Sales',
    initials: 'PS',
  },
  {
    id: '3',
    client_name: 'Rohan Kapoor',
    role: 'Flipkart · Lifestyle Brand',
    quote: 'The A+ content they built for us is world-class. We went from page 4 to page 1 on Flipkart search.',
    rating: 5,
    image: img3,
    result: 'Page 4 → Page 1',
    initials: 'RK',
  },
  {
    id: '4',
    client_name: 'James Whitfield',
    role: 'Shopify · Home Décor',
    quote: 'Professional, fast, and the results speak for themselves. Average order value went up 40% after the redesign.',
    rating: 5,
    image: img4,
    result: '+40% AOV',
    initials: 'JW',
  },
  {
    id: '5',
    client_name: 'Aisha Nair',
    role: 'Meesho · Fashion',
    quote: 'I was skeptical at first, but the ROI was visible within the first week. Best investment I made for my business.',
    rating: 4,
    image: img5,
    result: 'ROI in Week 1',
    initials: 'AN',
  },
];

// ── Single review card ────────────────────────────────────────────────────────
const ReviewCard = ({
  item, delay = 0,
}: {
  item: Testimonial; delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay }}
    className="rounded-2xl p-5 flex flex-col gap-3"
    style={{
      background: 'hsl(var(--card, 0 0% 100%))',
      border: '1px solid hsl(var(--border, 0 0% 90%))',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}
  >
    {/* Stars */}
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, si) => (
        <Star
          key={si}
          className="w-3.5 h-3.5"
          style={{
            fill: si < item.rating ? '#f97316' : 'transparent',
            color: si < item.rating ? '#f97316' : 'hsl(0 0% 80%)',
          }}
        />
      ))}
    </div>

    {/* Quote */}
    <p className="text-sm leading-relaxed text-foreground/80 flex-1">
      {item.quote}
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 pt-1">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
        style={{ background: 'hsl(174 37% 22%)' }}
      >
        {item.initials}
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-foreground leading-tight">{item.client_name}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{item.role}</div>
        {/* Gold accent underline */}
        <div className="mt-1.5 w-6 h-0.5 rounded-full" style={{ background: '#d4af37' }} />
      </div>
      <div
        className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
        style={{
          background: 'hsl(43 65% 52% / 0.1)',
          color: '#b8922a',
          border: '1px solid hsl(43 65% 52% / 0.25)',
        }}
      >
        {item.result}
      </div>
    </div>
  </motion.div>
);

// ── Main component ────────────────────────────────────────────────────────────
const Testimonials = () => {
  const [items, setItems] = useState<Testimonial[]>(fallback);

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

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Pill label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold tracking-[0.2em] uppercase"
            style={{
              background: 'hsl(43 65% 52% / 0.1)',
              border: '1px solid hsl(43 65% 52% / 0.3)',
              color: '#b8922a',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            Customer Reviews
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-4">
            Trusted by Sellers{' '}
            <em className="font-light not-italic" style={{ fontStyle: 'italic', color: 'hsl(174 37% 35%)' }}>
              Everywhere.
            </em>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto">
            From product launches to marketplace dominance — here's what sellers are saying about Saleixo.
          </p>
        </motion.div>

        {/* ── 3-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-10 md:mb-14">

          {/* Left column — 2 cards */}
          <div className="flex flex-col gap-4">
            {items[0] && <ReviewCard item={items[0]} delay={0} />}
            {items[1] && <ReviewCard item={items[1]} delay={0.08} />}
          </div>

          {/* Center — featured image card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ minHeight: '420px' }}
          >
            <img
              src={featuredImg}
              alt="Featured work"
              className="w-full h-full object-cover absolute inset-0"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Center badge */}
            <div className="absolute top-4 left-4">
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ background: '#d4af37', color: '#000' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-black/40" />
                FEATURED WORK
              </div>
            </div>

            {/* Bottom overlay text */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="text-white/60 text-xs mb-1 uppercase tracking-wider">Saleixo Studio</div>
              <div className="text-white text-lg font-semibold leading-tight">
                Studio-grade photography<br />that converts browsers to buyers.
              </div>
              <div className="flex gap-0.5 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5" style={{ fill: '#d4af37', color: '#d4af37' }} />
                ))}
                <span className="text-white/60 text-xs ml-2">5.0 · 500+ projects</span>
              </div>
            </div>
          </motion.div>

          {/* Right column — 2 cards */}
          <div className="flex flex-col gap-4">
            {items[2] && <ReviewCard item={items[2]} delay={0.16} />}
            {items[3] && <ReviewCard item={items[3]} delay={0.24} />}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8"
          style={{ borderTop: '1px solid hsl(var(--border, 0 0% 90%))' }}
        >
          {/* Left: rating */}
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-foreground">4.9</div>
            <div>
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4" style={{ fill: '#f97316', color: '#f97316' }} />
                ))}
              </div>
              <div className="text-xs text-muted-foreground">Based on 500+ projects</div>
            </div>
          </div>

          {/* Center: avatar stack + join text */}
          <div className="flex items-center gap-3">
            {/* Avatar stack */}
            <div className="flex -space-x-2">
              {items.slice(0, 4).map((item, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-background flex-shrink-0"
                  style={{ background: `hsl(${174 + i * 20} 37% ${22 + i * 5}%)` }}
                >
                  {item.initials}
                </div>
              ))}
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Join 500+ sellers</div>
              <div className="text-xs text-muted-foreground">who grew with Saleixo</div>
            </div>
          </div>

          {/* Right: CTA */}
          <button
            onClick={scrollToContact}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 flex-shrink-0"
            style={{ background: '#d4af37', color: '#000' }}
          >
            Book Free Consultation
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;
