-- Add missing columns to homepage_content table
ALTER TABLE public.homepage_content
  ADD COLUMN IF NOT EXISTS hero_cta_text TEXT,
  ADD COLUMN IF NOT EXISTS hero_cta_link TEXT,
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT;

-- Update activity_log table to match code expectations
ALTER TABLE public.activity_log
  ADD COLUMN IF NOT EXISTS item_type TEXT,
  ADD COLUMN IF NOT EXISTS item_id UUID,
  ADD COLUMN IF NOT EXISTS user_email TEXT;

-- Drop old table_name column if it exists (replaced by item_type)
ALTER TABLE public.activity_log
  DROP COLUMN IF EXISTS table_name;