import { Check, Star, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCurrency } from '@/contexts/CurrencyContext';
import { PACKAGES, getConvertedPrice, formatPrice, COUNTRIES } from '@/config/pricing';
import CurrencySelector from './CurrencySelector';

const Packages = () => {
  const { countryCode, countryName, loading } = useCurrency();
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES['IN'];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="packages" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Pricing & Packages
            </h2>
            <CurrencySelector />
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Detecting your location...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="outline" className="text-sm px-3 py-1">
                {currentCountry.flag} Pricing for {currentCountry.name}
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {currentCountry.currency}
              </Badge>
            </div>
          )}
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Choose the perfect package to launch your artisan business online
          </p>
          <p className="text-sm md:text-base text-amber-600 font-medium bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-full inline-block">
            *Early-bird offer valid for bookings before September 23, 2025
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {PACKAGES.map((pkg, index) => {
            const price = getConvertedPrice(pkg.basePrice, countryCode);
            const earlyBirdPrice = getConvertedPrice(pkg.basePrice * 0.8, countryCode);
            const regularPrice = getConvertedPrice(pkg.basePrice * 1.18, countryCode);
            
            return (
              <Card key={pkg.id} className={`relative card-sweep ${pkg.popular ? 'border-primary shadow-xl scale-105' : 'border-border'}`}>
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
                    <div className="text-2xl font-bold text-primary">{formatPrice(earlyBirdPrice, countryCode)}</div>
                    <div className="text-lg text-muted-foreground line-through">{formatPrice(regularPrice, countryCode)}</div>
                    <div className="text-sm text-amber-600 font-medium">–20% Early Bird</div>
                  </div>
                  <CardDescription className="text-sm">
                    {pkg.id === 'starter' && 'Perfect for new artisans getting started online'}
                    {pkg.id === 'growth' && 'For established artisans ready to scale'}
                    {pkg.id === 'enterprise' && 'Full-service package for international expansion'}
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
                    <p className="text-sm font-medium text-foreground">
                      {pkg.id === 'starter' && 'Full payment or 2 installments'}
                      {pkg.id === 'growth' && 'Full payment or up to 3 installments'}
                      {pkg.id === 'enterprise' && 'Flexible payment plans available'}
                    </p>
                  </div>
                  
                  <Button 
                    variant={pkg.popular ? "success" : "default"} 
                    className="w-full hover-lift min-h-[48px]" 
                    size="lg"
                    onClick={scrollToContact}
                    aria-label={`Select ${pkg.name} package`}
                  >
                    {pkg.id === 'growth' ? 'Most Popular' : pkg.id === 'enterprise' ? 'Go Enterprise' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
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