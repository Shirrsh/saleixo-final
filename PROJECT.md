# Project: Saleixo Service Architecture Restructuring

## Architecture
Saleixo is a marketing and growth studio for D2C brands and marketplace sellers. This restructuring establishes Amazon as a primary flagship category aligned with official Amazon Service Provider Network (SPN) sub-service categories, elevates the Shopify service page into an enterprise-grade showcase (Flow Automations, Analytics/CRO, Shopify Plus), aligns navigation hierarchy across desktop and mobile, and synchronizes CustomPricing.

### Technology Stack & Design System
- Vite 5 + React 18 + TypeScript 5 (SWC)
- Tailwind CSS 3.4 with established tokens in `src/index.css`
- Lucide React icons (stroke-width 1.5)
- framer-motion animations (`Reveal`, `GradientText`, `AnimatePresence`)
- Multi-currency engine (`CurrencyContext.tsx` supporting 15 currencies via `fmt(usd, inr)`)
- Zero external route additions (strictly preserves `src/App.tsx` routes, using section anchor IDs `#imaging`, `#cataloging`, `#automations`, etc.)

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Amazon SPN 8-Pillar Architecture | Map all 8 SPN disciplines: Imaging, Cataloging & Listing, A+ / Premium A++, Advertising & PPC, Account Management & Health, Brand Storefronts, FBA & Logistics, Global Expansion | M1 | Survey (explorer_survey_1) |
| 2 | Amazon SPN Interactive Navigator | Tabbed/pill navigator enabling deep inspection of deliverables, SLAs, and technical parameters for each of the 8 SPN pillars | M1 | Survey (explorer_survey_1) |
| 3 | Amazon Listing Health & SPN Diagnostic | Interactive seller self-diagnostic widget assessing suppression risk, AHR score, image compliance, and PPC TACoS | M1 | Survey (explorer_survey_1) |
| 4 | Amazon Algorithm & A9/A10/Cosmos Strip | Deep-dive technical explanation of title weights, 249-byte backend keywords, indexation, and conversion rate velocity | M1 | Survey (explorer_survey_1) |
| 5 | Amazon RGB 255 Pure White Spec Gallery | Visual gallery showcasing pure white RGB 255 compliance, 1600+ px zoom, and 85% frame fill using verified repo assets | M1 | Survey (explorer_survey_1) |
| 6 | Amazon DPP & SP-API Data Security Section | Explicit communication of Data Protection Policy standards (TLS 1.2+, AES-256, MFA, 30-day deletion per Privacy.tsx) | M1 | Survey (explorer_survey_1) |
| 7 | Amazon SPN Structured FAQ & Schema | 8-question accordion addressing common seller concerns with FAQPage JSON-LD | M1 | Survey (explorer_survey_1) |
| 8 | Shopify Automations Engine | Interactive workflow visualizer demonstrating 4 production Shopify Flow automations (VIP routing, fraud holds, inventory sync, B2B orders) | M2 | Survey (explorer_survey_2) |
| 9 | Shopify Advanced Analytics & CRO Flywheel | Technical showcase of first-party server-side tracking (Meta CAPI/GA4), high-converting slide cart drawer, and A/B testing matrix | M2 | Survey (explorer_survey_2) |
| 10 | Shopify Plus Enterprise Strip | Enterprise capabilities showcase: Checkout Extensibility & Functions, B2B Wholesale, Shopify Markets global multi-store, and Launchpad event scalability | M2 | Survey (explorer_survey_2) |
| 11 | Shopify Enterprise FAQ & Process Timeline | 6-item interactive FAQ accordion and 5-stage kickoff-to-launch enterprise SLA roadmap | M2 | Survey (explorer_survey_2) |
| 12 | Header Mega-Menu 3-Pillar Hierarchy | Restructure desktop dropdown into Pillar 1 (Amazon SPN Flagship Hub with direct links to 8 disciplines), Pillar 2 (Shopify & Shopify Plus), and Pillar 3 (Creative Studio) | M3 | Survey (explorer_survey_3) |
| 13 | Mobile Navigation Drawer Restructure | Re-order drawer navigation with Amazon SPN Flagship (#1) and Shopify & Shopify Plus (#2) at the top of the menu with badging | M3 | Survey (explorer_survey_3) |
| 14 | Footer Services Alignment | Restructure footer service links into Amazon SPN, Shopify & DTC, and Studio service clusters | M3 | Survey (explorer_survey_3) |
| 15 | Services Hub Overview Card Alignment | Update Amazon and Shopify cards on `/services` to reflect new flagship and enterprise offerings | M3 | Survey (explorer_survey_3) |
| 16 | CustomPricing Tier Cards Synchronization | Update 4 tier cards (Starter, Growth, Pro, Enterprise) to explicitly detail Amazon SPN deliverables and Shopify Plus capabilities | M4 | Survey (explorer_survey_3) |
| 17 | CustomPricing 5-Table À-La-Carte Matrix | Expand à-la-carte into 5 tables: Amazon SPN Imaging, Amazon SPN Core Services, Shopify & Shopify Plus Enterprise, Ecommerce Design, and Digital Marketing | M4 | Survey (explorer_survey_3) |
| 18 | CustomPricing Add-ons & What's Not Included | Add suppression rush, Launchpad readiness, Slack support, and transparently declare Shopify/Amazon direct platform fees | M4 | Survey (explorer_survey_3) |
| 19 | Comprehensive Build & Responsive Verification | Complete project build (`npm run build`) verification with zero TypeScript diagnostics, layout check across 375px-1440px | M4 | All Surveyors |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Amazon Flagship Hub & SPN Architecture | `src/pages/services/Amazon.tsx` | none (Survey done) | DONE (8 SPN pillars, interactive navigator, diagnostic widget, RGB 255 zoom modal, SLA roadmap, DPP security, FAQ schema) |
| M2 | Shopify & Shopify Plus Enterprise Overhaul | `src/pages/services/Shopify.tsx` | none (Survey done) | DONE (Shopify Plus strip, Automations engine, Analytics/CRO flywheel, 14-day roadmap, FAQ schema) |
| M3 | Navigation & Site-Wide Hierarchy Alignment | `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/pages/Services.tsx` | M1, M2 | DONE (Header 3-pillar mega-menu, mobile drawer hierarchy, footer service clusters, services overview cards) |
| M4 | CustomPricing Preparation & Verification | `src/pages/CustomPricing.tsx`, clean `npm run build` | M1, M2, M3 | DONE (4 tiers updated, 5 à-la-carte tables, 6 add-ons, transparent platform disclosures, clean build) |

---

## Interface Contracts

### Navigation ↔ Service Pages Anchor Contracts
- `/services/amazon#imaging` ➔ Imaging section / RGB 255 gallery in `Amazon.tsx`
- `/services/amazon#cataloging` ➔ Cataloging & Listing optimization in `Amazon.tsx`
- `/services/amazon#a-plus` ➔ A+ / Premium A++ content in `Amazon.tsx`
- `/services/amazon#advertising` ➔ Advertising & PPC in `Amazon.tsx`
- `/services/amazon#account-health` ➔ Account Management & Health in `Amazon.tsx`
- `/services/amazon#storefronts` ➔ Brand Storefronts in `Amazon.tsx`
- `/services/amazon#fba-logistics` ➔ FBA & Logistics in `Amazon.tsx`
- `/services/amazon#global-expansion` ➔ Global Expansion in `Amazon.tsx`
- `/services/shopify#automations` ➔ Shopify Automations Engine in `Shopify.tsx`
- `/services/shopify#plus` ➔ Shopify Plus Enterprise Strip in `Shopify.tsx`
- `/services/shopify#analytics` ➔ Advanced Analytics & CRO Flywheel in `Shopify.tsx`

### Pricing ↔ Service Pages Terminology Contracts
- Amazon SPN categories in `CustomPricing.tsx` match exact names in `Amazon.tsx` and `AMAZON-SPN-QUALIFICATION-GUIDE.md`.
- Shopify features in `CustomPricing.tsx` match Flow Automations, Checkout Extensibility, and Plus terms in `Shopify.tsx`.
- Pricing formatted with `useCurrency().fmt(usd, inr)` across all tables.

---

## Code Layout
- `src/pages/services/Amazon.tsx`: Owned by M1 Worker
- `src/pages/services/Shopify.tsx`: Owned by M2 Worker
- `src/components/Header.tsx`: Owned by M3 Worker
- `src/components/Footer.tsx`: Owned by M3 Worker
- `src/pages/Services.tsx`: Owned by M3 Worker
- `src/pages/CustomPricing.tsx`: Owned by M4 Worker
