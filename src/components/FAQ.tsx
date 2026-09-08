import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const fallbackFaqs: FaqItem[] = [
  {
    id: '1',
    question: 'How long does a full listing setup take?',
    answer: 'A standard new-SKU launch — photography, listing copy, A+ content, ads setup — takes 14–21 days from kickoff. A multi-SKU brand launch with storefront is 4–6 weeks. Suppressed-listing recovery typically takes 24–72 hours.',
  },
  {
    id: '2',
    question: 'What does the free audit actually include?',
    answer: 'A 30-minute call plus a written 1–2 page diagnosis. We review up to 3 of your live listings, your ad account, your last 90 days of sales data, and identify the top 3 conversion bottlenecks. You keep the document whether you hire us or not.',
  },
  {
    id: '3',
    question: 'How much does a product photoshoot cost?',
    answer: 'Standard catalog shoots start at a transparent flat rate per SKU and scale with set complexity (pure white, lifestyle, on-model, 3D, video). We quote project-priced, never hourly. Complete per-SKU rate cards and volume discounts are accessible directly on our pricing page.',
  },
  {
    id: '4',
    question: 'We sell on Amazon. Will your photos pass Amazon\'s rules?',
    answer: 'Yes — every main image is shot on RGB 255,255,255, framed to 85% product fill, delivered at 2000px+ for zoom. Each shoot is checked against Amazon\'s current image requirements before delivery.',
  },
  {
    id: '5',
    question: 'Do you work with Etsy and handcraft sellers?',
    answer: 'Yes — that\'s actually a meaningful share of our portfolio. Etsy is a different game (lifestyle-first, warm backgrounds, the buyer wants to see the maker). We shoot Etsy sets explicitly for that aesthetic.',
  },
  {
    id: '6',
    question: 'Can you launch a brand from scratch?',
    answer: 'Yes. Logo + packaging + photography + listing + storefront on Amazon, Etsy, and Shopify is our most-requested package. Typical timeline: 4–6 weeks from kickoff to first sale.',
  },
  {
    id: '7',
    question: 'Do you manage ads, or just create the assets?',
    answer: 'Both. We run Amazon Sponsored Products / Brands / Display, Google Shopping, Meta Ads, and TikTok Shop ads. Ads management is a separate retainer; you can hire us for assets only and run ads yourself.',
  },
  {
    id: '8',
    question: 'What if our listing gets suppressed after you fix it?',
    answer: 'We monitor for the first 30 days post-launch. If a listing is suppressed in that window for any reason within our scope, we fix it free.',
  },
  {
    id: '9',
    question: 'How do we send you our products?',
    answer: 'We have a primary studio and partner studios across the US, UK, and India. You ship products to the closest studio; we cover return shipping after the shoot.',
  },
  {
    id: '10',
    question: 'What does success look like in 90 days?',
    answer: 'For a stuck listing: clients typically see meaningful gains in session volume and conversion rate within 90 days — the exact lift depends on category, competition, and how far off the listing was at the start. For a new launch: our target is profitable PPC by day 60 and organic ranking on priority keywords by day 90.',
  },
];

const FAQ = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>(fallbackFaqs);
  const [openId, setOpenId] = useState<string | null>('1'); // first open by default

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const { data, error } = await supabase
          .from('faq_items')
          .select('id, question, answer, category')
          .eq('is_active', true)
          .order('created_at', { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) setFaqs(data);
      } catch {
        // keep fallback
      }
    };
    fetchFaqs();
  }, []);

  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id);

  return (
    <section id="faq" className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-primary mb-3">
            Questions sellers actually ask
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-[1.12]"
            style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
          >
            Real answers, no fluff.
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto mt-3 leading-relaxed">
            Everything you need to know about timelines, deliverables, and how we work with brands.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <div
                  className={cn(
                    'rounded-2xl border transition-all duration-200 overflow-hidden',
                    isOpen
                      ? 'border-primary/40 bg-card shadow-sm shadow-primary/5'
                      : 'border-border/60 bg-card/60 hover:border-border'
                  )}
                >
                  {/* Question row */}
                  <button
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl cursor-pointer"
                    style={{ minHeight: '56px' }}
                  >
                    <span
                      className={cn(
                        'text-sm sm:text-base font-medium pr-4 transition-colors duration-200 leading-snug',
                        isOpen ? 'text-foreground font-semibold' : 'text-foreground/90 group-hover:text-primary'
                      )}
                    >
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.22 }}
                      className={cn(
                        'flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors duration-200',
                        isOpen
                          ? 'bg-primary/15 text-primary border border-primary/30'
                          : 'bg-surface-elevated text-muted-foreground border border-border group-hover:text-foreground group-hover:border-primary/40'
                      )}
                    >
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2} />
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                          <div className="w-full h-px mb-3.5 bg-border/60" />
                          <p className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
