## Remaining security work

The database migration already shipped and fixed the critical RLS findings (blog_posts/services RLS, admin_users password_hash exposure, draft post leakage, duplicate policies, user_roles escalation). The items below are what's left.

---

### 1. Lock down the `admin-ai-webhook` edge function (CRITICAL)

Currently anyone on the internet can POST to it and run AI commands that create / update / delete content using the service role key. The `telegram-bot` function calls it server-to-server and needs to keep working.

Fix: require **either** a valid admin JWT **or** an internal shared-secret header.

- Add a new runtime secret `INTERNAL_WEBHOOK_SECRET` (random string).
- In `supabase/functions/admin-ai-webhook/index.ts`:
  - If header `x-internal-secret` matches `INTERNAL_WEBHOOK_SECRET` → allow (server-to-server path used by telegram-bot).
  - Else require `Authorization: Bearer <jwt>`, validate via `supabase.auth.getClaims(token)`, then check `has_role(user.id, 'admin')` using a user-scoped client. Reject with 401/403 otherwise.
  - Only after the auth check, instantiate the service-role client used to perform the writes.
  - Restrict CORS `Access-Control-Allow-Origin` to the site origin instead of `*`, and add `x-internal-secret` to allowed headers.
- In `supabase/functions/telegram-bot/index.ts`:
  - Forward `x-internal-secret: ${Deno.env.get('INTERNAL_WEBHOOK_SECRET')}` when calling `admin-ai-webhook`.

### 2. Fix pre-existing TypeScript errors (blocking deploy)

Three `'error' is of type 'unknown'` errors in catch blocks need narrowing so the edge functions compile and deploy:

- `supabase/functions/admin-ai-webhook/index.ts` lines 307 and 443
- `supabase/functions/telegram-bot/index.ts` line 107

Replace `error.message` with `error instanceof Error ? error.message : String(error)`.

### 3. Make `admin-uploads` storage bucket private

The scanner flagged all four public buckets. `portfolio`, `blog`, `team` legitimately serve public content (product photos, blog images). Only `admin-uploads` is a generic admin scratchpad and should be private.

Migration:
- `UPDATE storage.buckets SET public = false WHERE id = 'admin-uploads';`
- Add storage.objects policies allowing only admins (via `has_role`) to SELECT / INSERT / UPDATE / DELETE objects in that bucket.
- Any code that displays files from `admin-uploads` will need to use `createSignedUrl` instead of public URLs. (Quick code search will confirm if anything actually references it; if not, no client changes needed.)

### 4. Enable Leaked Password Protection (user action)

This is a Supabase Auth toggle, not a code change. After implementation I'll surface a one-click link to:
`Authentication → Providers → Email → "Leaked password protection"` in the Supabase dashboard for the user to enable.

---

### Items intentionally NOT changing

- **`portfolio`, `blog`, `team` buckets staying public** — they serve public-facing imagery; signed URLs would break the site for no security benefit.
- **Client-side activity logging** (warn-level finding) — moving to DB triggers is a larger refactor and not part of the current security pass; can be a follow-up.
- **`admin_users` table not deprecated** — the codebase still queries it in `Login.tsx`, `ProtectedRoute.tsx`, `AdminLayout.tsx`. Migrating fully to `user_roles` is a separate refactor; the new RLS already prevents the data leak.

---

### Files to be touched

- `supabase/functions/admin-ai-webhook/index.ts` — auth gate + CORS + TS fix
- `supabase/functions/telegram-bot/index.ts` — forward internal secret + TS fix
- New migration — privatize `admin-uploads` bucket + add admin-only storage policies
- New runtime secret: `INTERNAL_WEBHOOK_SECRET`

### After implementation

I'll re-run the security scan and the Supabase linter to confirm the remaining `OPEN_ENDPOINTS` and `STORAGE_EXPOSURE` findings are cleared, then mark them resolved.
