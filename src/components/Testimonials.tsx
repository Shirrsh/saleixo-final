import { ArrowRight, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Testimonial {
  quote: string;
  name: string;
  tag: string;
}

// ── Static, client-approved testimonials ─────────────────────────────────────
// First name + category + marketplace only (per CLAUDE.md testimonial policy).
// No brand names, no ratings, no percentage/stat claims — every line here is a
// plain-language client quote. Do NOT add fabricated metrics or star ratings.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "My main images kept getting rejected for background issues. Saleixo reshot the whole catalog, everything passed first upload. Wish I'd done it a year earlier.",
    name: 'Aditya',
    tag: 'Home Storage seller, Amazon.com',
  },
  {
    quote:
      'I sell across 5+ handmade categories and every one has different photo needs. One team handling all of it saves me more time than the photos themselves.',
    name: 'Brijesh',
    tag: 'Handmade seller, 5+ categories',
  },
  {
    quote:
      'Running Amazon, Etsy and Shopify together was chaos — three specs, three deadlines. They deliver one shoot in every format. Listings went live without a single rework.',
    name: 'Nitish',
    tag: 'Multi-marketplace seller',
  },
  {
    quote:
      'Beadwork is hard to photograph — colours die under normal lights. Their macro shots finally show the detail customers pay for. Conversion is visibly better.',
    name: 'Abhinav',
    tag: 'Beaded accessories brand',
  },
  {
    quote:
      'Honestly I was hesitant to hand over a lingerie catalog. They handled it professionally, on-model shots came out premium, and my Shopify store finally looks like a brand.',
    name: 'Tabassum',
    tag: 'Lingerie brand, Shopify',
  },
  {
    quote:
      'When we expanded from Amazon to Walmart I expected to redo every single image. Same shoot, delivered in both specs — listings went live the same week.',
    name: 'Khushi',
    tag: 'Marketplace seller, Amazon & Walmart',
  },
];

// ── Single testimonial card ──────────────────────────────────────────────────
const Card = ({ item }: { item: Testimonial }) => (
  <figure
    className="flex flex-col gap-4 rounded-2xl p-6 h-full snap-start flex-shrink-0 w-[82%] sm:w-[60%] md:w-auto"
    style={{
      background: 'hsl(var(--card))',
      border: '1px solid hsl(var(--border))',
      boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
    }}
  >
    <Quote className="w-6 h-6 flex-shrink-0" strokeWidth={1.5} style={{ color: '#d4af37' }} />
    <blockquote className="text-sm md:text-[15px] leading-relaxed text-foreground/80 flex-1">
      {item.quote}
    </blockquote>
    <figcaption className="pt-1">
      <div className="text-sm font-semibold text-foreground">{item.name}</div>
      {/* Tag wraps rather than truncating — full category + marketplace stays visible */}
      <div className="text-xs text-muted-foreground mt-0.5 break-words">{item.tag}</div>
    </figcaption>
  </figure>
);

// ── Feature flag ──────────────────────────────────────────────────────────────
// Kept OFF until the owner has WhatsApp-approved each client's quote for public
// use (business prerequisite — see the site worklist). When disabled the export
// below renders nothing, so the section never mounts. Flip to `true` — and only
// that — to make the section go live; no `hidden` class stands in the way.
const TESTIMONIALS_ENABLED = false;

// ── Main section ──────────────────────────────────────────────────────────────
const TestimonialsSection = () => {
  const scrollToContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      className="py-20 md:py-28 px-4"
      style={{ background: 'hsl(var(--background))' }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold tracking-[0.2em] uppercase"
            style={{
              background: 'hsl(43 65% 52% / 0.1)',
              border: '1px solid hsl(43 65% 52% / 0.3)',
              color: '#b8922a',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            In their words
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            What sellers say
          </h2>
        </motion.div>

        {/* ── Cards: horizontal scroll on mobile, 3×2 grid from md up ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex gap-5 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:snap-none"
          style={{ scrollbarWidth: 'none' }}
        >
          {TESTIMONIALS.map(item => (
            <Card key={item.name} item={item} />
          ))}
        </motion.div>

        {/* ── Sub-line ── */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          Brand names withheld at our clients' request.
        </p>

        {/* ── CTA ── */}
        <div className="flex justify-center mt-10">
          <button
            onClick={scrollToContact}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: '#d4af37', color: '#000' }}
          >
            Book a free consultation
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
};

// ── Public export — gated by TESTIMONIALS_ENABLED ────────────────────────────
// When disabled, this renders nothing and TestimonialsSection never mounts.
const Testimonials = () => {
  if (!TESTIMONIALS_ENABLED) return null;
  return <TestimonialsSection />;
};

export default Testimonials;
