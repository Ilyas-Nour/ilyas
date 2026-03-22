import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://ilyasnour.com',
      dynamicRoutes: ['/en', '/fr', '/es'],
    }),
  ],
  define: {
    'process.env': {}
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'three-vendor';
            if (id.includes('framer-motion') || id.includes('gsap')) return 'animation-vendor';
            return 'vendor';
          }
        },
      },
    },
    minify: 'esbuild',
    cssMinify: true,
  },
})
