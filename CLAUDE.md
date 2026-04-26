# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

**Alvaio Digital Studio** — marketing website for a digital studio offering design, photography, and marketing services, plus an admin CMS backed by Supabase. Originally scaffolded with Lovable; now being maintained and redesigned through Claude Code.

Public site lives at `/`, full admin panel at `/admin/*`. Both share the same design system.

## Stack

- **Vite 5** + **React 18** + **TypeScript 5** (SWC via `@vitejs/plugin-react-swc`)
- **Tailwind CSS 3.4** with `tailwindcss-animate` and `@tailwindcss/typography`
- **shadcn/ui** — every component lives in `src/components/ui/` and reads from CSS variables in `src/index.css`. New shadcn components must use the existing token names; do **not** introduce a parallel color system.
- **React Router 6** for routing (`src/App.tsx`)
- **TanStack Query 5** for server state
- **react-hook-form + zod** for forms
- **next-themes** for theme switching (dark is the only canonical theme for the redesign)
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

## Current state vs. redesign target

> **The current `src/index.css` describes a gold/teal "luxury ecommerce" palette. That is the OLD system. The redesign replaces it entirely with the spec below. Do not preserve the gold/teal tokens.**

### Redesign target — "Superconscious" style

Vibe: **deep cosmic purple, liquid 3D, oversized editorial sans, glassmorphic chrome, motion-rich.** Think app-launch landing page meets premium spiritual product. Dark, immersive, slightly mystical, very modern.

#### Color palette (encode these in `src/index.css` and `tailwind.config.ts`)

| Token | Hex | HSL | Usage |
|---|---|---|---|
| `--background` | `#0A0418` | `262 70% 6%` | Outer page bg, deepest layer |
| `--surface` | `#150828` | `265 65% 9%` | Inner card/frame container |
| `--surface-elevated` | `#1F0F3A` | `262 60% 14%` | Elevated cards, nav pill bg |
| `--primary` | `#7C3AED` | `262 83% 58%` | CTA buttons, accent glow |
| `--primary-hover` | `#9333EA` | `271 81% 56%` | Hover state |
| `--accent-violet` | `#A855F7` | `271 91% 65%` | Glow halos, gradient stops |
| `--accent-indigo` | `#4F46E5` | `239 84% 60%` | Secondary glow, gradient stops |
| `--foreground` | `#FFFFFF` | `0 0% 100%` | Primary text (the giant headline is pure white) |
| `--muted-foreground` | `#A89BC9` | `260 30% 70%` | Subtitles, secondary copy |
| `--border` | `#2A1B4A` | `260 45% 20%` | Glass borders, dividers |
| `--border-glow` | `#5B3FBF` | `255 50% 50%` | Inner highlight on glass surfaces |

Background uses a **radial purple vignette**: bright violet glow top-center fading to near-black at the corners. Implement as a fixed full-viewport gradient layer behind everything.

```css
background:
  radial-gradient(ellipse 80% 60% at 50% -10%, hsl(271 91% 65% / 0.35), transparent 60%),
  radial-gradient(ellipse 60% 40% at 50% 110%, hsl(262 83% 58% / 0.20), transparent 60%),
  hsl(262 70% 6%);
```

#### Typography

- **Display headline**: very large, modern geometric sans, light/regular weight, extremely wide tracking *negative* (-0.04em). Target font: **"Instrument Sans"** or **"PP Neue Montreal"**; fallback **"Inter Display"** (Google Font: `Inter Tight` weight 300–400 works as a close substitute). Hero headline sizes: `clamp(4rem, 11vw, 10rem)`.
- **Sub-headline**: `Inter`, weight 400, all lowercase or sentence case, color `--muted-foreground`, letter-spacing slightly loose (+0.02em).
- **Body**: `Inter`, weight 400, line-height 1.6, color `--foreground` at 90% opacity.
- **UI labels** (nav, buttons, small CTAs): `Inter`, weight 500, size `0.875rem`, sometimes with subtle letter-spacing.

> The `<h1>/<h2>/<h3> em { color: gold }` rule from the old system MUST be removed — there are no italic gold accents in the new design. Headlines are pure white.

#### Radius scale

- Outer page frame: `2rem` (the whole hero sits inside a rounded container with a subtle 1px gradient border)
- Cards: `1.5rem`
- Glass pill nav: `9999px`
- CTA buttons: `9999px` pill
- Inputs: `0.75rem`

#### Glass / glow surfaces

The nav pill, the bottom-right CTA card, and feature cards all use a **glassmorphic** treatment:

```css
background: hsl(265 65% 9% / 0.6);
backdrop-filter: blur(20px) saturate(180%);
border: 1px solid hsl(260 45% 20% / 0.8);
box-shadow:
  inset 0 1px 0 hsl(255 50% 50% / 0.3),   /* top inner highlight */
  0 8px 32px hsl(262 70% 6% / 0.5);        /* soft outer shadow */
```

A `.glass-purple` utility class should encode this in `index.css`.

#### Liquid 3D hero asset

The hero centerpiece is a **chrome/iridescent liquid blob** with an iPhone embedded in front of it. For implementation:
- **Preferred**: a pre-rendered PNG/WebP with transparent background (place under `src/assets/hero/liquid-blob.webp`). Designer-provided.
- **Fallback if no asset**: animated SVG blob using two overlapping radial gradients with `filter: blur(40px)` and a slow rotation animation, layered behind a phone mockup PNG.
- The blob has a violet-to-magenta iridescent surface with visible highlights — looks like a metallic liquid mercury form.

#### Animation language

This site is **motion-first**. Use `framer-motion` for everything beyond a simple fade.

1. **Hero entrance**: headline characters fade-up with a 30ms stagger (split with a Splitting.js-style approach or framer's `whileInView` per-character map). Sub-headline and CTA pill fade in 400ms after.
2. **Liquid blob**: continuous slow rotation + scale breathing (8s loop, ease-in-out).
3. **Scroll-triggered circle grid** (mid-page, see frame 2 of the reference): 6 hollow circle outlines arranged in a 3-row layout (1-2-1-2 pattern). On scroll into view, they fade in with stagger, then each circle expands with a breathing pulse. These are likely service / feature anchors — treat as the entry to a feature section where each circle becomes a labeled card on hover or further scroll.
4. **Glass pill nav**: floats, doesn't stick. Has a subtle hover glow on links (purple radial bloom under cursor).
5. **CTA buttons**: pure-white pill on dark, with hover that adds a violet outer glow (`box-shadow: 0 0 32px hsl(271 91% 65% / 0.5)`).
6. **Scroll velocity**: enable Lenis smooth scroll (`bun add lenis`) for the buttery feel that matches this aesthetic.
7. **Cursor**: optional custom cursor — small white dot with delayed trailing larger circle, both blend-mode `difference`.

#### Layout container

The whole page lives inside a **rounded outer frame** (`rounded-[2rem] mx-4 my-4 lg:mx-8 lg:my-6`) with a subtle gradient border (`border border-border-glow/40`) and the deep purple radial bg behind it. This gives the "windowed app preview" feel visible in every frame of the reference.

#### Hero composition (matches frame 3 of the reference)

```
┌────────────────────────────────────────────────────┐
│                                                    │
│           ╭──────────────────────────╮             │
│           │ ⬢  About  How  Whom  Cts │  ← glass pill nav, centered top
│           ╰──────────────────────────╯             │
│                                                    │
│                                                    │
│             s u p e r c o n s c i o u s            │  ← oversized white sans
│                  the manifestation app             │  ← muted lavender subtitle
│                                                    │
│                  ╭────────────╮                    │
│                  │  [ blob ]  │   ╭─────────────╮  │
│                  │   📱        │   │ Coming…     │  │  ← bottom-right CTA card
│                  │            │   │ [Join WL]   │  │     (glass pill style)
│                  ╰────────────╯   ╰─────────────╯  │
│                                                    │
└────────────────────────────────────────────────────┘
```

For Alvaio specifically:
- Replace "superconscious" with **"alvaio"** as the giant display word
- Subtitle: **"design · photography · marketing"** or current tagline
- Replace the iPhone-app-blob with a 3D-rendered glossy purple object (or use one of the existing portfolio images styled with a purple gradient overlay until a custom asset is available)
- Bottom-right pill CTA: **"Free brand audit / Book a call"** with the existing contact CTA logic

---

## Redesign workflow

When asked to "apply the new design":

1. **Pass 1 — Tokens.** Replace the `:root` and `.dark` blocks in `src/index.css` with the purple palette above. Update `tailwind.config.ts` to expose `bg-surface`, `bg-surface-elevated`, `text-accent-violet`, `text-accent-indigo`, `border-glow`, etc. Add the radial-gradient body background. Add Google Font imports for `Inter Tight` (or load the chosen display face) in `index.html`. Remove the gold-italic `<em>` rule. Remove or minimize the `.light` block — this redesign is dark-only; keep `.light` as a near-clone of dark to avoid breaking next-themes.
2. **Pass 2 — Outer frame.** Wrap `src/pages/Index.tsx` content in the rounded frame container described above.
3. **Pass 3 — Hero.** Rebuild `src/components/Hero.tsx` to match frame 3. Install framer-motion if needed. Add the liquid blob (use a placeholder gradient SVG until a real asset is added). Wire the glass pill nav as a floating top element (extract to `src/components/Nav.tsx` if it currently lives elsewhere).
4. **Pass 4 — Sections.** Restyle in order: `FeaturedServices.tsx` → `Services.tsx` → `Portfolio.tsx` → `HowItWorks.tsx` → `Contact.tsx`. The 6-circle scroll-in pattern from frame 2 belongs in either `FeaturedServices` or `HowItWorks` — pick whichever currently has 6-ish items. Each circle is a service/step entry; on scroll it expands into a label.
5. **Pass 5 — Floating elements.** Restyle `FloatingCTA`, `WhatsAppButton`, `ScrollProgress`, `ThemeToggle` to match the glass-purple language. ScrollProgress becomes a thin violet bar. ThemeToggle stays functional but is visually de-emphasized (this design is dark-only).
6. **Pass 6 — `pages/Design.tsx` and `components/design/`.** Apply the same token + glass treatment to all sub-components.
7. **Pass 7 — Polish.** Smooth scroll (Lenis), focus rings in violet, ::selection color violet, mobile pass at 375px, reduced-motion check, image lazy-loading, lighthouse pass.

After every pass, run `bun run build` and screenshot the homepage.

**Admin panel is out of scope for the redesign.** It will inherit the new tokens for free; that's enough.

---

## Guardrails

- **Do not change** routes in `App.tsx`, the Supabase client/types, `src/lib/utils.ts`, or any file under `src/integrations/`.
- **Do not modify shadcn primitives in `src/components/ui/`** as a way to change appearance — change the tokens instead. If a primitive needs a real structural change, copy it under a new name and edit there.
- **Do not remove** existing components (`FloatingCTA`, `WhatsAppButton`, `ScrollProgress`, `ScrollToTop`, `ThemeToggle`, `WaveDivider`, `LoadingScreen`) — restyle them in place. `WaveDivider` may end up unused in the new design; leave the file but stop importing it if it doesn't fit.
- **Do not invent new image paths.** Reuse files under `src/assets/`. If a new asset is genuinely needed (e.g. the liquid blob render), add it under `src/assets/hero/` and import it normally. Note in the commit message that a real designer-provided asset should replace the placeholder.
- **Preserve component prop signatures** unless the user asks for a behavior change.
- **Preserve all admin-route protection logic** in `src/components/admin/`.
- **Do not commit** `.env`. It exists locally and contains Supabase keys.
- **Do not preserve the gold/teal palette anywhere.** Old tokens, old `.text-gold-shimmer`, old `.glass-gold` — all gone. Replace with violet equivalents.

## Conventions

- **Imports**: use the `@/` alias, sort React imports first, then libraries, then local.
- **Components**: function components, default export at bottom, named exports for sub-pieces. Prefer composition over prop drilling.
- **Forms**: react-hook-form + zod resolver + shadcn `Form` primitives. Don't reinvent.
- **Toasts**: use `sonner` for new code (already mounted in `App.tsx`); `useToast` from `@/hooks/use-toast` is the legacy path used by older shadcn pieces.
- **Data fetching**: TanStack Query with the existing `queryClient` in `App.tsx`.
- **Icons**: `lucide-react` only, stroke-width `1.5` to match the thin geometric language of the reference.
- **Class name composition**: always use `cn()` from `@/lib/utils`.
- **Responsive**: mobile-first Tailwind. Test at `375px`, `768px`, `1024px`, `1440px`.
- **Accessibility**: keep `*:focus-visible` rings (now violet), preserve `<label>` associations, prefer semantic HTML, ensure the giant display headline still reads as a real `<h1>`.

## Workflow expectations

- Read `src/index.css` and `tailwind.config.ts` before any styling task.
- Read the target component file before editing it.
- Prefer `Edit` over `Write` for existing files. The exception is `src/index.css` for Pass 1 — that one is a near-total rewrite.
- After token changes, do a fast visual sweep of: homepage hero, a service card, the contact form, and the admin login page (`/admin/login`). All four should still feel cohesive (admin will look purple but functional — that's fine).
- Run `bun run lint` and `bun run build` before declaring done.

## Reference

The visual reference is the **Superconscious / Manifestation App** landing page (provided by the user as screen recording + screenshot frames). Key frames:
- **Frame 1**: Mid-scroll with a rotated phone+blob composition transitioning out of view, glass nav pill at top, glass CTA card bottom-right.
- **Frame 2**: 6 hollow circles arranged on a black-purple field, mid-scroll feature reveal moment.
- **Frame 3**: Hero — giant white "superconscious" wordmark, "the manifestation app" subtitle, central blob+phone composition, nav and CTA in their respective corners.

Adapt the brand wordmark to "alvaio" and the tagline to whatever the current homepage uses; everything else (palette, type, motion, glass surfaces, liquid 3D centerpiece, circle scroll pattern) maps over directly.

## Out of context for Claude Code

- Lovable still has a connection to this repo (see `lovable-tagger` in devDependencies and the Lovable URL in `README.md`). Changes pushed here flow back to Lovable. That's fine — just be aware the README's instructions are Lovable-flavored and don't reflect the Claude Code workflow.
- The deployed analytics use Vercel Analytics; no action required from edits.
