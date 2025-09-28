import { useEffect, useRef } from 'react';

const CursorFollower = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    
    if (!cursor || !trail) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      setTimeout(() => {
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
      }, 100);
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = '1';
      trail.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '0';
      trail.style.opacity = '0';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={trailRef}
        className="fixed w-8 h-8 bg-primary/20 rounded-full pointer-events-none z-[60] transition-all duration-300 ease-out transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ opacity: 0 }}
      />
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-[61] transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ opacity: 0 }}
      />
    </>
  );
};

export default CursorFollower;