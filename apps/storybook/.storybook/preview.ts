import type { Preview } from '@storybook/react';

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
        items: ['light', 'dark', 'high-contrast'],
        dynamicTitle: true,
      },
    },
    density: {
      description: 'Interface density mode',
      defaultValue: 'default',
      toolbar: {
        title: 'Density',
        icon: 'component',
        items: ['compact', 'default', 'comfortable'],
        dynamicTitle: true,
      },
    },
    direction: {
      description: 'Text direction',
      defaultValue: 'ltr',
      toolbar: {
        title: 'Direction',
        icon: 'globe',
        items: ['ltr', 'rtl'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
