import { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingCTA = () => {
  const [isVisible, setIsVisible]   = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setMenuOpen(document.body.style.overflow === 'hidden');
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.8;
      const contactTop = document.querySelector('#contact')?.getBoundingClientRect().top ?? Infinity;
      setIsVisible(scrollY > heroHeight && contactTop > 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || isDismissed || menuOpen) return null;

  return (
    <div
      className="fixed bottom-5 left-4 z-40 sm:bottom-36 sm:right-6 sm:left-auto max-w-[calc(100%-88px)] sm:max-w-none"
      style={{ animation: 'fadeIn 0.25s ease' }}
    >
      <div className="relative flex items-center gap-2 pl-4 pr-1.5 py-2 rounded-full border border-border/50 shadow-lg shadow-black/10 dark:shadow-black/40 backdrop-blur-md"
        style={{
          background: 'hsl(var(--foreground))',
        }}
      >
        <Link
          to="/get-started"
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap active:scale-[0.98] transition-transform"
          style={{ color: 'hsl(var(--background))' }}
        >
          Get a Free Quote
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
        </Link>

        <button
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss quote prompt"
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity duration-150 hover:opacity-75 active:scale-90"
          style={{ background: 'hsl(var(--background) / 0.15)' }}
        >
          <X size={12} style={{ color: 'hsl(var(--background))' }} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default FloatingCTA;
