/**
 * Helper functions for document path/slug manipulation.
 * Extracted from [locale]/[...slug].astro to avoid Astro frontmatter compilation issues.
 *
 * Phase 0
 */

import { locales, type Locale } from './i18n';

export function getIndexFolderPath(doc: { path?: string }): string {
  if (!doc.path) return '';
  return doc.path.replace(/\/index\.mdx?$/i, '');
}

export function isIndexFile(doc: { type?: string; path?: string }): boolean {
  if (doc.type === 'archive') return true;
  if (doc.path) {
    const filename = doc.path.split('/').pop() || '';
    return /^index\.mdx?$/i.test(filename);
  }
  return false;
}

export function extractSlugFromPath(path: string, isIndex: boolean): string {
  let slug = path.replace(/\.mdx?$/, '');
  slug = slug.replace(/^src\/content\//, '');
  slug = slug.replace(/^content\//, '');
  slug = slug.replace(/^[a-z]{2}\//, '');
  slug = slug.replace(/^docs\//, '');
  slug = slug.replace(/^\/+/, '');
  if (isIndex) {
    slug = slug.replace(/\/index$/i, '');
  }
  slug = slug.toLowerCase();
  return slug;
}

export function extractLocaleFromPath(path: string): Locale | null {
  const match = path.match(/^(?:src\/content\/|content\/)?([a-z]{2})\//);
  if (match && locales.includes(match[1] as Locale)) {
    return match[1] as Locale;
  }
  return null;
}

export function getPathPattern(doc: { path?: string }): string | null {
  if (doc.path) {
    return doc.path
      .replace(/^src\/content\//, '')
      .replace(/^content\//, '')
      .replace(/^[a-z]{2}\//, '');
  }
  return null;
}

export function getDocSlug(doc: { path?: string; slug?: string; id: string }): string {
  if (doc.path) {
    return doc.path
      .replace(/\.mdx?$/, '')
      .replace(/^src\/content\//, '')
      .replace(/^content\//, '')
      .replace(/^[a-z]{2}\//, '')
      .replace(/^docs\//, '')
      .toLowerCase();
  }
  if (doc.slug) {
    return doc.slug.replace(/^docs\//, '').toLowerCase();
  }
  return doc.id;
}

export function getDocUrl(doc: { path?: string; slug?: string; id: string }, docLocale: string): string {
  if (doc.path) {
    let url = doc.path
      .replace(/\.mdx?$/, '')
      .replace(/^src\/content\//, '')
      .replace(/^content\//, '')
      .replace(/^[a-z]{2}\//, '')
      .replace(/^docs\//, '')
      .replace(/\/index$/i, '')
      .toLowerCase();
    if (!url.startsWith('/')) url = '/' + url;
    return `/${docLocale}${url}`;
  }
  if (doc.slug) {
    return `/${docLocale}/${doc.slug.toLowerCase()}`;
  }
  return `/${docLocale}/${doc.id}`;
}

export function extractHeadings(content: string) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Array<{ depth: number; slug: string; text: string }> = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    headings.push({ depth, slug, text });
  }
  return headings;
}

export const isValidSlug = (val: any): val is string =>
  typeof val === 'string' && val.trim() !== '' && val !== 'null';
