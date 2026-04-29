import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide when mobile nav menu is open
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
      const contactSection = document.querySelector('#contact');
      const contactTop = contactSection?.getBoundingClientRect().top || Infinity;

      // Show after scrolling past hero, hide when near contact section
      setIsVisible(scrollY > heroHeight && contactTop > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible || isDismissed || menuOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-40 animate-fade-in flex items-center gap-1">
      <Button
        onClick={scrollToContact}
        size="lg"
        className="glass-purple rounded-full px-6 gap-2 border-border-glow/40 hover:border-primary/60 hover:shadow-[0_0_32px_hsl(43_65%_52%/0.5)] transition-all duration-300 text-foreground"
      >
        <MessageCircle className="w-5 h-5 text-accent-violet" />
        <span className="hidden sm:inline">Get a Free Quote</span>
        <span className="sm:hidden">Quote</span>
      </Button>

      {/* Dismiss button */}
      <button
        onClick={() => setIsDismissed(true)}
        aria-label="Dismiss"
        className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95"
        style={{
          background: 'hsl(0 0% 20% / 0.7)',
          border: '1px solid hsl(0 0% 40% / 0.4)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <X size={12} style={{ color: 'hsl(0 0% 80%)' }} />
      </button>
    </div>
  );
};

export default FloatingCTA;
