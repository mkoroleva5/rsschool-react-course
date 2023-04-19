/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
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
      exclude: [
        'src/main.tsx',
        'vite.config.ts',
        'dist',
        'src/vite-env.d.ts',
        'src/types',
        'src/**/*.test.tsx',
        'server.ts',
        'cypress.config.ts',
        'cypress',
        'src/entry-client.tsx',
        'src/entry-server.tsx',
      ],
      reporter: ['text', 'json', 'html'],
    },
  },
  build: {
    rollupOptions: {
      output: {
        interop: 'compat',
      },
    },
    sourcemap: true,
  },
});
