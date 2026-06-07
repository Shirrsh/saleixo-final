import { useRef, useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';
import { MessageSquare, Map, Rocket, BarChart3, Check, Clock } from 'lucide-react';

const steps = [
  {
    id: 1, label: 'Audit', Icon: MessageSquare,
    color: '#3b82f6',
    title: 'Free Audit',
    subtitle: '30 min call',
    description: 'Send us your top 3 listings, your ad account, and last quarter\'s sales. We return a written diagnosis — what\'s leaking, what\'s working, what to fix first.',
    outcomes: [
      'Written diagnosis document (PDF)',
      'Top 3 conversion bottlenecks identified',
      'Competitor gap snapshot',
      'No obligation — yours to keep',
    ],
  },
  {
    id: 2, label: 'Scope', Icon: Map,
    color: '#10b981',
    title: 'Scope & Quote',
    subtitle: '1–2 business days',
    description: 'Fixed-price proposal with line-item deliverables and a confirmed delivery date. No surprises, no scope creep, no hourly billing.',
    outcomes: [
      'Itemised deliverable list',
      'Confirmed delivery date',
      'Fixed price — no hourly billing',
      'Change-order protection',
    ],
  },
  {
    id: 3, label: 'Production', Icon: Rocket,
    color: '#f97316',
    title: 'Production',
    subtitle: '14–21 days',
    description: 'Shoot, design, write, list. You review proofs at every milestone. Suppressed-listing fixes ship in 24–72 hours. Standard projects in 14–21 days.',
    outcomes: [
      'Proof review at every milestone',
      'Marketplace-compliant assets',
      'Rush delivery: 24–72hr available',
      '0 compliance rejections',
    ],
  },
  {
    id: 4, label: 'Launch', Icon: BarChart3,
    color: '#8b5cf6',
    title: 'Launch & Optimise',
    subtitle: '30-day watch',
    description: 'Listings go live, ads spin up, analytics activates. We watch the numbers for 30 days and tune until conversion stabilises.',
    outcomes: [
      '30-day analytics monitoring',
      'Ad spend tuning included',
      'Monthly performance report',
      'Ongoing retainer optional',
    ],
  },
];

const GOLD        = '#d4af37';
const GOLD_LIGHT  = 'rgba(212,175,55,0.12)';
const GOLD_BORDER = 'rgba(212,175,55,0.28)';

// ─── Main section ─────────────────────────────────────────────────────────────
const HowItWorks = () => {
  const containerRef              = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLight, setIsLight]     = useState(false);
  const touchStartX               = useRef<number | null>(null);

  useEffect(() => {
    const sync = () => setIsLight(document.documentElement.classList.contains('light'));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 20 });

  const stepRaw = useTransform(smooth, [0.12, 0.97], [0, steps.length - 0.01]);
  useMotionValueEvent(stepRaw, 'change', v =>
    setActiveIdx(Math.min(steps.length - 1, Math.max(0, Math.floor(v))))
  );

  const introOpacity = useTransform(smooth, [0, 0.06, 0.12], [1, 0.5, 0]);
  const mainOpacity  = useTransform(smooth, [0.08, 0.18], [0, 1]);

  const step        = steps[activeIdx];
  const ActiveIcon  = step.Icon;
  const accentColor = step.color;

  // Derived theme tokens
  const bg         = isLight ? '#f8f9fb' : 'hsl(220 30% 7%)';
  const cardBg     = isLight ? '#ffffff'  : 'hsl(220 28% 10%)';
  const borderClr  = isLight ? 'hsl(0 0% 90%)' : 'hsl(220 25% 18%)';
  const textPrimary  = isLight ? '#0a0a0a' : '#ffffff';
  const textMuted    = isLight ? 'hsl(0 0% 42%)' : 'hsl(215 20% 55%)';
  const sidebarBg    = isLight ? 'rgba(255,255,255,0.7)' : 'rgba(10,14,22,0.7)';

  // Mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40)
      setActiveIdx(i => Math.max(0, Math.min(steps.length - 1, i + (diff > 0 ? 1 : -1))));
    touchStartX.current = null;
  };

  return (
    <div ref={containerRef} id="how-it-works-section" className="relative" style={{ height: '420vh' }}>
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: bg }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Ambient glow — follows active step color */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: 1 }}
          style={{
            background: `radial-gradient(ellipse 55% 50% at 65% 50%, ${accentColor}10, transparent 70%)`,
            transition: 'background 0.6s ease',
          }}
        />

        {/* ── Intro overlay ── */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-6 text-center"
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.22em] uppercase mb-5"
            style={{ background: GOLD_LIGHT, border: `1px solid ${GOLD_BORDER}`, color: GOLD }}
          >
            Our Process
          </span>
          <h2
            className="font-bold tracking-tight mb-4"
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
              color: textPrimary,
              fontFamily: '"Inter Tight", Inter, sans-serif',
              lineHeight: 1.1,
            }}
          >
            Four steps.<br />
            <span style={{ color: GOLD }}>Honest pricing.</span> No surprises.
          </h2>
          <p style={{ color: textMuted, fontSize: '0.95rem', maxWidth: 500, lineHeight: 1.7 }}>
            Every engagement starts with a free audit. Most single-SKU projects finish in under 30 days.
          </p>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="flex flex-col items-center gap-1.5 mt-8"
          >
            <span style={{ fontSize: 9, color: textMuted, letterSpacing: '0.2em' }}>SCROLL</span>
            <div style={{ width: 1, height: 28, background: `linear-gradient(to bottom, ${GOLD_BORDER}, transparent)` }} />
          </motion.div>
        </motion.div>

        {/* ── Main layout ── */}
        <motion.div style={{ opacity: mainOpacity }} className="absolute inset-0 flex">

          {/* LEFT — step cards (desktop) */}
          <div
            className="hidden lg:flex flex-col justify-center gap-2"
            style={{
              width: 260,
              flexShrink: 0,
              padding: '0 20px 0 40px',
              borderRight: `1px solid ${borderClr}`,
            }}
          >
            <span style={{ fontSize: 9, color: GOLD, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 16, display: 'block' }}>
              How It Works
            </span>

            {steps.map((s, i) => {
              const isActive = i === activeIdx;
              const isDone   = i < activeIdx;
              const SIcon    = s.Icon;
              return (
                <motion.button
                  key={s.id}
                  onClick={() => setActiveIdx(i)}
                  animate={{
                    background: isActive ? `${s.color}12` : 'transparent',
                    borderColor: isActive ? `${s.color}40` : borderClr,
                    opacity: isDone ? 0.6 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 p-3 rounded-xl text-left w-full"
                  style={{ border: '1px solid', cursor: 'pointer' }}
                >
                  {/* Icon */}
                  <motion.div
                    animate={{ background: isActive ? `${s.color}20` : (isLight ? 'hsl(0 0% 94%)' : 'hsl(220 28% 16%)') }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    transition={{ duration: 0.3 }}
                  >
                    <SIcon
                      className="w-4 h-4"
                      style={{ color: isActive ? s.color : textMuted, strokeWidth: 1.5 }}
                    />
                  </motion.div>

                  {/* Label */}
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: 9, color: isActive ? s.color : textMuted, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 1 }}>
                      {String(s.id).padStart(2, '0')}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: isActive ? textPrimary : textMuted, fontWeight: isActive ? 600 : 400 }}>
                      {s.label}
                    </div>
                  </div>

                  {/* Done check */}
                  {isDone && (
                    <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GOLD }} strokeWidth={2.5} />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT — step detail */}
          <div
            className="flex-1 flex flex-col justify-center relative overflow-hidden"
            style={{ padding: '0 8% 0 6%' }}
          >
            {/* Ghost step number */}
            <AnimatePresence mode="wait">
              <motion.span
                key={`n-${activeIdx}`}
                className="absolute pointer-events-none select-none"
                style={{
                  right: '-0.04em',
                  top: '50%',
                  transform: 'translateY(-55%)',
                  fontSize: 'clamp(9rem, 22vw, 18rem)',
                  fontWeight: 800,
                  fontFamily: '"Inter Tight", Inter, sans-serif',
                  letterSpacing: '-0.05em',
                  color: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.03)',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.5 }}
              >
                {String(step.id).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>

            {/* Mobile step counter */}
            <p className="lg:hidden" style={{ fontSize: 9, color: GOLD, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 20 }}>
              Step {String(step.id).padStart(2, '0')} &nbsp;/&nbsp; 04
            </p>

            {/* Icon + duration badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`icon-${activeIdx}`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 mb-5"
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: `${accentColor}18`,
                    border: `1px solid ${accentColor}35`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 4px 20px ${accentColor}20`,
                  }}
                >
                  <ActiveIcon style={{ width: 20, height: 20, color: accentColor, strokeWidth: 1.5 }} />
                </div>

                {/* Duration badge */}
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold"
                  style={{
                    background: isLight ? 'hsl(0 0% 94%)' : 'hsl(220 28% 14%)',
                    border: `1px solid ${borderClr}`,
                    color: textMuted,
                  }}
                >
                  <Clock style={{ width: 10, height: 10, color: accentColor }} strokeWidth={2} />
                  {step.subtitle}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.h3
                key={`t-${activeIdx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  color: textPrimary,
                  lineHeight: 1.1,
                  letterSpacing: '-0.025em',
                  marginBottom: 12,
                  fontFamily: '"Inter Tight", Inter, sans-serif',
                  fontWeight: 700,
                }}
              >
                {step.title}
              </motion.h3>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`d-${activeIdx}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: '1rem', color: textMuted, lineHeight: 1.75, maxWidth: 400, marginBottom: 24 }}
              >
                {step.description}
              </motion.p>
            </AnimatePresence>

            {/* What you get */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`o-${activeIdx}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: 0.12 }}
                className="flex flex-col gap-2 mb-8"
                style={{ maxWidth: 380 }}
              >
                <p style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: accentColor, marginBottom: 4, fontWeight: 700 }}>
                  What you get
                </p>
                {step.outcomes.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    className="flex items-start gap-2.5"
                  >
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}30` }}
                    >
                      <Check style={{ width: 9, height: 9, color: accentColor, strokeWidth: 2.5 }} />
                    </div>
                    <span style={{ fontSize: '0.85rem', color: textMuted, lineHeight: 1.5 }}>{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Progress pills */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {steps.map((s, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  style={{ borderRadius: 999, height: 5, cursor: 'pointer', border: 'none', padding: 0 }}
                  animate={{
                    width: i === activeIdx ? 28 : 6,
                    background: i === activeIdx ? s.color : i < activeIdx ? `${s.color}50` : borderClr,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            {/* Mobile tap nav */}
            <div className="lg:hidden flex items-center gap-3 mt-5">
              <button
                type="button"
                onClick={() => setActiveIdx(i => Math.max(0, i - 1))}
                disabled={activeIdx === 0}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90 disabled:opacity-40"
                style={{ background: GOLD_LIGHT, border: `1px solid ${GOLD_BORDER}`, color: GOLD }}
              >
                ←
              </button>
              <span style={{ fontSize: 11, color: textMuted, letterSpacing: '0.15em' }}>Swipe or tap</span>
              <button
                type="button"
                onClick={() => setActiveIdx(i => Math.min(steps.length - 1, i + 1))}
                disabled={activeIdx === steps.length - 1}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90 disabled:opacity-40"
                style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}30`, color: accentColor }}
              >
                →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
