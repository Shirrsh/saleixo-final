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
    question: 'What types of products do you photograph?',
    answer: 'We photograph all types of ecommerce products — jewelry, fashion, home décor, electronics, food & beverage, beauty, spiritual products, and more. If it sells online, we shoot it.',
  },
  {
    id: '2',
    question: 'How long does a typical project take?',
    answer: 'Standard product photography is delivered within 24–48 hours. Full listing design and A+ content takes 3–5 business days. End-to-end marketplace setup is typically completed within 2 weeks.',
  },
  {
    id: '3',
    question: 'Which marketplaces do you support?',
    answer: 'We support Amazon, Flipkart, Etsy, Shopify, WooCommerce, Walmart, eBay, Meesho, and SHEIN — across US, UK, EU, Australia, Canada, and India markets.',
  },
  {
    id: '4',
    question: 'Do I need to send my products to your studio?',
    answer: 'Yes, for physical product photography we require samples to be shipped to our studio. We handle everything from there and return your products after the shoot. For digital design work, no physical samples are needed.',
  },
  {
    id: '5',
    question: 'What is included in the Free Brand Audit?',
    answer: 'Our free audit covers your current listing quality score, photography assessment, SEO keyword gaps, competitor benchmarking, and a prioritised action plan — all at no cost and with no obligation.',
  },
  {
    id: '6',
    question: 'Can you help with Amazon A+ Content and Brand Storefront?',
    answer: 'Absolutely. We create full A+ and A++ content modules, brand storefronts, and enhanced brand content that meets Amazon\'s latest guidelines and maximises conversion.',
  },
  {
    id: '7',
    question: 'What are your pricing models?',
    answer: 'We offer per-project pricing, monthly retainer packages, and custom enterprise plans. Pricing depends on product count, service scope, and marketplace targets. Book a free consultation for a tailored quote.',
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
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-accent-violet mb-4">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Frequently Asked Questions
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
                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
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
