/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'c8',
      all: true,
      exclude: ['src/main.tsx', 'vite.config.ts', 'dist', 'src/vite-env.d.ts', 'src/**/*.test.tsx'],
      reporter: ['text', 'json', 'html'],
    },
  },
  build: {
    rollupOptions: {
      output: {
        interop: 'compat',
      },
    },
  },
});
