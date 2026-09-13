import { describe, it, expect } from 'vitest';
import { getThemeDataAttributes } from './index.js';

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

  it('supports custom theme compositions', () => {
    const attrs = getThemeDataAttributes({
      brand: 'brandA',
      scheme: 'dark',
      density: 'compact',
      motion: 'reduced',
    });
    expect(attrs).toEqual({
      'data-brand': 'brandA',
      'data-scheme': 'dark',
      'data-density': 'compact',
      'data-motion': 'reduced',
    });
  });
});
