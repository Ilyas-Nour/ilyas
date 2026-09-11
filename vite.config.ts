import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://ilyasnour.com',
      dynamicRoutes: ['/']
    }),
    // Brotli compression (best ratio, ~20-30% smaller than gzip)
    compression({ algorithm: 'brotliCompress', exclude: [/\.(png|jpg|jpeg|webp|gif|ico|svg)$/] }),
    // Gzip fallback for older clients
    compression({ algorithm: 'gzip', exclude: [/\.(png|jpg|jpeg|webp|gif|ico|svg)$/] }),
  ],
  build: {
    assetsDir: 'assets',
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console.log from prod build
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
    cssMinify: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // Fine-grained code splitting: separate heavy libraries into their own chunks
        // This means the user only downloads what they need, and browser can cache chunks separately
        manualChunks: {
          // React core — tiny, loads immediately
          'vendor-react': ['react', 'react-dom'],
          // React Router — only needed for routing
          'vendor-router': ['react-router-dom'],
          // Framer Motion — large animation library, loaded separately
          'vendor-framer': ['framer-motion'],
          // Three.js ecosystem — very large 3D library, deferred
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          // GSAP — animation toolkit, separate chunk
          'vendor-gsap': ['gsap'],
          // Lenis smooth scroll
          'vendor-lenis': ['lenis'],
          // React Helmet for SEO meta tags
          'vendor-helmet': ['react-helmet-async'],
        },
        // Consistent hash-based filenames for long-term caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Organize assets by type for better cache management
          const name = assetInfo.names?.[0] || '';
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(name)) {
            return 'assets/img/[name]-[hash][extname]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
})
