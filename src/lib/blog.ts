import { createElement, type ReactNode } from 'react';
import { Camera, ShoppingCart, TrendingUp, BarChart2 } from 'lucide-react';

// Shared blog data shape + helpers used by both the listing page (src/pages/Blog.tsx)
// and the post detail page (src/pages/BlogPost.tsx). Kept in a non-component module
// so neither page file mixes component + non-component exports (that trips the
// react-refresh/only-export-components lint rule).

// ── Assets for fallback covers ────────────────────────────────────────────────
import imgShowcase1  from '@/assets/hero/showcase-1.jpg';
import imgShowcase2  from '@/assets/hero/showcase-2.jpg';
import imgShowcase3  from '@/assets/hero/showcase-3.jpg';
import imgShowcase4  from '@/assets/hero/showcase-4.jpeg';
import imgPortfolio1 from '@/assets/portfolio-1.jpg';
import imgPortfolio2 from '@/assets/portfolio-2.jpg';
import imgPortfolio3 from '@/assets/portfolio-3.jpeg';
import imgPhotography from '@/assets/photography-service.jpg';
import imgDesign      from '@/assets/design-service.jpg';
import imgMarketing   from '@/assets/marketing-service.jpg';

export const fallbackCovers = [
  imgShowcase1, imgShowcase2, imgShowcase3, imgShowcase4,
  imgPortfolio1, imgPortfolio2, imgPortfolio3,
  imgPhotography, imgDesign, imgMarketing,
];

export interface BlogPost {
  id: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  featured_image_url: string | null;
  published_date: string | null;
  slug: string | null;
  status: string | null;
  created_at: string | null;
  category?: string;
}

// ── Fallback posts so the page always looks great ─────────────────────────────
export const FALLBACK_POSTS: BlogPost[] = [
  {
    id: 'f8',
    title: 'The 249-Byte Amazon Backend Keyword Secret: How Top Sellers Index Without Wasting Space',
    content: `When optimizing an Amazon listing, most brand owners pour 90% of their energy into the title, bullet points, and A+ content. While those on-page elements are critical for customer conversion, the invisible engine powering your organic reach is tucked away in Seller Central: the Generic Keywords field, capped strictly at 249 bytes.

The most common mistake sellers make is treating backend search terms like Google meta tags. They insert commas, hyphens, and repeat keywords that are already present in their title or brand name. Amazon's A9 search algorithm automatically indexes all words in your title, bullet points, and brand field. Repeating those terms in your backend search terms wastes precious bytes that could have indexed your ASIN for dozens of high-intent long-tail phrases.

Furthermore, punctuation is a silent killer. Inserting commas or semicolons consumes 1 to 2 bytes each without adding any search equity. Amazon's indexing parser treats whitespace as a natural separator. If you separate your terms with simple spaces, you preserve maximum space for root synonyms, common misspellings, colloquial phrasing, and non-English translations (such as Spanish search phrases for US marketplace shoppers).

Another critical factor is character encoding. The 249-byte limit is measured in bytes, not characters. In standard ASCII (alphanumeric English characters), 1 character equals 1 byte. However, special characters, accented letters (e.g., á, ñ, ü), or symbols can consume 2 to 4 bytes each. Exceeding 249 bytes by even a single byte causes Amazon to ignore the entire backend search term field altogether, dropping your indexation for all those terms overnight.

To optimize your backend terms: export your top 5 competitor reverse-ASIN keyword reports, deduplicate against terms already in your listing text, remove all punctuation, convert to lowercase space-separated words, and verify total byte count using a UTF-8 byte counter before updating your flat file or Seller Central catalog.`,
    excerpt: 'Amazon caps backend search terms at 249 bytes. Exceeding this limit by a single byte causes Amazon to ignore the field entirely. Here is the exact deduplication framework top sellers use to index without waste.',
    featured_image_url: imgMarketing,
    published_date: '2026-04-12',
    slug: '249-byte-amazon-backend-keywords',
    status: 'published',
    category: 'Strategy',
  },
  {
    id: 'f9',
    title: 'Amazon US vs. Walmart Marketplace in 2026: The Omnichannel Expansion Playbook',
    content: `For years, Amazon US has been the undisputed king of ecommerce marketplaces. With hundreds of millions of Prime subscribers and a mature advertising ecosystem, it remains the first port of call for DTC brands. However, rising PPC customer acquisition costs, tighter storage limits, and aggressive fee adjustments have compelled high-growth brands to diversify into Walmart Marketplace.

Walmart Marketplace has evolved dramatically over the past two years. With Walmart Fulfillment Services (WFS) offering 2-day delivery across 90%+ of the US population, sellers can deliver prime-tier speed with lower fulfillment costs and simpler dimensional pricing tiers. Furthermore, Walmart's physical footprint of over 4,700 retail stores provides an omnichannel bridge that pure-play digital platforms cannot replicate.

The competitive landscape is where the real opportunity lies. On Amazon, entering a competitive category often means bidding against hundreds of sellers with tens of thousands of accumulated reviews. On Walmart, category density is significantly lower. A well-optimized listing with professional photography and competitive pricing can capture page-one organic rank within weeks rather than months.

However, replicating your Amazon listings onto Walmart directly is a mistake. Walmart's algorithmic search engine prioritizes clear, descriptive product titles over keyword-stuffed strings. Walmart also enforces strict price-parity algorithms: if your item is listed cheaper on Amazon or your own Shopify store, Walmart will unpublish the listing until prices are synchronized.

The winning playbook for 2026 is omnichannel synergy: use Amazon's high transaction velocity for initial product validation and keyword discovery, then sync catalog feeds into Walmart Marketplace via WFS, and build long-term customer equity through your direct Shopify store.`,
    excerpt: 'Both platforms offer massive customer intent and volume, but differing fee structures and algorithmic ranking demand distinct growth playbooks. We compare the operational realities.',
    featured_image_url: imgShowcase4,
    published_date: '2026-04-05',
    slug: 'amazon-vs-walmart-marketplace-guide',
    status: 'published',
    category: 'Strategy',
  },
  {
    id: 'f10',
    title: 'Premium A++ Content vs Standard A+: Conversion Benchmarks from 100 Brand Launches',
    content: `When Amazon unlocked Premium A++ Content for Brand Registry sellers who published Brand Story carousels across their catalog, it marked the biggest shift in marketplace merchandising since the introduction of video ads. But does Premium A++ actually justify the design and production investment?

Over the past 18 months, our studio analyzed conversion rate data across 100 brand catalog launches transitioning from Standard A+ to Premium A++. Across all categories, listings that implemented full-width Premium A++ layouts with interactive hotspots and mobile-first comparison tables experienced an average conversion rate lift of 6.2% to 14.8%.

The primary conversion driver in Premium A++ is not just aesthetics; it is information density and objection handling. Standard A+ is limited to 970px width and fixed rectangular images. In contrast, Premium A++ supports 1464px ultra-wide responsive banners, looping video modules, expandable Q&A accordions, and shoppable carousel navigation that allows customers to cross-shop other SKUs directly from the listing.

Mobile shopper behavior makes this difference even more pronounced. Over 70% of Amazon transactions occur on mobile devices. Standard A+ often shrinks to illegible proportions on smartphone screens. Premium A++ provides dedicated mobile assets and responsive interactive hotspots that allow shoppers to tap product callouts without zooming in or squinting.

To maximize your ROI on Premium A++: prioritize a full-width hero banner establishing brand ethos, implement interactive hover/tap hotspots explaining material specifications, embed a 15-second silent lifestyle video loop, and place a shoppable product matrix at the bottom linking to your Amazon Brand Storefront.`,
    excerpt: 'Premium A++ content unlocks video loops, interactive hotspots, and full-width mobile modules. We tracked conversion rate lifts across 100 brand launches to see what actually works.',
    featured_image_url: imgShowcase2,
    published_date: '2026-03-24',
    slug: 'premium-a-plus-content-conversion-secrets',
    status: 'published',
    category: 'Ecommerce',
  },
  {
    id: 'f11',
    title: 'Shopify Plus Checkout Extensibility & Flow Automations: How Modern Brands Cut Churn',
    content: `The retirement of checkout.liquid by Shopify marked the dawn of Checkout Extensibility—a modern, secure, and app-driven architecture designed to let high-volume merchants customize their checkout funnel without risking security vulnerabilities or breaking checkout upgrades.

For growing DTC brands, checkout friction is the primary driver of abandoned carts. With Checkout Extensibility, merchants can now inject custom UI extensions directly into the checkout journey: 1-click subscription upgrades, gift-with-purchase tiers, shipping insurance add-ons, and dynamic delivery date pickers, all integrated natively into Shop Pay.

Combined with Shopify Flow—Shopify's native automation engine—brands are cutting operational overhead and customer churn simultaneously. Instead of paying monthly fees for multiple fragmented apps, custom Flow logic can automate customer segmentation, trigger fraud alerts, hold suspicious orders, and tag VIP buyers automatically based on lifetime value milestones.

One of the most powerful workflows is automated inventory protection during flash sales. By configuring Shopify Flow to monitor inventory thresholds and automatically tag items as "Low Stock" while toggling pre-order logic, brands prevent stockouts and preserve customer goodwill during high-velocity product drops.

Upgrading to Checkout Extensibility is not merely a technical compliance requirement; it is a revenue multiplier. Brands that thoughtfully incorporate native post-purchase upsells and personalized checkout recommendations consistently see an immediate 8% to 15% increase in Average Order Value (AOV).`,
    excerpt: 'Discover how migrating from checkout.liquid to Checkout Extensibility and building bespoke Shopify Flow automations unlocks higher average order value and frictionless checkout.',
    featured_image_url: imgDesign,
    published_date: '2026-03-15',
    slug: 'shopify-checkout-extensibility-guide',
    status: 'published',
    category: 'Ecommerce',
  },
  {
    id: 'f1',
    title: 'Why 70% of D2C Brands Fail at Product Photography (And How to Fix It)',
    content: `You have invested thousands of dollars in formulation, supply chain sourcing, custom packaging, and storefront design. Your brand identity is sharp and your marketing campaigns are generating clicks. But once visitors land on your product page, your conversion rate stalls at a disappointing 1.2%. The culprit is almost always your product photography.

Shoppers on digital channels cannot touch, hold, or inspect your physical product. Your imagery serves as the entire tactile experience. When brands rely on flat lighting, inaccurate color grading, or amateur smartphone shots, customers subconsciously perceive the product as cheap or untrustworthy.

The most common failure mode is lack of context. Having pure white catalog images is mandatory for marketplace compliance, but white-background shots alone rarely convince a buyer to pull out their credit card. Shoppers need to see scale, texture, materials in natural light, and the product integrated seamlessly into real-world lifestyle situations.

Another critical error is neglecting mobile rendering. When high-resolution desktop images are scaled down to a 375px mobile screen, fine text callouts and subtle details disappear. Every product photo gallery needs mobile-first graphic design with bold, legible typography and high-contrast infographics highlighting dimensions and key benefits.

The fix is systematic: create a 7-shot framework for every SKU. Shot 1: Pure White RGB 255 compliant main image. Shot 2 & 3: Multi-angle detail shots showcasing materials and craftsmanship. Shot 4: Dimensional scale infographic. Shot 5 & 6: Lifestyle in-context photography highlighting the problem solved. Shot 7: Packaging and unboxing experience.`,
    excerpt: "You've built an incredible product. Your branding is on point. Your website looks professional. But your conversion rate is stuck at 1–2%. The culprit is almost always your product photography.",
    featured_image_url: imgPhotography,
    published_date: '2025-11-27',
    slug: 'why-d2c-brands-fail-photography',
    status: 'published',
    category: 'Photography',
  },
  {
    id: 'f2',
    title: 'Amazon A+ Content: The Complete 2025 Guide to Doubling Your Conversion Rate',
    content: `A+ Content is no longer an optional cosmetic enhancement for Amazon sellers. In an intensely competitive marketplace where ad spend continues to rise, your listing's conversion rate directly determines whether your PPC campaigns run profitably or burn capital.

According to Amazon's internal research, listings with well-crafted A+ Content see an average conversion rate lift of 3% to 10%. For a brand doing $50,000 a month in revenue, that conversion bump represents an additional $1,500 to $5,000 in pure monthly gross profit without spending an extra dime on advertising.

The secret to high-converting A+ Content lies in visual hierarchy. Instead of treating A+ as an extended product description filled with dense text blocks, treat it as a visual sales brochure. Shoppers skim; they do not read novels. Every module must communicate a single benefit through striking imagery and concise bullet points.

Comparison charts are the single highest-converting module in the A+ library. By creating a comparative matrix that showcases your other SKUs, you allow shoppers to self-select the exact variation or model that fits their budget and needs. This simultaneously keeps shoppers inside your brand ecosystem and prevents them from clicking back to competitor listings.

Finally, ensure your A+ Content contains a dedicated Brand Story module. The Brand Story sits prominently above the standard A+ modules, links directly to your Amazon Brand Storefront, and builds the emotional connection and artisan authenticity that turns one-off marketplace buyers into repeat brand evangelists.`,
    excerpt: 'A+ Content is no longer optional for serious Amazon sellers. Brands using A+ Content see an average 3–10% increase in sales. Here\'s everything you need to know.',
    featured_image_url: imgShowcase2,
    published_date: '2025-11-15',
    slug: 'amazon-a-plus-content-guide',
    status: 'published',
    category: 'Ecommerce',
  },
  {
    id: 'f3',
    title: 'The 5 Marketplace Listing Mistakes Killing Your Sales (And How to Fix Them)',
    content: `Across hundreds of diagnostic listing audits performed by our studio, we consistently see brand owners repeating the same five fundamental mistakes that suppress their algorithmic visibility and kill buyer trust.

Mistake #1: Keyword stuffing that ruins readability. Packing twenty keywords into a 200-character Amazon title might satisfy an outdated SEO checklist, but human shoppers abandon confusing, unnatural titles. Amazon's A9 and A10 algorithms heavily weight click-through rate (CTR) and conversion velocity. A clean, customer-centric title that clearly states brand, product, and primary benefit will always outperform gibberish keyword strings.

Mistake #2: Broken parent-child variation architecture. Sellers frequently upload flat files with incorrect variation themes or mismatched feed data, resulting in stranded variations, unlinked reviews, and dreaded Error 8541 notifications. Clean variation families combine review momentum and elevate the entire catalog's organic rank.

Mistake #3: Non-compliant main images. Amazon strictly mandates pure white backgrounds (RGB 255,255,255) with the product occupying at least 85% of the frame. Subtle grey casts or improper framing trigger silent search suppression, removing your ASIN from organic search results without warning.

Mistake #4: Vague bullet points focused on technical specs rather than emotional benefits. Instead of listing raw dimensions or material codes, explain what those specifications mean for the customer: durability, comfort, time saved, or peace of mind.

Mistake #5: Abandoning backend search terms. Failing to optimize the 249-byte backend search term field leaves valuable search volume on the table. Optimize these five areas and watch your organic indexing and conversion rates surge.`,
    excerpt: 'From in-depth listing audits across Amazon, Walmart, Shopify, and Etsy, we have identified five critical mistakes that silently suppress conversion rates.',
    featured_image_url: imgDesign,
    published_date: '2025-11-01',
    slug: 'marketplace-listing-mistakes',
    status: 'published',
    category: 'Strategy',
  },
  {
    id: 'f4',
    title: 'How to Build a Brand Storefront That Actually Converts on Amazon',
    content: `Most Amazon storefronts are digital ghost towns: aesthetically pleasant, but impossible to navigate, cluttered with dead links, and completely ignored by shoppers. Yet, an optimized Brand Store is one of the few places on Amazon where competitors cannot advertise against you.

When a customer clicks your brand link beneath the product title, or arrives via a Sponsored Brands headline ad, you have their undivided attention. If your storefront greets them with a confusing maze of submenus and low-resolution banners, they bounce immediately back to the search bar.

To build a high-converting storefront, structure your navigation like an upscale boutique. The homepage should feature a bold lifestyle hero banner, your flagship bestsellers in a clear multi-column product grid, and quick-link category cards directing shoppers to specific collections.

Leverage video and interactive shoppable images. Amazon allows you to tag products within lifestyle photography so shoppers can click directly on an image to view price, Prime eligibility, and add the product to cart in a single click.

Crucially, review your Amazon Store Insights weekly. Amazon provides detailed attribution data showing traffic sources, page views, and sales generated per page. Use this data to eliminate low-performing tabs and direct your Sponsored Brands ad traffic straight to your highest-converting category pages.`,
    excerpt: 'Most Amazon storefronts are digital graveyards — beautiful to look at, impossible to navigate, and completely ignored by shoppers. Here\'s how to build one that works.',
    featured_image_url: imgShowcase3,
    published_date: '2025-10-20',
    slug: 'amazon-brand-storefront',
    status: 'published',
    category: 'Ecommerce',
  },
  {
    id: 'f5',
    title: 'Product Photography Lighting: Studio Secrets for Ecommerce Sellers',
    content: `The difference between an amateur product photo and a multi-million-dollar catalog shoot is rarely the camera body; it is almost entirely how light is shaped, diffused, and controlled.

The most common misconception is that brighter light equals better photography. Blasting direct, harsh light onto products causes blown-out specular highlights, harsh shadows, and washed-out textures. Professional studio photography relies on large, diffused light sources—such as 120cm softboxes or diffusion scrims—that wrap softly around the product contours.

For reflective products like glassware, jewelry, or cosmetics, reflections must be sculpted deliberately. Using black and white foam core boards (known as "flags" and "reflectors") allows photographers to define the product edges with crisp black boundaries while eliminating distracting room reflections.

Color accuracy is paramount. When products appear in a slightly different hue online than when delivered to the customer's doorstep, return rates skyrocket. Always shoot using a standardized color checker passport, lock manual white balance in camera, and calibrate your studio monitors to sRGB color space.

Whether you shoot in-house or partner with an ecommerce studio, mastering light fall-off, rim lighting, and pure RGB 255 background isolation will instantly elevate your brand's perceived value and catalog conversion rates.`,
    excerpt: 'Great product photography starts with great lighting. Whether you\'re shooting in a professional studio or a home setup, these lighting principles will transform your images.',
    featured_image_url: imgShowcase1,
    published_date: '2025-10-10',
    slug: 'product-photography-lighting',
    status: 'published',
    category: 'Photography',
  },
  {
    id: 'f6',
    title: 'The ROI of Professional Product Photography: Real Numbers from 50 Sellers',
    content: `When calculating return on investment for ecommerce services, brand owners often view product photography as an unavoidable upfront expense rather than a revenue-generating investment. To test this assumption, our team tracked performance metrics across 50 marketplace sellers before and after replacing amateur photos with studio catalog and lifestyle imagery.

The aggregated findings were striking:
- Average conversion rate increased from 1.4% to 3.1% (a 121% relative lift).
- Click-through rate (CTR) on marketplace search results improved by 43%, driven by pure-white RGB 255 compliant main images with optimal 85% frame fill.
- Customer return rates dropped by 18%, as multi-angle macro shots and dimension graphics accurately set customer expectations before purchase.
- Advertising Return on Ad Spend (ROAS) improved by 34%, as higher conversion rates reduced the cost-per-acquisition across Sponsored Products campaigns.

In dollar terms, a seller generating $20,000 a month who invested $1,200 in professional catalog imaging broke even within 14 days solely through the resulting conversion rate increase.

High-quality product photography is the single highest-leverage investment in the entire ecommerce stack. It improves search visibility, drives ad efficiency, lowers returns, and builds the premium brand equity required to command higher retail prices.`,
    excerpt: 'We tracked 50 sellers before and after professional photography. The results were consistent: better images = more sales. Here are the exact numbers.',
    featured_image_url: imgPortfolio1,
    published_date: '2025-09-15',
    slug: 'roi-professional-photography',
    status: 'published',
    category: 'Photography',
  },
];

export const CATEGORY_ICONS: Record<string, ReactNode> = {
  Photography: createElement(Camera, { className: 'w-3.5 h-3.5' }),
  Ecommerce:   createElement(ShoppingCart, { className: 'w-3.5 h-3.5' }),
  Strategy:    createElement(TrendingUp, { className: 'w-3.5 h-3.5' }),
  Marketing:   createElement(BarChart2, { className: 'w-3.5 h-3.5' }),
};

// ── Helpers ───────────────────────────────────────────────────────────────────
export const readingTime = (post: BlogPost) => {
  const words = ((post.content || '') + (post.excerpt || '')).split(' ').length;
  return Math.max(3, Math.ceil(words / 200));
};

export const getExcerpt = (post: BlogPost) => {
  if (post.excerpt) return post.excerpt;
  if (post.content) return post.content.substring(0, 160) + '…';
  return 'Read more about this topic…';
};

export const getDate = (post: BlogPost) =>
  new Date(post.published_date || post.created_at || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

// ISO 8601 date for structured data (schema.org datePublished/dateModified).
export const getISODate = (post: BlogPost) =>
  new Date(post.published_date || post.created_at || Date.now()).toISOString();

export const getSlug = (post: BlogPost) => post.slug || post.id;

export const getCover = (post: BlogPost, idx: number) =>
  post.featured_image_url || fallbackCovers[idx % fallbackCovers.length];

// Cover images are either an absolute Supabase Storage URL (featured_image_url) or a
// root-relative bundled asset path (fallback covers) — normalise both to an absolute URL.
export const toAbsoluteUrl = (src: string) => (src.startsWith('http') ? src : `https://saleixo.com${src}`);

export const getCategoryColor = (cat?: string) => {
  const map: Record<string, string> = {
    Photography: '#3b82f6',
    Ecommerce:   '#10b981',
    Strategy:    '#8b5cf6',
    Marketing:   '#f97316',
  };
  return map[cat || ''] || '#d4af37';
};
