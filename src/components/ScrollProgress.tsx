import { useEffect, useRef } from 'react';

const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let rafId = 0;
    let maxHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    const measure = () => {
      maxHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    const update = () => {
      rafId = 0;
      const ratio = Math.min(1, Math.max(0, window.scrollY / maxHeight));
      bar.style.transform = `scaleX(${ratio})`;
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    };

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(document.documentElement);
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro?.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="scroll-progress fixed top-0 left-0 w-full h-1 bg-secondary/20 z-50 pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-primary to-accent origin-left"
        style={{ transform: 'scaleX(0)', willChange: 'transform' }}
      />
    </div>
  );
};

export default ScrollProgress;