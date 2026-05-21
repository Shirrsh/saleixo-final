# Design — Services: Four Disciplines Redesign

## Goal

Replace the 3-block `FeaturedServices` component with a 4-block version that
presents Ecommerce, Studio Photography, Design, and Marketing as one
integrated system. Use the existing design tokens and motion patterns from
the codebase — no new dependencies, no new global tokens (with one optional
exception, noted below).

## File-level changes

- **Replace:** `src/components/FeaturedServices.tsx`
- **No changes:** `src/pages/Index.tsx` (already imports `FeaturedServices`),
  `src/components/MarketplaceMockup.tsx`, `src/index.css`,
  `tailwind.config.ts`.

## Component architecture

```
FeaturedServices
├── (top) Section header + ServiceMatrix
├── ServiceBlock — 01 Ecommerce          (image right, MarketplaceMockup)
├── divider
├── ServiceBlock — 02 Studio Photography (image left,  PhotographyVisual)
├── divider
├── ServiceBlock — 03 Design             (image right, StaticVisual)
├── divider
└── ServiceBlock — 04 Marketing          (image left,  StaticVisual)
```

Internal helpers (all in the same file):

- `services: Service[]` — single source of truth: number, slug, anchor, tag,
  icon, color tokens, copy, features, stat, CTA. Order matters.
- `ServiceMatrix` — the 4-up grid of jump-link cards.
- `PhotographyVisual` — preserves the existing studio-lights / flash /
  scroll-driven light intensity behavior from the original photography block.
- `StaticVisual` — generic image + gradient + stat chip used by Design and
  Marketing.
- `ServiceBlock` — renders one block; takes a `Service`, `imgRight: boolean`,
  and a `visual: ReactNode` so the three different visual treatments
  (mockup / photography / static) plug in cleanly.

## Design tokens

All accent colors reference existing HSL CSS variables so they work in both
themes automatically:

| Discipline           | Token                       | Tailwind classes used                                       |
| -------------------- | --------------------------- | ----------------------------------------------------------- |
| 01 Ecommerce         | `--accent-purple`           | `text-accent-purple`, `bg-accent-purple/15`, `/40` border   |
| 02 Studio Photography| `--accent-pink`             | `text-accent-pink`, `bg-accent-pink/15`, `/40` border       |
| 03 Design            | `--primary`                 | `text-primary`, `bg-primary/15`, `border-primary/40`        |
| 04 Marketing         | inline `hsl(28 90% 55%)` ⚠  | arbitrary value classes (no token)                          |

⚠ **Optional cleanup:** Marketing uses an inline warm-orange to read
distinct from the cool palette. If we want it tokenized, add to `index.css`:

```css
/* in :root, .light, .dark */
--accent-orange: 28 90% 55%;
```

And to `tailwind.config.ts` colors:

```ts
"accent-orange": "hsl(var(--accent-orange))",
```

Then swap `colorVar: 'hsl(28 90% 55%)'` to `colorVar: 'hsl(var(--accent-orange))'`.
Not required for v1.

## Motion

Reuse the existing `fadeUp` variant pattern from the current component
(0.7s duration, `[0.22, 1, 0.36, 1]` ease, custom delay). All blocks use
`whileInView` with `viewport={{ once: true, amount: 0.2 }}` — identical to
the current implementation.

## Layout

- Section padding: `py-16 md:py-24` (slightly more breathing room than the
  current `py-12 md:py-16` to balance the new 4-card matrix above).
- Block padding: `py-12 md:py-20`.
- Block grid: `grid lg:grid-cols-2 gap-8 lg:gap-16 items-center` —
  alternating image side via `order-1` / `order-2` on lg.
- Matrix grid: `grid-cols-2 lg:grid-cols-4 gap-3` (2-up on mobile, 4-up
  desktop).
- Container: existing `container mx-auto px-4 sm:px-6 lg:px-8`.

## Photography interaction (preserved)

The studio-lights effect from the original is moved into `PhotographyVisual`
with the same internals:

- `useState` for `isFlashing`, `flashCount`, `lightProgress`
- `useRef` for `imgRef`, `hasAutoFlashed`, `isMobile`
- `IntersectionObserver` auto-fires flash once at 50% in view on mobile
- Scroll listener drives `lightProgress` 0→1 on mobile
- Hover triggers flash on desktop (via `onHoverStart`)
- All easing constants and opacities unchanged

## Anchors

Each block gets a stable `id` matching its anchor:
`#svc-ecommerce`, `#svc-photography`, `#svc-design`, `#svc-marketing`.
Matrix cards use plain `<a href="#...">` (smooth scroll inherited from
`html { scroll-behavior: smooth }` in `index.css`).

## Accessibility

- Decorative icons inside tag pills get `aria-hidden` (lucide accepts this).
- Halos and gradient overlays are `pointer-events: none`.
- All buttons are real `<Button>` (shadcn) — focus ring inherited.
- All images have descriptive `alt`.

## Risks / Edge cases

- **MarketplaceMockup** can be wide; wrap in `max-w-full overflow-hidden` to
  prevent horizontal scroll on mobile (already done in current code).
- The `PhotographyVisual` uses `useRef<HTMLDivElement>` + `motion.div` — the
  ref attaches to the motion element directly, same pattern as today.
- On very small screens the 4-card matrix collapses to 2 cols; verify
  matrix labels still fit at 320px.
