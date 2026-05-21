import { motion } from 'framer-motion';
import { Search, Shield, Clock, Layers, Globe, DollarSign } from 'lucide-react';

const differentiators = [
  {
    Icon: Search,
    title: 'Diagnose first, design second.',
    body: 'Every engagement starts with a free 30-minute audit of your listings, ads, and analytics. We tell you the bottleneck before we sell you a service.',
  },
  {
    Icon: Shield,
    title: 'Compliance-native creative.',
    body: "Our designers know Amazon's main-image rules, Walmart's 1500×1500 minimum, and Etsy's lifestyle preference by heart. No rejected images. No surprise listing suppressions.",
  },
  {
    Icon: Clock,
    title: '48-hour photo turnaround.',
    body: 'Most studios take 2 weeks. We deliver retouched, marketplace-ready images in 48 hours on standard shoots — because every day a listing is dark is a day of lost ranking.',
  },
  {
    Icon: Layers,
    title: 'One team, every service.',
    body: 'Photography, design, listings, ads, analytics — all in-house. No vendor-stitching. No "the photographer doesn\'t talk to the marketing person."',
  },
  {
    Icon: Globe,
    title: 'We\'ve shipped on multiple marketplaces.',
    body: 'Amazon US/UK/EU, Etsy, Shopify, Flipkart, Meesho — each with different image specs, listing rules, and ranking signals. We know all of them. No rejected images. No compliance surprises.',
  },
  {
    Icon: DollarSign,
    title: 'Transparent, milestone-based pricing.',
    body: 'Project-priced, not hour-billed. You see deliverables and dates before you sign anything. Flat retainers for ongoing work, no lock-ins.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
};

const WhySaleixo = () => (
  <section className="py-16 md:py-24 bg-transparent">
    <div className="container mx-auto px-4 max-w-6xl">

      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="text-center mb-12 md:mb-16"
      >
        <motion.p variants={fadeUp} custom={0} className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Why Saleixo
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
          A studio built by people who actually sell.
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          We've managed listings, ads, and photography for artisan sellers across Amazon, Etsy, and Shopify. We know where the bottleneck is before we sell you a thing — because we've fixed it before.
        </motion.p>
      </motion.div>

      {/* Cards grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {differentiators.map((d, i) => (
          <motion.div
            key={d.title}
            variants={fadeUp}
            custom={i}
            className="rounded-2xl p-6 border border-border/50 bg-card/50 hover:-translate-y-0.5 transition-transform duration-200"
            style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-primary/10 border border-primary/20">
              <d.Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-2">{d.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{d.body}</p>
          </motion.div>
        ))}
      </motion.div>

    </div>
  </section>
);

export default WhySaleixo;
