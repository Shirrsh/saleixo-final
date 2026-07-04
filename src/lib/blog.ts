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
    id: 'f1', title: 'Why 70% of D2C Brands Fail at Product Photography (And How to Fix It)',
    content: null,
    excerpt: "You've built an incredible product. Your branding is on point. Your website looks professional. But your conversion rate is stuck at 1–2%. The culprit is almost always your product photography.",
    featured_image_url: imgPhotography, published_date: '2025-11-27', slug: 'why-d2c-brands-fail-photography',
    status: 'published', category: 'Photography',
  },
  {
    id: 'f2', title: 'Amazon A+ Content: The Complete 2025 Guide to Doubling Your Conversion Rate',
    content: null,
    excerpt: 'A+ Content is no longer optional for serious Amazon sellers. Brands using A+ Content see an average 3–10% increase in sales. Here\'s everything you need to know.',
    featured_image_url: imgShowcase2, published_date: '2025-11-15', slug: 'amazon-a-plus-content-guide',
    status: 'published', category: 'Ecommerce',
  },
  {
    id: 'f3', title: 'The 5 Marketplace Listing Mistakes Killing Your Sales (And How to Fix Them)',
    content: null,
    excerpt: 'After auditing over 500 product listings across Amazon, Flipkart, and Etsy, we\'ve identified the five most common mistakes that silently kill conversion rates.',
    featured_image_url: imgDesign, published_date: '2025-11-01', slug: 'marketplace-listing-mistakes',
    status: 'published', category: 'Strategy',
  },
  {
    id: 'f4', title: 'How to Build a Brand Storefront That Actually Converts on Amazon',
    content: null,
    excerpt: 'Most Amazon storefronts are digital graveyards — beautiful to look at, impossible to navigate, and completely ignored by shoppers. Here\'s how to build one that works.',
    featured_image_url: imgShowcase3, published_date: '2025-10-20', slug: 'amazon-brand-storefront',
    status: 'published', category: 'Ecommerce',
  },
  {
    id: 'f5', title: 'Product Photography Lighting: Studio Secrets for Ecommerce Sellers',
    content: null,
    excerpt: 'Great product photography starts with great lighting. Whether you\'re shooting in a professional studio or a home setup, these lighting principles will transform your images.',
    featured_image_url: imgShowcase1, published_date: '2025-10-10', slug: 'product-photography-lighting',
    status: 'published', category: 'Photography',
  },
  {
    id: 'f6', title: 'Flipkart vs Amazon: Where Should You Launch Your Product First in India?',
    content: null,
    excerpt: 'India\'s ecommerce market is booming, but choosing the right platform to launch on can make or break your first 90 days. We break down the data.',
    featured_image_url: imgMarketing, published_date: '2025-09-28', slug: 'flipkart-vs-amazon-india',
    status: 'published', category: 'Strategy',
  },
  {
    id: 'f7', title: 'The ROI of Professional Product Photography: Real Numbers from 50 Sellers',
    content: null,
    excerpt: 'We tracked 50 sellers before and after professional photography. The results were consistent: better images = more sales. Here are the exact numbers.',
    featured_image_url: imgPortfolio1, published_date: '2025-09-15', slug: 'roi-professional-photography',
    status: 'published', category: 'Photography',
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
