import { LitElement, html, css } from 'lit';
import { store } from '../data/store.js';

class BottomNav extends LitElement {
  static styles = css`
    nav {
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: 480px;
      background: var(--surface);
      border-top: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: var(--nav-height);
      z-index: 100;
      padding: 0 8px;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.06);
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      padding: 8px 12px;
      border-radius: var(--radius-md);
      cursor: pointer;
      border: none;
      background: transparent;
      transition: var(--transition);
      flex: 1;
      max-width: 72px;
      position: relative;
    }

    .nav-item:active {
      transform: scale(0.92);
    }

    .icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      line-height: 1;
    }

    .label {
      font-size: 10px;
      font-weight: 500;
      color: var(--text-muted);
      transition: var(--transition);
    }

    .nav-item.active .label {
      color: var(--primary);
    }

    .nav-item.active .icon-bg {
      background: var(--primary-soft);
      border-radius: var(--radius-sm);
      padding: 2px 10px;
    }

    .badge {
      position: absolute;
      top: 4px;
      right: 10px;
      background: var(--accent-red);
      color: white;
      font-size: 9px;
      font-weight: 700;
      min-width: 16px;
      height: 16px;
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
    }
  `;

  static properties = {
    currentPage: { type: String },
  };

  _nav(page) {
    store.navigate(page);
  }

  render() {
    const items = [
      { page: 'home', icon: '🏠', label: 'Home' },
      { page: 'events', icon: '📅', label: 'Events' },
      { page: 'donations', icon: '💙', label: 'Donate' },
      { page: 'notifications', icon: '🔔', label: 'Alerts', badge: 2 },
      { page: 'profile', icon: '👤', label: 'Profile' },
    ];

    return html`
      <nav role="navigation" aria-label="Main Navigation">
        ${items.map(item => html`
          <button class="nav-item ${this.currentPage === item.page ? 'active' : ''}"
            @click=${() => this._nav(item.page)}
            aria-label="${item.label}"
            aria-current=${this.currentPage === item.page ? 'page' : 'false'}>
            <div class="icon-bg">
              <div class="icon">${item.icon}</div>
            </div>
            <span class="label">${item.label}</span>
            ${item.badge && this.currentPage !== item.page ? html`<span class="badge">${item.badge}</span>` : ''}
          </button>
        `)}
      </nav>
    `;
  }
}

customElements.define('bottom-nav', BottomNav);
