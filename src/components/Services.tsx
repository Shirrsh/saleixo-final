import { Camera, ShoppingCart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      icon: <Camera className="w-12 h-12 text-primary" />,
      title: "📸 Product Photography & Styling",
      description: "Studio-grade quality photos that make your products stand out. From white-background shots to styled lifestyle photography.",
      features: [
        "Professional studio lighting setup",
        "Multiple angles & lifestyle shots", 
        "Advanced editing & retouching",
        "Fast 24-48hr turnaround"
      ],
      cta: "Book a Shoot",
      ctaVariant: "default" as const
    },
    {
      icon: <ShoppingCart className="w-12 h-12 text-accent" />,
      title: "🎨 Graphics & Creative Design", 
      description: "Eye-catching visuals that convert browsers into buyers. Logo design, packaging, social media graphics, and brand identity.",
      features: [
        "Logo & brand identity design",
        "Product packaging design",
        "Social media graphics",
        "Marketing collaterals"
      ],
      cta: "Get Designs",
      ctaVariant: "outline" as const
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-success" />,
      title: "📢 Digital Marketing",
      description: "Data-driven campaigns that grow your reach and sales. PPC ads, social media management, SEO optimization, and analytics.",
      features: [
        "Google & Facebook Ads (PPC)",
        "Social media management",
        "SEO & content marketing",
        "Performance tracking & analytics"
      ],
      cta: "Launch Ads",
      ctaVariant: "success" as const
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 animate-fade-in">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in animate-delay-200">
            Everything you need to transform your craft into a successful online business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`group hover:shadow-xl transition-all duration-500 border-border hover-lift animate-fade-in animate-delay-${(index + 1) * 100} hover:bg-gradient-to-br hover:from-background hover:to-secondary/20 hover:border-primary/20 cursor-pointer transform hover:-translate-y-2`}
              style={{ 
                transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                transition: 'all 0.3s ease-out'
              }}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg) translateZ(20px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
              }}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                  {service.icon}
                </div>
                <CardTitle className="text-xl animate-scale-in animate-delay-300">{service.title}</CardTitle>
                <CardDescription className="text-base animate-fade-in animate-delay-400">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className={`flex items-center text-muted-foreground animate-slide-in-left animate-delay-${(i + 2) * 100}`}>
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0 hover-glow"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-center pt-4">
                  <Button 
                    variant={service.ctaVariant} 
                    size="lg" 
                    className="w-full hover-scale animate-scale-in animate-delay-500"
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {service.cta}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;