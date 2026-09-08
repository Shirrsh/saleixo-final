import { useState, useEffect } from 'react';
import { usePageMeta, buildBreadcrumbSchema } from '@/hooks/usePageMeta';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ShieldCheck,
  Clock,
  Layers,
  Users,
  Search,
  Zap,
  Sparkles,
  TrendingUp,
  Calendar,
  MessageCircle,
  ExternalLink,
  Sliders,
  Eye,
  FileCheck,
  Globe,
  Camera,
  ShoppingBag,
  Boxes,
  Cpu,
  BarChart3,
  RefreshCw,
  Maximize2,
  ChevronRight,
  Shield,
  Palette,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import GradientText from '@/components/GradientText';
import { useCurrency } from '@/context/CurrencyContext';
import { openCalendarBooking } from '@/lib/booking';

// ── Types ──────────────────────────────────────────────────────────────────
export type TrackId = 'amazon' | 'shopify' | 'multichannel';

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface Deliverable {
  title: string;
  desc: string;
}

export interface DisciplineData {
  id: string;
  disciplineNumber: string;
  badge: string;
  title: string;
  headline: string;
  icon: React.ElementType;
  sla: string;
  deepDiveUrl: string;
  ctaText: string;

  // Interactive Perspective States
  problem: {
    title: string;
    description: string;
    impactBullets: string[];
    riskSeverity: 'Critical' | 'High' | 'Moderate';
  };
  solution: {
    title: string;
    description: string;
    stepBullets: string[];
    guarantee: string;
  };

  // Tangible Parameters
  deliverables: Deliverable[];
  technicalSpecs: TechnicalSpec[];
  metricsTracked: string[];
}

export interface TrackData {
  id: TrackId;
  label: string;
  shortBadge: string;
  headline: string;
  description: string;
  accentColor: string;
  disciplines: DisciplineData[];
}

// ── Animation Variants ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
  }),
};

// ── Ecosystem Data Matrix (15 Disciplines) ──────────────────────────────────
const ECOSYSTEM_TRACKS: TrackData[] = [
  {
    id: 'amazon',
    label: 'Amazon Marketplace Track',
    shortBadge: 'Amazon Flagship',
    headline: 'Engineered to Amazon SPN Technical Guidelines',
    description:
      'Full-lifecycle ASIN engineering across imaging, algorithmic A9/A10 SEO, A++ brand content, TACoS advertising controls, and AHR 200+ account defense.',
    accentColor: '#f97316',
    disciplines: [
      {
        id: 'amazon-imaging',
        disciplineNumber: '01',
        badge: 'Pillar 01 · Visual Production',
        title: 'Imaging & 3D Video Production',
        headline: 'Pure white packshots and 4K mobile video calibrated to Seller Central zoom standards.',
        icon: Camera,
        sla: '48-Hour Studio Turnaround',
        deepDiveUrl: '/services/amazon#imaging',
        ctaText: 'Explore Amazon Imaging Specs',
        problem: {
          title: 'Main Image Search Suppression & Return Surges',
          description:
            'Listings suffer immediate search suppressions when main hero packshots feature off-white backgrounds (RGB values dropping to 248–250 with faint shadow edges) or under-85% product frame fill. Low-resolution images (<1600px) disable Amazon 5× optical zoom, frustrating mobile shoppers. Missing scale references and absent video drive 35%+ return rates due to "item not as expected."',
          impactBullets: [
            'Automated algorithm search suppression delisting ASINs from search results.',
            'Zero optical zoom on mobile viewports causing immediate shopper bounce.',
            'Up to 40% post-delivery return rates driven by misjudged product scale.',
          ],
          riskSeverity: 'Critical',
        },
        solution: {
          title: 'Calibrated RGB 255 Lighting & 4K Mobile Video',
          description:
            'We execute studio light-box shooting with calibrated strobes achieving guaranteed RGB (255, 255, 255) pure white (#FFFFFF) backgrounds with zero gray edge cast. High-resolution 2,000 × 2,000 px master files unlock crisp 5× optical zoom. We build dimension infographics with real-world scale references and produce 15–30s 4K/1080p listing videos with silent-autoplay captions.',
          stepBullets: [
            'Studio strobe calibration ensuring pure RGB 255 background with natural contact drop shadows.',
            'Tight 85%+ product frame fill cropping adhering to published Seller Central guidelines.',
            'Dimension callout graphic design resolving customer scale and fit uncertainties.',
            '15–30s 16:9 and 9:16 mobile listing video production with benefit text overlays.',
          ],
          guarantee: '100% compliance pass guarantee on Amazon automated image audits.',
        },
        deliverables: [
          { title: 'Pure White Main Hero', desc: '1× 2,000 × 2,000 px sRGB image with 100% pure white (#FFFFFF) background.' },
          { title: 'Infographics Suite', desc: '4–5× Dimension, scale comparison, and feature breakdown callouts.' },
          { title: '4K Listing Video', desc: '1× 15–30s 1080p/4K listing video with benefit captions for silent autoplay.' },
        ],
        technicalSpecs: [
          { label: 'Background', value: 'Hex #FFFFFF / RGB (255, 255, 255)' },
          { label: 'Resolution', value: '2,000 × 2,000 px (5× Optical Zoom)' },
          { label: 'Frame Fill', value: '85%+ Product Coverage' },
          { label: 'Video Format', value: '1080p/4K 30fps H.264' },
        ],
        metricsTracked: ['Zero image suppressions', '+25–35% Mobile CTR', 'Measurable return reduction'],
      },
      {
        id: 'amazon-cataloging',
        disciplineNumber: '02',
        badge: 'Pillar 02 · ASIN Architecture',
        title: 'Cataloging & A9/A10 SEO Architecture',
        headline: 'Algorithmic title engineering, 5 benefit bullets & byte-perfect backend keyword arrays.',
        icon: FileCheck,
        sla: '3–5 Business Days',
        deepDiveUrl: '/services/amazon#cataloging',
        ctaText: 'Explore Catalog Architecture',
        problem: {
          title: 'Algorithmic Invisibility & Flat-File Ingestion Errors',
          description:
            'Listings disappear from organic search when backend search terms exceed Amazon strict 249-byte UTF-8 cap, causing the entire search term field to be discarded by the indexing bot. Feed upload failures (Error 8572 UPC mismatch, Error 5665 Brand Authorization, Error 8541 matching conflict) leave ASINs uneditable and stranded, while unlinked child ASINs scatter reviews.',
          impactBullets: [
            'Total algorithmic truncation when backend search terms reach 250+ bytes.',
            'Feed validation rejections (Errors 8572, 5665, 5461, 8541) blocking launches.',
            'Fragmented review momentum across separated color and size variants.',
          ],
          riskSeverity: 'Critical',
        },
        solution: {
          title: 'Dual-Audience Algorithmic Architecture',
          description:
            'We engineer listings for dual conversion: A9/A10 indexing algorithms and high-intent shoppers. We formulate titles using weighted syntax ([Brand] + [Product Line] + [Primary Keyword] + [Key Spec] + [Variant]), craft 5 quantitative benefit bullets, curate byte-verified backend arrays (<249 bytes with zero punctuation waste), and structure consolidated parent-child variation feeds.',
          stepBullets: [
            'High-intent keyword frequency research using Brand Analytics and reverse-ASIN data.',
            'Algorithmic title construction balancing keyword weight and mobile readability.',
            'Strict 249-byte UTF-8 backend keyword array generation with space delimitation.',
            'Flat-file variation feed creation (.xlsm) resolving UPC, brand, and category node conflicts.',
          ],
          guarantee: 'Zero keyword stuffing; 100% flat-file validation pass rate before submission.',
        },
        deliverables: [
          { title: 'Listing Copy Suite', desc: 'Algorithmic title, 5 capitalized benefit bullets, and formatted description.' },
          { title: '249-Byte Backend Array', desc: 'Byte-perfect UTF-8 search terms with zero punctuation waste.' },
          { title: 'Consolidated Upload Feed', desc: 'Parent-child variation template (.xlsm / TSV) ready for ingestion.' },
        ],
        technicalSpecs: [
          { label: 'Title Syntax', value: '150–190 chars (optimized for 70-char mobile cutoff)' },
          { label: 'Backend Cap', value: 'Strict ≤249 UTF-8 bytes (space-delimited)' },
          { label: 'Bullet Structure', value: 'CAPITALIZED HOOK + Benefit + Quantitative Spec' },
          { label: 'Taxonomy', value: 'Exact Item Type Keyword & Browse Node ID' },
        ],
        metricsTracked: ['100% Target indexation rate', 'Organic Keyword Rank velocity', 'BSR momentum'],
      },
      {
        id: 'amazon-aplus',
        disciplineNumber: '03',
        badge: 'Pillar 03 · Brand Content',
        title: 'Standard A+ & Premium A++ Content',
        headline: 'Immersive 7-module brand suites, interactive comparison matrices & Brand Story carousels.',
        icon: Palette,
        sla: '5–7 Business Days',
        deepDiveUrl: '/services/amazon#a-plus',
        ctaText: 'Explore A+ Content Suites',
        problem: {
          title: 'Detail Page Abandonment & Competitor Conquesting',
          description:
            'Default text descriptions fail on mobile viewports where 70%+ of Amazon purchases occur. Unoptimized detail pages allow aggressive competitor sponsored ads in the "Compare with similar items" carousel to siphon away buyers. Lack of brand trust and visual answers to pre-purchase questions lead to high bounce rates and lower average order values.',
          impactBullets: [
            'Up to 65% mobile drop-off on unbranded, text-heavy product listings.',
            'Competitor conquesting ads siphoning shoppers from the lower half of the detail page.',
            'Lower average basket size from missing cross-category product recommendations.',
          ],
          riskSeverity: 'High',
        },
        solution: {
          title: 'Defensive Brand Story & Cross-Sell Matrix',
          description:
            'We design custom Standard A+ (up to 5 modules) and Premium A++ suites (up to 7 modules) featuring full-width visual banners, interactive comparison tables, hover hotspots, and Brand Story carousel sliders. The interactive matrix cross-sells related catalog ASINs, keeping shoppers locked inside your brand ecosystem while defending detail page real estate.',
          stepBullets: [
            'Information architecture mapping customer purchase objections and FAQs.',
            'Full-bleed desktop (1464px) and mobile-responsive asset graphic production.',
            'Interactive comparison matrix development linking catalog ASINs for higher AOV.',
            'Brand Story carousel deployment highlighting founder heritage and catalog depth.',
          ],
          guarantee: 'Zero policy rejections; claims verified against Amazon restricted words guidelines.',
        },
        deliverables: [
          { title: 'Custom Module Suite', desc: 'Standard A+ (5 modules) or Premium A++ (7 modules) graphic layouts.' },
          { title: 'Brand Story Carousel', desc: 'Interactive slider linking your full catalog and brand heritage.' },
          { title: 'Comparison Matrix Table', desc: 'ASIN cross-sell grid highlighting specs, pricing tiers, and variations.' },
        ],
        technicalSpecs: [
          { label: 'Desktop Canvas', value: '1464 px full-bleed retina display' },
          { label: 'Mobile Optimization', value: '100% typography legibility on 375px viewports' },
          { label: 'Compliance Audit', value: 'Zero medical claims, warranty flags, or off-site URLs' },
        ],
        metricsTracked: ['+12–20% Conversion rate lift', 'Catalog cross-sell velocity', 'AOV growth'],
      },
      {
        id: 'amazon-advertising',
        disciplineNumber: '04',
        badge: 'Pillar 04 · Growth Marketing',
        title: 'Advertising & TACoS Profitability Control',
        headline: 'Segmented SP/SB/SD campaign funnels, search term harvesting & strict TACoS profitability.',
        icon: TrendingUp,
        sla: 'Weekly Optimization Cycles',
        deepDiveUrl: '/services/amazon#advertising',
        ctaText: 'Explore Advertising Strategy',
        problem: {
          title: 'TACoS Bleed & Broad-Match Budget Depletion',
          description:
            'Unsegmented ad campaigns lump discovery keywords and high-intent queries together, causing broad match bleed where daily ad budgets are exhausted on irrelevant clicks before peak evening shopping hours. Branded keyword cannibalization creates an illusion of high ROAS while Total ACoS (TACoS) spirals past 40%, eroding operating margins without driving organic rank lift.',
          impactBullets: [
            'TACoS escalating above 35–45% wiping out product net profit margins.',
            'Daily ad budgets exhausted by 2 PM due to unoptimized broad search term bleed.',
            'Artificial ROAS reporting driven by bidding on organic brand traffic.',
          ],
          riskSeverity: 'Critical',
        },
        solution: {
          title: 'Disciplined Funnel Segmentation & Placement Modifiers',
          description:
            'We structure Amazon advertising into a disciplined 3-tier hierarchy: Discovery (Auto/Broad), Evaluation (Category/ASIN targeting), and Conversion (Exact-match single keyword ad groups). A weekly harvesting engine promotes profitable queries while negative keyword pruning eliminates wasted ad spend. Granular placement modifiers and dayparting deploy budget during peak conversion windows.',
          stepBullets: [
            'Campaign isolation across Sponsored Products, Sponsored Brands Video, and Sponsored Display.',
            'Weekly search term harvesting funnel transitioning proven queries to exact match.',
            'Aggressive negative keyword pruning eliminating non-converting search terms.',
            'Top-of-Search placement modifiers and hourly dayparting matched to buyer traffic.',
          ],
          guarantee: '0% agency markup on ad spend; client maintains direct ad console ownership.',
        },
        deliverables: [
          { title: '3-Tier Campaign Hierarchy', desc: 'Segmented Discovery, Evaluation, and Exact-Match Conversion structure.' },
          { title: 'Search Term Harvesting', desc: 'Weekly negative keyword pruning and profitable query promotion engine.' },
          { title: 'Executive ROAS Dashboard', desc: 'Weekly TACoS, Blended ACoS, and organic rank momentum tracking.' },
        ],
        technicalSpecs: [
          { label: 'Cadence', value: 'Weekly bid re-indexing and placement tuning' },
          { label: 'Budget Safety', value: 'Hard caps preventing unmonitored overspend' },
          { label: 'Anchor KPI', value: 'Target TACoS maintained under 12–18%' },
        ],
        metricsTracked: ['TACoS reduction (<15–20%)', 'Top-of-Search Impression Share', 'Organic Rank Velocity'],
      },
      {
        id: 'amazon-account-health',
        disciplineNumber: '05',
        badge: 'Pillar 05 · Account Defense',
        title: 'Account Health & Protection (AHR 200+)',
        headline: 'Daily Seller Central governance, customer metric defense & 24–72 hr suppression recovery.',
        icon: ShieldCheck,
        sla: '24–72 Hour Recovery Turnaround',
        deepDiveUrl: '/services/amazon#account-health',
        ctaText: 'Explore Account Health Defense',
        problem: {
          title: 'Sudden Account Suspension & Stranded FBA Stock',
          description:
            'Policy strikes, intellectual property complaints, product authenticity flags, or restricted keyword triggers can suddenly plunge the Account Health Rating (AHR) below 200. Spikes in Order Defect Rate (ODR > 1.0%) or Late Shipment Rate trigger immediate Buy Box loss, funds withholding, and stranded FBA inventory incurring daily aged storage surcharges.',
          impactBullets: [
            'AHR dropping into the yellow (<200) or red zone risking total account deactivation.',
            'Revenue instantly freezing with thousands of inventory units stranded in FBA.',
            'Rejection of generic, copy-pasted appeal templates by Amazon Seller Performance.',
          ],
          riskSeverity: 'Critical',
        },
        solution: {
          title: 'Proactive AHR Governance & Custom Root-Cause POAs',
          description:
            'We execute daily Account Health monitoring maintaining a continuous 200+ green score buffer. Customer metrics (ODR, LSR, VTR) are safeguarded with proactive escalation protocols. When warnings occur, we formulate rigorous, customized 3-part Plans of Action (POAs) detailing Root Cause, Immediate Remediation, and Systemic Safeguards supported by verifiable supply chain documentation.',
          stepBullets: [
            'Daily audit of Seller Central Policy Compliance, Customer Service, and Shipping dashboards.',
            'Root-cause diagnostic for stranded inventory and search-suppressed listings.',
            'Drafting bespoke 3-part POA appeals (Root Cause + Immediate Fix + Long-Term Prevention).',
            'Seller Support case escalation through specialized Seller Performance channels.',
          ],
          guarantee: 'Zero boilerplate templates; custom, documented appeals submitted within 24–72 hours.',
        },
        deliverables: [
          { title: 'Daily AHR Governance', desc: 'Continuous monitoring of policy compliance, ODR, and shipping health.' },
          { title: 'Bespoke 3-Part POAs', desc: 'Verifiable root-cause action plans submitted within 24–72 hours.' },
          { title: 'Stranded Stock Diagnostic', desc: 'Inventory error reconciliation and automated case resolution.' },
        ],
        technicalSpecs: [
          { label: 'Target Buffer', value: '200+ Continuous Healthy Green score' },
          { label: 'POA Framework', value: 'Root Cause + Remediation + Systemic Safeguards' },
          { label: 'Escalation Window', value: '24–72 Hour SLA on listing suppressions' },
        ],
        metricsTracked: ['AHR Score (200+ green buffer)', 'Order Defect Rate (<1.0%)', 'Zero active policy strikes'],
      },
      {
        id: 'amazon-global',
        disciplineNumber: '06',
        badge: 'Pillar 06 · Cross-Border Launch',
        title: 'Global Marketplaces & Cross-Border Launch',
        headline: 'Multi-region launches across North America, Europe, APAC & MENA with cultural localization.',
        icon: Globe,
        sla: '14–21 Days Per Region',
        deepDiveUrl: '/services/amazon#global-expansion',
        ctaText: 'Explore Global Expansion',
        problem: {
          title: 'Botched Translation & Regulatory Customs Halts',
          description:
            'Sellers expanding internationally frequently rely on automated translation tools, resulting in awkward, unindexed listings with zero search visibility. Products face customs impoundment, fines, or account bans due to unaddressed European VAT/GST filing requirements, German LUCID / French CITEO Extended Producer Responsibility (EPR) regulations, or missing UK Responsible Person designations.',
          impactBullets: [
            'Overseas listings failing to index due to colloquial regional query mismatches.',
            'Cross-border shipments confiscated at customs due to EPR packaging or VAT non-compliance.',
            'Severe margin erosion from miscalculated foreign landed duties, FX fees, and localized FBA rates.',
          ],
          riskSeverity: 'High',
        },
        solution: {
          title: 'Native Human Localization & Regulatory Roadmap',
          description:
            'We orchestrate end-to-end international launches across US, Canada, UK, Europe (DE, FR, IT, ES), Japan, Australia, UAE, and India. Every listing receives native human localization based on actual regional search volume data. We provide complete regulatory roadmaps for UK/EU VAT, German/French EPR packaging compliance, and model cross-border fulfillment via NARF, Pan-EU FBA, and regional 3PLs.',
          stepBullets: [
            'Global unified Seller Central account linking and regional marketplace onboarding.',
            'Native human keyword research and cultural listing localization (no Google Translate).',
            'Tax and packaging compliance navigation (UK/EU VAT, German LUCID, French CITEO EPR).',
            'Landed unit economic modeling factoring tariffs, FX volatility, and localized FBA fulfillment fees.',
          ],
          guarantee: 'Human-verified native copy; zero machine-translated foreign listings.',
        },
        deliverables: [
          { title: 'Unified Global Account Setup', desc: 'Multi-region Seller Central configuration across NA, Pan-EU, APAC, and MENA.' },
          { title: 'Native Keyword Localization', desc: 'Culturally adapted listings tailored to local search query frequencies.' },
          { title: 'Tax & Packaging Roadmap', desc: 'VAT/GST registration, EPR compliance documentation, and customs guidance.' },
        ],
        technicalSpecs: [
          { label: 'Regions Supported', value: 'US, CA, MX, UK, DE, FR, IT, ES, JP, AU, UAE, SA, IN' },
          { label: 'Regulatory Scope', value: 'VAT/GST, EPR (Germany/France), UKCA/CE compliance' },
          { label: 'Fulfillment Logistics', value: 'NARF, Pan-EU FBA, EFN, and regional 3PL' },
        ],
        metricsTracked: ['Regional keyword indexation', 'Cross-border margin stability', 'Zero customs halts'],
      },
    ],
  },
  {
    id: 'shopify',
    label: 'Shopify DTC Brands Track',
    shortBadge: 'Shopify DTC & Plus',
    headline: 'Aligned with Shopify Plus OS 2.0 Best Practices',
    description:
      'High-performance Online Store 2.0 theme architecture, event-driven Shopify Flow automations, Checkout Extensibility, server-side CAPI analytics, and Klaviyo retention.',
    accentColor: '#8b5cf6',
    disciplines: [
      {
        id: 'shopify-os2',
        disciplineNumber: '01',
        badge: 'Storefront · Frontend Engineering',
        title: 'OS 2.0 Theme Engineering',
        headline: 'Modular JSON templates, zero app bloat, and sub-2.0s mobile Largest Contentful Paint.',
        icon: Cpu,
        sla: '14–21 Business Days',
        deepDiveUrl: '/services/shopify',
        ctaText: 'Explore Theme Engineering',
        problem: {
          title: 'Script Bloat & Sluggish Mobile Load Times',
          description:
            'Legacy Shopify themes weighted down with 20+ third-party app scripts cause mobile Largest Contentful Paint (LCP) times to exceed 4.5 seconds. Over 50% of paid ad traffic bounces before the product page renders. Outdated liquid templates prevent marketing teams from launching custom promotions without hiring developers for routine section edits.',
          impactBullets: [
            '50%+ bounce rate on mobile ad clicks due to 4.5s+ page load latency.',
            'Heavy script conflicts from uninstalled app remnants injecting render-blocking JavaScript.',
            'Inability for marketing teams to launch new landing pages without custom developer builds.',
          ],
          riskSeverity: 'High',
        },
        solution: {
          title: 'Lightweight Modular JSON & Native Sections Everywhere',
          description:
            'We build clean, modern Online Store 2.0 themes utilizing modular JSON templates and native Sections Everywhere. We eliminate bloated third-party apps by engineering custom native Liquid/CSS components for announcement bars, sliding drawers, size charts, and FAQs. Optimized image pipelines and clean DOM architecture ensure mobile LCP under 2.0s.',
          stepBullets: [
            'Legacy theme audit and removal of abandoned third-party tracking scripts.',
            'Modular OS 2.0 JSON template development enabling drag-and-drop merchant control.',
            'Native component engineering replacing redundant third-party apps.',
            'Core Web Vitals optimization achieving sub-2.0s mobile LCP and CLS < 0.05.',
          ],
          guarantee: 'Zero jQuery or render-blocking script dependencies; mobile-first responsive QA at 375px.',
        },
        deliverables: [
          { title: 'Custom OS 2.0 Theme', desc: 'Modular JSON templates with full merchant drag-and-drop section controls.' },
          { title: 'Native Component Suite', desc: 'Custom Liquid drawers, sticky add-to-cart, size guides, and FAQs.' },
          { title: 'Core Web Vitals Audit', desc: 'Sub-2.0s Largest Contentful Paint and CLS < 0.05 performance certification.' },
        ],
        technicalSpecs: [
          { label: 'Architecture', value: '100% Online Store 2.0 JSON Templates & Sections Everywhere' },
          { label: 'Mobile Performance', value: 'Sub-2.0s LCP & Cumulative Layout Shift (CLS) < 0.05' },
          { label: 'Viewport QA', value: 'Responsive optimization across 375px, 768px, 1024px, 1440px' },
        ],
        metricsTracked: ['Mobile Core Web Vitals (90+)', 'Page load speed (<2.0s)', 'Mobile conversion rate lift'],
      },
      {
        id: 'shopify-flow',
        disciplineNumber: '02',
        badge: 'Operations · Automations Engine',
        title: 'Shopify Flow Automations Engine',
        headline: 'Headless event-driven workflows for fraud holds, VIP routing & multi-channel stock sync.',
        icon: Sliders,
        sla: '3–5 Business Days',
        deepDiveUrl: '/services/shopify#automations',
        ctaText: 'Explore Flow Automations',
        problem: {
          title: 'Manual Operational Chokepoints & Fraud Chargebacks',
          description:
            'Operations teams lose 15–20 hours per week manually auditing orders, tagging customers, and alerting fulfillment teams. Undetected high-risk fraudulent orders slip through to the warehouse, triggering merchandise loss and costly $15–$25 chargeback fees. Delayed VIP recognition causes repeat spenders to feel ignored, slowing repurchase velocity.',
          impactBullets: [
            'Costly merchandise losses and bank chargeback penalty fees from fraudulent orders.',
            '15+ administrative hours per week wasted on manual order reviews and tagging.',
            'Delayed fulfillment notifications and stockout surprises frustrating buyers.',
          ],
          riskSeverity: 'High',
        },
        solution: {
          title: 'Event-Driven Flow Architecture & Instant Fulfillment Holds',
          description:
            'We build production-grade Shopify Flow recipes that evaluate order webhooks in real time. Incoming orders are screened against fraud indicators; high-risk transactions are instantly placed on fulfillment hold and flagged for ops review. High-value repeat customers are tagged VIP within 15 seconds, triggering personalized concierge messaging.',
          stepBullets: [
            'Automated fraud risk assessment with immediate fulfillment lock (fulfillment_status: ON_HOLD).',
            'VIP customer identification (spend thresholds / order count) with Klaviyo concierge triggers.',
            'Real-time multi-location inventory decrement alerts updating storefront metafields.',
            'Internal ops alert dispatch via Slack / WhatsApp webhooks for high-priority orders.',
          ],
          guarantee: 'Webhook failover protection and thorough edge-case testing before live activation.',
        },
        deliverables: [
          { title: '4 Core Production Flows', desc: 'Fraud Hold, VIP Routing, Low-Stock Alerts, and B2B Invoicing recipes.' },
          { title: 'Webhook Architecture', desc: 'Direct connections linking Shopify Admin API, Klaviyo, Slack, and ERP.' },
          { title: 'Ops Runbook', desc: 'Step-by-step exception handling manual for fulfillment and support teams.' },
        ],
        technicalSpecs: [
          { label: 'Execution Engine', value: 'Native Shopify Flow + Webhooks API' },
          { label: 'Response Latency', value: 'Sub-100ms automated trigger response' },
          { label: 'Integrations', value: 'Shopify Flow, Klaviyo, Slack Webhooks, ERP/3PL APIs' },
        ],
        metricsTracked: ['Weekly manual ops hours saved (15+ hrs)', 'Chargeback rate (<0.1%)', 'Repeat purchase speed'],
      },
      {
        id: 'shopify-checkout-b2b',
        disciplineNumber: '03',
        badge: 'Enterprise · Checkout & Wholesale',
        title: 'Checkout Extensibility & B2B Wholesale',
        headline: 'Sandboxed edge checkout extensions, 1-click upsells & native wholesale company profiles.',
        icon: ShoppingBag,
        sla: '7–10 Business Days',
        deepDiveUrl: '/services/shopify#plus',
        ctaText: 'Explore Checkout & B2B',
        problem: {
          title: 'Checkout.liquid Technical Debt & Fractured B2B Operations',
          description:
            'Brands relying on deprecated checkout.liquid face critical platform breaking changes and lack access to modern 1-click Shop Pay upsell extensions. Running separate stores or bulky third-party apps for wholesale leads to fractured inventory, manual spreadsheet price lists, and administrative headaches processing Net 30/60 purchase orders.',
          impactBullets: [
            'Legacy checkout code breaking during platform updates and failing PCI-DSS sandboxing.',
            'Lost average order value from inability to present frictionless in-checkout product add-ons.',
            'Double inventory overhead and manual invoice reconciliation across separate wholesale portals.',
          ],
          riskSeverity: 'Critical',
        },
        solution: {
          title: 'Future-Proof Checkout UI & Unified Wholesale Architecture',
          description:
            'We migrate stores to Shopify Checkout Extensibility using sandboxed UI Extensions and custom Shopify Functions executing at edge runtimes in under 10ms. For wholesale, we deploy native Shopify Plus B2B architecture, unifying retail DTC and wholesale catalogs within a single admin dashboard with customer-specific tiered price lists, volume breaks, and self-serve Net 15/30/60 checkout.',
          stepBullets: [
            'Elimination of checkout.liquid and deployment of modern Checkout UI Extensions.',
            'Custom Shopify Functions for dynamic tiered discounts, delivery dates, and shipping logic.',
            'B2B company profile configuration with multi-seat buyer permissions and volume breaks.',
            'Self-serve purchase order checkout with automated Net terms invoicing and tax validation.',
          ],
          guarantee: '100% compliant with Shopify Checkout Extensibility standards; zero deprecated liquid tags.',
        },
        deliverables: [
          { title: 'Checkout UI Extensions', desc: '1-click post-purchase upsell widgets, custom delivery schedulers, and gift notes.' },
          { title: 'Custom Shopify Functions', desc: 'Edge-computed discount stacking and dynamic shipping rules (<10ms runtime).' },
          { title: 'Native B2B Portal Setup', desc: 'Tiered wholesale price lists, company buyer roles, and Net terms PO checkout.' },
        ],
        technicalSpecs: [
          { label: 'Standard', value: '100% Checkout Extensibility UI Extensions' },
          { label: 'Runtime Latency', value: '<10ms edge compute via Shopify Functions' },
          { label: 'Payment Terms', value: 'Native Net 15, Net 30, Net 60 self-serve PO options' },
        ],
        metricsTracked: ['Checkout conversion lift (+8–15%)', 'In-checkout upsell take rate', 'B2B order speed'],
      },
      {
        id: 'shopify-analytics',
        disciplineNumber: '04',
        badge: 'Analytics · Server-Side Infrastructure',
        title: 'GA4 & Meta CAPI Server-Side Analytics',
        headline: 'First-party server-side pipelines restoring conversion signals lost to iOS privacy & ad blockers.',
        icon: BarChart3,
        sla: '3–5 Business Days',
        deepDiveUrl: '/services/shopify#analytics',
        ctaText: 'Explore Server-Side Analytics',
        problem: {
          title: 'Signal Loss, Pixel Blindness & Distorted ROAS',
          description:
            'iOS 14.5+ App Tracking Transparency and browser ad blockers strip 25–40% of conversion events from standard client-side browser pixels. Meta and Google ad algorithms receive incomplete purchase signals, resulting in erratic ad delivery, inflated customer acquisition costs (CAC), and inaccurate ROAS attribution in ad manager dashboards.',
          impactBullets: [
            '25–40% of ecommerce purchases missing from client-side browser pixel tracking.',
            'Meta ad algorithm degrading due to low Event Match Quality (EMQ < 5.0).',
            'Marketing teams misallocating capital based on conflicting, underreported ROAS figures.',
          ],
          riskSeverity: 'Critical',
        },
        solution: {
          title: 'First-Party Server-Side CAPI & GA4 Pipeline',
          description:
            'We implement a dual-layer tracking architecture utilizing Shopify Web Pixels API and direct server endpoints for Meta Conversions API (CAPI), Google Analytics 4 Measurement Protocol, and TikTok Events API. Transmitting hashed first-party customer data directly from server to server restores lost conversion signals, achieves >90% Event Match Quality, and establishes accurate blended CAC/ROAS attribution.',
          stepBullets: [
            'Shopify Web Pixel API configuration for resilient client-side event capture.',
            'Direct server-to-server Meta CAPI integration with SHA-256 user data hashing.',
            'Full-funnel Google Analytics 4 Measurement Protocol deployment (view_item to purchase).',
            'Event Match Quality (EMQ) audit achieving >8.5/10 rating across purchase events.',
          ],
          guarantee: 'Full compliance with GDPR/CCPA privacy frameworks; verified first-party data transmission.',
        },
        deliverables: [
          { title: 'Server-Side Meta CAPI', desc: 'Direct server event dispatch with SHA-256 customer data hashing and deduplication.' },
          { title: 'GA4 Enhanced E-commerce', desc: '100% full-funnel measurement protocol datalayer from catalog to checkout.' },
          { title: 'Attribution Dashboard', desc: 'Blended CAC/ROAS reporting reconciling ad platform claims with bank receipts.' },
        ],
        technicalSpecs: [
          { label: 'Event Match Quality', value: 'Target >90% (8.5+/10) on Purchase and InitiateCheckout' },
          { label: 'Protocol', value: 'Server-to-server HTTP API via Shopify Web Pixel infrastructure' },
          { label: 'Coverage', value: 'view_item, add_to_cart, begin_checkout, add_shipping_info, purchase' },
        ],
        metricsTracked: ['Event Match Quality (>90%)', 'Signal recovery (+20–35%)', 'Attributed ad ROAS accuracy'],
      },
      {
        id: 'shopify-klaviyo',
        disciplineNumber: '05',
        badge: 'Retention · Lifecycle Marketing',
        title: 'Klaviyo Retention Lifecycle Flows',
        headline: 'High-converting automated flows, RFM customer segmentation & dedicated domain authentication.',
        icon: RefreshCw,
        sla: '5–7 Business Days',
        deepDiveUrl: '/services/shopify',
        ctaText: 'Explore Retention Flows',
        problem: {
          title: 'One-and-Done Buyers & Spam Folder Deliverability Drops',
          description:
            'Over 80% of first-time DTC buyers never make a second purchase, leaving brands trapped on an expensive customer acquisition treadmill. Unauthenticated sending domains (missing SPF, DKIM, and DMARC records) cause promotional campaigns to land in Spam folders. Blasting identical generic discount emails to entire unsegmented lists burns subscriber goodwill and spikes unsubscribe rates.',
          impactBullets: [
            '80%+ customer churn after first order due to lack of automated retention touchpoints.',
            'Emails landing in Gmail/Yahoo Spam folders due to missing DMARC domain authentication.',
            'High unsubscribe rates and list degradation from unsegmented batch-and-blast campaigns.',
          ],
          riskSeverity: 'High',
        },
        solution: {
          title: 'Automated RFM Retention Engine & DMARC Authentication',
          description:
            'We architect an omnichannel retention lifecycle utilizing Klaviyo and WhatsApp Cloud API. We configure 6 essential automated behavioral flows (Welcome, High-Value Browse Abandonment, Dynamic Cart Recovery, Post-Purchase Cross-Sell, VIP Replenishment, and Winback). Advanced RFM segmentation targets customers by purchase frequency and value, while dedicated SPF, DKIM, and DMARC authentication guarantees primary inbox delivery.',
          stepBullets: [
            'Dedicated sending domain authentication (SPF, DKIM, DMARC alignment) for primary inbox placement.',
            'Deployment of 6 automated core lifecycle flows with dynamic catalog recommendations.',
            'Behavioral RFM customer segmentation (Champions, Loyal, At-Risk, Lapsed).',
            'Post-purchase replenishment timing aligned with consumable product lifespan.',
          ],
          guarantee: '100% deliverability compliance with Gmail/Yahoo 2024 bulk-sender requirements.',
        },
        deliverables: [
          { title: '6 Core Automated Flows', desc: 'Welcome, Browse, Cart, Checkout, Post-Purchase Cross-Sell, and Winback sequences.' },
          { title: 'DNS Authentication', desc: 'Dedicated sending domain configuration with 100% DMARC, DKIM, and SPF validation.' },
          { title: 'RFM Customer Segments', desc: 'Automated behavioral cohorts separating high-value champions from churn risks.' },
        ],
        technicalSpecs: [
          { label: 'Infrastructure', value: 'Klaviyo Custom Event API + Dedicated Sending Domain' },
          { label: 'Deliverability Standards', value: '100% DMARC/DKIM/SPF compliance, Spam complaint <0.08%' },
          { label: 'Flow Logic', value: 'Multi-branch abandoned cart (tiered by cart value), replenishment triggers' },
        ],
        metricsTracked: ['Email-driven revenue share (25–35%)', 'Flow Open Rate (>45%)', 'Click-to-Open Rate (>15%)'],
      },
    ],
  },
  {
    id: 'multichannel',
    label: 'Multi-Channel & Artisan Track',
    shortBadge: 'Multi-Channel & Artisan',
    headline: 'Real-Time Inventory Parity & Macro Craft Production',
    description:
      'Centralized catalog synchronization across Walmart, Etsy, Flipkart, and eBay, paired with in-house studio photography, macro artisan focus, and turnkey operations.',
    accentColor: '#10b981',
    disciplines: [
      {
        id: 'multichannel-sync',
        disciplineNumber: '01',
        badge: 'Multi-Channel · Central Operations',
        title: 'Multi-Marketplace Catalog & Inventory Sync',
        headline: 'Bidirectional stock synchronization and catalog taxonomy across Walmart, Etsy, Flipkart & eBay.',
        icon: Boxes,
        sla: '5–7 Business Days',
        deepDiveUrl: '/services/ecommerce-management',
        ctaText: 'Explore Multi-Channel Sync',
        problem: {
          title: 'Overselling Penalties & Multi-Channel Inventory Desync',
          description:
            'Selling across Walmart, Etsy, Flipkart, eBay, and Amazon without synchronized inventory leads to overselling during sales spikes. Out-of-stock orders trigger late-shipment cancellations, severe marketplace algorithm rank demotions, and account suspensions. Re-keying product data manually creates conflicting prices, broken variants, and compliance errors across differing platform taxonomies.',
          impactBullets: [
            'Immediate account health penalties and Buy Box loss from out-of-stock cancellations.',
            'Dozens of hours wasted manually updating quantities across disconnected seller portals.',
            'Fragmented pricing and inconsistent product descriptions across competing marketplaces.',
          ],
          riskSeverity: 'Critical',
        },
        solution: {
          title: 'Bidirectional Real-Time Inventory & Taxonomy Connector',
          description:
            'We deploy a centralized multi-marketplace synchronization engine linking Amazon, Walmart, Etsy, Flipkart, and eBay to your central warehouse or Shopify inventory. When an item sells on any channel, inventory levels decrement across all platforms within seconds. We map a single master catalog into platform-specific taxonomies (Walmart Item Spec 5.0, Etsy attributes, eBay item specifics) with automated order routing.',
          stepBullets: [
            'Master catalog audit and taxonomy mapping for Walmart, Etsy, eBay, and Flipkart.',
            'Real-time bidirectional inventory connector setup with safety buffer thresholds.',
            'Centralized order routing and automated carrier tracking dispatch.',
            'Cross-marketplace price consistency rules and automated currency conversions.',
          ],
          guarantee: 'Real-time inventory sync preventing stockout cancellations during peak sales spikes.',
        },
        deliverables: [
          { title: 'Multi-Marketplace Connector', desc: 'Central sync linking Amazon, Walmart, Etsy, eBay, and Flipkart.' },
          { title: 'Taxonomy Mapping Schema', desc: 'Master catalog mapped to Walmart Spec 5.0, Etsy tags, and eBay item specifics.' },
          { title: 'Safety Buffer Rules', desc: 'Automated stock reservation thresholds preventing stockouts on high-velocity SKUs.' },
        ],
        technicalSpecs: [
          { label: 'Channels Supported', value: 'Walmart Marketplace, Etsy, eBay, Flipkart, Amazon, Shopify' },
          { label: 'Sync Latency', value: 'Real-time API event webhooks (<60s cross-channel updates)' },
          { label: 'Safety Buffers', value: 'Automated threshold buffers preventing overselling during sales spikes' },
        ],
        metricsTracked: ['Zero overselling cancellations', '99.9% Inventory sync reliability', 'Cross-channel order speed'],
      },
      {
        id: 'multichannel-photography',
        disciplineNumber: '02',
        badge: 'Studio Production · Commercial Photography',
        title: 'Studio Product Photography',
        headline: 'High-resolution strobe photography, multi-angle hero packshots & color-calibrated retouching.',
        icon: Camera,
        sla: '24–48 Hour Turnaround',
        deepDiveUrl: '/services/photography',
        ctaText: 'Explore Studio Photography',
        problem: {
          title: 'Color Discrepancies & DIY Lighting Flares',
          description:
            'Smartphone photos and amateur DIY lighting distort product colors, cast muddy shadows, and blow out highlights on reflective surfaces (glass bottles, cosmetics, jewelry, polished metals). When the physical product does not match online photos, dissatisfied customers leave 1-star reviews and return up to 30% of orders. Inconsistent visual styling across SKUs destroys brand professionalism.',
          impactBullets: [
            'High return rates driven by color mismatches between digital listings and physical goods.',
            'Uncontrolled flares and reflections obscuring labels on bottles, cosmetics, and metals.',
            'Fragmented catalog aesthetics eroding consumer trust on premium marketplace storefronts.',
          ],
          riskSeverity: 'High',
        },
        solution: {
          title: 'In-House Strobe Calibration & Master Retouching',
          description:
            'Our Noida Sector 62 studio executes commercial photography using color-calibrated strobe lighting, grey-card calibration, and specialized diffusion boxes for reflective and transparent goods. We capture complete multi-angle catalog suites (hero packshots, 45-degree angles, detail close-ups, and scale references) with commercial retouching and 24–48 hour turnaround.',
          stepBullets: [
            'In-house strobe lighting setup calibrated with X-Rite ColorChecker charts for 100% color accuracy.',
            'Polarized diffusion setups eliminating unwanted glare on glass, chrome, and polished finishes.',
            'Multi-angle capture capturing all key product perspectives and real-world scale.',
            'Commercial post-production retouching: dust cleanup, edge sharpening, and web optimization.',
          ],
          guarantee: '24–48 hour delivery on standard catalog shoots; true-to-life color calibration.',
        },
        deliverables: [
          { title: 'Commercial Studio Shoot', desc: 'In-house strobe capture at our Noida Sector 62 studio with specialized diffusion.' },
          { title: 'Multi-Angle Catalog Suite', desc: 'Hero, 45-degree, rear, base, macro texture, and scale reference images.' },
          { title: 'Retouched Multi-Format Package', desc: 'High-res master TIFFs, print-ready JPEGs, and optimized WebP web assets.' },
        ],
        technicalSpecs: [
          { label: 'Optics', value: 'Full-frame sensors with macro prime lenses' },
          { label: 'Color Profile', value: 'Calibrated sRGB matched to physical color targets' },
          { label: 'Turnaround SLA', value: '24–48 Hours from studio product receipt' },
        ],
        metricsTracked: ['100% Color match accuracy', 'Zoom pass rate on all marketplaces', 'Image-driven conversion lift'],
      },
      {
        id: 'multichannel-handmade',
        disciplineNumber: '03',
        badge: 'Artisan Studio · Macro Craft Imaging',
        title: 'Handmade & Maker Detail Shoots',
        headline: 'Focus-stacked macro optics, authentic texture depth & multi-marketplace spec formatting.',
        icon: Sparkles,
        sla: '48-Hour Studio Turnaround',
        deepDiveUrl: '/handmade',
        ctaText: 'Explore Handmade Studio',
        problem: {
          title: 'Flattened Micro-Textures & Lost Craft Premium',
          description:
            'Handcrafted creations (beadwork, intricate jewelry, brassware, ceramics, zari textiles) lose their tactile richness and dimensional depth under standard consumer lighting. Phone photos flatten individual bead facets, wash out metallic embroidery, and fail to convey craftsmanship, forcing artisans to compete on price rather than artistic value. Makers lose days shooting rather than creating.',
          impactBullets: [
            'Inability to command premium pricing due to flat, low-contrast photos obscuring fine craft.',
            'High pre-purchase customer inquiry friction regarding material authenticity and finish.',
            'Artisans losing 15+ hours per week struggling with DIY camera setups instead of making craft.',
          ],
          riskSeverity: 'High',
        },
        solution: {
          title: 'Focus-Stacked Macro Optics & Multi-Spec Delivery',
          description:
            'We deploy an artisan-dedicated studio workflow utilizing macro lenses and focus-stacking technology. We capture every microscopic facet: individual bead holes, hand-hammered brass indentations, ceramic glaze crackles, and silk weaves. Contextual styling incorporates authentic maker props and natural textures. A single studio session delivers pre-formatted assets tailored to Etsy (4:3), Amazon Handmade (1:1), and Shopify (full-bleed).',
          stepBullets: [
            'Focus-stacked macro photography capturing microscopic craft details with edge-to-edge sharpness.',
            'Contextual lifestyle staging using organic, tactile props reflecting artisan heritage.',
            'Single-shoot multi-marketplace formatting (Etsy 4:3, Amazon 1:1, Shopify hero banners).',
            'Turnkey delivery within 48 hours, returning valuable production hours back to the maker.',
          ],
          guarantee: 'One session covers Etsy, Amazon Handmade, and Shopify image specs simultaneously.',
        },
        deliverables: [
          { title: 'Focus-Stacked Macro Images', desc: 'Microscopic detail shots highlighting beadwork, engraving, weave, and glaze.' },
          { title: 'Artisan Lifestyle Flat-Lays', desc: 'Contextual compositions with authentic raw materials and maker props.' },
          { title: 'Multi-Marketplace Formats', desc: 'Pre-cropped package for Etsy (4:3), Amazon Handmade (1:1), and Shopify.' },
        ],
        technicalSpecs: [
          { label: 'Lens Technology', value: '1:1 Macro focal length with multi-shot focus stacking' },
          { label: 'Aspect Ratios', value: '1:1 Square (Amazon), 4:3 (Etsy), 16:9 Banner (Shopify)' },
          { label: 'Turnaround SLA', value: '48-Hour Studio Delivery' },
        ],
        metricsTracked: ['Perceived product value lift', 'Etsy search CTR lift', 'Artisan hours returned to production'],
      },
      {
        id: 'multichannel-management',
        disciplineNumber: '04',
        badge: 'Managed Services · Turnkey Operations',
        title: 'Full Turnkey Account Management',
        headline: 'Dedicated account manager, daily WhatsApp/Slack communication & turnkey marketplace operations.',
        icon: Users,
        sla: 'Full Onboarding in 14 Days',
        deepDiveUrl: '/services/ecommerce-management',
        ctaText: 'Explore Account Management',
        problem: {
          title: 'Founder Operational Burnout & Growth Plateaus',
          description:
            'Brand founders are consumed by daily operational firefights: logging into 4 separate seller portals, answering customer inquiries, monitoring price gouging by unauthorized sellers, and updating inventory spreadsheets. High-level growth initiatives (promotional calendar planning, seasonal campaign launches, margin audits) get postponed, causing revenue to plateau.',
          impactBullets: [
            'Founders spending 25+ hours weekly on administrative seller portal maintenance.',
            'Missed promotional opportunities during major sales events (Prime Day, BFCM, Festive Sales).',
            'Customer inquiries sitting unanswered over weekends, depressing seller feedback metrics.',
          ],
          riskSeverity: 'Critical',
        },
        solution: {
          title: 'Full-Service Operations Department with Daily US Overlap',
          description:
            'We step in as your dedicated in-house ecommerce operations department. A senior account manager handles daily portal operations across Amazon, Shopify Plus, Walmart, and Etsy. We manage catalog updates, promotional calendars, customer service escalations, review monitoring, and inventory forecasting. You receive direct, guaranteed daily communication via WhatsApp and Slack with full US/EU timezone overlap.',
          stepBullets: [
            'Comprehensive account audit and operational stabilization within the first 14 days.',
            'Daily portal governance (catalog health, Buy Box monitoring, order fulfillment tracking).',
            'Promotional calendar execution for major shopping events with advance inventory planning.',
            'Dedicated WhatsApp and Slack communication channel with guaranteed same-day response.',
          ],
          guarantee: 'No long-term lock-in contracts; cancel anytime with 30 days notice.',
        },
        deliverables: [
          { title: 'Dedicated Senior Account Manager', desc: 'One point of contact orchestrating all catalog, ad, and inventory workflows.' },
          { title: 'Direct Slack & WhatsApp Channel', desc: 'Guaranteed same-day response with full daily US EST/PST overlap sync.' },
          { title: 'Monthly Executive Growth Report', desc: 'Comprehensive GMV analysis, margin review, and next-month promo roadmap.' },
        ],
        technicalSpecs: [
          { label: 'Marketplace Coverage', value: 'Amazon (US & Global), Shopify Plus, Walmart, Etsy' },
          { label: 'Timezone Availability', value: 'Daily US (EST/PST) and European business hours overlap' },
          { label: 'Onboarding Timeline', value: 'Account fully audited and stabilized within 14 calendar days' },
        ],
        metricsTracked: ['Gross Merchandise Value (GMV) growth', 'Buy Box win percentage', 'Customer response time (<2 hrs)'],
      },
    ],
  },
];

// ── Verified Operational Metrics Strip ──────────────────────────────────────
const OPERATIONAL_METRICS = [
  { value: '2025', label: 'Founded · Noida Studio', subtext: 'In-house creative headquarters' },
  { value: '48 hr', label: 'Photo Turnaround SLA', subtext: 'Rapid catalog photography' },
  { value: '20+', label: 'Marketplaces Supported', subtext: 'Amazon, Shopify, Walmart & Etsy' },
  { value: '100%', label: 'In-House Creative Team', subtext: 'Zero outsourced freelancers' },
];

// ── Pricing Plans ───────────────────────────────────────────────────────────
const TIERS = [
  {
    label: 'Visibility',
    desc: 'For emerging sellers needing immediate compliance, clean cataloging, and professional imagery.',
    priceUSD: 59,
    priceINR: 4999,
    unit: 'starting at',
    color: '#3b82f6',
    href: '/services/visibility',
    features: [
      'Studio photography (up to 10 products)',
      'A9/A10 algorithmic listing copywriting',
      'RGB 255 pure white hero packshots',
      '249-byte backend keyword optimization',
    ],
  },
  {
    label: 'Professional',
    desc: 'For growing brands scaling multi-channel catalog architecture and aggressive ad profitability.',
    priceUSD: 179,
    priceINR: 14999,
    unit: 'starting at',
    color: '#10b981',
    href: '/services/professional',
    featured: true,
    features: [
      'Full photography + 5–7 A+ Content modules',
      'Algorithmic SEO + variation feed consolidation',
      'Sponsored Products & SBV advertising setup',
      'Brand Storefront design & mobile slicing',
      'Weekly search term harvesting & TACoS tuning',
    ],
  },
  {
    label: 'Enterprise',
    desc: 'For high-volume brands requiring a dedicated in-house ecommerce operations and creative department.',
    priceUSD: null,
    priceINR: null,
    unit: 'tailored pricing',
    color: '#f97316',
    href: '/services/enterprise',
    features: [
      'Unlimited photography & 3D render requests',
      'Full-funnel PPC management (SP, SBV, SD)',
      'Daily AHR 200+ governance & suppression defense',
      'Shopify Plus Checkout Extensibility & Flow automations',
      'Dedicated senior account manager (daily US overlap)',
    ],
  },
];

// ── Why Saleixo 6 Problem-Solving Pillars ───────────────────────────────────
const WHY_PILLARS = [
  {
    icon: ShieldCheck,
    group: 'Operational Reliability',
    title: 'Compliance-Native Technical Standards',
    desc: 'Amazon RGB 255 pure white requirements, 249-byte backend limits, Walmart 1500×1500px resolution, and AHR 200+ governance are built directly into our studio pipeline. Zero surprise suppressions or policy flags.',
  },
  {
    icon: Clock,
    group: 'Operational Reliability',
    title: '48-Hour Studio Turnaround SLA',
    desc: 'Standard catalog photo shoots are retouched and delivered in 48 hours. Emergency ASIN suppression recovery is initiated within 24–72 hours — because every day a listing is dark is irreversible rank erosion.',
  },
  {
    icon: Layers,
    group: 'Direct Communication',
    title: 'One Cohesive In-House Studio Team',
    desc: 'Photographers, 3D render artists, listing copywriters, and ad strategists work under one roof in our Noida studio. No fragmented freelancers, no finger-pointing, and no disconnected vendor handoffs.',
  },
  {
    icon: Users,
    group: 'Direct Communication',
    title: 'Direct Senior Strategist Access & US Overlap',
    desc: 'Communicate directly with your dedicated lead strategist via Slack Connect or WhatsApp. Daily US EST/PST overlap sync ensures real-time decisions without timezone communication delays.',
  },
  {
    icon: Search,
    group: 'Measurable Growth',
    title: 'Diagnose First, Build Second',
    desc: 'We teardown your ASIN conversion leaks, organic search term indexing gaps, and ad TACoS waste before prescribing solutions. We eliminate the exact bottleneck limiting organic ranking.',
  },
  {
    icon: Zap,
    group: 'Measurable Growth',
    title: 'Transparent Milestone-Based Pricing',
    desc: 'Clear deliverables, fixed rates, and published rate cards. No arbitrary markups, zero agency commissions on ad spend, and no lock-in contracts — complete month-to-month flexibility.',
  },
];

// ── Dynamic Headline Pain Points Matrix ─────────────────────────────────────
const DYNAMIC_HEADLINE_PHRASES = [
  { prefix: 'high TACoS,', highlight: 'conversion leaks' },
  { prefix: 'ad spend bleed,', highlight: 'profit erosion' },
  { prefix: 'cart drop-offs,', highlight: 'checkout friction' },
  { prefix: 'feed upload errors,', highlight: 'stranded inventory' },
  { prefix: 'algorithm shifts,', highlight: 'search de-indexing' },
];

// ── Main Page Component ─────────────────────────────────────────────────────
export default function Services() {
  usePageMeta({
    title: 'Ecommerce & Amazon Marketplace Services | Shopify & Multi-Channel Studio | Saleixo',
    description:
      'Systematic marketplace execution: pure white RGB 255 studio imaging, A9/A10 cataloging, Shopify Plus OS 2.0 & Flow automations, and multi-channel inventory synchronization for high-growth brands.',
    structuredData: buildBreadcrumbSchema([
      { name: 'Home', url: 'https://saleixo.com/' },
      { name: 'Services', url: 'https://saleixo.com/services' },
    ]),
    ogImage: 'https://saleixo.com/og/services-og.jpg',
  });

  const { fmt } = useCurrency();
  const [activeTrack, setActiveTrack] = useState<TrackId>('amazon');
  const [globalPerspective, setGlobalPerspective] = useState<'solution' | 'problem'>('solution');
  const [cardOverrides, setCardOverrides] = useState<Record<string, 'solution' | 'problem'>>({});
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % DYNAMIC_HEADLINE_PHRASES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Pricing gate check from localStorage
  const [isUnlocked] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('saleixo_pricing_unlocked') === 'true';
  });

  const currentTrack = ECOSYSTEM_TRACKS.find((t) => t.id === activeTrack) || ECOSYSTEM_TRACKS[0];

  const handleCardToggle = (cardId: string, state: 'solution' | 'problem') => {
    setCardOverrides((prev) => ({ ...prev, [cardId]: state }));
  };

  const getCardPerspective = (cardId: string): 'solution' | 'problem' => {
    return cardOverrides[cardId] ?? globalPerspective;
  };

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>

        {/* ── 01. HERO SECTION ── */}
        <section className="relative pt-28 md:pt-32 pb-10 md:pb-12 px-4 overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute inset-0 pointer-events-none hidden dark:block">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, hsl(215 45% 14%) 0%, hsl(220 35% 10%) 40%, hsl(222 30% 9%) 100%)',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                top: '-10%',
                right: '-5%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, hsl(210 85% 55% / 0.22) 0%, transparent 70%)',
                filter: 'blur(70px)',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                bottom: '-10%',
                left: '-5%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, hsl(217 91% 52% / 0.12) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
          </div>

          <div className="relative z-10 container mx-auto max-w-5xl text-center">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 bg-primary/10 border border-primary/30 text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Systematic Marketplace Problem Resolution
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-extrabold leading-[1.08] tracking-tight mb-5 text-foreground"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(2.3rem, 5vw, 4.2rem)' }}
            >
              Eliminate suppressions,<br className="hidden sm:block" />
              <span className="inline-block relative min-h-[1.25em]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={headlineIndex}
                    initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block"
                  >
                    {DYNAMIC_HEADLINE_PHRASES[headlineIndex].prefix}{' '}
                    and <GradientText>{DYNAMIC_HEADLINE_PHRASES[headlineIndex].highlight}</GradientText>.
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg max-w-3xl mx-auto mb-8 leading-relaxed text-muted-foreground"
            >
              From pure-white RGB 255 main images and A9/A10 backend indexation to Shopify Flow automations and multi-channel synchronization — our in-house studio engineers, optimizes, and defends your catalog with zero outsourced guesswork.
            </motion.p>

            {/* 4 Verified Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-foreground/80"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
                <Check className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
                No lock-in contracts
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
                <Check className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
                48-hr turnaround SLA
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
                <Check className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
                Dedicated studio team
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
                <Check className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
                20+ marketplaces supported
              </span>
            </motion.div>
          </div>
        </section>

        {/* ── 02. OPERATIONAL METRICS STRIP ── */}
        <section className="py-8 md:py-10 px-4 border-y border-border/60 bg-surface/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {OPERATIONAL_METRICS.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div
                    className="text-3xl sm:text-4xl font-extrabold text-foreground mb-1 tracking-tight"
                    style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
                  >
                    {metric.value}
                  </div>
                  <div className="text-xs font-bold text-foreground/90 uppercase tracking-wider mb-0.5">
                    {metric.label}
                  </div>
                  <div className="text-[11px] text-muted-foreground">{metric.subtext}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 03. INTERACTIVE 3-TRACK ECOSYSTEM ARCHITECTURE ── */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-6xl">

            {/* Section Header */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-3">
                INTEGRATED ECOSYSTEM CATALOG
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Three seller tracks. Fifteen high-stakes disciplines.
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                Select your primary operating track to inspect our systematic engineering workflows, tangible outputs, technical SLAs, and the exact marketplace vulnerabilities we eliminate.
              </p>
            </motion.div>

            {/* Track Switcher Navigation */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-1.5 rounded-2xl bg-surface border border-border shadow-sm max-w-full overflow-x-auto">
                {ECOSYSTEM_TRACKS.map((track) => {
                  const isActive = activeTrack === track.id;
                  return (
                    <button
                      key={track.id}
                      onClick={() => {
                        setActiveTrack(track.id);
                      }}
                      className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap flex items-center gap-2 ${
                        isActive ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTrackTab"
                          className="absolute inset-0 rounded-xl"
                          style={{ background: track.accentColor }}
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10">{track.label}</span>
                      <span
                        className={`relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          isActive ? 'bg-white/25 text-white' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {track.disciplines.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Track Banner & Global Perspective Switcher */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border mb-8">
              <div>
                <span
                  className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold tracking-[0.15em] uppercase mb-1.5"
                  style={{
                    background: `${currentTrack.accentColor}18`,
                    color: currentTrack.accentColor,
                    border: `1px solid ${currentTrack.accentColor}40`,
                  }}
                >
                  {currentTrack.headline}
                </span>
                <p className="text-sm text-muted-foreground max-w-2xl">{currentTrack.description}</p>
              </div>

              {/* Global Perspective Toggle */}
              <div className="flex items-center gap-2 bg-surface p-1 rounded-xl border border-border flex-shrink-0">
                <span className="text-[11px] font-semibold text-muted-foreground pl-2 hidden sm:inline">
                  Perspective:
                </span>
                <button
                  onClick={() => {
                    setGlobalPerspective('solution');
                    setCardOverrides({});
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    globalPerspective === 'solution'
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Solutions View
                </button>
                <button
                  onClick={() => {
                    setGlobalPerspective('problem');
                    setCardOverrides({});
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    globalPerspective === 'problem'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Risks View
                </button>
              </div>
            </div>

            {/* ── Track Disciplines Grid (R2 Modules) ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrack}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {currentTrack.disciplines.map((disc, idx) => {
                  const Icon = disc.icon;
                  const perspective = getCardPerspective(disc.id);
                  const isProblem = perspective === 'problem';

                  return (
                    <motion.div
                      key={disc.id}
                      variants={fadeUp}
                      custom={idx}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      className="rounded-3xl border border-border bg-card overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
                      style={{
                        borderColor: isProblem ? 'rgba(239, 68, 68, 0.35)' : undefined,
                      }}
                    >
                      {/* Discipline Card Header */}
                      <div className="p-6 md:p-8 border-b border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background: `${currentTrack.accentColor}18`,
                              border: `1px solid ${currentTrack.accentColor}35`,
                            }}
                          >
                            <Icon className="w-6 h-6" style={{ color: currentTrack.accentColor }} strokeWidth={1.75} />
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="text-xs font-mono font-bold text-muted-foreground">
                                Discipline {disc.disciplineNumber}
                              </span>
                              <span className="text-border">•</span>
                              <span
                                className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                                style={{
                                  background: `${currentTrack.accentColor}15`,
                                  color: currentTrack.accentColor,
                                }}
                              >
                                {disc.badge}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground bg-surface px-2 py-0.5 rounded border border-border">
                                <Clock className="w-3 h-3 text-muted-foreground" />
                                {disc.sla}
                              </span>
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                              {disc.title}
                            </h3>
                            <p className="text-sm font-medium text-muted-foreground mt-0.5">{disc.headline}</p>
                          </div>
                        </div>

                        {/* Local Interactive Perspective Switcher */}
                        <div className="flex items-center gap-1 bg-surface p-1 rounded-xl border border-border self-start md:self-auto">
                          <button
                            onClick={() => handleCardToggle(disc.id, 'solution')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                              !isProblem
                                ? 'bg-emerald-500 text-white shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Systematic Solution
                          </button>
                          <button
                            onClick={() => handleCardToggle(disc.id, 'problem')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                              isProblem
                                ? 'bg-amber-600 text-white shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            <AlertTriangle className="w-3.5 h-3.5" />
                            The Real Problem
                          </button>
                        </div>
                      </div>

                      {/* Interactive Perspective Content Box */}
                      <AnimatePresence mode="wait">
                        {isProblem ? (
                          <motion.div
                            key="problem-view"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="p-6 md:p-8 bg-amber-500/5 border-b border-amber-500/20"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="w-4 h-4 text-amber-500" />
                              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                                High-Stakes Vulnerability ({disc.problem.riskSeverity} Risk)
                              </span>
                            </div>
                            <h4 className="text-lg font-bold text-foreground mb-2">{disc.problem.title}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-4xl">
                              {disc.problem.description}
                            </p>

                            <div className="space-y-2">
                              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Direct Revenue & Compliance Impacts:
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                                {disc.problem.impactBullets.map((bullet, bIdx) => (
                                  <div
                                    key={bIdx}
                                    className="flex items-start gap-2 p-3 rounded-xl bg-card border border-amber-500/20 text-xs text-foreground/90"
                                  >
                                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                                    <span>{bullet}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="solution-view"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="p-6 md:p-8 bg-emerald-500/5 border-b border-emerald-500/20"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                                Systematic Studio Resolution
                              </span>
                            </div>
                            <h4 className="text-lg font-bold text-foreground mb-2">{disc.solution.title}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-4xl">
                              {disc.solution.description}
                            </p>

                            <div className="space-y-2 mb-4">
                              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Concrete Engineering & Creative Execution Steps:
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                {disc.solution.stepBullets.map((step, sIdx) => (
                                  <div
                                    key={sIdx}
                                    className="flex items-start gap-2 p-3 rounded-xl bg-card border border-emerald-500/20 text-xs text-foreground/90"
                                  >
                                    <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                                    <span>{step}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                              <ShieldCheck className="w-4 h-4 text-emerald-500" />
                              Compliance Pass: {disc.solution.guarantee}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Deliverables, Specs & Actions Footer */}
                      <div className="p-6 md:p-8 bg-card/60">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                          {/* Deliverables */}
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                              <Boxes className="w-3.5 h-3.5 text-primary" />
                              Key Deliverables:
                            </p>
                            <div className="space-y-2">
                              {disc.deliverables.map((del, dIdx) => (
                                <div key={dIdx} className="p-2.5 rounded-xl bg-surface border border-border">
                                  <div className="text-xs font-bold text-foreground">{del.title}</div>
                                  <div className="text-[11px] text-muted-foreground mt-0.5">{del.desc}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Technical Specifications */}
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                              <Sliders className="w-3.5 h-3.5 text-primary" />
                              Technical Specifications:
                            </p>
                            <div className="grid grid-cols-1 gap-2">
                              {disc.technicalSpecs.map((spec, sIdx) => (
                                <div
                                  key={sIdx}
                                  className="p-2.5 rounded-xl bg-surface border border-border flex items-center justify-between text-xs"
                                >
                                  <span className="font-medium text-muted-foreground">{spec.label}</span>
                                  <span className="font-semibold text-foreground">{spec.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Metrics Tracked & Quick CTAs */}
                          <div className="flex flex-col justify-between">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                                <BarChart3 className="w-3.5 h-3.5 text-primary" />
                                Operational Metrics Monitored:
                              </p>
                              <div className="flex flex-wrap gap-1.5 mb-6">
                                {disc.metricsTracked.map((m, mIdx) => (
                                  <span
                                    key={mIdx}
                                    className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-surface border border-border text-foreground/80"
                                  >
                                    {m}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/60">
                              <Link
                                to={disc.deepDiveUrl}
                                className="inline-flex items-center gap-1.5 text-xs font-bold hover:underline transition-colors"
                                style={{ color: currentTrack.accentColor }}
                              >
                                {disc.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={() => openCalendarBooking()}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors ml-auto"
                              >
                                <Calendar className="w-3.5 h-3.5" /> Book Diagnostic Teardown
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── 04. PRICING & TIER BRIDGE (R3.3) ── */}
        <section className="py-12 md:py-16 px-4" style={{ background: 'hsl(var(--surface))' }}>
          <div className="container mx-auto max-w-5xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-3">PRICING TIERS</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
                Transparent retainers. Every stage of marketplace scale.
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                Clear scopes, milestone-based execution, and zero long-term lock-in contracts. Switch or pause anytime with 30 days notice.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TIERS.map((tier, i) => (
                <motion.div
                  key={tier.label}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  className="relative flex flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 bg-card border border-border shadow-sm"
                  style={{
                    border: tier.featured ? `1.5px solid ${tier.color}70` : undefined,
                    boxShadow: tier.featured ? `0 8px 30px ${tier.color}15` : undefined,
                  }}
                >
                  {tier.featured && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold text-white shadow-sm"
                      style={{ background: tier.color }}
                    >
                      Most Popular Plan
                    </div>
                  )}

                  <div className="mb-1">
                    <span
                      className="text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                      style={{ background: `${tier.color}18`, color: tier.color, border: `1px solid ${tier.color}35` }}
                    >
                      {tier.label}
                    </span>
                  </div>

                  <div className="mt-4 mb-1 min-h-[58px] flex flex-col justify-end">
                    {isUnlocked || tier.priceUSD == null ? (
                      <>
                        <span className="text-xs block mb-0.5 text-muted-foreground">{tier.unit}</span>
                        <span
                          className="text-3xl font-extrabold text-foreground"
                          style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
                        >
                          {tier.priceUSD != null ? fmt(tier.priceUSD, tier.priceINR) : 'Custom'}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs block mb-0.5 text-muted-foreground">Verified Rates</span>
                        <Link
                          to="/custom-pricing"
                          className="inline-flex items-center gap-1.5 text-base font-bold hover:underline pt-1 text-primary"
                        >
                          <Lock className="w-4 h-4" /> Unlock Rates →
                        </Link>
                      </>
                    )}
                  </div>

                  <p className="text-xs mt-2 mb-5 leading-relaxed text-muted-foreground">{tier.desc}</p>

                  <ul className="space-y-2.5 flex-1 mb-7">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: tier.color }} strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={tier.href}
                    className="w-full py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 hover:opacity-90 text-center flex items-center justify-center gap-2"
                    style={
                      tier.featured
                        ? { background: tier.color, color: '#fff' }
                        : { background: 'transparent', color: tier.color, border: `1.5px solid ${tier.color}55` }
                    }
                  >
                    See {tier.label} Plan <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Custom Sprints & Retainers Bridge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mt-10 rounded-2xl p-6 sm:p-8 bg-card border border-border shadow-sm"
            >
              <h3 className="text-lg font-bold text-foreground mb-2">
                Need a bespoke multi-channel scope or a rapid 3-day diagnostic sprint?
              </h3>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-5 leading-relaxed">
                Beyond monthly retainers, our studio delivers focused 3-day diagnostic teardowns ($199), 249-byte cataloging SEO sprints ($249), and 14-day multi-channel launches ($999).
              </p>
              <Link
                to="/custom-pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-all"
              >
                Explore Custom Sprints & Retainers <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11px] text-muted-foreground mt-3">
                All prices exclude GST. Ad spend paid directly to ad platforms. Invoiced securely via Stripe or direct bank transfer.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── 05. WHY SALEIXO (R3.4) ── */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-3">OUR CORE METHODOLOGY</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
                Why brands trust Saleixo to manage their marketplace catalog.
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                Built by operators who sell. We combine technical compliance, in-house studio production, and transparent milestone contracts.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {WHY_PILLARS.map((w, i) => {
                const Icon = w.icon;
                return (
                  <motion.div
                    key={w.title}
                    variants={fadeUp}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className="p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/25">
                          <Icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded bg-surface border border-border">
                          {w.group}
                        </span>
                      </div>
                      <h3 className="font-bold text-foreground text-base mb-2">{w.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 06. CONVERSION CTA SECTION (R3.5) ── */}
        <section className="py-12 md:py-16 px-4" style={{ background: 'hsl(var(--surface))' }}>
          <div className="container mx-auto max-w-4xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-xl"
              style={{
                background: 'linear-gradient(135deg, hsl(217 40% 12%) 0%, hsl(222 30% 9%) 100%)',
                border: '1px solid hsl(217 30% 25% / 0.6)',
              }}
            >
              {/* Radial Accent */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, hsl(217 91% 52% / 0.18), transparent 70%)' }}
              />

              <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4 relative z-10 text-primary">
                FREE 15-MINUTE STRATEGY TEARDOWN
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 relative z-10 tracking-tight">
                Diagnose your catalog bottlenecks with our lead architect.
              </h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed relative z-10">
                Book a focused 15-minute diagnostic session. We will inspect your main images, keyword indexation, or TACoS efficiency and hand you a clear Plan of Action — free of charge and with zero sales pressure.
              </p>

              {/* Action Triggers */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
                <button
                  onClick={() => openCalendarBooking()}
                  className="px-6 sm:px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 bg-primary text-white hover:bg-primary/90 shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule 15-Min Call
                </button>
                <Link
                  to="/get-started"
                  className="px-6 sm:px-8 py-3.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border border-white/20 text-white hover:bg-white/10 flex items-center justify-center gap-2"
                >
                  Submit Inquiry Form
                </Link>
                <a
                  href="https://wa.me/917011441159"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 sm:px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 bg-[#25D366] text-white hover:opacity-90 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>

              {/* Micro Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-white/10 text-white/50 text-[11px] relative z-10">
                🔒 100% Confidential under Mutual NDA • Direct Architect Session • Actionable Plan You Keep
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
