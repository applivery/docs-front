// Type extensions for Astro web app
// Add missing properties to BrandingSettings, ColorSettings, SEOSettings for compatibility

import type { BrandingSettings as OrigBrandingSettings, ColorSettings as OrigColorSettings, SEOSettings as OrigSEOSettings } from '../lib/cms';

export interface BrandingSettings extends OrigBrandingSettings {
  favicon?: string;
}

export interface ColorSettings extends OrigColorSettings {
  buttonBg?: string;
  buttonBgHover?: string;
  buttonText?: string;
  menuItemActiveBg?: string;
  menuItemActiveText?: string;
  backgroundSecondary?: string;
  backgroundTertiary?: string;
  border?: string;
  surface?: string;
  textSecondary?: string;
  textMuted?: string;
  darkButtonBg?: string;
  darkButtonBgHover?: string;
  darkButtonText?: string;
  darkMenuItemActiveBg?: string;
  darkMenuItemActiveText?: string;
  darkBackgroundSecondary?: string;
  darkBackgroundTertiary?: string;
  darkBorder?: string;
  darkSurface?: string;
  darkTextSecondary?: string;
  darkTextMuted?: string;
}

export interface SEOSettings extends OrigSEOSettings {
  description?: string;
}
