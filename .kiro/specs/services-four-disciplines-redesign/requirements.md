# Requirements — Services: Four Disciplines Redesign

## Introduction

The current `FeaturedServices` component on the homepage presents three service
blocks (Photography, Ecommerce, Graphics · Compliance) as a long vertical
list. This understates the studio's offering and buries the relationship
between disciplines. We want the homepage to clearly communicate **four**
distinct disciplines — Ecommerce, Studio Photography, Design, Marketing — as a
single connected system, with a scannable at-a-glance overview followed by
detailed sections for each.

## Functional Requirements

### 1. Section Structure

1.1 WHEN a visitor lands on the homepage and scrolls to the services section
    THEN the section SHALL begin with a header containing:
    - Eyebrow: "Four Disciplines · One Studio"
    - Headline: "Everything your store needs, under one roof." (two lines,
      with "under one roof." in italic light weight)
    - Subhead: one sentence describing the integrated team value prop.

1.2 WHEN the section header is rendered THEN a four-up matrix of cards
    SHALL render immediately below it, with one card per discipline, in
    this order: **Ecommerce → Studio Photography → Design → Marketing**.

1.3 WHEN a visitor clicks any matrix card THEN the page SHALL smooth-scroll
    to the corresponding detailed service block below (anchors
    `#svc-ecommerce`, `#svc-photography`, `#svc-design`, `#svc-marketing`).

1.4 WHEN a visitor scrolls past the matrix THEN four detailed service blocks
    SHALL render in this order with alternating image positions:
    - 01 Ecommerce — image right (uses `<MarketplaceMockup />`)
    - 02 Studio Photography — image left (uses studio-lights interaction)
    - 03 Design — image right (uses `design-service.jpg`)
    - 04 Marketing — image left (uses `marketing-service.jpg`)

### 2. Per-Block Content

2.1 WHEN a detailed service block renders THEN it SHALL contain, in order:
    - Number (`01`–`04`) + tag pill with discipline name + icon
    - Headline (3xl on mobile, up to 5xl on desktop, font-light, tracking-tight)
    - Body paragraph (text-muted-foreground, max-w-xl)
    - 2-column feature list (4 features) with checkmark bullets in the
      block's accent color
    - Primary CTA button using the block's accent color
    - Stat chip overlaid on the image (e.g. "48hr / turnaround")

2.2 WHEN a visitor views the **Ecommerce** block specifically THEN a
    secondary text link "See live storefronts" SHALL render next to the
    primary CTA, linking to `#portfolio`.

2.3 The four blocks SHALL use these exact copy values:

    **01 Ecommerce** — purple
    - Headline: "Listings that rank, convert, and stay live."
    - Body: existing ecommerce body copy (multi-marketplace management).
    - Features: listing creation + SEO copy; A+ / A++ Premium design;
      brand storefronts (Amazon, Etsy, Shopify); suppressed-listing recovery
      in 24–72 hrs.
    - CTA: "Boost Your Sales"
    - Stat: "9 marketplaces"

    **02 Studio Photography** — pink
    - Headline: "Photos that pass compliance and earn the click."
    - Body: existing photography body copy.
    - Features: white-background catalog (Amazon · Walmart spec); lifestyle
      scenes; on-model fashion/jewelry/accessories; 360° spin & short-form
      video.
    - CTA: "Book a Shoot"
    - Stat: "48hr turnaround"

    **03 Design** — primary blue
    - Headline: "Every image, exact-spec for every marketplace."
    - Body: existing graphics/compliance body copy.
    - Features: marketplace-spec main images; A+/A++ infographics; logo,
      packaging, brand identity; social creative built from the same kit.
    - CTA: "See Design Work"
    - Stat: "200+ listings fixed"

    **04 Marketing** — warm orange (`hsl(28 90% 55%)`)
    - Headline: "Ad spend that actually pays back."
    - Body: Google + Meta + Amazon PPC, conversion-tested creative.
    - Features: Amazon PPC / Sponsored Brands / DSP; Google Shopping +
      Performance Max + Meta; conversion-tested ad creative & A/B testing;
      weekly reporting on spend, ROAS, rank.
    - CTA: "Plan a Campaign"
    - Stat: "250% avg. ROAS"

### 3. Visual System

3.1 WHEN any detailed block renders THEN a soft radial color halo SHALL sit
    behind the image, using that block's accent color at low opacity (~22%).

3.2 WHEN any matrix card renders THEN a 2px top border in the block's accent
    color SHALL appear at the card's top edge; on hover the card SHALL lift
    -4px and the border color SHALL strengthen.

3.3 WHEN the **Studio Photography** image is in view on touch devices THEN
    the existing scroll-driven studio-lights effect SHALL trigger (left
    cone, right cone, rim light, warm tint) per the current implementation.

3.4 WHEN the photography image is hovered (non-touch) or tapped (touch) THEN
    the existing flash burst animation SHALL fire.

## Preservation Requirements (Regression Prevention)

3.1 WHEN any other homepage section renders THEN the system SHALL CONTINUE
    TO display Hero, MarketplaceLogos, WhySaleixo, Portfolio, HowItWorks,
    Testimonials, Contact, and Footer exactly as before — no changes to
    those components.

3.2 WHEN a visitor interacts with `MarketplaceMockup` inside the Ecommerce
    block THEN the component SHALL CONTINUE TO function with its current
    slideshow, navigation arrows, and timing.

3.3 WHEN the user toggles between light and dark mode THEN every service
    block, matrix card, halo, stat chip, and CTA SHALL render correctly in
    both themes, using existing HSL design tokens.

3.4 WHEN a CTA button is clicked THEN it SHALL CONTINUE TO smooth-scroll to
    `#contact` (same behavior as the current `scrollToContact` helper).

3.5 WHEN any service block enters the viewport THEN the existing fadeUp
    framer-motion enter animation pattern (used elsewhere on the page)
    SHALL be applied.

## Accessibility Requirements

4.1 WHEN any text is rendered THEN contrast SHALL meet WCAG AA (≥4.5:1) in
    both light and dark themes — including text overlaid on stat chips.

4.2 WHEN any matrix card or CTA button is reached by keyboard THEN a
    visible focus ring SHALL render (Tailwind default focus styles).

4.3 WHEN any image is rendered THEN it SHALL include a descriptive `alt`
    attribute.

4.4 WHEN any icon is decorative (e.g. tag pill icon) THEN it SHALL be
    hidden from screen readers (`aria-hidden`).
