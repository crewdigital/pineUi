import * as React from 'react';
import type { Preview, StoryContext, StoryFn } from '@storybook/react';
import '@pine-ui/themes/css';
import { STANDARD_PALETTES } from '../src/palettes.js';
import { DirectionProvider, type Direction } from '@pine-ui/react';

const withThemeDecorator = (Story: StoryFn, context: StoryContext) => {
  const scheme = context.globals.theme || 'light';
  const density = context.globals.density || 'default';
  const direction = (context.globals.direction || 'ltr') as Direction;
  const paletteKey = context.globals.palette || 'emerald';

  const palette = STANDARD_PALETTES[paletteKey] ?? STANDARD_PALETTES['emerald']!;
  const isDark = scheme === 'dark';
  const isHighContrast = scheme === 'high-contrast';

  // Apply root document attributes so modals and portals inherit theme
  React.useEffect(() => {
    document.documentElement.setAttribute('data-scheme', scheme);
    document.documentElement.setAttribute('data-density', density);
    document.documentElement.setAttribute('dir', direction);
  }, [scheme, density, direction]);

  const primaryColor = isDark && paletteKey === 'slate' ? '#94a3b8' : palette.primary;

  const styleOverrides = {
    '--pine-action-primary-background': primaryColor,
    '--pine-action-primary-background-hover': palette.hover,
    '--pine-action-primary-background-active': palette.active,
    '--pine-background-brand': primaryColor,
    '--pine-background-brand-hover': palette.hover,
    '--pine-background-brand-active': palette.active,
    '--pine-border-focus': palette.focus,
    '--pine-focus-ring': palette.focus,
    '--pine-foreground-brand': primaryColor,
    minHeight: '100vh',
    padding: '24px',
    boxSizing: 'border-box' as const,
    backgroundColor: isHighContrast ? '#000000' : isDark ? '#030712' : '#ffffff',
    color: isHighContrast ? '#ffffff' : isDark ? '#f9fafb' : '#111827',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  };

  return (
    <DirectionProvider dir={direction}>
      <div
        data-scheme={scheme}
        data-density={density}
        dir={direction}
        style={styleOverrides as React.CSSProperties}
      >
        <Story />
      </div>
    </DirectionProvider>
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global color scheme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme Scheme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light Mode', icon: 'sun' },
          { value: 'dark', title: 'Dark Mode', icon: 'moon' },
          { value: 'high-contrast', title: 'High Contrast', icon: 'contrast' },
        ],
        dynamicTitle: true,
      },
    },
    palette: {
      description: 'Standard brand accent color palette',
      defaultValue: 'emerald',
      toolbar: {
        title: 'Color Palette',
        icon: 'paintbrush',
        items: [
          { value: 'emerald', title: 'Pine Emerald (#059669)' },
          { value: 'blue', title: 'Sapphire Blue (#2563eb)' },
          { value: 'indigo', title: 'Deep Indigo (#4f46e5)' },
          { value: 'purple', title: 'Amethyst Purple (#7c3aed)' },
          { value: 'rose', title: 'Ruby Rose (#e11d48)' },
          { value: 'amber', title: 'Amber Sun (#d97706)' },
          { value: 'slate', title: 'Minimal Slate (#0f172a)' },
        ],
        dynamicTitle: true,
      },
    },
    density: {
      description: 'Interface density mode',
      defaultValue: 'default',
      toolbar: {
        title: 'Density',
        icon: 'component',
        items: [
          { value: 'compact', title: 'Compact (32px)' },
          { value: 'default', title: 'Default (40px)' },
          { value: 'comfortable', title: 'Comfortable (48px)' },
        ],
        dynamicTitle: true,
      },
    },
    direction: {
      description: 'Text direction',
      defaultValue: 'ltr',
      toolbar: {
        title: 'Direction',
        icon: 'globe',
        items: [
          { value: 'ltr', title: 'LTR (Left to Right)' },
          { value: 'rtl', title: 'RTL (Right to Left)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withThemeDecorator],
};

export default preview;
