import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const CACHE_VERSION = 'v1.2.0';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    headers: {
      // Simulate HTTPS security headers in dev
      'Service-Worker-Allowed': '/'
    }
  },

  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks(id) {
          if (id.includes('node_modules/lit')) return 'lit-core';
          if (id.includes('node_modules/@lit')) return 'lit-core';
          if (id.includes('mock-data') || id.includes('store')) return 'app-data';
          if (id.includes('components/auth')) return 'auth';
          if (id.includes('components/admin')) return 'admin';
          if (id.includes('components/donations')) return 'donations';
          if (id.includes('components/events')) return 'events';
          if (id.includes('components/profile')) return 'profile';
          if (id.includes('components/notifications')) return 'notifications';
          if (id.includes('components/home')) return 'home';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Report size warnings at 200kb
    chunkSizeWarningLimit: 200
  },

  plugins: [
    VitePWA({
      registerType: 'prompt',         // Manual update prompts (not auto-reload)
      injectRegister: 'script-defer', // Non-blocking SW registration
      includeAssets: [
        'favicon.svg',
        'apple-touch-icon.png',
        'offline.html',
        'icons/*.png',
        'pwa-192x192.png',
        'pwa-512x512.png'
      ],

      manifest: {
        name: 'AlumniGive — Connect. Give. Impact.',
        short_name: 'AlumniGive',
        description: 'The official alumni donation and engagement platform. Give back, stay connected, make an impact.',
        start_url: '/?utm_source=pwa',
        id: '/alumni-give-pwa',
        scope: '/',
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
        orientation: 'portrait-primary',
        background_color: '#1e3a8a',
        theme_color: '#2563eb',
        lang: 'en-PH',
        dir: 'ltr',
        categories: ['education', 'finance', 'social'],
        icons: [
          { src: '/icons/icon-72x72.png',   sizes: '72x72',   type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-96x96.png',   sizes: '96x96',   type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-128x128.png', sizes: '128x128', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-144x144.png', sizes: '144x144', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-384x384.png', sizes: '384x384', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ],
        shortcuts: [
          {
            name: 'Donate Now',
            short_name: 'Donate',
            description: 'Browse active donation campaigns',
            url: '/?page=donations&utm_source=shortcut',
            icons: [{ src: '/icons/icon-96x96.png', sizes: '96x96' }]
          },
          {
            name: 'Upcoming Events',
            short_name: 'Events',
            description: 'View upcoming alumni events',
            url: '/?page=events&utm_source=shortcut',
            icons: [{ src: '/icons/icon-96x96.png', sizes: '96x96' }]
          }
        ],
        screenshots: [
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'AlumniGive Home Dashboard'
          }
        ]
      },

      // ── Workbox service worker strategy ──────────────────────────────────
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
        globIgnores: ['**/node_modules/**', '**/sw.js'],

        // App shell: Cache-First for static assets
        runtimeCaching: [
          // Google Fonts stylesheets — Stale-While-Revalidate
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: `${CACHE_VERSION}-google-fonts-stylesheets`,
              expiration: { maxEntries: 4, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          },
          // Google Fonts files — Cache-First (immutable)
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: `${CACHE_VERSION}-google-fonts-webfonts`,
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          },
          // Unsplash / remote images — StaleWhileRevalidate
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: `${CACHE_VERSION}-campaign-images`,
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          // UI Avatars — Cache-First
          {
            urlPattern: /^https:\/\/ui-avatars\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: `${CACHE_VERSION}-avatars`,
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          // Local JS/CSS assets — Cache-First (hashed filenames)
          {
            urlPattern: /\/assets\/.+\.(js|css)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: `${CACHE_VERSION}-static-assets`,
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          },
          // App shell / navigation — NetworkFirst with offline fallback
          {
            urlPattern: /^https?:\/\/[^/]+\/?(\?.*)?$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: `${CACHE_VERSION}-app-shell`,
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 5, maxAgeSeconds: 60 * 60 * 24 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ],

        // Offline fallback: serve /offline.html for navigation requests
        navigateFallback: '/offline.html',
        navigateFallbackDenylist: [/^\/api\//, /\.[a-zA-Z]{2,4}$/],

        // Clean up old caches on SW activation
        cleanupOutdatedCaches: true,
        skipWaiting: false,      // Don't skip — let user decide when to update
        clientsClaim: true,

        // SW source file (we write it manually for full control)
        sourcemap: false
      },

      devOptions: {
        enabled: true,           // Enable SW in dev mode for testing
        type: 'module',
        navigateFallback: '/offline.html'
      }
    })
  ]
});
