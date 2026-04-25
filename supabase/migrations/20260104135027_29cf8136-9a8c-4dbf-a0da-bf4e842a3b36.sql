-- Add badge columns to homepage_content table
ALTER TABLE homepage_content 
ADD COLUMN IF NOT EXISTS badge_1_icon text DEFAULT 'Target',
ADD COLUMN IF NOT EXISTS badge_1_text text DEFAULT 'Revenue-Focused',
ADD COLUMN IF NOT EXISTS badge_2_icon text DEFAULT 'Zap',
ADD COLUMN IF NOT EXISTS badge_2_text text DEFAULT '48h Turnaround',
ADD COLUMN IF NOT EXISTS badge_3_icon text DEFAULT 'Users',
ADD COLUMN IF NOT EXISTS badge_3_text text DEFAULT 'Founder-Led',
ADD COLUMN IF NOT EXISTS trust_badges text DEFAULT 'Based in India | Est. 2024 | Boutique Studio';

-- Insert initial content if table is empty
INSERT INTO homepage_content (
  hero_title, 
  hero_subtitle, 
  hero_cta_text, 
  hero_cta_link,
  badge_1_icon, badge_1_text,
  badge_2_icon, badge_2_text,
  badge_3_icon, badge_3_text,
  trust_badges,
  meta_title,
  meta_description
) 
SELECT 
  'Transform Your Brand Into Market-Winning Brands',
  'Photography, design, and marketing that actually grows revenue. You focus on your craft, we handle the growth.',
  'Book Free Strategy Call',
  '#contact',
  'Target', 'Revenue-Focused',
  'Zap', '48h Turnaround',
  'Users', 'Founder-Led',
  'Based in India | Est. 2024 | Boutique Studio',
  'Saleixo - Transform Your Brand',
  'Professional photography, design, and marketing services'
WHERE NOT EXISTS (SELECT 1 FROM homepage_content LIMIT 1);