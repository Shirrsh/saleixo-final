import { motion } from 'framer-motion';

const marketplaces = [
  { name: 'Amazon',      src: '/Marketplace%20logos/Amazon.png' },
  { name: 'Shopify',     src: '/Marketplace%20logos/shopify.png' },
  { name: 'Walmart',     src: '/Marketplace%20logos/Walmart.png' },
  { name: 'Etsy',        src: '/Marketplace%20logos/etsy.png' },
  { name: 'WooCommerce', src: '/Marketplace%20logos/Woocommerce.png' },
  { name: 'Flipkart',    src: '/Marketplace%20logos/flipkart.png' },
  { name: 'Meesho',      src: '/Marketplace%20logos/Meesho.avif' },
  { name: 'SHEIN',       src: '/Marketplace%20logos/Shein.png' },
];

const countries = [
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'AU', name: 'Australia' },
  { code: 'CA', name: 'Canada' },
];

// Duplicate for seamless loop
const marqueeItems = [...marketplaces, ...marketplaces];

const MarketplaceLogos = () => {
  return (
    <section className="py-10 md:py-14 bg-transparent overflow-hidden">

      {/* Heading */}
      <p className="text-center text-xs font-semibold mb-7 tracking-[0.3em] uppercase text-muted-foreground px-4">
        Trusted across leading global marketplaces
      </p>

      {/* ── Infinite horizontal marquee — one line, no wrap ── */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, hsl(var(--background)), transparent)' }} />

        <div
          className="flex items-center gap-12 whitespace-nowrap"
          style={{
            animation: 'marquee-x 25s linear infinite',
            willChange: 'transform',
            width: 'max-content',
          }}
        >
          {marqueeItems.map((marketplace, i) => (
            <div
              key={i}
              className="flex items-center justify-center flex-shrink-0 h-10 w-28 cursor-default select-none opacity-40 hover:opacity-90 transition-opacity duration-300"
            >
              <img
                src={marketplace.src}
                alt={marketplace.name}
                className="max-h-10 max-w-[7rem] w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Divider + countries */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl mt-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-border/40" />
          <span className="text-[10px] tracking-[0.3em] uppercase shrink-0 text-muted-foreground/50">
            Serving clients in
          </span>
          <div className="flex-1 h-px bg-border/40" />
        </div>

        <div className="flex justify-center items-center gap-4 md:gap-6">
          {countries.map((country, i) => (
            <motion.div
              key={country.code}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="relative cursor-default group flex flex-col items-center gap-1"
              whileHover={{ scale: 1.2, y: -3 }}
            >
              <img
                src={`/flags/${country.code}.svg`}
                alt={country.name}
                className="w-8 h-6 md:w-10 md:h-7 object-cover rounded-sm shadow-sm"
                loading="lazy"
              />
              <span className="text-[9px] font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-muted-foreground">
                {country.code}
              </span>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 glass-purple text-foreground text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                {country.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default MarketplaceLogos;
