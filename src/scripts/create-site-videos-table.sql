-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- Creates the site_videos table that mirrors the site_images pattern.

create table if not exists public.site_videos (
  id              uuid primary key default gen_random_uuid(),
  video_key       text not null unique,          -- e.g. "testimonial_james_whitfield"
  video_url       text not null,                 -- Supabase Storage public URL
  poster_url      text,                          -- thumbnail shown before play
  alt_text        text,                          -- accessibility / description
  section         text not null default 'general', -- hero | portfolio | services | testimonials | general
  display_order   integer not null default 0,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Auto-update updated_at on row change
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_site_videos_updated_at on public.site_videos;
create trigger set_site_videos_updated_at
  before update on public.site_videos
  for each row execute procedure public.handle_updated_at();

-- Allow public read (same as site_images)
alter table public.site_videos enable row level security;

create policy "Public can read active videos"
  on public.site_videos for select
  using (is_active = true);

create policy "Authenticated users can manage videos"
  on public.site_videos for all
  using (auth.role() = 'authenticated');
