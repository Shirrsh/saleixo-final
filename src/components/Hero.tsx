import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

const Hero = () => {
  const [ref, isIntersecting] = useIntersectionObserver();
  const artisansCount = useAnimatedCounter(500, 2000, isIntersecting);
  const satisfactionCount = useAnimatedCounter(98, 2000, isIntersecting);
  
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-background to-secondary overflow-hidden relative">
      <div className="container mx-auto px-4 py-16" ref={ref}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            From Lens to Launch –{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-pulse-glow">
              We Handle Everything
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in animate-delay-200">
            Photography, design, and marketing solutions for modern brands. 
            You focus on your craft, we handle the growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animate-delay-400">
            <Button variant="success" size="lg" onClick={scrollToContact} className="hover-lift hover-glow">
              Book a Consultation
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })} className="hover-scale">
              Explore Services
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-counter animate-delay-300 hover-scale group">
              <div className="text-3xl font-bold text-primary mb-2 animate-float group-hover:scale-110 transition-transform duration-300">
                {artisansCount}+
              </div>
              <div className="text-muted-foreground">Artisans Helped</div>
            </div>
            <div className="animate-counter animate-delay-400 hover-scale group">
              <div className="text-3xl font-bold text-accent mb-2 animate-float group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: '1s' }}>
                {satisfactionCount}%
              </div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="animate-counter animate-delay-500 hover-scale group">
              <div className="text-3xl font-bold text-success mb-2 animate-float group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: '2s' }}>24h</div>
              <div className="text-muted-foreground">Average Setup Time</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-success/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Hero;