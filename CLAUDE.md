# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

**Saleixo** (formerly "Alvaio Digital Studio") — marketing website for a digital studio offering professional photography, creative design, and data-driven marketing for artisans and ecommerce sellers. Headlines: "500+ artisans helped, 98% satisfaction rate." Plus an admin CMS backed by Supabase. Originally scaffolded with Lovable; now maintained through Claude Code.

Site deployed at `https://saleixo-final.vercel.app/` (canonical: `https://saleixo.com`). Public site lives at `/`, full admin panel at `/admin/*`.

## Stack

- **Vite 5** + **React 18** + **TypeScript 5** (SWC via `@vitejs/plugin-react-swc`)
- **Tailwind CSS 3.4** with `tailwindcss-animate` and `@tailwindcss/typography`
- **shadcn/ui** — every component lives in `src/components/ui/` and reads from CSS variables in `src/index.css`. New shadcn components must use the existing token names; do **not** introduce a parallel color system.
- **React Router 6** for routing (`src/App.tsx`)
- **TanStack Query 5** for server state
- **react-hook-form + zod** for forms
- **next-themes** for theme switching — light is canonical, dark is a real variant. A blocking inline script in `index.html` reads `localStorage.getItem('theme')` and sets the `dark`/`light` class on `<html>` before first paint to prevent flash of unstyled content (FOUC). Do not remove or move this script.
- **Supabase** for auth + data (`src/integrations/supabase/`)
- **Vercel Analytics** wired in `App.tsx`
- **Bun** is the preferred package manager (`bun.lockb` is committed). `npm` also works.
- **framer-motion** for animations — already installed.

## Commands

```bash
npm install            # or: bun install
npm run dev            # vite dev server
npm run build          # production build
npm run lint           # eslint
npm run preview        # preview production build
```

Always run `npm run build` before declaring any task complete.

## Repo layout

```
src/
  App.tsx                       # Router + providers (TanStack, CurrencyProvider, Tooltip, Toaster, Analytics)
  main.tsx                      # React mount
  index.css                     # Design system — all tokens live here
  pages/
    Index.tsx                   # Public homepage (composes /components)
    Design.tsx, Services.tsx,
    Categories.tsx, Blog.tsx,
    CustomPricing.tsx,
    Privacy.tsx, Terms.tsx,
    Cookies.tsx, Refund.tsx,
    GetStarted.tsx,
    NotFound.tsx
    services/                   # Visibility, Professional, Enterprise tiers
    admin/                      # Full CMS — out of scope
  components/
    Hero.tsx, FeaturedServices.tsx, Services.tsx,
    Portfolio.tsx, HowItWorks.tsx, Contact.tsx,
    FloatingCTA.tsx, WhatsAppButton.tsx,
    ScrollProgress.tsx, ScrollToTop.tsx,
    ThemeToggle.tsx, WaveDivider.tsx, LoadingScreen.tsx,
    GradientText.tsx, Reveal.tsx
    design/                     # Sub-components for the /design page
    admin/                      # AdminLayout, ProtectedRoute, etc.
    ui/                         # shadcn primitives — DO NOT restyle directly
  context/
    CurrencyContext.tsx          # Global multi-currency state (15 currencies) — see section below
  hooks/                        # use-mobile, use-toast, useAnimatedCounter,
                                # useAuth, useIntersectionObserver, useSiteImages
  integrations/supabase/        # client + generated types
  lib/utils.ts                  # cn() helper from shadcn
  assets/                       # All hero, portfolio, category, service images
public/                         # favicon, robots.txt, placeholder.svg
```

Path alias: `@/*` → `./src/*` (used everywhere — keep using it).

---

## Guardrails

- **Do not change** routes in `App.tsx`, the Supabase client/types, `src/lib/utils.ts`, or any file under `src/integrations/`.
- **Do not remove the theme-init script** in `index.html` — it prevents a flash of unstyled content on page load by applying the saved theme class before React mounts.
- **Do not modify shadcn primitives in `src/components/ui/`** as a way to change appearance — change the tokens in `src/index.css` instead. If a primitive needs a structural change, copy it under a new name.
- **Do not remove** existing components (`FloatingCTA`, `WhatsAppButton`, `ScrollProgress`, `ScrollToTop`, `ThemeToggle`, `WaveDivider`, `LoadingScreen`) — restyle them in place if needed.
- **Do not invent new image paths.** Reuse files under `src/assets/`. If a new asset is genuinely needed, add it under the right subfolder and import it normally.
- **Preserve component prop signatures** unless the user asks for a behavior change.
- **Preserve all admin-route protection logic** in `src/components/admin/`.
- **Do not commit** `.env`. It exists locally and contains Supabase keys.

## Conventions

- **Imports**: use the `@/` alias, sort React imports first, then libraries, then local.
- **Components**: function components, default export at bottom, named exports for sub-pieces. Prefer composition over prop drilling.
- **Forms**: react-hook-form + zod resolver + shadcn `Form` primitives. Don't reinvent.
- **Toasts**: use `sonner` for new code (already mounted in `App.tsx`); `useToast` from `@/hooks/use-toast` is the legacy path used by older shadcn pieces.
- **Data fetching**: TanStack Query with the existing `queryClient` in `App.tsx`.
- **Icons**: `lucide-react`, stroke-width `1.5`.
- **Class name composition**: always use `cn()` from `@/lib/utils`.
- **Responsive**: mobile-first Tailwind. Test at `375px`, `768px`, `1024px`, `1440px`.
- **Accessibility**: focus rings use `--primary`. Preserve `<label>` associations, prefer semantic HTML, ensure headlines are real `<h1>`/`<h2>`/etc.

## Workflow expectations

- Read `src/index.css` and `tailwind.config.ts` before any styling task.
- Read the target component file before editing it.
- Prefer `Edit` over `Write` for existing files.
- Run `npm run lint` and `npm run build` before declaring done.

## Out of scope

- Admin panel (`/admin/*`) — inherits tokens automatically, no manual work needed.
- Lovable has a connection to this repo (`lovable-tagger` in devDependencies). Changes pushed here flow back to Lovable.
- The deployed site is at `saleixo-final.vercel.app` (canonical domain `saleixo.com`).

---

## New pages & routes (added April 2026)

All routes are wired in `src/App.tsx`. Do not remove or rename them.

### Public pages

| Route | File | Status | Notes |
|---|---|---|---|
| `/get-started` | `src/pages/GetStarted.tsx` | Live | Seller inquiry form — react-hook-form + zod. `onSubmit` is a stub; wire to Supabase or email service. |
| `/cookies` | `src/pages/Cookies.tsx` | Live | Cookie Policy. Full content. Links to `/privacy`, `/terms`, `/refund`. |
| `/refund` | `src/pages/Refund.tsx` | Live | Cancellation & Refund Policy. Full content. |
| `/privacy` | `src/pages/Privacy.tsx` | Updated | Full Privacy Policy replacing the old stub. |
| `/terms` | `src/pages/Terms.tsx` | Updated | Full 12-clause Terms of Service replacing the old stub. |

### Utility components added

| File | Purpose |
|---|---|
| `src/components/GradientText.tsx` | Wraps one word in the accent gradient. Use for ONE word per headline — never full sentences. |
| `src/components/Reveal.tsx` | framer-motion fade-up wrapper. Uses `useInView` + `useAnimation` with two safety nets: immediate reveal if the element is already in the viewport at mount, and a 1800ms `setTimeout` fallback so content is never left invisible due to observer misfires. Use on section content blocks for consistent enter animations. |

### Footer updates

- Added a **Legal** column (5th column, `md:grid-cols-5`) with links to all four policy pages.
- **Get Started** link added to the Studio column pointing to `/get-started`.
- Contact email updated to `info@saleixo.com` throughout.
- **Services column** links to specific service sub-pages (updated May 2026):

| Label | Route |
|---|---|
| Product Photography | `/services/photography` |
| Amazon Listing & FBA | `/services/amazon` |
| Ecommerce Management | `/services/ecommerce-management` |
| Shopify Setup & Design | `/services/shopify` |
| Social & Paid Ads | `/services/social-ads` |
| Ecommerce Design | `/design` |
| All Services | `/services` |
| Pricing | `/custom-pricing` |

### GetStarted form — wiring instructions

The `onSubmit` handler in `src/pages/GetStarted.tsx` currently has a 1.2s fake delay as a placeholder. To go live:

1. **Supabase** — insert a row into a `leads` table:
   ```ts
   const { error } = await supabase.from('leads').insert([data]);
   ```
2. **Email (Resend)** — call a Supabase Edge Function or API route that POSTs to `api.resend.com/emails`.
3. After successful submission the component shows a thank-you screen automatically — no redirect needed.

### CustomPricing page (updated May 2026)

`src/pages/CustomPricing.tsx` was rewritten from a "why we don't show prices" philosophy page into a full transparent pricing page. Key structure:

- **Tier cards** — Starter ($299), Growth ($699), Pro ($1,499), Enterprise (custom). Data lives in the `tiers` array at the top of the file. Prices are shown in both USD and INR.
- **À-la-carte tables** — Photography, Design, Amazon-Specific, Marketing. Each table is rendered by the `ServiceTable` sub-component defined in the same file.
- **Add-ons table** — Optional extras (rush delivery, extra revisions, weekend support, additional marketplace).
- **What's Not Included table** — Transparent list of costs paid directly by the client (ad spend, FBA fees, etc.).
- **FAQ section** — 7 common pricing questions.
- **CTA block** — Links to `/get-started` and `mailto:info@saleixo.com`.

All pricing data is defined as plain arrays at the top of the file — edit those arrays to update prices. No external data source. The page uses no shadcn `Card` or `Button` primitives; layout is plain Tailwind + `cn()`.

### Currency context (updated May 2026)

`src/context/CurrencyContext.tsx` provides global multi-currency switching across the entire app. `CurrencyProvider` wraps the app in `App.tsx` (outside `TooltipProvider`, inside `QueryClientProvider`).

**Supported currencies (15 total):** USD, INR, GBP, EUR, AUD, CAD, SGD, AED, SAR, JPY, CNY, MYR, BDT, PKR, LKR. All defined in the exported `CURRENCIES` array with `code`, `symbol`, `label`, `flag`, and `rate` (relative to USD).

**Exported types:**
- `CURRENCIES` — the full array of currency metadata (use to build dropdowns/selectors)
- `CurrencyCode` — union type of all 15 currency codes

**What it exposes via `useCurrency()`:**

| Value | Type | Description |
|---|---|---|
| `currency` | `CurrencyCode` | Active currency code |
| `setCurrency` | `(c: CurrencyCode) => void` | Manual override — persisted to `localStorage` under key `saleixo_currency` |
| `fmt` | `(usd, inr?) => string` | Formats a USD base price in the active currency; for INR uses the hand-crafted `inr` arg if provided, otherwise converts; returns `'Custom'` if `usd` is `null`/`undefined` |
| `symbol` | `string` | Currency symbol for the active currency (e.g. `'₹'`, `'£'`, `'¥'`) |

**No geo-detection:** The context no longer auto-detects country on first visit. It defaults to `'USD'` unless a valid currency code is already saved in `localStorage`.

**Usage pattern:**
```tsx
import { useCurrency, CURRENCIES } from '@/context/CurrencyContext';

const { fmt, currency, setCurrency, symbol } = useCurrency();
// Render a price (USD base, optional hand-crafted INR):
<span>{fmt(299, 24999)}</span>
// Build a selector:
{CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.label}</option>)}
```

**Guardrails:**
- Do not call `useCurrency()` outside of `CurrencyProvider` — it will throw.
- Do not duplicate currency state elsewhere; always read from this context.
- The `CurrencyToggle` component (`src/components/CurrencyToggle.tsx`) is the canonical UI for switching — update it if the selector UI needs to change rather than building a new one. It is a **custom accessible dropdown** (not shadcn `Select`) with outside-click and Escape-key dismissal; style it via Tailwind/tokens directly, not via shadcn primitives.
- JPY and CNY are formatted without decimal places automatically.

### Legal pages — before publishing

- All four pages currently show `Effective date: April 2026` — replace with the actual go-live date.
- Review with a local solicitor before publishing.
- Cookie Policy references Google Analytics and Meta Pixel — remove either if not in use.
- Terms of Service contact email is `info@saleixo.com` — confirm this is correct.
