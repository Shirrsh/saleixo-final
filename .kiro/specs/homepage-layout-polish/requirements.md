# Requirements — Homepage Layout Polish

## Introduction

After the services 4-discipline redesign, several global layout issues
remained on wide monitors (≥1440px):

- The `SALEIXO` logo sat in a centered 1280px header bar, misaligned with
  the hero text below.
- The hero's left half was a large empty black rectangle — text trapped
  inside a 1280px container, no decorative weight on the left.
- All `.container`-based sections (Services, WhySaleixo, Testimonials,
  Contact, Footer) were constrained to 1200px, leaving wide side gutters.
- Reveal-on-scroll content occasionally stayed invisible if the
  IntersectionObserver didn't fire (network jank, fast scroll, etc.).

This spec resolves all four.

## Functional Requirements

### 1. Header logo alignment

1.1 WHEN the fixed `Header` renders at any viewport width THEN its inner
    container SHALL use `width: 100%` with horizontal padding
    `clamp(24px, 7vw, 140px)` — no centered max-width.

1.2 WHEN viewed at ≥1440px THEN the `SALEIXO` logo's left edge SHALL
    visually align with the hero text's left edge (both using 7vw
    viewport padding).

### 2. Hero polish

2.1 WHEN the desktop hero renders THEN the inner padding container SHALL
    use `padding: 120px clamp(72px, 7vw, 140px) 80px` (no max-width).

2.2 WHEN the desktop hero renders THEN the text column SHALL be sized
    `width: min(720px, 52%)` with `paddingRight: 32px` so it never
    overlaps the right-side gallery on narrower desktops.

2.3 WHEN the desktop hero headline renders THEN it SHALL use
    `font-size: clamp(3rem, 5.6vw, 5.75rem)` with `letter-spacing:
    -0.042em` and `line-height: 1.0` — giving the section real hero
    presence.

2.4 WHEN the desktop hero badge "✦ Ecommerce · Studio Photography ·
    Design · Marketing" renders THEN it SHALL stay on one line
    (`white-space: nowrap`).

2.5 WHEN any `.btn-ghost` renders THEN its label SHALL stay on one line
    (`white-space: nowrap`).

2.6 WHEN the desktop hero renders on a dark theme THEN two soft accent
    glow blobs SHALL fill the left side (top-left ~820px, bottom-left
    ~600px) using the live accent color at low alpha.

2.7 WHEN the desktop hero renders THEN three decorative left-side
    elements SHALL render:
    - A vertical `writing-mode: vertical-rl` rail at `left: 28px`,
      centered vertically: "01 / 04 · STUDIO PHOTOGRAPHY".
    - An oversized "studio" wordmark watermark anchored to the
      bottom-left, ~18vw font-size, very low alpha.
    - A bottom-left "Scroll ↓" cue with a gently bobbing accent arrow
      (animation: `scrollNudge 1.8s ease-in-out infinite`).

### 3. Full-width container

3.1 WHEN any section using `.container` renders THEN the container SHALL
    use `max-width: 1680px` with `padding: 0 clamp(32px, 7vw, 140px)`.

3.2 WHEN the viewport is ≤640px THEN container padding SHALL collapse to
    `0 20px` (existing rule, preserved).

3.3 WHEN the Portfolio section renders THEN it SHALL CONTINUE TO use its
    intentionally narrower `max-width: 960px` override (the bento grid
    was tuned for that width).

### 4. Reveal-observer safety

4.1 WHEN the `useReveal` hook runs on a mounted element THEN it SHALL
    first check `getBoundingClientRect` against the viewport — if the
    element is already in or near the viewport at mount time, add the
    `.in` class immediately without waiting for the observer.

4.2 WHEN the IntersectionObserver does not fire within 1800ms of mount
    THEN a fallback `setTimeout` SHALL force-add `.in` to the element so
    content is never left invisible.

4.3 WHEN the component unmounts THEN both the observer and the fallback
    timeout SHALL be cleaned up.

## Preservation Requirements (Regression Prevention)

5.1 WHEN the mobile hero renders THEN it SHALL CONTINUE TO use its
    existing 96px/20px padding, image marquee, and centered layout.

5.2 WHEN the mega menu, mobile drawer, theme toggle, or Book Call CTA
    render in the header THEN their behavior SHALL be unchanged.

5.3 WHEN any element with `className="reveal"` enters the viewport via
    normal scroll THEN it SHALL CONTINUE TO animate in via the existing
    `.reveal.in` CSS transition (no visual regression).

5.4 WHEN the WhySaleixo grid renders THEN it SHALL CONTINUE TO use
    `repeat(auto-fill, minmax(260px, 1fr))` — wider container means more
    cards per row on large monitors (expected, not a regression).

## Accessibility Requirements

6.1 WHEN the decorative left-side rail, watermark, and scroll cue render
    THEN they SHALL be marked `aria-hidden="true"` and
    `pointer-events: none`.

6.2 WHEN the hero headline is rendered at the new larger scale THEN
    contrast SHALL still meet WCAG AA in both themes.
