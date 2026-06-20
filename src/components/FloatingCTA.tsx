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
      className="fixed bottom-36 right-5 sm:right-6 z-40"
      style={{ animation: 'fadeIn 0.25s ease' }}
    >
      <div className="relative flex items-center gap-2 pl-4 pr-2 py-2 rounded-full"
        style={{
          background: 'hsl(var(--foreground))',
          boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
        }}
      >
        <Link
          to="/get-started"
          className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap"
          style={{ color: 'hsl(var(--background))' }}
        >
          Get a Free Quote
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
        </Link>

        <button
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss"
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity duration-150 hover:opacity-70 active:scale-90"
          style={{ background: 'hsl(var(--background) / 0.15)' }}
        >
          <X size={12} style={{ color: 'hsl(var(--background))' }} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default FloatingCTA;
