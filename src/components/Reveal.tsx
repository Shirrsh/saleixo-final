/**
 * Reveal — fade-up enter animation wrapper.
 *
 * Uses framer-motion whileInView with an immediate-reveal safety net:
 * - If the element is already in/near the viewport at mount, it reveals
 *   immediately without waiting for the IntersectionObserver.
 * - A 1800ms fallback setTimeout ensures content is never left invisible
 *   due to observer misfires (fast scroll, network jank, etc.).
 */
import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds (default 0) */
  delay?: number;
  /** Y offset to fade up from (default 30) */
  y?: number;
}

const Reveal = ({ children, className = '', delay = 0, y = 30 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already in or near the viewport at mount — reveal immediately.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh && rect.bottom > 0) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } });
      return;
    }

    // Safety fallback: never leave content invisible after 1800ms.
    const fallback = setTimeout(() => {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } });
    }, 1800);

    return () => clearTimeout(fallback);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Normal in-view trigger via framer's useInView.
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } });
    }
  }, [inView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
