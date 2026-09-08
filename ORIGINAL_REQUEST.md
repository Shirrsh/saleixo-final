# Original User Request

## Initial Request — 2026-09-06T16:57:36Z

Restructure Saleixo's service architecture to establish Amazon as a primary flagship category aligned with official Amazon SPN (Service Provider Network) sub-service categories, significantly elevate the Shopify Services page to showcase automations, advanced analytics, and Shopify Plus enterprise capabilities, update site navigation menus, and prepare corresponding pricing structure updates.

Working directory: c:\SALEIXO\saleixo-digital-studio

Please follow all requirements in the project prompt:
- R1: Amazon Flagship Hub & SPN / SPP Architecture (Imaging, Cataloging & Listing, A+ / Premium A++, Advertising & PPC, Account Management & Health, Brand Storefronts, FBA & Logistics, Global Expansion)
- R2: Shopify & Shopify Plus Enterprise Page Overhaul (Shopify Automations Engine, Advanced Analytics & CRO, Shopify Plus Enterprise Strip with Checkout Extensibility, B2B wholesale, global multi-store, and Launchpad scalability)
- R3: Navigation & Site-Wide Hierarchy Alignment (Header mega-menu, mobile navigation drawer, Footer)
- R4: CustomPricing Preparation
- Adhere strictly to the design tokens in src/index.css, AGENTS.md guardrails, zero unverified claims, responsive across 375px-1440px, and ensure npm run build succeeds cleanly.

## 2026-09-08T08:57:19Z

# Teamwork Project Prompt — Final Draft

> Status: Launched
> Goal: Execute project → User approval → Verification
> Mode: Development / Polishing & Precision Calibration
> Working Directory: c:\SALEIXO\saleixo-digital-studio

---

## Project Overview

Execute a precision audit, copy refinement, spatial tightening, and behavioral polish across Saleixo (`saleixo.com`):
1. **Purge False Payment/Compliance Claims**: Completely remove the "US Domestic Invoicing & Direct Payments" banner from `CustomPricing.tsx`, purge `🇺🇸 W-8BEN Verified` from `Footer.tsx`, and eliminate all mentions of US ACH Wire and W-8BEN from FAQs and sprint footnotes.
2. **Recalibrate Add-On Pricing to Lower-Tier Sweet Spot ($29–$49 Range)**: Update all add-on capabilities in `CustomPricing.tsx` to accessible, competitive rates.
3. **Tighten Section Spacing Across All Pages**: Polish homepage and interior page layouts by reducing excessive vertical padding (`py-24`, `py-32`, stacked margins) to tight, cohesive spacing (`py-10 md:py-14` / `py-12 md:py-16`), removing large blank gaps.
4. **Auto-Vanish Red Announcement Bar After 10 Minutes**: Add a persistent 10-minute session timer so the red top announcement bar automatically dismisses itself after 10 minutes of elapsed time from first view.

---

## Requirements

### R1. Complete Removal of False Payment & Compliance Claims
- In src/pages/CustomPricing.tsx:
  - **Completely remove** the entire "US Domestic Invoicing & Direct Payments" section (lines 1024–1055) which displayed `Stripe USD`, `US ACH`, `Zero FX Markup`, `W-8BEN Verified`.
  - In the FAQs:
    - Update `"How are we billed?"`: Remove `"or direct US ACH wire transfer"` -> `"Monthly via Stripe (Visa, Mastercard, Amex, Apple Pay) or direct bank transfer. Invoices are issued on the 1st of each month for the upcoming service period."`
    - Update `"What currencies do you accept?"`: Remove `"US ACH wire"` -> `"We bill primarily in USD for international clients, with support for Stripe and major international credit cards. Clients in India can also be invoiced in INR. You can use the currency converter at the top of the page to view indicative rates in your preferred local currency."`
  - In sprint & retainer notes (lines 612 & 699):
    - Change `"Prices billed in USD with zero foreign exchange markup · Invoiced via Stripe or US ACH wire."` -> `"Prices billed in USD · Invoiced securely via Stripe or direct bank transfer."`
- In src/components/Footer.tsx:
  - Remove `🇺🇸 W-8BEN Verified` badge from the bottom compliance bar (leaving `🔒 100% Confidential (Mutual NDA)` and canonical branding).
- Verify zero remaining occurrences of `ACH` or `W-8BEN` across the entire repository.

---

### R2. Add-On Pricing Recalibration ($29–$49 Range)
In src/pages/CustomPricing.tsx, update `localAddOns` with the lower-tier rates:
- **48-hr Express Photo Delivery (Rush turnaround)**: **`$29 / ₹2,499`** *(was $99 / ₹7,999)*
- **24-hr Emergency Suppression Response (Rapid listing recovery)**: **`$49 / ₹3,999`** *(was $149 / ₹12,499)*
- **Shopify Launchpad Event Support (Flash sale automation)**: **`$49 / ₹3,999`** *(was $199 / ₹16,499)*
- **Dedicated Slack / WhatsApp Priority Channel (Real-time team access)**: **`$29/mo / ₹2,499/mo`** *(was $99/mo / ₹7,999/mo)*
- **Extra Revision Round (Beyond 2 included in plan)**: **`$15 / ₹1,299`** *(was $29 / ₹2,499)*
- **Additional Marketplace Sync (Per global region)**: **`$29/mo / ₹2,499/mo`** *(was $79/mo / ₹6,599/mo)*

---

### R3. Tighten Blank Free Gaps & Section Spacing Across All Pages
Eliminate excessive vertical spacing and dead blank gaps while retaining modern visual hierarchy:
- **Homepage (src/pages/Index.tsx & sub-components)**:
  - src/components/FeaturedServices.tsx: Reduce `py-14 md:py-20 lg:py-24` -> `py-10 md:py-16`.
  - src/components/WhySaleixo.tsx: Reduce `py-16 md:py-24` -> `py-10 md:py-16`.
  - src/components/USStandardsStrip.tsx: Reduce `py-16 md:py-20` -> `py-10 md:py-14`.
  - src/components/Portfolio.tsx: Reduce `py-14 md:py-20` -> `py-10 md:py-14`.
  - src/components/FAQ.tsx: Reduce `py-16 md:py-24` -> `py-10 md:py-16`.
  - src/components/Contact.tsx: Reduce `py-24 lg:py-32` -> `py-12 lg:py-18`.
- **Interior Pages**:
  - src/pages/CustomPricing.tsx: Reduce section bottom paddings from `pb-20` -> `pb-10` or `pb-12`.
  - src/pages/Services.tsx, src/pages/About.tsx, src/pages/Contact.tsx: Adjust hero bottom margins and section paddings to ensure consistent rhythm.

---

### R4. 10-Minute Auto-Vanish Timer for Red Announcement Bar
- In src/components/Header.tsx:
  - Record the first visit timestamp in `localStorage` under key `saleixo_bar_first_seen`.
  - Calculate elapsed time: `Date.now() - firstSeen`.
  - If elapsed >= 10 minutes (`10 * 60 * 1000` ms), do not render the bar on load (`showBar = false`).
  - If elapsed < 10 minutes, display the bar and set an automatic timer for the remaining milliseconds `(10 * 60 * 1000 - elapsed)` that triggers `dismissBar()` when reached.
  - Animate closed smoothly via framer-motion and dispatch `bar-dismissed` event so hero and header layout offsets update seamlessly.

---

## Acceptance Criteria

### Payment & Compliance Cleanliness
- [ ] No occurrences of `ACH` or `W-8BEN` remain anywhere in `CustomPricing.tsx`, `Footer.tsx`, or site copy.
- [ ] The "US Domestic Invoicing & Direct Payments" banner is completely absent from `CustomPricing.tsx`.

### Add-On Pricing Calibration
- [ ] All 6 add-on capabilities show the recalibrated $29–$49 rates (with proper INR conversions) in `CustomPricing.tsx`.
- [ ] Formatted correctly via `fmt()` and responsive to the currency toggle.

### Page Spacing & Rhythm
- [ ] Section transitions feel cohesive and compact without giant 100px+ empty vertical gaps.
- [ ] Responsive padding looks balanced across 375px, 768px, 1024px, and 1440px viewports.

### Announcement Bar Auto-Dismiss
- [ ] Red announcement bar automatically fades out after 10 minutes of elapsed time from the user's first visit.
- [ ] Persists across page refreshes and route changes (remains hidden once 10 minutes have elapsed).
- [ ] Manual `X` dismissal continues to work immediately.

### Code Quality & Build
- [ ] `npm run build` runs cleanly with 0 TypeScript/ESLint errors and all 22 static routes prerendered.

