import { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';
import { FileText, Search, UserCheck, Camera, Rocket, BarChart3 } from 'lucide-react';

const steps = [
  {
    id: 1, label: 'Requirements', Icon: FileText,
    title: 'Share Your Requirements',
    description: 'Tell us about your products, target marketplaces, and goals. We map out a custom strategy tailored to your brand.',
  },
  {
    id: 2, label: 'Free Audit', Icon: Search,
    title: 'Free Brand Audit',
    description: 'We analyse your current listings, photography, and market position — identifying exactly where revenue is being left on the table.',
  },
  {
    id: 3, label: 'Onboarding', Icon: UserCheck,
    title: 'Seamless Onboarding',
    description: 'We set up your accounts, collect product samples, and brief our studio team — zero friction, fully managed.',
  },
  {
    id: 4, label: 'Photography', Icon: Camera,
    title: 'Studio Shoot & Design',
    description: 'Professional product photography, A+ content, and listing design — all crafted to convert browsers into buyers.',
  },
  {
    id: 5, label: 'Launch', Icon: Rocket,
    title: 'Go Live Across Platforms',
    description: 'We publish optimised listings across Amazon, Flipkart, Etsy, Shopify and more — simultaneously, in every target market.',
  },
  {
    id: 6, label: 'Growth', Icon: BarChart3,
    title: 'Scale & Optimise',
    description: 'Ongoing analytics, ad management, and content refresh keep your sales climbing month after month.',
  },
];

// ─── Main section ─────────────────────────────────────────────────────────────
const HowItWorks = () => {
  const containerRef              = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

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

  return (
    <div ref={containerRef} className="relative" style={{ height: '580vh' }}>
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: '#0A0418' }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.1), transparent 70%)',
          }}
        />

        {/* ── Intro overlay ── */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none"
        >
          <h2
            className="font-light tracking-tight mb-3"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              color: '#ffffff',
              fontFamily: '"Inter Tight", Inter, sans-serif',
            }}
          >
            How It Works
          </h2>
          <p style={{ color: 'rgba(168,155,201,0.85)', fontSize: '0.95rem' }}>
            Six steps from first conversation to scaling sales
          </p>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="flex flex-col items-center gap-1.5 mt-7"
          >
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.2em' }}>
              SCROLL
            </span>
            <div
              style={{
                width: 1,
                height: 28,
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)',
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
              borderRight: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <span
              style={{
                fontSize: 9,
                color: 'rgba(124,58,237,0.75)',
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
                            ? '#7C3AED'
                            : isDone
                            ? 'rgba(124,58,237,0.45)'
                            : 'rgba(255,255,255,0.1)',
                          boxShadow: isActive
                            ? '0 0 12px rgba(124,58,237,0.9)'
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
                                ? 'linear-gradient(to bottom, rgba(124,58,237,0.5), rgba(124,58,237,0.12))'
                                : 'rgba(255,255,255,0.06)',
                          }}
                        />
                      )}
                    </div>

                    {/* Step label */}
                    <motion.div
                      animate={{ opacity: isActive ? 1 : isDone ? 0.5 : 0.28 }}
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
                          color: isActive
                            ? 'rgba(168,85,247,0.9)'
                            : 'rgba(255,255,255,0.25)',
                          marginBottom: 2,
                        }}
                      >
                        {String(step.id).padStart(2, '0')}
                      </span>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '0.8125rem',
                          color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
                          fontWeight: isActive ? 500 : 400,
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
                  color: 'rgba(124,58,237,0.07)',
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
                color: 'rgba(124,58,237,0.9)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              Step {String(steps[activeIdx].id).padStart(2, '0')} &nbsp;/&nbsp; 06
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
                  background: 'rgba(124,58,237,0.15)',
                  border: '1px solid rgba(124,58,237,0.3)',
                  boxShadow: '0 0 24px rgba(124,58,237,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                }}
              >
                <ActiveIcon
                  style={{ width: 20, height: 20, color: 'rgba(168,85,247,0.9)', strokeWidth: 1.5 }}
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
                  color: '#ffffff',
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
                  color: 'rgba(168,155,201,0.9)',
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
                        ? '#7C3AED'
                        : i < activeIdx
                        ? 'rgba(124,58,237,0.35)'
                        : 'rgba(255,255,255,0.12)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
