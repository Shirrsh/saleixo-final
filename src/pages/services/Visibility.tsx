import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const features = [
  'Professional product photography (20-30 images)',
  'Website optimization for search engines',
  'Social media asset creation',
  'Basic brand positioning',
  'Initial consultation included',
  '1 revision round',
  'Email support included',
];

const outcomes = [
  '2-3x increase in online visibility',
  'Customers find you when searching',
  'Professional brand presence established',
  'Ready for growth',
  'Foundation for future expansion',
];

const W = 'px-6 md:px-12 lg:px-20 xl:px-28';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const Visibility = () => {
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
              <div className="absolute rounded-full" style={{ top: '-15%', left: '-8%', width: '550px', height: '550px', background: 'radial-gradient(circle, hsl(210 85% 55% / 0.3) 0%, transparent 70%)', filter: 'blur(70px)' }} />
            </div>
          )}
          {isLight && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute rounded-full" style={{ top: '-10%', right: '5%', width: '450px', height: '450px', background: 'radial-gradient(circle, hsl(210 85% 55% / 0.06) 0%, transparent 65%)', filter: 'blur(40px)' }} />
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
                style={isLight ? { background: 'hsl(0 0% 94%)', border: '1px solid hsl(0 0% 82%)', color: 'hsl(0 0% 25%)' } : { background: 'hsl(210 85% 55% / 0.15)', border: '1px solid hsl(210 85% 65% / 0.4)', color: '#93c5fd' }}
              >
                <Zap className="w-3 h-3" />
                Foundation Tier
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-extrabold leading-[1.04] tracking-tight mb-5"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: textPrimary }}
            >
              Get Found By Your{' '}
              <span style={{ color: accentBlue }}>Ideal Customers</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: textMuted }}
            >
              More visibility means more customers finding you. The Visibility tier gives you the professional foundation your brand needs to compete online.
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
              <h2 className="text-xl font-bold mb-5" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}>
                What You Get
              </h2>
              <ul className="space-y-3">
                {features.map((feature, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    custom={i * 0.5}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: isLight ? 'hsl(0 0% 22%)' : 'hsl(215 20% 78%)' }}
                  >
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accentBlue }} strokeWidth={2} />
                    <span>{feature}</span>
                  </motion.li>
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
                  Your Results After This Tier
                </h2>
                <ul className="space-y-3">
                  {outcomes.map((outcome, i) => (
                    <motion.li
                      key={i}
                      variants={fadeUp}
                      custom={i * 0.5}
                      className="flex items-start gap-3 text-sm font-medium"
                      style={{ color: isLight ? 'hsl(0 0% 15%)' : 'hsl(215 20% 85%)' }}
                    >
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accentBlue }} strokeWidth={2} />
                      <span>{outcome}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Who this is for */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-2xl p-8"
              style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
            >
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}>Who This Is For</h2>
              <p className="text-sm leading-relaxed" style={{ color: textMuted }}>
                E-commerce brands just going online or wanting to establish their presence for the first time. If you need a solid professional foundation before scaling, this is your starting point.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={3}
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
              <Link to="/services/professional" className="flex-1">
                <button
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200"
                  style={{ color: textMuted, border: `1.5px solid ${borderColor}` }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = textPrimary; el.style.borderColor = isLight ? '#0a0a0a' : '#ffffff'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = textMuted; el.style.borderColor = borderColor; }}
                >
                  Explore Professional Tier
                  <ArrowRight className="w-4 h-4" />
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

export default Visibility;
