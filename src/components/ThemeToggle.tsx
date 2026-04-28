import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true); // default dark

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved ? saved === 'dark' : prefersDark;
    setIsDark(dark);
    applyTheme(dark);
  }, []);

  const applyTheme = (dark: boolean) => {
    const html = document.documentElement;
    if (dark) {
      html.classList.remove('light');
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="fixed top-4 right-4 z-[60] w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        background: isDark
          ? 'hsl(220 28% 14% / 0.85)'
          : 'hsl(0 0% 100% / 0.9)',
        border: isDark
          ? '1px solid hsl(215 40% 30% / 0.6)'
          : '1px solid hsl(215 25% 80%)',
        backdropFilter: 'blur(12px)',
        boxShadow: isDark
          ? '0 0 16px hsl(210 85% 55% / 0.2), 0 2px 8px hsl(220 30% 5% / 0.4)'
          : '0 2px 12px hsl(215 25% 70% / 0.3)',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Sun className="w-4 h-4" style={{ color: '#93c5fd' }} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Moon className="w-4 h-4" style={{ color: 'hsl(220 30% 25%)' }} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
