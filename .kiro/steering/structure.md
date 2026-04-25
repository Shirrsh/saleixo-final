# Project Structure

## Top-Level

```
src/
├── App.tsx              # Root component: providers, router, all route definitions
├── main.tsx             # Entry point
├── index.css            # Global styles, CSS variables, Tailwind base
├── pages/               # Route-level page components
├── components/          # Reusable UI components
├── hooks/               # Custom React hooks
├── integrations/        # Third-party service clients (Supabase)
├── assets/              # Static images (hero, categories, portfolio, services)
└── lib/
    └── utils.ts         # cn() helper and shared utilities
```

## Pages (`src/pages/`)

```
pages/
├── Index.tsx            # Homepage (/)
├── Categories.tsx       # Category listing (/categories)
├── Design.tsx           # Ecommerce/design services (/design)
├── Services.tsx         # Services overview (/services)
├── Blog.tsx             # Blog listing (/blog)
├── CustomPricing.tsx    # Custom pricing (/custom-pricing)
├── Privacy.tsx          # Privacy policy
├── Terms.tsx            # Terms of service
├── NotFound.tsx         # 404 fallback
├── services/            # Service sub-pages
│   ├── Visibility.tsx   # /services/visibility
│   ├── Professional.tsx # /services/professional
│   └── Enterprise.tsx   # /services/enterprise
└── admin/               # Admin CMS pages (all under /admin/*)
    ├── Login.tsx
    ├── Dashboard.tsx
    ├── Homepage.tsx      # Hero/homepage content editor
    ├── Categories.tsx
    ├── Images.tsx
    ├── Services.tsx
    ├── Portfolio.tsx
    ├── Blog.tsx
    ├── Testimonials.tsx
    ├── FAQ.tsx
    ├── Team.tsx
    ├── Leads.tsx
    ├── Analytics.tsx
    └── Settings.tsx
```

## Components (`src/components/`)

```
components/
├── ui/                  # shadcn/ui primitives — do not modify directly
├── admin/
│   ├── AdminLayout.tsx  # Sidebar + header shell for all admin pages
│   └── ProtectedRoute.tsx
├── design/              # Section components specific to the /design page
├── Header.tsx           # Public site header with nav
├── Footer.tsx
├── Hero.tsx
├── FeaturedServices.tsx
├── Portfolio.tsx
├── Testimonials.tsx
├── Contact.tsx
├── WhySaleixo.tsx
├── HowItWorks.tsx
├── MarketplaceLogos.tsx
├── WaveDivider.tsx
├── FloatingCTA.tsx
├── WhatsAppButton.tsx
├── ScrollToTop.tsx
├── ScrollProgress.tsx
├── ThemeToggle.tsx
└── LoadingScreen.tsx
```

## Hooks (`src/hooks/`)

| Hook | Purpose |
|------|---------|
| `useAuth` | Supabase auth state, sign-in/out methods |
| `useHomepageContent` | Fetches `homepage_content` + `value_propositions` from Supabase with hardcoded defaults |
| `useSiteImages` | Fetches `site_images` table |
| `useAnimatedCounter` | Intersection-observer-based number animation |
| `useIntersectionObserver` | Generic intersection observer |
| `use-mobile` | Breakpoint detection |
| `use-toast` | Toast notification helper |

## Supabase Integration (`src/integrations/supabase/`)

- `client.ts` — singleton Supabase client (auto-generated, do not edit)
- `types.ts` — full generated DB types (auto-generated, do not edit)

## Key Conventions

- **Route registration**: All routes are defined in `src/App.tsx`. Add new routes there.
- **Admin layout**: Admin pages render inside `<AdminLayout>` via `<Outlet>` — no need to include header/sidebar in individual admin pages.
- **Data fetching pattern**: Use a custom hook per data domain (see `hooks/`). Hooks fetch from Supabase directly and provide hardcoded defaults as fallback when the DB returns no data.
- **New public pages**: Follow the `Index.tsx` pattern — compose section components, include `Header` and `Footer`, add floating UI elements (`ScrollToTop`, `WhatsAppButton`) as needed.
- **Assets**: Static images live in `src/assets/` organized by section. Supabase Storage is used for admin-uploaded images.
- **No test files**: There is no test infrastructure in this project.
