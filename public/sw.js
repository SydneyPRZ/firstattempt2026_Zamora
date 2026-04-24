/**
 * AlumniGive Service Worker
 * Strategy: Cache-first for static assets, Network-first for data/pages
 * Version controlled for clean cache invalidation
 */

const APP_VERSION = '1.0.0';
const CACHE_NAMES = {
  static:  `alumgive-static-v${APP_VERSION}`,
  dynamic: `alumgive-dynamic-v${APP_VERSION}`,
  images:  `alumgive-images-v${APP_VERSION}`,
  fonts:   `alumgive-fonts-v${APP_VERSION}`,
};

// ─── Assets to pre-cache on install ─────────────────────────────────────────
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// ─── Routes that always get a cached fallback ────────────────────────────────
const CACHE_FIRST_PATTERNS = [
  /\.(?:js|css|woff2?|ttf|otf|eot)$/,
  /icons\//,
  /pwa-/,
];

const IMAGE_PATTERNS = [
  /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
  /images\.unsplash\.com/,
  /ui-avatars\.com/,
];

const FONT_PATTERNS = [
  /fonts\.googleapis\.com/,
  /fonts\.gstatic\.com/,
];

// ─── INSTALL ─────────────────────────────────────────────────────────────────
self.addEventListener('install', event => {
  console.log('[SW] Installing AlumniGive v' + APP_VERSION);
  event.waitUntil(
    caches.open(CACHE_NAMES.static)
      .then(cache => {
        console.log('[SW] Pre-caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting()) // Activate immediately
  );
});

// ─── ACTIVATE ────────────────────────────────────────────────────────────────
self.addEventListener('activate', event => {
  console.log('[SW] Activating v' + APP_VERSION);
  event.waitUntil(
    Promise.all([
      // Delete old caches from previous versions
      caches.keys().then(keys =>
        Promise.all(
          keys
            .filter(key => !Object.values(CACHE_NAMES).includes(key))
            .map(key => {
              console.log('[SW] Deleting old cache:', key);
              return caches.delete(key);
            })
        )
      ),
      // Take control of all open clients immediately
      self.clients.claim(),
    ])
  );
});

// ─── FETCH ───────────────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET, chrome-extension, and devtools requests
  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  // ── Fonts: Cache-first with long TTL ──────────────────────────────────────
  if (FONT_PATTERNS.some(p => p.test(request.url))) {
    event.respondWith(cacheFirst(request, CACHE_NAMES.fonts));
    return;
  }

  // ── Images: Cache-first, fallback to network ──────────────────────────────
  if (IMAGE_PATTERNS.some(p => p.test(request.url))) {
    event.respondWith(cacheFirstWithFallback(request, CACHE_NAMES.images));
    return;
  }

  // ── Static JS/CSS/icons: Cache-first ──────────────────────────────────────
  if (CACHE_FIRST_PATTERNS.some(p => p.test(request.url))) {
    event.respondWith(cacheFirst(request, CACHE_NAMES.static));
    return;
  }

  // ── HTML navigation: Network-first, fallback to cache → offline page ──────
  if (request.headers.get('accept')?.includes('text/html') || url.pathname === '/') {
    event.respondWith(networkFirstWithOfflineFallback(request));
    return;
  }

  // ── Everything else: Stale-while-revalidate ────────────────────────────────
  event.respondWith(staleWhileRevalidate(request, CACHE_NAMES.dynamic));
});

// ─── CACHE STRATEGIES ────────────────────────────────────────────────────────

/**
 * Cache-first: Serve from cache, fetch from network only if missing.
 * Best for: static assets (JS, CSS, fonts, icons)
 */
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return caches.match('/offline.html');
  }
}

/**
 * Cache-first with network fallback (no offline page for images)
 */
async function cacheFirstWithFallback(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request, { mode: 'cors' });
    if (response.ok || response.type === 'opaque') {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Return transparent 1x1 PNG for failed images
    return new Response(
      atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='),
      { headers: { 'Content-Type': 'image/png' } }
    );
  }
}

/**
 * Network-first: Try network, fallback to cache, then offline page.
 * Best for: HTML pages, API data
 */
async function networkFirstWithOfflineFallback(request) {
  const cache = await caches.open(CACHE_NAMES.dynamic);

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;

    // Final fallback: offline page
    const offlinePage = await caches.match('/offline.html');
    return offlinePage || new Response('<h1>Offline</h1>', {
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

/**
 * Stale-while-revalidate: Serve cached immediately, update in background.
 * Best for: dynamic content, API responses
 */
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then(response => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  return cached || await fetchPromise || caches.match('/offline.html');
}

// ─── BACKGROUND SYNC ─────────────────────────────────────────────────────────
self.addEventListener('sync', event => {
  if (event.tag === 'sync-donations') {
    event.waitUntil(syncPendingDonations());
  }
});

async function syncPendingDonations() {
  // In a real app, pull pending donations from IndexedDB and submit to API
  console.log('[SW] Background sync: checking pending donations...');
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({ type: 'SYNC_COMPLETE', payload: { synced: 0 } });
  });
}

// ─── PUSH NOTIFICATIONS ──────────────────────────────────────────────────────
self.addEventListener('push', event => {
  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch {
    data = { title: 'AlumniGive', body: event.data.text() };
  }

  const options = {
    body: data.body || 'You have a new notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    image: data.image,
    vibrate: [100, 50, 100],
    data: { url: data.url || '/', dateOfArrival: Date.now() },
    actions: [
      { action: 'view', title: '👁 View', icon: '/icons/icon-72x72.png' },
      { action: 'dismiss', title: '✕ Dismiss' }
    ],
    tag: data.tag || 'alumgive-notification',
    renotify: true,
    requireInteraction: data.urgent || false,
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'AlumniGive', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const url = event.notification.data?.url || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        // Focus existing window if open
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) return client.focus();
        }
        // Otherwise open a new window
        if (self.clients.openWindow) return self.clients.openWindow(url);
      })
  );
});

// ─── MESSAGE HANDLING ─────────────────────────────────────────────────────────
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data?.type === 'GET_VERSION') {
    event.ports[0]?.postMessage({ version: APP_VERSION });
  }

  if (event.data?.type === 'CLEAR_CACHE') {
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => event.ports[0]?.postMessage({ cleared: true }));
  }
});

console.log('[SW] AlumniGive Service Worker loaded — v' + APP_VERSION);
