# Implementation Plan — Homepage Layout Polish

- [ ] 1. Read context
  - Open `src/components/Header.tsx`, `src/components/Hero.tsx`,
    `src/index.css`, and the file that defines `useReveal` (likely
    `src/components/Reveal.tsx` or a hooks file).
  - Confirm the existing `.container` CSS rule lives in `index.css` (or
    a global stylesheet) and is currently `max-width: 1200px;`.
  - Confirm the existing `useReveal` hook matches the snippet quoted in
    `design.md`.
  - _Requirements: 1.1, 2.1, 3.1, 4.1_

- [ ] 2. Update `.container` to full-width
  - In `src/index.css`, replace the `.container` rule with:
    ```css
    .container { max-width: 1680px; margin: 0 auto; padding: 0 clamp(32px, 7vw, 140px); }
    @media (max-width: 640px) { .container { padding: 0 20px; } }
    ```
  - Verify the Portfolio section's local `max-width: 960px` override is
    untouched — that section must stay narrow.
  - _Requirements: 3.1, 3.2, 3.3, 5.4_

- [ ] 3. Add `scrollNudge` keyframes to global CSS
  - Append to `src/index.css`:
    ```css
    @keyframes scrollNudge {
      0%, 100% { transform: translateY(0); opacity: .7; }
      50%      { transform: translateY(4px); opacity: 1; }
    }
    ```
  - _Requirements: 2.7_

- [ ] 4. Header — viewport-padded inner container
  - In `src/components/Header.tsx`, locate the fixed `<header>`'s inner
    container `<div>`.
  - Replace its inline style:
    - Drop `maxWidth: 1280`, `margin: '0 auto'`, `padding: '0 24px'`.
    - Add `width: '100%'`, `padding: '0 clamp(24px, 7vw, 140px)'`.
  - Leave the rest of the header (logo, nav, theme toggle, CTAs, mobile
    drawer) untouched.
  - Run dev preview and confirm at 1920px viewport the logo sits flush
    against the same left edge as the hero text below.
  - _Requirements: 1.1, 1.2, 5.2_

- [ ] 5. Hero — outer padding + text column resize
  - In `src/components/Hero.tsx`, locate the desktop hero's inner
    padding container (the one wrapping the text column + spacer).
  - Replace its style:
    - Drop `maxWidth: 1280`, `margin: '0 auto'`.
    - Set `width: '100%'`, `padding: '120px clamp(72px, 7vw, 140px) 80px'`.
  - Update the text column from `width: '50%'` / `paddingRight: 48` to
    `width: 'min(720px, 52%)'` / `paddingRight: 32`.
  - Update the right-side spacer from `width: '50%'` to `flex: 1`.
  - _Requirements: 2.1, 2.2_

- [ ] 6. Hero — typography upgrade
  - Inside the desktop hero text column:
    - Headline `<h1>` style:
      `font-size: clamp(3rem, 5.6vw, 5.75rem)`,
      `line-height: 1.0`,
      `letter-spacing: -0.042em`,
      `text-wrap: balance`,
      `margin: 24px 0 22px`.
    - Body paragraph: `font-size: 17px`, `line-height: 1.65`,
      `margin-bottom: 30px`, `max-width: 460px`.
  - Add `white-space: nowrap` and `align-self: flex-start` to the badge
    span.
  - _Requirements: 2.3, 2.4_

- [ ] 7. Hero — decorative left-side elements
  - Add four `position: absolute` elements as direct children of the
    `.hero-desktop` wrapper (or whatever the desktop hero outer is in
    your codebase). Each is `aria-hidden` and `pointer-events: none`.
  - **Glow blob 1** (dark theme only): top -5%, left -8%, 820×820,
    blurred radial of accent at 0.4 → 0.1 → 0 alpha, blur 80px.
  - **Glow blob 2** (dark theme only): bottom -15%, left 12%, 600×600,
    blurred radial of accent at 0.19 → 0 alpha, blur 90px.
  - **Vertical rail**: `left: 28, top: 50%, transform:
    translateY(-50%)`, `writing-mode: vertical-rl`, fontSize 11,
    fontWeight 700, letter-spacing `.34em`, uppercase. Renders a line
    "01 / 04 · STUDIO PHOTOGRAPHY" with two 1×28 separator bars and the
    accent color on "01 / 04".
  - **"studio" watermark**: `left: -20, bottom: -60`, font-weight 800,
    letter-spacing -0.06em, font-size `clamp(180px, 18vw, 320px)`,
    line-height 0.82, color `rgba(255,255,255,.035)` (dark) or
    `rgba(10,10,10,.04)` (light), `white-space: nowrap`.
  - **Scroll cue**: `left: clamp(72px, 7vw, 140px), bottom: 36px`, zIndex
    10. Renders `<span>` 36×1 bar + "SCROLL" text + arrow `<span>`
    with `animation: scrollNudge 1.8s ease-in-out infinite` and color
    set to the accent.
  - _Requirements: 2.6, 2.7, 6.1_

- [ ] 8. Hero — global `.btn-ghost` nowrap
  - In `src/index.css` find the `.btn-ghost` rule (or component-level
    style) and add `white-space: nowrap;`.
  - _Requirements: 2.5_

- [ ] 9. `useReveal` — immediate-reveal + fallback
  - Open the file containing `useReveal`.
  - Replace the body of the `useEffect` with the version in `design.md`
    §"Reveal observer". Key additions:
    - Immediate `getBoundingClientRect`-based reveal if already on screen.
    - `setTimeout(1800ms)` fallback that adds `.in` and disconnects.
    - Cleanup now clears both observer and timeout.
  - _Requirements: 4.1, 4.2, 4.3, 5.3_

- [ ] 10. Smoke test at multiple breakpoints
  - Run `npm run dev` (or `bun dev`) and inspect at:
    - 1920px wide — logo aligns with hero text edge, headline ~92px tall,
      decorative elements visible on left.
    - 1440px wide — same alignment, headline scales down via clamp.
    - 1280px wide — gallery and text columns still don't overlap.
    - 1024px wide — mobile hero takes over (existing breakpoint).
    - 414px wide — `.container` collapses to `padding: 0 20px`, no
      horizontal scroll.
  - Toggle dark/light theme and confirm all decorative elements render
    correctly in both.
  - _Requirements: ALL_

- [ ] 11. Regression checklist
  - [ ] Header mega-menu still opens on hover (desktop).
  - [ ] Mobile drawer still opens via hamburger and closes on item tap.
  - [ ] Theme toggle still flips themes globally.
  - [ ] Book Call CTA still scrolls to `#contact`.
  - [ ] WhySaleixo cards still animate in via reveal (and now reveal
        immediately if mounted on-screen).
  - [ ] Portfolio bento grid stays at its 960px width.
  - [ ] No new TypeScript or ESLint errors.
  - [ ] `bun run build` (or `npm run build`) succeeds.
  - _Requirements: 5.1, 5.2, 5.3, 5.4_
