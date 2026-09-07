import React, { useState } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import CurrencyToggle from '@/components/CurrencyToggle';
import ThemeToggle from '@/components/ThemeToggle';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  Layers,
  Video,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Clock,
  Camera,
  Bot,
  MessageSquare,
  ShieldAlert,
  Search,
  Eye,
  Store,
  Box,
  Gift,
  Palette,
  Shirt,
  Sparkle,
  Gem,
  Check,
  ChevronRight,
  RefreshCw,
  Award,
  BarChart3,
  Flame,
  MessageCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { DealInquiryModal } from '@/components/frame-craft/DealInquiryModal';

export default function AiServicesShowcase() {
  const { fmt, currency } = useCurrency();
  const [activeEngineTab, setActiveEngineTab] = useState<number>(0);
  const [inquiryModal, setInquiryModal] = useState({
    isOpen: false,
    dealTierName: 'Ultimate 7 + 2 + 1 Deal',
    formattedPrice: fmt(347, 26997),
  });

  // The 5 Proprietary AI Automation Engines
  const AI_ENGINES = [
    {
      id: 'pixellaunch',
      name: 'PixelLaunch 48™',
      tagline: 'Studio-in-a-Box Generative Imaging',
      badge: 'Core Engine',
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      icon: Camera,
      headline: 'From a raw phone snapshot to 4K Amazon hero & luxury lifestyle in 48 hours.',
      description:
        'Eliminates expensive studio days, model bookings, and 4-week turnaround delays. Our AI diffusion pipeline isolates the product, applies true 3D lighting, and renders photorealistic lifestyle scenes compliant with Amazon, Shopify, and Etsy.',
      capabilities: [
        'Pure White RGB(255,255,255) Amazon Hero shots with soft contact drop shadow',
        'Generative Room Staging (Scandinavian living rooms, modern offices, festive tables)',
        'Macro detail magnification for wood grain, fabric weave, and jewelry facets',
        'Automatic 2000x2000px high-res scaling with zero pixelation or artifacting',
      ],
      deliverableBadge: 'Outputs: 7+ High-Res Images / SKU',
    },
    {
      id: 'listingdna',
      name: 'ListingDNA™',
      tagline: 'Autonomous Cataloging & A9/A10 SEO',
      badge: 'Organic Rank',
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      icon: Search,
      headline: 'Search-engineered copy and A+ content that triggers buyer impulses.',
      description:
        'AI Vision decodes your product’s physical specs, materials, and buyer benefits, then writes algorithmically indexed titles, 5 benefit-driven bullet points, and 249-byte backend search term feeds tested for maximum click-through.',
      capabilities: [
        'A9/A10 high-intent keyword clustering with zero character waste',
        '5 conversion bullet points formatted to answer top customer objections',
        'Premium A+ Brand Story modules & comparison table copy',
        'Multi-marketplace taxonomy mapping (Amazon, Flipkart, Walmart, Shopify)',
      ],
      deliverableBadge: 'Outputs: Full SEO Listing Copy + Backend Terms',
    },
    {
      id: 'shoppulse',
      name: 'ShopPulse AI™',
      tagline: '24/7 WhatsApp Conversational Closer',
      badge: 'Conversational',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      icon: MessageSquare,
      headline: 'Turns casual WhatsApp chats into paid orders while you sleep.',
      description:
        'Offline customers are accustomed to talking with the shopkeeper. ShopPulse AI brings that personal touch to digital storefronts, handling product discovery, size recommendations, inventory checks, and instant UPI checkout right in WhatsApp.',
      capabilities: [
        'Multilingual fluency in English, Hindi, and regional dialects',
        'Dynamic product card sharing with live catalog pricing & images',
        'Direct UPI / Stripe payment link generation inside WhatsApp chat',
        'Automated tracking alerts & customer re-engagement follow-ups',
      ],
      deliverableBadge: 'Outputs: Automated WhatsApp Sales Assistant',
    },
    {
      id: 'rankmatrix',
      name: 'RankMatrix™',
      tagline: 'Competitor Intelligence & Buy Box Defense',
      badge: 'Intelligence',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      icon: BarChart3,
      headline: 'Exploits competitor negative reviews to position your listing as #1.',
      description:
        'Our scraper scans 1-star and 2-star reviews across rival category leaders to identify recurring pain points (e.g., "cheap plastic hinge" or "sizing runs small"). It automatically tunes your listing copy and infographics to highlight your advantage.',
      capabilities: [
        'Automated review gap analysis across top 10 category competitors',
        'Dynamic bullet point updates responding to seasonal search surges',
        'Algorithmic pricing monitoring & Buy Box suppression alerts',
        'Customer sentiment tracking and review triage automation',
      ],
      deliverableBadge: 'Outputs: Weekly Competitive SEO Refresh',
    },
    {
      id: 'shielddrop',
      name: 'ShieldDrop™',
      tagline: 'Zero-RTO & Cash-on-Delivery Fraud Armor',
      badge: 'Profit Shield',
      badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
      icon: ShieldCheck,
      headline: 'Stops fake COD orders and costly returns before dispatch.',
      description:
        'Return-to-Origin (RTO) on Cash-on-Delivery eats up to 30% of ecommerce profits. ShieldDrop uses predictive risk scoring, address geo-correction, and an automated WhatsApp delivery confirmation bot to verify orders before shipping.',
      capabilities: [
        'Pin-code and address completeness validation using postal databases',
        'Automated 1-tap WhatsApp order confirmation before warehouse dispatch',
        'Converts high-risk COD orders into prepaid with instant UPI incentive discounts',
        'Reduces return shipping logistics costs by up to 68%',
      ],
      deliverableBadge: 'Outputs: Order Risk Shield & Verification Bot',
    },
  ];

  // The 6 Balanced Niches
  const NICHES = [
    {
      id: 'frames',
      name: 'Custom Photos & Picture Frames',
      icon: Palette,
      badge: 'Personalization',
      color: 'from-amber-500/20 to-orange-500/10',
      borderColor: 'border-amber-500/30',
      whyAiWins: 'High AOV and emotional impulse. Visual scale and matboard rendering eliminate sizing returns.',
      deliverables: 'Room scale guides, beveled mat macro, foam corner packaging, 60s install guide.',
    },
    {
      id: 'hampers',
      name: 'Gifting Items & Hampers',
      icon: Gift,
      badge: 'Holiday & B2B',
      color: 'from-pink-500/20 to-rose-500/10',
      borderColor: 'border-pink-500/30',
      whyAiWins: 'Explosive seasonal surges (Diwali, Weddings, Corporate). Curated bundles increase order margins.',
      deliverables: '"What’s Inside" itemized graphics, satin ribbon unboxing, custom note card mockup.',
    },
    {
      id: 'artisan',
      name: 'Artisan Crafts & Handmade Decor',
      icon: Box,
      badge: 'Global Export',
      color: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'border-emerald-500/30',
      whyAiWins: 'Authentic heritage products with zero technical overhead. Ideal for Amazon Global & Etsy.',
      deliverables: 'Clay/brass craft proof callouts, warm tabletop styling, drop-tested ceramic pack display.',
    },
    {
      id: 'fashion',
      name: 'Fashion & D2C Apparel',
      icon: Shirt,
      badge: 'High Velocity',
      color: 'from-blue-500/20 to-indigo-500/10',
      borderColor: 'border-blue-500/30',
      whyAiWins: 'Eliminates model hiring costs. Generates diverse on-model lifestyle previews from flat-lays.',
      deliverables: 'Ghost mannequin 3D relief, fabric weave macro, comprehensive size chart infographics.',
    },
    {
      id: 'decor',
      name: 'Home Decor & Living',
      icon: Store,
      badge: 'Aesthetic Demand',
      color: 'from-purple-500/20 to-violet-500/10',
      borderColor: 'border-purple-500/30',
      whyAiWins: 'Buyers must envision items in their space. AI renders identical products in 5 different interior decors.',
      deliverables: 'Scandinavian and bohemian room staging, dimensional proportions against furniture.',
    },
    {
      id: 'jewelry',
      name: 'Jewelry & Luxury Accessories',
      icon: Gem,
      badge: 'Luxury Margin',
      color: 'from-yellow-500/20 to-amber-500/10',
      borderColor: 'border-yellow-500/30',
      whyAiWins: 'Requires micro-detail clarity and metallic specular highlights without expensive macro camera rigs.',
      deliverables: 'Shimmer enhancement, gemstone clarity zoom, clasp durability and skin-tone harmony shots.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      {/* ── TOP STICKY QC & SANDBOX BANNER ─────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-amber-500/10 dark:bg-amber-950/40 border-b border-amber-500/30 backdrop-blur-md px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-bold tracking-wide uppercase">
              Internal QC Sandbox
            </span>
            <span className="text-muted-foreground hidden sm:inline">•</span>
            <span className="text-muted-foreground hidden sm:inline">
              Saleixo AI Agency Showcase Prototype (Local Staging Only — Not Live)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/preview/frame-craft"
              className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded"
            >
              <span>Go to 7+2+1 Deal Studio</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <div className="h-4 w-[1px] bg-amber-500/30" />
            <CurrencyToggle className="scale-90" />
            <ThemeToggle />
            <Link
              to="/"
              className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-100 font-medium transition-colors"
            >
              Exit to Home
            </Link>
          </div>
        </div>
      </div>

      {/* ── HERO SECTION: THE AUTONOMOUS ECOMMERCE AGENCY ──────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 border-b border-border/60 bg-gradient-to-b from-card via-background to-background">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The AI-Automated Ecommerce Agency</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground max-w-5xl mx-auto leading-[1.08]">
            We Turn Raw Products into{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Top-Ranking Brands
            </span>{' '}
            in 48 Hours.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Eliminating photoshoot delays, copywriting writer’s block, and expensive retainer fees. Powered by 5 proprietary AI automation engines for Amazon, Shopify, and Etsy sellers.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/preview/frame-craft"
              className="px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Launch 7+2+1 Deal Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#ai-engines"
              className="px-6 py-3.5 rounded-xl bg-card border border-border hover:bg-muted font-bold text-sm text-foreground transition-colors"
            >
              Explore 5 AI Engines
            </a>
          </div>

          {/* Headline Verification Metrics */}
          <div className="mt-14 pt-8 border-t border-border/50 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-foreground">48 Hours</div>
              <div className="text-xs text-muted-foreground mt-0.5">Rapid Studio SLA</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
              <div className="text-xs text-muted-foreground mt-0.5">Amazon & Marketplace Compliant</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">7+2+1</div>
              <div className="text-xs text-muted-foreground mt-0.5">Listing Asset Formula</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-foreground">15+ Markets</div>
              <div className="text-xs text-muted-foreground mt-0.5">India, US, UK, EU, UAE</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: THE 5 PROPRIETARY AI AUTOMATION ENGINES ──────────────── */}
      <section id="ai-engines" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-wider text-primary uppercase">
            Proprietary Tech Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2 tracking-tight">
            5 Purpose-Built AI Engines. Zero Freelancer Headaches.
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Every engine replaces an entire slow, manual agency department with autonomous algorithmic workflows.
          </p>
        </div>

        {/* Engine Tabs Navigator */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {AI_ENGINES.map((engine, index) => {
            const isSelected = activeEngineTab === index;
            const Icon = engine.icon;
            return (
              <button
                key={engine.id}
                onClick={() => setActiveEngineTab(index)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]'
                    : 'border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{engine.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Engine Showcase Card */}
        {(() => {
          const engine = AI_ENGINES[activeEngineTab];
          const Icon = engine.icon;
          return (
            <div className="bg-card border-2 border-primary/20 rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${engine.badgeColor}`}>
                    {engine.badge}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {engine.tagline}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  {engine.headline}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {engine.description}
                </p>

                {/* Key Capabilities List */}
                <div className="mt-4 space-y-2.5">
                  {engine.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-foreground">
                      <div className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border/60 flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-primary">
                    {engine.deliverableBadge}
                  </span>
                  <Link
                    to="/preview/frame-craft"
                    className="text-xs font-bold text-foreground hover:text-primary flex items-center gap-1 group"
                  >
                    <span>Test In Sandbox</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Graphic Mockup Frame for Active Engine */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[380px] p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-muted border border-border/80 shadow-inner flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/60 pb-3">
                    <span className="font-mono">Engine Status: ACTIVE</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <div className="aspect-[4/3] rounded-xl bg-card border border-border flex flex-col items-center justify-center p-6 text-center shadow-sm">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="text-sm font-extrabold text-foreground">{engine.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{engine.tagline}</div>
                  </div>

                  <div className="text-[11px] text-muted-foreground leading-snug p-3 rounded-xl bg-card/60 border border-border/50">
                    💡 <span className="font-semibold text-foreground">Autonomous Execution:</span> Runs through our secure AI cloud pipelines without requiring client technical setup.
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* ── SECTION 2: THE 6 BALANCED NICHES MATRIX ────────────────────────── */}
      <section className="py-20 border-t border-border/60 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold tracking-wider text-primary uppercase">
              Vertical Specialization
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2 tracking-tight">
              Balanced Across 6 High-Margin Ecommerce Niches
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              From personalized picture frames and corporate gifting hampers to handcrafted pottery and apparel.
            </p>
          </div>

          {/* 6 Niches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NICHES.map((niche) => {
              const Icon = niche.icon;
              return (
                <div
                  key={niche.id}
                  className={`p-6 rounded-2xl bg-card border ${niche.borderColor} shadow-sm hover:shadow-md transition-all flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {niche.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-foreground mb-1.5">
                      {niche.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      {niche.whyAiWins}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/50 text-[11px]">
                    <span className="text-primary font-semibold block mb-0.5">
                      Specific 7+2+1 Deliverables:
                    </span>
                    <span className="text-muted-foreground">{niche.deliverables}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: THE 7 + 2 + 1 PRICING FORMULA ($7 < +2 <= 1) ────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-wider text-pink-600 dark:text-pink-400 uppercase">
            Transparent Flat-Rate Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2 tracking-tight">
            The 7 + 2 + 1 Deal Formula
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Pricing engineered with high value increments: 7 Core Images &lt; +2 A+ Modules &le; 1 4K Motion Reel.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: Core 7 Deal */}
          <div className="p-7 rounded-2xl bg-card border border-border/80 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                ENTRY TIER
              </span>
              <h3 className="text-xl font-black text-foreground">The Core 7 Deal</h3>
              <p className="text-xs text-muted-foreground mt-1">
                7 foundational Amazon & Shopify listing images.
              </p>

              <div className="mt-6 mb-6">
                <span className="text-3xl sm:text-4xl font-black text-foreground">
                  {fmt(149, 11999)}
                </span>
                <span className="text-xs text-muted-foreground block mt-0.5">
                  / SKU (All-Inclusive)
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-muted-foreground border-t border-border/50 pt-5">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>1x Pure White RGB(255) Hero</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>2x Dimension & Scale Infographics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>2x Luxury Room Lifestyle Scenes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>1x Craftsmanship & Texture Macro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>1x Unboxing & Transit Packaging</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <button
                onClick={() =>
                  setInquiryModal({
                    isOpen: true,
                    dealTierName: 'Core 7 Deal',
                    formattedPrice: fmt(149, 11999),
                  })
                }
                className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Lock Core 7 Deal</span>
              </button>
              <Link
                to="/preview/frame-craft"
                className="w-full py-2 rounded-xl border border-border bg-muted hover:bg-muted/80 text-xs font-semibold text-muted-foreground hover:text-foreground text-center transition-colors block"
              >
                Test In Studio
              </Link>
            </div>
          </div>

          {/* Card 2: Pro 7 + 2 Deal */}
          <div className="p-7 rounded-2xl bg-card border-2 border-purple-500/30 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  ENHANCED TIER
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600">
                  +2 A+ Bonus
                </span>
              </div>
              <h3 className="text-xl font-black text-foreground">The 7 + 2 Pro</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Core 7 Images + 2 Premium A+ Modules.
              </p>

              <div className="mt-6 mb-6">
                <span className="text-3xl sm:text-4xl font-black text-foreground">
                  {fmt(228, 17998)}
                </span>
                <span className="text-xs text-muted-foreground block mt-0.5">
                  / SKU (All-Inclusive)
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-muted-foreground border-t border-border/50 pt-5">
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span>Everything in Core 7 Deal</span>
                </div>
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
                  <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span>+1 Step-by-Step Installation / Serving Guide</span>
                </div>
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
                  <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span>+1 Brand Trust vs Cheap Generic Comparison</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span>ListingDNA™ SEO Keyword & Bullet Sheet</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <button
                onClick={() =>
                  setInquiryModal({
                    isOpen: true,
                    dealTierName: 'Pro 7 + 2 Deal',
                    formattedPrice: fmt(228, 17998),
                  })
                }
                className="w-full py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md shadow-purple-600/20 hover:bg-purple-700 transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Lock 7 + 2 Pro Deal</span>
              </button>
              <Link
                to="/preview/frame-craft"
                className="w-full py-2 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-xs font-semibold text-purple-700 dark:text-purple-300 text-center transition-colors block"
              >
                Test In Studio
              </Link>
            </div>
          </div>

          {/* Card 3: Ultimate 7 + 2 + 1 Deal (Flagship) */}
          <div className="p-7 rounded-2xl bg-gradient-to-br from-card via-card to-pink-500/5 border-2 border-pink-500 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-pink-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
              Top Converting
            </div>

            <div>
              <span className="text-xs font-mono font-semibold text-pink-600 dark:text-pink-400 uppercase tracking-wider block mb-1">
                FLAGSHIP ASSET BUNDLE
              </span>
              <h3 className="text-xl font-black text-foreground">Ultimate 7 + 2 + 1</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Full 9 Images + 1 4K Vertical Motion Reel.
              </p>

              <div className="mt-6 mb-6">
                <span className="text-3xl sm:text-4xl font-black text-foreground">
                  {fmt(347, 26997)}
                </span>
                <span className="text-xs text-muted-foreground block mt-0.5">
                  / SKU (All-Inclusive)
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-muted-foreground border-t border-border/50 pt-5">
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <Check className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                  <span>All 7 Core Marketplace Images</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <Check className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                  <span>Both +2 A+ Content Premium Visuals</span>
                </div>
                <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold">
                  <Flame className="w-3.5 h-3.5 text-pink-500 shrink-0 fill-pink-500" />
                  <span>+1 9:16 Vertical Video Reel (4K Motion)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                  <span>Licensed Royalty-Free Sound Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                  <span>Amazon Video Ads & Instagram Reel Ready</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <button
                onClick={() =>
                  setInquiryModal({
                    isOpen: true,
                    dealTierName: 'Ultimate 7 + 2 + 1 Deal',
                    formattedPrice: fmt(347, 26997),
                  })
                }
                className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-xs font-bold text-white text-center shadow-lg shadow-pink-600/25 transition-all flex items-center justify-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5 fill-white" />
                <span>Lock Ultimate 7+2+1 Deal</span>
              </button>
              <Link
                to="/preview/frame-craft"
                className="w-full py-2 rounded-xl border border-pink-500/30 bg-pink-500/10 hover:bg-pink-500/20 text-xs font-semibold text-pink-700 dark:text-pink-300 text-center transition-colors block"
              >
                Test In Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: TRADITIONAL AGENCY VS SALEIXO AI STUDIO ─────────────── */}
      <section className="py-20 border-t border-border/60 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-wider text-primary uppercase">
              The Agency Transformation
            </span>
            <h2 className="text-3xl font-extrabold text-foreground mt-2 tracking-tight">
              Why Sellers Switch to the AI-Automated Model
            </h2>
          </div>

          <div className="overflow-x-auto bg-card border border-border/80 rounded-2xl shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border/70 text-muted-foreground bg-muted/40">
                  <th className="p-4 font-semibold">Service Metric</th>
                  <th className="p-4 font-semibold text-destructive">Traditional Agency / Studio</th>
                  <th className="p-4 font-semibold text-primary">Saleixo AI-Automated Studio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-foreground">
                <tr>
                  <td className="p-4 font-bold">Turnaround Time</td>
                  <td className="p-4 text-muted-foreground">3 to 6 Weeks (Photoshoots & Delays)</td>
                  <td className="p-4 text-emerald-600 font-bold">48 to 72 Hours Guaranteed</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Pricing Model</td>
                  <td className="p-4 text-muted-foreground">$750–$2,000+ Per-Hour Invoicing</td>
                  <td className="p-4 text-emerald-600 font-bold">Transparent Flat-Rate (From $149 / SKU)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Revisions & Relighting</td>
                  <td className="p-4 text-muted-foreground">Paid Reshoots & Back-and-Forth Emails</td>
                  <td className="p-4 text-emerald-600 font-bold">Instant 3D Generative Scene Tweaks</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Video Reel Production</td>
                  <td className="p-4 text-muted-foreground">Extra $300+ videography quote</td>
                  <td className="p-4 text-emerald-600 font-bold">Included in 7+2+1 Flagship Deal</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">RTO & Order Protection</td>
                  <td className="p-4 text-muted-foreground">None (Client bears 100% bounce loss)</td>
                  <td className="p-4 text-emerald-600 font-bold">ShieldDrop™ WhatsApp Verification</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: 3-STEP ONBOARDING WORKFLOW & CTA ────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 w-full text-center">
        <div className="max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-wider text-primary uppercase">
            Frictionless Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2 tracking-tight">
            How a Store Goes Live in 48 Hours
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left mb-16">
          <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-xs mb-3">
              1
            </div>
            <h4 className="text-sm font-bold text-foreground">Send Raw Product or Photo</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Snap a clean smartphone photo on a counter or dispatch sample units to our studio hub in Noida.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-xs mb-3">
              2
            </div>
            <h4 className="text-sm font-bold text-foreground">Autonomous AI Execution</h4>
            <p className="text-xs text-muted-foreground mt-1">
              PixelLaunch 48™ generates 4K lifestyle scenes while ListingDNA™ writes high-CTR SEO keywords.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-xs mb-3">
              3
            </div>
            <h4 className="text-sm font-bold text-foreground">Deploy to Amazon & Shopify</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Download the 7+2+1 asset pack or let our team upload and publish directly via seller API.
            </p>
          </div>
        </div>

        {/* Final CTA Box */}
        <div className="bg-gradient-to-br from-card via-card to-primary/10 border-2 border-primary/30 rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black text-foreground">
            Ready to Test the 7+2+1 Asset Generator?
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
            Open the sandbox to test how your product’s 9 listing images and 1 vertical video reel render in real-time.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() =>
                setInquiryModal({
                  isOpen: true,
                  dealTierName: 'Ultimate 7 + 2 + 1 Deal',
                  formattedPrice: fmt(347, 26997),
                })
              }
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md shadow-primary/25 hover:bg-primary/90 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit 7+2+1 Inquiry</span>
            </button>
            <Link
              to="/preview/frame-craft"
              className="px-5 py-3 rounded-xl bg-card border border-border hover:bg-muted text-xs font-bold text-foreground transition-colors flex items-center gap-2"
            >
              <span>Launch Deal Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── DEAL INQUIRY MODAL ────────────────────────────────────────────── */}
      <DealInquiryModal
        isOpen={inquiryModal.isOpen}
        onClose={() => setInquiryModal((prev) => ({ ...prev, isOpen: false }))}
        selectedNiche="frames"
        nicheTitle="Custom Photos & Picture Frames"
        dealTierName={inquiryModal.dealTierName}
        skuQuantity={1}
        formattedPrice={inquiryModal.formattedPrice}
        currency={currency}
      />
    </div>
  );
}
