import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'saleixo_cookie_consent';

export type CookieConsent = 'all' | 'essential';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);

    const handler = () => setVisible(true);
    window.addEventListener('saleixo:open-cookie-settings', handler);
    return () => window.removeEventListener('saleixo:open-cookie-settings', handler);
  }, []);

  const save = (choice: CookieConsent) => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 32, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-6 md:bottom-6 md:max-w-sm"
        >
          <div
            className="rounded-2xl p-5 shadow-2xl"
            style={{
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Cookie className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-foreground">We use cookies</p>
              </div>
              <button
                onClick={() => save('essential')}
                aria-label="Dismiss — accept essential only"
                className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 -mt-0.5"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Body */}
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              We use essential cookies to keep the site running and optional analytics cookies to improve your experience.{' '}
              <a href="/cookies" className="underline underline-offset-2 hover:text-foreground transition-colors">
                Cookie Policy
              </a>
            </p>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => save('all')}
                className="flex-1 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:opacity-90"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
              >
                Accept All
              </button>
              <button
                onClick={() => save('essential')}
                className="flex-1 px-4 py-2 rounded-xl text-xs font-semibold border border-border text-foreground transition-all duration-200 hover:border-primary hover:text-primary"
              >
                Essential Only
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
