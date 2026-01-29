/**
 * Astro Middleware for Language Detection and Redirection
 *
 * Handles:
 * - Redirecting paths without locale to default locale (/en/)
 * - Optionally detecting browser language preference
 * - Skipping static assets and API routes
 */

import { defineMiddleware } from 'astro:middleware';
import {
  locales,
  defaultLocale,
  isValidLocale,
  getPreferredLocale,
  type Locale
} from './lib/i18n';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Skip middleware for:
  // - Static assets (files with extensions)
  // - API routes
  // - Internal Astro routes
  // - Already valid locale paths
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_') ||
    pathname.startsWith('/_astro/') ||
    pathname.includes('.') // Has file extension (css, js, images, etc.)
  ) {
    return next();
  }

  // Parse path segments
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

  // Check if path already has a valid locale
  if (isValidLocale(firstSegment)) {
    // Path has locale, continue normally
    return next();
  }

  // No locale in path - determine which locale to redirect to

  // Option 1: Use Accept-Language header to detect browser preference
  // Uncomment the following lines to enable browser language detection:
  // const acceptLanguage = context.request.headers.get('accept-language');
  // const preferredLocale = getPreferredLocale(acceptLanguage);

  // Option 2: Always redirect to default locale (simpler, more predictable)
  const targetLocale: Locale = defaultLocale;

  // Build redirect URL
  const redirectPath = pathname === '/' ? `/${targetLocale}/` : `/${targetLocale}${pathname}`;

  // Preserve query string if present
  const queryString = context.url.search;
  const redirectUrl = `${redirectPath}${queryString}`;

  // 301 Permanent redirect for SEO
  return context.redirect(redirectUrl, 301);
});
