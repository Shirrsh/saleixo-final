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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`group card-sweep border-border animate-fade-in animate-delay-${(index + 1) * 100} hover:border-primary/20 transition-all duration-300`}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                  {service.icon}
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl mb-3 animate-scale-in animate-delay-300">{service.title}</CardTitle>
                <CardDescription className="text-sm sm:text-base leading-relaxed animate-fade-in animate-delay-400">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <ul className="space-y-2 sm:space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className={`flex items-start text-sm sm:text-base text-muted-foreground animate-slide-in-left animate-delay-${(i + 2) * 100}`}>
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center pt-2 sm:pt-4">
                  <Button 
                    variant={service.ctaVariant} 
                    size="lg" 
                    className="w-full hover-scale animate-scale-in animate-delay-500 min-h-[48px]"
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