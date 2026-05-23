import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this base path for GitHub Pages deployment
  base: '/santex-Smart-Interoperable-Healthcare-Record-Management-System/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
