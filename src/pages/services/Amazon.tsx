import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Camera,
  FileText,
  Layers,
  TrendingUp,
  ShieldCheck,
  Store,
  Package,
  Globe,
  Check,
  ArrowRight,
  AlertTriangle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Lock,
  Eye,
  CheckCircle2,
  Clock,
  Search,
  HelpCircle,
  ShoppingCart,
  Shield,
  Sliders,
  Database,
  ArrowUpRight,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import USStandardsStrip from '@/components/USStandardsStrip';
import { usePageMeta, buildBreadcrumbSchema, ORG_ID } from '@/hooks/usePageMeta';

// Verified existing assets from src/assets/
import imgHero from '@/assets/design-service.jpg';
import imgJewelryEarrings from '@/assets/selected-work/jewelry-earrings-hero.webp';
import imgHomeStorageOrganizer from '@/assets/services/home-storage-organizer-hero.webp';
import imgBrassDiya from '@/assets/services/brass-diya-hero.webp';
import imgBeautyAmberBottle from '@/assets/selected-work/beauty-amber-bottle.webp';

// ── 8 Official Amazon SPN Service Pillars Data ─────────────────────────────────
interface PillarData {
  id: string;
  pillarNumber: string;
  badge: string;
  title: string;
  subtitle: string;
  categoryTag: string;
  icon: React.ElementType;
  sla: string;
  summary: string;
  deliverables: { title: string; desc: string }[];
  technicalSpecs: { label: string; value: string }[];
  guardrails: string[];
}

const SPN_PILLARS: PillarData[] = [
  {
    id: 'imaging',
    pillarNumber: 'Pillar 01',
    badge: 'SPN: Product Photography',
    title: 'Imaging & Visual Assets',
    subtitle: 'RGB 255 pure white packshots, macro textures, infographics & 4K listing video.',
    categoryTag: 'Visual Production',
    icon: Camera,
    sla: '48-Hour Studio Delivery',
    summary:
      'High-converting product photography engineered to Amazon Seller Central imaging standards. We produce pure white background main hero shots (RGB 255, 255, 255) calibrated for 5× optical zoom, dimension infographics that curb customer return rates, lifestyle staging, and short-form mobile listing videos.',
    deliverables: [
      {
        title: 'RGB 255 Main Hero Packshots',
        desc: 'Calibrated pure white background (#FFFFFF) with 85%+ product frame fill and natural contact shadows.',
      },
      {
        title: 'Infographic Spec Breakdowns',
        desc: 'Callout diagrams highlighting dimensions, materials, usage methods, and package contents for quick mobile skimming.',
      },
      {
        title: 'Macro Texture & Craft Details',
        desc: 'High-resolution close-ups capturing stitch density, metal grain, or cosmetic formula textures.',
      },
      {
        title: 'Mobile-Optimized Listing Video',
        desc: '15–30s 1080p/4K 16:9 product video featuring silent autoplay captions and benefit callouts.',
      },
    ],
    technicalSpecs: [
      { label: 'Background Color', value: 'RGB (255, 255, 255) pure hex #FFFFFF' },
      { label: 'Image Dimensions', value: '2,000 × 2,000 px standard (5× optical zoom)' },
      { label: 'Frame Fill Ratio', value: '85%+ of frame occupied by product' },
      { label: 'Color Profile', value: 'sRGB / CMYK Studio Pass' },
      { label: 'MAIN Image Guardrail', value: 'Zero non-product props, text watermarks, or packaging overlays' },
    ],
    guardrails: [
      '100% compliance pass guarantee on Amazon automated image audits',
      'Proprietary light-box staging ensuring zero gray cast on white edges',
      '48-hour delivery on standard studio catalog shoots',
    ],
  },
  {
    id: 'cataloging',
    pillarNumber: 'Pillar 02',
    badge: 'SPN: Cataloging & ASIN Architecture',
    title: 'Cataloging & Listing Optimization',
    subtitle: 'A9/A10 algorithmic title formulas, 5 benefit bullets & 249-byte backend keywords.',
    categoryTag: 'ASIN Architecture',
    icon: FileText,
    sla: '3–5 Business Days',
    summary:
      'Algorithmic listing architecture designed for dual-audience conversion: Amazon search indexing bots and high-intent shoppers. We build parent-child variation feeds, resolve category flat-file errors, craft 5-point benefit bullets, and maximize indexing within the strict 249-byte backend search term ceiling.',
    deliverables: [
      {
        title: 'Algorithmic Title Construction',
        desc: 'Engineered title formula balancing brand identity, high-volume search query volume, and primary specifications.',
      },
      {
        title: '5 High-Impact Benefit Bullets',
        desc: 'Capitalized benefit hooks backed by quantitative specifications, addressing customer purchase objections directly.',
      },
      {
        title: '249-Byte Backend Search Terms',
        desc: 'Byte-perfect UTF-8 backend keyword arrays with space delimitation, Spanish loan words, and zero punctuation waste.',
      },
      {
        title: 'Parent-Child Variation Feeds',
        desc: 'Flat-file feed architecture structuring size, color, and pack variations to consolidate reviews and sales velocity.',
      },
    ],
    technicalSpecs: [
      { label: 'Title Formula', value: '[Brand] + [Product Line] + [Primary Keyword] + [Key Spec] + [Variant]' },
      { label: 'Backend Keyword Cap', value: 'Strict 249 bytes (UTF-8 byte count, space-delimited)' },
      { label: 'Bullet Structure', value: 'CAPITALIZED HOOK + Feature Description + Metric' },
      { label: 'Error Codes Resolved', value: 'Error 8572 (UPC), 5665 (Brand), 5461 (Approval), 8541 (Conflict)' },
      { label: 'Category Style Guides', value: 'Strict adherence to category-specific Browse Node taxonomy' },
    ],
    guardrails: [
      'Zero keyword stuffing or subjective superlatives ("World\'s #1")',
      'Zero competitor brand names or trademarked terms in backend arrays',
      'Comprehensive flat-file submission with error validation before upload',
    ],
  },
  {
    id: 'a-plus',
    pillarNumber: 'Pillar 03',
    badge: 'SPN: Enhanced Brand Content',
    title: 'A+ & Premium A++ Content',
    subtitle: 'Standard 5-module layouts, Premium 7-module suites & Brand Story carousels.',
    categoryTag: 'Brand Content',
    icon: Layers,
    sla: '5–7 Business Days',
    summary:
      'Immersive enhanced brand content that converts window shoppers into committed buyers while lifting average order value. We create standard 5-module layouts and 7-module Premium A++ modules featuring interactive comparison matrices, ambient video loops, and Brand Story carousel sliders.',
    deliverables: [
      {
        title: 'Standard A+ (5 Modules)',
        desc: 'Full-width visual banners, technical specification grids, and feature comparison tables designed for desktop and mobile.',
      },
      {
        title: 'Premium A++ (7 Modules)',
        desc: 'Next-generation modules featuring interactive Q&A accordions, hover hotspots, video loops, and direct Add-to-Cart tables.',
      },
      {
        title: 'Brand Story Carousel Slider',
        desc: 'Standardized above-the-fold Brand Story module highlighting founder heritage, values, and full catalog cross-links.',
      },
      {
        title: 'Interactive Comparison Matrix',
        desc: 'Cross-selling table comparing features, dimensions, and use cases across your brand catalog to capture higher cart sizes.',
      },
    ],
    technicalSpecs: [
      { label: 'Module Configurations', value: 'Standard (up to 5 modules) or Premium A++ (up to 7 modules)' },
      { label: 'Mobile Rendering QA', value: 'Embedded typography legibility verified at 375px mobile viewport' },
      { label: 'Brand Story Setup', value: 'Full-width card carousel linking to brand catalog ASINs' },
      { label: 'Restricted Claims QA', value: 'Zero unverified FDA, medical, superlative, or off-Amazon URLs' },
      { label: 'Resolution Standard', value: 'Full-bleed retina desktop (1464px) & mobile responsive assets' },
    ],
    guardrails: [
      'Zero policy rejections via pre-submission claim verification',
      'Optimized image slice file sizes ensuring fast mobile load speeds',
      'Consistent brand typography and color palette alignment',
    ],
  },
  {
    id: 'advertising',
    pillarNumber: 'Pillar 04',
    badge: 'SPN: Advertising & PPC Optimization',
    title: 'Advertising & Full-Funnel PPC',
    subtitle: 'Sponsored Products, Brands & Display with search term harvesting and TACoS controls.',
    categoryTag: 'Growth Marketing',
    icon: TrendingUp,
    sla: 'Weekly Optimization Cycles',
    summary:
      'Data-driven Amazon advertising architecture focused on true bottom-line profitability (TACoS) rather than vanity ad spend. We structure campaigns into disciplined discovery and exact SKAG harvesting funnels, deploy Sponsored Brands Video, and utilize Search Query Performance insights.',
    deliverables: [
      {
        title: '3-Tier Campaign Hierarchy',
        desc: 'Full-funnel segmentation across Sponsored Products (SP), Sponsored Brands (SB/SBV), and Sponsored Display (SD).',
      },
      {
        title: 'Search Term Harvesting Funnel',
        desc: 'Automated harvesting moving proven, converting queries from auto/broad research campaigns into exact-match single-keyword ad groups.',
      },
      {
        title: 'Negative Keyword Pruning',
        desc: 'Weekly negative keyword sweeps eliminating non-converting search terms and stopping wasted budget drain.',
      },
      {
        title: 'Brand Analytics & SQP Analysis',
        desc: 'Monitoring search impression share, click share, and cart-add share via Amazon Brand Analytics to capture top-of-search placements.',
      },
    ],
    technicalSpecs: [
      { label: 'Campaign Structures', value: 'SP (Auto/Broad/Exact), SB (Headline/Store/Video), SD (ASIN/vCPM)' },
      { label: 'Optimization Frequency', value: 'Weekly bid adjustments, placement modifiers & negative pruning' },
      { label: 'Key Metrics Focus', value: 'Target TACoS (Total ACoS), ROAS, Organic Ranking Velocity' },
      { label: 'Dayparting Strategy', value: 'Hourly bid scaling matching category peak conversion windows' },
      { label: 'Financial Transparency', value: 'Ad spend billed directly by Amazon to client; 0% markup' },
    ],
    guardrails: [
      'Strict budget caps preventing unmonitored campaign overspend',
      'Client retains 100% direct ownership of advertising console & payment',
      'Granular placement modifier control (Top of Search vs Product Pages)',
    ],
  },
  {
    id: 'account-health',
    pillarNumber: 'Pillar 05',
    badge: 'SPN: Account Management & Health',
    title: 'Account Health & Protection',
    subtitle: 'Daily AHR 200+ governance, customer metric defense & 24–72 hr suppression recovery.',
    categoryTag: 'Account Defense',
    icon: ShieldCheck,
    sla: '24–72 Hr Recovery Turnaround',
    summary:
      'Proactive governance protecting your Amazon seller privileges. We monitor Account Health Rating (AHR) daily, defend customer service metrics (ODR < 1.0%), draft root-cause 3-part Plans of Action (POAs) for policy warnings, and rapidly recover search-suppressed listings and stranded inventory.',
    deliverables: [
      {
        title: 'Daily AHR Governance (200+ Target)',
        desc: 'Continuous monitoring of Seller Central Account Health dashboards to preempt policy warnings before penalties trigger.',
      },
      {
        title: 'Customer Metrics Shielding',
        desc: 'Monitoring Order Defect Rate (ODR < 1%), Late Shipment Rate (LSR < 4%), Pre-fulfillment Cancellation, and Valid Tracking Rate (VTR).',
      },
      {
        title: '3-Part Plan of Action (POA) Appeals',
        desc: 'Professional appeal drafting addressing Root Cause, Immediate Corrective Action, and Long-Term Systemic Preventative Protocols.',
      },
      {
        title: 'Listing Suppression Recovery',
        desc: 'Rapid diagnosis and remediation of search suppressions caused by missing attributes, pricing errors, or title compliance flags.',
      },
    ],
    technicalSpecs: [
      { label: 'AHR Target Buffer', value: '200+ Continuous Healthy Green score' },
      { label: 'Order Defect Rate (ODR)', value: 'Strictly under 1.0% threshold' },
      { label: 'POA Framework', value: 'Root Cause + Immediate Remediation + Systemic Safeguards' },
      { label: 'Suppression Recovery SLA', value: 'Typical 24–72 hour case turnaround' },
      { label: 'Policy Flags Covered', value: 'IP Complaints, Product Authenticity, Restricted Claims, Safety' },
    ],
    guardrails: [
      '24–72 hr rapid suppression diagnostic and recovery SLA',
      'Zero use of automated or boilerplate appeal templates',
      'Daily monitoring protocol with instant escalation upon policy warnings',
    ],
  },
  {
    id: 'storefronts',
    pillarNumber: 'Pillar 06',
    badge: 'SPN: Brand Stores',
    title: 'Brand Storefronts & Attribution',
    subtitle: 'Multi-page immersive stores, shoppable lifestyle pins & Amazon Attribution tags.',
    categoryTag: 'Storefront UX',
    icon: Store,
    sla: '7–10 Business Days',
    summary:
      'Custom-designed Amazon Brand Storefronts that provide an off-Amazon brand experience inside Seller Central. We architect multi-page navigation hierarchies, design shoppable collection pins, integrate ambient video headers, and implement Amazon Attribution tracking to measure ROI on external marketing.',
    deliverables: [
      {
        title: 'Multi-Page Information Architecture',
        desc: 'Structured navigation including Homepage, Category Sub-Pages, Best Sellers, New Releases, and Curated Collections.',
      },
      {
        title: 'Shoppable Lifestyle Pins',
        desc: 'Interactive lifestyle flat-lays and scene imagery allowing customers to click individual items and add to cart directly.',
      },
      {
        title: 'Video Header Banners',
        desc: 'Ambient looping brand video banners highlighting craftsmanship, usage context, and catalog range.',
      },
      {
        title: 'Amazon Attribution Integration',
        desc: 'UTM parameter tag setup (?tag=...) tracking traffic and sales from Meta Ads, Google Search, TikTok, and influencer links.',
      },
    ],
    technicalSpecs: [
      { label: 'Grid Guidelines', value: 'Amazon 3-tile and 4-tile responsive grid standards' },
      { label: 'Attribution Tracking', value: 'Full Amazon Attribution tag parameters for external ROI measurement' },
      { label: 'Mobile Optimization', value: 'Custom banner assets scaled specifically for Amazon Mobile App' },
      { label: 'Seasonal Staging', value: 'Rapid-deployment promotional headers for Prime Day, Q4 & festive sales' },
      { label: 'Eligibility Requirement', value: 'Requires active Amazon Brand Registry' },
    ],
    guardrails: [
      'Clean zero-distraction store navigation with clear category taxonomy',
      'Full compliance with Amazon Store content guidelines and image ratios',
      'Direct linking to indexed ASINs ensuring zero broken product cards',
    ],
  },
  {
    id: 'fba-logistics',
    pillarNumber: 'Pillar 07',
    badge: 'SPN: FBA Preparation & Inbound',
    title: 'FBA Preparation & Inbound Logistics',
    subtitle: 'Send to Amazon workflow, FNSKU barcoding, packaging prep & IPI score governance.',
    categoryTag: 'Fulfillment & Inventory',
    icon: Package,
    sla: '24-Hour Shipping Plan Creation',
    summary:
      'Seamless fulfillment operations keeping your inventory moving into Amazon fulfillment centers without receiving delays or storage penalties. We manage the "Send to Amazon" inbound workflow, generate compliant FNSKU labels, configure packaging specifications, and monitor your Inventory Performance Index (IPI).',
    deliverables: [
      {
        title: '"Send to Amazon" Workflow Ingestion',
        desc: 'Creation and confirmation of inbound shipping plans, box content declarations, pallet configurations, and 2D barcode labels.',
      },
      {
        title: 'FNSKU Barcode & Labeling Compliance',
        desc: 'Generation of compliant item-level FNSKU barcodes designed to cover existing manufacturer UPC/EAN barcodes.',
      },
      {
        title: 'Packaging & Polybag Compliance',
        desc: 'Verification of suffocation warnings on polybags (>5" opening), bubble wrap for fragile goods, and drop-test packaging.',
      },
      {
        title: 'IPI Score & Restock Forecasting',
        desc: 'Monitoring 90-day sell-through rate, stranded inventory %, and excess inventory % to prevent aged inventory surcharges.',
      },
    ],
    technicalSpecs: [
      { label: 'Inbound Workflow', value: 'Modern "Send to Amazon" workflow & carrier scheduling' },
      { label: 'Labeling Standard', value: 'Thermal-print FNSKU barcode labels with product title snippet' },
      { label: 'IPI Management', value: 'Governance of sell-through, excess inventory & stranded inventory' },
      { label: 'Stranded Inventory SLA', value: 'Stranded inventory alerts diagnosed and appealed within 24 hours' },
      { label: 'Packaging Standards', value: 'Amazon FBA carton weight (<50 lbs) and dimensions compliance' },
    ],
    guardrails: [
      'Zero warehouse check-in rejections or Amazon labeling surcharges',
      'Accurate case pack configuration preventing split shipments',
      'Proactive restock alerts factoring in supplier lead times',
    ],
  },
  {
    id: 'global-expansion',
    pillarNumber: 'Pillar 08',
    badge: 'SPN: Global Selling & Cross-Border',
    title: 'Global Selling & Cross-Border Launch',
    subtitle: 'Cross-border launch across US, CA, UK, EU, JP, AU, UAE & IN with cultural localization.',
    categoryTag: 'International Markets',
    icon: Globe,
    sla: '14–21 Days Per International Marketplace',
    summary:
      'Strategic international expansion enabling marketplace brands to scale across North America, Europe, APAC, and the Middle East. We navigate cross-border regulatory compliance, VAT/GST registration frameworks, EPR requirements, and provide native human localization for keyword indexing.',
    deliverables: [
      {
        title: 'Multi-Region Marketplace Onboarding',
        desc: 'Account linking and unified account setup for North America (US, CA, MX), Pan-EU/UK, Japan, Australia, and the Middle East (UAE, SA).',
      },
      {
        title: 'Native Cultural Localization',
        desc: 'High-intent keyword translation and culturally adapted product descriptions written by native speakers (not automated translation).',
      },
      {
        title: 'VAT, GST & EPR Regulatory Compliance',
        desc: 'Guidance through UK/EU VAT filing setup, German & French Extended Producer Responsibility (EPR) registrations, and UK Responsible Person.',
      },
      {
        title: 'Cross-Border Fulfillment Modeling',
        desc: 'Strategy for Remote Fulfillment with FBA (NARF), European Fulfillment Network (EFN), and in-country FBA landed cost economics.',
      },
    ],
    technicalSpecs: [
      { label: 'Target Marketplaces', value: 'US, CA, MX, UK, DE, FR, IT, ES, NL, PL, SE, JP, AU, UAE, SA, IN' },
      { label: 'Regulatory Framework', value: 'VAT/GST, EPR (Germany/France), UK Responsible Person compliance' },
      { label: 'Fulfillment Architectures', value: 'NARF, Pan-EU FBA, EFN, and direct multi-country imports' },
      { label: 'Localization Standard', value: 'Native human copywriting with regional search term volume analysis' },
      { label: 'Currency Economics', value: 'Landed cost modeling accounting for tariffs, FX, and import duties' },
    ],
    guardrails: [
      'Strict verification of regional safety certifications (CE, UKCA, FDA, BIS)',
      'Zero automated translation — every overseas listing is human-reviewed',
      'Transparent unit economics including localized FBA pick & pack fees',
    ],
  },
];

// ── Interactive Listing Health Diagnostic Data ─────────────────────────────────
interface DiagnosticChallenge {
  id: string;
  title: string;
  symptom: string;
  severity: 'Critical' | 'High' | 'Moderate';
  mappedPillarId: string;
  mappedPillarTitle: string;
  sla: string;
  rootCause: string;
  remediationPlan: string[];
}

const DIAGNOSTIC_CHALLENGES: DiagnosticChallenge[] = [
  {
    id: 'suppression',
    title: 'Search-Suppressed ASIN or Stranded Inventory',
    symptom: 'Product hidden from Amazon search results or stuck in stranded inventory status with zero sales.',
    severity: 'Critical',
    mappedPillarId: 'account-health',
    mappedPillarTitle: 'Pillar 05: Account Health & Suppression Recovery',
    sla: '24–72 Hours Resolution',
    rootCause:
      'Typically triggered by missing mandatory category attributes, non-compliant main image background, pricing anomalies, or trademark phrase flagging in backend terms.',
    remediationPlan: [
      'Extract backend category flat file to pinpoint exact suppression error codes (e.g. Error 8541/8572).',
      'Replace non-compliant asset with RGB 255 pure white studio packshot or correct attribute taxonomy.',
      'Submit category feed override and open priority Seller Support internal ticket if automated sync lags.',
      'Re-index ASIN and verify Buy Box visibility across mobile and desktop search within 72 hours.',
    ],
  },
  {
    id: 'ranking',
    title: 'Low Organic Keyword Ranking & Indexation Leaks',
    symptom: 'ASIN buried on page 3+ for primary buyer search queries; high reliance on expensive PPC.',
    severity: 'High',
    mappedPillarId: 'cataloging',
    mappedPillarTitle: 'Pillar 02: Cataloging & Listing Architecture',
    sla: '3–5 Business Days to Live Ingestion',
    rootCause:
      'Title lacks algorithmic keyword weighting; backend search terms exceed the 249-byte ceiling (causing Amazon to discard the entire array); missing high-intent customer search queries.',
    remediationPlan: [
      'Run Brand Analytics Search Query Performance (SQP) and competitor reverse-ASIN gap audit.',
      'Re-engineer title following [Brand] + [Line] + [Primary Keyword] + [Key Spec] + [Variant] formula.',
      'Construct strict 249-byte space-delimited backend keyword array without punctuation or duplicate words.',
      'Structure 5 benefit bullets with capitalized hooks to accelerate conversion velocity.',
    ],
  },
  {
    id: 'conversion',
    title: 'Poor Mobile Conversion & Missing A+ Content',
    symptom: 'Decent listing click-through rate (CTR), but low conversion rate (CVR < 8%) on mobile devices.',
    severity: 'High',
    mappedPillarId: 'a-plus',
    mappedPillarTitle: 'Pillar 03: A+ & Premium A++ Content',
    sla: '5–7 Business Days Design & Approval',
    rootCause:
      'Shoppers on the Amazon app cannot easily read desktop-sized graphics; absence of Brand Story carousel and comparison tables creates purchase hesitation.',
    remediationPlan: [
      'Audit mobile rendering at 375px viewport to ensure embedded banner text is instantly legible.',
      'Design comprehensive 5-module standard A+ or 7-module Premium A++ layout with technical spec tables.',
      'Deploy Brand Story carousel linking to your broader catalog to capture cross-sell demand.',
      'Verify zero restricted claims (FDA, superlatives, off-platform URLs) for first-pass Brand Registry approval.',
    ],
  },
  {
    id: 'advertising',
    title: 'High Advertising TACoS & Wasted PPC Spend',
    symptom: 'ACoS exceeds 45% and Total ACoS (TACoS) cuts deeply into operating profit margins.',
    severity: 'High',
    mappedPillarId: 'advertising',
    mappedPillarTitle: 'Pillar 04: Advertising & PPC Optimization',
    sla: 'Weekly Negative Pruning & Bid Restructure',
    rootCause:
      'Over-reliance on unconstrained Auto campaigns; lack of negative keyword harvesting; bidding on broad competitor terms without placement bid modifier controls.',
    remediationPlan: [
      'Isolate top-converting search terms and migrate them into dedicated exact-match SKAGs.',
      'Conduct rigorous negative keyword audit to eliminate non-converting clicks and wasteful spend.',
      'Deploy Sponsored Brands Video (SBV) on high-intent product queries for lower CPC and higher CTR.',
      'Implement category peak-hour dayparting and calibrate Top of Search bid multipliers.',
    ],
  },
  {
    id: 'ahr',
    title: 'Account Health Rating (AHR) Warnings & Policy Flags',
    symptom: 'AHR score dipping below 200, policy violation warnings, or suspected IP / authenticity notices.',
    severity: 'Critical',
    mappedPillarId: 'account-health',
    mappedPillarTitle: 'Pillar 05: Account Health Defense & POA Appeals',
    sla: 'Immediate 24-Hr Case Escalation',
    rootCause:
      'Unresolved customer complaints, intellectual property notices, restricted product keywords, or late dispatch metrics approaching threshold limits.',
    remediationPlan: [
      'Execute root-cause diagnostic across Seller Central Account Health and Voice of the Customer (VOC).',
      'Draft formal 3-part Plan of Action (POA): Root Cause, Immediate Correction, Systemic Safeguards.',
      'Compile supplier invoices, authorization letters, and packaging documentation for Amazon review.',
      'Establish daily monitoring safeguards to maintain a continuous 200+ healthy green score buffer.',
    ],
  },
  {
    id: 'crossborder',
    title: 'Cross-Border Expansion & International VAT Hurdles',
    symptom: 'Brand successful in home marketplace but uncertain how to enter North America, Europe, or Middle East.',
    severity: 'Moderate',
    mappedPillarId: 'global-expansion',
    mappedPillarTitle: 'Pillar 08: Global Selling & Cross-Border Launch',
    sla: '14–21 Days per Marketplace Launch',
    rootCause:
      'Unclear VAT/EPR registration paths, fear of automated translation failures, and lack of landed cost modeling accounting for international tariffs and multi-currency exchange.',
    remediationPlan: [
      'Evaluate target market demand and landed unit economics across North America, Pan-EU, and UAE/SA.',
      'Structure compliance framework for UK/EU VAT, German/French EPR, and packaging regulations.',
      'Provide native human translation and cultural keyword adaptation for local marketplace search indexing.',
      'Configure unified Seller Central account linkages and pilot Remote Fulfillment / Multi-Country FBA.',
    ],
  },
];

// ── Algorithm Mechanics Data (A9, A10 & Cosmos) ────────────────────────────────
const ALGORITHM_PILLARS = [
  {
    number: '01',
    title: 'Keyword Relevancy & Indexation',
    subtitle: 'Algorithmic Weighting & Semantic Match',
    description:
      'Amazon’s indexing engine assigns hierarchical weight to your ASIN data: Title (highest), Backend Search Terms (249 bytes), and Feature Bullets. We align every attribute with Amazon Browse Node taxonomy to ensure semantic match across exact and broad customer queries.',
    keyMetrics: ['Algorithmic Title Formula', '249-Byte Backend Ceiling', 'Browse Node Mapping'],
  },
  {
    number: '02',
    title: 'Conversion Velocity (CVR & CTR)',
    subtitle: 'Traffic Momentum & Organic Ranking',
    description:
      'The A9/A10 algorithm rewards listings that generate high click-through rates (CTR) and conversion rates (CVR). Pure white RGB 255 hero images win the click in search grids, while mobile-first benefit bullets and Premium A++ content turn visitors into confirmed orders.',
    keyMetrics: ['RGB 255 Main Image CTR', 'Mobile 375px Scannability', 'A++ Comparison Tables'],
  },
  {
    number: '03',
    title: 'Buy Box & Account Health Governance',
    subtitle: 'FBA Prime Status & Operational Stability',
    description:
      'Algorithm ranking favors sellers with continuous Prime fulfillment, high inventory in-stock rates, and an Account Health Rating (AHR) above 200. Maintaining Order Defect Rate (ODR) below 1.0% ensures uninhibited Buy Box ownership and algorithmic priority.',
    keyMetrics: ['AHR 200+ Green Buffer', 'ODR < 1.0% Defense', 'In-Stock Rate Monitoring'],
  },
  {
    number: '04',
    title: 'Voice of Customer & Defect Mitigation',
    subtitle: 'NCX Monitoring & Review Velocity',
    description:
      'Modern Amazon search ranking (including the neuro-symbolic Cosmos engine) monitors Negative Customer Experience (NCX) rates and return reasons. Our dimension callout infographics and accurate spec tables preempt sizing and expectation mismatch.',
    keyMetrics: ['NCX Rate Suppression Prevention', 'Dimension Infographics', 'Return Rate Reduction'],
  },
];

// ── Real Spec Gallery Items (RGB 255 Proof) ───────────────────────────────────
const SPEC_GALLERY = [
  {
    id: 1,
    src: imgJewelryEarrings,
    title: 'Handcrafted Earrings',
    category: 'Fine Jewelry / Handcrafted',
    specs: {
      background: 'RGB (255, 255, 255) / #FFFFFF',
      resolution: '2,000 × 2,000 px · 5× Zoom',
      fillRatio: '88% Frame Fill Ratio',
      shadow: 'Natural Contact Shadow Preserved',
    },
    tag: 'Pure White Spec Pass',
  },
  {
    id: 2,
    src: imgHomeStorageOrganizer,
    title: 'Home Storage Organizer',
    category: 'Home & Kitchen Storage',
    specs: {
      background: 'RGB (255, 255, 255) / #FFFFFF',
      resolution: '2,000 × 2,000 px · 5× Zoom',
      fillRatio: '86% Frame Fill Ratio',
      shadow: 'Zero Gray Edge Artifacts',
    },
    tag: 'Catalog Compliant',
  },
  {
    id: 3,
    src: imgBrassDiya,
    title: 'Traditional Brass Diya',
    category: 'Artisan Metalware / Decor',
    specs: {
      background: 'RGB (255, 255, 255) / #FFFFFF',
      resolution: '2,000 × 2,000 px · 5× Zoom',
      fillRatio: '89% Frame Fill Ratio',
      shadow: 'Accurate Metallic Luster Retention',
    },
    tag: 'Artisan Marketplace Pass',
  },
  {
    id: 4,
    src: imgBeautyAmberBottle,
    title: 'Amber Glass Beauty Bottle',
    category: 'Beauty & Personal Care',
    specs: {
      background: 'RGB (255, 255, 255) / #FFFFFF',
      resolution: '2,000 × 2,000 px · 5× Zoom',
      fillRatio: '85% Frame Fill Ratio',
      shadow: 'Zero Props / Zero Text Overlays',
    },
    tag: 'Cosmetic Policy Compliant',
  },
];

// ── 5-Stage Operational SLA Process Data ───────────────────────────────────────
const SLA_PROCESS_STEPS = [
  {
    step: '01',
    phase: 'Diagnostic & ASIN Audit',
    timeframe: 'Day 1–2',
    description:
      'Written 1–2 page catalog audit evaluating keyword indexing gaps, Account Health Rating, backend search term compliance, image compliance, and suppression risk.',
    deliverable: 'Written Comprehensive Diagnostic Report',
  },
  {
    step: '02',
    phase: 'Architecture & Keyword Blueprint',
    timeframe: 'Day 3–5',
    description:
      'Search term harvesting across Brand Analytics SQP, algorithmic title construction, 5 benefit-driven bullets, and strict 249-byte backend keyword arrays.',
    deliverable: 'Complete Copy & Keyword Master Document',
  },
  {
    step: '03',
    phase: 'Studio Imaging & Creative Production',
    timeframe: 'Day 6–10',
    description:
      '48-hour studio photography shoot, RGB 255 pure white retouching, dimension infographic creation, and mobile-first A+ / Premium A++ module composition.',
    deliverable: 'Retina Studio Visual Assets & A+ Slices',
  },
  {
    step: '04',
    phase: 'Seller Central Ingestion & Submission',
    timeframe: 'Day 11–14',
    description:
      'Flat-file feed upload, variation parent-child relationship schema setup, Brand Registry A+ publishing, and instant resolution of error codes (8572/5665).',
    deliverable: 'Live Ingestion & Brand Registry Approval',
  },
  {
    step: '05',
    phase: 'Organic Flywheel & PPC Scaling',
    timeframe: 'Day 15+',
    description:
      'Post-launch rank tracking, full-funnel PPC activation, weekly negative keyword pruning, dayparting adjustments, and daily Account Health defense.',
    deliverable: 'Weekly Optimization & TACoS Performance Reports',
  },
];

// ── Amazon DPP / SP-API Security Data ─────────────────────────────────────────
const DATA_SECURITY_ITEMS = [
  {
    icon: Lock,
    title: 'Cryptographic Encryption',
    standard: 'TLS 1.2+ in Transit · AES-256 at Rest',
    description:
      'All seller metrics, inventory reports, and catalog flat files are encrypted with industry-standard TLS 1.2+ protocols during transit and stored using AES-256 encryption at rest.',
  },
  {
    icon: Shield,
    title: 'Least-Privilege User Permissions',
    standard: 'Secondary User Access Only',
    description:
      'We strictly operate via Amazon Secondary User permissions with granular, least-privilege scoping. We never request, handle, or store master account credentials.',
  },
  {
    icon: ShieldCheck,
    title: 'Mandatory Multi-Factor Authentication',
    standard: 'Enforced on All Workstations',
    description:
      'All Saleixo operational personnel and systems require hardware or app-based Multi-Factor Authentication (MFA). Zero shared operator logins.',
  },
  {
    icon: Database,
    title: 'Mandatory 30-Day Data Disposal',
    standard: 'Privacy Policy Sections 9–14 Compliant',
    description:
      'Seller Central data is purged within 30 days upon conclusion of engagement or upon written request. Maximum 90-day retention ceiling strictly for operational fulfillment.',
  },
];

// ── FAQ Data ──────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'How does Saleixo access my Seller Central account?',
    a: 'We strictly access your account through Amazon Secondary User permissions (User Permissions in Seller Central). We provide an authorized operational email address, and you grant granular, role-based access only to the specific modules we manage (e.g. Manage Inventory, Advertising, or Performance). We never ask for your primary master credentials or bank verification information, fully adhering to Amazon Selling Partner API (SP-API) Data Protection Policies.',
  },
  {
    q: 'What is required to be eligible for Standard A+ and Premium A++ Content?',
    a: 'To access Standard A+ Content, your brand must be registered in the Amazon Brand Registry. For Premium A++ Content (which unlocks 7 interactive modules, video loops, interactive hover hotspots, and clickable Add-to-Cart tables), Amazon requires active Brand Registry, an approved Brand Story module published across all catalog ASINs, and a history of at least 15 approved A+ submissions across your account.',
  },
  {
    q: 'How does your 24–72 hour listing suppression recovery work?',
    a: 'When an ASIN is search-suppressed or stranded, we immediately pull category flat-file diagnostics to identify the exact rejection error code (such as Error 8541 matching conflict, Error 8572 barcode mismatch, missing mandatory browse attributes, or non-compliant hero image flags). We correct the underlying data schema, upload category-specific inventory feeds with partial-update flags, and if automated ingestion lags, escalate directly to Amazon Seller Support with proof documentation.',
  },
  {
    q: 'How is Amazon advertising spend handled and billed?',
    a: 'Your advertising spend is paid directly by you to Amazon via the payment method registered on your Amazon Advertising console. Saleixo never marks up your media spend or acts as an ad-dollar intermediary. We work on a transparent fixed monthly management tier or agreed performance structure, ensuring 100% financial transparency and zero conflict of interest.',
  },
  {
    q: 'What are the exact technical requirements for Amazon main hero images?',
    a: 'Amazon requires the main listing image to feature a pure white background with an exact color value of RGB (255, 255, 255). The product must occupy at least 85% of the total frame. Images must be minimum 1,600 × 1,600 px (our studio standard is 2,000 × 2,000 px to ensure crisp 5× optical zoom). Main images cannot contain packaging text overlays, non-product props, graphic borders, or promotional watermarks.',
  },
  {
    q: 'How long does it take for listing optimizations to reflect in organic ranking?',
    a: 'Amazon’s search indexing engine typically recognizes updated titles, bullet points, and backend search terms within 24 to 48 hours of flat-file ingestion. Organic ranking velocity compounds over 14 to 30 days as high-converting search queries trigger algorithmic velocity, reinforced by targeted PPC harvesting and customer order conversion.',
  },
  {
    q: 'Can Saleixo help launch our catalog in international Amazon marketplaces?',
    a: 'Yes. We manage end-to-end international expansion across North America (US, Canada, Mexico), Pan-EU and the UK (Germany, France, Italy, Spain, Netherlands, Poland, Sweden), Japan, Australia, the UAE, Saudi Arabia, and India. Our service includes regulatory guidance (UK/EU VAT, German/French EPR compliance), cross-border fulfillment modeling (NARF and EFN), and native human cultural localization.',
  },
  {
    q: 'Is our Seller Central data secure with Saleixo?',
    a: 'Yes, completely. Our operations are strictly governed by Sections 9–14 of our Privacy Policy, aligned with Amazon SP-API and Data Protection Policy (DPP) standards. All data in transit is protected via TLS 1.2+, data at rest is encrypted with AES-256, and access is governed by mandatory Multi-Factor Authentication. We adhere to a strict 30-day data disposal protocol upon client request or engagement conclusion.',
  },
];

const W = 'px-6 md:px-12 lg:px-20 xl:px-28';

const Amazon = () => {
  const [activePillar, setActivePillar] = useState<string>('imaging');
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<number>(0);
  const [activeSpecZoom, setActiveSpecZoom] = useState<number | null>(null);
  const [specZoomLevel, setSpecZoomLevel] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Close spec zoom modal on Escape key press and lock background scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveSpecZoom(null);
      }
    };
    if (activeSpecZoom !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setSpecZoomLevel(1);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeSpecZoom]);

  // Sync active pillar with hash if user enters via anchor link
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && SPN_PILLARS.some((p) => p.id === hash)) {
        setActivePillar(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // SEO & Structured Data (Breadcrumbs, Service & FAQPage Schema)
  usePageMeta({
    title: 'Amazon Flagship Hub & SPN Services — Saleixo',
    description:
      'Built to official Amazon SPN standards. End-to-end seller architecture: studio imaging, A9/A10 cataloging, Premium A++ Content, full-funnel PPC, account health defense, and global FBA expansion.',
    structuredData: [
      buildBreadcrumbSchema([
        { name: 'Home', url: 'https://saleixo.com/' },
        { name: 'Services', url: 'https://saleixo.com/services' },
        { name: 'Amazon Flagship Hub', url: 'https://saleixo.com/services/amazon' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Amazon Flagship Hub & SPN Services',
        url: 'https://saleixo.com/services/amazon',
        serviceType: 'Amazon Service Provider Network (SPN) Standard Services',
        provider: { '@id': ORG_ID },
        areaServed: ['IN', 'US', 'GB', 'FR', 'DE', 'AU', 'CA', 'JP', 'AE', 'SA'],
        description:
          'Comprehensive Amazon marketplace service architecture built to official SPN standards: imaging, cataloging, A++ content, full-funnel PPC, account health protection, storefronts, FBA, and global expansion.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Amazon SPN Service Pillars',
          itemListElement: SPN_PILLARS.map((p, idx) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: p.title,
              description: p.summary,
            },
            position: idx + 1,
          })),
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  });

  const activePillarObj = SPN_PILLARS.find((p) => p.id === activePillar) || SPN_PILLARS[0];
  const activeDiagnosticObj = DIAGNOSTIC_CHALLENGES[selectedDiagnostic];

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>
        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 1: FLAGSHIP HERO & METRIC CHIPS
            ═════════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden border-b border-border" style={{ minHeight: '92vh' }}>
          <div className="absolute inset-0 pointer-events-none hidden dark:block">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, hsl(215 45% 12%) 0%, hsl(220 35% 8%) 40%, hsl(222 30% 6%) 100%)',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                top: '-15%',
                right: '-5%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, hsl(217 91% 52% / 0.15) 0%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
          </div>
          <div className="absolute inset-0 pointer-events-none dark:hidden">
            <div
              className="absolute rounded-full"
              style={{
                top: '-10%',
                right: '5%',
                width: '560px',
                height: '560px',
                background: 'radial-gradient(circle, hsl(217 91% 52% / 0.08) 0%, transparent 65%)',
                filter: 'blur(60px)',
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row" style={{ minHeight: '92vh' }}>
            {/* Left Hero Content */}
            <div className={`flex flex-col justify-center ${W} pt-32 pb-16`} style={{ flex: '0 0 54%' }}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-5 flex flex-wrap items-center gap-2"
              >
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase"
                  style={{
                    background: 'hsl(var(--surface-elevated))',
                    border: '1px solid hsl(var(--border))',
                    color: 'hsl(var(--primary))',
                  }}
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
                  Amazon Flagship Hub
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium"
                  style={{
                    background: 'hsl(var(--surface))',
                    border: '1px solid hsl(var(--border))',
                    color: 'hsl(var(--muted-foreground))',
                  }}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Built to Official SPN Standards
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-extrabold leading-[1.06] tracking-tight mb-5 text-foreground"
                style={{
                  fontFamily: '"Inter Tight", Inter, sans-serif',
                  fontSize: 'clamp(2.3rem, 4.2vw, 3.8rem)',
                }}
              >
                Amazon Flagship Hub:{' '}
                <span className="text-primary block sm:inline">Built to Official SPN Standards.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-8 max-w-xl"
              >
                End-to-end seller architecture across all 8 official Amazon Service Provider Network disciplines:
                pure white studio imaging, A9/A10 cataloging, Premium A++ Content, full-funnel PPC, account health
                defense, and global FBA expansion. 100% policy-compliant execution for brand owners.
              </motion.p>

              {/* Checkable Metric Chips */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
              >
                <div
                  className="p-3 rounded-xl flex flex-col border border-border"
                  style={{ background: 'hsl(var(--surface-elevated))' }}
                >
                  <span className="text-xl font-extrabold text-foreground leading-none">24–72 hr</span>
                  <span className="text-[11px] text-muted-foreground mt-1">Suppression Recovery</span>
                </div>
                <div
                  className="p-3 rounded-xl flex flex-col border border-border"
                  style={{ background: 'hsl(var(--surface-elevated))' }}
                >
                  <span className="text-xl font-extrabold text-foreground leading-none">48 hr</span>
                  <span className="text-[11px] text-muted-foreground mt-1">Studio Imaging SLA</span>
                </div>
                <div
                  className="p-3 rounded-xl flex flex-col border border-border"
                  style={{ background: 'hsl(var(--surface-elevated))' }}
                >
                  <span className="text-xl font-extrabold text-foreground leading-none">249 Bytes</span>
                  <span className="text-[11px] text-muted-foreground mt-1">Strict Backend Cap</span>
                </div>
                <div
                  className="p-3 rounded-xl flex flex-col border border-border"
                  style={{ background: 'hsl(var(--surface-elevated))' }}
                >
                  <span className="text-xl font-extrabold text-foreground leading-none">200+</span>
                  <span className="text-[11px] text-muted-foreground mt-1">Target AHR Buffer</span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.36 }}
                className="flex flex-wrap items-center gap-3.5"
              >
                <Link
                  to="/get-started"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-95 shadow-sm"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
                >
                  Request Free Amazon Audit <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Link>
                <a
                  href="#spn-pillars"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border border-border text-foreground transition-all duration-200 hover:border-primary hover:text-primary hover:bg-surface-elevated"
                >
                  Explore 8 SPN Pillars <ChevronDown className="w-4 h-4" strokeWidth={1.75} />
                </a>
              </motion.div>
            </div>

            {/* Right Hero Visual Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden flex-1"
              style={{ minHeight: 460 }}
            >
              <img
                src={imgHero}
                alt="Amazon SPN Architecture and Studio Work"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none hidden lg:block" />

              {/* Status & Compliance Overlay Card */}
              <div className="absolute bottom-8 left-6 right-6 sm:left-10 sm:right-10">
                <div
                  className="p-5 rounded-2xl border backdrop-blur-md"
                  style={{
                    background: 'rgba(10, 10, 12, 0.78)',
                    borderColor: 'rgba(255, 255, 255, 0.14)',
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-white text-sm font-bold tracking-wide">
                        SP-API & DPP Compliant Operations
                      </p>
                    </div>
                    <span className="text-white/60 text-xs font-mono">TLS 1.2+ · AES-256</span>
                  </div>
                  <p className="text-white/80 text-xs leading-relaxed">
                    100% adherence to Amazon listing style guides and 24–72 hr suppression recovery SLA. All client catalog data is
                    governed under least-privilege secondary user permissions with mandatory 30-day disposal.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 2: 8-PILLARS QUICK-JUMP BAR
            ═════════════════════════════════════════════════════════════════════ */}
        <section className="py-4 border-b border-border sticky top-16 z-30 backdrop-blur-md bg-background/90 overflow-x-auto scrollbar-none">
          <div className={`${W} flex items-center gap-2 min-w-max`}>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-primary" />
              SPN Pillars:
            </span>
            {SPN_PILLARS.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                onClick={() => setActivePillar(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border flex items-center gap-1.5 ${
                  activePillar === p.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-surface hover:bg-surface-elevated text-foreground border-border'
                }`}
              >
                <p.icon className="w-3 h-3" strokeWidth={2} />
                <span>{p.title.split(' ')[0]}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 3: THE 8 OFFICIAL AMAZON SPN PILLARS (DEEP-DIVE & CONTRACTS)
            ═════════════════════════════════════════════════════════════════════ */}
        <section id="spn-pillars" className={`py-24 ${W} border-b border-border scroll-mt-20`}>
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 text-primary bg-primary/10">
              Official SPN Taxonomy
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
            >
              The 8 Official Amazon SPN Pillars.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Mapped directly to Amazon’s Service Provider Network taxonomy. Every deliverable is backed by checked
              technical specifications, rigorous policy guardrails, and defined operational SLAs.
            </p>
          </div>

          {/* Interactive Desktop Tabs */}
          <div role="tablist" aria-label="Amazon SPN Pillars" className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
            {SPN_PILLARS.map((p) => {
              const Icon = p.icon;
              const isActive = activePillar === p.id;
              return (
                <button
                  key={p.id}
                  role="tab"
                  id={`spn-tab-${p.id}`}
                  aria-selected={isActive}
                  aria-controls={`spn-panel-${p.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActivePillar(p.id)}
                  className={`p-3 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between gap-3 ${
                    isActive
                      ? 'bg-surface-elevated border-primary ring-1 ring-primary shadow-sm'
                      : 'bg-surface hover:bg-surface-elevated border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div
                      className={`p-2 rounded-lg ${
                        isActive ? 'bg-primary text-primary-foreground' : 'bg-surface-elevated text-muted-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-muted-foreground">{p.pillarNumber}</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground leading-snug line-clamp-2">{p.title}</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{p.sla.split(' ')[0] + ' SLA'}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Tab Interactive Inspection Card */}
          <div
            role="tabpanel"
            id={`spn-panel-${activePillar}`}
            aria-labelledby={`spn-tab-${activePillar}`}
            className="rounded-3xl p-6 sm:p-10 border border-border relative overflow-hidden mb-16"
            style={{ background: 'hsl(var(--surface))' }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-border">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-primary text-primary-foreground shadow-sm">
                  <activePillarObj.icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-primary uppercase">
                      {activePillarObj.pillarNumber}
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {activePillarObj.badge}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mt-0.5">
                    {activePillarObj.title}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold border"
                  style={{
                    background: 'hsl(var(--surface-elevated))',
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--foreground))',
                  }}
                >
                  <Clock className="w-3.5 h-3.5 inline mr-1 text-primary" />
                  {activePillarObj.sla}
                </span>
                <Link
                  to="/get-started"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-primary-foreground bg-primary hover:opacity-90 transition-opacity"
                >
                  Request Consultation
                </Link>
              </div>
            </div>

            <p className="text-base text-foreground/90 leading-relaxed mb-8 max-w-4xl">
              {activePillarObj.summary}
            </p>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Deliverables Column */}
              <div
                className="p-6 rounded-2xl border border-border"
                style={{ background: 'hsl(var(--card))' }}
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Key Scope Deliverables
                </h4>
                <div className="space-y-4">
                  {activePillarObj.deliverables.map((item) => (
                    <div key={item.title} className="text-left">
                      <h5 className="text-sm font-bold text-foreground leading-snug">{item.title}</h5>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Column */}
              <div
                className="p-6 rounded-2xl border border-border"
                style={{ background: 'hsl(var(--card))' }}
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-primary" />
                  Technical Compliance Specs
                </h4>
                <div className="space-y-3">
                  {activePillarObj.technicalSpecs.map((spec) => (
                    <div
                      key={spec.label}
                      className="p-2.5 rounded-xl border border-border text-xs"
                      style={{ background: 'hsl(var(--surface))' }}
                    >
                      <span className="text-muted-foreground font-medium block text-[11px] mb-0.5">
                        {spec.label}
                      </span>
                      <span className="font-mono font-semibold text-foreground break-words">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guardrails & SLA Column */}
              <div
                className="p-6 rounded-2xl border border-border flex flex-col justify-between"
                style={{ background: 'hsl(var(--card))' }}
              >
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Operational Safeguards
                  </h4>
                  <ul className="space-y-3 mb-6">
                    {activePillarObj.guardrails.map((g) => (
                      <li key={g} className="text-xs text-muted-foreground flex items-start gap-2.5 leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="p-4 rounded-xl border border-border"
                  style={{ background: 'hsl(var(--surface-elevated))' }}
                >
                  <p className="text-xs font-bold text-foreground mb-1">Guaranteed SLA Standard</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Every deliverable includes formal compliance validation before catalog ingestion.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Explicit Anchor Containers for Navigation Contracts:
              #imaging, #cataloging, #a-plus, #advertising, #account-health, #storefronts, #fba-logistics, #global-expansion
          */}
          <div className="mt-16">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6">
              Complete SPN Pillar Catalogue & Anchor Directory
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {SPN_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    id={pillar.id}
                    className="scroll-mt-28 p-6 sm:p-8 rounded-2xl border border-border flex flex-col justify-between transition-all duration-200 hover:border-primary/50"
                    style={{ background: 'hsl(var(--card))' }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                            <Icon className="w-5 h-5" strokeWidth={2} />
                          </div>
                          <div>
                            <span className="text-[11px] font-mono font-bold text-muted-foreground">
                              {pillar.pillarNumber}
                            </span>
                            <h4 className="text-lg font-bold text-foreground leading-snug">{pillar.title}</h4>
                          </div>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-elevated text-muted-foreground border border-border">
                          {pillar.sla}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                        {pillar.summary}
                      </p>

                      <div className="space-y-2 mb-6">
                        {pillar.deliverables.slice(0, 3).map((d) => (
                          <div key={d.title} className="flex items-start gap-2 text-xs">
                            <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} />
                            <span className="text-foreground/90 font-medium">{d.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
                      <span className="text-xs font-mono text-muted-foreground">#{pillar.id}</span>
                      <button
                        onClick={() => {
                          setActivePillar(pillar.id);
                          document.getElementById('spn-pillars')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                      >
                        Inspect Specifications <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 4: INTERACTIVE LISTING HEALTH & SPN READINESS DIAGNOSTIC WIDGET
            ═════════════════════════════════════════════════════════════════════ */}
        <section id="diagnostic" className={`py-24 ${W} border-b border-border scroll-mt-24`} style={{ background: 'hsl(var(--surface))' }}>
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 text-primary bg-primary/10">
              Interactive Self-Assessment
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
            >
              Listing Health & SPN Readiness Diagnostic.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Select your primary marketplace challenge below to see the exact root-cause diagnosis, mapped Amazon
              SPN discipline, remediation protocol, and operational recovery SLA.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Options Selector (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                Select Your Critical Bottleneck:
              </span>
              {DIAGNOSTIC_CHALLENGES.map((challenge, index) => {
                const isSelected = selectedDiagnostic === index;
                return (
                  <button
                    key={challenge.id}
                    onClick={() => setSelectedDiagnostic(index)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-card border-primary shadow-sm ring-1 ring-primary'
                        : 'bg-surface-elevated hover:bg-card border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-muted-foreground">0{index + 1}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          challenge.severity === 'Critical'
                            ? 'bg-red-500/10 text-red-600 dark:text-red-400'
                            : challenge.severity === 'High'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {challenge.severity}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-foreground leading-snug">{challenge.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{challenge.symptom}</p>
                  </button>
                );
              })}
            </div>

            {/* Right Dynamic Remediation Card (7 cols) */}
            <div
              className="lg:col-span-7 p-6 sm:p-9 rounded-3xl border border-border shadow-sm"
              style={{ background: 'hsl(var(--card))' }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-border">
                <div>
                  <span className="text-xs font-mono font-bold text-primary uppercase">Prescribed SPN Discipline</span>
                  <h4 className="text-lg font-bold text-foreground mt-0.5">{activeDiagnosticObj.mappedPillarTitle}</h4>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                  <Clock className="w-3.5 h-3.5 inline mr-1" />
                  {activeDiagnosticObj.sla}
                </span>
              </div>

              {/* Symptom & Root Cause */}
              <div className="mb-6 space-y-4">
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    Observed Symptom
                  </h5>
                  <p className="text-sm text-foreground/90 leading-relaxed bg-surface p-3.5 rounded-xl border border-border">
                    {activeDiagnosticObj.symptom}
                  </p>
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-primary" />
                    Root-Cause Technical Diagnosis
                  </h5>
                  <p className="text-sm text-muted-foreground leading-relaxed bg-surface p-3.5 rounded-xl border border-border">
                    {activeDiagnosticObj.rootCause}
                  </p>
                </div>
              </div>

              {/* Operational Remediation Protocol */}
              <div className="mb-8">
                <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  4-Step SPN Operational Remediation Protocol
                </h5>
                <div className="space-y-2.5">
                  {activeDiagnosticObj.remediationPlan.map((step, idx) => (
                    <div
                      key={step}
                      className="flex items-start gap-3 p-3 rounded-xl border border-border"
                      style={{ background: 'hsl(var(--surface))' }}
                    >
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  Includes full flat-file submission + 30-day index tracking.
                </p>
                <Link
                  to={`/get-started?issue=${activeDiagnosticObj.id}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-primary-foreground bg-primary hover:opacity-90 transition-opacity"
                >
                  Deploy Remediation Protocol <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 5: ALGORITHM MECHANICS (A9 / A10 / COSMOS DEEP-DIVE)
            ═════════════════════════════════════════════════════════════════════ */}
        <section id="algorithm" className={`py-24 ${W} border-b border-border scroll-mt-24`}>
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 text-primary bg-primary/10">
              Algorithmic Search Mechanics
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
            >
              How Amazon Ranks: A9, A10 & Cosmos Mechanics.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Amazon does not operate on subjective impressions. Ranking is governed by mathematical search engines
              evaluating text indexing, conversion momentum, Buy Box ownership, and return rates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALGORITHM_PILLARS.map((algo) => (
              <div
                key={algo.number}
                className="p-6 rounded-2xl border border-border flex flex-col justify-between"
                style={{ background: 'hsl(var(--surface))' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-2xl font-extrabold text-primary"
                      style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
                    >
                      {algo.number}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-surface-elevated text-muted-foreground border border-border">
                      Core Lever
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-1 leading-snug">{algo.title}</h3>
                  <p className="text-xs text-primary font-medium mb-3">{algo.subtitle}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-6">{algo.description}</p>
                </div>

                <div className="pt-4 border-t border-border space-y-1.5">
                  {algo.keyMetrics.map((metric) => (
                    <div key={metric} className="flex items-center gap-2 text-[11px] text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 6: RGB 255 PURE WHITE ZOOM SPEC GALLERY
            ═════════════════════════════════════════════════════════════════════ */}
        <section id="spec-gallery" className={`py-24 ${W} border-b border-border scroll-mt-24`} style={{ background: 'hsl(var(--surface))' }}>
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 text-primary bg-primary/10">
              Visual Compliance Proof
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
            >
              Main Image Standard: RGB (255, 255, 255) Pure White.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Every main packshot produced in our Noida studio is checked against Amazon Seller Central’s strict
              main-image criteria: exact RGB (255, 255, 255) pure hex #FFFFFF, 2000px 5× optical zoom, and 85%+
              frame fill.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {SPEC_GALLERY.map((item, idx) => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden border border-border flex flex-col transition-all duration-200 hover:shadow-md"
                style={{ background: 'hsl(var(--card))' }}
              >
                {/* Image Container with Pure #FFFFFF background */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveSpecZoom(idx);
                    setSpecZoomLevel(1);
                  }}
                  className="relative aspect-square overflow-hidden flex items-center justify-center p-6 cursor-pointer group w-full text-left focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ background: '#FFFFFF' }}
                  aria-haspopup="dialog"
                  aria-label={`Inspect ${item.title} 2000px specifications and zoom level`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-neutral-900 text-white shadow-sm">
                      {item.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-2.5 py-1.5 rounded-md text-[10px] font-semibold bg-neutral-900/90 text-white backdrop-blur-sm flex items-center gap-1.5 shadow">
                      <Eye className="w-3 h-3 text-primary" /> Inspect Specs
                    </span>
                  </div>
                </button>

                {/* Card Metadata */}
                <div className="p-5 flex flex-col justify-between flex-1 border-t border-border">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-foreground mt-0.5 mb-3">{item.title}</h4>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between py-1 border-b border-border text-muted-foreground">
                        <span>Background</span>
                        <span className="font-mono font-semibold text-foreground">RGB (255, 255, 255)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border text-muted-foreground">
                        <span>Resolution</span>
                        <span className="font-mono font-semibold text-foreground">2,000 × 2,000 px</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border text-muted-foreground">
                        <span>Frame Fill</span>
                        <span className="font-mono font-semibold text-foreground">{item.specs.fillRatio.split(' ')[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 flex items-center justify-between border-t border-border">
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>100% Amazon Pass</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSpecZoom(idx);
                        setSpecZoomLevel(1);
                      }}
                      className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-0.5"
                    >
                      Zoom <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Genuine Interactive Spec Zoom Modal / Lightbox */}
          <AnimatePresence>
            {activeSpecZoom !== null && SPEC_GALLERY[activeSpecZoom] && (() => {
              const activeItem = SPEC_GALLERY[activeSpecZoom];
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-sm"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="spec-modal-title"
                  onClick={() => setActiveSpecZoom(null)}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full max-w-5xl rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[92vh]"
                    style={{ background: 'hsl(var(--card))' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Left Viewport: Zoomable Image on Pure White Background */}
                    <div className="relative flex-1 bg-white min-h-[320px] sm:min-h-[400px] lg:min-h-[520px] flex items-center justify-center overflow-hidden p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-border">
                      {/* RGB 255 Badges */}
                      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 pointer-events-none">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-neutral-900 text-white shadow">
                          HEX #FFFFFF · RGB (255, 255, 255)
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-700 text-white shadow">
                          Pure White Pass
                        </span>
                      </div>

                      {/* Interactive Zoom Controls Strip */}
                      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 bg-neutral-900/90 text-white px-4 py-2.5 rounded-2xl backdrop-blur-sm shadow-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-neutral-300">Zoom:</span>
                          <button
                            type="button"
                            onClick={() => setSpecZoomLevel((prev) => Math.max(1, Number((prev - 0.25).toFixed(2))))}
                            className="p-1 rounded hover:bg-white/20 transition-colors disabled:opacity-40"
                            aria-label="Zoom out"
                            disabled={specZoomLevel <= 1}
                          >
                            <ZoomOut className="w-4 h-4" />
                          </button>
                          <input
                            type="range"
                            min="1"
                            max="2.5"
                            step="0.05"
                            value={specZoomLevel}
                            onChange={(e) => setSpecZoomLevel(parseFloat(e.target.value))}
                            className="w-24 sm:w-32 accent-primary h-1.5 bg-neutral-700 rounded-lg cursor-pointer"
                            aria-label="Inspection Zoom Level Slider"
                          />
                          <button
                            type="button"
                            onClick={() => setSpecZoomLevel((prev) => Math.min(2.5, Number((prev + 0.25).toFixed(2))))}
                            className="p-1 rounded hover:bg-white/20 transition-colors disabled:opacity-40"
                            aria-label="Zoom in"
                            disabled={specZoomLevel >= 2.5}
                          >
                            <ZoomIn className="w-4 h-4" />
                          </button>
                          <span className="text-xs font-mono font-semibold text-primary pl-1">
                            {Math.round(specZoomLevel * 100)}%
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {specZoomLevel > 1 && (
                            <button
                              type="button"
                              onClick={() => setSpecZoomLevel(1)}
                              className="text-[11px] font-mono flex items-center gap-1 text-neutral-300 hover:text-white px-2 py-1 rounded hover:bg-white/10"
                            >
                              <RotateCcw className="w-3 h-3" /> Reset
                            </button>
                          )}
                          <span className="hidden sm:inline text-[11px] text-neutral-400 font-mono">
                            2,000 × 2,000 px
                          </span>
                        </div>
                      </div>

                      {/* Displayed Image Container */}
                      <div className="w-full h-full flex items-center justify-center overflow-auto">
                        <img
                          src={activeItem.src}
                          alt={activeItem.title}
                          className="max-w-full max-h-[380px] lg:max-h-[460px] object-contain select-none transition-transform duration-150"
                          style={{
                            transform: `scale(${specZoomLevel})`,
                            transformOrigin: 'center center',
                          }}
                          draggable={false}
                        />
                      </div>
                    </div>

                    {/* Right Viewport: Technical Specifications & Verification */}
                    <div className="w-full lg:w-96 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-card">
                      <div>
                        {/* Header & Close Icon */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                              {activeItem.category}
                            </span>
                            <h3 id="spec-modal-title" className="text-lg sm:text-xl font-extrabold text-foreground mt-0.5">
                              {activeItem.title}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => setActiveSpecZoom(null)}
                            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            aria-label="Close specification inspector"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                          Inspected against Amazon Seller Central main image guidelines. Verified for RGB 255 pure white background compliance and 2,000px high-resolution zoom capability.
                        </p>

                        {/* Technical Spec Breakdown */}
                        <div className="space-y-3 mb-6">
                          <div className="p-3 rounded-xl border border-border bg-surface">
                            <div className="text-[11px] text-muted-foreground uppercase font-semibold">Background Hex / RGB</div>
                            <div className="text-sm font-mono font-bold text-foreground mt-0.5 flex items-center justify-between">
                              <span>RGB (255, 255, 255)</span>
                              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-sans font-semibold">0% Vignette</span>
                            </div>
                          </div>

                          <div className="p-3 rounded-xl border border-border bg-surface">
                            <div className="text-[11px] text-muted-foreground uppercase font-semibold">Pixel Dimensions</div>
                            <div className="text-sm font-mono font-bold text-foreground mt-0.5 flex items-center justify-between">
                              <span>2,000 × 2,000 px</span>
                              <span className="text-xs text-primary font-sans font-semibold">5× Optical Zoom</span>
                            </div>
                          </div>

                          <div className="p-3 rounded-xl border border-border bg-surface">
                            <div className="text-[11px] text-muted-foreground uppercase font-semibold">Frame Fill Percentage</div>
                            <div className="text-sm font-mono font-bold text-foreground mt-0.5 flex items-center justify-between">
                              <span>{activeItem.specs.fillRatio}</span>
                              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-sans font-semibold">&gt;85% Standard</span>
                            </div>
                          </div>

                          <div className="p-3 rounded-xl border border-border bg-surface">
                            <div className="text-[11px] text-muted-foreground uppercase font-semibold">Shadow & Boundary Detail</div>
                            <div className="text-xs font-mono font-medium text-foreground mt-0.5">
                              {activeItem.specs.shadow}
                            </div>
                          </div>
                        </div>

                        {/* Amazon Compliance Pass Summary */}
                        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
                          <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
                            <CheckCircle2 className="w-4 h-4" /> Amazon Main-Image Checklist Passed
                          </div>
                          <ul className="text-[11px] space-y-1 text-emerald-900/80 dark:text-emerald-200/80 font-medium">
                            <li>✓ Pure RGB 255 boundary on all four quadrants</li>
                            <li>✓ Product occupies &gt;85% of image frame</li>
                            <li>✓ Zero text overlays, watermarks, or badges</li>
                            <li>✓ Accurate color calibration & shadow retention</li>
                          </ul>
                        </div>
                      </div>

                      {/* Footer Navigation & Close */}
                      <div className="pt-4 border-t border-border flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveSpecZoom((prev) => (prev === null || prev <= 0 ? SPEC_GALLERY.length - 1 : prev - 1));
                              setSpecZoomLevel(1);
                            }}
                            className="p-2 rounded-lg border border-border hover:bg-muted text-foreground transition-colors"
                            aria-label="Previous sample"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <span className="text-xs font-mono text-muted-foreground px-1">
                            {activeSpecZoom + 1} / {SPEC_GALLERY.length}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveSpecZoom((prev) => (prev === null || prev >= SPEC_GALLERY.length - 1 ? 0 : prev + 1));
                              setSpecZoomLevel(1);
                            }}
                            className="p-2 rounded-lg border border-border hover:bg-muted text-foreground transition-colors"
                            aria-label="Next sample"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveSpecZoom(null)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold bg-foreground text-background hover:opacity-90 transition-opacity"
                        >
                          Close Inspector (Esc)
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          <div
            className="p-6 rounded-2xl border border-border flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ background: 'hsl(var(--card))' }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Need Compliant Catalog Packshots?</h4>
                <p className="text-xs text-muted-foreground">
                  Ship your samples to our Sector 62 Noida studio. 48-hour delivery on standard white-background shoots.
                </p>
              </div>
            </div>
            <Link
              to="/services/photography"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-foreground border border-border hover:border-primary hover:text-primary transition-colors whitespace-nowrap"
            >
              Explore Studio Photography
            </Link>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 7: 5-STAGE OPERATIONAL SLA PROCESS TIMELINE
            ═════════════════════════════════════════════════════════════════════ */}
        <section id="sla-process" className={`py-24 ${W} border-b border-border scroll-mt-24`}>
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 text-primary bg-primary/10">
              Operational Roadmap
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
            >
              The 5-Stage SPN Operational SLA Process.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              From audit diagnostic to live listing ingestion in 14–21 business days. Transparent turnaround
              commitments at every stage of the project.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SLA_PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl border border-border flex flex-col justify-between"
                style={{ background: 'hsl(var(--surface))' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-3xl font-extrabold text-border-strong"
                      style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
                    >
                      {step.step}
                    </span>
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-surface-elevated text-primary border border-border">
                      {step.timeframe}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-2 leading-snug">{step.phase}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{step.description}</p>
                </div>

                <div className="pt-3 border-t border-border">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-0.5">
                    Deliverable
                  </span>
                  <p className="text-xs font-semibold text-foreground">{step.deliverable}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 8: AMAZON DPP / SP-API DATA SECURITY ASSURANCE
            ═════════════════════════════════════════════════════════════════════ */}
        <section id="security" className={`py-24 ${W} border-b border-border scroll-mt-24`} style={{ background: 'hsl(var(--surface))' }}>
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10">
              <ShieldCheck className="w-3.5 h-3.5" />
              Data Security & Privacy
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
            >
              Amazon SP-API Data Protection Policy (DPP) Assurance.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Enterprise-grade data security governed under Sections 9–14 of our Privacy Policy. We ensure zero
              credential exposure, mandatory encryption, and automated 30-day deletion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {DATA_SECURITY_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl border border-border flex flex-col justify-between"
                  style={{ background: 'hsl(var(--card))' }}
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-1">{item.title}</h3>
                    <span className="text-[11px] font-mono text-primary font-semibold block mb-3">
                      {item.standard}
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="p-5 rounded-2xl border border-border flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ background: 'hsl(var(--card))' }}
          >
            <p className="text-xs text-muted-foreground leading-relaxed">
              Full legal details available in our published Privacy Policy under Sections 9 (SP-API Data Protection)
              and Section 13 (Mandatory 30-Day Disposal).
            </p>
            <Link
              to="/privacy"
              className="text-xs font-semibold text-primary hover:underline whitespace-nowrap inline-flex items-center gap-1"
            >
              Read Full Privacy Policy <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 9: COMPREHENSIVE FAQ ACCORDION
            ═════════════════════════════════════════════════════════════════════ */}
        <section id="faq" className={`py-24 ${W} border-b border-border scroll-mt-24`}>
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 text-primary bg-primary/10">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
            >
              Frequently Asked Questions on SPN Operations.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Straightforward answers about account onboarding, secondary user access, A+ eligibility, and advertising
              spend billing.
            </p>
          </div>

          <div className="max-w-4xl space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-border overflow-hidden transition-colors duration-200"
                  style={{ background: 'hsl(var(--card))' }}
                >
                  <button
                    type="button"
                    id={`faq-btn-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-foreground text-sm sm:text-base hover:text-primary transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        role="region"
                        aria-labelledby={`faq-btn-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            US AGENCY RIGOR & OPERATIONAL STANDARDS
            ═════════════════════════════════════════════════════════════════════ */}
        <USStandardsStrip className="border-t border-border" />

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 8: FINAL CALL TO ACTION
            ═════════════════════════════════════════════════════════════════════ */}
        <section className={`py-24 ${W}`}>
          <div
            className="rounded-3xl p-8 sm:p-14 text-center border border-border relative overflow-hidden"
            style={{ background: 'hsl(var(--card))' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 text-primary bg-primary/10">
              Free ASIN Diagnostic
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4 max-w-2xl mx-auto"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
            >
              Tell us your ASIN. We'll show you exactly what's holding back your ranking.
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              30-minute consultation + written 1–2 page catalog diagnostic report. You keep the full document whether
              you partner with us or not.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 justify-center mb-10">
              <Link
                to="/get-started"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 shadow-sm"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
              >
                Request Free Amazon Audit <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <Link
                to="/custom-pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold border border-border text-foreground transition-all duration-200 hover:border-primary hover:text-primary hover:bg-surface-elevated"
              >
                Explore Pricing & Packages
              </Link>
            </div>

            {/* Micro-trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground pt-6 border-t border-border">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                48-Hour Written Audit Turnaround
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                SP-API DPP Compliant Governance
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Noida Sector 62 Studio Facility
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Amazon;
