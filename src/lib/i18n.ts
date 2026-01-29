/**
 * Internationalization (i18n) utilities for multilingual documentation
 *
 * URL Structure: docs.applivery.com/{locale}/{product}/{path}
 * Example: docs.applivery.com/en/mdm/getting-started
 */

// Supported locales
export const locales = ['en', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'zh', 'ko'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

// Locale display names (in their native language)
export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  it: 'Italiano',
  ja: '日本語',
  zh: '中文',
  ko: '한국어',
};

// Locale codes for HTML lang attribute and hreflang
export const localeHrefLang: Record<Locale, string> = {
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  pt: 'pt-BR',
  it: 'it-IT',
  ja: 'ja-JP',
  zh: 'zh-CN',
  ko: 'ko-KR',
};

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/**
 * Extract locale from URL path
 * @param path - URL pathname (e.g., "/en/mdm/getting-started")
 * @returns The locale if found, otherwise the default locale
 */
export function getLocaleFromPath(path: string): Locale {
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

  if (isValidLocale(firstSegment)) {
    return firstSegment;
  }

  return defaultLocale;
}

/**
 * Remove locale prefix from path
 * @param path - URL pathname with locale (e.g., "/en/mdm/getting-started")
 * @returns Path without locale prefix (e.g., "/mdm/getting-started")
 */
export function removeLocaleFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

  if (isValidLocale(firstSegment)) {
    segments.shift();
  }

  const result = '/' + segments.join('/');
  return result === '/' ? '/' : result;
}

/**
 * Add locale prefix to path
 * @param path - URL pathname without locale (e.g., "/mdm/getting-started")
 * @param locale - Target locale
 * @returns Path with locale prefix (e.g., "/en/mdm/getting-started")
 */
export function localizedPath(path: string, locale: Locale): string {
  const cleanPath = removeLocaleFromPath(path);

  if (cleanPath === '/') {
    return `/${locale}/`;
  }

  return `/${locale}${cleanPath}`;
}

/**
 * Get the path for switching to a different locale
 * Handles translation slug mapping if provided
 * @param currentPath - Current URL path
 * @param targetLocale - Locale to switch to
 * @param translationSlug - Optional translated slug for the target locale
 */
export function getLocaleSwitch(
  currentPath: string,
  targetLocale: Locale,
  translationSlug?: string
): string {
  if (translationSlug) {
    return `/${targetLocale}/${translationSlug}`;
  }

  return localizedPath(currentPath, targetLocale);
}

/**
 * Parse a document path to extract locale and slug
 * @param path - Document path (e.g., "content/en/mdm/getting-started.mdx")
 * @returns Object with locale and slug
 */
export function parseDocumentPath(path: string): { locale: Locale; slug: string } {
  // Remove file extension
  let cleanPath = path.replace(/\.mdx?$/, '');

  // Remove content/ prefix if present
  cleanPath = cleanPath.replace(/^content\//, '');

  // Extract locale from first segment
  const segments = cleanPath.split('/').filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

  let locale: Locale = defaultLocale;
  if (isValidLocale(firstSegment)) {
    locale = firstSegment;
    segments.shift();
  }

  // Remove trailing /index for archive pages
  let slug = segments.join('/');
  slug = slug.replace(/\/index$/, '');

  return { locale, slug };
}

/**
 * Build a content path from locale and slug
 * @param locale - Document locale
 * @param slug - Document slug
 * @param collection - Collection name (default: 'docs')
 */
export function buildContentPath(
  locale: Locale,
  slug: string,
  collection: string = 'docs'
): string {
  return `content/${collection}/${locale}/${slug}`;
}

/**
 * Get browser's preferred locale from Accept-Language header
 * @param acceptLanguage - Accept-Language header value
 * @returns Best matching locale or default
 */
export function getPreferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, qValue] = lang.trim().split(';q=');
      return {
        code: code.toLowerCase().split('-')[0], // Get primary language tag
        q: qValue ? parseFloat(qValue) : 1.0,
      };
    })
    .sort((a, b) => b.q - a.q);

  // Find first matching locale
  for (const lang of languages) {
    if (isValidLocale(lang.code)) {
      return lang.code;
    }
  }

  return defaultLocale;
}
