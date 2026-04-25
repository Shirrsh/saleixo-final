
-- 1. Enable RLS on tables that have policies but RLS disabled
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- 2. Fix admin_users: remove broad authenticated read policy
DROP POLICY IF EXISTS "Authenticated can read admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can view admin_users" ON public.admin_users;

-- Users can only view their own admin record (without exposing password_hash via select(*))
CREATE POLICY "Users can view own admin record"
  ON public.admin_users FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Admins can manage all admin_users via has_role
CREATE POLICY "Admins can manage admin_users"
  ON public.admin_users FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- 3. blog_posts: remove duplicate/permissive policies
DROP POLICY IF EXISTS "Admins can do everything on blog_posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can view blog_posts" ON public.blog_posts;
-- Keep: "Admins can do everything with blog" (has_role) + "Public can view published blog posts"

-- 4. services: remove duplicate admin policies, keep has_role-based
DROP POLICY IF EXISTS "Admins can do everything on services" ON public.services;
-- Keep: "Admins can do everything with services" + "Public can view active services"

-- 5. about_team
DROP POLICY IF EXISTS "Admins can do everything on about_team" ON public.about_team;
DROP POLICY IF EXISTS "Public can view about_team" ON public.about_team;
-- Keep: "Admins can do everything with team" + "Public can view team"

-- 6. activity_log
DROP POLICY IF EXISTS "Admins can do everything on activity_log" ON public.activity_log;

-- 7. categories - keep admin_users-based policy but replace with has_role
DROP POLICY IF EXISTS "Admins can do everything on categories" ON public.categories;
CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- 8. faq_items
DROP POLICY IF EXISTS "Admins can do everything on faq_items" ON public.faq_items;
DROP POLICY IF EXISTS "Public can view faq_items" ON public.faq_items;

-- 9. homepage_content
DROP POLICY IF EXISTS "Admins can do everything on homepage_content" ON public.homepage_content;
DROP POLICY IF EXISTS "Public can view homepage_content" ON public.homepage_content;

-- 10. portfolio_projects
DROP POLICY IF EXISTS "Admins can do everything on portfolio_projects" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Public can view portfolio_projects" ON public.portfolio_projects;

-- 11. pricing_tiers
DROP POLICY IF EXISTS "Admins can do everything on pricing_tiers" ON public.pricing_tiers;
DROP POLICY IF EXISTS "Public can view pricing_tiers" ON public.pricing_tiers;

-- 12. site_images - replace admin_users-based with has_role
DROP POLICY IF EXISTS "Admins can do everything on site_images" ON public.site_images;
CREATE POLICY "Admins can manage site_images"
  ON public.site_images FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- 13. site_settings
DROP POLICY IF EXISTS "Admins can do everything on site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Public can view site_settings" ON public.site_settings;

-- 14. testimonials
DROP POLICY IF EXISTS "Admins can do everything on testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Public can view testimonials" ON public.testimonials;

-- 15. value_propositions
DROP POLICY IF EXISTS "Admins can do everything on value_propositions" ON public.value_propositions;
DROP POLICY IF EXISTS "Public can view value_propositions" ON public.value_propositions;

-- 16. user_roles - remove admin_users-based duplicate; ensure no privilege escalation
DROP POLICY IF EXISTS "Admins can do everything on user_roles" ON public.user_roles;
-- Keep: "Users can view their own roles" (SELECT) and "Admins can manage all user roles" (ALL).
-- Since "Admins can manage all user roles" requires has_role admin for INSERT/UPDATE/DELETE,
-- non-admin authenticated users cannot insert roles for themselves. No additional policy needed.
