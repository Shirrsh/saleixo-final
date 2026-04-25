# Tech Stack

## Core

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5 (with `@vitejs/plugin-react-swc`)
- **Styling**: Tailwind CSS 3 + `tailwindcss-animate`
- **UI Components**: shadcn/ui (Radix UI primitives + `class-variance-authority`)
- **Routing**: React Router DOM v6
- **Data Fetching / Caching**: TanStack React Query v5
- **Backend / Database**: Supabase (Postgres, Auth, Storage, RLS)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts
- **Notifications**: Sonner + shadcn Toaster
- **Analytics**: Vercel Analytics
- **Theme**: next-themes (dark/light mode)

## Common Commands

```bash
npm run dev        # Start development server (Vite HMR)
npm run build      # Production build
npm run build:dev  # Development build
npm run preview    # Preview production build locally
npm run lint       # ESLint check
```

> No test runner is configured. There are no test files in this project.

## Path Aliases

`@/` maps to `src/` — always use this alias for imports within `src/`.

```ts
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
```

## Supabase

- Client is a singleton at `src/integrations/supabase/client.ts` — import from there, never instantiate a new client
- Full DB type definitions live in `src/integrations/supabase/types.ts` — use `Tables<'table_name'>` for typed rows
- Auth is session-based with `localStorage` persistence and auto token refresh
- Admin access is checked against the `admin_users` table (`role === 'admin'`)
- RLS is enabled — public reads are allowed on active content; writes require auth

## Styling Conventions

- Use Tailwind utility classes exclusively; avoid inline styles
- Use `cn()` from `@/lib/utils` to merge conditional class names
- Brand colors are defined as CSS variables and Tailwind tokens — prefer semantic tokens (`primary`, `accent`, `foreground`) over hardcoded hex values in new components
- Admin UI uses hardcoded brand colors (`#1a3a3a`, `#d4af37`) directly in className strings — match this pattern in admin components
