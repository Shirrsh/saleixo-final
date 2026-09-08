import { useState, useMemo } from 'react';
import { usePageMeta, buildBreadcrumbSchema } from '@/hooks/usePageMeta';
import { Check, ArrowRight, Star, Zap, ChevronDown, ShieldCheck, Clock, Sparkles, Search, Plus, X, Layers, Activity, CheckCircle2, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import USStandardsStrip from '@/components/USStandardsStrip';
import PricingLeadGate from '@/components/PricingLeadGate';
import { cn } from '@/lib/utils';
import { useCurrency } from '@/context/CurrencyContext';
import CurrencyToggle from '@/components/CurrencyToggle';
import imgHandmadeBasketCollection from '@/assets/services/handmade-basket-collection.webp';

// ── Data ──────────────────────────────────────────────────────────────────────

export const diagnosticSprints = [
  {
    name: 'ASIN Profit & Conversion Teardown Sprint',
    badge: 'Popular Entry Point',
    highlight: true,
    priceUSD: 199,
    priceINR: 14999,
    timeline: '3 Business Days Guaranteed',
    bestFor: 'Stagnant Amazon listings losing Buy Box or conversion rate to competitors',
    deliverables: [
      'Comprehensive 360° listing diagnostic against top 3 category leaders',
      'Helium 10 / Jungle Scout organic search term indexing gap analysis',
      'Main image click-through rate (CTR) teardown & 1 compliant mockup',
      'Algorithmic title rewrite + 5 benefit-driven, high-converting bullet points',
      'Executive summary PDF with actionable fixes you keep whether you hire us or not',
      '30-minute 1-on-1 strategy debrief call with senior strategist',
    ],
    cta: 'Book Teardown Sprint',
  },
  {
    name: 'Backend 249-Byte SEO & Indexation Sprint',
    badge: 'High Impact',
    highlight: false,
    priceUSD: 249,
    priceINR: 19999,
    timeline: '3–4 Business Days',
    bestFor: 'Sellers unsure if Amazon A9 is actually indexing their backend search terms',
    deliverables: [
      'Strict 249-byte de-duplication (no commas, no punctuation waste, no repetitions)',
      'Subject matter, intended use, and target audience field population',
      'Spanish/bilingual search terms harvesting for high-volume US marketplace',
      'Live indexation verification report confirming organic search visibility',
      'Direct Seller Central flat-file or manual entry upload instructions',
    ],
    cta: 'Book SEO Sprint',
  },
  {
    name: 'Shopify Core Web Vitals & Speed Sprint',
    badge: 'DTC Speed',
    highlight: false,
    priceUSD: 299,
    priceINR: 24999,
    timeline: '4 Business Days',
    bestFor: 'Shopify stores scoring under 50 on Google PageSpeed / mobile speed index',
    deliverables: [
      'Removal of legacy app orphan code snippets slowing down theme DOM',
      'Next-gen image format compression (WebP/AVIF) across all collections',
      'Third-party JavaScript deferrals & critical CSS loading optimization',
      'Target: 75+ Mobile / 90+ Desktop Google Core Web Vitals score',
      'Before-and-after speed benchmark report with zero layout shift',
    ],
    cta: 'Book Speed Sprint',
  },
  {
    name: 'Emergency ASIN Recovery & Suppression PoA',
    badge: 'Urgent 48h SLA',
    highlight: false,
    priceUSD: 349,
    priceINR: 27999,
    timeline: '24–48 Hours',
    bestFor: 'Suppressed, inactive, or policy-flagged Amazon ASINs costing daily revenue',
    deliverables: [
      'Immediate diagnostic of suppression root cause (image, title, policy flag)',
      'Bespoke 3-part Plan of Action (PoA) submission letter for Seller Support',
      'Title, bullet, and image compliance remediation to lift suppression',
      'Direct ticket escalation assistance until listing status is restored active',
      '30-day post-reinstatement monitoring to prevent recurrence',
    ],
    cta: 'Emergency Reinstatement',
  },
];

export const launchSprints = [
  {
    name: '14-Day Amazon Launch Sprint',
    badge: 'Flagship US Launch',
    highlight: true,
    priceUSD: 999,
    priceINR: 59999,
    timeline: '14 Business Days Guaranteed',
    bestFor: 'New US Amazon.com product drops & brand launches',
    deliverables: [
      'Full A9/A10 keyword indexing & search term strategy (up to 3 ASINs)',
      '5 Pure-white RGB 255 compliant main product shots / 3D renders',
      '2 Technical dimension / infographic feature callout graphics',
      '1 Custom-designed Standard A+ Content layout (5 modules)',
      'Backend search terms formulated within strict 249-byte limit',
      'Sponsored Ads PPC setup (SP, SB) + negative keyword harvesting',
      'Dedicated Slack Connect channel with daily US EST/PST overlap sync',
      '30-day post-launch rank velocity & indexing monitoring',
    ],
    cta: 'Book Amazon Sprint',
  },
  {
    name: 'Shopify Plus Enterprise Sprint',
    badge: 'Enterprise DTC',
    highlight: false,
    priceUSD: 1800,
    priceINR: 109999,
    timeline: '14–21 Business Days',
    bestFor: 'DTC brands scaling on Shopify or migrating to Shopify Plus',
    deliverables: [
      'Custom Checkout Extensibility & 1-click upsell architecture',
      '4 Custom Shopify Flow automations (VIP tagging, fraud hold, inventory, B2B)',
      'Native B2B wholesale setup (company profiles, price lists & net terms)',
      'Server-side Meta Conversions API (CAPI) & GA4 Measurement Protocol',
      'High-converting slide cart drawer with tiered shipping rewards',
      'Shopify Markets Pro multi-currency & localized duty configuration',
      'Dedicated Slack Connect channel with daily US EST/PST overlap sync',
      'Pre-launch stress test for high-volume flash sales (Launchpad ready)',
    ],
    cta: 'Book Shopify Sprint',
  },
  {
    name: '5-ASIN Catalog Overhaul Sprint',
    badge: 'Quick Win',
    highlight: false,
    priceUSD: 499,
    priceINR: 29999,
    timeline: '5–7 Business Days',
    bestFor: 'Active Amazon sellers with stagnant CTR or conversion lag',
    deliverables: [
      'Deep diagnostic audit of 5 existing ASINs against category leaders',
      'Algorithmic title rewrite & 5-benefit bullet formula',
      'Backend search terms expansion (Helium 10 & Jungle Scout data)',
      'Suppression risk audit & listing quality score remediation',
      'Search term gap analysis & indexation verification',
      'Before & after performance benchmark scorecard',
      'Dedicated Slack / email support during sprint',
    ],
    cta: 'Book Catalog Sprint',
  },
];

export const tiers = [
  {
    name: 'Starter',
    badge: null,
    priceUSD: 249,
    priceINR: 14999,
    setupUSD: 79,
    setupINR: 4999,
    contract: 'Month-to-month · 14-day notice',
    bestFor: 'Artisans, new Amazon / Shopify sellers, under 50 SKUs',
    features: [
      'Single marketplace launch (Amazon SPN or Shopify)',
      'Amazon SPN cataloging & A9 SEO (5 listings / month)',
      'Pure white RGB 255 photo editing (10 photos / month)',
      'Basic Shopify store setup layout or 1 A+ Content ASIN',
      'Basic Account Health & suppressed listing monitoring',
      'Monthly performance & ranking audit report',
      'Email support (48h response SLA)',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Growth',
    badge: 'Most Popular',
    priceUSD: 599,
    priceINR: 34999,
    setupUSD: 149,
    setupINR: 7999,
    contract: '3-month minimum, then monthly',
    bestFor: 'Growing Amazon sellers & Shopify stores ($1k–$10k/mo revenue)',
    features: [
      'Everything in Starter, plus:',
      'Multi-SKU catalog optimization & variations (15 listings / month)',
      'Standard A+ Content creation (3 module ASINs / month)',
      'Sponsored Products PPC setup & management (up to $2,000 ad spend)',
      'Shopify theme customization & Shopify Flow automations',
      '25 product photos / month (catalog + lifestyle composite)',
      'Account Health monitoring & policy compliance oversight',
      '2 social or paid ad platforms managed',
      'Bi-weekly strategy check-in & priority support (24h response SLA)',
    ],
    cta: 'Get Started',
    highlight: true,
  },
  {
    name: 'Pro',
    badge: null,
    priceUSD: 1299,
    priceINR: 74999,
    setupUSD: 249,
    setupINR: 14999,
    contract: '6-month minimum, then monthly',
    bestFor: 'Scaling mid-size brands & multi-ASIN catalogs ($10k–$100k/mo revenue)',
    features: [
      'Everything in Growth, plus:',
      'Unlimited Amazon cataloging & listing maintenance',
      'Premium A++ content (video carousels, hotspots) & Brand Story',
      'Amazon Brand Storefront design & navigation architecture',
      'Full PPC funnel management (Sponsored Products, Brands & Video, up to $10k spend)',
      'Daily AHR 200+ governance & rapid suppression recovery',
      'Shopify Plus checkout extensibility & CRO flywheel optimizations',
      'FBA inventory replenishment & stranded inventory recovery',
      'Dedicated account team via WhatsApp / Slack priority channel',
      'Weekly strategy steering calls & same-day support',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Enterprise',
    badge: null,
    priceUSD: null,
    priceINR: null,
    setupUSD: null,
    setupINR: null,
    startingUSD: 2499,
    startingINR: 149999,
    contract: '12-month minimum',
    bestFor: 'Established brands, aggregators, Shopify Plus & global cross-border sellers',
    features: [
      'Full-funnel Amazon SPN management (all 8 disciplines, cross-border global expansion)',
      'Shopify Plus headless, B2B wholesale & Shopify Markets multi-currency architecture',
      'Amazon DSP programmatic advertising & full-funnel CRO flywheel',
      'Dedicated full-stack account team (strategist, copywriter, designer, PPC specialist)',
      'Weekly executive steering calls & quarterly business reviews',
      'FBA supply chain, hazmat compliance & reimbursement audit workflows',
      'Custom SLAs with 4-hour critical issue response & white-glove onboarding',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export const photography = [
  { name: 'Pure White RGB 255 Catalog Photo (Amazon main image compliant)', usd: 15, inr: 1299 },
  { name: '360° Interactive Product Spin Shot (Multi-frame 360 view)', usd: 75, inr: 6499 },
  { name: 'Lifestyle Composite Photo (In-context styled rendering)', usd: 35, inr: 2999 },
  { name: 'Premium A+ Hero Infographic (Feature callouts & specs)', usd: 49, inr: 4199 },
  { name: '15s Sponsored Video / Unboxing Demo (Amazon video block)', usd: 149, inr: 12999 },
];

export const amazonSPN = [
  { name: 'A9/A10 Listing Optimization (Title, 5 bullets, search terms)', usd: 39, inr: 3299 },
  { name: 'Keyword Research Report (Reverse ASIN & competitor volume)', usd: 79, inr: 6599 },
  { name: 'Standard A+ Content creation (Up to 5 modules, per ASIN)', usd: 99, inr: 8499 },
  { name: 'Premium A++ Content (Video carousels, Q&A, hotspots)', usd: 199, inr: 16999 },
  { name: 'Brand Storefront design (Multi-page home + 3 category tabs)', usd: 499, inr: 41999 },
  { name: 'Sponsored Ads PPC setup (Sponsored Products, Brands & Display)', usd: 199, inr: 16999 },
  { name: '24–72h Rapid Suppression Recovery (Urgent listing triage)', usd: 149, inr: 12499 },
  { name: '3-Part POA Account Appeal (Root cause, actions, prevention)', usd: 299, inr: 24999 },
  { name: 'FBA Inbound Shipment Workflow (Box labels, 2D barcodes, SPD/LTL)', usd: 129, inr: 10999 },
  { name: 'Cross-Border Global Expansion (Marketplace sync US/UK/EU/JP)', usd: 149, inr: 12499 },
];

export const shopify = [
  { name: 'Shopify Store Setup 14-day (Online Store 2.0, 5 core pages)', usd: 599, inr: 49999 },
  { name: 'Shopify Flow Custom Automations (3 custom logic workflows)', usd: 199, inr: 16999 },
  { name: 'Meta CAPI & GA4 Server Tracking (Server-side deduplication)', usd: 149, inr: 12499 },
  { name: 'Slide Cart Drawer Engineering (Sticky cart & tiered upsells)', usd: 249, inr: 19999 },
  { name: 'Shopify Plus Checkout Extensibility (Custom UI & post-purchase)', usd: 499, inr: 41999 },
  { name: 'Shopify Plus B2B Wholesale (Price lists & wholesale portal)', usd: 599, inr: 49999 },
  { name: 'Shopify Markets Multi-Currency (Localized domains & duties)', usd: 299, inr: 24999 },
  { name: 'Platform Migration to Shopify (Full catalog, customer & orders)', usd: 499, inr: 41999 },
];

export const design = [
  { name: 'Packaging & Unboxing Design (Dielines, boxes & inserts)', usd: 299, inr: 24999 },
  { name: 'Amazon Brand Story Carousel (Desktop & mobile responsive)', usd: 149, inr: 12499 },
  { name: 'Social Media Ad Set (10 custom static & motion creatives)', usd: 149, inr: 12499 },
  { name: 'D2C Email Templates (Figma to Klaviyo responsive modular blocks)', usd: 199, inr: 16999 },
  { name: 'Marketplace Banner Suite (Hero banners & category headers)', usd: 99, inr: 8499 },
];

export const marketing = [
  { name: 'Multi-Marketplace Growth Strategy (Full-funnel diagnostic)', usd: 249, inr: 19999 },
  { name: 'Meta & Instagram Campaign Setup (Audience research & launch)', usd: 249, inr: 19999 },
  { name: 'Google Performance Max Setup (Feed optimization & smart bidding)', usd: 299, inr: 24999 },
  { name: 'CRO UX Audit (Core Web Vitals, checkout bottleneck analysis)', usd: 199, inr: 16999 },
];

export const redditMicroServices = [
  {
    name: 'Parent-Child Variation Family Breakdown & Flat-File Repair',
    category: 'Reddit Fixes',
    badge: 'Popular Reddit Fix',
    desc: 'Fixes broken variation families, unlinked reviews, and Error 8541 / 8572 flat-file feed upload rejections without deleting ASINs.',
    turnaround: '24–48 hrs',
    usd: 149,
    inr: 11999,
  },
  {
    name: 'Search-Suppressed ASIN Emergency Remediation & Compliance Appeal',
    category: 'Reddit Fixes',
    badge: 'Urgent Recovery',
    desc: 'Rapid diagnosis and correction for listings suppressed due to non-white background, title violations, or miscategorization.',
    turnaround: '24–48 hrs',
    usd: 199,
    inr: 15999,
  },
  {
    name: '249-Byte Backend Search Term De-duplication & Indexing Check',
    category: 'Reddit Fixes',
    badge: 'High Impact',
    desc: 'Eliminates commas, punctuation, and redundant keywords to maximize character efficiency within Amazon’s strict 249-byte limit.',
    turnaround: '2 days',
    usd: 99,
    inr: 7999,
  },
  {
    name: 'Amazon Brand Story Carousel Module (Storefront Cross-Link)',
    category: 'Reddit Fixes',
    badge: 'Conversion Booster',
    desc: 'Custom-designed desktop and mobile Brand Story carousel that sits above A+ content to cross-sell your entire product line.',
    turnaround: '3 days',
    usd: 179,
    inr: 14499,
  },
  {
    name: 'Pure White (RGB 255) 2000px High-Res Main Image Compliance 5-Pack',
    category: 'Reddit Fixes',
    badge: 'Compliance Essential',
    desc: 'Converts existing product photos into 100% Amazon-compliant pure white (RGB 255,255,255), 85% product frame fill, 2000px zoom.',
    turnaround: '24–48 hrs',
    usd: 79,
    inr: 6499,
  },
  {
    name: 'FBA Packaging Size-Tier Audit & Dimensional Weight Reduction',
    category: 'Reddit Fixes',
    badge: 'Margin Saver',
    desc: 'Redesigns inner packaging dielines to drop items into a lower FBA size tier, saving $1.50–$3.50 per unit shipped in fees.',
    turnaround: '3–5 days',
    usd: 149,
    inr: 11999,
  },
  {
    name: 'Listing Hijacker Infringement Escalation & Brand Registry PoA',
    category: 'Reddit Fixes',
    badge: 'Brand Protection',
    desc: 'Formal documentation and Brand Registry counterfeit report submission to remove unauthorized sellers from your branded listing.',
    turnaround: '24–48 hrs',
    usd: 149,
    inr: 11999,
  },
  {
    name: 'Cross-Border Listing Translation & Metric Localization (US to UK/EU)',
    category: 'Reddit Fixes',
    badge: 'Global Expansion',
    desc: 'Adapts US product titles, inches/lbs to cm/grams, UK/EU spelling, and marketplace-specific tax/bullet guidelines.',
    turnaround: '3 days',
    usd: 129,
    inr: 9999,
  },
  {
    name: 'Shopify Core Web Vitals & Liquid App-Bloat Cleanup',
    category: 'Reddit Fixes',
    badge: 'PageSpeed Boost',
    desc: 'Removes dead tracker scripts and unused app code left behind by uninstalled apps, boosting mobile speed score to 75+.',
    turnaround: '4 days',
    usd: 249,
    inr: 19999,
  },
  {
    name: 'TikTok Shop Integration & Shopify Inventory Two-Way Sync',
    category: 'Reddit Fixes',
    badge: 'Viral Channel',
    desc: 'Connects TikTok Shop Seller Center with Shopify, maps product categories, sets creator affiliate commissions, and verifies stock sync.',
    turnaround: '3–4 days',
    usd: 299,
    inr: 24999,
  },
];

export const notIncluded = [
  {
    item: 'Third-party ad spend',
    desc: 'Amazon PPC/DSP, Meta Ads, Google Ads ad budgets paid directly to the platforms',
    paidTo: 'Amazon / Meta / Google',
  },
  {
    item: 'Shopify subscription & Shopify Plus platform fees',
    desc: 'Monthly Shopify store subscriptions (Basic/Shopify/Advanced) or Shopify Plus enterprise licensing',
    paidTo: 'Shopify',
  },
  {
    item: 'Third-party apps & integrations',
    desc: 'External SaaS tool subscriptions (Klaviyo, Recharge, Gorgias, Helium 10, Jungle Scout)',
    paidTo: 'App Developers / SaaS Vendors',
  },
  {
    item: 'Amazon FBA referral/fulfillment fees',
    desc: 'Fulfillment, storage, pick & pack, return processing, and marketplace referral fees',
    paidTo: 'Amazon',
  },
  {
    item: 'Physical sample shipping',
    desc: 'Inbound courier shipping, freight, and customs duties for product photography samples',
    paidTo: 'Shipping Carrier / Customs',
  },
  {
    item: 'Trademark & Brand Registry legal filings',
    desc: 'Official government filing fees with USPTO, EUIPO, or IP India for trademark registration',
    paidTo: 'Government / Trademark Attorney',
  },
];


// ── Sub-components ────────────────────────────────────────────────────────────

const ServiceTable = ({ title, rows }: { title: string; rows: { name: string; usd: number; inr: number }[] }) => {
  const { currency, fmt } = useCurrency();
  return (
    <div>
      <h3 className="text-base font-bold text-foreground mb-3 uppercase tracking-wider">{title}</h3>
      <div className="rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-4 py-2.5 font-semibold text-foreground">Service</th>
              <th className="text-right px-4 py-2.5 font-semibold text-foreground">
                {currency}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={cn('border-t border-border', i % 2 === 0 ? 'bg-background' : 'bg-muted/20')}>
                <td className="px-4 py-2.5 text-foreground">{r.name}</td>
                <td className="px-4 py-2.5 text-right font-medium text-foreground">
                  <span className="text-muted-foreground font-normal text-xs mr-1">from</span>
                  {fmt(r.usd, r.inr)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const CustomPricing = () => {
  usePageMeta({
    title: 'Transparent Pricing — Saleixo',
    description: 'Request instant access to Saleixo’s verified 2026 rate card, monthly growth retainers, 14-day launch sprints, and on-demand studio deliverables for Amazon SPN and Shopify Plus.',
    structuredData: buildBreadcrumbSchema([
      { name: 'Home', url: 'https://saleixo.com/' },
      { name: 'Pricing', url: 'https://saleixo.com/custom-pricing' },
    ]),
  });
  const { fmt } = useCurrency();
  const [pricingTab, setPricingTab] = useState<'retainers' | 'sprints' | 'diagnostic'>('retainers');
  const [showCurrencySelector, setShowCurrencySelector] = useState(false);
  const [showAlaCarte, setShowAlaCarte] = useState(true);
  const [alaCarteCategory, setAlaCarteCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('saleixo_pricing_unlocked') === 'true';
  });

  const localAddOns = [
    { name: '48-hr Express Photo Delivery (Rush turnaround)', price: fmt(29, 2499) },
    { name: '24-hr Emergency Suppression Response (Rapid listing recovery)', price: fmt(49, 3999) },
    { name: 'Shopify Launchpad Event Support (Flash sale automation)', price: fmt(49, 3999) },
    { name: 'Dedicated Slack / WhatsApp Priority Channel (Real-time team access)', price: `${fmt(29, 2499)}/mo` },
    { name: 'Extra Revision Round (Beyond 2 included in plan)', price: fmt(15, 1299) },
    { name: 'Additional Marketplace Sync (Per global region)', price: `${fmt(29, 2499)}/mo` },
  ];

  const faq = useMemo(() => [
    {
      q: 'Are there any setup fees?',
      a: isUnlocked
        ? `Yes — Starter: ${fmt(79, 4999)}, Growth: ${fmt(149, 7999)}, Pro: ${fmt(249, 14999)}. Enterprise setup fees are custom. Setup fees are one-time and cover technical onboarding, account configuration, and initial strategy alignment.`
        : 'Setup fees vary by service tier and cover technical onboarding, account configuration, and initial strategy alignment. Complete the quick verification above to unlock our exact fee breakdown.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Starter plans require 14 days written notice. Growth requires 3-month minimum then monthly. Pro requires 6-month minimum then monthly. Enterprise requires 12-month minimum.',
    },
    {
      q: 'Do you offer refunds?',
      a: 'We offer pro-rated refunds for unused service days when cancellation notice is provided per the terms above. See our Cancellation & Refund Policy for full details.',
    },
    {
      q: 'Are Saleixo’s Amazon services compliant with Amazon Service Provider Network (SPN) standards?',
      a: 'Yes. Every deliverable — from Pure White RGB 255 main images to A9/A10 keyword indexing, flat-file category classification, and Plan of Action (PoA) appeal submissions — adheres strictly to Amazon Seller Central and SPN guidelines. We use 100% white-hat techniques with zero risk of compliance penalties.',
    },
    {
      q: 'Do you work with standard Shopify and Shopify Plus?',
      a: 'Yes. We support standard Shopify stores (Online Store 2.0 themes, app integrations, and conversion setup) as well as Shopify Plus enterprises requiring custom Checkout Extensibility, B2B wholesale portals, multi-store global architectures, and Launchpad automation.',
    },
    {
      q: 'Can I combine Amazon SPN services with Shopify services?',
      a: 'Absolutely. Many of our clients are omnichannel brands who sell on Amazon while building direct equity on Shopify. Our Pro and Enterprise tiers are designed specifically to synchronize catalog assets, photography, and brand identity across both platforms seamlessly.',
    },
    {
      q: 'How are we billed?',
      a: 'Monthly via Stripe (Visa, Mastercard, Amex, Apple Pay) or direct bank transfer. Invoices are issued on the 1st of each month for the upcoming service period.',
    },
    {
      q: 'Do you require access to our Seller Central or Shopify store?',
      a: "Yes — for most services we request limited secondary user permissions via Amazon's User Permissions or Shopify collaborator access. We never ask for your root login credentials, and access can be revoked by you at any time.",
    },
    {
      q: 'Will you sign an NDA?',
      a: 'Yes. Mutual NDAs are signed before any client onboarding or catalog asset transfer.',
    },
    {
      q: 'What currencies do you accept?',
      a: 'We bill primarily in USD for international clients, with support for Stripe and major international credit cards. Clients in India can also be invoiced in INR. You can use the currency converter at the top of the page to view indicative rates in your preferred local currency.',
    },
  ], [fmt, isUnlocked]);

  // Consolidated à-la-carte catalog
  const allAlaCarteServices = useMemo(() => [
    ...amazonSPN.map(s => ({
      name: s.name,
      category: 'amazon',
      categoryLabel: 'Amazon SPN',
      turnaround: '2–4 days',
      desc: 'Cataloging, A9 SEO keyword research, A+ content creation, PPC setup & listing compliance.',
      badge: 'Amazon SPN',
      usd: s.usd,
      inr: s.inr,
    })),
    ...photography.map(s => ({
      name: s.name,
      category: 'photography',
      categoryLabel: 'Photography & 3D',
      turnaround: '48–72 hrs',
      desc: 'RGB 255 compliant pure white catalog photography, lifestyle composite staging, and 3D renders.',
      badge: 'Studio Imaging',
      usd: s.usd,
      inr: s.inr,
    })),
    ...shopify.map(s => ({
      name: s.name,
      category: 'shopify',
      categoryLabel: 'Shopify Plus',
      turnaround: '3–7 days',
      desc: 'Checkout extensibility, Shopify Flow automations, slide cart drawers, and B2B wholesale portals.',
      badge: 'Shopify DTC',
      usd: s.usd,
      inr: s.inr,
    })),
    ...design.map(s => ({
      name: s.name,
      category: 'design',
      categoryLabel: 'Design & Creative',
      turnaround: '3–5 days',
      desc: 'Packaging dielines, Amazon Brand Story carousels, responsive Figma email templates, and ad sets.',
      badge: 'Creative Studio',
      usd: s.usd,
      inr: s.inr,
    })),
    ...marketing.map(s => ({
      name: s.name,
      category: 'marketing',
      categoryLabel: 'Paid Ads & CRO',
      turnaround: 'Ongoing / Sprint',
      desc: 'Multi-marketplace strategy, Google PMax setup, Meta ads management, and Core Web Vitals CRO audits.',
      badge: 'Growth Marketing',
      usd: s.usd,
      inr: s.inr,
    })),
  ], []);

  const filteredServices = useMemo(() => {
    return allAlaCarteServices.filter(item => {
      const matchesCat = alaCarteCategory === 'all' || item.category === alaCarteCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.categoryLabel.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [allAlaCarteServices, alaCarteCategory, searchQuery]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">

        {!isUnlocked ? (
          <>
            {/* ── Gated Hero ── */}
            <section className="pt-28 pb-8 px-4 text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
                <Lock className="w-3.5 h-3.5" />
                <span>Client Rate Card & Studio Sprints</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Transparent pricing for serious brand owners.
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Enter your details below to instantly unlock our verified 2026 retainers, fixed-scope launch sprints, and on-demand studio deliverables.
              </p>
              <p className="text-xs text-muted-foreground">
                Prices billed in USD · Invoiced securely via Stripe or direct bank transfer.
              </p>
            </section>

            {/* ── Lead Capture Gate ── */}
            <section className="px-4 pb-14 max-w-2xl mx-auto">
              <PricingLeadGate onUnlock={() => setIsUnlocked(true)} />
            </section>

            {/* ── Frosted Glass Preview Teaser Behind Gate ── */}
            <section className="px-4 pb-16 max-w-6xl mx-auto relative overflow-hidden pointer-events-none select-none">
              <div className="filter blur-md opacity-30 pointer-events-none select-none max-h-[360px] overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {tiers.slice(0, 3).map((tier, i) => (
                    <div key={i} className="p-6 rounded-2xl border border-border bg-card">
                      <h3 className="text-xl font-bold text-foreground mb-2">{tier.name}</h3>
                      <div className="text-3xl font-extrabold text-foreground mb-4">$*** /mo</div>
                      <ul className="space-y-2">
                        {tier.features.slice(0, 4).map((f, fi) => (
                          <li key={fi} className="text-sm text-muted-foreground flex items-center gap-2">
                            <Check className="w-4 h-4 text-primary" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background flex items-end justify-center pb-6">
                <div className="text-xs font-medium text-muted-foreground bg-card/85 backdrop-blur-md px-4 py-2 rounded-full border border-border shadow-sm flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-primary" />
                  <span>Complete verification above to instantly reveal all rates and packages</span>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* ── Hero (Unlocked) ── */}
            <section className="pt-28 pb-6 sm:pb-8 px-4 text-center">
              <div className="inline-flex items-center justify-between gap-4 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  2026 Transparent Rate Card Unlocked
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined') localStorage.removeItem('saleixo_pricing_unlocked');
                    setIsUnlocked(false);
                  }}
                  className="text-[10px] text-muted-foreground hover:text-foreground underline font-normal cursor-pointer"
                >
                  Lock View (Test)
                </button>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Clear pricing. Fast deliverables. No hidden fees.
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Compare monthly growth retainers, lock in a fixed-scope brand launch sprint, or pick individual diagnostic micro-services.
              </p>

              {/* Dual-experience USD indicator with subtle converter for international clients */}
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-muted/60 text-muted-foreground border border-border">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Standard USD Pricing
                  </span>
                  <span className="text-border">·</span>
                  <button
                    type="button"
                    onClick={() => setShowCurrencySelector((v) => !v)}
                    className="text-primary hover:underline font-medium focus:outline-none"
                  >
                    {showCurrencySelector ? 'Hide converter' : 'International client? Convert currency →'}
                  </button>
                </div>
                {showCurrencySelector && (
                  <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <CurrencyToggle />
                  </div>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                Prices billed in USD · Invoiced securely via Stripe or direct bank transfer.
              </p>
            </section>

            {/* ── Model Switcher Tabs (Retainers vs Launch Sprints vs Diagnostic Audits) ── */}
            <section className="px-4 pb-8 sm:pb-10 max-w-5xl mx-auto">
              <div className="p-1.5 rounded-2xl bg-muted/70 border border-border flex flex-col sm:flex-row items-center justify-center gap-1.5 max-w-2xl mx-auto shadow-inner">
                <button
                  type="button"
                  onClick={() => setPricingTab('retainers')}
                  className={cn(
                    'w-full sm:w-1/3 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2',
                    pricingTab === 'retainers'
                      ? 'bg-card text-foreground shadow-sm border border-border/80'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Layers className="w-4 h-4 text-primary" />
                  Monthly Retainers
                </button>
            <button
              type="button"
              onClick={() => setPricingTab('sprints')}
              className={cn(
                'w-full sm:w-1/3 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2',
                pricingTab === 'sprints'
                  ? 'bg-card text-foreground shadow-sm border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Clock className="w-4 h-4 text-primary" />
              14-Day Launch Sprints
            </button>
            <button
              type="button"
              onClick={() => setPricingTab('diagnostic')}
              className={cn(
                'w-full sm:w-1/3 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2',
                pricingTab === 'diagnostic'
                  ? 'bg-card text-foreground shadow-sm border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Activity className="w-4 h-4 text-amber-500" />
              Diagnostic Audits
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400">
                From $199
              </span>
            </button>
          </div>
        </section>

        {/* ── Tab 1: Monthly Growth Retainers ── */}
        {pricingTab === 'retainers' && (
          <section className="px-4 pb-10 md:pb-12 max-w-7xl mx-auto animate-in fade-in duration-200">
            <div className="text-center mb-8 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                Dedicated Monthly Growth Retainers
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Ongoing account management, continuous cataloging, weekly PPC tuning, and priority support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={cn(
                    'relative rounded-2xl border p-6 flex flex-col',
                    tier.highlight
                      ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                      : 'border-border bg-card',
                  )}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-primary text-primary-foreground">
                        <Star className="w-3 h-3" /> {tier.badge}
                      </span>
                    </div>
                  )}

                  <div className="mb-5">
                    <h3 className="text-xl font-bold text-foreground mb-1">{tier.name}</h3>
                    <p className="text-xs text-muted-foreground">{tier.bestFor}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-1">
                    {tier.priceUSD != null ? (
                      <>
                        <span className="text-4xl font-extrabold text-foreground">
                          {fmt(tier.priceUSD, tier.priceINR)}
                        </span>
                        <span className="text-muted-foreground text-sm">/mo</span>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl font-extrabold text-foreground">
                          From {fmt(tier.startingUSD, tier.startingINR)}
                        </span>
                        <span className="text-muted-foreground text-sm">/mo</span>
                      </>
                    )}
                  </div>

                  {/* Setup fee */}
                  <p className="text-xs text-muted-foreground mb-4">
                    {tier.setupUSD != null
                      ? `Setup fee: ${fmt(tier.setupUSD, tier.setupINR)} one-time`
                      : 'Setup fee: Custom'}
                  </p>

                  {/* Contract */}
                  <p className="text-xs font-medium text-foreground mb-5 pb-5 border-b border-border">
                    {tier.contract}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {tier.features.map((f, i) => (
                      <li
                        key={i}
                        className={cn(
                          'flex items-start gap-2 text-sm',
                          f.endsWith(':') ? 'font-semibold text-foreground mt-2' : 'text-muted-foreground',
                        )}
                      >
                        {!f.endsWith(':') && <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />}
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to="/get-started"
                    className={cn(
                      'w-full py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 hover:opacity-90',
                      tier.highlight
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-foreground text-background',
                    )}
                  >
                    {tier.cta} <ArrowRight className="inline w-4 h-4 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Tab 2: Fixed-Scope Launch Sprints ── */}
        {pricingTab === 'sprints' && (
          <section className="px-4 pb-10 md:pb-12 max-w-7xl mx-auto animate-in fade-in duration-200">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                US Brand Launch Sprints (Fixed-Scope, Fixed-Timeline)
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                Don't need a recurring monthly retainer? Lock in a guaranteed turnaround sprint with dedicated Slack Connect and daily US EST/PST overlap sync.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {launchSprints.map((sprint) => (
                <div
                  key={sprint.name}
                  className={cn(
                    'relative rounded-2xl border p-7 flex flex-col justify-between transition-all duration-200',
                    sprint.highlight
                      ? 'border-primary bg-primary/[0.03] shadow-xl shadow-primary/5 ring-1 ring-primary/30'
                      : 'border-border bg-card shadow-sm hover:shadow-md',
                  )}
                >
                  {sprint.badge && (
                    <div className="absolute -top-3 left-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-primary text-primary-foreground shadow-sm">
                        <Star className="w-3 h-3 fill-current" /> {sprint.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-foreground mb-1">{sprint.name}</h3>
                      <p className="text-xs text-muted-foreground">{sprint.bestFor}</p>
                    </div>

                    <div className="mb-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-foreground">
                        {fmt(sprint.priceUSD, sprint.priceINR)}
                      </span>
                      <span className="text-muted-foreground text-xs font-medium ml-1.5 uppercase tracking-wider">
                        one-time
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mb-6">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{sprint.timeline}</span>
                    </div>

                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      What's Delivered:
                    </div>
                    <ul className="space-y-2.5 mb-8">
                      {sprint.deliverables.map((d, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/get-started"
                    className={cn(
                      'w-full py-3.5 rounded-xl text-sm font-semibold text-center transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2 shadow-sm',
                      sprint.highlight
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-foreground text-background',
                    )}
                  >
                    {sprint.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Tab 3: Diagnostic & Audit Sprints (Low-Friction Entry Point) ── */}
        {pricingTab === 'diagnostic' && (
          <section className="px-4 pb-10 md:pb-12 max-w-7xl mx-auto animate-in fade-in duration-200">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                Diagnostic & Quick-Win Sprints
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                High-impact, fixed-cost audits that diagnose root bottlenecks and implement immediate ranking, indexing, or compliance fixes in 3–4 business days.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {diagnosticSprints.map((sprint) => (
                <div
                  key={sprint.name}
                  className={cn(
                    'relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200',
                    sprint.highlight
                      ? 'border-amber-500/60 bg-amber-500/[0.03] shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/30'
                      : 'border-border bg-card shadow-sm hover:shadow-md',
                  )}
                >
                  {sprint.badge && (
                    <div className="absolute -top-3 left-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-white shadow-sm">
                        <Sparkles className="w-3 h-3 fill-current" /> {sprint.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-foreground mb-1">{sprint.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{sprint.bestFor}</p>
                    </div>

                    <div className="mb-2">
                      <span className="text-3xl font-extrabold text-foreground">
                        {fmt(sprint.priceUSD, sprint.priceINR)}
                      </span>
                      <span className="text-muted-foreground text-xs font-medium ml-1.5 uppercase tracking-wider">
                        fixed fee
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{sprint.timeline}</span>
                    </div>

                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      Deliverables:
                    </div>
                    <ul className="space-y-2 mb-6">
                      {sprint.deliverables.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/get-started"
                    className="w-full py-3 rounded-xl text-xs sm:text-sm font-semibold text-center transition-all bg-foreground text-background hover:opacity-90 flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    {sprint.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Sample Deliverable Banner ── */}
        <section className="px-4 pb-10 md:pb-12 max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm relative group" style={{ aspectRatio: '16 / 7' }}>
            <img
              src={imgHandmadeBasketCollection}
              alt="Collection of handmade woven baskets styled for ecommerce catalog photography"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-medium text-white">
              Studio Deliverable · RGB 255 Catalog & In-Context Shoot
            </div>
          </div>
        </section>

        {/* ── On-Demand Studio Deliverables Suite ── */}
        <section className="px-4 pb-10 md:pb-12 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-2">Single-Scope Precision</p>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              On-Demand Studio Deliverables
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
              Need targeted execution without a monthly retainer? Commission specialized single-scope deliverables across Amazon SPN, Shopify Plus, commercial imaging, and performance creative.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
                {[
                  { id: 'all', label: 'All Solutions', count: allAlaCarteServices.length },
                  { id: 'amazon', label: '📦 Amazon SPN', count: amazonSPN.length },
                  { id: 'photography', label: '📸 Photography', count: photography.length },
                  { id: 'shopify', label: '🌐 Shopify Plus', count: shopify.length },
                  { id: 'design', label: '🎨 Design', count: design.length },
                  { id: 'marketing', label: '📣 Paid Ads', count: marketing.length },
                ].map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setAlaCarteCategory(cat.id)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 border',
                      alaCarteCategory === cat.id
                        ? 'bg-foreground text-background border-foreground shadow-sm'
                        : 'bg-card text-muted-foreground border-border hover:text-foreground hover:border-border-strong'
                    )}
                  >
                    <span>{cat.label}</span>
                    <span className={cn(
                      'text-[10px] px-1.5 py-0.2 rounded-full font-mono',
                      alaCarteCategory === cat.id ? 'bg-background/20 text-background' : 'bg-muted text-muted-foreground'
                    )}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Instant Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter (e.g. variation, A+, SEO)..."
                  className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {searchQuery && (
              <p className="text-xs text-muted-foreground pl-1">
                Found {filteredServices.length} service{filteredServices.length === 1 ? '' : 's'} matching "{searchQuery}".
              </p>
            )}
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-end mb-2.5">
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="w-3 h-3 text-muted-foreground/80" />
                      {service.turnaround}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-foreground mb-1.5 leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Starts from</span>
                    <span className="text-base font-extrabold text-foreground">
                      {fmt(service.usd, service.inr)}
                    </span>
                  </div>
                  <Link
                    to={`/get-started?service=${encodeURIComponent(service.name)}`}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-muted hover:bg-primary hover:text-primary-foreground text-foreground transition-colors border border-border/80"
                  >
                    Inquire <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="p-12 text-center rounded-2xl border border-dashed border-border">
              <Search className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground">No services found</p>
              <p className="text-xs text-muted-foreground mt-1">Try clearing your search query or selecting "All Solutions".</p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setAlaCarteCategory('all'); }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* ── Add-Ons Table ── */}
        <section className="px-4 pb-10 md:pb-12 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-2">Flexible Additions</p>
            <h2 className="text-2xl font-bold text-foreground">Add-On Capabilities</h2>
            <p className="text-xs text-muted-foreground mt-1">Optional speed enhancements and priority channels attachable to any plan.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="text-left px-5 py-3 font-semibold text-foreground text-xs uppercase tracking-wider">Add-On Feature</th>
                  <th className="text-right px-5 py-3 font-semibold text-foreground text-xs uppercase tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody>
                {localAddOns.map((a, i) => (
                  <tr key={i} className={cn('border-t border-border/60 transition-colors hover:bg-muted/20', i % 2 === 0 ? 'bg-background' : 'bg-card')}>
                    <td className="px-5 py-3.5 text-xs sm:text-sm text-foreground font-medium">{a.name}</td>
                    <td className="px-5 py-3.5 text-right font-semibold text-foreground text-xs sm:text-sm whitespace-nowrap">{a.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </>
    )}

    {/* ── What's Not Included ── */}
        <section className="px-4 pb-10 md:pb-12 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-2">Direct Provider Fees</p>
            <h2 className="text-2xl font-bold text-foreground">What's Not Included</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Third-party costs paid directly by you to platforms — never marked up or billed through Saleixo.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card overflow-x-auto shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="text-left px-5 py-3 font-semibold text-foreground text-xs uppercase tracking-wider">Item</th>
                  <th className="text-left px-5 py-3 font-semibold text-foreground text-xs uppercase tracking-wider">Description</th>
                  <th className="text-left px-5 py-3 font-semibold text-foreground text-xs uppercase tracking-wider whitespace-nowrap">Paid Directly To</th>
                </tr>
              </thead>
              <tbody>
                {notIncluded.map((n, i) => (
                  <tr key={i} className={cn('border-t border-border/60 transition-colors hover:bg-muted/20', i % 2 === 0 ? 'bg-background' : 'bg-card')}>
                    <td className="px-5 py-3.5 font-semibold text-foreground text-xs whitespace-nowrap">{n.item}</td>
                    <td className="px-5 py-3.5 text-xs text-muted-foreground leading-relaxed">{n.desc}</td>
                    <td className="px-5 py-3.5 text-xs font-medium text-foreground whitespace-nowrap">{n.paidTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── US Agency Rigor & Standards Strip ── */}
        <USStandardsStrip className="border-t border-border/40" />

        {/* ── High-Contrast Interactive FAQ Accordion (Bug Fixed) ── */}
        <section className="px-4 pb-10 md:pb-12 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-2">Real Answers</p>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Pricing Questions</h2>
            <p className="text-sm text-muted-foreground mt-2">Transparent details on billing cycles, onboarding fees, NDAs, and cancellations.</p>
          </div>

          <div className="space-y-3">
            {faq.map((item, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div
                  key={i}
                  className={cn(
                    'rounded-2xl border transition-all duration-200 overflow-hidden',
                    isOpen
                      ? 'border-primary/40 bg-card shadow-sm shadow-primary/5'
                      : 'border-border bg-card/60 hover:border-border-strong'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left group transition-colors cursor-pointer"
                  >
                    <span
                      className={cn(
                        'text-sm sm:text-base font-semibold transition-colors pr-4 leading-snug',
                        isOpen ? 'text-foreground' : 'text-foreground/90 group-hover:text-primary'
                      )}
                    >
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0',
                        isOpen && 'rotate-180 text-primary'
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 animate-in fade-in duration-150">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-4 pb-12 md:pb-16 max-w-2xl mx-auto text-center">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-sm">
            <Zap className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Not sure which plan fits?</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-6 leading-relaxed">
              Book a free discovery call — we audit your live listings first, then recommend the exact sprint or retainer. We diagnose the bottleneck before we quote a service.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/get-started"
                className="px-7 py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 bg-primary text-primary-foreground shadow-sm shadow-primary/20"
              >
                Book a Free Discovery Call <ArrowRight className="inline w-4 h-4 ml-1" />
              </Link>
              <a
                href="mailto:info@saleixo.com"
                className="px-7 py-3.5 rounded-xl text-sm font-semibold border border-border text-foreground transition-all hover:border-primary hover:text-primary bg-card"
              >
                Email Us
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              All pricing is subject to our{' '}
              <Link to="/terms" className="underline hover:text-foreground">Terms of Service</Link>{' '}
              and{' '}
              <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default CustomPricing;
