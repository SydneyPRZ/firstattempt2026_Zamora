// ── AlumniGive PWA Entry Point ──────────────────────────────────────────────
import './components/app-root.js';

// Signal the HTML shell to remove the skeleton once we're painted
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', signalReady);
} else {
  signalReady();
}

function signalReady() {
  // Wait for first LitElement paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('app-ready'));
    });
  });
}

// ── PWA Service Worker Registration ─────────────────────────────────────────
// vite-plugin-pwa injects `virtual:pwa-register` at build time.
// In dev, we import it conditionally so hot-reload still works.
if ('serviceWorker' in navigator) {
  // During production build, vite-plugin-pwa handles this via its generated sw.js.
  // This manual registration is for dev-mode visibility / custom update logic.
  window.addEventListener('load', async () => {
    try {
      // Import the Workbox-powered registration helper (injected by plugin)
      const { registerSW } = await import('virtual:pwa-register');

      const updateSW = registerSW({
        // Called when a new SW is waiting — trigger our UI prompt
        onNeedRefresh() {
          window.dispatchEvent(new CustomEvent('pwa-update-available', {
            detail: { updateSW }
          }));
        },
        onOfflineReady() {
          console.info('[PWA] App is ready to work offline ✓');
          window.dispatchEvent(new CustomEvent('pwa-offline-ready'));
        },
        onRegistered(r) {
          console.info('[PWA] Service Worker registered:', r?.scope);
          // Check for updates every 60 minutes
          if (r) setInterval(() => r.update(), 60 * 60 * 1000);
        },
        onRegisterError(err) {
          console.error('[PWA] Service Worker registration failed:', err);
        }
      });
    } catch {
      // virtual:pwa-register not available (plain dev mode without SW)
      console.info('[PWA] SW module not available in this mode');
    }
  });
}

// ── Deep-link handler: ?page=donations etc. from manifest shortcuts ──────────
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');
  if (page) {
    // Import store lazily and navigate
    import('./data/store.js').then(({ store }) => {
      // Only navigate if user is already logged in
      if (store.currentUser) store.navigate(page);
    });
  }
});
