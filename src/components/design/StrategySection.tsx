import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Megaphone, Globe } from 'lucide-react';

const steps = [
  { icon: TrendingUp, num: '01', title: 'Sales Plan', desc: 'We audit your catalog, analyze competition & build a data-driven sales plan with realistic revenue targets and timelines.' },
  { icon: Megaphone, num: '02', title: 'Marketing Strategy', desc: "PPC campaigns, social media ads, influencer collaborations & deal strategies tailored to each platform's algorithm." },
  { icon: Globe, num: '03', title: 'Marketplace Expansion', desc: 'Once your core platforms are profitable, we expand to new domestic & international marketplaces for maximum reach.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const StrategySection = () => {
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
    <section className="py-20 px-4">
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
            Strategy
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mt-3 mb-3"
            style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}
          >
            Our <span style={{ color: accentBlue }}>Strategy</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: textMuted }}>
            A proven 3-phase approach to take your products from zero to profitable at scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i * 0.5}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="relative group rounded-2xl p-7 overflow-hidden"
                style={{ background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: isLight ? '0 2px 12px hsl(0 0% 0% / 0.05)' : '0 4px 20px hsl(220 30% 5% / 0.35)' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = isLight ? 'hsl(210 85% 55% / 0.35)' : 'hsl(210 85% 55% / 0.4)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = cardBorder;
                }}
              >
                {/* Ghost number */}
                <span
                  className="absolute top-3 right-4 text-6xl font-black select-none pointer-events-none"
                  style={{ color: isLight ? 'hsl(210 85% 55% / 0.06)' : 'hsl(210 85% 55% / 0.08)', lineHeight: 1 }}
                >
                  {s.num}
                </span>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={isLight ? { background: 'hsl(0 0% 92%)' } : { background: 'hsl(210 85% 55% / 0.12)', border: '1px solid hsl(210 85% 55% / 0.2)' }}
                >
                  <Icon className="w-6 h-6" style={{ color: accentBlue }} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}>{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: textMuted }}>{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StrategySection;
