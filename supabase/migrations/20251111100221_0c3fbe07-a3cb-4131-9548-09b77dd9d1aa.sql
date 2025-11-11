-- Step 1: Create app_role enum
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Step 2: Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Step 3: Create has_role() security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Step 4: Create value_propositions table
CREATE TABLE IF NOT EXISTS public.value_propositions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text,
  icon text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true
);

ALTER TABLE public.value_propositions ENABLE ROW LEVEL SECURITY;

-- Step 5: Create all RLS policies using has_role()

-- Value propositions policies
DROP POLICY IF EXISTS "Admins can do everything with value_propositions" ON public.value_propositions;
CREATE POLICY "Admins can do everything with value_propositions"
  ON public.value_propositions
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view active value_propositions" ON public.value_propositions;
CREATE POLICY "Public can view active value_propositions"
  ON public.value_propositions
  FOR SELECT
  TO public
  USING (is_active = true);

-- Services table policies
DROP POLICY IF EXISTS "Admins can do everything with services" ON public.services;
CREATE POLICY "Admins can do everything with services"
  ON public.services
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view active services" ON public.services;
CREATE POLICY "Public can view active services"
  ON public.services
  FOR SELECT
  TO public
  USING (is_active = true);

-- Portfolio projects policies
DROP POLICY IF EXISTS "Admins can do everything with portfolio" ON public.portfolio_projects;
CREATE POLICY "Admins can do everything with portfolio"
  ON public.portfolio_projects
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view portfolio" ON public.portfolio_projects;
CREATE POLICY "Public can view portfolio"
  ON public.portfolio_projects
  FOR SELECT
  TO public;

-- Blog posts policies
DROP POLICY IF EXISTS "Admins can do everything with blog" ON public.blog_posts;
CREATE POLICY "Admins can do everything with blog"
  ON public.blog_posts
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view published blog posts" ON public.blog_posts;
CREATE POLICY "Public can view published blog posts"
  ON public.blog_posts
  FOR SELECT
  TO public
  USING (status = 'published');

-- Testimonials policies
DROP POLICY IF EXISTS "Admins can do everything with testimonials" ON public.testimonials;
CREATE POLICY "Admins can do everything with testimonials"
  ON public.testimonials
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view active testimonials" ON public.testimonials;
CREATE POLICY "Public can view active testimonials"
  ON public.testimonials
  FOR SELECT
  TO public
  USING (is_active = true);

-- FAQ items policies
DROP POLICY IF EXISTS "Admins can do everything with faq" ON public.faq_items;
CREATE POLICY "Admins can do everything with faq"
  ON public.faq_items
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view active faq" ON public.faq_items;
CREATE POLICY "Public can view active faq"
  ON public.faq_items
  FOR SELECT
  TO public
  USING (is_active = true);

-- Pricing tiers policies
DROP POLICY IF EXISTS "Admins can do everything with pricing" ON public.pricing_tiers;
CREATE POLICY "Admins can do everything with pricing"
  ON public.pricing_tiers
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view active pricing" ON public.pricing_tiers;
CREATE POLICY "Public can view active pricing"
  ON public.pricing_tiers
  FOR SELECT
  TO public
  USING (is_active = true);

-- About team policies
DROP POLICY IF EXISTS "Admins can do everything with team" ON public.about_team;
CREATE POLICY "Admins can do everything with team"
  ON public.about_team
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view team" ON public.about_team;
CREATE POLICY "Public can view team"
  ON public.about_team
  FOR SELECT
  TO public;

-- Homepage content policies
DROP POLICY IF EXISTS "Admins can do everything with homepage" ON public.homepage_content;
CREATE POLICY "Admins can do everything with homepage"
  ON public.homepage_content
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view homepage content" ON public.homepage_content;
CREATE POLICY "Public can view homepage content"
  ON public.homepage_content
  FOR SELECT
  TO public;

-- Site settings policies
DROP POLICY IF EXISTS "Admins can do everything with settings" ON public.site_settings;
CREATE POLICY "Admins can do everything with settings"
  ON public.site_settings
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view settings" ON public.site_settings;
CREATE POLICY "Public can view settings"
  ON public.site_settings
  FOR SELECT
  TO public;

-- Activity log policies
DROP POLICY IF EXISTS "Admins can view activity logs" ON public.activity_log;
CREATE POLICY "Admins can view activity logs"
  ON public.activity_log
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can insert activity logs" ON public.activity_log;
CREATE POLICY "Admins can insert activity logs"
  ON public.activity_log
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Step 6: Create updated_at trigger function and apply it
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_value_propositions_updated_at ON public.value_propositions;
CREATE TRIGGER update_value_propositions_updated_at
  BEFORE UPDATE ON public.value_propositions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Step 7: Insert default value propositions
INSERT INTO public.value_propositions (title, description, display_order) VALUES
  ('Expert Design', 'Professional design services tailored to your brand', 1),
  ('Fast Delivery', 'Quick turnaround without compromising quality', 2),
  ('Dedicated Support', '24/7 customer support for all your needs', 3)
ON CONFLICT DO NOTHING;