

## Enhance Ecommerce Services Page with Competitor-Matched Offerings

### What's Missing vs. SellerRocket

Your current page covers photography, listing optimization, marketing, and platform management well. However, the competitor offers several additional services and sections you're missing:

**New Services to Add:**
1. **E-Commerce Seller Account Management** -- End-to-end account management with focus on sustained sales growth
2. **Global Seller Account Management** -- International expansion and cross-border selling
3. **Quick Commerce Onboarding** -- Blinkit, Zepto, Swiggy Instamart setup and management
4. **Website Design & Development** -- Custom ecommerce websites (Shopify, WooCommerce, WordPress)
5. **Digital Marketing** -- SEO, PPC, social media marketing, lead generation
6. **Video Editing** -- Product videos, reels, brand storytelling content
7. **Branding** -- Complete brand identity (logo, packaging, brand guidelines)

**New Sections to Add:**
1. **Core Services Grid** (9 service cards) -- Before the "How It Works" section
2. **Quick Commerce Platforms** -- Blinkit, Zepto, Instamart cards
3. **Stats Counter Bar** -- Animated numbers (500+ Clients, 1000+ Campaigns, Rs 10 Cr+ Revenue, 15+ Years)
4. **Our Strategy** -- 3-step strategy overview (Sales Plan, Marketing Strategy, Marketplace Expansion)
5. **Why Choose Us** -- Trust signals (91% Client Retention, Amazon SPN Partner, Expert Managers, WhatsApp Support)
6. **Social Media Marketing** -- Highlight digital marketing ROI metrics (+250% lead volume, +122% organic growth, etc.)
7. **Additional Platforms** -- Add Myntra, AJIO, Nykaa, JioMart, Tata CLiQ, FirstCry, GlowRoad, Lazada, Alibaba, AliExpress, Mercado Libre to the platforms list
8. **Free Audit CTA** -- "Get your free Seller account audit today" mid-page callout

### Updated Page Flow

```text
1. HERO (keep existing, update badge to "15+ Marketplaces | 25+ Countries")
2. STATS COUNTER BAR (NEW) -- 500+ Clients | 1000+ Campaigns | 10 Cr+ Revenue | 15+ Years
3. CORE SERVICES GRID (NEW) -- 9 service cards matching competitor
4. HOW IT WORKS (keep existing 6-step timeline)
5. OUR STRATEGY (NEW) -- 3-step: Sales Plan > Marketing Strategy > Marketplace Expansion
6. EXPERT TEAM (keep existing)
7. PLATFORMS WE MASTER (expand with 15+ more platforms, split into Domestic/Global/Quick Commerce)
8. WHY CHOOSE US (NEW) -- 8 trust signal cards
9. SOCIAL MEDIA MARKETING (NEW) -- ROI metrics section
10. WHAT YOU GET (keep existing)
11. FREE AUDIT CTA (NEW) -- Mid-page conversion section
12. FINAL CTA (keep existing)
```

### Technical Details

**File Modified:** `src/pages/Design.tsx` -- major expansion

**New Data Arrays:**
- `coreServices` -- 9 items (Account Mgmt, Global Selling, Quick Commerce, Website Dev, Digital Marketing, Shopify, Photography, Video Editing, Branding)
- `strategySteps` -- 3 items (Sales Plan, Marketing Strategy, Marketplace Expansion)
- `whyChooseUs` -- 8 items (500+ Clients, 91% Retention, Amazon SPN, Expert Managers, Sales Focus, 15+ Years, WhatsApp Support, Dedicated Manager)
- `quickCommercePlatforms` -- Blinkit, Zepto, Instamart
- `socialMediaStats` -- ROI metrics (+250% leads, +122% organic, 70% visibility, 50% ROAS)
- Expanded `platforms` array split into: domestic (Amazon, Flipkart, Myntra, AJIO, Meesho, JioMart, Tata CLiQ, Nykaa, FirstCry, GlowRoad), global (Amazon Global, eBay, Walmart, Etsy, Lazada, Alibaba, AliExpress, Mercado Libre, Shopee, Shein), quick commerce (Blinkit, Zepto, Instamart)

**New Sections Built:**
- Stats counter bar with animated counting numbers using existing `useAnimatedCounter` hook
- 9-card services grid with icons and descriptions
- 3-step strategy section with numbered cards
- 8-card "Why Choose Us" trust signals grid
- Social media marketing ROI metrics display
- "Free Account Audit" mid-page CTA banner
- Platform section reorganized with tabs (Domestic / Global / Quick Commerce)

**No new dependencies needed.** All built with existing Card, Button, Tabs components and lucide-react icons.

