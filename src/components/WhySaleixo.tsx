import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, Clock, Layers, Globe, DollarSign, ChevronDown } from 'lucide-react';

import Parallax, { ParallaxBlob } from '@/components/Parallax';

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

const WhySaleixo = () => {
  const [showAll, setShowAll] = useState(false);
  return (
  <section className="section-airy relative overflow-hidden py-16 md:py-24 bg-transparent">
    {/* Drifting ambient blobs — parallax on scroll */}
    <ParallaxBlob hue="217 91% 52%" opacity={0.06} size={620} speed={0.45} style={{ top: '-10%', left: '-8%' }} />
    <ParallaxBlob hue="340 100% 68%" opacity={0.045} size={520} speed={-0.3} style={{ bottom: '-15%', right: '-6%' }} />

    <div className="container relative z-10 mx-auto px-4 max-w-6xl">

      {/* Header — gentle counter-scroll drift */}
      <Parallax speed={-0.08}>
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
          We've managed listings, ads, and photography for ecommerce brands across Amazon, Etsy, and Shopify. We know where the bottleneck is before we sell you a thing — because we've fixed it before.
        </motion.p>
      </motion.div>
      </Parallax>

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
            className={`rounded-2xl p-6 border border-border/50 bg-card/50 active:scale-[0.98] hover:-translate-y-0.5 transition-transform duration-200${i >= 3 && !showAll ? ' hidden sm:flex sm:flex-col' : ''}`}
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

      {/* Show more — mobile only */}
      <AnimatePresence>
        {!showAll && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden flex justify-center mt-6"
          >
            <button
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-border text-foreground bg-surface active:scale-95 transition-transform"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
            >
              Show 3 more reasons
              <ChevronDown className="w-4 h-4" strokeWidth={2} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  </section>
  );
};

export default WhySaleixo;
