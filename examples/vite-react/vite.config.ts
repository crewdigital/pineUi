import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createStyleXPlugin } from '@pine-ui/build-config';

export default defineConfig({
  plugins: [
    react(),
    createStyleXPlugin({
      fileName: 'stylex.css',
      dev: true,
    }),
  ],
});
