import { html, css } from 'lit';
import { BaseComponent } from '../utils/base-component.js';

// Import all pages
import './auth/login-page.js';
import './auth/forgot-password-page.js';
import './layout/bottom-nav.js';
import './layout/top-bar.js';
import './home/home-page.js';
import './events/events-page.js';
import './donations/donations-page.js';
import './donations/campaign-detail-page.js';
import './donations/donate-modal.js';
import './notifications/notifications-page.js';
import './profile/profile-page.js';
import './admin/admin-dashboard.js';

export class AppRoot extends BaseComponent {
  static styles = css`
    :host { display: block; height: 100vh; overflow: hidden; }
    .app-shell { display: flex; flex-direction: column; height: 100%; }
    .page-area {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
    }
    .slide-in { animation: slideIn 0.25s ease; }
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  _renderPage() {
    const page = this.store.currentPage;
    switch (page) {
      case 'login': return html`<login-page></login-page>`;
      case 'forgot-password': return html`<forgot-password-page></forgot-password-page>`;
      case 'home': return html`<home-page></home-page>`;
      case 'events': return html`<events-page></events-page>`;
      case 'donations': return html`<donations-page></donations-page>`;
      case 'campaign-detail': return html`<campaign-detail-page></campaign-detail-page>`;
      case 'notifications': return html`<notifications-page></notifications-page>`;
      case 'profile': return html`<profile-page></profile-page>`;
      case 'admin-dashboard': return html`<admin-dashboard></admin-dashboard>`;
      default: return html`<home-page></home-page>`;
    }
  }

  _isAuthPage() {
    return ['login', 'forgot-password'].includes(this.store.currentPage);
  }

  render() {
    if (this._isAuthPage()) {
      return html`
        <div class="app-shell">
          <div class="page-area">${this._renderPage()}</div>
        </div>
      `;
    }

    return html`
      <div class="app-shell">
        <top-bar></top-bar>
        <div class="page-area slide-in" id="page-area">
          ${this._renderPage()}
        </div>
        ${this.store.currentUser?.role !== 'admin' ? html`<bottom-nav></bottom-nav>` : ''}
        ${this.store.showDonateModal ? html`<donate-modal></donate-modal>` : ''}
      </div>
    `;
  }
}

customElements.define('app-root', AppRoot);
