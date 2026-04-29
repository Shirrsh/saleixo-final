import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
    answer: 'A standard new-SKU launch — photography, listing copy, A+ content, ads setup — takes 14–21 days from kickoff. A multi-SKU brand launch with storefront is 4–6 weeks. Suppressed-listing recovery is 24–72 hours in 90% of cases.',
  },
  {
    id: '2',
    question: 'What does the free audit actually include?',
    answer: 'A 30-minute call plus a written 1–2 page diagnosis. We review up to 3 of your live listings, your ad account, your last 90 days of sales data, and identify the top 3 conversion bottlenecks. You keep the document whether you hire us or not.',
  },
  {
    id: '3',
    question: 'How much does a product photoshoot cost?',
    answer: 'Standard catalog shoots start at a flat rate per SKU and scale with set complexity (lifestyle, on-model, video). We quote project-priced, never hourly. Most shoots fall between $40–$120 per SKU depending on category and shot count.',
  },
  {
    id: '4',
    question: 'We sell on Amazon. Will your photos pass Amazon\'s rules?',
    answer: 'Yes — every main image is shot on RGB 255,255,255, framed to 85% product fill, delivered at 2000px+ for zoom. We\'ve never had a Saleixo-shot main image rejected for compliance.',
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
    question: 'What if my listing gets suppressed after you fix it?',
    answer: 'We monitor for the first 30 days post-launch. If a listing is suppressed in that window for any reason within our scope, we fix it free.',
  },
  {
    id: '9',
    question: 'How do I send you my products?',
    answer: 'We have a primary studio and partner studios across the US, UK, and India. You ship products to the closest studio; we cover return shipping after the shoot.',
  },
  {
    id: '10',
    question: 'What does success look like in 90 days?',
    answer: 'For a stuck listing: typically 2–4× session volume and a 1.5–3× conversion lift, which compounds to 3–6× revenue. For a new launch: profitable PPC by day 60, organic ranking on at least 3 priority keywords by day 90.',
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
    <section className="py-20 md:py-28 bg-transparent">
      <div className="container mx-auto px-4 max-w-3xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-accent-violet mb-4">Questions sellers actually ask</p>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Real answers, no fluff.
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div
                  className="rounded-2xl border transition-all duration-300 overflow-hidden"
                  style={{
                    background: isOpen
                      ? 'hsl(174 37% 16% / 0.8)'
                      : 'hsl(174 37% 16% / 0.4)',
                    borderColor: isOpen
                      ? 'hsl(43 65% 52% / 0.35)'
                      : 'hsl(174 30% 22% / 0.5)',
                    boxShadow: isOpen
                      ? '0 0 30px hsl(43 65% 52% / 0.08)'
                      : 'none',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Question row */}
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full flex items-center justify-between px-5 py-5 text-left group"
                    style={{ minHeight: '60px' }}
                  >
                    <span
                      className="text-base font-medium pr-4 transition-colors duration-200"
                      style={{ color: isOpen ? '#ffffff' : 'hsl(0 0% 90%)' }}
                    >
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200"
                      style={{
                        background: isOpen
                          ? 'hsl(43 65% 52% / 0.15)'
                          : 'hsl(174 30% 22% / 0.6)',
                        border: `1px solid ${isOpen ? 'hsl(43 65% 52% / 0.4)' : 'hsl(174 30% 22%)'}`,
                      }}
                    >
                      {isOpen
                        ? <X className="w-3.5 h-3.5 text-accent-violet" />
                        : <Plus className="w-3.5 h-3.5 text-muted-foreground" />
                      }
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-6 pb-6">
                          <div
                            className="w-full h-px mb-4"
                            style={{ background: 'hsl(43 65% 52% / 0.15)' }}
                          />
                          <p className="text-muted-foreground leading-relaxed">
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
