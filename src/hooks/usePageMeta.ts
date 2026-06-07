import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

const BASE_URL = 'https://saleixo.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

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

export const usePageMeta = (meta: PageMeta) => {
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
  }, [meta.title, meta.description, meta.canonical]);
};
