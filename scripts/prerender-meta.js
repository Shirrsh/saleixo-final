/**
 * Post-build static meta injection.
 *
 * Vite produces a single dist/index.html for every route (SPA). This script
 * clones dist/index.html for each public route and injects the correct title,
 * meta description, canonical link, Open Graph tags, and JSON-LD structured
 * data directly into the static HTML. Vercel serves static files before
 * rewrites, so Googlebot receives real per-page HTML on the first fetch -
 * without this, usePageMeta structured data only ever lands in the DOM via a
 * client-side useEffect, invisible to any crawler that does not execute JS.
 *
 * JSON-LD script tags here use the same data-ld-id scheme as
 * src/hooks/usePageMeta.ts (organization for the sitewide schema, page-0/
 * page-1/... for page-specific schema in array order) so React's hydration
 * effect finds these existing script tags and overwrites them in place
 * instead of creating duplicates.
 *
 * Blog post Article schema is NOT duplicated here - it depends on live
 * Supabase data fetched client-side, and this script has no DB access at
 * build time. It still lands via the client-side effect for crawlers that
 * execute JS; only the static Blog breadcrumb is embedded here.
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const BASE_URL = "https://saleixo.com";
const H = BASE_URL + "/";

const ORG_ID = BASE_URL + "/#organization";
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: "Saleixo",
  url: H,
  logo: BASE_URL + "/og-image.png",
  description: "Full-stack ecommerce studio: product photography, Amazon listings, A+ content, Shopify stores, and marketplace marketing for D2C brands and Amazon sellers.",
  email: "info@saleixo.com",
  telephone: "+917011441159",
  foundingDate: "2025",
  address: {
    "@type": "PostalAddress",
    streetAddress: "A-41, Block A, Industrial Area, Sector 62",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201309",
    addressCountry: "IN",
  },
  areaServed: ["IN", "US", "GB", "FR", "DE", "AU", "CA"],
  sameAs: ["https://x.com/SaleixoStudio"],
  knowsAbout: ["Product Photography", "Amazon Listing Optimization", "A+ Content Design", "Shopify Development", "Amazon PPC", "Ecommerce Management"],
};

const buildBreadcrumb = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

const buildService = (svc) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: svc.name,
  url: svc.url,
  serviceType: svc.serviceType,
  provider: { "@id": ORG_ID },
  areaServed: ["IN", "US", "GB", "FR", "DE", "AU", "CA"],
  description: svc.description,
});

const routes = [
  {
    path: "/",
    title: "Saleixo - Product Photography, Amazon Listings & Shopify Stores",
    description: "Amazon Imaging, Cataloging, A+ Content, and conversion-tested Shopify stores. 500+ ecommerce sellers helped. 98% satisfaction rate.",
    ogImage: BASE_URL + "/og/home-og.jpg",
  },
  {
    path: "/about",
    title: "About Saleixo - Our Story & Mission",
    description: "Meet the team behind Saleixo. We help artisans and ecommerce sellers grow with professional photography, Amazon listings, and digital marketing.",
    ogImage: BASE_URL + "/og/about-og.jpg",
    breadcrumb: [{ name: "Home", url: H }, { name: "About", url: BASE_URL + "/about" }],
  },
  {
    path: "/contact",
    title: "Contact Saleixo - Get in Touch",
    description: "Reach out to Saleixo for product photography, Amazon listing, Shopify setup, or marketing. Email, WhatsApp, or fill in our contact form.",
    breadcrumb: [{ name: "Home", url: H }, { name: "Contact", url: BASE_URL + "/contact" }],
  },
  {
    path: "/get-started",
    title: "Get Started with Saleixo - Free Consultation",
    description: "Tell us about your products and goals. We will match you to the right photography, Amazon, Shopify, or marketing service. No obligation.",
    breadcrumb: [{ name: "Home", url: H }, { name: "Get Started", url: BASE_URL + "/get-started" }],
  },
  {
    path: "/services",
    title: "Amazon Imaging, Cataloging & Advertising Services | Saleixo",
    description: "Amazon Imaging (product photography), Cataloging (A+ Content & listings), Advertising Optimization, and Account Management for Amazon sellers and ecommerce brands.",
    ogImage: BASE_URL + "/og/services-og.jpg",
    breadcrumb: [{ name: "Home", url: H }, { name: "Services", url: BASE_URL + "/services" }],
  },
  {
    path: "/services/photography",
    title: "Product Photography for Amazon & Shopify | Saleixo",
    description: "Studio-quality product images optimised for Amazon main images, A+ Content, and Shopify. White background, lifestyle, and 360-degree photography packages.",
    breadcrumb: [{ name: "Home", url: H }, { name: "Services", url: BASE_URL + "/services" }, { name: "Product Photography", url: BASE_URL + "/services/photography" }],
    service: { name: "Product Photography Services", url: BASE_URL + "/services/photography", serviceType: "Product Photography", description: "Studio-grade product photography for Amazon, Shopify, and all major marketplaces. White-background, lifestyle, 360-degree, and infographic shots." },
  },
  {
    path: "/services/amazon",
    title: "Amazon Listing & FBA Management | Saleixo",
    description: "Keyword-optimised titles, bullet points, A+ Content, and FBA setup. Our Amazon Imaging and Cataloging service helps sellers rank higher and convert better.",
    breadcrumb: [{ name: "Home", url: H }, { name: "Services", url: BASE_URL + "/services" }, { name: "Amazon Listing & FBA", url: BASE_URL + "/services/amazon" }],
    service: { name: "Amazon Listing & FBA Services", url: BASE_URL + "/services/amazon", serviceType: "Amazon Listing Optimization", description: "Full Amazon seller support - keyword-optimised listings, A+ content, FBA setup, and account management." },
  },
  {
    path: "/services/shopify",
    title: "Shopify Setup & Ecommerce Design | Saleixo",
    description: "Custom Shopify store design, product page optimisation, and conversion rate improvements. Launch or scale your Shopify store with Saleixo.",
    breadcrumb: [{ name: "Home", url: H }, { name: "Services", url: BASE_URL + "/services" }, { name: "Shopify Setup & Design", url: BASE_URL + "/services/shopify" }],
    service: { name: "Shopify Store Design & Setup", url: BASE_URL + "/services/shopify", serviceType: "Shopify Store Development", description: "Custom Shopify stores built for conversion. Products, promotions, brand identity, and ongoing management included." },
  },
  {
    path: "/services/social-ads",
    title: "Social Media & Paid Advertising | Saleixo",
    description: "Meta, Instagram, and Google Ads campaigns for ecommerce sellers. PPC management, creative production, and performance reporting.",
    breadcrumb: [{ name: "Home", url: H }, { name: "Services", url: BASE_URL + "/services" }, { name: "Social & Paid Ads", url: BASE_URL + "/services/social-ads" }],
    service: { name: "Social & Paid Ads", url: BASE_URL + "/services/social-ads", serviceType: "Social Media & Paid Advertising", description: "Google, Meta, TikTok & Amazon ad campaigns for ecommerce sellers. Full creative, targeting, optimisation, and monthly reporting." },
  },
  {
    path: "/services/ecommerce-management",
    title: "Ecommerce Management Services | Saleixo",
    description: "Full-service ecommerce account management across Amazon, Flipkart, Meesho, and Shopify. Inventory, listings, ads, and reporting handled for you.",
    breadcrumb: [{ name: "Home", url: H }, { name: "Services", url: BASE_URL + "/services" }, { name: "Ecommerce Management", url: BASE_URL + "/services/ecommerce-management" }],
    service: { name: "Ecommerce Management", url: BASE_URL + "/services/ecommerce-management", serviceType: "Ecommerce Account Management", description: "Full-service ecommerce operations - inventory, orders, listings, and account health across 20+ marketplaces." },
  },
  {
    path: "/services/visibility",
    title: "Visibility Plan - Starter Package | Saleixo",
    description: "Launch your online presence with professional product photography, SEO optimisation, and social media assets. Saleixo Visibility Plan for artisans starting out.",
    breadcrumb: [{ name: "Home", url: H }, { name: "Services", url: BASE_URL + "/services" }, { name: "Visibility Plan", url: BASE_URL + "/services/visibility" }],
  },
  {
    path: "/services/professional",
    title: "Professional Plan - Growth Package | Saleixo",
    description: "Advanced product photography, website design, competitor analysis, and monthly strategy calls. Saleixo Professional Plan for established sellers ready to scale.",
    breadcrumb: [{ name: "Home", url: H }, { name: "Services", url: BASE_URL + "/services" }, { name: "Professional Plan", url: BASE_URL + "/services/professional" }],
  },
  {
    path: "/services/enterprise",
    title: "Enterprise Plan - Full-Service Brand Partner | Saleixo",
    description: "Dedicated account manager, 200+ product images, video content, CRM automation, and a 3x revenue guarantee. Saleixo Enterprise for serious ecommerce brands.",
    breadcrumb: [{ name: "Home", url: H }, { name: "Services", url: BASE_URL + "/services" }, { name: "Enterprise Plan", url: BASE_URL + "/services/enterprise" }],
  },
  {
    path: "/custom-pricing",
    title: "Pricing - Photography, Amazon, Shopify & Marketing | Saleixo",
    description: "Transparent pricing for product photography, Amazon listing optimisation, Shopify setup, and digital marketing. Starter from $299. Enterprise custom quote.",
    breadcrumb: [{ name: "Home", url: H }, { name: "Pricing", url: BASE_URL + "/custom-pricing" }],
  },
  {
    path: "/handmade",
    title: "Ecommerce Studio for Handmade & Artisan Brands — Saleixo",
    description: "Product photography, Etsy & Amazon Handmade listings, and Shopify stores for artisan brands. Studio in Noida, delivering to 20+ marketplaces worldwide.",
    breadcrumb: [{ name: "Home", url: H }, { name: "Handmade & Artisan Brands", url: BASE_URL + "/handmade" }],
    service: { name: "Ecommerce Services for Handmade & Artisan Brands", url: BASE_URL + "/handmade", serviceType: "Ecommerce services for handmade and artisan brands", description: "Product photography, Etsy & Amazon Handmade listings, and Shopify stores for artisan brands — beadwork, jewelry, textiles, pottery, incense." },
  },
  {
    path: "/design",
    title: "Ecommerce Design Services | Saleixo",
    description: "Brand identity, packaging design, A+ Content graphics, and Shopify storefront design for ecommerce sellers and artisans.",
    breadcrumb: [{ name: "Home", url: H }, { name: "Services", url: BASE_URL + "/services" }, { name: "Ecommerce Design", url: BASE_URL + "/design" }],
    service: { name: "Ecommerce Design Services", url: BASE_URL + "/design", serviceType: "Ecommerce Design", description: "Brand identity, listing design, and storefront design for ecommerce sellers. Built for Amazon, Shopify, and all major marketplaces." },
  },
  {
    path: "/blog",
    title: "Blog - Ecommerce & Amazon Seller Tips | Saleixo",
    description: "Guides, tips, and case studies for Amazon sellers and ecommerce businesses. Product photography, listings, Shopify, and marketing.",
    ogImage: BASE_URL + "/og/blog-og.jpg",
    breadcrumb: [{ name: "Home", url: H }, { name: "Blog", url: BASE_URL + "/blog" }],
  },
  {
    path: "/categories",
    title: "Product Categories We Serve | Saleixo",
    description: "Photography and ecommerce services across jewellery, apparel, home decor, food, electronics, and more. Browse our product category expertise.",
    breadcrumb: [{ name: "Home", url: H }, { name: "Categories", url: BASE_URL + "/categories" }],
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Saleixo",
    description: "How Saleixo collects, uses, stores, and protects your personal information. Full privacy policy including Amazon seller data handling.",
    breadcrumb: [{ name: "Home", url: H }, { name: "Privacy Policy", url: BASE_URL + "/privacy" }],
  },
  {
    path: "/terms",
    title: "Terms of Service | Saleixo",
    description: "Terms and conditions governing use of Saleixo services including scope, payment, cancellation, intellectual property, and liability.",
    breadcrumb: [{ name: "Home", url: H }, { name: "Terms of Service", url: BASE_URL + "/terms" }],
  },
  {
    path: "/cookies",
    title: "Cookie Policy | Saleixo",
    description: "How Saleixo uses cookies and similar technologies on saleixo.com. Includes Google Analytics and your consent choices.",
    breadcrumb: [{ name: "Home", url: H }, { name: "Cookie Policy", url: BASE_URL + "/cookies" }],
  },
  {
    path: "/refund",
    title: "Cancellation & Refund Policy | Saleixo",
    description: "Saleixo refund and cancellation terms. Understand your rights before purchasing photography, Amazon, Shopify, or marketing services.",
    breadcrumb: [{ name: "Home", url: H }, { name: "Refund & Service Policy", url: BASE_URL + "/refund" }],
  },
];

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const template = readFileSync(join(DIST, "index.html"), "utf-8");

let count = 0;

for (const route of routes) {
  const canonical = route.path === "/" ? H : BASE_URL + route.path;
  const ogTitle = route.ogTitle ?? route.title;
  const ogDesc = route.ogDescription ?? route.description;

  let html = template;

  html = html.replace(/<title>[^<]*<\/title>/, "<title>" + esc(route.title) + "</title>");
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, "$1" + esc(route.description) + "$2");
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, "$1" + canonical + "$2");
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, "$1" + canonical + "$2");
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, "$1" + esc(ogTitle) + "$2");
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, "$1" + esc(ogDesc) + "$2");
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/, "$1" + esc(ogTitle) + "$2");
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/, "$1" + esc(ogDesc) + "$2");
  html = html.replace(/(<meta name="twitter:url" content=")[^"]*(")/, "$1" + canonical + "$2");

  if (route.ogImage) {
    html = html.replace(/(<meta property="og:image" content=")[^"]*(")/, "$1" + route.ogImage + "$2");
    html = html.replace(/(<meta property="og:image:type" content=")[^"]*(")/, "$1image/jpeg$2");
    html = html.replace(/(<meta name="twitter:image" content=")[^"]*(")/, "$1" + route.ogImage + "$2");
  }

  const pageSchemas = [];
  if (route.breadcrumb) pageSchemas.push(buildBreadcrumb(route.breadcrumb));
  if (route.service) pageSchemas.push(buildService(route.service));

  const scriptTags = [
    '<script type="application/ld+json" data-ld-id="organization">' + JSON.stringify(ORGANIZATION_SCHEMA) + "</script>",
  ];
  pageSchemas.forEach((schema, i) => {
    scriptTags.push('<script type="application/ld+json" data-ld-id="page-' + i + '">' + JSON.stringify(schema) + "</script>");
  });

  html = html.replace("</head>", "    " + scriptTags.join("\n    ") + "\n  </head>");

  if (route.path === "/") {
    writeFileSync(join(DIST, "index.html"), html);
  } else {
    const dir = join(DIST, route.path.slice(1));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), html);
  }

  count++;
  console.log("  ok " + route.path);
}

let notFoundHtml = template;
notFoundHtml = notFoundHtml.replace(/<title>[^<]*<\/title>/, "<title>Page Not Found | Saleixo</title>");
notFoundHtml = notFoundHtml.replace(
  /(<meta name="description" content=")[^"]*(")/,
  "$1" + esc("The page you are looking for does not exist or has moved.") + "$2",
);
if (/<meta name="robots" content="[^"]*"\s*\/?>/.test(notFoundHtml)) {
  notFoundHtml = notFoundHtml.replace(/(<meta name="robots" content=")[^"]*(")/, "$1noindex, follow$2");
} else {
  notFoundHtml = notFoundHtml.replace("</head>", '  <meta name="robots" content="noindex, follow" />\n  </head>');
}
writeFileSync(join(DIST, "404.html"), notFoundHtml);
console.log("  ok 404.html (real 404 status for unknown routes)");

console.log("\n[prerender-meta] Injected static meta into " + count + " routes.");
