import { motion, AnimatePresence } from 'framer-motion';
import { Globe2, Rocket, Layers, Target, ShieldCheck, ArrowRight, CheckCircle2, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useVisitorGeo, VisitorRegion } from '@/hooks/useVisitorGeo';
import { cn } from '@/lib/utils';

interface USStandardsStripProps {
  className?: string;
}

interface StandardItem {
  icon: LucideIcon;
  title: string;
  badge: string;
  desc: string;
  highlight: string;
}

interface RegionContent {
  badge: string;
  titlePrefix: string;
  titleAccent: string;
  subtitle: string;
  targetPills: string[];
  pillars: StandardItem[];
  ctaText: string;
  ctaHighlight: string;
  ctaButton: string;
}

const REGION_DATA: Record<VisitorRegion, RegionContent> = {
  IN: {
    badge: 'Indian Exporter & Manufacturer Scale Engine',
    titlePrefix: 'From Indian Manufacturing Floor ',
    titleAccent: 'To US & Global Marketplace Leadership.',
    subtitle:
      'Built specifically for Indian manufacturers, textile & craft exporters, and D2C brands expanding into Amazon.com (US), Walmart Marketplace, and Shopify Global. We eliminate ocean freight sample delays, navigate US compliance, and craft American listing conversions.',
    targetPills: [
      'Surat, Delhi, Tirupur & Pan-India Exporters',
      'Amazon.com (US) & Walmart WFS Expansion',
      'Zero Ocean Sample Delays (3D CAD Studio)',
    ],
    pillars: [
      {
        icon: Rocket,
        title: 'Cross-Border Marketplace Expansion',
        badge: 'Amazon US · Walmart · Shopify',
        desc: 'End-to-end launch architecture for Indian exporters. Complete US Brand Registry, WFS & FBA ocean/air logistics routing, category un-gating, and multi-channel catalog sync.',
        highlight: 'FBA, WFS & Multi-Channel Scale',
      },
      {
        icon: Layers,
        title: 'Factory CAD to 3D Photoreal Creative',
        badge: 'Zero Sample Shipping Delays',
        desc: 'Transform raw factory CAD files, technical drawings, or physical samples into photorealistic 4K lifestyle sets and Premium A++ content — without weeks of ocean shipping or customs holds.',
        highlight: 'CAD & 3D Photoreal Renders',
      },
      {
        icon: Target,
        title: 'Algorithmic Indexing & Native US Copy',
        badge: 'A9/A10 & Walmart SEO',
        desc: 'Engineered to outrank domestic US incumbents. We pair deep American consumer psychology with 249-byte backend keyword structures, search-term velocity, and conversion copywriting that captures Buy Boxes.',
        highlight: 'Top-of-Search Indexing & Buy Box Win Rate',
      },
      {
        icon: ShieldCheck,
        title: 'Account Health Defense & Ad Scaling',
        badge: 'AHR 200+ & TACoS Control',
        desc: 'Dedicated cross-border account protection against listing suppressions, IP claims, and hijackers (24–72 hr escalation), combined with disciplined Sponsored Ads & DSP scaling optimized for net margin profitability.',
        highlight: 'Proactive Defense & ROAS Scaling',
      },
    ],
    ctaHighlight: 'Exporting from India to US Marketplaces?',
    ctaText: 'Book a 15-minute cross-border growth audit with our lead strategist on Google Meet or Zoom.',
    ctaButton: 'Schedule Marketplace Audit',
  },

  CN: {
    badge: 'Cross-Border Factory-to-Marketplace Engine',
    titlePrefix: 'From Direct Factory Production ',
    titleAccent: 'To High-Converting US Marketplace Brands.',
    subtitle:
      'Engineered for cross-border manufacturers and global sellers scaling on Amazon US, Walmart, and TikTok Shop. Zero physical sample delays with 3D CGI staging, native American positioning, and AHR 200+ account health protection.',
    targetPills: [
      'Direct Manufacturers & Cross-Border Sellers',
      'Amazon.com, Walmart & TikTok Shop US',
      'Photorealistic 3D CAD & Digital Staging',
    ],
    pillars: [
      {
        icon: Rocket,
        title: 'Multi-Marketplace Rapid Launch',
        badge: 'Amazon US · Walmart · TikTok',
        desc: 'Accelerated North American onboarding for global manufacturers. Complete US Brand Registry, WFS & FBA inventory setup, category un-gating, and automated multi-channel catalog sync.',
        highlight: 'FBA, WFS & TikTok Shop Scale',
      },
      {
        icon: Layers,
        title: 'Factory-to-Brand 3D Visual Studio',
        badge: 'Zero Ocean Sample Delays',
        desc: 'Turn factory CAD files, step models, and prototypes into 4K photorealistic lifestyle sets and Premium A++ content — completely bypassing international sample air freight and customs.',
        highlight: 'CAD, Step & 3D Render Pipeline',
      },
      {
        icon: Target,
        title: 'Native US Consumer Positioning',
        badge: 'A9/A10 & High Conversion',
        desc: 'High-intent American English copy and brand positioning that eliminates "generic factory" perception, captures Western shopper trust, and ranks at the top of Amazon & Walmart search.',
        highlight: 'Top-of-Search Indexing & Buy Box Win Rate',
      },
      {
        icon: ShieldCheck,
        title: 'Account Defense & Margin PPC',
        badge: 'AHR 200+ & TACoS Control',
        desc: 'Proactive defense against listing suppressions, IP claims, and brand hijackers (24–72 hr response), backed by disciplined Sponsored Ads & DSP scaling engineered for net profit margins.',
        highlight: 'Proactive Defense & ROAS Scaling',
      },
    ],
    ctaHighlight: 'Scaling cross-border on US marketplaces?',
    ctaText: 'Book a 15-minute strategic audit with our lead marketplace architects on Google Meet or Zoom.',
    ctaButton: 'Schedule Marketplace Audit',
  },

  US: {
    badge: 'US Marketplace Growth & Studio Engine',
    titlePrefix: 'From Catalog & Ad Bottlenecks ',
    titleAccent: 'To Category Leadership on US Marketplaces.',
    subtitle:
      'Designed for US ecommerce brands and marketplace sellers scaling on Amazon.com, Walmart, and Shopify Plus. Accelerate your velocity with 48-hr photo delivery, 3D digital staging, A9/A10 search optimization, and dedicated account governance.',
    targetPills: [
      'US Domestic Brands & Private Labels',
      'Amazon.com, Walmart & Shopify Plus',
      '48-Hr Delivery & Dedicated Account Sync',
    ],
    pillars: [
      {
        icon: Rocket,
        title: 'Multi-Marketplace Catalog Scaling',
        badge: 'Amazon · Walmart · Shopify Plus',
        desc: 'Unified multi-channel growth across Amazon.com, Walmart Marketplace, and Shopify Plus. FBA optimization, WFS integration, Buy Box protection, and synchronized inventory velocity.',
        highlight: 'FBA, WFS & Multi-Store Sync',
      },
      {
        icon: Layers,
        title: '48-Hour Studio & 3D Staging',
        badge: 'Fast Creative Turnaround',
        desc: 'Retouched, marketplace-ready studio photography in 48 hours, paired with photorealistic 3D digital staging and conversion-engineered Premium A++ modules that outperform domestic competitors.',
        highlight: '48-Hr Delivery & 3D CGI Staging',
      },
      {
        icon: Target,
        title: 'A9/A10 Search & Buy Box Velocity',
        badge: 'Top-of-Search SEO',
        desc: 'Engineered to capture and hold top-of-search placements. We pair deep US consumer search intent with 249-byte backend keyword structures, search-term harvesting, and high-converting storytelling.',
        highlight: 'Top-of-Search Indexing & Buy Box Defense',
      },
      {
        icon: ShieldCheck,
        title: 'AHR 200+ Defense & TACoS Scaling',
        badge: 'Dedicated Account Governance',
        desc: 'Proactive protection against policy warnings, listing suppressions, and rogue hijackers (24–72 hr SLA), paired with profit-first Sponsored Ads & DSP management.',
        highlight: 'AHR 200+ Defense & ROAS Scaling',
      },
    ],
    ctaHighlight: 'Ready to scale your US marketplace store?',
    ctaText: 'Book a 15-minute growth consultation with our lead ecommerce architect on Google Meet or Zoom.',
    ctaButton: 'Schedule Strategy Call',
  },

  GLOBAL: {
    badge: 'Cross-Border & Marketplace Scaling Engine',
    titlePrefix: 'From Factory Floor & Regional Brands ',
    titleAccent: 'To Category Leadership on US Marketplaces.',
    subtitle:
      'Whether you are an Indian exporter, a Chinese manufacturer, or an ambitious global brand — scaling on Amazon US, Walmart, and Shopify Plus requires world-class visual creative, algorithmic ranking, and uncompromising account defense.',
    targetPills: [
      'Indian Manufacturers & Exporters',
      'Cross-Border & Global Sellers',
      'US Brands Scaling Multi-Channel',
    ],
    pillars: [
      {
        icon: Rocket,
        title: 'Cross-Border Marketplace Expansion',
        badge: 'Amazon US · Walmart · TikTok',
        desc: 'End-to-end launch architecture for Indian exporters, Chinese manufacturers, and global brands entering North America. Complete US Brand Registry, WFS & FBA logistics onboarding, category un-gating, and multi-channel catalog sync.',
        highlight: 'FBA, WFS & Multi-Channel Scale',
      },
      {
        icon: Layers,
        title: 'Factory-to-Brand 3D Visual Studio',
        badge: 'Zero Sample Shipping Delays',
        desc: 'Transform raw factory CAD files, technical drawings, or physical prototypes into photorealistic 4K lifestyle sets, exploded-view renders, and Premium A++ content — without weeks of ocean shipping or customs holds.',
        highlight: 'CAD & 3D Photoreal Renders',
      },
      {
        icon: Target,
        title: 'Algorithmic Indexing & US Conversion',
        badge: 'A9/A10 & Walmart SEO',
        desc: 'Engineered specifically to outrank domestic US incumbents. We pair deep American consumer psychology with 249-byte backend keyword structures, search-term velocity, and conversion copywriting that captures Buy Boxes.',
        highlight: 'Top-of-Search Indexing & Buy Box Win Rate',
      },
      {
        icon: ShieldCheck,
        title: 'Account Health Defense & Ad Scaling',
        badge: 'AHR 200+ & TACoS Control',
        desc: 'Dedicated cross-border account protection against listing suppressions, IP claims, and hijackers (24–72 hr escalation), combined with disciplined Sponsored Ads & DSP scaling optimized for net margin profitability.',
        highlight: 'Proactive Defense & ROAS Scaling',
      },
    ],
    ctaHighlight: 'Selling or expanding to the US?',
    ctaText: 'Book a 15-minute cross-border marketplace audit with our lead growth strategist on Google Meet or Zoom.',
    ctaButton: 'Schedule Marketplace Audit',
  },
};

const REGION_TABS: { id: VisitorRegion; label: string }[] = [
  { id: 'IN', label: '🇮🇳 India' },
  { id: 'CN', label: '🇨🇳 Cross-Border' },
  { id: 'US', label: '🇺🇸 US & Canada' },
  { id: 'GLOBAL', label: '🌐 Global' },
];

export default function USStandardsStrip({ className = '' }: USStandardsStripProps) {
  const { region, setRegionOverride } = useVisitorGeo();
  const current = REGION_DATA[region] || REGION_DATA.GLOBAL;

  return (
    <section className={`py-16 md:py-20 relative overflow-hidden ${className}`}>
      {/* Background ambient accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Interactive Region Preview Switcher */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8 text-xs">
          <span className="text-muted-foreground mr-1 hidden sm:inline text-[11px] uppercase tracking-wider font-medium">
            Marketplace View:
          </span>
          <div className="inline-flex p-1 rounded-full bg-muted/60 border border-border">
            {REGION_TABS.map((tab) => {
              const isActive = region === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setRegionOverride(tab.id)}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200',
                    isActive
                      ? 'bg-background text-foreground shadow-sm font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Header with smooth key transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={region}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
              <Globe2 className="w-3.5 h-3.5" />
              <span>{current.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {current.titlePrefix}
              <span className="text-primary">{current.titleAccent}</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {current.subtitle}
            </p>

            {/* Target Audience Pills */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              {current.targetPills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 border border-border"
                >
                  <CheckCircle2 className="w-3 h-3 text-primary" /> {pill}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {current.pillars.map((std, i) => {
            const Icon = std.icon;
            return (
              <motion.div
                key={`${region}-${std.title}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="relative rounded-2xl p-6 bg-card border border-border/80 hover:border-primary/40 transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-200">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                      {std.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {std.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {std.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-medium text-primary">
                  <span>{std.highlight}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary/70" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-10 p-5 rounded-2xl bg-muted/40 border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <p className="text-xs sm:text-sm text-foreground">
              <span className="font-semibold">{current.ctaHighlight}</span> {current.ctaText}
            </p>
          </div>
          <Link
            to="/get-started"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all whitespace-nowrap shadow-sm"
          >
            {current.ctaButton} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
