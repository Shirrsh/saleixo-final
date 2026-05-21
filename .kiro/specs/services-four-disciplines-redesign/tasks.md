# Implementation Plan — Services: Four Disciplines Redesign

A reference port of `FeaturedServices.tsx` is attached as
`FeaturedServices.tsx` in the same chat thread; you may use it as the
target output. Verify against the requirements + design docs before
committing.

- [ ] 1. Read context and confirm scope
  - Read `src/components/FeaturedServices.tsx` (current 3-block version).
  - Read `src/pages/Index.tsx` and confirm `FeaturedServices` is imported
    once and rendered between `MarketplaceLogos` and `WhySaleixo`.
  - Read `src/components/MarketplaceMockup.tsx` — confirm it is a default
    export with no required props.
  - Read `src/index.css` and `tailwind.config.ts` to confirm the following
    tokens exist: `--accent-pink`, `--accent-purple`, `--primary`,
    `--border-glow`, `--surface`, `--border`, `--foreground`,
    `--muted-foreground`.
  - _Requirements: 1.1, 3.1, 3.2_

- [ ] 2. Define the `services` data array
  - In a new draft of `FeaturedServices.tsx`, declare a typed
    `services: Service[]` array with **four entries** in order:
    Ecommerce, Studio Photography, Design, Marketing.
  - Each entry has: `num`, `slug`, `anchor`, `tag`, `short`, `Icon`,
    `colorVar` (HSL string referencing the right token),
    `colorClassText` / `colorClassBg` / `colorClassBorder`, `headline`,
    `body`, `features` (string[4]), `stat`, `cta`.
  - Use exact copy and stat values from Requirements §2.3.
  - Use `hsl(28 90% 55%)` inline for Marketing (no new token).
  - _Requirements: 2.3, 3 (visual system)_

- [ ] 3. Build the section header
  - Inside the `<section id="services">` root, render:
    - `<p>` eyebrow "Four Disciplines · One Studio" — `text-xs font-bold
      tracking-[0.28em] uppercase text-muted-foreground`.
    - `<h2>` "Everything your store needs, / under one roof." — second
      line wrapped in a `<span>` with `font-light italic
      text-muted-foreground`. Use `text-balance`.
    - One supporting paragraph in `text-muted-foreground`.
  - Wrap the header in a `motion.div` using the existing `fadeUp` variant
    with `whileInView`.
  - _Requirements: 1.1_

- [ ] 4. Build the `ServiceMatrix` component
  - Render a `<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">`.
  - For each service, render an `<a href={#${anchor}}>` card with:
    - Top 2px accent border (inline `borderTop` using `colorVar`).
    - Number tag (`text-xs font-bold tracking-[0.2em] tabular-nums`).
    - 36px rounded icon container using `colorClassBg` + `colorClassBorder`.
    - Service `tag` (bold) + `short` description (muted).
    - "Jump ↓" footer in accent color.
  - On hover: `-translate-y-1`, soft shadow, accent border strengthens.
  - Verify all four cards fit at 320px (2-up); accept text wrap if needed.
  - _Requirements: 1.2, 1.3, 3.2, 4.2_

- [ ] 5. Build the `PhotographyVisual` helper
  - Move the existing studio-lights + flash + scroll-driven light intensity
    logic from the current photography block into a self-contained
    `PhotographyVisual` component.
  - Preserve exactly:
    - `useState` for `isFlashing`, `flashCount`, `lightProgress`.
    - `useRef` for `imgRef`, `hasAutoFlashed`, `isMobile`.
    - `IntersectionObserver` at threshold 0.5 with `hasAutoFlashed` guard.
    - Scroll listener computing `progress` from `getBoundingClientRect`.
    - Derived values: `leftConeOpacity`, `rightConeOpacity`, `rimOpacity`,
      `warmTint`, `imgScale`.
    - Three `motion.div` flash bursts inside `<AnimatePresence>`.
  - Render `<motion.div onHoverStart={triggerFlash} onClick={triggerFlash}>`
    wrapping `<img src={photographyImg}>` plus the four light layers and
    the flash bursts.
  - Add the new "48hr / turnaround" stat chip overlay (bottom-left).
  - _Requirements: 2.1, 3.3, 3.4 ; Preservation: 3.5_

- [ ] 6. Build the `StaticVisual` helper
  - A simple component used by Design and Marketing.
  - Props: `src`, `alt`, `stat: { value, label }`, `accentVar`.
  - Renders `<motion.div variants={fadeUp}>` wrapping `<img>` +
    `bg-gradient-to-t from-black/45 to-transparent` overlay + stat chip
    using `accentVar` for the border color.
  - _Requirements: 2.1, 3.1_

- [ ] 7. Build the `ServiceBlock` row component
  - Props: `service: Service`, `imgRight: boolean`, `visual: ReactNode`.
  - Outer: `<motion.div id={service.anchor} className="container ...
    py-12 md:py-20 scroll-mt-20">`.
  - Inner: `grid lg:grid-cols-2 gap-8 lg:gap-16 items-center`.
  - Visual column: applies `order-1 lg:order-2` (or `1`) based on
    `imgRight`. Behind the visual, render a radial halo
    (`absolute -inset-6 rounded-[2rem] blur-3xl opacity-60
    pointer-events-none`) using `colorVar` at ~22%.
  - Text column: applies the opposite order. Renders:
    - Tag row: number + thin accent rule + pill containing icon + tag.
    - `<h2>` headline (`text-3xl md:text-4xl lg:text-5xl font-light
      tracking-tight leading-[1.1] text-balance`).
    - Body paragraph (`text-base md:text-lg text-muted-foreground
      max-w-xl leading-relaxed`).
    - Features as `<ul className="grid sm:grid-cols-2 gap-x-5 gap-y-3">`
      with checkmark bullets.
    - Primary `<Button>` styled inline with `background: colorVar` and a
      `boxShadow` glow at 35% alpha.
    - If `service.slug === 'ecommerce'`, append a secondary
      "See live storefronts →" link to `#portfolio`.
  - All text elements use the `fadeUp` motion variant with staggered
    `custom` indices.
  - _Requirements: 2.1, 2.2, 3.1, 4.1_

- [ ] 8. Compose the section
  - Render in this exact order:
    1. Section header + `<ServiceMatrix />` (inside one motion container).
    2. `<ServiceBlock service={ecommerce}    imgRight={true}  visual={<MarketplaceMockup />} />`
    3. Container-aligned `<div className="h-px bg-border" />` divider.
    4. `<ServiceBlock service={photography}  imgRight={false} visual={<PhotographyVisual />} />`
    5. divider
    6. `<ServiceBlock service={design}       imgRight={true}  visual={<StaticVisual src={designImg} ... />} />`
    7. divider
    8. `<ServiceBlock service={marketing}    imgRight={false} visual={<StaticVisual src={marketingImg} ... />} />`
  - Top-level `<section id="services" className="py-16 md:py-24 bg-transparent">`.
  - _Requirements: 1.2, 1.4_

- [ ] 9. Verify imports
  - Confirm imports at top of file:
    - `Button` from `@/components/ui/button`
    - `Camera, ShoppingCart, Palette, BarChart3, Check, ArrowRight,
      ArrowDown` from `lucide-react`
    - `motion, AnimatePresence, Variants` from `framer-motion`
    - `useState, useEffect, useRef, useCallback, ReactNode` from `react`
    - `MarketplaceMockup` from `@/components/MarketplaceMockup`
    - `photographyImg`, `designImg`, `marketingImg` from `@/assets/...`
  - Remove unused imports (`Layers` is no longer used).
  - _Requirements: 1.1_

- [ ] 10. Verify rendering and run dev preview
  - Run `npm run dev` (or `bun dev`). Open the homepage.
  - Confirm the section renders with header + 4 matrix cards + 4 blocks
    in the correct order.
  - Click each matrix card and confirm it scrolls to the correct anchor.
  - Hover the photography image on desktop and confirm flash fires.
  - On mobile (devtools responsive mode, `(hover: none)`), scroll past
    the photography block and confirm:
    - Lights ramp on as it enters view.
    - Auto-flash fires once at 50% visibility.
  - Toggle dark / light theme and confirm all blocks render correctly.
  - Confirm no TypeScript or ESLint errors (`bun run build` succeeds).
  - _Requirements: 3.1, 3.2, 3.3, 4.1, 4.2_

- [ ] 11. Manual QA checklist
  - [ ] All 4 service blocks are visible.
  - [ ] Order is Ecommerce → Photography → Design → Marketing.
  - [ ] Image positions alternate (right, left, right, left).
  - [ ] Each block uses the correct accent color throughout (tag pill,
        check bullets, CTA, halo, stat chip border).
  - [ ] `MarketplaceMockup` still navigates between marketplaces inside
        the Ecommerce block.
  - [ ] Photography studio-lights and flash interactions still work.
  - [ ] CTAs scroll to `#contact`.
  - [ ] "See live storefronts" only appears on the Ecommerce block.
  - [ ] Matrix card hover lifts -4px and the border color strengthens.
  - [ ] No horizontal scroll on mobile (320px).
  - [ ] No regressions on other homepage sections.
  - _Requirements: ALL_

- [ ] 12. (Optional) Tokenize Marketing accent
  - Only if requested as follow-up.
  - Add `--accent-orange: 28 90% 55%;` to `:root`, `.light`, `.dark` in
    `src/index.css`.
  - Add `"accent-orange": "hsl(var(--accent-orange))"` to
    `tailwind.config.ts` colors.
  - Replace inline `hsl(28 90% 55%)` in the Marketing service entry with
    `hsl(var(--accent-orange))` and swap arbitrary-value Tailwind classes
    for the new utility class.
  - _Requirements: 3 (visual system) — non-blocking_
