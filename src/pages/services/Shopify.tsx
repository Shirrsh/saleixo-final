import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Zap,
  ShieldCheck,
  Clock,
  Globe,
  ArrowRight,
  Check,
  CheckCircle2,
  Code2,
  Building2,
  Flame,
  Workflow,
  Database,
  ShoppingCart,
  Sliders,
  ChevronDown,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Boxes,
  Terminal,
  Server,
  FileText,
  Mail,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import GradientText from '@/components/GradientText';
import Reveal from '@/components/Reveal';
import USStandardsStrip from '@/components/USStandardsStrip';
import { usePageMeta, buildBreadcrumbSchema, ORG_ID } from '@/hooks/usePageMeta';

// Verified existing assets from src/assets/
import imgHero from '@/assets/portfolio-3.jpeg';
import imgJewelryLifestyle from '@/assets/services/jewelry-lifestyle-wrist.webp';
import imgHomeStorageTowel from '@/assets/services/home-storage-towel-detail.webp';
import imgBeautyAmber from '@/assets/selected-work/beauty-amber-bottle.webp';
import imgPackingDelivery from '@/assets/services/packing-delivery.webp';

// ── Hero Metric Badges Data ──────────────────────────────────────────────────
const HERO_METRICS = [
  {
    label: 'Checkout Latency',
    value: 'Sub-100ms',
    desc: 'Shopify Functions edge execution',
    icon: Zap,
  },
  {
    label: 'Cloud Infrastructure',
    value: '99.99%',
    desc: 'Uptime resilience during peak drops',
    icon: ShieldCheck,
  },
  {
    label: 'Launch Velocity',
    value: '14 Days',
    desc: 'Kickoff to production store cutover',
    icon: Clock,
  },
  {
    label: 'Global Expansion',
    value: '150+ Markets',
    desc: 'Automated multi-currency & duties',
    icon: Globe,
  },
];

// ── Shopify Plus Enterprise Pillars Data (#plus) ──────────────────────────────
interface PlusPillar {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ElementType;
  specs: { label: string; value: string }[];
  deliverables: string[];
}

const PLUS_PILLARS: PlusPillar[] = [
  {
    id: 'checkout-extensibility',
    badge: 'Checkout Architecture',
    title: 'Checkout Extensibility & Shopify Functions',
    subtitle: 'Zero checkout.liquid debt · Edge compute in <10ms',
    desc: 'Eliminate legacy checkout.liquid technical debt with modern Checkout UI Extensions and custom Shopify Functions executed directly on Shopify’s global edge network. We build dynamic discount stacking logic, tiered pricing rules, delivery date selectors, and checkout trust widgets that update seamlessly without breaking during platform releases.',
    icon: Code2,
    specs: [
      { label: 'Architecture', value: '100% Checkout Extensibility UI Extensions' },
      { label: 'Execution Speed', value: '<10ms edge compute via Shopify Functions' },
      { label: 'Payment Acceleration', value: 'Native Shop Pay 1-click & multi-gateway routing' },
      { label: 'Security & Compliance', value: 'Level 1 PCI-DSS sandboxed execution containers' },
    ],
    deliverables: [
      'Custom checkout upsell & product add-on widgets',
      'Delivery scheduling & gift message inputs',
      'Dynamic payment method reordering & fraud-based hiding',
      'Tiered cart discounts computed on edge runtime',
    ],
  },
  {
    id: 'b2b-wholesale',
    badge: 'Wholesale Commerce',
    title: 'Native B2B Wholesale Commerce',
    subtitle: 'Unified DTC & Wholesale catalog in a single store admin',
    desc: 'Consolidate disparate wholesale apps or secondary portals into native Shopify Plus B2B. Manage company profiles with multi-seat hierarchy, tiered contractual price lists, customer-specific volume breaks, and self-serve Net 15/30/60 purchase order checkouts directly alongside your consumer DTC operations.',
    icon: Building2,
    specs: [
      { label: 'Catalog Engine', value: 'Single admin managing blended DTC + B2B catalog' },
      { label: 'Account Structure', value: 'Company profiles with buyer seats & approval hierarchies' },
      { label: 'Payment Terms', value: 'Self-serve Net 15/30/60 terms & PO checkout' },
      { label: 'Pricing Rules', value: 'Percentage-off, fixed contract & quantity breaks' },
    ],
    deliverables: [
      'Company profiles with buyer roles & spending permissions',
      'Customer-specific tiered wholesale price lists',
      'Tax exemption & VAT validation automation',
      'Automated commercial invoice generation & PO submission',
    ],
  },
  {
    id: 'shopify-markets',
    badge: 'Cross-Border Expansion',
    title: 'Shopify Markets Global Multi-Store',
    subtitle: '150+ countries · Automated DDP duties & localized pricing',
    desc: 'Scale into international markets from a centralized dashboard without cloning regional stores. Automatically display prices in 150+ local currencies with rounding rules, calculate guaranteed landed import taxes and duties (DDP), and deliver localized payment gateways including UPI, iDEAL, Klarna, and Bancontact.',
    icon: Globe,
    specs: [
      { label: 'Currency Scope', value: '150+ supported currencies with psychological rounding' },
      { label: 'Landed Duties', value: 'Guaranteed DDP duty & tax calculation at checkout' },
      { label: 'Domain Structure', value: 'Localized subfolders (/en-gb, /de) or regional ccTLDs' },
      { label: 'Local Payments', value: 'Native integration for UPI, iDEAL, Bancontact, Klarna' },
    ],
    deliverables: [
      'Localized catalog pricing & currency conversion rules',
      'Delivery Duty Paid (DDP) integration via Markets Pro / Avalara',
      'Subfolder-based multilingual international SEO routing',
      'Geographic IP redirection with customer market switcher',
    ],
  },
  {
    id: 'launchpad-scalability',
    badge: 'High-Concurrence Drops',
    title: 'Launchpad & High-Volume Event Scalability',
    subtitle: '10,000+ checkouts/min peak load · Zero downtime flash drops',
    desc: 'Engineered for massive traffic spikes, Black Friday / Cyber Monday surges, and viral influencer product drops. Pre-schedule automated collection releases, promotional pricing, and theme layout swaps with zero manual intervention, backed by Shopify’s distributed cloud processing 10,000+ orders per minute.',
    icon: Flame,
    specs: [
      { label: 'Peak Capacity', value: '10,000+ checkout orders per minute resilience' },
      { label: 'Automation Tool', value: 'Shopify Launchpad campaign pre-scheduling' },
      { label: 'Uptime Standard', value: '99.99% cloud availability guarantee' },
      { label: 'Bot Mitigation', value: 'Native bot protection & inventory queue throttling' },
    ],
    deliverables: [
      'Automated flash sale price cutoffs & collection publishing',
      'Timed promotional banner & hero graphic cutovers',
      'High-heat queue throttling to protect inventory integrity',
      'Post-event automated rollback to standard retail pricing',
    ],
  },
];

// ── Shopify Automations Engine Data (#automations) ────────────────────────────
interface Workflow {
  id: string;
  name: string;
  category: string;
  summary: string;
  trigger: {
    event: string;
    source: string;
    payload: string;
  };
  condition: {
    rule: string;
    logic: string;
    variables: string[];
  };
  actions: {
    title: string;
    target: string;
    desc: string;
    status: string;
  }[];
  businessImpact: string;
  integrations: string[];
}

const WORKFLOWS: Workflow[] = [
  {
    id: 'vip-routing',
    name: 'VIP Routing & Retention',
    category: 'Customer Lifetime Value',
    summary:
      'Instantly identifies high-value repeat spenders upon order completion, tags their customer profile, activates white-glove Klaviyo concierge onboarding, and notifies the internal account team.',
    trigger: {
      event: 'Order Created',
      source: 'Shopify Checkout Webhook',
      payload: 'orders/create (Payload: order_id, total_price, customer.orders_count)',
    },
    condition: {
      rule: 'Order Value & Repeat Purchase Check',
      logic: 'order.total_price >= 250.00 AND customer.orders_count >= 3',
      variables: ['total_price: $285.00', 'orders_count: 4', 'status: Condition PASSED (True)'],
    },
    actions: [
      {
        title: 'Customer Profile Tagging',
        target: 'Shopify Customer API',
        desc: 'Assign tag "VIP-Tier-1" to grant immediate access to private member collections.',
        status: 'Executed (200 OK)',
      },
      {
        title: 'High-Touch Concierge Dispatch',
        target: 'Klaviyo Custom Event API',
        desc: 'Trigger "VIP Concierge Welcome" email flow with direct founder phone/WhatsApp line.',
        status: 'Queued (Immediate)',
      },
      {
        title: 'Internal Ops Alert',
        target: 'Slack / WhatsApp Webhook',
        desc: 'Send formatted order alert to #vip-orders channel for priority packing & handwritten note.',
        status: 'Delivered (48ms)',
      },
    ],
    businessImpact:
      'Zero manual customer auditing. High-value repeat customers receive white-glove acknowledgement within 15 seconds, increasing 60-day repurchase velocity.',
    integrations: ['Shopify Flow', 'Klaviyo', 'Slack Webhooks', 'Shopify Admin API'],
  },
  {
    id: 'fraud-prevention',
    name: 'Fraud Mitigation & Hold',
    category: 'Risk Management',
    summary:
      'Analyzes incoming orders with Shopify’s native risk engine. If high-risk indicators or billing-IP mismatches are detected, fulfillment is placed on immediate hold before warehouse dispatch.',
    trigger: {
      event: 'Order Risk Analyzed',
      source: 'Shopify Risk Engine API',
      payload: 'orders/risk_assessment (Payload: recommendation, billing_address, client_ip)',
    },
    condition: {
      rule: 'Risk Assessment & Geolocation Mismatch',
      logic: 'risk.recommendation == "investigate" OR billing.country_code != ip.country_code',
      variables: ['risk_score: High (0.84)', 'billing_country: US', 'ip_country: Foreign Proxy', 'status: Condition MATCHED'],
    },
    actions: [
      {
        title: 'Immediate Fulfillment Hold',
        target: 'Shopify Fulfillment Order API',
        desc: 'Set fulfillment_status to "ON_HOLD" to prevent warehouse pick-and-pack.',
        status: 'Locked (200 OK)',
      },
      {
        title: 'Apply Risk Review Tag',
        target: 'Shopify Order API',
        desc: 'Tag order with "Fraud-Review-Required" and add internal staff note with IP audit trail.',
        status: 'Tagged',
      },
      {
        title: 'Priority Risk Alert',
        target: 'Ops Email / Notification Gateway',
        desc: 'Notify loss prevention manager with buyer contact details and risk score for manual verification.',
        status: 'Dispatched',
      },
    ],
    businessImpact:
      'Protects gross margins by preventing costly merchandise loss and credit card chargeback dispute penalties before items leave the shipping bay.',
    integrations: ['Shopify Flow', 'Shopify Protect', 'Fulfillment Service API', 'Ops Webhook'],
  },
  {
    id: 'inventory-sync',
    name: 'Multi-Channel Stock Sync',
    category: 'Supply Chain & Inventory',
    summary:
      'Tracks real-time warehouse inventory decrements. When safety buffers are breached, it activates urgency banners on the storefront, triggers ERP purchase orders, and updates 3PL endpoints.',
    trigger: {
      event: 'Inventory Level Updated',
      source: 'Shopify Inventory API',
      payload: 'inventory_levels/update (Payload: location_id, available_quantity)',
    },
    condition: {
      rule: 'Low Stock Threshold Evaluation',
      logic: 'variant.available_quantity <= reorder_point (Default: 10 units)',
      variables: ['sku: SLX-PROD-09', 'available_units: 6', 'reorder_point: 10', 'status: Threshold BREACHED'],
    },
    actions: [
      {
        title: 'PDP Urgency Badge Activation',
        target: 'Storefront Metafields API',
        desc: 'Update product metafield "urgency_badge" to "Only 6 units left in stock — ships today".',
        status: 'Metafield Updated',
      },
      {
        title: 'Draft PO Generation',
        target: 'Katana / NetSuite ERP API',
        desc: 'Create draft Purchase Order for 500 units routed to primary manufacturing vendor.',
        status: 'PO-2026-441 Created',
      },
      {
        title: 'Channel Buffer Sync',
        target: 'Amazon SP-API / 3PL Webhook',
        desc: 'Push remaining inventory delta to secondary marketplace listings to avoid overselling.',
        status: 'Webhooks Synchronized',
      },
    ],
    businessImpact:
      'Eliminates stockout downtime and marketplace late-shipment cancellations while leveraging authentic scarcity on the storefront to accelerate conversion.',
    integrations: ['Shopify Flow', 'Katana Cloud ERP', 'Amazon SP-API', 'ShipStation / 3PL'],
  },
  {
    id: 'b2b-invoicing',
    name: 'B2B Net-Terms Invoicing',
    category: 'Wholesale Automation',
    summary:
      'Processes incoming wholesale checkouts for verified business clients, applies Net payment terms, allocates inventory from bulk warehousing, and schedules automatic payment notifications.',
    trigger: {
      event: 'B2B Order Submitted',
      source: 'Shopify Plus B2B Checkout',
      payload: 'draft_orders/create (Payload: company_id, po_number, payment_terms)',
    },
    condition: {
      rule: 'Verified Wholesale Company & Net Terms Check',
      logic: 'customer.is_b2b_company == true AND order.payment_terms IN ["Net 30", "Net 60"]',
      variables: ['company: Horizon Retailers LLC', 'terms: Net 30', 'po_number: PO-98442', 'status: APPROVED'],
    },
    actions: [
      {
        title: 'Tax-Compliant Commercial Invoice',
        target: 'QuickBooks / Xero API',
        desc: 'Generate formal commercial tax invoice with GST/VAT IDs, PO reference, and payment wire details.',
        status: 'Invoice #INV-9021 Issued',
      },
      {
        title: 'Wholesale Depot Allocation',
        target: 'Multi-Location Inventory API',
        desc: 'Deduct and reserve bulk pallet inventory from primary B2B logistics hub.',
        status: 'Reserved (Pallet Bay 4)',
      },
      {
        title: 'Automated Terms Reminder Schedule',
        target: 'Scheduled Tasks Engine',
        desc: 'Queue automated polite balance reminders at T-7 days and T-1 days before invoice maturity.',
        status: 'Cron Queued',
      },
    ],
    businessImpact:
      'Turns wholesale operations into a touchless self-serve machine, saving 15+ administrative hours per week while shortening invoice collection cycles.',
    integrations: ['Shopify B2B', 'QuickBooks Online', 'Xero', 'SendGrid / SMTP'],
  },
];

const TECH_CONNECTORS = [
  { category: 'Marketing & Retention', tools: ['Klaviyo', 'Omnisend', 'WhatsApp Cloud API', 'Attentive'] },
  { category: 'Customer Support', tools: ['Gorgias', 'Zendesk', 'Richpanel', 'Helpscout'] },
  { category: 'Fulfillment & 3PL', tools: ['ShipBob', 'ShipStation', 'Delhivery', 'Shiprocket', 'Easyship'] },
  { category: 'ERP & Accounting', tools: ['NetSuite', 'Katana Cloud ERP', 'QuickBooks Online', 'Cin7'] },
  { category: 'Subscriptions & Loyalty', tools: ['Recharge', 'Shopify Subscriptions', 'Smile.io', 'Yotpo'] },
  { category: 'Reviews & Social Proof', tools: ['Okendo', 'Judge.me', 'Bazaarvoice', 'Loox'] },
];

// ── Advanced Analytics & CRO Flywheel Data (#analytics) ───────────────────────
const CRO_STAGES = [
  {
    step: '01',
    badge: 'Data Infrastructure',
    title: 'First-Party Server-Side Tracking (CAPI & GA4)',
    desc: 'Browser ad-blockers and iOS privacy frameworks degrade client-side cookies by 20–40%. We architect server-side tracking pipelines through Shopify’s Web Pixel API and direct server endpoints for Meta Conversions API (CAPI), Google Analytics 4 Measurement Protocol, and TikTok Events API.',
    metrics: ['90%+ Event Match Quality (EMQ)', 'Zero cookie degradation', 'Accurate ROAS & blended CAC attribution'],
    icon: Database,
  },
  {
    step: '02',
    badge: 'Cart Funnel Architecture',
    title: 'High-Converting Slide Cart & Dynamic Accelerators',
    desc: 'Replace outdated cart page redirects with an interactive, slide-out cart drawer. Includes real-time free-shipping progress meters, single-click cross-sell product add-ons, gift wrapping checkboxes, and instant 1-click checkout via Shop Pay, Apple Pay, and Google Pay.',
    metrics: ['Interactive free shipping threshold bar', '1-click in-cart upsells', 'Mobile sticky Add-to-Cart bar'],
    icon: ShoppingCart,
  },
  {
    step: '03',
    badge: 'Micro-Optimization',
    title: 'Scientific A/B Testing & Core Web Vitals Matrix',
    desc: 'Eliminate design guesswork with systematic hypothesis testing across high-traffic touchpoints. We test tier bundle options ("Buy 2 Get 15% Off"), sticky mobile CTA variations, benefit iconography, and optimize liquid templates for sub-2.0s Largest Contentful Paint (LCP).',
    metrics: ['Data-backed bundle pricing split-tests', 'PDP layout & social proof testing', 'Sub-2s Core Web Vitals compliance'],
    icon: Sliders,
  },
  {
    step: '04',
    badge: 'Retention & LTV',
    title: 'Post-Purchase 1-Click Upsells & Subscriptions',
    desc: 'The transaction does not end at checkout. We implement frictionless post-purchase upsell funnels that enable buyers to add complementary products with a single tap before the thank-you screen without re-entering payment credentials, alongside Recharge recurring billing.',
    metrics: ['1-click post-purchase checkout offers', 'Automated recurring replenishment subscriptions', 'VIP loyalty tier integration'],
    icon: TrendingUp,
  },
];

const CRO_COMPARISON = [
  {
    feature: 'Data Tracking Accuracy',
    standard: 'Client-side browser pixel only; loses 20–40% of conversion signals to ad blockers.',
    saleixo: 'Dual-layer Server-Side CAPI + Web Pixel API with >90% Event Match Quality.',
  },
  {
    feature: 'Cart Architecture',
    standard: 'Generic page redirect to /cart with high drop-off and zero upsells.',
    saleixo: 'Dynamic slide cart drawer with real-time free shipping progress & 1-click add-ons.',
  },
  {
    feature: 'Mobile Velocity',
    standard: 'Bulky desktop themes ported to mobile, sluggish scrolling, high bounce rates.',
    saleixo: 'Mobile-first UX with bottom sticky buy bar, responsive tap targets, and sub-2s LCP.',
  },
  {
    feature: 'Post-Purchase Funnel',
    standard: 'Static thank-you page with basic text summary.',
    saleixo: 'Native 1-click post-purchase upsell offers prior to order confirmation receipt.',
  },
  {
    feature: 'Checkout Technology',
    standard: 'Deprecated checkout.liquid dependencies or basic unbranded checkout.',
    saleixo: 'Checkout Extensibility + Shopify Functions running on global edge network.',
  },
  {
    feature: 'Peak Traffic Concurrency',
    standard: 'Store slowdowns and checkout queue timeouts during flash promotions.',
    saleixo: 'Enterprise Launchpad readiness engineered for 10,000+ orders/min with 99.99% uptime.',
  },
];

// ── Full-Service Capabilities ────────────────────────────────────────────────
const CAPABILITIES = [
  {
    title: 'Online Store 2.0 Theme Engineering',
    desc: 'Clean, modern Liquid architecture with dynamic sections anywhere, reusable JSON templates, and zero unneeded third-party script bloat.',
    icon: Code2,
  },
  {
    title: 'App Stack Audit & Speed Consolidation',
    desc: 'We audit your app ecosystem, replace heavy apps with native Liquid/Shopify Functions, and tune Core Web Vitals for rapid page rendering.',
    icon: Zap,
  },
  {
    title: 'Shopify Markets & Cross-Border Setup',
    desc: 'Centralized global selling with localized currency formatting, automated duty calculation (DDP), and multi-lingual subfolder architecture.',
    icon: Globe,
  },
  {
    title: 'B2B Wholesale Portal & Net Terms',
    desc: 'Native Shopify Plus B2B configuration: company profiles, tiered wholesale pricing lists, minimum order quantities, and Net 30/60 invoicing.',
    icon: Building2,
  },
  {
    title: 'Server-Side Analytics & CAPI Pipelines',
    desc: 'Bypass cookie decay with dual-layer Meta Conversions API and Google Analytics 4 Measurement Protocol for precise multi-touch attribution.',
    icon: Database,
  },
  {
    title: 'CRO Architecture & Slide Cart Drawers',
    desc: 'Turn browsers into buyers with smart slide drawers, free shipping meters, 1-click post-purchase upsells, and mobile sticky purchase bars.',
    icon: ShoppingCart,
  },
];

// ── 14-Day Launch Process ────────────────────────────────────────────────────
const PROCESS_STEPS = [
  {
    day: 'Days 01–03',
    num: '01',
    title: 'Discovery & Technical Architecture',
    desc: 'Comprehensive brand catalog audit, ERP/3PL mapping, third-party app inventory, checkout extension requirements, and milestone sign-off.',
  },
  {
    day: 'Days 04–07',
    num: '02',
    title: 'UX/UI Design & Prototyping',
    desc: 'Mobile-first design system creation in Figma covering Homepage, Product Pages (PDP), Collection Pages (PLP), and custom slide cart drawer.',
  },
  {
    day: 'Days 08–11',
    num: '03',
    title: 'OS 2.0 Theme & Shopify Functions Build',
    desc: 'High-performance Liquid development, custom Shopify Functions for cart discounts, Checkout UI extensions, and responsive breakpoints.',
  },
  {
    day: 'Days 12–13',
    num: '04',
    title: 'Integrations, Automations & Full QA',
    desc: 'Activating Shopify Flow operational workflows, Klaviyo event sync, payment gateway sandbox transactions, and cross-device browser QA.',
  },
  {
    day: 'Day 14+',
    num: '05',
    title: 'DNS Cutover, Launch & CRO Flywheel',
    desc: 'Zero-downtime domain cutover, live test transaction verification, 301 redirect validation, and initiation of ongoing 30-day CRO tracking.',
  },
];

// ── Storefront Visual Showcase Assets ─────────────────────────────────────────
const VISUAL_SHOWCASE = [
  {
    src: imgJewelryLifestyle,
    title: 'High-End DTC Jewelry Merchandising',
    tag: 'Lifestyle Photography & PDP Layout',
    desc: 'Macro craftsmanship detail and authentic wrist staging engineered for premium conversion.',
  },
  {
    src: imgHomeStorageTowel,
    title: 'Home & Organizational Storage',
    tag: 'Detail Textures & Feature Bullets',
    desc: 'Close-up fabric texture rendering highlighting tactile product quality for confident cart adds.',
  },
  {
    src: imgBeautyAmber,
    title: 'Clean Beauty & Cosmetic Formulations',
    tag: 'Aesthetic Staging & Brand Elevation',
    desc: 'Minimalist studio lighting and amber glass reflections calibrated for beauty DTC brand loyalty.',
  },
  {
    src: imgPackingDelivery,
    title: 'Fulfillment & Logistics Integration',
    tag: 'Fast Dispatch & Packaging Assurance',
    desc: 'Visual packaging confidence indicators communicating rapid shipping and tamper-proof delivery.',
  },
];

// ── Enterprise FAQ Data ───────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'What is the difference between legacy checkout.liquid and modern Shopify Checkout Extensibility?',
    a: 'Legacy checkout.liquid was Shopify’s older checkout template that allowed custom code edits, but it was brittle, prevented stores from accessing modern 1-page checkout updates, and was formally deprecated by Shopify. Checkout Extensibility replaces it with secure, sandboxed Checkout UI Extensions and edge-computed Shopify Functions. This modern architecture runs on Shopify’s global edge network in under 10 milliseconds, supports 1-click Shop Pay acceleration, automatically updates without breaking customizations, and maintains strict Level 1 PCI-DSS compliance.',
  },
  {
    q: 'How do Shopify Flow automations communicate with external ERPs, CRMs, and 3PLs?',
    a: 'Shopify Flow operates as an event-driven automation engine natively built into Shopify. When an event occurs (such as Order Created, Risk Analyzed, or Inventory Level Changed), Flow evaluates pre-defined conditional rules and executes actions via authenticated HTTP webhooks or direct native app connectors (such as Klaviyo, Gorgias, NetSuite, or ShipStation). We configure secure REST and GraphQL API payloads that transmit operational updates bidirectionally, eliminating manual data entry between your storefront, warehouse management system (WMS), and accounting software.',
  },
  {
    q: 'How do you guarantee zero downtime and preserve SEO rankings when migrating from Magento or WooCommerce?',
    a: 'We follow a comprehensive migration protocol: First, we conduct an exhaustive URL crawl of your existing store and construct a 1-to-1 301 redirect map for every product, collection, blog post, and CMS page to prevent 404 errors. Second, we export and migrate your full catalog, customer database, and historical order records into Shopify via secure API batches. Third, we replicate all metadata tags, schema markups, and heading hierarchies. Finally, we execute DNS cutover during off-peak hours with low TTLs, ensuring zero downtime and 100% preservation of organic search rankings.',
  },
  {
    q: 'How does Shopify Markets manage multi-currency, localized duties, and regional tax compliance?',
    a: 'Shopify Markets enables global commerce from a single centralized Shopify admin. It automatically converts catalog prices into 150+ local currencies using live foreign exchange rates paired with custom psychological rounding rules (e.g., ending in .99 or .00). Through Markets Pro and Avalara integration, landed import duties and regional taxes (like EU VAT or UK GST) are calculated and collected directly at checkout on a guaranteed Delivery Duty Paid (DDP) basis, ensuring international buyers encounter zero surprise fees or customs delays upon delivery.',
  },
  {
    q: 'What are the specific advantages of native Shopify Plus B2B over third-party wholesale apps?',
    a: 'Third-party wholesale apps often rely on duplicate draft orders, discount code workarounds, or clunky secondary checkout gates that frequently break theme updates, skew analytics, and create inventory sync lag. Native Shopify Plus B2B integrates wholesale capabilities directly into the core platform: B2B buyers log in using seamless one-time passcodes, view their assigned contractual price lists, access specific minimum order quantities, and check out with self-serve Net 15/30/60 terms using official PO numbers — all recorded cleanly within standard Shopify orders and reports.',
  },
  {
    q: 'How does server-side tracking (Meta CAPI & GA4) maintain tracking accuracy despite iOS 14.5+ and browser ad blockers?',
    a: 'Client-side browser pixels rely on third-party cookies and JavaScript execution in the buyer’s browser, which are frequently blocked or stripped by Safari ITP, Firefox Enhanced Tracking, and ad-blocking extensions — resulting in 20% to 40% under-reported conversion data. Our dual-layer architecture combines the Shopify Web Pixel API with server-side endpoints that transmit conversion events (ViewContent, AddToCart, InitiateCheckout, and Purchase) directly from Shopify’s cloud servers to Meta and Google servers. This achieves Event Match Quality (EMQ) scores exceeding 90% and provides accurate attribution for ad campaigns.',
  },
];

const W = 'px-6 md:px-12 lg:px-20 xl:px-28';

const Shopify = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Hash link listener for deep links (#plus, #automations, #analytics)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'plus' || hash === 'automations' || hash === 'analytics') {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // SEO & Structured Data (Breadcrumbs, Service & FAQPage Schema)
  usePageMeta({
    title: 'Shopify & Shopify Plus Enterprise Commerce — Saleixo',
    description:
      'Enterprise Shopify engineering: Shopify Flow automations, server-side analytics (CAPI/GA4), Shopify Plus Checkout Extensibility, B2B wholesale, and high-concurrence CRO.',
    structuredData: [
      buildBreadcrumbSchema([
        { name: 'Home', url: 'https://saleixo.com/' },
        { name: 'Services', url: 'https://saleixo.com/services' },
        { name: 'Shopify & Shopify Plus', url: 'https://saleixo.com/services/shopify' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Shopify & Shopify Plus Enterprise Commerce',
        url: 'https://saleixo.com/services/shopify',
        serviceType: 'Enterprise Shopify Development & Operational Automation',
        provider: { '@id': ORG_ID },
        areaServed: ['IN', 'US', 'GB', 'FR', 'DE', 'AU', 'CA'],
        description:
          'High-performance Shopify storefront engineering, Shopify Flow automations, server-side analytics, Checkout Extensibility, and native B2B wholesale architecture.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Shopify Engineering & Enterprise Capabilities',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Shopify Plus Enterprise Architecture',
                description:
                  'Checkout Extensibility, Shopify Functions, Native B2B wholesale, Shopify Markets global scaling, and Launchpad concurrency.',
              },
              position: 1,
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Shopify Automations Engine',
                description:
                  'Shopify Flow event-driven workflows: VIP routing, automated fraud holds, multi-location inventory sync, and B2B net-terms invoicing.',
              },
              position: 2,
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Advanced Analytics & CRO Flywheel',
                description:
                  'Server-side Meta CAPI and GA4 tracking, dynamic slide cart drawers, scientific A/B split-testing, and post-purchase LTV optimization.',
              },
              position: 3,
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Full-Stack Custom Storefront Engineering',
                description:
                  'Online Store 2.0 theme development, Core Web Vitals speed optimization, app stack consolidation, and 14-day launch execution.',
              },
              position: 4,
            },
          ],
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

  const currentWorkflow = WORKFLOWS[activeWorkflow];

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>
        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 1: ENTERPRISE HERO WITH METRIC CHIPS
            ═════════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden border-b border-border" style={{ minHeight: '92vh' }}>
          {/* Subtle atmospheric ambient glow */}
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
                top: '-15%',
                right: '10%',
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
                left: '10%',
                width: '540px',
                height: '540px',
                background: 'radial-gradient(circle, hsl(217 91% 60% / 0.07) 0%, transparent 65%)',
                filter: 'blur(60px)',
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row" style={{ minHeight: '92vh' }}>
            {/* Left Hero Content */}
            <div className={`flex flex-col justify-center ${W} pt-32 pb-16 lg:w-[56%] xl:w-[54%]`}>
              <Reveal>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase"
                    style={{
                      background: 'hsl(var(--surface-elevated))',
                      border: '1px solid hsl(var(--border))',
                      color: 'hsl(var(--primary))',
                    }}
                  >
                    <Globe className="w-3 h-3 text-primary" strokeWidth={2} />
                    Shopify & Shopify Plus Enterprise Commerce
                  </span>
                  <span className="text-xs text-muted-foreground hidden sm:inline-block">·</span>
                  <span className="text-xs text-muted-foreground font-medium hidden sm:inline-block">
                    Flow Automations & CRO
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1
                  className="font-extrabold leading-[1.05] tracking-tight mb-5 text-foreground"
                  style={{ fontFamily: '"Inter Tight", Inter, sans-serif', fontSize: 'clamp(2.3rem, 4.2vw, 3.8rem)' }}
                >
                  High-Performance Shopify Stores, <GradientText>Built to Scale.</GradientText>
                </h1>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-8 max-w-xl">
                  From custom Online Store 2.0 theme engineering to automated Shopify Flow backends and Shopify Plus
                  enterprise architecture. We build and optimize high-converting storefronts engineered for operational
                  velocity, sub-100ms checkout execution, and continuous customer retention.
                </p>
              </Reveal>

              {/* 4 Metric Chips */}
              <Reveal delay={0.24}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-9">
                  {HERO_METRICS.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div
                        key={metric.label}
                        className="p-3 rounded-xl border border-border transition-all duration-200 hover:border-primary/40"
                        style={{ background: 'hsl(var(--surface))' }}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" strokeWidth={2} />
                          <span className="text-[11px] font-medium text-muted-foreground truncate">
                            {metric.label}
                          </span>
                        </div>
                        <div
                          className="text-base sm:text-lg font-extrabold text-foreground"
                          style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
                        >
                          {metric.value}
                        </div>
                        <div className="text-[10px] text-muted-foreground/80 leading-tight mt-0.5 line-clamp-1">
                          {metric.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>

              {/* Action Buttons & Anchor Navigation */}
              <Reveal delay={0.3}>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Link
                    to="/get-started"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 shadow-sm"
                    style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
                  >
                    Request Enterprise Scope <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </Link>
                  <Link
                    to="/custom-pricing"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border border-border text-foreground transition-all duration-200 hover:border-primary hover:text-primary hover:bg-surface-elevated"
                  >
                    Explore Pricing Matrix
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground/80">Jump to:</span>
                  <a
                    href="#plus"
                    className="inline-flex items-center gap-1 hover:text-primary transition-colors underline-offset-4 hover:underline"
                  >
                    Shopify Plus <ArrowRight className="w-3 h-3" />
                  </a>
                  <span>·</span>
                  <a
                    href="#automations"
                    className="inline-flex items-center gap-1 hover:text-primary transition-colors underline-offset-4 hover:underline"
                  >
                    Flow Automations <ArrowRight className="w-3 h-3" />
                  </a>
                  <span>·</span>
                  <a
                    href="#analytics"
                    className="inline-flex items-center gap-1 hover:text-primary transition-colors underline-offset-4 hover:underline"
                  >
                    Analytics & CRO <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right Hero Visual Showcase */}
            <div className="relative flex-1 min-h-[440px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-border">
              <img
                src={imgHero}
                alt="High-conversion custom Shopify storefront designed by Saleixo"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background via-background/40 to-transparent pointer-events-none hidden lg:block" />

              {/* Floating Engineering Badges */}
              <div className="absolute top-8 right-8 left-8 flex flex-col gap-3">
                <div
                  className="self-end px-4 py-2.5 rounded-xl border border-white/20 text-white backdrop-blur-md shadow-lg"
                  style={{ background: 'rgba(10, 10, 10, 0.72)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold">Shopify Functions Edge Runtime Active</span>
                  </div>
                  <p className="text-[11px] text-white/70 mt-0.5">Execution latency: 8.4ms · Zero Liquid debt</p>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                <div
                  className="p-5 rounded-2xl border border-white/15 text-white backdrop-blur-md"
                  style={{ background: 'rgba(10, 10, 10, 0.76)' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                      Commerce Engineering Blueprint
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-primary/30 text-white font-mono">
                      Shopify Plus Verified
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                    Checkout Extensibility + Flow Operations + CAPI Analytics
                  </h3>
                  <p className="text-xs text-white/75 leading-relaxed">
                    Custom themes engineered without slow app bloat. Automated operational workflows connecting
                    Klaviyo, Gorgias, and your 3PL.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 2: SHOPIFY PLUS ENTERPRISE STRIP (id="plus")
            ═════════════════════════════════════════════════════════════════════ */}
        <section id="plus" className={`py-10 md:py-14 ${W} scroll-mt-24 border-b border-border`} style={{ background: 'hsl(var(--surface))' }}>
          <div className="max-w-4xl mb-16">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 text-primary bg-primary/10">
                <Flame className="w-3.5 h-3.5" />
                Shopify Plus Enterprise Strip
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4"
                style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
              >
                Enterprise Capabilities Built for High-Volume Commerce.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Unlock the full power of Shopify Plus. We architect high-concurrency storefronts featuring native B2B
                wholesale portals, checkout extensibility with edge compute, centralized multi-store expansion, and
                high-heat drop resilience.
              </p>
            </Reveal>
          </div>

          {/* 4 Flagship Enterprise Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {PLUS_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.id} delay={idx * 0.08} className="h-full">
                  <div
                    className="p-7 rounded-2xl border border-border h-full flex flex-col justify-between transition-all duration-200 hover:border-primary/40 hover:shadow-sm"
                    style={{ background: 'hsl(var(--card))' }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-primary bg-primary/10">
                          <Icon className="w-3.5 h-3.5" />
                          {pillar.badge}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">0{idx + 1}</span>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-1">{pillar.title}</h3>
                      <p className="text-xs font-medium text-primary mb-3">{pillar.subtitle}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                        {pillar.desc}
                      </p>

                      {/* Technical Specs Array */}
                      <div className="p-4 rounded-xl border border-border/80 mb-5 space-y-2 text-xs" style={{ background: 'hsl(var(--surface))' }}>
                        {pillar.specs.map((spec) => (
                          <div key={spec.label} className="flex justify-between items-start gap-3">
                            <span className="text-muted-foreground font-medium">{spec.label}:</span>
                            <span className="text-foreground font-semibold text-right">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                        Production Deliverables
                      </h4>
                      <ul className="space-y-2">
                        {pillar.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-foreground/85">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Platform Migration Reassurance Card */}
          <Reveal delay={0.25}>
            <div
              className="p-8 rounded-2xl border border-primary/25 relative overflow-hidden"
              style={{ background: 'hsl(var(--card))' }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 mb-3">
                    Zero-Downtime Guarantee
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                    Migrating from Magento, WooCommerce, or Salesforce?
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    We engineer seamless platform migrations with comprehensive 1-to-1 301 redirect mappings, customer
                    account exports, and complete order history preservation. Zero downtime, zero broken links, and
                    guaranteed preservation of organic SEO ranking equity during cutover.
                  </p>
                </div>
                <Link
                  to="/get-started"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 shadow-sm"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
                >
                  Plan Your Migration <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 3: SHOPIFY AUTOMATIONS ENGINE (id="automations")
            ═════════════════════════════════════════════════════════════════════ */}
        <section id="automations" className={`py-10 md:py-14 ${W} scroll-mt-24 border-b border-border`}>
          <div className="max-w-4xl mb-14">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 text-primary bg-primary/10">
                <Workflow className="w-3.5 h-3.5" />
                Shopify Automations Engine
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4"
                style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
              >
                Automate Core Commerce Workflows. Eliminate Manual Hours.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Scale operations without expanding headcount. We engineer battle-tested Shopify Flow automations that
                route VIP customers, halt fraudulent orders before shipment, maintain accurate multi-channel inventory,
                and automate wholesale invoices.
              </p>
            </Reveal>
          </div>

          {/* Interactive Tabbed Workflow Visualizer */}
          <div className="mb-14">
            {/* Tabs Navigation (Accessible WAI-ARIA tablist) */}
            <div
              role="tablist"
              aria-label="Shopify Flow Automation Workflows"
              className="flex flex-wrap gap-2.5 p-1.5 rounded-2xl border border-border mb-8 overflow-x-auto"
              style={{ background: 'hsl(var(--surface))' }}
            >
              {WORKFLOWS.map((wf, idx) => {
                const isSelected = activeWorkflow === idx;
                return (
                  <button
                    key={wf.id}
                    role="tab"
                    id={`workflow-tab-${idx}`}
                    aria-selected={isSelected}
                    aria-controls={`workflow-panel-${idx}`}
                    onClick={() => setActiveWorkflow(idx)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer text-left ${
                      isSelected
                        ? 'bg-card text-foreground shadow-sm border border-border'
                        : 'text-muted-foreground hover:text-foreground hover:bg-surface-elevated'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${isSelected ? 'bg-primary' : 'bg-muted-foreground/40'}`}
                    />
                    <span>{wf.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Workflow Visualizer Card (WAI-ARIA tabpanel) */}
            <div
              role="tabpanel"
              id={`workflow-panel-${activeWorkflow}`}
              aria-labelledby={`workflow-tab-${activeWorkflow}`}
              tabIndex={0}
              className="p-6 sm:p-9 rounded-3xl border border-border"
              style={{ background: 'hsl(var(--card))' }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-border mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {currentWorkflow.category}
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs font-mono text-muted-foreground">Workflow 0{activeWorkflow + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{currentWorkflow.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentWorkflow.integrations.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border border-border"
                      style={{ background: 'hsl(var(--surface))', color: 'hsl(var(--foreground))' }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Node Flowchart Visualizer (Trigger ➔ Condition ➔ Actions) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch mb-8">
                {/* Node 1: TRIGGER */}
                <div
                  className="lg:col-span-4 p-5 rounded-2xl border border-blue-500/30 flex flex-col justify-between"
                  style={{ background: 'hsl(var(--surface))' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10">
                        <Zap className="w-3 h-3" />
                        01 Trigger
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">Webhook</span>
                    </div>
                    <h4 className="text-base font-bold text-foreground mb-1">{currentWorkflow.trigger.event}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{currentWorkflow.trigger.source}</p>
                  </div>
                  <div className="p-3 rounded-lg border border-border/80 font-mono text-[11px] text-muted-foreground bg-background/60 break-all">
                    {currentWorkflow.trigger.payload}
                  </div>
                </div>

                {/* Node 2: CONDITION */}
                <div
                  className="lg:col-span-4 p-5 rounded-2xl border border-amber-500/30 flex flex-col justify-between"
                  style={{ background: 'hsl(var(--surface))' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10">
                        <Sliders className="w-3 h-3" />
                        02 Condition
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">Logic Rule</span>
                    </div>
                    <h4 className="text-base font-bold text-foreground mb-1">{currentWorkflow.condition.rule}</h4>
                    <p className="text-xs font-mono text-amber-600 dark:text-amber-400 mb-3 bg-amber-500/10 p-1.5 rounded">
                      if {currentWorkflow.condition.logic}
                    </p>
                  </div>
                  <div className="space-y-1 font-mono text-[10px] text-muted-foreground p-2 rounded bg-background/60 border border-border/80">
                    {currentWorkflow.condition.variables.map((v, i) => (
                      <div key={i} className="truncate">
                        • {v}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Node 3: ACTIONS */}
                <div
                  className="lg:col-span-4 p-5 rounded-2xl border border-emerald-500/30 flex flex-col justify-between"
                  style={{ background: 'hsl(var(--surface))' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10">
                        <CheckCircle2 className="w-3 h-3" />
                        03 Parallel Actions
                      </span>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Automated</span>
                    </div>
                    <div className="space-y-2.5">
                      {currentWorkflow.actions.map((act, i) => (
                        <div key={i} className="p-2.5 rounded-lg border border-border/80 bg-background/60">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <span className="text-xs font-bold text-foreground">{act.title}</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                              {act.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground leading-tight">{act.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Business Impact Strip */}
              <div
                className="p-4 rounded-xl border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                style={{ background: 'hsl(var(--surface))' }}
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-foreground">Operational Outcome: </span>
                    <span className="text-xs text-muted-foreground">{currentWorkflow.businessImpact}</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-medium text-primary flex-shrink-0">
                  Real-Time SLA: &lt;15s
                </span>
              </div>
            </div>
          </div>

          {/* Integrated Technology Connectors Grid */}
          <div>
            <div className="text-center max-w-xl mx-auto mb-8">
              <h3 className="text-xl font-bold text-foreground mb-1">Native Ecosystem Technology Connectors</h3>
              <p className="text-xs text-muted-foreground">
                We integrate your Shopify storefront seamlessly with leading D2C marketing, ERP, 3PL, and support
                infrastructure.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {TECH_CONNECTORS.map((group) => (
                <div
                  key={group.category}
                  className="p-4 rounded-xl border border-border flex flex-col justify-between"
                  style={{ background: 'hsl(var(--surface))' }}
                >
                  <div className="text-[11px] font-bold text-primary mb-2 truncate">{group.category}</div>
                  <ul className="space-y-1">
                    {group.tools.map((t) => (
                      <li key={t} className="text-xs text-muted-foreground truncate">
                        • {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 4: ADVANCED ANALYTICS & CRO FLYWHEEL (id="analytics")
            ═════════════════════════════════════════════════════════════════════ */}
        <section id="analytics" className={`py-10 md:py-14 ${W} scroll-mt-24 border-b border-border`} style={{ background: 'hsl(var(--surface))' }}>
          <div className="max-w-4xl mb-16">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 text-primary bg-primary/10">
                <TrendingUp className="w-3.5 h-3.5" />
                Analytics & CRO Flywheel
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4"
                style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
              >
                Scientific Conversion Optimization: First-Party Data Meets Cart Velocity.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Ad traffic costs are constantly climbing. We approach storefronts as precision conversion machines,
                pairing resilient server-side tracking (Meta CAPI & GA4) with dynamic cart drawers and post-purchase
                LTV funnels.
              </p>
            </Reveal>
          </div>

          {/* 4-Stage CRO Flywheel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {CRO_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <Reveal key={stage.step} delay={idx * 0.08} className="h-full">
                  <div
                    className="p-7 rounded-2xl border border-border h-full flex flex-col justify-between"
                    style={{ background: 'hsl(var(--card))' }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-primary bg-primary/10">
                          <Icon className="w-3.5 h-3.5" />
                          {stage.badge}
                        </span>
                        <span className="text-2xl font-extrabold font-mono text-muted-foreground/30">
                          {stage.step}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-3">{stage.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                        {stage.desc}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-border/80 space-y-2" style={{ background: 'hsl(var(--surface))' }}>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Technical Metrics & Capabilities
                      </div>
                      {stage.metrics.map((m) => (
                        <div key={m} className="flex items-start gap-2 text-xs text-foreground/85">
                          <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Benchmark Comparison Table: Standard Store vs Saleixo Engineered Store */}
          <div className="rounded-3xl border border-border overflow-hidden" style={{ background: 'hsl(var(--card))' }}>
            <div className="p-6 sm:p-8 border-b border-border">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Architectural Benchmark</span>
              <h3 className="text-2xl font-bold text-foreground mt-1">Standard Store vs. Saleixo Engineered Store</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Why generic template setups underperform and how our engineering standard preserves margin.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border" style={{ background: 'hsl(var(--surface))' }}>
                    <th className="p-4 font-semibold text-foreground w-1/4">Feature Dimension</th>
                    <th className="p-4 font-semibold text-muted-foreground w-3/8">Standard Template Store</th>
                    <th className="p-4 font-semibold text-primary w-3/8">Saleixo Engineered Store</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {CRO_COMPARISON.map((row) => (
                    <tr key={row.feature} className="hover:bg-surface-elevated/50 transition-colors">
                      <td className="p-4 font-bold text-foreground align-top">{row.feature}</td>
                      <td className="p-4 text-muted-foreground align-top">{row.standard}</td>
                      <td className="p-4 text-foreground font-medium align-top">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{row.saleixo}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 5: FULL-SERVICE CAPABILITIES ("WHAT WE DELIVER")
            ═════════════════════════════════════════════════════════════════════ */}
        <section className={`py-10 md:py-14 ${W} border-b border-border`}>
          <div className="max-w-4xl mb-14">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 text-primary bg-primary/10">
                <Boxes className="w-3.5 h-3.5" />
                Comprehensive Deliverables
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4"
                style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
              >
                Everything Required to Launch & Scale.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                A full-stack commerce practice combining bespoke frontend design with backend integrations, edge logic,
                and technical SEO foundation.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <Reveal key={cap.title} delay={idx * 0.06} className="h-full">
                  <div
                    className="p-6 rounded-2xl border border-border h-full flex flex-col justify-between transition-all duration-200 hover:border-primary/40 hover:shadow-sm"
                    style={{ background: 'hsl(var(--surface))' }}
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-primary/10 text-primary">
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-base font-bold text-foreground mb-2">{cap.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 6: 14-DAY LAUNCH BLUEPRINT (OUR PROCESS)
            ═════════════════════════════════════════════ */}
        <section className={`py-10 md:py-14 ${W} border-b border-border`} style={{ background: 'hsl(var(--surface))' }}>
          <div className="max-w-4xl mb-14">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 text-primary bg-primary/10">
                <Clock className="w-3.5 h-3.5" />
                Execution Timeline
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4"
                style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
              >
                14-Day Enterprise Kickoff-to-Launch Blueprint.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                A disciplined, milestone-driven execution cycle with fixed deadlines and zero surprises.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PROCESS_STEPS.map((step, idx) => (
              <Reveal key={step.num} delay={idx * 0.08} className="h-full">
                <div
                  className="p-5 rounded-2xl border border-border h-full flex flex-col justify-between"
                  style={{ background: 'hsl(var(--card))' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-2xl font-extrabold"
                        style={{ color: 'hsl(var(--primary))', fontFamily: '"Inter Tight", Inter, sans-serif' }}
                      >
                        {step.num}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-muted-foreground border border-border">
                        {step.day}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 7: STOREFRONT VISUAL SHOWCASE
            ═════════════════════════════════════════════════════════════════════ */}
        <section className={`py-10 md:py-14 ${W} border-b border-border`}>
          <div className="max-w-4xl mb-14">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 text-primary bg-primary/10">
                <Layers className="w-3.5 h-3.5" />
                Storefront Merchandising
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4"
                style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
              >
                Product Pages That Inspire Buying Confidence.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Clean visual hierarchy, authentic texture close-ups, and lifestyle staging tailored for DTC conversion.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VISUAL_SHOWCASE.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.08} className="h-full">
                <div
                  className="rounded-2xl border border-border overflow-hidden h-full flex flex-col justify-between"
                  style={{ background: 'hsl(var(--surface))' }}
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold text-white bg-black/65 backdrop-blur-sm">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 8: ENTERPRISE FAQ ACCORDION (WAI-ARIA COMPLIANT)
            ═════════════════════════════════════════════════════════════════════ */}
        <section className={`py-10 md:py-14 ${W} border-b border-border`} style={{ background: 'hsl(var(--surface))' }}>
          <div className="max-w-4xl mb-14">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 text-primary bg-primary/10">
                Frequently Asked Questions
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4"
                style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
              >
                Technical & Operational Queries Answered.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Everything you need to know about Shopify Checkout Extensibility, Flow automations, migrations, and
                server-side tracking.
              </p>
            </Reveal>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-border overflow-hidden transition-colors"
                  style={{ background: 'hsl(var(--card))' }}
                >
                  <button
                    type="button"
                    id={`faq-btn-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-foreground text-sm sm:text-base hover:text-primary transition-colors cursor-pointer"
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
            SECTION 9: HIGH-IMPACT CONVERSION CTA BLOCK
            ═════════════════════════════════════════════════════════════════════ */}
        <section className={`py-10 md:py-14 ${W}`}>
          <div
            className="rounded-3xl p-8 sm:p-14 text-center border border-border relative overflow-hidden"
            style={{ background: 'hsl(var(--card))' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 text-primary bg-primary/10">
              Free Technical Storefront Audit
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4 max-w-2xl mx-auto"
              style={{ fontFamily: '"Inter Tight", Inter, sans-serif' }}
            >
              Ready to Build a High-Velocity Shopify Store?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm leading-relaxed">
              Schedule a 30-minute technical architecture consultation. We'll audit your catalog, app stack, and
              checkout flow with zero obligation. You keep the written scope document whether you partner with us or not.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 justify-center mb-10">
              <Link
                to="/get-started"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 shadow-sm"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
              >
                Request Enterprise Scope <ArrowRight className="w-4 h-4" strokeWidth={2} />
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
                Sub-100ms Functions Latency
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                99.99% Cloud Infrastructure Uptime
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                14-Day Delivery Roadmap
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

export default Shopify;
