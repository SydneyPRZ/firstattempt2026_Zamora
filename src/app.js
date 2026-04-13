import { LitElement, html, css } from 'lit';
import { store } from './data/store.js';

// Import all pages
import './pages/login-page.js';
import './pages/home-page.js';
import './pages/events-page.js';
import './pages/donations-page.js';
import './pages/campaign-detail-page.js';
import './pages/donate-flow-page.js';
import './pages/history-page.js';
import './pages/notifications-page.js';
import './pages/profile-page.js';
import './pages/admin-dashboard-page.js';
import './pages/admin-campaigns-page.js';
import './pages/leaderboard-page.js';
import './pages/certificate-vault-page.js';

// Import components
import './components/bottom-nav.js';
import './components/toast-alert.js';

class AlumniApp extends LitElement {
  static styles = css`
    :host { display: block; }

    .page-container {
      min-height: 100vh;
      padding-bottom: var(--nav-height);
    }

    .page-container.no-nav {
      padding-bottom: 0;
    }

    .page {
      animation: fadeSlide 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes fadeSlide {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  static properties = {
    _state: { state: true },
  };

  constructor() {
    super();
    this._state = store.state;
    store.subscribe(state => { this._state = state; });
  }

  _noNavPages() {
    return ['login', 'campaign-detail', 'donate-flow', 'admin-dashboard', 'admin-campaigns', 'leaderboard'];
  }

  render() {
    const { currentPage, currentUser, toast } = this._state;
    const showNav = currentUser && currentUser.role === 'alumni' && !this._noNavPages().includes(currentPage);

    return html`
      <div class="page-container ${showNav ? '' : 'no-nav'}">
        <div class="page">
          ${this._renderPage(currentPage)}
        </div>
        ${showNav ? html`<bottom-nav .currentPage=${currentPage}></bottom-nav>` : ''}
        ${toast ? html`<toast-alert .message=${toast.message} .type=${toast.type} .key=${toast.id}></toast-alert>` : ''}
      </div>
    `;
  }

  _renderPage(page) {
    switch (page) {
      case 'login': return html`<login-page></login-page>`;
      case 'home': return html`<home-page></home-page>`;
      case 'events': return html`<events-page></events-page>`;
      case 'donations': return html`<donations-page></donations-page>`;
      case 'campaign-detail': return html`<campaign-detail-page .campaignId=${this._state.currentCampaignId}></campaign-detail-page>`;
      case 'donate-flow': return html`<donate-flow-page .campaignId=${this._state.currentCampaignId}></donate-flow-page>`;
      case 'history': return html`<history-page></history-page>`;
      case 'notifications': return html`<notifications-page></notifications-page>`;
      case 'profile': return html`<profile-page></profile-page>`;
      case 'admin-dashboard': return html`<admin-dashboard-page></admin-dashboard-page>`;
      case 'admin-campaigns': return html`<admin-campaigns-page></admin-campaigns-page>`;
      case 'leaderboard': return html`<leaderboard-page></leaderboard-page>`;
      case 'certificate-vault': return html`<certificate-vault-page></certificate-vault-page>`;
      default: return html`<login-page></login-page>`;
    }
  }
}

customElements.define('alumni-app', AlumniApp);
