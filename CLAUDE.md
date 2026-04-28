# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

**Saleixo** (formerly "Alvaio Digital Studio") — marketing website for a digital studio offering professional photography, creative design, and data-driven marketing for artisans and ecommerce sellers. Headlines: "500+ artisans helped, 98% satisfaction rate." Plus an admin CMS backed by Supabase. Originally scaffolded with Lovable; now being maintained and redesigned through Claude Code.

The site is currently deployed at `https://saleixo-final.vercel.app/` (canonical: `https://saleixo.com`). The current visual is a deep cosmic purple "Superconscious"-style hero with an oversized white wordmark. **That is the OLD direction. The new direction is Webflow.com style — see below.**

Public site lives at `/`, full admin panel at `/admin/*`. Both share the same design system.

## Stack

- **Vite 5** + **React 18** + **TypeScript 5** (SWC via `@vitejs/plugin-react-swc`)
- **Tailwind CSS 3.4** with `tailwindcss-animate` and `@tailwindcss/typography`
- **shadcn/ui** — every component lives in `src/components/ui/` and reads from CSS variables in `src/index.css`. New shadcn components must use the existing token names; do **not** introduce a parallel color system.
- **React Router 6** for routing (`src/App.tsx`)
- **TanStack Query 5** for server state
- **react-hook-form + zod** for forms
- **next-themes** for theme switching (the redesign supports BOTH light and dark — light is canonical, dark is a real variant)
- **Supabase** for auth + data (`src/integrations/supabase/`)
- **Vercel Analytics** wired in `App.tsx`
- **Bun** is the preferred package manager (`bun.lockb` is committed). `npm` also works.
- **framer-motion** is required for the redesign — install with `bun add framer-motion` if not already present.

## Commands

```bash
bun install            # or: npm install
bun run dev            # vite dev server
bun run build          # production build
bun run build:dev      # build with development mode flags
bun run lint           # eslint
bun run preview        # preview production build
```

Always run `bun run build` before declaring a redesign task complete — the Tailwind purge can hide broken class strings at dev time.

## Repo layout

```
src/
  App.tsx                       # Router + providers (TanStack, Tooltip, Toaster, Analytics)
  main.tsx                      # React mount
  index.css                     # ★ Design system — all tokens live here
  pages/
    Index.tsx                   # Public homepage (composes /components)
    Design.tsx, Services.tsx,
    Categories.tsx, Blog.tsx,
    CustomPricing.tsx,
    Privacy.tsx, Terms.tsx,
    NotFound.tsx
    services/                   # Visibility, Professional, Enterprise tiers
    admin/                      # Full CMS — out of redesign scope
  components/
    Hero.tsx, FeaturedServices.tsx, Services.tsx,
    Portfolio.tsx, HowItWorks.tsx, Contact.tsx,
    FloatingCTA.tsx, WhatsAppButton.tsx,
    ScrollProgress.tsx, ScrollToTop.tsx,
    ThemeToggle.tsx, WaveDivider.tsx, LoadingScreen.tsx
    design/                     # Sub-components for the /design page
    admin/                      # AdminLayout, ProtectedRoute, etc.
    ui/                         # shadcn primitives — DO NOT restyle these
                                # directly; restyle by changing tokens
  hooks/                        # use-mobile, use-toast, useAnimatedCounter,
                                # useAuth, useIntersectionObserver, useSiteImages
  integrations/supabase/        # client + generated types
  lib/utils.ts                  # cn() helper from shadcn
  assets/                       # All hero, portfolio, category, service images
public/                         # favicon, robots.txt, placeholder.svg
```

Path alias: `@/*` → `./src/*` (used everywhere — keep using it).

---

## Redesign target — "Webflow" style

The new visual reference is **webflow.com**. Strip the cosmic purple, replace it with Webflow's confident SaaS-brand language: clean monochrome canvas, bold geometric sans, vivid pink→purple→blue gradient as a **focused accent** (not a wash), bento grid feature sections, generous whitespace, motion-rich without feeling mystical.

### Vibe

Confident, professional, modern, clean. Premium-but-approachable. The site should feel like a serious studio that ships work, not a meditation app. **Light theme is the canonical primary**, with a high-quality dark variant. Both must be polished.

### Color palette

The palette is monochrome-first with one accent gradient. **Most surfaces are white/black/gray. Color appears in deliberate splashes — gradient-filled headline accent words, CTA glows, hover halos.**

#### Light mode (canonical)

| Token | Value | Usage |
|---|---|---|
| `--background` | `#FFFFFF` | Page background |
| `--surface` | `#FAFAFA` | Section backgrounds |
| `--surface-elevated` | `#F4F4F5` | Cards, bento tiles |
| `--foreground` | `#0A0A0A` | Primary text — near black, not pure |
| `--muted-foreground` | `#52525B` | Secondary text, labels |
| `--border` | `#E4E4E7` | Card borders, dividers |
| `--border-strong` | `#A1A1AA` | Emphasized borders |
| `--primary` | `#146EF5` | Webflow blue — primary CTA fill |
| `--primary-foreground` | `#FFFFFF` | Text on primary |
| `--accent-pink` | `#FF5C8A` | Gradient stop A |
| `--accent-purple` | `#8B5CF6` | Gradient stop B |
| `--accent-blue` | `#146EF5` | Gradient stop C |

#### Dark mode

| Token | Value | Usage |
|---|---|---|
| `--background` | `#0A0A0A` | Page bg |
| `--surface` | `#111113` | Section bg |
| `--surface-elevated` | `#18181B` | Cards |
| `--foreground` | `#FAFAFA` | Primary text |
| `--muted-foreground` | `#A1A1AA` | Secondary text |
| `--border` | `#27272A` | Borders |
| `--primary` | `#3B82F6` | Slightly brighter blue for dark contrast |
| Gradient stops same as light | | |

#### The signature gradient

```css
--gradient-accent: linear-gradient(
  135deg,
  hsl(340 100% 68%) 0%,    /* pink  #FF5C8A */
  hsl(258 90% 66%) 50%,    /* purple #8B5CF6 */
  hsl(217 91% 52%) 100%    /* blue   #146EF5 */
);
```

Use it for:
- One accent word inside the hero headline (with `background-clip: text`)
- The hover glow/halo on the primary CTA
- A subtle ambient blob in the hero corner (low opacity, blurred, not the centerpiece)
- Section eyebrow underlines
- Selection color (`::selection`)

**Do not wash entire sections in this gradient.** It's a spotlight, not the floor.

### Typography

- **Display / headings**: a geometric sans with Avant-Garde / Futura DNA. Recommended: **Inter Tight** at weight 600 (already loaded in `index.html`), or **Geist** if installed. Headlines are *semibold*, not light. Tracking `-0.03em` to `-0.04em`. Line-height `1.05`.
- **Body**: `Inter` weight 400, line-height 1.6.
- **UI / labels**: `Inter` weight 500, size `0.875rem`, slight tracking on uppercase eyebrows (`tracking-wider uppercase text-xs`).
- Hero headline size: `clamp(3rem, 7vw, 6rem)` — large but not absurd. Webflow's hero is bold, not oversized to the point of breaking layout.

> The previous spec called for the giant `clamp(4rem, 11vw, 10rem)` "saleixo" wordmark. **Drop that.** The new hero leads with a *sentence*, not a single word. Saleixo's name belongs in the nav and footer, with a wordmark logo lockup.

### Radius scale

- Cards / bento tiles: `1rem` (16px)
- Inputs: `0.625rem` (10px)
- Buttons: `0.5rem` rounded — NOT pill, except for compact tag chips
- Section containers: `1.5rem` (24px) when used

### Layout primitives

1. **Container**: `max-w-7xl mx-auto px-6 lg:px-8` — Webflow uses a strong centered column with generous side gutters.
2. **Section spacing**: `py-24 lg:py-32` — air, not cram.
3. **Bento grid for features**: 12-column CSS grid where each card spans varying col/row counts. Gaps `gap-4` to `gap-6`. Card radius `1rem`. Each card has its own visual treatment — illustration, gradient accent, screenshot, stat — so the grid feels alive.

### Hero composition

```
┌─────────────────────────────────────────────────────────┐
│   [logo]   nav links                       [Book Call]  │   ← solid bar, not pill
├─────────────────────────────────────────────────────────┤
│                                                         │
│   eyebrow chip: "Photography · Design · Marketing"      │
│                                                         │
│   The studio that turns                                 │   ← serious headline,
│   your craft into a [brand].                            │     "brand" gradient-filled
│                                                         │
│   One paragraph subhead, max-w-2xl, muted-foreground.   │
│                                                         │
│   [ Book a free audit →  ]   [ See our work ]           │   ← primary blue + ghost
│                                                         │
│   ────────────────────────────                          │
│                                                         │
│   ┌───────┐ ┌─────────────────────┐ ┌───────┐           │
│   │ stat  │ │  hero illustration  │ │ stat  │           │   ← bento preview row
│   │ tile  │ │  or product mosaic  │ │ tile  │           │     (optional)
│   └───────┘ └─────────────────────┘ └───────┘           │
└─────────────────────────────────────────────────────────┘
```

Key shifts from the old hero:
- Headline is a **sentence**, not a single word. One word inside it gets the gradient-text treatment.
- CTAs are **two buttons side-by-side**: primary solid blue + secondary ghost. No glass pill in the bottom-right corner.
- Nav is a **solid bar across the top**, left logo / center links / right CTA. No floating glass capsule.
- Below the fold (or in the lower half of the viewport on tall screens), a **bento preview** hints at the work — small stat tiles flanking a hero asset.
- No outer rounded frame container. Webflow's pages run edge to edge.

### Section pattern (repeats throughout the page)

Every section follows this rhythm:

1. Eyebrow chip (uppercase, tracked, gradient-text or muted)
2. Section headline (2-line max, one word gradient-accented)
3. One-paragraph subhead, max-w-2xl
4. The actual content — bento grid, image+text split, logo strip, etc.
5. Optional inline CTA at the bottom

### Bento grids — the workhorse layout

**Replace the current single-column `Services.tsx` and `FeaturedServices.tsx` with bento grids.** Each card spans different col/row counts. Cards include a mix of:

- Large feature card with illustration/image (col-span-2, row-span-2)
- Stat card with one big number + label (col-span-1)
- Quote / testimonial card
- Mini case study with thumbnail
- "All services" card with icon list

12-24px gaps, 16px radius, light borders, subtle hover lift (translateY -2px + shadow grow). On hover, a card may reveal its gradient accent border or animate its visual.

### Motion language

Use `framer-motion` for non-trivial motion. The vibe is **confident micro-motion**, not theatrical.

1. **Section reveals**: 30px fade-up with 80ms stagger on direct children, triggered via `whileInView`.
2. **Headline gradient word**: subtle 8s gradient pan animation (`background-position` shift) so the accent word feels alive without being distracting.
3. **CTA hover**: button scales 1.02 + adds gradient outer glow `box-shadow: 0 0 32px hsl(258 90% 66% / 0.4)`.
4. **Bento card hover**: translateY -2px, ring-1 ring-border-strong, shadow grows.
5. **Marquee logo strip**: optional slow-scrolling client/marketplace strip below hero (`9 Marketplaces` etc.).
6. **Page nav**: fades in solid background after 60px scroll, otherwise transparent on top of hero.
7. **Reduced-motion** respected — fall back to plain fades.

### Components to add

Add these new files (do not delete existing ones):

- `src/components/Nav.tsx` — solid top bar with logo, links, CTA. Replaces the floating glass pill nav.
- `src/components/GradientText.tsx` — wraps a span in `bg-gradient-accent bg-clip-text text-transparent` for the headline accent word.
- `src/components/Bento.tsx` + `src/components/BentoCard.tsx` — generic bento grid + card primitives.
- `src/components/Reveal.tsx` — framer-motion `whileInView` fade-up wrapper used everywhere.

### Components to retire (visually)

- The "liquid blob + phone" centerpiece — gone. The hero is text + buttons + a clean bento preview.
- `.glass-purple` — keep the file for reference but stop importing. Replace with light cards that have `border` and `shadow-sm`.
- `.text-gold-shimmer` — already gone from old gold system; do not reintroduce.
- The bottom-right glass CTA pill from the Superconscious version — gone.

---

## Redesign workflow

When asked to "apply the new (Webflow) design":

1. **Pass 1 — Tokens.** Replace the `:root`, `.dark`, and `.light` blocks in `src/index.css` with the palette above (light is canonical). Update `tailwind.config.ts` to expose `bg-surface`, `bg-surface-elevated`, `bg-primary`, `text-primary`, `border-strong`, `bg-gradient-accent`, `text-accent-pink/purple/blue`, etc. Replace the body radial-gradient bg with a clean `--background` plus an optional very-low-opacity gradient orb fixed in the hero corner. Add a `.gradient-text` utility class. Remove `.glass-purple` from active utilities.
2. **Pass 2 — Nav.** Build `src/components/Nav.tsx` as a solid top bar. Logo left, links centered, primary CTA right. Wire it in `Index.tsx` above `<Hero />`.
3. **Pass 3 — Hero.** Rebuild `src/components/Hero.tsx`:
   - Eyebrow chip at top
   - Sentence headline with one gradient-accented word via `<GradientText>`
   - Subhead paragraph
   - Two CTAs (primary solid blue + ghost)
   - Optional 3-tile bento preview row below
   - No giant single-word "saleixo" wordmark.
4. **Pass 4 — Bento everywhere.** Convert `FeaturedServices.tsx` and `Services.tsx` into bento grids using `<Bento>` and `<BentoCard>`. Keep the underlying service data; change only the layout.
5. **Pass 5 — Sections.** Restyle in order: `Portfolio.tsx` → `HowItWorks.tsx` → `Contact.tsx` → footer. Each follows the eyebrow → headline → subhead → content rhythm.
6. **Pass 6 — Floating elements.** Restyle `FloatingCTA`, `WhatsAppButton`, `ScrollProgress`, `ThemeToggle` to match the new clean language. ScrollProgress = thin gradient bar. ThemeToggle is now actually useful (light/dark both supported) — promote to nav.
7. **Pass 7 — `pages/Design.tsx` and `components/design/`.** Same token + bento + Reveal treatment.
8. **Pass 8 — Polish.** Smooth scroll, focus rings in primary blue, ::selection gradient, mobile pass at 375px, reduced-motion check, image lazy-loading, lighthouse pass.

After every pass, run `bun run build` and screenshot the homepage at 1440px and 375px.

**Admin panel is out of scope for the redesign.** It will inherit the new tokens for free; that's enough.

---

## Guardrails

- **Do not change** routes in `App.tsx`, the Supabase client/types, `src/lib/utils.ts`, or any file under `src/integrations/`.
- **Do not modify shadcn primitives in `src/components/ui/`** as a way to change appearance — change the tokens instead. If a primitive needs a real structural change, copy it under a new name and edit there.
- **Do not remove** existing components (`FloatingCTA`, `WhatsAppButton`, `ScrollProgress`, `ScrollToTop`, `ThemeToggle`, `WaveDivider`, `LoadingScreen`) — restyle them in place. `WaveDivider` may end up unused; leave the file but stop importing it.
- **Do not invent new image paths.** Reuse files under `src/assets/`. If a new asset is genuinely needed, add it under the right subfolder and import it normally.
- **Preserve component prop signatures** unless the user asks for a behavior change.
- **Preserve all admin-route protection logic** in `src/components/admin/`.
- **Do not commit** `.env`. It exists locally and contains Supabase keys.
- **Do not preserve the cosmic-purple Superconscious palette anywhere.** No `--accent-violet`, no `.glass-purple` in active use, no giant single-word wordmark, no liquid blob. The Webflow direction replaces all of it.
- **Do not wash entire sections in the gradient.** It is an accent only — used on one word, on hover halos, in tiny accent bars. Most surfaces are pure white or pure black.

## Conventions

- **Imports**: use the `@/` alias, sort React imports first, then libraries, then local.
- **Components**: function components, default export at bottom, named exports for sub-pieces. Prefer composition over prop drilling.
- **Forms**: react-hook-form + zod resolver + shadcn `Form` primitives. Don't reinvent.
- **Toasts**: use `sonner` for new code (already mounted in `App.tsx`); `useToast` from `@/hooks/use-toast` is the legacy path used by older shadcn pieces.
- **Data fetching**: TanStack Query with the existing `queryClient` in `App.tsx`.
- **Icons**: `lucide-react`, stroke-width `1.5`. Match Webflow's clean line iconography.
- **Class name composition**: always use `cn()` from `@/lib/utils`.
- **Responsive**: mobile-first Tailwind. Test at `375px`, `768px`, `1024px`, `1440px`.
- **Accessibility**: focus rings now use `--primary` blue. Preserve `<label>` associations, prefer semantic HTML, ensure headlines are real `<h1>`/`<h2>`/etc.

## Workflow expectations

- Read `src/index.css` and `tailwind.config.ts` before any styling task.
- Read the target component file before editing it.
- Prefer `Edit` over `Write` for existing files. The exception is `src/index.css` for Pass 1 — that one is a near-total rewrite.
- After token changes, sweep: homepage hero, a service bento card, the contact form, and the admin login page (`/admin/login`). All four should feel cohesive (admin will inherit the new neutral tokens — fine).
- Run `bun run lint` and `bun run build` before declaring done.

## Reference

The visual reference is **webflow.com** — clean monochrome SaaS marketing site with one signature pink→purple→blue gradient used as a focused accent. Headlines are confident sentences with one gradient-filled word. Layouts are bento-grid heavy. Motion is micro and tasteful, never theatrical. Both light and dark modes are first-class.

Adapt this language to **Saleixo's** positioning: a digital studio for artisans and ecommerce sellers offering photography, design, and marketing. The tone shifts from Webflow's developer/SaaS audience to a creative-services audience, but the visual grammar transfers cleanly: bold sentence headlines, bento feature grids, gradient-accent moments, generous whitespace, micro-motion.

## Out of context for Claude Code

- Lovable still has a connection to this repo (see `lovable-tagger` in devDependencies and the Lovable URL in `README.md`). Changes pushed here flow back to Lovable. That's fine — just be aware the README's instructions are Lovable-flavored and don't reflect the Claude Code workflow.
- The deployed site is at `saleixo-final.vercel.app` (canonical domain `saleixo.com`). The current deployment still shows the Superconscious purple hero — that's the state being replaced.
