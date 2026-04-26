import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

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

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-6 z-40 animate-fade-in">
      <Button
        onClick={scrollToContact}
        size="lg"
        className="glass-purple rounded-full px-6 gap-2 border-border-glow/40 hover:border-primary/60 hover:shadow-[0_0_32px_hsl(271_91%_65%/0.5)] transition-all duration-300 text-foreground"
      >
        <MessageCircle className="w-5 h-5 text-accent-violet" />
        <span className="hidden sm:inline">Get a Free Quote</span>
        <span className="sm:hidden">Quote</span>
      </Button>
    </div>
  );
};

export default FloatingCTA;
