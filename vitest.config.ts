import { defineConfig } from 'vitest/config';
import { createStyleXPlugin } from '@pine-ui/build-config';
import type { PluginOption } from 'vite';

export default defineConfig({
  plugins: [createStyleXPlugin({ dev: true }) as unknown as PluginOption],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/*.d.ts', '**/*.stories.tsx'],
    },
    include: ['src/**/*.test.{ts,tsx}', 'packages/**/*.test.{ts,tsx}', 'tooling/**/*.test.ts'],
  },
});

