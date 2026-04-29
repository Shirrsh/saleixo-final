import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Eye, BarChart3, Target } from 'lucide-react';

const metrics = [
  { icon: TrendingUp, value: '+250%', label: 'Lead Volume Growth' },
  { icon: BarChart3, value: '+122%', label: 'Organic Traffic Growth' },
  { icon: Eye, value: '70%', label: 'Brand Visibility Increase' },
  { icon: Target, value: '50%', label: 'Better ROAS' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const SocialMediaMarketing = () => {
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
  const cardBg = isLight ? '#ffffff' : 'hsl(220 28% 11%)';
  const cardBorder = isLight ? 'hsl(0 0% 88%)' : 'hsl(215 40% 22% / 0.6)';

  return (
    <section className="py-20 px-4" style={{ background: isLight ? 'hsl(0 0% 97%)' : 'hsl(220 28% 9%)' }}>
      <div className="container mx-auto max-w-5xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <span
            className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
            style={isLight ? { background: 'hsl(0 0% 92%)', border: '1px solid hsl(0 0% 82%)', color: 'hsl(0 0% 30%)' } : { background: 'hsl(210 85% 55% / 0.15)', border: '1px solid hsl(210 85% 55% / 0.3)', color: '#93c5fd' }}
          >
            Performance
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mt-3 mb-3"
            style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}
          >
            Marketing That <span style={{ color: accentBlue }}>Delivers</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: textMuted }}>
            Our performance marketing campaigns consistently beat industry benchmarks.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i * 0.4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl p-6 text-center"
                style={{ background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: isLight ? '0 2px 10px hsl(0 0% 0% / 0.05)' : '0 4px 16px hsl(220 30% 5% / 0.3)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={isLight ? { background: 'hsl(0 0% 92%)' } : { background: 'hsl(210 85% 55% / 0.12)', border: '1px solid hsl(210 85% 55% / 0.2)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: accentBlue }} strokeWidth={1.5} />
                </div>
                <div
                  className="text-3xl md:text-4xl font-extrabold mb-1"
                  style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: accentBlue }}
                >
                  {m.value}
                </div>
                <div className="text-xs font-medium leading-tight" style={{ color: textMuted }}>{m.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaMarketing;
