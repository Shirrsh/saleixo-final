import { CheckCircle, Clock, Zap, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WhyAlvaio = () => {
  const benefits = [
    {
      icon: <CheckCircle className="w-8 h-8 text-success" />,
      title: "Studio-Grade Quality, Startup-Friendly Pricing",
      description: "Professional results without the enterprise price tag. Quality that competes with the best, pricing that works for growing businesses."
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Alvaio?
          </h2>
          <p className="text-xl text-accent font-medium mb-2">
            From Lens to Launch – We handle everything: photography, design, and marketing.
          </p>
          <p className="text-lg text-muted-foreground">
            You just sit back & grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  {benefit.icon}
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAlvaio;