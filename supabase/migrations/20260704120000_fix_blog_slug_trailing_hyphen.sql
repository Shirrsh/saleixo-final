-- Fix generate_slug_from_title() so slugs never carry a leading/trailing hyphen.
-- Titles ending in punctuation (e.g. "...Fix It)") were producing malformed
-- slugs like "...-fix-it-" because regexp_replace collapses trailing
-- punctuation into a hyphen but never trims it off the ends.
CREATE OR REPLACE FUNCTION public.generate_slug_from_title()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug = trim(BOTH '-' FROM lower(regexp_replace(NEW.title, '[^a-zA-Z0-9]+', '-', 'g')));
  END IF;
  RETURN NEW;
END;
$$;

-- Backfill any existing rows that already have a leading/trailing hyphen
-- (e.g. the "why-...-fix-it-" post) now that the trigger is fixed.
UPDATE public.blog_posts
SET slug = trim(BOTH '-' FROM slug)
WHERE slug LIKE '-%' OR slug LIKE '%-';
