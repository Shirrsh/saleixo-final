import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { useSiteImages } from '@/hooks/useSiteImages';
import { useHomepageContent } from '@/hooks/useHomepageContent';

// Fallback images
import showcase1Fallback from '@/assets/hero/showcase-1.jpg';
import showcase2Fallback from '@/assets/hero/showcase-2.jpg';
import showcase3Fallback from '@/assets/hero/showcase-3.jpg';
import showcase4Fallback from '@/assets/hero/showcase-4.jpg';

const Hero = () => {
  const [ref, isIntersecting] = useIntersectionObserver();
  const artisansCount = useAnimatedCounter(500, 2000, isIntersecting);
  const satisfactionCount = useAnimatedCounter(98, 2000, isIntersecting);
  const { getImageUrl, getAltText } = useSiteImages('hero');
  const { content } = useHomepageContent();

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  // Get images with fallbacks
  const showcase1 = getImageUrl('hero_showcase_1', showcase1Fallback);
  const showcase2 = getImageUrl('hero_showcase_2', showcase2Fallback);
  const showcase3 = getImageUrl('hero_showcase_3', showcase3Fallback);
  const showcase4 = getImageUrl('hero_showcase_4', showcase4Fallback);

  return (
    <section id="home" className="pt-24 md:pt-32 pb-16 md:pb-24 bg-background overflow-hidden relative min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          
          {/* Left Column - Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in leading-tight">
              {content.hero_title.includes('Market-Winning') ? (
                <>
                  Transform Your Brand Into{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-pulse-glow">
                    Market-Winning Brands
                  </span>
                </>
              ) : (
                content.hero_title
              )}
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 animate-fade-in animate-delay-200 leading-relaxed">
              {content.hero_subtitle}
            </p>

            {/* Trust Signal */}
            <p className="text-base md:text-lg text-muted-foreground mb-6 animate-fade-in animate-delay-300 font-medium">
              Join 500+ successful brands
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-fade-in animate-delay-400 mb-8">
              <Button variant="default" size="lg" onClick={scrollToContact} className="hover-lift hover-glow min-h-[56px] px-8 text-lg" aria-label={content.hero_cta_text}>
                {content.hero_cta_text}
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.querySelector('#services')?.scrollIntoView({
              behavior: 'smooth'
            })} className="hover-scale min-h-[56px] px-8 text-lg" aria-label="View our work">
                View Our Work
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 mt-12 animate-fade-in animate-delay-600">
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">
                  {artisansCount}+
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">Brands Helped</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-1">
                  {satisfactionCount}%
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">Success Rate</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-success mb-1">24h</div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">Setup Time</div>
              </div>
            </div>
          </div>

          {/* Right Column - Portfolio Showcase */}
          <div className="order-1 lg:order-2 animate-fade-in animate-delay-300">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="group relative overflow-hidden rounded-2xl shadow-xl hover-lift aspect-square">
                <img 
                  src={showcase1} 
                  alt={getAltText('hero_showcase_1', 'Professional product photography showcase')} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  loading="eager" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl shadow-xl hover-lift aspect-square mt-8">
                <img 
                  src={showcase2} 
                  alt={getAltText('hero_showcase_2', 'Brand design and packaging showcase')} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  loading="eager" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl shadow-xl hover-lift aspect-square -mt-8">
                <img 
                  src={showcase3} 
                  alt={getAltText('hero_showcase_3', 'Lifestyle photography showcase')} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  loading="eager" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl shadow-xl hover-lift aspect-square">
                <img 
                  src={showcase4} 
                  alt={getAltText('hero_showcase_4', 'Marketing content creation showcase')} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  loading="eager" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Subtle Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float" style={{
      animationDelay: '0s'
    }}></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-float" style={{
      animationDelay: '2s'
    }}></div>
    </section>
  );
};

export default Hero;