-- Create a site_images table to manage all website images
CREATE TABLE public.site_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_key TEXT NOT NULL UNIQUE, -- e.g., 'hero_showcase_1', 'portfolio_1', 'service_photography'
  image_url TEXT NOT NULL,
  alt_text TEXT,
  section TEXT NOT NULL, -- e.g., 'hero', 'portfolio', 'services', 'categories'
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;

-- Public can view active images
CREATE POLICY "Public can view active site_images"
ON public.site_images
FOR SELECT
USING (is_active = true);

-- Admins can do everything
CREATE POLICY "Admins can do everything on site_images"
ON public.site_images
FOR ALL
USING (EXISTS (
  SELECT 1 FROM admin_users
  WHERE admin_users.id = auth.uid()
  AND admin_users.role = 'admin'
));

-- Trigger for updated_at
CREATE TRIGGER update_site_images_updated_at
BEFORE UPDATE ON public.site_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default images for the website sections
INSERT INTO public.site_images (image_key, image_url, alt_text, section, display_order) VALUES
-- Hero showcase images
('hero_showcase_1', 'https://syoungrummuurrptckbt.supabase.co/storage/v1/object/public/hero-images/showcase-1.jpg', 'Professional product photography showcase', 'hero', 1),
('hero_showcase_2', 'https://syoungrummuurrptckbt.supabase.co/storage/v1/object/public/hero-images/showcase-2.jpg', 'Brand design and packaging showcase', 'hero', 2),
('hero_showcase_3', 'https://syoungrummuurrptckbt.supabase.co/storage/v1/object/public/hero-images/showcase-3.jpg', 'Lifestyle photography showcase', 'hero', 3),
('hero_showcase_4', 'https://syoungrummuurrptckbt.supabase.co/storage/v1/object/public/hero-images/showcase-4.jpg', 'Marketing content creation showcase', 'hero', 4),
-- Portfolio images
('portfolio_1', 'https://syoungrummuurrptckbt.supabase.co/storage/v1/object/public/portfolio-images/portfolio-1.jpg', 'Product Photography', 'portfolio', 1),
('portfolio_2', 'https://syoungrummuurrptckbt.supabase.co/storage/v1/object/public/portfolio-images/portfolio-2.jpg', 'Creative Design & Branding', 'portfolio', 2),
('portfolio_3', 'https://syoungrummuurrptckbt.supabase.co/storage/v1/object/public/portfolio-images/portfolio-3.jpg', 'Digital Marketing Campaigns', 'portfolio', 3);

-- Create storage policies for uploading images
CREATE POLICY "Admins can upload to site-assets"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'site-assets' 
  AND EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.role = 'admin'
  )
);

CREATE POLICY "Admins can update site-assets"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'site-assets' 
  AND EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.role = 'admin'
  )
);

CREATE POLICY "Admins can delete from site-assets"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'site-assets' 
  AND EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.role = 'admin'
  )
);

CREATE POLICY "Public can view site-assets"
ON storage.objects
FOR SELECT
USING (bucket_id = 'site-assets');