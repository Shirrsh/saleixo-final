import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Packages = () => {
  const packages = [
    {
      name: "Starter Pack",
      price: "₹19,000",
      earlyBirdPrice: "₹15,000",
      discount: "–20%",
      description: "Perfect for new artisans getting started online",
      features: [
        "Single-platform store creation & branding",
        "Catalog structure design",
        "Basic payment gateway integration",
        "Initial setup & configuration",
        "Email support"
      ],
      paymentOptions: "2× installments of ₹7,500",
      cta: "Get Started",
      popular: false
    },
    {
      name: "Growth Pack", 
      price: "₹79,000",
      earlyBirdPrice: "₹63,000",
      discount: "–20%",
      description: "For established artisans ready to scale",
      features: [
        "Multi-platform onboarding",
        "6-month account management & training",
        "Advanced e-commerce setup",
        "Social media integration",
        "SEO optimization",
        "Priority support",
        "Analytics setup"
      ],
      paymentOptions: "3× installments of ₹21,000",
      cta: "Most Popular",
      popular: true
    },
    {
      name: "Export-Ready",
      price: "₹1,99,000",
      earlyBirdPrice: "₹1,59,000",
      discount: "–20%",
      description: "Full-service package for international expansion",
      features: [
        "Support for 99–120 SKUs",
        "6–8 professional photos per SKU (studio + lifestyle)",
        "12-month account development: shop optimization",
        "Listing & SEO optimization",
        "Account health analysis & reporting",
        "Dedicated 12-month management & consulting"
      ],
      paymentOptions: "4× installments of ₹39,750",
      cta: "Go Export",
      popular: false
    },
    {
      name: "Custom Pack",
      price: "On Request",
      earlyBirdPrice: null,
      discount: null,
      description: "Bespoke e-commerce solutions for unique requirements",
      features: [
        "Additional platform integrations",
        "Advanced reporting & analytics",
        "Dedicated account management",
        "Custom workflow development",
        "Tailored solutions for your business"
      ],
      paymentOptions: "Flexible plans",
      cta: "Custom Quote",
      popular: false
    }
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="packages" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Pricing & Packages
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Choose the perfect package to launch your artisan business online
          </p>
          <p className="text-sm md:text-base text-amber-600 font-medium bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-full inline-block">
            *Early-bird offer valid for bookings before September 23, 2025
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <Card key={index} className={`relative card-sweep ${pkg.popular ? 'border-primary shadow-xl scale-105' : 'border-border'}`}>
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <div className="space-y-2 my-4">
                  {pkg.earlyBirdPrice ? (
                    <>
                      <div className="text-2xl font-bold text-primary">{pkg.earlyBirdPrice}</div>
                      <div className="text-lg text-muted-foreground line-through">{pkg.price}</div>
                      <div className="text-sm text-amber-600 font-medium">{pkg.discount}</div>
                    </>
                  ) : (
                    <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                  )}
                </div>
                <CardDescription className="text-sm">
                  {pkg.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-4 h-4 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="border-t pt-4">
                  <p className="text-xs text-muted-foreground mb-3">Payment Options:</p>
                  <p className="text-sm font-medium text-foreground">{pkg.paymentOptions}</p>
                </div>
                
                <Button 
                  variant={pkg.popular ? "success" : "default"} 
                  className="w-full hover-lift min-h-[48px]" 
                  size="lg"
                  onClick={scrollToContact}
                  aria-label={`Select ${pkg.name} package`}
                >
                  {pkg.cta}
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