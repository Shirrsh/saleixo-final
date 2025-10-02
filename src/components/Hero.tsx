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
    <section id="home" className="pt-24 md:pt-32 pb-16 md:pb-24 bg-gradient-to-br from-background to-secondary overflow-hidden relative min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16" ref={ref}>
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in leading-tight">
            From Lens to Launch –{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-pulse-glow block sm:inline">
              We Handle Everything
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-4xl mx-auto animate-fade-in animate-delay-200 leading-relaxed">
            Photography, design, and marketing solutions for modern brands. 
            You focus on your craft, we handle the growth.
          </p>

          {/* Contact CTAs */}
          <div className="mb-8 md:mb-10 animate-fade-in animate-delay-300">
            <p className="text-lg md:text-xl font-semibold text-foreground mb-4">
              Ready to Transform Your Brand?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="tel:+917011441159"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 min-h-[48px]"
                aria-label="Call us at +91 7011441159"
              >
                <span className="text-lg font-medium">📞 Call +91 7011441159</span>
              </a>
              <a 
                href="mailto:info@alvaio.com"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-success text-white rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 min-h-[48px]"
                aria-label="Email us at info@alvaio.com"
              >
                <span className="text-lg font-medium">✉️ Email Us</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animate-delay-400 mb-12 md:mb-20">
            <Button variant="success" size="lg" onClick={scrollToContact} className="hover-lift hover-glow min-h-[48px] px-8" aria-label="Book a consultation with Alvaio">
              Book a Consultation
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })} className="hover-scale min-h-[48px] px-8" aria-label="Explore our services">
              Explore Services
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
            <div className="animate-counter animate-delay-300 hover-scale group p-4 md:p-6 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2 animate-float group-hover:scale-110 transition-transform duration-300">
                {artisansCount}+
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">Artisans Helped</div>
            </div>
            <div className="animate-counter animate-delay-400 hover-scale group p-4 md:p-6 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-accent mb-2 animate-float group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: '1s' }}>
                {satisfactionCount}%
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">Satisfaction Rate</div>
            </div>
            <div className="animate-counter animate-delay-500 hover-scale group p-4 md:p-6 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-success mb-2 animate-float group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: '2s' }}>24h</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">Average Setup Time</div>
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