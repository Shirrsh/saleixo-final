import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageCircle, Check } from 'lucide-react';

const dynamicWords = [
  { word: 'More Sales',       color: '#d4af37' },
  { word: 'More Clicks',      color: '#4ade80' },
  { word: 'More Trust',       color: '#60a5fa' },
  { word: 'More Conversions', color: '#f472b6' },
  { word: 'More Revenue',     color: '#fb923c' },
];

const Contact = () => {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIdx(i => (i + 1) % dynamicWords.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const handleBookCall = () => {
    window.open('https://wa.me/919634355530?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20strategy%20call', '_blank');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919634355530', '_blank');
  };

  const current = dynamicWords[wordIdx];

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#060d0a' }}
    >
      {/* Background radial glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(26,74,58,0.45) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 py-20 text-center">

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div className="h-px w-8" style={{ background: '#d4af37' }} />
          <span
            className="text-xs font-bold tracking-[0.3em] uppercase"
            style={{ color: '#d4af37' }}
          >
            Let's find your bottleneck
          </span>
          <div className="h-px w-8" style={{ background: '#d4af37' }} />
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2
            className="font-extrabold tracking-tight leading-[1.1] mb-4"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              color: '#ffffff',
              fontFamily: '"Inter Tight", Inter, sans-serif',
            }}
          >
            Free audit. Honest answers.
          </h2>

          {/* Animated word */}
          <div
            className="relative flex items-center justify-center overflow-hidden mb-4"
            style={{ height: 'clamp(3rem, 7.5vw, 6.5rem)' }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ y: 60, opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: 0,  opacity: 1, filter: 'blur(0px)' }}
                exit={{   y: -60, opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute font-extrabold tracking-tight leading-none"
                style={{
                  fontSize: 'clamp(2.4rem, 6vw, 5rem)',
                  color: current.color,
                  fontFamily: '"Inter Tight", Inter, sans-serif',
                  textShadow: `0 0 40px ${current.color}55`,
                }}
              >
                {current.word}
              </motion.span>
            </AnimatePresence>
          </div>

          <h2
            className="font-extrabold tracking-tight leading-[1.1]"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              color: '#ffffff',
              fontFamily: '"Inter Tight", Inter, sans-serif',
            }}
          >
            Zero pressure.
          </h2>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 mb-8 mx-auto leading-relaxed"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '560px',
          }}
        >
          Send us your top three listings or your storefront URL. We'll come back inside 48 hours with a written diagnosis — what's leaking, what's working, and what we'd fix first. No deck. No sales call ambush.
        </motion.p>

        {/* Benefits row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-12"
        >
          {['No commitment required', '48hr written diagnosis', 'Keep the audit doc — free'].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#4ade80' }} />
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{item}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary */}
          <button
            onClick={handleBookCall}
            className="group relative flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-bold text-base transition-all duration-200 active:scale-95 overflow-hidden"
            style={{
              background: '#d4af37',
              color: '#0a0a0a',
              fontSize: '1rem',
              minWidth: '240px',
              boxShadow: '0 0 32px rgba(212,175,55,0.35)',
            }}
          >
            <span className="relative z-10">Send Me the Audit →</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            {/* Hover shimmer */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
            />
          </button>

          {/* Secondary */}
          <button
            onClick={handleWhatsApp}
            className="group flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-bold text-base transition-all duration-200 active:scale-95"
            style={{
              background: '#25d366',
              color: '#ffffff',
              fontSize: '1rem',
              minWidth: '220px',
              boxShadow: '0 0 24px rgba(37,211,102,0.3)',
            }}
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Us Directly
          </button>
        </motion.div>

        {/* Word cycle dots indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 mt-14"
        >
          {dynamicWords.map((w, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === wordIdx ? 24 : 6,
                background: i === wordIdx ? w.color : 'rgba(255,255,255,0.15)',
              }}
              transition={{ duration: 0.3 }}
              style={{ height: 6, borderRadius: 999 }}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
