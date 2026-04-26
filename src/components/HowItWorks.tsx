import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FileText, Search, UserCheck, Camera, Rocket, BarChart3 } from 'lucide-react';

const steps = [
  { id: 1, label: 'Requirements', icon: <FileText className="w-6 h-6" />, title: 'Share Your Requirements', description: 'Tell us about your products, target marketplaces, and goals. We map out a custom strategy tailored to your brand.', color: '#a3e635' },
  { id: 2, label: 'Free Audit',    icon: <Search className="w-6 h-6" />,   title: 'Free Brand Audit',         description: 'We analyse your current listings, photography, and market position — identifying exactly where revenue is being left on the table.', color: '#4ade80' },
  { id: 3, label: 'Onboarding',   icon: <UserCheck className="w-6 h-6" />, title: 'Seamless Onboarding',      description: 'We set up your accounts, collect product samples, and brief our studio team — zero friction, fully managed.', color: '#34d399' },
  { id: 4, label: 'Photography',  icon: <Camera className="w-6 h-6" />,    title: 'Studio Shoot & Design',    description: 'Professional product photography, A+ content, and listing design — all crafted to convert browsers into buyers.', color: '#a3e635' },
  { id: 5, label: 'Launch',       icon: <Rocket className="w-6 h-6" />,    title: 'Go Live Across Platforms', description: 'We publish optimised listings across Amazon, Flipkart, Etsy, Shopify and more — simultaneously, in every target market.', color: '#4ade80' },
  { id: 6, label: 'Growth',       icon: <BarChart3 className="w-6 h-6" />, title: 'Scale & Optimise',         description: 'Ongoing analytics, ad management, and content refresh keep your sales climbing month after month.', color: '#34d399' },
];

// 7 circles like the reference — scattered organically
const circles = [
  { cx: 50,  cy: 28,  r: 52 },  // top center
  { cx: 25,  cy: 48,  r: 44 },  // mid left
  { cx: 75,  cy: 48,  r: 44 },  // mid right
  { cx: 50,  cy: 52,  r: 40 },  // mid center (below top)
  { cx: 18,  cy: 68,  r: 38 },  // lower left
  { cx: 50,  cy: 72,  r: 38 },  // lower center
  { cx: 82,  cy: 68,  r: 38 },  // lower right
];

// Which step each circle belongs to (0-indexed, circle 0 = step 0, etc, last circle shared)
const circleStep = [0, 1, 2, 3, 3, 4, 5];

const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Active step index (0–5) derived from scroll
  const activeStep = useTransform(smoothProgress, [0, 1], [0, steps.length - 0.01]);

  return (
    <div ref={containerRef} style={{ height: `280vh` }} className="relative">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center bg-[hsl(160_60%_5%)]">

        {/* Background aura */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 30%, hsl(155 80% 30% / 0.18) 0%, transparent 70%)',
          }}
        />

        {/* Section title — fades out as scroll begins */}
        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0, 0.12], [1, 0]) }}
          className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none"
        >
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Six steps from first conversation to scaling sales
          </p>
          <motion.div
            className="mt-8 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Full-screen circle field */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-4xl mx-auto">
            {circles.map((c, i) => {
              const stepIdx = circleStep[i];
              const step = steps[stepIdx];

              // Each circle activates when scroll reaches its step
              const activateAt = stepIdx / steps.length;
              const fullyActiveAt = (stepIdx + 0.5) / steps.length;

              const circleProgress = useTransform(
                smoothProgress,
                [activateAt, fullyActiveAt],
                [0, 1]
              );

              const scale = useTransform(circleProgress, [0, 1], [0.6, 1]);
              const opacity = useTransform(circleProgress, [0, 1], [0.2, 1]);
              const borderOpacity = useTransform(circleProgress, [0, 1], [0.3, 1]);
              const glowSize = useTransform(circleProgress, [0, 1], [0, 30]);

              return (
                <motion.div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
                  style={{
                    left: `${c.cx}%`,
                    top: `${c.cy}%`,
                    width: c.r * 2,
                    height: c.r * 2,
                    scale,
                    opacity,
                  }}
                >
                  {/* Outer breathing ring */}
                  <motion.div
                    className="absolute rounded-full border"
                    style={{
                      width: c.r * 2.4,
                      height: c.r * 2.4,
                      borderColor: step.color,
                      opacity: useTransform(circleProgress, [0, 1], [0, 0.2]),
                    }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Main circle */}
                  <motion.div
                    className="w-full h-full rounded-full flex flex-col items-center justify-center relative"
                    style={{
                      border: `1.5px solid ${step.color}`,
                      borderOpacity,
                      background: useTransform(
                        circleProgress,
                        [0.5, 1],
                        ['hsl(158 55% 8% / 0)', 'hsl(158 55% 8% / 0.7)']
                      ),
                      boxShadow: useTransform(
                        glowSize,
                        (v) => `0 0 ${v}px ${step.color}66, 0 0 ${v * 2}px ${step.color}22`
                      ),
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    {/* Step number */}
                    <div
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-black"
                      style={{ background: step.color }}
                    >
                      {String(step.id).padStart(2, '0')}
                    </div>

                    {/* Icon */}
                    <motion.div
                      style={{ color: step.color, opacity: useTransform(circleProgress, [0.3, 1], [0, 1]) }}
                      className="mb-1 scale-75"
                    >
                      {step.icon}
                    </motion.div>

                    {/* Label */}
                    <motion.span
                      style={{ opacity: useTransform(circleProgress, [0.4, 1], [0, 1]), color: step.color }}
                      className="text-[9px] font-semibold tracking-wide uppercase text-center px-2 leading-tight"
                    >
                      {step.label}
                    </motion.span>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* SVG connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {[
                [50, 28, 25, 48],
                [50, 28, 75, 48],
                [25, 48, 18, 68],
                [25, 48, 50, 72],
                [75, 48, 50, 72],
                [75, 48, 82, 68],
                [50, 52, 50, 72],
              ].map(([x1, y1, x2, y2], i) => (
                <motion.line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="hsl(155 80% 35% / 0.2)"
                  strokeWidth="0.3"
                  strokeDasharray="1 1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Active step detail — bottom center */}
        <ActiveStepCard smoothProgress={smoothProgress} />
      </div>
    </div>
  );
};

// Separate component so hooks work cleanly
const ActiveStepCard = ({ smoothProgress }: { smoothProgress: ReturnType<typeof useSpring> }) => {
  const opacity = useTransform(smoothProgress, [0.08, 0.18], [0, 1]);
  const y = useTransform(smoothProgress, [0.08, 0.18], [30, 0]);

  // Which step is active
  const stepIndexRaw = useTransform(smoothProgress, [0, 1], [0, steps.length - 0.01]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-full max-w-lg px-4"
    >
      <ActiveStepInner stepIndexRaw={stepIndexRaw} />
    </motion.div>
  );
};

import { useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const ActiveStepInner = ({ stepIndexRaw }: { stepIndexRaw: ReturnType<typeof useTransform> }) => {
  const [idx, setIdx] = useState(0);

  useMotionValueEvent(stepIndexRaw, 'change', (v) => {
    setIdx(Math.min(steps.length - 1, Math.max(0, Math.floor(v))));
  });

  const step = steps[idx];

  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="glass-purple rounded-2xl px-6 py-5 border flex items-start gap-4"
      style={{ borderColor: `${step.color}40` }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: `${step.color}20`, color: step.color }}
      >
        {step.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: step.color }}>
          Step {String(step.id).padStart(2, '0')} · {step.label}
        </div>
        <div className="text-base font-medium text-white mb-1">{step.title}</div>
        <div className="text-xs text-muted-foreground leading-relaxed">{step.description}</div>
      </div>
      {/* Progress dots */}
      <div className="flex flex-col gap-1.5 flex-shrink-0 pt-1">
        {steps.map((s, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: 6,
              height: i === idx ? 18 : 6,
              background: i === idx ? step.color : 'hsl(158 40% 16%)',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default HowItWorks;
