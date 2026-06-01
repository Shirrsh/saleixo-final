import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-[62px] right-5 sm:right-6 z-40 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
      style={{
        width: 36,
        height: 36,
        background: 'hsl(var(--surface-elevated))',
        border: '1px solid hsl(var(--border))',
        boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
      }}
    >
      <ChevronUp className="w-4 h-4 text-muted-foreground" strokeWidth={2} />
    </button>
  );
};

export default ScrollToTop;
