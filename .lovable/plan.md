

## Redesign the /design Page Into a Comprehensive Ecommerce Services Page

### Problem
The current `/design` page is generic -- it lists design services (logo, packaging, social media) but doesn't explain **how your ecommerce business actually works** for customers. It lacks:
- Clear step-by-step breakdown of what happens after a client signs up
- Expert team roles and specializations
- Marketplace-specific details (Amazon A+, Flipkart listings, etc.)
- Satisfaction/sales guarantees and results

### New Page Structure

```text
+--------------------------------------------------+
|  HERO                                            |
|  "Your Products. Our Expertise. Global Sales."   |
|  Badge: "9 Marketplaces | 7 Countries"           |
|  CTAs: [Get Started] [See Our Process]           |
+--------------------------------------------------+
          |
+--------------------------------------------------+
|  HOW IT WORKS (6-Step Visual Timeline)           |
|                                                  |
|  1. Onboarding Call                              |
|     - Understand your products & goals           |
|     - Market research & competitor analysis      |
|                                                  |
|  2. Product Photography                          |
|     - Studio-grade catalog + lifestyle shots     |
|     - Short-form video content                   |
|                                                  |
|  3. Listing Creation & Optimization              |
|     - SEO-optimized titles & descriptions        |
|     - A+/A++ content for Amazon/Flipkart         |
|     - Backend keyword optimization               |
|                                                  |
|  4. Store Setup & Launch                         |
|     - Multi-platform account setup               |
|     - Brand storefront design                    |
|     - Payment & shipping configuration           |
|                                                  |
|  5. Marketing & Ads                              |
|     - PPC campaign management                    |
|     - Social media promotions                    |
|     - Deal/coupon strategy                       |
|                                                  |
|  6. Growth & Reporting                           |
|     - Weekly sales analytics                     |
|     - Inventory & pricing optimization           |
|     - Ongoing listing improvements               |
+--------------------------------------------------+
          |
+--------------------------------------------------+
|  OUR EXPERT TEAM                                 |
|                                                  |
|  [Photo] Product Photographers                   |
|  [Edit]  Photo & Video Editors                   |
|  [List]  Listing & SEO Specialists               |
|  [Ads]   PPC & Marketing Managers                |
|  [Brand] Brand Designers                         |
|  [Mgr]   Dedicated Account Managers              |
|                                                  |
|  "Every client gets a dedicated team, not a      |
|   single freelancer."                            |
+--------------------------------------------------+
          |
+--------------------------------------------------+
|  PLATFORMS WE MASTER                             |
|                                                  |
|  Detailed cards for each marketplace:            |
|  - Amazon: A+ Content, FBA, Sponsored Ads       |
|  - Flipkart: Catalog, Ads Manager               |
|  - Etsy: SEO, Shop Optimization                 |
|  - Shopify: Store Design, Apps, Checkout         |
|  - eBay: Listing Templates, Promoted             |
|  - Walmart: WFS, Listing Quality                |
|  - Meesho: Supplier Dashboard                    |
|  - WooCommerce: Plugin Setup, Payments           |
|  - Shein: Product Onboarding                     |
+--------------------------------------------------+
          |
+--------------------------------------------------+
|  WHAT YOU GET (Results & Guarantees)             |
|                                                  |
|  3 columns:                                      |
|  [Sales Growth]    [Brand Visibility]  [Support] |
|  - Optimized       - Professional      - Weekly  |
|    listings          storefront          reports  |
|  - Ad campaigns    - A+ content        - Direct  |
|  - Pricing         - Social proof        WhatsApp|
|    strategy                               access |
|                                                  |
|  Satisfaction Badge:                             |
|  "100% Satisfaction | Unlimited Revisions |      |
|   Dedicated Manager"                             |
+--------------------------------------------------+
          |
+--------------------------------------------------+
|  CTA SECTION                                     |
|  "Ready to Sell Globally?"                       |
|  [Book Free Consultation] [Call +91 7011441159]  |
+--------------------------------------------------+
```

---

### Technical Details

**File Modified:** `src/pages/Design.tsx` (complete rewrite)

**Sections to build:**

1. **Hero** -- Ecommerce-focused headline with marketplace count badge, two CTA buttons

2. **How It Works (6 Steps)** -- Vertical timeline with alternating left/right layout on desktop; numbered steps with icons, title, bullet points per step

3. **Our Expert Team** -- 6 role cards in a grid showing each specialist role (Photographer, Editor, SEO Specialist, PPC Manager, Brand Designer, Account Manager) with icon and description emphasizing "dedicated team, not a freelancer"

4. **Platforms We Master** -- 9 marketplace cards, each listing 3-4 specific services offered for that platform (e.g., Amazon: "A+ Content, FBA Setup, Sponsored Ads, Brand Registry")

5. **What You Get** -- 3-column layout: Sales Growth, Brand Visibility, Ongoing Support. Each with 4-5 bullet points. Followed by a satisfaction guarantee banner with "Unlimited Revisions | Dedicated Manager | Weekly Reports"

6. **CTA Section** -- Final call-to-action with contact button and phone number

**Icons used:** All from `lucide-react` (Camera, Search, ShoppingCart, BarChart3, Users, Megaphone, Target, Headphones, Shield, etc.)

**No new dependencies needed.** Reuses existing components: Header, Footer, ScrollToTop, ThemeToggle, WhatsAppButton, Button, Card.

