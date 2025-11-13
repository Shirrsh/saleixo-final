import { CheckCircle, Clock, Zap, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WhyAlvaio = () => {
  const benefits = [
    {
      icon: <CheckCircle className="w-8 h-8 text-success" />,
      title: "Studio-Grade Quality, Exceptional Value",
      description: "Professional results that drive real business growth. Quality that competes with the best, with solutions customized to your goals."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Fast Turnaround, Zero Hassle",
      description: "From brief to delivery in 24-48 hours. Streamlined processes that respect your timeline and budget."
    },
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      title: "Creativity That Converts",
      description: "Beautiful visuals designed with sales in mind. Every image, every design element is crafted to drive engagement and conversions."
    },
    {
      icon: <Users className="w-8 h-8 text-success" />,
      title: "Trusted by Modern Brands",
      description: "From startups to established brands, we've helped 500+ businesses elevate their visual presence and boost sales."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 animate-fade-in">
            Why Alvaio?
          </h2>
          <div className="space-y-4 text-left md:text-center">
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in animate-delay-200 leading-relaxed">
              <strong className="text-foreground">Alvaio</strong> is a team of master photographers, editors & stylists, each bringing over <strong className="text-primary">two decades of specialized expertise</strong> in luxury product photography.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in animate-delay-300 leading-relaxed">
              Our international training from prestigious <strong className="text-accent">Australian universities</strong>, combined with extensive startup consulting experience, positions us as <strong className="text-foreground">India's premier digital photography studio</strong>.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in animate-delay-400 leading-relaxed">
              We've helped establish photography departments for major brands like <strong className="text-success">Pottery Barn, FNP, and Pepperfry</strong>, and continue to set industry standards through our innovative approach and meticulous attention to detail.
            </p>
          </div>
          <p className="text-xl text-accent font-medium mt-8 animate-fade-in animate-delay-500">
            From Lens to Launch – We handle everything: photography, design, and marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} className={`border-border hover:shadow-lg transition-all duration-500 hover-lift animate-scale-in animate-delay-${(index + 2) * 100} group`}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="group-hover:scale-110 transition-transform duration-300 animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl animate-slide-in-right animate-delay-400">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground animate-fade-in animate-delay-500">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAlvaio;