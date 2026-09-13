/**
 * @pine-ui/themes
 * Orthogonal multi-dimensional theme definitions for Pine UI.
 */

export type ThemeScheme = 'light' | 'dark' | 'high-contrast';
export type ThemeDensity = 'compact' | 'default' | 'comfortable';
export type ThemeMotion = 'normal' | 'reduced';

export interface ThemeConfig {
  brand?: string;
  scheme?: ThemeScheme;
  density?: ThemeDensity;
  motion?: ThemeMotion;
}

export function getThemeDataAttributes(config: ThemeConfig = {}): Record<string, string> {
  return {
    'data-brand': config.brand ?? 'default',
    'data-scheme': config.scheme ?? 'light',
    'data-density': config.density ?? 'default',
    'data-motion': config.motion ?? 'normal',
  };
}
