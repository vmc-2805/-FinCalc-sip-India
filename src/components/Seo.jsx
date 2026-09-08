import { useEffect } from 'react';
import { SITE_NAME, SITE_URL, SITE_LOCALE, DEFAULT_OG_IMAGE } from '../data/site';

function setMeta(attr, key, content) {
  if (content == null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Manages <head> tags for each page: title, description, keywords,
 * canonical, Open Graph, Twitter cards and JSON-LD structured data.
 */
export default function Seo({
  title,
  description,
  keywords = [],
  path = '/',
  type = 'website',
  jsonLd = [],
  noindex = false,
}) {
  const keywordText = keywords.join(', ');
  const jsonLdText = JSON.stringify(jsonLd);

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const url = SITE_URL + path;
    const image = SITE_URL + DEFAULT_OG_IMAGE;

    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywordText);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    setLink('canonical', url);

    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', SITE_LOCALE);
    setMeta('property', 'og:image', image);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    // JSON-LD structured data
    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((s) => s.remove());
    const parsed = JSON.parse(jsonLdText);
    const blocks = Array.isArray(parsed) ? parsed : [parsed];
    blocks.filter(Boolean).forEach((block) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-seo-jsonld', 'true');
      s.text = JSON.stringify(block);
      document.head.appendChild(s);
    });
  }, [title, description, keywordText, path, type, jsonLdText, noindex]);

  return null;
}
