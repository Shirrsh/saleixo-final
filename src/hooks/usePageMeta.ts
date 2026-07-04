import { useEffect } from 'react';

// A single JSON-LD structured data block (schema.org). Kept loose (Record<string, unknown>)
// since each page composes a different schema shape (Service, BreadcrumbList, Blog, etc).
type StructuredData = Record<string, unknown>;

interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  /** One or more JSON-LD schema.org objects to inject as <script type="application/ld+json"> tags. */
  structuredData?: StructuredData | StructuredData[];
}

const BASE_URL = 'https://saleixo.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

// ── Sitewide organization schema ──────────────────────────────────────────────
// Injected on every page that calls usePageMeta, so it's always present without
// every page needing to redeclare it. Business facts sourced from CLAUDE.md.
export const ORG_ID = `${BASE_URL}/#organization`;

const ORGANIZATION_SCHEMA: StructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: 'Saleixo',
  url: `${BASE_URL}/`,
  logo: DEFAULT_IMAGE,
  description: 'Full-stack ecommerce studio: product photography, Amazon listings, A+ content, Shopify stores, and marketplace marketing for D2C brands and Amazon sellers.',
  email: 'info@saleixo.com',
  telephone: '+917011441159',
  foundingDate: '2025',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'A-41, Block A, Industrial Area, Sector 62',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201309',
    addressCountry: 'IN',
  },
  areaServed: ['IN', 'US', 'GB', 'FR', 'DE', 'AU', 'CA'],
  sameAs: ['https://x.com/SaleixoStudio'],
  knowsAbout: ['Product Photography', 'Amazon Listing Optimization', 'A+ Content Design', 'Shopify Development', 'Amazon PPC', 'Ecommerce Management'],
};

/** Builds a BreadcrumbList schema from an ordered list of {name, url} crumbs (Home first). */
export const buildBreadcrumbSchema = (items: { name: string; url: string }[]): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

const setMeta = (selector: string, attr: string, value: string) => {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    const [attrName, attrVal] = selector.replace('[', '').replace(']', '').split('=');
    el.setAttribute(attrName.trim(), attrVal.replace(/"/g, '').trim());
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const setLink = (rel: string, href: string) => {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
};

// ── JSON-LD injection ─────────────────────────────────────────────────────────
const setJsonLd = (id: string, data: unknown) => {
  let el = document.querySelector<HTMLScriptElement>(`script[data-ld-id="${id}"]`);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-ld-id', id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

const clearPageJsonLd = () => {
  document.querySelectorAll('script[data-ld-id^="page-"]').forEach(el => el.remove());
};

export const usePageMeta = (meta: PageMeta) => {
  // Stable string so the effect only re-runs when the structured data actually changes
  // (e.g. once async-loaded blog posts arrive), not on every render.
  const structuredDataKey = JSON.stringify(meta.structuredData ?? null);

  useEffect(() => {
    const { title, description, canonical, ogTitle, ogDescription, ogImage } = meta;
    const url = canonical ?? `${BASE_URL}${window.location.pathname}`;
    const image = ogImage ?? DEFAULT_IMAGE;

    document.title = title;

    setMeta('meta[name="description"]',           'content', description);
    setMeta('meta[property="og:title"]',          'content', ogTitle ?? title);
    setMeta('meta[property="og:description"]',    'content', ogDescription ?? description);
    setMeta('meta[property="og:url"]',            'content', url);
    setMeta('meta[property="og:image"]',          'content', image);
    setMeta('meta[name="twitter:title"]',         'content', ogTitle ?? title);
    setMeta('meta[name="twitter:description"]',   'content', ogDescription ?? description);
    setMeta('meta[name="twitter:image"]',         'content', image);
    setMeta('meta[name="twitter:url"]',           'content', url);
    setLink('canonical', url);

    // Sitewide ProfessionalService schema — idempotent, present on every page.
    setJsonLd('organization', ORGANIZATION_SCHEMA);

    // Page-specific structured data (Service, BreadcrumbList, Blog, etc).
    clearPageJsonLd();
    if (meta.structuredData) {
      const items = Array.isArray(meta.structuredData) ? meta.structuredData : [meta.structuredData];
      items.forEach((item, i) => setJsonLd(`page-${i}`, item));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.title, meta.description, meta.canonical, structuredDataKey]);
};
