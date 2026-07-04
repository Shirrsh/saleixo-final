-- ⚠️ NOTE (2026-07-04): The production database ALREADY HAS a public.leads table,
-- created via the dashboard, with a SUPERSET of these columns (adds assigned_to,
-- notes, follow_up_date, last_contacted_at, newsletter) and equivalent RLS
-- (anon insert-only, admin manage). Do NOT expect this migration to define the
-- canonical schema — regenerate types from the live DB. This file is kept for
-- local/dev environment parity only; it is idempotent and safe if re-applied,
-- but running it against prod adds a redundant duplicate insert policy.
--
-- Create leads table to capture public lead-gen form submissions.
-- Populated by:
--   src/components/Contact.tsx (homepage "Start a Project" form, source = 'contact-section')
--   src/pages/GetStarted.tsx   QuickContactForm (source = 'get-started-quick-form')
--   src/pages/GetStarted.tsx   4-step wizard    (source = 'get-started-form')
-- Column set is the union of fields inserted by all three callers.

CREATE TABLE IF NOT EXISTS public.leads (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),

  -- Contact details (all three forms)
  name          text NOT NULL,
  email         text NOT NULL,
  phone         text,
  business      text,

  -- Contact.tsx only
  country       text,

  -- GetStarted.tsx wizard only
  product       text,
  marketplaces  text[] DEFAULT '{}'::text[],
  revenue       text,
  budget_range  text,
  timeline      text,

  -- Shared
  services      text[] DEFAULT '{}'::text[],
  message       text,

  -- Bookkeeping (set by the client on insert / managed by admins afterwards)
  source        text NOT NULL,
  status        text NOT NULL DEFAULT 'new',
  priority      text NOT NULL DEFAULT 'medium'
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx     ON public.leads (status);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Public lead-gen forms are unauthenticated — allow anon (and logged-in) inserts only.
DROP POLICY IF EXISTS "Public can submit leads" ON public.leads;
CREATE POLICY "Public can submit leads"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Reading/updating/deleting leads (e.g. in the admin panel) is admin-only.
DROP POLICY IF EXISTS "Admins can manage leads" ON public.leads;
CREATE POLICY "Admins can manage leads"
  ON public.leads
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Keep updated_at current on edits (reuses the existing trigger function).
DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
