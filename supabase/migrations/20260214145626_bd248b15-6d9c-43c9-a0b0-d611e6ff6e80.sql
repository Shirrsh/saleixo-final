-- Fix hero images: clear broken storage URLs so local fallbacks are used
UPDATE site_images 
SET is_active = false 
WHERE section = 'hero' 
AND image_url LIKE '%supabase.co/storage%'
AND image_key IN ('hero_showcase_1', 'hero_showcase_2', 'hero_showcase_3', 'hero_showcase_4');