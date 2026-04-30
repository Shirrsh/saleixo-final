/**
 * Reveal - framer-motion whileInView fade-up wrapper.
 * Wraps any section content for consistent enter animations.
 */
import { motion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds (default 0) */
  delay?: number;
  /** Y offset to fade up from (default 30) */
  y?: number;
}

const Reveal = ({ children, className = '', delay = 0, y = 30 }: RevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default Reveal;
