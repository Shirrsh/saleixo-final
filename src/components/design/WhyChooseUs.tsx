import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Award, UserCheck, Target, Clock, MessageCircle, Headphones } from 'lucide-react';

const reasons = [
  { icon: Users, title: '500+ Clients', desc: 'Trusted by brands across India & globally' },
  { icon: TrendingUp, title: '91% Client Retention', desc: 'Clients stay because we deliver results' },
  { icon: Award, title: 'Amazon SPN Partner', desc: 'Certified Amazon Service Provider Network' },
  { icon: UserCheck, title: 'Expert Managers', desc: 'Category-specific marketplace specialists' },
  { icon: Target, title: 'Sales-First Focus', desc: 'Every strategy is tied to revenue growth' },
  { icon: Clock, title: '15+ Years Experience', desc: 'Deep ecommerce & digital marketing expertise' },
  { icon: MessageCircle, title: 'WhatsApp Support', desc: 'Real-time communication, no ticket queues' },
  { icon: Headphones, title: 'Dedicated Manager', desc: 'Single point of contact for your account' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

const WhyChooseUs = () => {
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
      <div className="container mx-auto max-w-6xl">
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
            Why Us
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mt-3 mb-3"
            style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}
          >
            Why <span style={{ color: accentBlue }}>Choose Us</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: textMuted }}>
            What sets us apart from other ecommerce service providers.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i * 0.4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                className="group rounded-2xl p-5 text-center"
                style={{ background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: isLight ? '0 2px 10px hsl(0 0% 0% / 0.05)' : '0 4px 16px hsl(220 30% 5% / 0.3)' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = isLight ? 'hsl(210 85% 55% / 0.35)' : 'hsl(210 85% 55% / 0.4)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = cardBorder;
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={isLight ? { background: 'hsl(0 0% 92%)' } : { background: 'hsl(210 85% 55% / 0.12)', border: '1px solid hsl(210 85% 55% / 0.2)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: accentBlue }} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-sm mb-1" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', color: textPrimary }}>{r.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: textMuted }}>{r.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
