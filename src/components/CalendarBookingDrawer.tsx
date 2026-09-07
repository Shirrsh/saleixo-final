import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Video, Clock, MessageCircle, ShieldCheck } from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/sshirrsh/new-meeting?hide_gdpr_banner=1&primary_color=2563eb';

export default function CalendarBookingDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-calendar-booking', handleOpen);

    // Escape key closes modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-calendar-booking', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Inject Calendly script on open
  useEffect(() => {
    if (!isOpen) return;

    const id = 'calendly-widget-script';
    if (!document.getElementById(id)) {
      const script = document.createElement('script');
      script.id = id;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl max-h-[92vh] bg-card rounded-2xl sm:rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-border bg-muted/40 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary border border-primary/20">
                    <Video className="w-3 h-3" /> Google Meet / Zoom
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
                    <Clock className="w-3 h-3 text-emerald-500" /> 15-Minute Strategy Call
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  Book Your 1-on-1 Marketplace Strategy Session
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Direct call with our lead ecommerce architect. We'll diagnose your listings, images, and ad bottlenecks.
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close booking modal"
                className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Calendly Inline Widget Container */}
            <div className="flex-1 overflow-y-auto p-1 sm:p-2 bg-background relative min-h-[550px]">
              <div
                className="calendly-inline-widget w-full h-[580px] sm:h-[620px] rounded-xl overflow-hidden"
                data-url={CALENDLY_URL}
              />
            </div>

            {/* Footer trust strip & WhatsApp fallback */}
            <div className="p-3 sm:p-4 border-t border-border bg-muted/30 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Zero sales pressure · 100% actionable diagnostic plan</span>
              </div>
              <a
                href="https://wa.me/917011441159?text=Hi%2C%20we%20would%20like%20to%20schedule%20a%20strategy%20call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Prefer WhatsApp? Chat instantly →
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
