import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';

const FreeAuditCTA = () => {
  const [isLight, setIsLight] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'light';
    return !window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const sync = () => setIsLight(document.documentElement.classList.contains('light'));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const textPrimary = isLight ? '#0a0a0a' : '#ffffff';
  const textMuted = isLight ? 'hsl(0 0% 38%)' : 'hsl(215 20% 62%)';
  const accentBlue = isLight ? 'hsl(210 85% 45%)' : '#60a5fa';
  const borderColor = isLight ? 'hsl(0 0% 88%)' : 'hsl(215 40% 24% / 0.6)';

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl p-8 md:p-12 text-center overflow-hidden"
          style={{
            background: isLight ? 'hsl(210 85% 55% / 0.05)' : 'hsl(210 85% 55% / 0.09)',
            border: `1px solid ${isLight ? 'hsl(210 85% 55% / 0.3)' : 'hsl(210 85% 55% / 0.28)'}`,
            boxShadow: isLight ? '0 4px 32px hsl(210 85% 55% / 0.1)' : '0 8px 48px hsl(210 85% 55% / 0.14)',
          }}
        >
          {!isLight && (
            <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, hsl(210 85% 55% / 0.1) 0%, transparent 70%)' }} />
          )}
          <div className="relative z-10">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={isLight ? { background: 'hsl(210 85% 55% / 0.1)', border: '1px solid hsl(210 85% 55% / 0.25)' } : { background: 'hsl(210 85% 55% / 0.15)', border: '1px solid hsl(210 85% 55% / 0.3)' }}
            >
              <Search className="w-7 h-7" style={{ color: accentBlue }} strokeWidth={1.5} />
            </div>
            <h2
              className="font-extrabold tracking-tight mb-3"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', color: textPrimary }}
            >
              Get Your Free Seller Account Audit
            </h2>
            <p className="text-base max-w-xl mx-auto mb-7 leading-relaxed" style={{ color: textMuted }}>
              Our experts will analyze your listings, ads & account health — and show you exactly where you're losing sales.
            </p>
            <button
              onClick={() => { window.location.href = '/#contact'; }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-opacity duration-200"
              style={{ background: isLight ? '#0a0a0a' : '#ffffff', color: isLight ? '#ffffff' : '#0a0a0a' }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.82')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
            >
              Claim Free Audit
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeAuditCTA;
