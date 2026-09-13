import type { StorybookConfig } from '@storybook/react-vite';
import { createStyleXPlugin } from '@pine-ui/build-config';
import type { PluginOption } from 'vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (viteConfig) => {
    viteConfig.plugins = viteConfig.plugins || [];
    const stylexPlugin = createStyleXPlugin({ dev: true }) as unknown as PluginOption;
    viteConfig.plugins.push(stylexPlugin);
    return viteConfig;
  },
};

export default config;
