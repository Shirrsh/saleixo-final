import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SaleixoLogo from '@/components/SaleixoLogo';

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
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <SaleixoLogo size="text-5xl md:text-7xl" glow={true} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
