import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Digital Transformation &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Photography Services
            </span>{' '}
            for Artisans
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transform your handcrafted products into a thriving online business. 
            Professional photography, e-commerce setup, and digital marketing tailored for artisans.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" onClick={scrollToContact}>
              Get Your QR Code
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Services
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Artisans Helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">98%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success">24h</div>
              <div className="text-muted-foreground">Average Setup Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;