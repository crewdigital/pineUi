import { describe, it, expect } from 'vitest';
import { getThemeDataAttributes, applyTheme, darkTheme, highContrastTheme } from './index.js';


describe('@pine-ui/themes', () => {
  it('generates default data attributes', () => {
    const attrs = getThemeDataAttributes();
    expect(attrs).toEqual({
      'data-brand': 'default',
      'data-scheme': 'light',
      'data-density': 'default',
      'data-motion': 'normal',
    });
  });

  it('supports custom theme compositions including dir', () => {
    const attrs = getThemeDataAttributes({
      brand: 'brandA',
      scheme: 'dark',
      density: 'compact',
      motion: 'reduced',
      dir: 'rtl',
    });
    expect(attrs).toEqual({
      'data-brand': 'brandA',
      'data-scheme': 'dark',
      'data-density': 'compact',
      'data-motion': 'reduced',
      dir: 'rtl',
    });
  });

  it('applies and cleans up theme attributes on DOM element', () => {
    const el = document.createElement('div');
    el.setAttribute('data-brand', 'old-brand');

    const cleanup = applyTheme(el, {
      brand: 'new-brand',
      scheme: 'dark',
      density: 'comfortable',
      dir: 'ltr',
    });

    expect(el.getAttribute('data-brand')).toBe('new-brand');
    expect(el.getAttribute('data-scheme')).toBe('dark');
    expect(el.getAttribute('data-density')).toBe('comfortable');
    expect(el.getAttribute('dir')).toBe('ltr');

    cleanup();

    expect(el.getAttribute('data-brand')).toBe('old-brand');
    expect(el.getAttribute('data-scheme')).toBeNull();
    expect(el.getAttribute('data-density')).toBeNull();
    expect(el.getAttribute('dir')).toBeNull();
  });

  it('exports static StyleX theme objects', () => {
    expect(darkTheme).toBeDefined();
    expect(highContrastTheme).toBeDefined();
  });
});


