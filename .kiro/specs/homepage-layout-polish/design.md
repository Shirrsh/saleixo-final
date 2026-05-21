# Design — Homepage Layout Polish

## Goal

Make the homepage feel right on wide monitors:

- Logo lines up with the hero text edge.
- The hero left half has visual weight (glow, watermark, vertical rail,
  scroll cue) and the headline reads as a proper hero.
- All major sections extend to the viewport edges, not a 1200px center.
- Reveal-on-scroll never strands content invisible.

## File-level changes

| File                                 | Change                                                            |
| ------------------------------------ | ----------------------------------------------------------------- |
| `src/components/Header.tsx`          | Inner container: drop max-width + center, use viewport padding.   |
| `src/components/Hero.tsx`            | Wider+tighter type, viewport padding, decorative left elements.   |
| `src/index.css` (or global stylesheet) | Bump `.container` max-width + viewport padding; add `scrollNudge` keyframes. |
| `src/components/Reveal.tsx` (or wherever `useReveal` lives) | Add immediate-reveal + setTimeout fallback. |

No new dependencies. No new design tokens. The decorative left-side
elements use existing tokens (`--muted`, `--accent-*`).

## Design tokens used

All existing — nothing new is required:

- `--primary` / `--accent-pink` / `--accent-purple` for accent glows.
- `--foreground`, `--muted-foreground` for type.
- `--border` for dividers and rails.

## Layout decisions

### Header inner container

Replace:
```ts
<div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: '100%' ... }}>
```

With:
```ts
<div style={{ width: '100%', padding: '0 clamp(24px, 7vw, 140px)', height: '100%' ... }}>
```

### Hero container

Replace the 1280px-centered inner padding wrapper with:
```ts
<div style={{
  position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center',
  width: '100%', padding: '120px clamp(72px, 7vw, 140px) 80px',
  minHeight: '100vh',
}}>
```

Text column:
```ts
<div style={{ width: 'min(720px, 52%)', paddingRight: 32, ... }}>
```

Headline:
```css
font-size: clamp(3rem, 5.6vw, 5.75rem);
line-height: 1.0;
letter-spacing: -0.042em;
text-wrap: balance;
```

Badge:
```css
white-space: nowrap;
align-self: flex-start;
```

### `.container` (global)

Replace:
```css
.container { max-width: 1200px; margin: 0 auto; padding: 0 32px; }
@media (max-width: 640px) { .container { padding: 0 20px; } }
```

With:
```css
.container { max-width: 1680px; margin: 0 auto; padding: 0 clamp(32px, 7vw, 140px); }
@media (max-width: 640px) { .container { padding: 0 20px; } }
```

### Reveal observer

Replace:
```ts
useEffect(() => {
  const el = ref.current; if (!el) return;
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { el.classList.add('in'); obs.disconnect(); }
  }, { threshold: 0.08 });
  obs.observe(el);
  return () => obs.disconnect();
}, []);
```

With:
```ts
useEffect(() => {
  const el = ref.current; if (!el) return;
  // Already in/near the viewport? Reveal immediately, skip observer.
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  if (rect.top < vh && rect.bottom > 0) {
    el.classList.add('in');
    return;
  }
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { el.classList.add('in'); obs.disconnect(); }
  }, { threshold: 0.08 });
  obs.observe(el);
  // Safety: never leave content invisible.
  const fallback = setTimeout(() => { el.classList.add('in'); obs.disconnect(); }, 1800);
  return () => { obs.disconnect(); clearTimeout(fallback); };
}, []);
```

## Decorative hero elements

Each is `position: absolute` inside `.hero-desktop`, marked
`aria-hidden`, `pointer-events: none`:

1. **Top-left + bottom-left glow blobs** — two `radial-gradient` divs
   blurred with `filter: blur(80–90px)`, using the live `accent` color.

2. **Vertical rail** — at `left: 28px, top: 50%, transform:
   translateY(-50%)`, `writing-mode: vertical-rl`, reads "01 / 04 ·
   Studio Photography" with separator pills.

3. **"studio" watermark** — at `bottom: -60px, left: -20px`,
   `font-size: clamp(180px, 18vw, 320px)`, weight 800, color
   `rgba(255,255,255,.035)` (dark) / `rgba(10,10,10,.04)` (light).

4. **Scroll cue** — at `bottom: 36px, left: clamp(72px, 7vw, 140px)`,
   "Scroll ↓" with a 1.8s bobbing arrow animation
   (`@keyframes scrollNudge`).

## Animations

Add to global stylesheet:

```css
@keyframes scrollNudge {
  0%, 100% { transform: translateY(0); opacity: .7; }
  50%      { transform: translateY(4px); opacity: 1; }
}
```

## Risks / Edge cases

- **Container too wide on ultra-wide monitors**: 7vw caps at 140px each
  side; max-width 1680px prevents content from going wider than that.
  On a 3440px ultrawide, content sits in a centered 1680px column with
  extra side padding — by design.
- **Decorative rail and watermark colliding with hero text** on
  shorter viewports: at <1024px the mobile hero renders instead
  (existing breakpoint), so these elements only appear at desktop scale.
- **`text-wrap: balance` browser support**: gracefully degrades — only
  affects layout, not legibility.
