import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Improve minification target for better tree-shaking
    target: 'es2020',
    // Inline assets smaller than 4kb to reduce HTTP requests
    assetsInlineLimit: 4096,
    // Split CSS per chunk to avoid one large render-blocking stylesheet
    cssCodeSplit: true,
    // Minify CSS
    cssMinify: true,
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      output: {
        // Granular manual chunks to reduce initial bundle size
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'icons': ['lucide-react'],
        },
      },
    },
    // Skip module preload polyfill injection (saves ~3KB)
    modulePreload: {
      polyfill: false,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

