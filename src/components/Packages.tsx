import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Packages = () => {
  const packages = [
    {
      name: "Starter",
      price: "$299",
      description: "Perfect for new artisans getting started online",
      features: [
        "10 professional product photos",
        "Basic e-commerce store setup",
        "Payment gateway integration",
        "Basic QR code menu",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Growth", 
      price: "$599",
      description: "For established artisans ready to scale",
      features: [
        "25 professional product photos",
        "Advanced e-commerce setup",
        "Social media integration",
        "Custom QR code solutions",
        "SEO optimization",
        "Priority support",
        "Analytics setup"
      ],
      popular: true
    },
    {
      name: "Export-Ready",
      price: "$999", 
      description: "Full-service package for international expansion",
      features: [
        "50 professional product photos",
        "Multi-platform store setup",
        "International shipping setup",
        "Advanced QR code system",
        "Marketing campaign setup",
        "Brand development",
        "Dedicated account manager",
        "Monthly strategy calls"
      ],
      popular: false
    }
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="packages" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Packages & Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect package to launch your artisan business online
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <Card key={index} className={`relative ${pkg.popular ? 'border-primary shadow-xl scale-105' : 'border-border'} transition-all duration-300 hover:shadow-lg`}>
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <div className="text-4xl font-bold text-primary my-4">{pkg.price}</div>
                <CardDescription className="text-base">
                  {pkg.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={pkg.popular ? "success" : "default"} 
                  className="w-full" 
                  size="lg"
                  onClick={scrollToContact}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Need something custom?</p>
          <Button variant="outline" size="lg" onClick={scrollToContact}>
            Request Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Packages;