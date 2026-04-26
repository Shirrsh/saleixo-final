import { motion } from 'framer-motion';

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
  return (
    <section className="py-12 md:py-16 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-muted-foreground text-sm md:text-base font-medium mb-8 tracking-widest uppercase"
        >
          Trusted across leading global marketplaces
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mb-10">
          {marketplaces.map((marketplace, index) => (
            <motion.div
              key={marketplace.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <span className="text-lg md:text-xl font-bold text-muted-foreground/40 hover:text-foreground/80 transition-colors duration-300 tracking-tight cursor-default">
                {marketplace.display}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-muted-foreground text-xs md:text-sm mb-4 tracking-wider uppercase">Serving clients in</p>
          <div className="flex justify-center items-center gap-3 md:gap-4">
            {countries.map((country, index) => (
              <motion.div
                key={country.code}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.2 }}
                className="relative cursor-default group"
              >
                <span className="text-2xl md:text-3xl" role="img" aria-label={country.name}>
                  {country.flag}
                </span>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 glass-purple text-foreground text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {country.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketplaceLogos;
