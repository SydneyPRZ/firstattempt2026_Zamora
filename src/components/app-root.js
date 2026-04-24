import { html, css } from 'lit';
import { BaseComponent } from '../utils/base-component.js';

// ── Critical/above-fold components: eager loaded ──────────────────────────
import './auth/login-page.js';
import './auth/forgot-password-page.js';
import './layout/bottom-nav.js';
import './layout/top-bar.js';
import './home/home-page.js';
import './pwa/pwa-manager.js';

// ── Lazy-loaded page map ────────────────────────────────────────────────────
// Each entry: [ importFn, customElementName ]
const LAZY_PAGES = {
  events:          () => import('./events/events-page.js'),
  donations:       () => import('./donations/donations-page.js'),
  'campaign-detail': () => import('./donations/campaign-detail-page.js'),
  'donate-modal':  () => import('./donations/donate-modal.js'),
  notifications:   () => import('./notifications/notifications-page.js'),
  profile:         () => import('./profile/profile-page.js'),
  'admin-dashboard': () => import('./admin/admin-dashboard.js'),
};

// Registry of which pages have been loaded
const _loaded = new Set();

async function ensurePage(page) {
  if (_loaded.has(page) || !LAZY_PAGES[page]) return;
  try {
    await LAZY_PAGES[page]();
    _loaded.add(page);
  } catch (e) {
    console.warn('[LazyLoad] Failed to load page:', page, e);
  }
}

// ── Prefetch strategy: preload adjacent pages after 2s idle ────────────────
function prefetchAdjacentPages(currentPage) {
  const adjacency = {
    home:              ['donations', 'events'],
    donations:         ['campaign-detail', 'donate-modal'],
    events:            ['notifications'],
    profile:           ['notifications'],
    'campaign-detail': ['donate-modal', 'donations'],
  };
  const toLoad = adjacency[currentPage] || [];
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => toLoad.forEach(ensurePage), { timeout: 3000 });
  } else {
    setTimeout(() => toLoad.forEach(ensurePage), 2000);
  }
}

export class AppRoot extends BaseComponent {
  static properties = {
    _pageReady: { state: true }
  };

  constructor() {
    super();
    this._pageReady = false;
    this._lastPage = null;
  }

  static styles = css`
    :host { display: block; height: 100vh; height: 100dvh; overflow: hidden; }
    .app-shell { display: flex; flex-direction: column; height: 100%; }
    .page-area {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
      overscroll-behavior-y: contain;
    }
    .slide-in { animation: slideIn 0.22s ease; }
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    /* Page transition placeholder while lazy module loads */
    .page-loading {
      display: flex; align-items: center; justify-content: center;
      height: 60vh; flex-direction: column; gap: 12px;
    }
    .page-spinner {
      width: 32px; height: 32px;
      border: 3px solid var(--blue-100);
      border-top-color: var(--blue-500);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .page-spinner-label { font-size: 13px; color: var(--slate-400); }
  `;

  async _ensureAndRender(page) {
    if (!_loaded.has(page) && LAZY_PAGES[page]) {
      // Show placeholder immediately, then load
      this._pageReady = false;
      this.requestUpdate();
      await ensurePage(page);
      this._pageReady = true;
    } else {
      this._pageReady = true;
    }
  }

  updated(changed) {
    super.updated?.(changed);
    const page = this.store.currentPage;
    if (page !== this._lastPage) {
      this._lastPage = page;
      // Scroll page area back to top on navigation
      const area = this.shadowRoot?.querySelector('#page-area');
      if (area) area.scrollTop = 0;
      // Prefetch adjacent pages
      prefetchAdjacentPages(page);
    }
  }

  _renderPageContent() {
    const page = this.store.currentPage;
    // Eager pages — always available
    switch (page) {
      case 'login':          return html`<login-page></login-page>`;
      case 'forgot-password':return html`<forgot-password-page></forgot-password-page>`;
      case 'home':           return html`<home-page></home-page>`;
    }
    // Lazy pages — show spinner until module loaded
    if (!_loaded.has(page)) {
      this._ensureAndRender(page);
      return html`
        <div class="page-loading">
          <div class="page-spinner"></div>
          <div class="page-spinner-label">Loading…</div>
        </div>`;
    }
    switch (page) {
      case 'events':           return html`<events-page></events-page>`;
      case 'donations':        return html`<donations-page></donations-page>`;
      case 'campaign-detail':  return html`<campaign-detail-page></campaign-detail-page>`;
      case 'notifications':    return html`<notifications-page></notifications-page>`;
      case 'profile':          return html`<profile-page></profile-page>`;
      case 'admin-dashboard':  return html`<admin-dashboard></admin-dashboard>`;
      default:                 return html`<home-page></home-page>`;
    }
  }

  _isAuthPage() {
    return ['login', 'forgot-password'].includes(this.store.currentPage);
  }

  render() {
    const isAdmin = this.store.currentUser?.role === 'admin';
    const showModal = this.store.showDonateModal && _loaded.has('donate-modal');

    if (this._isAuthPage()) {
      return html`
        <div class="app-shell">
          <div class="page-area">${this._renderPageContent()}</div>
        </div>
        <pwa-manager></pwa-manager>
      `;
    }

    return html`
      <div class="app-shell">
        <top-bar></top-bar>
        <div class="page-area slide-in" id="page-area">
          ${this._renderPageContent()}
        </div>
        ${!isAdmin ? html`<bottom-nav></bottom-nav>` : ''}
        ${showModal ? html`<donate-modal></donate-modal>` : ''}
      </div>
      <pwa-manager></pwa-manager>
    `;
  }
}

customElements.define('app-root', AppRoot);
