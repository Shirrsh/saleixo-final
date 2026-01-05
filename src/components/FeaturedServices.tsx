import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Camera, ShoppingCart, Check } from 'lucide-react';

// Import service images
import photographyImg from '@/assets/photography-service.jpg';
import designImg from '@/assets/design-service.jpg';

const photoshootFeatures = [
  'White Background / Catalog Photography',
  'Creative & Lifestyle Shoots',
  'On-Model Photography',
  'Short-form Product Videos',
  '24-48hr Turnaround',
];

const ecommerceFeatures = [
  'Multi-platform Listing Management',
  'A+/A++ Content Creation',
  'SEO & Keyword Optimization',
  'Product Description Pages (PDPs)',
  'Brand Storefront Design',
  'Sales Analytics & Reporting',
];

const marketplaceGrid = [
  'Amazon', 'eBay', 'Etsy',
  'Shopify', 'WooCommerce', 'Walmart',
  'Flipkart', 'Meesho', 'Shein',
];

const FeaturedServices = () => {
  const [ref1, isIntersecting1] = useIntersectionObserver({ threshold: 0.2 });
  const [ref2, isIntersecting2] = useIntersectionObserver({ threshold: 0.2 });

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      {/* Photoshoot Services Block */}
      <div 
        ref={ref1}
        className={`container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24 transition-all duration-700 ${
          isIntersecting1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={photographyImg}
              alt="Professional product photography studio setup"
              className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Photography</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Professional Product Photography
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              Studio-grade visuals that convert browsers to buyers. Every shot is crafted to highlight your product's best features.
            </p>

            <ul className="space-y-3 mb-8">
              {photoshootFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="hover-lift hover-glow min-h-[52px] px-8"
            >
              Book a Shoot
            </Button>
          </div>
        </div>
      </div>

      {/* Ecommerce Services Block */}
      <div 
        ref={ref2}
        className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isIntersecting2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content - Order first on mobile, second on desktop */}
          <div className="order-2 lg:order-1 lg:pr-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <ShoppingCart className="w-6 h-6 text-accent" />
              </div>
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Ecommerce</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Global Marketplace Excellence
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              End-to-end ecommerce management across 9 platforms and 7 countries. We optimize your presence everywhere that matters.
            </p>

            {/* Marketplace Grid */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {marketplaceGrid.map((platform) => (
                <div 
                  key={platform}
                  className="text-center py-2 px-3 bg-secondary/50 rounded-lg text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {platform}
                </div>
              ))}
            </div>

            {/* Markets Badge */}
            <div className="bg-secondary/30 rounded-lg px-4 py-3 mb-6 inline-flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Markets:</span>
              <span className="text-sm font-semibold text-foreground">US | UK | FR | DE | AU | CA | IN</span>
            </div>

            <ul className="space-y-3 mb-8">
              {ecommerceFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              size="lg" 
              variant="outline"
              onClick={scrollToContact}
              className="hover-lift min-h-[52px] px-8 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              Boost Your Sales
            </Button>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative group overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={designImg}
              alt="Ecommerce marketplace management dashboard"
              className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
