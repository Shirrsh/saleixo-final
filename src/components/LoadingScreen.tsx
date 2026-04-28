import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Exit after 700ms — just enough to feel intentional, not slow
    const t = setTimeout(() => setVisible(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: 'hsl(220 30% 7%)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold tracking-tight select-none"
            style={{
              fontFamily: '"Inter Tight", Inter, sans-serif',
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              color: '#ffffff',
              letterSpacing: '-0.03em',
            }}
          >
            saleixo
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
