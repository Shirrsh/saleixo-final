/**
 * Parallax — scroll-driven drift wrapper.
 *
 * Translates children vertically as the element moves through the viewport,
 * producing a gentle parallax effect. Respects prefers-reduced-motion via
 * framer-motion's useReducedMotion (renders a plain div instead).
 *
 * speed: positive values drift slower than scroll (background feel),
 * negative values drift against scroll (foreground feel). 0.1–0.3 is subtle.
 */
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxProps {
  children?: React.ReactNode;
  className?: string;
  /** Drift intensity. Total travel = speed × 200px across the viewport. */
  speed?: number;
  style?: React.CSSProperties;
  'aria-hidden'?: boolean;
}

const Parallax = ({ children, className = '', speed = 0.15, style, ...rest }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  if (reduced) {
    return (
      <div ref={ref} className={className} style={style} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y, willChange: 'transform' }} {...rest}>
      {children}
    </motion.div>
  );
};

/** Decorative soft gradient blob that drifts on scroll. aria-hidden, no pointer events. */
export const ParallaxBlob = ({
  className = '',
  speed = 0.35,
  size = 560,
  hue = '217 91% 52%',
  opacity = 0.07,
  style,
}: {
  className?: string;
  speed?: number;
  size?: number;
  /** HSL triple, e.g. '258 90% 66%' */
  hue?: string;
  opacity?: number;
  style?: React.CSSProperties;
}) => (
  <Parallax
    speed={speed}
    className={`absolute pointer-events-none ${className}`}
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, hsl(${hue} / ${opacity}) 0%, transparent 70%)`,
      filter: 'blur(60px)',
      zIndex: 0,
      ...style,
    }}
    aria-hidden="true"
  />
);

export default Parallax;
