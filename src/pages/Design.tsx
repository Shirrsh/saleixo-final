import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ThemeToggle from '@/components/ThemeToggle';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Palette, Package, Share2, Smartphone, ShoppingBag, Layout, ChevronLeft, ChevronRight, Sparkles, Target, Lightbulb, CheckCircle2, Rocket } from 'lucide-react';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
const Design = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const designServices = [{
    icon: Palette,
    title: 'Logo & Brand Identity',
    description: 'Create memorable brand identities that stand out in the market and resonate with your audience.'
  }, {
    icon: Package,
    title: 'Packaging Design',
    description: 'Eye-catching packaging that tells your brand story and drives purchase decisions.'
  }, {
    icon: Share2,
    title: 'Social Media Graphics',
    description: 'Engaging visual content optimized for all social media platforms to boost engagement.'
  }, {
    icon: Smartphone,
    title: 'Marketing Collateral',
    description: 'Professional brochures, flyers, business cards, and marketing materials that convert.'
  }, {
    icon: ShoppingBag,
    title: 'E-commerce Design',
    description: 'Product banners, promotional graphics, and e-commerce assets that drive sales.'
  }, {
    icon: Layout,
    title: 'UI/UX Design',
    description: 'User-centered design concepts that enhance digital experiences and user satisfaction.'
  }];
  const designProcess = [{
    icon: Target,
    title: 'Discovery & Research',
    description: 'Understanding your brand, audience, and goals to create a strategic foundation.'
  }, {
    icon: Lightbulb,
    title: 'Concept Development',
    description: 'Brainstorming creative concepts and developing initial design directions.'
  }, {
    icon: Sparkles,
    title: 'Design & Refinement',
    description: 'Crafting detailed designs and refining based on feedback until perfect.'
  }, {
    icon: Rocket,
    title: 'Delivery & Support',
    description: 'Final delivery with all formats and ongoing support for implementation.'
  }];
  const portfolioItems = [{
    image: portfolio1,
    title: 'Brand Identity Design',
    description: 'Complete branding solutions for diverse industries'
  }, {
    image: portfolio2,
    title: 'Marketing & Packaging',
    description: 'Creative designs that drive engagement and sales'
  }, {
    image: portfolio3,
    title: 'Digital & Social Media',
    description: 'Eye-catching graphics for online platforms'
  }];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % portfolioItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % portfolioItems.length);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + portfolioItems.length) % portfolioItems.length);
  };
  const scrollToContact = () => {
    window.location.href = '/#contact';
  };
  return <>
      <ThemeToggle />
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background -z-10" />
          <div className="container mx-auto text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Design Excellence</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-fade-in">
              Creative Design Solutions That Elevate Brands
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in max-w-2xl mx-auto">
              Transforming ideas into stunning visual experiences for 20+ leading brands across industries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button size="lg" onClick={scrollToContact} className="hover-scale">
                Start Your Project
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('portfolio')?.scrollIntoView({
              behavior: 'smooth'
            })}>
                View Our Work
              </Button>
            </div>
          </div>
        </section>

        {/* Design Services */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Design Services</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Comprehensive design solutions tailored to your brand's unique needs
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {designServices.map((service, index) => <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <service.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Design Process */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Design Process</h2>
              <p className="text-muted-foreground text-lg">
                A proven methodology that delivers exceptional results
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {designProcess.map((step, index) => <div key={index} className="relative">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold shadow-lg">
                        {index + 1}
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 mt-2">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{step.description}</CardDescription>
                    </CardContent>
                  </Card>
                </div>)}
            </div>
          </div>
        </section>

        {/* Portfolio Gallery */}
        <section id="portfolio" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
              <p className="text-muted-foreground text-lg">
                Explore our portfolio of successful design projects
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="flex transition-transform duration-500 ease-in-out" style={{
              transform: `translateX(-${currentSlide * 100}%)`
            }}>
                {portfolioItems.map((item, index) => <div key={index} className="min-w-full relative">
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex items-end">
                        <div className="p-8 w-full">
                          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">{item.title}</h3>
                          <p className="text-muted-foreground text-lg">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
              
              {/* Navigation */}
              <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all shadow-lg hover:scale-110" aria-label="Previous slide">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all shadow-lg hover:scale-110" aria-label="Next slide">
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {portfolioItems.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'bg-primary w-8' : 'bg-muted-foreground/50'}`} aria-label={`Go to slide ${index + 1}`} />)}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Elevate Your Brand?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Get in touch to discuss your next design project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={scrollToContact} className="hover-scale">
                Start Your Project
              </Button>
              <a href="tel:+917011441159">
                <Button size="lg" variant="outline">
                  Call +91 7011441159
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </>;
};
export default Design;