import { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';
import { MessageSquare, Map, Rocket, BarChart3 } from 'lucide-react';

const steps = [
  {
    id: 1, label: 'Audit', Icon: MessageSquare,
    title: 'Free Audit (30 min)',
    description: 'Send us your top 3 listings, your ad account, and your sales last quarter. We come back with a written diagnosis: what\'s leaking, what\'s working, what to do first.',
  },
  {
    id: 2, label: 'Scope', Icon: Map,
    title: 'Scope & Quote',
    description: 'Fixed-price proposal with line-item deliverables and a delivery date. No surprises, no scope creep, no hourly billing.',
  },
  {
    id: 3, label: 'Production', Icon: Rocket,
    title: 'Production',
    description: 'Shoot, design, write, list. You see proofs at every milestone. Most projects ship in 14–21 days; suppressed-listing fixes ship in 24–72 hours.',
  },
  {
    id: 4, label: 'Launch', Icon: BarChart3,
    title: 'Launch & Optimize',
    description: 'Listings go live, ads spin up, analytics dashboard activates. We watch the numbers for the first 30 days and tune until conversion stabilizes.',
  },
];

// Brand tokens
const TEAL        = '#1a3a3a';
const TEAL_LIGHT  = 'rgba(26,58,58,0.08)';
const TEAL_MID    = 'rgba(26,58,58,0.18)';
const TEAL_BORDER = 'rgba(26,58,58,0.15)';
const GOLD        = '#d4af37';
const GOLD_LIGHT  = 'rgba(212,175,55,0.15)';
const GOLD_BORDER = 'rgba(212,175,55,0.35)';
const BG          = '#f5f7fa';
const BG_CARD     = '#ffffff';

// ─── Main section ─────────────────────────────────────────────────────────────
const HowItWorks = () => {
  const containerRef              = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const touchStartX               = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 20 });

  // Steps fill from 12 % → 97 % of total scroll
  const stepRaw = useTransform(smooth, [0.12, 0.97], [0, steps.length - 0.01]);
  useMotionValueEvent(stepRaw, 'change', v =>
    setActiveIdx(Math.min(steps.length - 1, Math.max(0, Math.floor(v))))
  );

  const introOpacity = useTransform(smooth, [0, 0.06, 0.12], [1, 0.5, 0]);
  const mainOpacity  = useTransform(smooth, [0.08, 0.18], [0, 1]);

  const ActiveIcon = steps[activeIdx].Icon;

  // Mobile swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      setActiveIdx(i => Math.max(0, Math.min(steps.length - 1, i + (diff > 0 ? 1 : -1))));
    }
    touchStartX.current = null;
  };

  return (
    <div ref={containerRef} className="relative" style={{ height: '420vh' }}>
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: BG }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Subtle radial tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.06), transparent 70%)',
          }}
        />

        {/* ── Intro overlay ── */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-6 text-center"
        >
          <p style={{ color: GOLD, fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Process
          </p>
          <h2
            className="font-light tracking-tight mb-3"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              color: TEAL,
              fontFamily: '"Inter Tight", Inter, sans-serif',
            }}
          >
            Four steps. Honest pricing. No surprises.
          </h2>
          <p style={{ color: 'rgba(26,58,58,0.65)', fontSize: '0.95rem', maxWidth: 520 }}>
            Most engagements start with the free audit and finish in under 30 days for a single SKU, or run as a 90-day growth retainer for established brands.
          </p>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="flex flex-col items-center gap-1.5 mt-7"
          >
            <span style={{ fontSize: 9, color: 'rgba(26,58,58,0.35)', letterSpacing: '0.2em' }}>
              SCROLL
            </span>
            <div
              style={{
                width: 1,
                height: 28,
                background: `linear-gradient(to bottom, ${TEAL_MID}, transparent)`,
              }}
            />
          </motion.div>
        </motion.div>

        {/* ── Main layout ── */}
        <motion.div style={{ opacity: mainOpacity }} className="absolute inset-0 flex">

          {/* LEFT — step index (desktop) */}
          <div
            className="hidden lg:flex flex-col justify-center"
            style={{
              width: 290,
              flexShrink: 0,
              padding: '0 36px 0 52px',
              borderRight: `1px solid ${TEAL_BORDER}`,
            }}
          >
            <span
              style={{
                fontSize: 9,
                color: GOLD,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 36,
              }}
            >
              How It Works
            </span>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {steps.map((step, i) => {
                const isActive = i === activeIdx;
                const isDone   = i < activeIdx;
                return (
                  <div
                    key={step.id}
                    style={{ display: 'flex', alignItems: 'stretch', gap: 14 }}
                  >
                    {/* Timeline spine */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: 14,
                        flexShrink: 0,
                      }}
                    >
                      <motion.div
                        animate={{
                          background: isActive
                            ? GOLD
                            : isDone
                            ? 'rgba(212,175,55,0.45)'
                            : TEAL_BORDER,
                          boxShadow: isActive
                            ? `0 0 12px rgba(212,175,55,0.7)`
                            : 'none',
                          scale: isActive ? 1.3 : 1,
                        }}
                        transition={{ duration: 0.35 }}
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          flexShrink: 0,
                          marginTop: 6,
                        }}
                      />
                      {i < steps.length - 1 && (
                        <div
                          style={{
                            flex: 1,
                            width: 1,
                            marginTop: 4,
                            background:
                              isDone || isActive
                                ? `linear-gradient(to bottom, rgba(212,175,55,0.5), rgba(212,175,55,0.1))`
                                : TEAL_BORDER,
                          }}
                        />
                      )}
                    </div>

                    {/* Step label */}
                    <motion.div
                      animate={{ opacity: isActive ? 1 : isDone ? 0.55 : 0.35 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        paddingTop: 2,
                        paddingBottom: i < steps.length - 1 ? 20 : 0,
                      }}
                    >
                      <span
                        style={{
                          display: 'block',
                          fontSize: 9,
                          letterSpacing: '0.15em',
                          color: isActive ? GOLD : 'rgba(26,58,58,0.4)',
                          marginBottom: 2,
                        }}
                      >
                        {String(step.id).padStart(2, '0')}
                      </span>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '0.8125rem',
                          color: isActive ? TEAL : 'rgba(26,58,58,0.5)',
                          fontWeight: isActive ? 600 : 400,
                          lineHeight: 1.3,
                        }}
                      >
                        {step.label}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — step detail */}
          <div
            className="flex-1 flex flex-col justify-center relative overflow-hidden"
            style={{ padding: '0 9% 0 7%' }}
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
                  fontSize: 'clamp(9rem, 23vw, 19rem)',
                  fontWeight: 800,
                  fontFamily: '"Inter Tight", Inter, sans-serif',
                  letterSpacing: '-0.05em',
                  color: 'rgba(26,58,58,0.04)',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.5 }}
              >
                {String(steps[activeIdx].id).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>

            {/* Mobile step counter */}
            <p
              className="lg:hidden"
              style={{
                fontSize: 9,
                color: GOLD,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              Step {String(steps[activeIdx].id).padStart(2, '0')} &nbsp;/&nbsp; 04
            </p>

            {/* Icon */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`icon-${activeIdx}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.35 }}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: GOLD_LIGHT,
                  border: `1px solid ${GOLD_BORDER}`,
                  boxShadow: '0 2px 16px rgba(212,175,55,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                }}
              >
                <ActiveIcon
                  style={{ width: 20, height: 20, color: GOLD, strokeWidth: 1.5 }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.h3
                key={`t-${activeIdx}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="font-light tracking-tight"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  color: TEAL,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: 20,
                  fontFamily: '"Inter Tight", Inter, sans-serif',
                  maxWidth: '14ch',
                }}
              >
                {steps[activeIdx].title}
              </motion.h3>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`d-${activeIdx}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: '1.05rem',
                  color: 'rgba(26,58,58,0.7)',
                  lineHeight: 1.75,
                  maxWidth: 430,
                  marginBottom: 36,
                }}
              >
                {steps[activeIdx].description}
              </motion.p>
            </AnimatePresence>

            {/* Progress pills */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {steps.map((_, i) => (
                <motion.div
                  key={i}
                  style={{ borderRadius: 999, height: 6 }}
                  animate={{
                    width: i === activeIdx ? 32 : 8,
                    background:
                      i === activeIdx
                        ? GOLD
                        : i < activeIdx
                        ? 'rgba(212,175,55,0.4)'
                        : TEAL_BORDER,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            {/* Mobile tap nav */}
            <div className="lg:hidden flex items-center gap-3 mt-5">
              <button
                onClick={() => setActiveIdx(i => Math.max(0, i - 1))}
                disabled={activeIdx === 0}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 disabled:opacity-30"
                style={{
                  background: GOLD_LIGHT,
                  border: `1px solid ${GOLD_BORDER}`,
                  color: GOLD,
                }}
              >
                ←
              </button>
              <span style={{ fontSize: 11, color: 'rgba(26,58,58,0.35)', letterSpacing: '0.15em' }}>
                Swipe or tap
              </span>
              <button
                onClick={() => setActiveIdx(i => Math.min(steps.length - 1, i + 1))}
                disabled={activeIdx === steps.length - 1}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 disabled:opacity-30"
                style={{
                  background: TEAL_LIGHT,
                  border: `1px solid ${TEAL_BORDER}`,
                  color: TEAL,
                }}
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
