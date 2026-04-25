-- Create storage buckets for admin uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('admin-uploads', 'admin-uploads', true),
  ('portfolio', 'portfolio', true),
  ('blog', 'blog', true),
  ('team', 'team', true)
ON CONFLICT (id) DO NOTHING;

-- Create homepage_content table
CREATE TABLE IF NOT EXISTS public.homepage_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_cta_text TEXT,
  hero_cta_link TEXT,
  hero_image_url TEXT,
  meta_title TEXT,
  meta_description TEXT
);

-- Create value_propositions table
CREATE TABLE IF NOT EXISTS public.value_propositions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true
);

-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  description TEXT,
  price_usd DECIMAL(10, 2),
  category TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0
);

-- Create portfolio_projects table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  industry TEXT,
  client_name TEXT,
  year INTEGER,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image_url TEXT,
  category TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  author TEXT,
  meta_title TEXT,
  meta_description TEXT,
  publish_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'draft',
  user_id UUID REFERENCES auth.users(id)
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  quote TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_role TEXT,
  client_company TEXT,
  client_image_url TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0
);

-- Create faq_items table
CREATE TABLE IF NOT EXISTS public.faq_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0
);

-- Create pricing_tiers table
CREATE TABLE IF NOT EXISTS public.pricing_tiers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  tier_name TEXT NOT NULL,
  price_usd DECIMAL(10, 2),
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0
);

-- Create about_team table
CREATE TABLE IF NOT EXISTS public.about_team (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  expertise TEXT[] DEFAULT ARRAY[]::TEXT[],
  photo_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  instagram_url TEXT,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  site_title TEXT,
  site_tagline TEXT,
  logo_url TEXT,
  favicon_url TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  twitter_url TEXT,
  primary_color TEXT DEFAULT '#1a3a3a',
  accent_color TEXT DEFAULT '#d4af37',
  seo_keywords TEXT,
  analytics_code TEXT
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  action TEXT NOT NULL,
  item_type TEXT NOT NULL,
  item_id UUID,
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT
);

-- Enable Row Level Security
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.value_propositions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Admin users can do everything, public can read
CREATE POLICY "Admins can manage homepage_content" ON public.homepage_content
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view homepage_content" ON public.homepage_content
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage value_propositions" ON public.value_propositions
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view active value_propositions" ON public.value_propositions
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage services" ON public.services
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view active services" ON public.services
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage portfolio_projects" ON public.portfolio_projects
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view active portfolio_projects" ON public.portfolio_projects
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage blog_posts" ON public.blog_posts
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view published blog_posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view active testimonials" ON public.testimonials
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage faq_items" ON public.faq_items
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view active faq_items" ON public.faq_items
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage pricing_tiers" ON public.pricing_tiers
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view active pricing_tiers" ON public.pricing_tiers
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage about_team" ON public.about_team
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view active about_team" ON public.about_team
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage site_settings" ON public.site_settings
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view site_settings" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Admins can view activity_logs" ON public.activity_logs
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System can insert activity_logs" ON public.activity_logs
  FOR INSERT WITH CHECK (true);

-- Storage policies
CREATE POLICY "Admins can upload to admin-uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'admin-uploads' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view admin-uploads" ON storage.objects
  FOR SELECT USING (bucket_id = 'admin-uploads');

CREATE POLICY "Admins can upload to portfolio" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'portfolio' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view portfolio" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio');

CREATE POLICY "Admins can upload to blog" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view blog" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog');

CREATE POLICY "Admins can upload to team" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'team' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view team" ON storage.objects
  FOR SELECT USING (bucket_id = 'team');

-- Insert default homepage content
INSERT INTO public.homepage_content (hero_title, hero_subtitle, hero_cta_text, hero_cta_link)
VALUES ('Welcome to Saleixo', 'Your trusted partner in digital excellence', 'Get Started', '/contact')
ON CONFLICT DO NOTHING;

-- Insert default site settings
INSERT INTO public.site_settings (site_title, site_tagline, phone, email)
VALUES ('Saleixo', 'Digital Excellence', '+91 7011441159', 'contact@saleixo.com')
ON CONFLICT DO NOTHING;

-- Create triggers for updated_at
CREATE TRIGGER update_homepage_content_updated_at BEFORE UPDATE ON public.homepage_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_value_propositions_updated_at BEFORE UPDATE ON public.value_propositions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolio_projects_updated_at BEFORE UPDATE ON public.portfolio_projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_faq_items_updated_at BEFORE UPDATE ON public.faq_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pricing_tiers_updated_at BEFORE UPDATE ON public.pricing_tiers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_about_team_updated_at BEFORE UPDATE ON public.about_team
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();