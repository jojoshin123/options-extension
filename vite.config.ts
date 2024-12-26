import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// This is the updated config
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        background: 'public/background.js',
        content: 'public/content.js',
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
});
