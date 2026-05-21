-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- Creates the leads table to capture Get Started form submissions.

create table if not exists public.leads (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),

  -- Contact info
  name               text not null,
  email              text not null,
  phone              text,

  -- Business profile
  business           text,
  product            text,
  marketplaces       text[],
  revenue            text,
  country            text,

  -- Services & budget
  services           text[],
  budget_range       text,
  timeline           text,

  -- Message / challenge
  message            text,
  newsletter         boolean default false,

  -- Lead management (set by admin)
  source             text default 'get-started-form',
  status             text not null default 'new',
  priority           text not null default 'medium',
  assigned_to        text,
  notes              text,
  follow_up_date     date,
  last_contacted_at  timestamptz
);

-- Auto-update updated_at
create or replace function public.handle_leads_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_leads_updated_at on public.leads;
create trigger set_leads_updated_at
  before update on public.leads
  for each row execute procedure public.handle_leads_updated_at();

-- RLS
alter table public.leads enable row level security;

-- Anyone can insert (public form submission)
create policy "Anyone can submit a lead"
  on public.leads for insert
  with check (true);

-- Only authenticated users (admins) can read/update/delete
create policy "Authenticated users can manage leads"
  on public.leads for all
  using (auth.role() = 'authenticated');
