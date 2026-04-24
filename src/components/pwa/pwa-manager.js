/**
 * pwa-manager.js
 * Handles:
 *  1. SW update available → show "Update App" banner
 *  2. Offline-ready first install → show "Works Offline!" toast
 *  3. beforeinstallprompt → A2HS (Add to Home Screen) button
 *  4. Network status indicator
 *  5. App installed event tracking
 */
import { LitElement, html, css } from 'lit';

export class PwaManager extends LitElement {
  static properties = {
    _showUpdate:    { state: true },
    _showOffline:   { state: true },
    _showA2hs:      { state: true },
    _isOffline:     { state: true },
    _showNetBanner: { state: true },
    _updateSW:      { state: true }
  };

  constructor() {
    super();
    this._showUpdate    = false;
    this._showOffline   = false;
    this._showA2hs      = false;
    this._isOffline     = !navigator.onLine;
    this._showNetBanner = !navigator.onLine;
    this._updateSW      = null;
    this._deferredPrompt = null;
  }

  connectedCallback() {
    super.connectedCallback();

    // ── Network status ────────────────────────────────────────────────────
    window.addEventListener('online',  this._onOnline.bind(this));
    window.addEventListener('offline', this._onOffline.bind(this));

    // ── SW update available ───────────────────────────────────────────────
    window.addEventListener('pwa-update-available', (e) => {
      this._updateSW = e.detail?.updateSW;
      this._showUpdate = true;
    });

    // ── Offline ready ─────────────────────────────────────────────────────
    window.addEventListener('pwa-offline-ready', () => {
      this._showOffline = true;
      setTimeout(() => { this._showOffline = false; }, 5000);
    });

    // ── Add to Home Screen (A2HS) ─────────────────────────────────────────
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this._deferredPrompt = e;
      // Show install button after 30 seconds (less intrusive)
      setTimeout(() => { this._showA2hs = true; }, 30_000);
    });

    window.addEventListener('appinstalled', () => {
      console.info('[PWA] App installed to home screen ✓');
      this._showA2hs = false;
      this._deferredPrompt = null;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('online',  this._onOnline.bind(this));
    window.removeEventListener('offline', this._onOffline.bind(this));
  }

  _onOnline() {
    this._isOffline = false;
    // Show "back online" briefly
    this._showNetBanner = true;
    setTimeout(() => { this._showNetBanner = false; }, 3500);
  }

  _onOffline() {
    this._isOffline = true;
    this._showNetBanner = true;
  }

  async _doUpdate() {
    if (this._updateSW) {
      await this._updateSW(true);
    } else {
      window.location.reload();
    }
  }

  async _installApp() {
    if (!this._deferredPrompt) return;
    this._deferredPrompt.prompt();
    const { outcome } = await this._deferredPrompt.userChoice;
    console.info('[PWA] Install prompt outcome:', outcome);
    this._deferredPrompt = null;
    this._showA2hs = false;
  }

  static styles = css`
    :host { display: block; position: relative; z-index: 500; }

    /* ── Network banner ─────────────────────────────────────────────────── */
    .net-banner {
      position: fixed; top: 0; left: 0; right: 0;
      padding: 10px 16px;
      font-size: 13px; font-weight: 600; font-family: var(--font-body);
      text-align: center;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      z-index: 9999;
      animation: slideDown 0.3s ease;
    }
    @keyframes slideDown {
      from { transform: translateY(-100%); opacity: 0; }
      to   { transform: translateY(0);     opacity: 1; }
    }
    .net-banner.offline { background: #1e293b; color: white; }
    .net-banner.online  { background: #10b981; color: white; }

    /* ── Update banner ──────────────────────────────────────────────────── */
    .update-banner {
      position: fixed; bottom: calc(72px + 16px); left: 16px; right: 16px;
      max-width: 448px; margin: 0 auto;
      background: #1e3a8a;
      color: white; border-radius: 18px; padding: 16px 18px;
      display: flex; align-items: center; gap: 12px;
      box-shadow: 0 8px 32px rgba(30,58,138,0.45);
      animation: popUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
      z-index: 9998;
    }
    @keyframes popUp {
      from { transform: translateY(20px) scale(0.95); opacity: 0; }
      to   { transform: translateY(0)    scale(1);    opacity: 1; }
    }
    .update-icon { font-size: 28px; flex-shrink: 0; }
    .update-text { flex: 1; }
    .update-title { font-size: 14px; font-weight: 700; margin-bottom: 2px; }
    .update-sub   { font-size: 12px; opacity: 0.8; }
    .update-actions { display: flex; gap: 8px; }
    .btn-update {
      padding: 8px 16px; border-radius: 10px; border: none; cursor: pointer;
      font-size: 13px; font-weight: 700; font-family: var(--font-body);
      background: #f59e0b; color: #1e293b; white-space: nowrap;
      transition: background 0.2s;
    }
    .btn-update:hover { background: #fbbf24; }
    .btn-dismiss {
      padding: 8px 12px; border-radius: 10px; border: none; cursor: pointer;
      font-size: 13px; font-family: var(--font-body);
      background: rgba(255,255,255,0.15); color: white;
    }

    /* ── Offline-ready toast ────────────────────────────────────────────── */
    .offline-toast {
      position: fixed; bottom: calc(72px + 16px); left: 16px; right: 16px;
      max-width: 448px; margin: 0 auto;
      background: #10b981; color: white;
      border-radius: 14px; padding: 14px 18px;
      display: flex; align-items: center; gap: 10px;
      font-size: 14px; font-weight: 600; font-family: var(--font-body);
      box-shadow: 0 6px 24px rgba(16,185,129,0.35);
      animation: popUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
      z-index: 9997;
    }

    /* ── A2HS install card ──────────────────────────────────────────────── */
    .a2hs-card {
      position: fixed; bottom: calc(72px + 16px); left: 16px; right: 16px;
      max-width: 448px; margin: 0 auto;
      background: white; border-radius: 20px;
      padding: 18px 20px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.15);
      border: 1.5px solid #dbeafe;
      animation: popUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
      z-index: 9996;
    }
    .a2hs-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
    .a2hs-app-icon {
      width: 52px; height: 52px; border-radius: 14px;
      background: linear-gradient(135deg, #1e3a8a, #2563eb);
      display: flex; align-items: center; justify-content: center;
      font-size: 24px; color: #f59e0b; font-weight: 900;
      font-family: var(--font-body); flex-shrink: 0;
    }
    .a2hs-info { flex: 1; }
    .a2hs-title { font-size: 15px; font-weight: 700; color: #1e293b; }
    .a2hs-sub   { font-size: 12px; color: #64748b; margin-top: 2px; }
    .a2hs-features {
      display: flex; gap: 12px; margin-bottom: 14px; flex-wrap: wrap;
    }
    .a2hs-feat { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #475569; }
    .a2hs-actions { display: flex; gap: 10px; }
    .btn-install {
      flex: 1; padding: 12px; border-radius: 12px; border: none; cursor: pointer;
      background: linear-gradient(135deg, #1d4ed8, #3b82f6);
      color: white; font-size: 14px; font-weight: 700; font-family: var(--font-body);
      box-shadow: 0 4px 14px rgba(37,99,235,0.35);
      transition: all 0.2s;
    }
    .btn-install:hover { transform: translateY(-1px); }
    .btn-not-now {
      padding: 12px 16px; border-radius: 12px;
      border: 1.5px solid #e2e8f0; background: white;
      color: #64748b; font-size: 13px; font-weight: 600;
      font-family: var(--font-body); cursor: pointer;
    }
  `;

  render() {
    return html`
      <!-- Network Status Banner -->
      ${this._showNetBanner ? html`
        <div class="net-banner ${this._isOffline ? 'offline' : 'online'}">
          ${this._isOffline
            ? html`📡 <span>No internet connection — cached content available</span>`
            : html`✅ <span>Back online!</span>`
          }
        </div>
      ` : ''}

      <!-- Update Available Banner -->
      ${this._showUpdate ? html`
        <div class="update-banner">
          <div class="update-icon">🆕</div>
          <div class="update-text">
            <div class="update-title">App Update Available</div>
            <div class="update-sub">A new version of AlumniGive is ready</div>
          </div>
          <div class="update-actions">
            <button class="btn-update" @click=${this._doUpdate}>Update</button>
            <button class="btn-dismiss" @click=${() => this._showUpdate = false}>✕</button>
          </div>
        </div>
      ` : ''}

      <!-- Offline Ready Toast -->
      ${this._showOffline ? html`
        <div class="offline-toast">
          ✅ <span>AlumniGive works offline! Key content is cached.</span>
        </div>
      ` : ''}

      <!-- Add to Home Screen Card -->
      ${this._showA2hs ? html`
        <div class="a2hs-card">
          <div class="a2hs-header">
            <div class="a2hs-app-icon">AG</div>
            <div class="a2hs-info">
              <div class="a2hs-title">Install AlumniGive</div>
              <div class="a2hs-sub">Add to your home screen for a better experience</div>
            </div>
          </div>
          <div class="a2hs-features">
            <div class="a2hs-feat">⚡ <span>Faster loads</span></div>
            <div class="a2hs-feat">📡 <span>Works offline</span></div>
            <div class="a2hs-feat">🔔 <span>Push alerts</span></div>
            <div class="a2hs-feat">📱 <span>Native feel</span></div>
          </div>
          <div class="a2hs-actions">
            <button class="btn-install" @click=${this._installApp}>
              📲 Add to Home Screen
            </button>
            <button class="btn-not-now" @click=${() => this._showA2hs = false}>Later</button>
          </div>
        </div>
      ` : ''}
    `;
  }
}

customElements.define('pwa-manager', PwaManager);
