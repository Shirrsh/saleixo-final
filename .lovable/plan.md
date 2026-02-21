

## Redesign /design Page Into Comprehensive Ecommerce Services Page

### Overview
Rewrite `src/pages/Design.tsx` to replace the generic design services page with a detailed, sales-focused ecommerce services page that shows customers exactly how the process works and highlights the expert team.

### Page Sections (in order)

1. **Hero Section** -- "Your Products. Our Expertise. Global Sales." with badge "9 Marketplaces | 7 Countries", two CTAs (Get Started, See Our Process)

2. **How It Works (6-Step Timeline)** -- Visual numbered timeline:
   - Onboarding Call (understand products, market research)
   - Product Photography (studio catalog + lifestyle shots)
   - Listing Creation & Optimization (SEO titles, A+ content, backend keywords)
   - Store Setup & Launch (multi-platform accounts, storefront design, payments)
   - Marketing & Ads (PPC, social media, deal strategy)
   - Growth & Reporting (weekly analytics, pricing optimization, ongoing improvements)

3. **Our Expert Team** -- 6-card grid showing dedicated roles: Product Photographers, Photo/Video Editors, Listing & SEO Specialists, PPC & Marketing Managers, Brand Designers, Dedicated Account Managers. Tagline: "Every client gets a dedicated team, not a single freelancer."

4. **Platforms We Master** -- 9 marketplace cards (Amazon, Flipkart, Shopify, Etsy, eBay, Walmart, Meesho, WooCommerce, Shein) each listing 3-4 platform-specific services

5. **What You Get** -- 3 columns (Sales Growth, Brand Visibility, Ongoing Support) with bullet points, plus satisfaction guarantee banner: "100% Satisfaction | Unlimited Revisions | Dedicated Manager"

6. **CTA Section** -- "Ready to Sell Globally?" with consultation button and phone number

### Technical Details

**File:** `src/pages/Design.tsx` -- full rewrite

**Reused components:** Header, Footer, ScrollToTop, ThemeToggle, WhatsAppButton, Button, Card (all existing)

**Icons:** All from `lucide-react` -- Phone, Users, Camera, Search, ShoppingCart, BarChart3, Megaphone, Target, Headphones, Shield, Sparkles, CheckCircle2, Package, Globe, TrendingUp, etc.

**No new dependencies or files needed.**

