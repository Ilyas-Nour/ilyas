import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) return 'three-vendor';
            if (id.includes('framer-motion')) return 'motion-vendor';
            if (id.includes('react')) return 'react-vendor';
            if (id.includes('lucide')) return 'icons-vendor';
            return 'vendor'; // all other package dependencies
          }
        },
      },
    },
    minify: 'esbuild',
    cssMinify: true,
  },
})
