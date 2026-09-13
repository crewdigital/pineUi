import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/*.d.ts', '**/*.stories.tsx'],
    },
    include: ['packages/**/*.test.{ts,tsx}', 'tooling/**/*.test.ts'],
  },
});
