/**
 * @pine-ui/themes
 * Orthogonal multi-dimensional theme definitions and runtime utilities for Pine UI.
 */
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';


export type ThemeScheme = 'light' | 'dark' | 'high-contrast';
export type ThemeDensity = 'compact' | 'default' | 'comfortable';
export type ThemeMotion = 'normal' | 'reduced';
export type ThemeDirection = 'ltr' | 'rtl' | 'auto';

export interface ThemeConfig {
  brand?: string | undefined;
  scheme?: ThemeScheme | undefined;
  density?: ThemeDensity | undefined;
  motion?: ThemeMotion | undefined;
  dir?: ThemeDirection | undefined;
}

/**
 * Returns HTML data attributes corresponding to a ThemeConfig.
 * These attributes control CSS variable cascade without React Context re-renders.
 */
export function getThemeDataAttributes(config: ThemeConfig = {}): Record<string, string> {
  const attrs: Record<string, string> = {
    'data-brand': config.brand ?? 'default',
    'data-scheme': config.scheme ?? 'light',
    'data-density': config.density ?? 'default',
    'data-motion': config.motion ?? 'normal',
  };

  if (config.dir) {
    attrs['dir'] = config.dir;
  }

  return attrs;
}

/**
 * Applies theme data attributes directly to a target DOM element.
 * Returns a cleanup function that restores the original attributes.
 */
export function applyTheme(element: HTMLElement, config: ThemeConfig): () => void {
  const attrs = getThemeDataAttributes(config);
  const previousAttrs: Record<string, string | null> = {};

  for (const [key, value] of Object.entries(attrs)) {
    previousAttrs[key] = element.getAttribute(key);
    element.setAttribute(key, value);
  }

  return () => {
    for (const [key, prevValue] of Object.entries(previousAttrs)) {
      if (prevValue === null) {
        element.removeAttribute(key);
      } else {
        element.setAttribute(key, prevValue);
      }
    }
  };
}

/**
 * Static StyleX theme for Dark mode.
 */
export const darkTheme = stylex.createTheme(vars, {
  backgroundCanvas: '#030712',
  backgroundSurface: '#111827',
  backgroundSurfaceRaised: '#1f2937',
  foregroundPrimary: '#f9fafb',
  foregroundSecondary: '#9ca3af',
  borderDefault: '#374151',
});

/**
 * Static StyleX theme for High Contrast mode.
 */
export const highContrastTheme = stylex.createTheme(vars, {
  backgroundCanvas: '#000000',
  backgroundSurface: '#000000',
  backgroundSurfaceRaised: '#000000',
  foregroundPrimary: '#ffffff',
  borderDefault: '#ffffff',
});



