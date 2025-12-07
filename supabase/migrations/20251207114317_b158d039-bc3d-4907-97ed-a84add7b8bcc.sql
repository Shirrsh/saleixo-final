-- Add missing columns to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS slug text,
ADD COLUMN IF NOT EXISTS excerpt text,
ADD COLUMN IF NOT EXISTS published_date timestamp with time zone DEFAULT now();

-- Create a function to auto-generate slug from title
CREATE OR REPLACE FUNCTION public.generate_slug_from_title()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug = lower(regexp_replace(NEW.title, '[^a-zA-Z0-9]+', '-', 'g'));
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger to auto-generate slug
DROP TRIGGER IF EXISTS generate_blog_slug ON public.blog_posts;
CREATE TRIGGER generate_blog_slug
BEFORE INSERT OR UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.generate_slug_from_title();

-- Update existing posts with slugs and published_date
UPDATE public.blog_posts 
SET slug = lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g')),
    published_date = COALESCE(created_at, now())
WHERE slug IS NULL;