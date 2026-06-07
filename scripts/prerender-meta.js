/**
 * Post-build static meta injection.
 *
 * Vite produces a single dist/index.html for every route (SPA).
 * Google's first HTML fetch sees the same canonical/title/description on every URL,
 * causing all non-homepage pages to be treated as duplicates.
 *
 * This script clones dist/index.html for each public route and injects the correct
 * <title>, <meta name="description">, <link rel="canonical">, and Open Graph tags
 * directly into the static HTML. Vercel serves static files before rewrites, so
 * Googlebot receives real per-page HTML on the first fetch.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const BASE_URL = 'https://saleixo.com';

const routes = [
  {
    path: '/',
    title: 'Saleixo — Product Photography, Amazon Listings & Shopify Stores',
    description: 'Amazon Imaging, Cataloging, A+ Content, and conversion-tested Shopify stores. 500+ ecommerce sellers helped. 98% satisfaction rate.',
  },
  {
    path: '/about',
    title: 'About Saleixo — Our Story & Mission',
    description: 'Meet the team behind Saleixo. We help artisans and ecommerce sellers grow with professional photography, Amazon listings, and digital marketing.',
  },
  {
    path: '/contact',
    title: 'Contact Saleixo — Get in Touch',
    description: 'Reach out to Saleixo for product photography, Amazon listing, Shopify setup, or marketing. Email, WhatsApp, or fill in our contact form.',
  },
  {
    path: '/get-started',
    title: 'Get Started with Saleixo — Free Consultation',
    description: 'Tell us about your products and goals. We will match you to the right photography, Amazon, Shopify, or marketing service. No obligation.',
  },
  {
    path: '/services',
    title: 'Amazon Imaging, Cataloging & Advertising Services | Saleixo',
    description: 'Amazon Imaging (product photography), Cataloging (A+ Content & listings), Advertising Optimization, and Account Management for Amazon sellers and ecommerce brands.',
  },
  {
    path: '/services/photography',
    title: 'Product Photography for Amazon & Shopify | Saleixo',
    description: 'Studio-quality product images optimised for Amazon main images, A+ Content, and Shopify. White background, lifestyle, and 360° photography packages.',
  },
  {
    path: '/services/amazon',
    title: 'Amazon Listing & FBA Management | Saleixo',
    description: 'Keyword-optimised titles, bullet points, A+ Content, and FBA setup. Our Amazon Imaging and Cataloging service helps sellers rank higher and convert better.',
  },
  {
    path: '/services/shopify',
    title: 'Shopify Setup & Ecommerce Design | Saleixo',
    description: 'Custom Shopify store design, product page optimisation, and conversion rate improvements. Launch or scale your Shopify store with Saleixo.',
  },
  {
    path: '/services/social-ads',
    title: 'Social Media & Paid Advertising | Saleixo',
    description: 'Meta, Instagram, and Google Ads campaigns for ecommerce sellers. PPC management, creative production, and performance reporting.',
  },
  {
    path: '/services/ecommerce-management',
    title: 'Ecommerce Management Services | Saleixo',
    description: 'Full-service ecommerce account management across Amazon, Flipkart, Meesho, and Shopify. Inventory, listings, ads, and reporting handled for you.',
  },
  {
    path: '/services/visibility',
    title: 'Visibility Plan — Starter Package | Saleixo',
    description: 'Launch your online presence with professional product photography, SEO optimisation, and social media assets. Saleixo Visibility Plan for artisans starting out.',
  },
  {
    path: '/services/professional',
    title: 'Professional Plan — Growth Package | Saleixo',
    description: 'Advanced product photography, website design, competitor analysis, and monthly strategy calls. Saleixo Professional Plan for established sellers ready to scale.',
  },
  {
    path: '/services/enterprise',
    title: 'Enterprise Plan — Full-Service Brand Partner | Saleixo',
    description: 'Dedicated account manager, 200+ product images, video content, CRM automation, and a 3× revenue guarantee. Saleixo Enterprise for serious ecommerce brands.',
  },
  {
    path: '/custom-pricing',
    title: 'Pricing — Photography, Amazon, Shopify & Marketing | Saleixo',
    description: 'Transparent pricing for product photography, Amazon listing optimisation, Shopify setup, and digital marketing. Starter from $299. Enterprise custom quote.',
  },
  {
    path: '/design',
    title: 'Ecommerce Design Services | Saleixo',
    description: 'Brand identity, packaging design, A+ Content graphics, and Shopify storefront design for ecommerce sellers and artisans.',
  },
  {
    path: '/blog',
    title: 'Blog — Ecommerce & Amazon Seller Tips | Saleixo',
    description: 'Guides, tips, and case studies for Amazon sellers and ecommerce businesses. Product photography, listings, Shopify, and marketing.',
  },
  {
    path: '/categories',
    title: 'Product Categories We Serve | Saleixo',
    description: 'Photography and ecommerce services across jewellery, apparel, home décor, food, electronics, and more. Browse our product category expertise.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | Saleixo',
    description: 'How Saleixo collects, uses, stores, and protects your personal information. Full privacy policy including Amazon seller data handling.',
  },
  {
    path: '/terms',
    title: 'Terms of Service | Saleixo',
    description: 'Terms and conditions governing use of Saleixo services including scope, payment, cancellation, intellectual property, and liability.',
  },
  {
    path: '/cookies',
    title: 'Cookie Policy | Saleixo',
    description: 'How Saleixo uses cookies and similar technologies on saleixo.com. Includes Google Analytics and your consent choices.',
  },
  {
    path: '/refund',
    title: 'Cancellation & Refund Policy | Saleixo',
    description: 'Saleixo refund and cancellation terms. Understand your rights before purchasing photography, Amazon, Shopify, or marketing services.',
  },
];

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

let count = 0;

for (const route of routes) {
  const canonical = route.path === '/' ? `${BASE_URL}/` : `${BASE_URL}${route.path}`;
  const ogTitle = route.ogTitle ?? route.title;
  const ogDesc = route.ogDescription ?? route.description;

  let html = template;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(route.title)}</title>`);

  html = html.replace(
    /(<meta name="description" content=")[^"]*(")/,
    `$1${esc(route.description)}$2`,
  );

  html = html.replace(
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${canonical}$2`,
  );

  html = html.replace(
    /(<meta property="og:url" content=")[^"]*(")/,
    `$1${canonical}$2`,
  );

  html = html.replace(
    /(<meta property="og:title" content=")[^"]*(")/,
    `$1${esc(ogTitle)}$2`,
  );

  html = html.replace(
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${esc(ogDesc)}$2`,
  );

  html = html.replace(
    /(<meta name="twitter:title" content=")[^"]*(")/,
    `$1${esc(ogTitle)}$2`,
  );

  html = html.replace(
    /(<meta name="twitter:description" content=")[^"]*(")/,
    `$1${esc(ogDesc)}$2`,
  );

  html = html.replace(
    /(<meta name="twitter:url" content=")[^"]*(")/,
    `$1${canonical}$2`,
  );

  if (route.path === '/') {
    writeFileSync(join(DIST, 'index.html'), html);
  } else {
    const dir = join(DIST, route.path.slice(1)); // strip leading /
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html);
  }

  count++;
  console.log(`  ✓ ${route.path}`);
}

console.log(`\n[prerender-meta] Injected static meta into ${count} routes.`);
