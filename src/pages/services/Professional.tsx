import { useEffect, useState } from 'react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Camera, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const features = [
  'All from Visibility tier, PLUS:',
  'Advanced product photography (50-80 images with lifestyle shots)',
  'Complete website design + conversion optimization',
  'Competitor analysis & strategy',
  'Email capture system setup',
  'Monthly performance reports',
  '2 strategy calls per month (unlimited follow-up)',
  'Unlimited revisions',
  'Phone + email + WhatsApp support',
  '60-day results guarantee',
];

const outcomes = [
  'More qualified leads month-on-month',
  'Conversion rate improvement — clients typically move from sub-2% toward 3–4%',
  'Measurable revenue growth within 90 days',
  'Customer confidence builds as brand presentation improves',
  'Stronger market position as a premium choice',
  'Clear competitive differentiation through better photography and listings',
];

const W = 'px-6 md:px-12 lg:px-20 xl:px-28';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const Professional = () => {
  usePageMeta({
    title: 'Professional Plan — Growth Package | Saleixo',
    description: 'Advanced product photography, website design, competitor analysis, and monthly strategy calls. Saleixo Professional Plan for established sellers ready to scale.',
  });
  const [isLight, setIsLight] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    const sync = () => setIsLight(!document.documentElement.classList.contains('dark'));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const bg = isLight ? '#ffffff' : 'hsl(220 30% 7%)';
  const textPrimary = isLight ? '#0a0a0a' : '#ffffff';
  const textMuted = isLight ? 'hsl(0 0% 38%)' : 'hsl(215 20% 62%)';
  const accentBlue = isLight ? 'hsl(210 85% 45%)' : '#60a5fa';
  const borderColor = isLight ? 'hsl(0 0% 88%)' : 'hsl(215 40% 24% / 0.6)';
  const cardBg = isLight ? 'hsl(0 0% 97%)' : 'hsl(220 28% 11%)';
  const cardBorder = isLight ? 'hsl(0 0% 88%)' : 'hsl(215 40% 22% / 0.6)';

  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: bg }}>

        {/* ── Hero ── */}
        <section className={`relative pt-32 pb-20 ${W} overflow-hidden`}>
          {!isLight && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(215 45% 14%) 0%, hsl(220 35% 10%) 40%, hsl(222 30% 9%) 100%)' }} />
              <div className="absolute rounded-full" style={{ top: '-15%', left: '-8%', width: '600px', height: '600px', background: 'radial-gradient(circle, hsl(210 85% 55% / 0.32) 0%, transparent 70%)', filter: 'blur(70px)' }} />
              <div className="absolute rounded-full" style={{ bottom: '-10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, hsl(258 70% 55% / 0.18) 0%, transparent 65%)', filter: 'blur(60px)' }} />
            </div>
          )}
          {isLight && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute rounded-full" style={{ top: '-10%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, hsl(210 85% 55% / 0.06) 0%, transparent 65%)', filter: 'blur(40px)' }} />
            </div>
          )}

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-5"
            >
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase"
                style={isLight
                  ? { background: 'hsl(210 85% 55% / 0.1)', border: '1px solid hsl(210 85% 55% / 0.3)', color: 'hsl(210 85% 40%)' }
                  : { background: 'hsl(210 85% 55% / 0.18)', border: '1px solid hsl(210 85% 65% / 0.45)', color: '#93c5fd' }
                }
              >
                <Star className="w-3 h-3 fill-current" />
                Most Popular
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-extrabold leading-[1.04] tracking-tight mb-5"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)', color: textPrimary }}
            >
              Turn Traffic Into{' '}
              <span style={{ color: accentBlue }}>Paying Customers</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: textMuted }}
            >
              Most ecommerce listings convert at 1–2%. Our clients typically see 3–4% after photography and listing optimisation — all in one tier.
            </motion.p>
          </div>
        </section>

        {/* ── Content ── */}
        <section className={`pb-24 ${W}`}>
          <div className="max-w-3xl mx-auto space-y-6">

            {/* What You Get */}
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-2xl p-8"
              style={{ background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: isLight ? '0 2px 16px hsl(0 0% 0% / 0.06)' : '0 4px 24px hsl(220 30% 5% / 0.4)' }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={isLight ? { background: 'hsl(0 0% 92%)' } : { background: 'hsl(210 85% 55% / 0.12)', border: '1px solid hsl(210 85% 55% / 0.2)' }}>
                  <Camera className="w-4 h-4" style={{ color: accentBlue }} strokeWidth={1.5} />
                </div>
                <h2 className="text-xl font-bold" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}>
                  What You Get
                </h2>
              </div>
              <ul className="space-y-3">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: i === 0 ? accentBlue : (isLight ? 'hsl(0 0% 22%)' : 'hsl(215 20% 78%)'), fontWeight: i === 0 ? 600 : 400 }}>
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accentBlue }} strokeWidth={2} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Results */}
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative rounded-2xl p-8 overflow-hidden"
              style={{
                background: isLight ? 'hsl(210 85% 55% / 0.04)' : 'hsl(210 85% 55% / 0.07)',
                border: `1px solid ${isLight ? 'hsl(210 85% 55% / 0.3)' : 'hsl(210 85% 55% / 0.25)'}`,
                boxShadow: isLight ? '0 4px 24px hsl(210 85% 55% / 0.08)' : '0 4px 24px hsl(210 85% 55% / 0.1)',
              }}
            >
              {!isLight && <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, hsl(210 85% 55% / 0.06) 0%, transparent 70%)' }} />}
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-5" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}>
                  Your Results Within 6 Months
                </h2>
                <ul className="space-y-3">
                  {outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium" style={{ color: isLight ? 'hsl(0 0% 15%)' : 'hsl(215 20% 85%)' }}>
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accentBlue }} strokeWidth={2} />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Real Example */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-2xl p-8"
              style={{
                background: cardBg,
                border: `1px solid ${isLight ? 'hsl(210 85% 55% / 0.35)' : 'hsl(210 85% 55% / 0.3)'}`,
              }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}>Case Study</h2>
              <p className="text-sm font-semibold mb-3" style={{ color: isLight ? 'hsl(0 0% 15%)' : 'hsl(215 20% 85%)' }}>Fashion ecommerce brand — results after 6 months:</p>
              <ul className="space-y-2 text-sm mb-5" style={{ color: textMuted }}>
                <li><span className="font-semibold" style={{ color: textPrimary }}>Before:</span> 1.5% conversion rate, stagnant monthly sales</li>
                <li><span className="font-semibold" style={{ color: textPrimary }}>After:</span> 3.8% conversion rate, significant revenue growth</li>
                <li><span className="font-semibold" style={{ color: accentBlue }}>Key driver:</span> Photography refresh + full listing rewrite</li>
              </ul>
              <blockquote
                className="text-sm italic pl-4"
                style={{ borderLeft: `3px solid ${accentBlue}`, color: isLight ? 'hsl(0 0% 30%)' : 'hsl(215 20% 72%)' }}
              >
                "Best investment we made. ROI within 60 days."
              </blockquote>
            </motion.div>

            {/* Who this is for */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-2xl p-8"
              style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
            >
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}>Who This Is For</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: textMuted }}>
                Growing e-commerce brands that want to scale profitably without heavy spending on ads.
              </p>
              <ul className="space-y-1.5 text-sm" style={{ color: textMuted }}>
                {['Not entry-level (doesn\'t feel cheap)', 'Not enterprise (doesn\'t break budget)', 'Clear ROI (easy to justify spend)'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span style={{ color: accentBlue }}>·</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <button
                onClick={scrollToContact}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm transition-opacity duration-200"
                style={{ background: isLight ? '#0a0a0a' : '#ffffff', color: isLight ? '#ffffff' : '#0a0a0a' }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.82')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
              >
                Get Custom Quote
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link to="/services/visibility" className="flex-1">
                <button
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200"
                  style={{ color: textMuted, border: `1.5px solid ${borderColor}` }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = textPrimary; el.style.borderColor = isLight ? '#0a0a0a' : '#ffffff'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = textMuted; el.style.borderColor = borderColor; }}
                >
                  Compare to Visibility
                </button>
              </Link>
              <Link to="/services/enterprise" className="flex-1">
                <button
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200"
                  style={{ color: textMuted, border: `1.5px solid ${borderColor}` }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = textPrimary; el.style.borderColor = isLight ? '#0a0a0a' : '#ffffff'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = textMuted; el.style.borderColor = borderColor; }}
                >
                  Compare to Enterprise
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Professional;
