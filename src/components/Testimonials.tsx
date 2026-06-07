import { useState, useEffect, useRef } from 'react';
import { Star, ArrowRight, Play, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

// ── All available images ──────────────────────────────────────────────────────
import imgEarrings   from '@/assets/categories/jewelry-earrings.jpg';
import imgNecklace   from '@/assets/categories/jewelry-necklace.jpg';
import imgIncense    from '@/assets/categories/incense-packaging.jpg';
import imgAquamarine from '@/assets/categories/aquamarine-bracelet.jpg';
import imgSpiritual  from '@/assets/categories/spiritual-products.jpg';
import imgShowcase1  from '@/assets/hero/showcase-1.jpg';
import imgShowcase2  from '@/assets/hero/showcase-2.jpg';
import imgShowcase3  from '@/assets/hero/showcase-3.jpg';
import imgShowcase4  from '@/assets/hero/showcase-4.jpeg';
import imgPortfolio1 from '@/assets/portfolio-1.jpg';
import imgPortfolio2 from '@/assets/portfolio-2.jpg';
import imgPortfolio3 from '@/assets/portfolio-3.jpeg';
import imgPhotography from '@/assets/photography-service.jpg';
import imgDesign      from '@/assets/design-service.jpg';
import imgMarketing   from '@/assets/marketing-service.jpg';

// ── Types ─────────────────────────────────────────────────────────────────────
type CardType = 'text' | 'image' | 'video';

interface TCard {
  id: string;
  type: CardType;
  // text + image + video
  client_name: string;
  role: string;
  quote: string;
  rating: number;
  result: string;
  initials: string;
  // image / video
  media?: string;
  // video only — YouTube embed id
  videoId?: string;
}

// ── Card data — 5 per column × 3 columns = 15 cards ──────────────────────────
const COL1: TCard[] = [
  {
    id: 'c1-1', type: 'image', media: imgShowcase1,
    client_name: 'Jewelry Brand', role: 'Amazon India · Jewelry',
    quote: 'Saleixo transformed our listings completely. Conversion rate tripled in the first month.',
    rating: 5, result: '+312% Conversion', initials: 'JB',
  },
  {
    id: 'c1-2', type: 'text',
    client_name: 'Handcraft Studio', role: 'Etsy · Handcrafted Jewelry',
    quote: 'We tried three photographers before Saleixo. The difference isn\'t the camera — it\'s that they understand which shot Amazon needs vs. which shot Etsy needs. Same product, different sets, both compliant.',
    rating: 5, result: '2× Sales', initials: 'HS',
  },
  {
    id: 'c1-3', type: 'image', media: imgEarrings,
    client_name: 'D2C Jeweller', role: 'Amazon · Jewelry',
    quote: 'The photography and guidance they provided made my brand look more consistent and polished.',
    rating: 5, result: '+180% Traffic', initials: 'DJ',
  },
  {
    id: 'c1-4', type: 'image', media: imgPhotography,
    client_name: 'Home Décor Brand', role: 'Shopify · Home Décor',
    quote: 'Professional, fast, and the results speak for themselves.',
    rating: 5, result: '+40% AOV', initials: 'HD',
  },
  {
    id: 'c1-5', type: 'text',
    client_name: 'Fashion Reseller', role: 'Meesho · Fashion',
    quote: 'I used to spend Sunday night fixing listing errors. Now I don\'t even check — Saleixo\'s team flags and fixes before I see the email.',
    rating: 5, result: '3× Revenue', initials: 'FR',
  },
];

const COL2: TCard[] = [
  {
    id: 'c2-1', type: 'image', media: imgShowcase2,
    client_name: 'Lifestyle Brand', role: 'Flipkart · Lifestyle',
    quote: 'The A+ content they built for us is world-class. We went from page 4 to page 1.',
    rating: 5, result: 'Page 4 → Page 1', initials: 'LB',
  },
  {
    id: 'c2-2', type: 'text',
    client_name: 'Multi-channel Seller', role: 'Amazon · Multi-marketplace',
    quote: 'Our Amazon listing was suppressed for 11 days before we found Saleixo. They had it back live in 36 hours and our daily sessions tripled within two weeks.',
    rating: 4, result: 'Sessions 3×', initials: 'MC',
  },
  {
    id: 'c2-3', type: 'image', media: imgNecklace,
    client_name: 'Electronics Brand', role: 'Walmart · Electronics',
    quote: 'The team understood exactly what I wanted. Turnaround was fast and quality exceeded expectations.',
    rating: 5, result: '+55% CTR', initials: 'EB',
  },
  {
    id: 'c2-4', type: 'text',
    client_name: 'Lifestyle Store', role: 'Shopify · Lifestyle',
    quote: 'Clean, professional, and delivered on time. The whole process was smooth and collaborative from start to finish.',
    rating: 5, result: '2× Sales', initials: 'LS',
  },
  {
    id: 'c2-5', type: 'image', media: imgIncense,
    client_name: 'Beauty & Wellness Brand', role: 'Amazon · Beauty',
    quote: 'Our brand finally looks premium. The photography elevated everything — packaging, listings, social media.',
    rating: 5, result: '+220% Revenue', initials: 'BW',
  },
];

const COL3: TCard[] = [
  {
    id: 'c3-1', type: 'text',
    client_name: 'D2C Brand Launch', role: 'Amazon · Shopify · D2C',
    quote: 'We launched a brand from scratch in 21 days. Logo, packaging, photography, Amazon listing, Etsy shop, and a Shopify storefront. Did 47 orders in week one.',
    rating: 5, result: '47 orders wk 1', initials: 'DL',
  },
  {
    id: 'c3-2', type: 'image', media: imgShowcase3,
    client_name: 'Fashion Seller', role: 'Meesho · Fashion',
    quote: 'I was skeptical at first, but the ROI was visible within the first week.',
    rating: 4, result: 'ROI in Week 1', initials: 'FS',
  },
  {
    id: 'c3-3', type: 'text',
    client_name: 'Wellness Brand', role: 'Amazon · Wellness & Beauty',
    quote: 'We swapped our old product photos for Saleixo shots. Click-through rate jumped immediately. Our listing finally looks as good as the product.',
    rating: 5, result: '+35% CTR', initials: 'WB',
  },
  {
    id: 'c3-4', type: 'image', media: imgAquamarine,
    client_name: 'Heritage Craft Co.', role: 'Amazon · Craft & Artisan',
    quote: 'Best product photography studio we have worked with. The retouching is flawless.',
    rating: 5, result: '+150% CTR', initials: 'HC',
  },
  {
    id: 'c3-5', type: 'text',
    client_name: 'Artisan Collective', role: 'Amazon · Handmade',
    quote: 'Set up and struck in under 10 minutes at a trade show. The photography was a game changer for live events.',
    rating: 5, result: 'Best ROI', initials: 'AC',
  },
];

// ── Stars ─────────────────────────────────────────────────────────────────────
const Stars = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'xs' }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={size === 'xs' ? 'w-3 h-3' : 'w-3.5 h-3.5'}
        style={{
          fill: i < rating ? '#f97316' : 'transparent',
          color: i < rating ? '#f97316' : 'rgba(150,150,150,0.4)',
        }}
      />
    ))}
  </div>
);

// ── Result badge ──────────────────────────────────────────────────────────────
const Badge = ({ label, dark = false }: { label: string; dark?: boolean }) => (
  <div
    className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap"
    style={dark
      ? { background: 'hsl(43 65% 52% / 0.25)', color: '#d4af37', border: '1px solid hsl(43 65% 52% / 0.4)' }
      : { background: 'hsl(43 65% 52% / 0.1)', color: '#b8922a', border: '1px solid hsl(43 65% 52% / 0.25)' }
    }
  >
    {label}
  </div>
);

// ── Author row ────────────────────────────────────────────────────────────────
const Author = ({ item, dark = false }: { item: TCard; dark?: boolean }) => (
  <div className="flex items-center gap-2">
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
      style={{ background: 'hsl(174 37% 28%)' }}
    >
      {item.initials}
    </div>
    <div className="min-w-0 flex-1">
      <div className={`text-xs font-semibold truncate ${dark ? 'text-white' : 'text-foreground'}`}>{item.client_name}</div>
      <div className={`text-[10px] truncate ${dark ? 'text-white/50' : 'text-muted-foreground'}`}>{item.role}</div>
    </div>
    <Badge label={item.result} dark={dark} />
  </div>
);

// ── Video tile with inline autoplay ──────────────────────────────────────────
const VideoTile = ({ item }: { item: TCard }) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  return (
    <div className="relative rounded-2xl overflow-hidden flex-shrink-0 w-full" style={{ height: '240px' }}>
      {playing && item.videoId ? (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&loop=1&playlist=${item.videoId}&modestbranding=1&rel=0`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={item.client_name}
          style={{ border: 'none' }}
        />
      ) : (
        <>
          <img src={item.media} alt={item.client_name} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

          {/* VIDEO badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold"
            style={{ background: '#f97316', color: '#fff' }}>
            <Play className="w-2.5 h-2.5 fill-white" />
            VIDEO
          </div>

          {/* Play button */}
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center group"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)', border: '1.5px solid rgba(255,255,255,0.35)' }}
            >
              <Play className="w-6 h-6 fill-white text-white ml-1" />
            </div>
          </button>

          {/* Author overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <Stars rating={item.rating} size="xs" />
            <div className="mt-2">
              <Author item={item} dark />
            </div>
          </div>
        </>
      )}

      {/* Mute toggle when playing */}
      {playing && (
        <button
          onClick={() => setMuted(m => !m)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center z-10"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
        >
          {muted
            ? <VolumeX className="w-3.5 h-3.5 text-white" />
            : <Volume2 className="w-3.5 h-3.5 text-white" />
          }
        </button>
      )}
    </div>
  );
};

// ── Image tile ────────────────────────────────────────────────────────────────
const ImageTile = ({ item }: { item: TCard }) => (
  <div className="relative rounded-2xl overflow-hidden flex-shrink-0 w-full" style={{ height: '220px' }}>
    <img src={item.media} alt={item.client_name} className="w-full h-full object-cover" loading="lazy" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-3">
      <Stars rating={item.rating} size="xs" />
      <p className="text-white text-[11px] leading-relaxed mt-1.5 line-clamp-2 opacity-90">"{item.quote}"</p>
      <div className="mt-2">
        <Author item={item} dark />
      </div>
    </div>
  </div>
);

// ── Text tile ─────────────────────────────────────────────────────────────────
const TextTile = ({ item }: { item: TCard }) => (
  <div
    className="rounded-2xl p-4 flex flex-col gap-3 flex-shrink-0 w-full"
    style={{
      background: 'hsl(var(--card))',
      border: '1px solid hsl(var(--border))',
      boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
    }}
  >
    <Stars rating={item.rating} />
    <p className="text-sm leading-relaxed text-foreground/80 flex-1">"{item.quote}"</p>
    <div className="pt-1">
      <Author item={item} />
      <div className="mt-2 w-5 h-0.5 rounded-full" style={{ background: '#d4af37' }} />
    </div>
  </div>
);

// ── Unified card dispatcher ───────────────────────────────────────────────────
const Card = ({ item }: { item: TCard }) => {
  if (item.type === 'video') return <VideoTile item={item} />;
  if (item.type === 'image') return <ImageTile item={item} />;
  return <TextTile item={item} />;
};

// ── Vertical scrolling column — scroll-velocity driven ───────────────────────
const ScrollColumn = ({
  cards,
  direction,
  baseDuration,
  scrollVelocity,
}: {
  cards: TCard[];
  direction: 'up' | 'down';
  baseDuration: number;
  scrollVelocity: React.MutableRefObject<number>;
}) => {
  const tripled = [...cards, ...cards, ...cards];
  const colRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(direction === 'down' ? -33.333 : 0); // % offset
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const totalCards = tripled.length;
    // base speed in % per ms
    const baseSpeed = 33.333 / (baseDuration * 1000);
    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;

      // velocity boost: scroll down = positive, amplify up-columns, slow down-columns
      const boost = 1 + scrollVelocity.current * (direction === 'up' ? 1 : -1) * 0.004;
      const speed = baseSpeed * Math.max(0.1, boost);

      if (direction === 'up') {
        posRef.current -= speed * dt;
        if (posRef.current <= -33.333) posRef.current += 33.333;
      } else {
        posRef.current += speed * dt;
        if (posRef.current >= 0) posRef.current -= 33.333;
      }

      if (colRef.current) {
        colRef.current.style.transform = `translateY(${posRef.current}%)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, baseDuration]);

  return (
    <div className="flex-1 overflow-hidden" style={{ minWidth: 0 }}>
      <div
        ref={colRef}
        className="flex flex-col gap-3"
        style={{ willChange: 'transform' }}
      >
        {tripled.map((card, i) => (
          <Card key={`${card.id}-${i}`} item={card} />
        ))}
      </div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);
  const decayRef = useRef<number>(0);
  // Track scroll velocity globally
  useEffect(() => {
    const onScroll = () => {
      const dy = window.scrollY - lastScrollY.current;
      lastScrollY.current = window.scrollY;
      scrollVelocity.current = dy;
    };

    // Decay velocity over time
    const decay = () => {
      scrollVelocity.current *= 0.88;
      decayRef.current = requestAnimationFrame(decay);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    decayRef.current = requestAnimationFrame(decay);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(decayRef.current);
    };
  }, []);

  const scrollToContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hidden" style={{ background: 'hsl(var(--background))' }}>

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="hidden"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold tracking-[0.2em] uppercase"
          style={{ background: 'hsl(43 65% 52% / 0.1)', border: '1px solid hsl(43 65% 52% / 0.3)', color: '#b8922a' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
          Results across industries
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-4">
          Real numbers.{' '}
          <em className="not-italic" style={{ fontStyle: 'italic', color: 'hsl(174 37% 45%)' }}>
            Real wins.
          </em>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto">
          From suppressed listings recovered in 36 hours to brand launches that hit $47k in week one — here's what sellers are saying.
        </p>
      </motion.div>

      {/* ── 3-column vertical scroll — full width, full viewport height ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* Top fade — tall enough to fully hide card tops */}
        <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
          style={{ height: '180px', background: 'linear-gradient(to bottom, hsl(var(--background)) 40%, transparent 100%)' }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
          style={{ height: '180px', background: 'linear-gradient(to top, hsl(var(--background)) 40%, transparent 100%)' }} />

        {/* Columns */}
        <div className="flex gap-4 h-full px-4 md:px-8" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <ScrollColumn cards={COL1} direction="up"   baseDuration={30} scrollVelocity={scrollVelocity} />
          <ScrollColumn cards={COL2} direction="down" baseDuration={24} scrollVelocity={scrollVelocity} />
          <ScrollColumn cards={COL3} direction="up"   baseDuration={34} scrollVelocity={scrollVelocity} />
        </div>
      </motion.div>

      {/* ── Bottom bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 mt-6 px-4 container mx-auto max-w-5xl"
        style={{ borderTop: '1px solid hsl(var(--border))' }}
      >
        {/* Rating */}
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

        {/* Avatar stack */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[...COL1, ...COL2].slice(0, 5).map((item, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-background flex-shrink-0"
                style={{ background: `hsl(${174 + i * 18} 37% ${22 + i * 4}%)` }}
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

        {/* CTA */}
        <button
          onClick={scrollToContact}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 flex-shrink-0"
          style={{ background: '#d4af37', color: '#000' }}
        >
          Book Free Consultation
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

    </section>
  );
};

export default Testimonials;
