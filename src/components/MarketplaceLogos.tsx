import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

// Marketplace data with text-based display (reliable, no external CDN dependency)
const marketplaces = [
  { name: 'Amazon', display: 'amazon' },
  { name: 'eBay', display: 'eBay' },
  { name: 'Walmart', display: 'Walmart' },
  { name: 'Shopify', display: 'Shopify' },
  { name: 'Etsy', display: 'Etsy' },
  { name: 'WooCommerce', display: 'WooCommerce' },
  { name: 'Flipkart', display: 'Flipkart' },
  { name: 'Meesho', display: 'Meesho' },
  { name: 'Shein', display: 'SHEIN' },
];

// Country flags with emoji for simplicity and performance
const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
];

const MarketplaceLogos = () => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className="py-12 md:py-16 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <p className="text-center text-muted-foreground text-sm md:text-base font-medium mb-8 animate-fade-in">
          Trusted across leading global marketplaces
        </p>

        {/* Marketplace Logos as styled text */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-10 mb-10">
          {marketplaces.map((marketplace, index) => (
            <div
              key={marketplace.name}
              className={`group relative transition-all duration-300 ${
                isIntersecting ? 'animate-fade-in opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-lg md:text-xl font-bold text-muted-foreground/50 hover:text-foreground transition-colors duration-300 tracking-tight">
                {marketplace.display}
              </span>
            </div>
          ))}
        </div>

        {/* Country Flags */}
        <div className="text-center">
          <p className="text-muted-foreground text-xs md:text-sm mb-4">
            Serving clients in
          </p>
          <div className="flex justify-center items-center gap-3 md:gap-4">
            {countries.map((country, index) => (
              <div
                key={country.code}
                className={`group relative cursor-default transition-transform duration-200 hover:scale-110 ${
                  isIntersecting ? 'animate-fade-in opacity-100' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(marketplaces.length + index) * 50}ms` }}
              >
                <span className="text-2xl md:text-3xl" role="img" aria-label={country.name}>
                  {country.flag}
                </span>
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {country.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceLogos;
