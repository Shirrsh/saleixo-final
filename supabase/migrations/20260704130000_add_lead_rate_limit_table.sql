-- Rate limiting for the notify-lead edge function.
--
-- notify-lead sends an email (via Zoho SMTP) to info@saleixo.com for every
-- lead-capture form submission. Without a limit, a single actor could spam
-- that inbox by repeatedly invoking the function. This table backs a simple
-- sliding-window counter checked/incremented inside notify-lead/index.ts:
-- for each request the function records one row per identifier (client IP
-- and/or submitted email address) and rejects with HTTP 429 once an
-- identifier has more than N rows in the last W minutes.
--
-- A plain table (rather than an in-memory Deno map) is used deliberately:
-- edge functions can run as multiple concurrent/cold-started instances with
-- no shared memory, so an in-process map would not enforce a global limit.
--
-- This table is written to exclusively by the notify-lead function using the
-- service-role key, which bypasses RLS — so no policies grant anon/
-- authenticated access at all (default-deny).

CREATE TABLE IF NOT EXISTS public.lead_rate_limit_events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier  text NOT NULL,       -- e.g. 'ip:203.0.113.4' or 'email:jane@brand.com'
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS lead_rate_limit_events_identifier_created_at_idx
  ON public.lead_rate_limit_events (identifier, created_at DESC);

-- Bound table growth: nothing needs rows older than the widest window we'll
-- ever check against, so an index on created_at alone makes periodic cleanup
-- (done opportunistically from within notify-lead) cheap.
CREATE INDEX IF NOT EXISTS lead_rate_limit_events_created_at_idx
  ON public.lead_rate_limit_events (created_at);

ALTER TABLE public.lead_rate_limit_events ENABLE ROW LEVEL SECURITY;

-- No policies are created — the table is only ever touched by the
-- notify-lead edge function via the service-role key, which bypasses RLS.
-- Public/anon and authenticated clients have no access whatsoever.
