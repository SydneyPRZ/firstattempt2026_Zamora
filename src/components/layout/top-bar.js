import { html, css } from 'lit';
import { BaseComponent } from '../../utils/base-component.js';

export class TopBar extends BaseComponent {
  static styles = css`
    :host { display: block; }
    header {
      position: fixed; top: 0; left: 0; right: 0;
      height: var(--top-bar-height);
      background: white;
      border-bottom: 1px solid var(--slate-100);
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 20px;
      z-index: 100;
      box-shadow: var(--shadow-sm);
    }
    .logo {
      font-family: var(--font-display);
      font-size: 20px;
      color: var(--blue-700);
      cursor: pointer;
    }
    .logo span { color: var(--gold); }
    .right { display: flex; align-items: center; gap: 12px; }
    .icon-btn {
      width: 36px; height: 36px; border-radius: 50%;
      border: none; background: var(--slate-50);
      cursor: pointer; font-size: 16px;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
      position: relative;
    }
    .icon-btn:hover { background: var(--blue-50); }
    .notif-badge {
      position: absolute; top: -2px; right: -2px;
      width: 14px; height: 14px; border-radius: 50%;
      background: var(--red); color: white;
      font-size: 8px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      border: 2px solid white;
    }
    .avatar-btn { cursor: pointer; }
    img.avatar {
      width: 32px; height: 32px; border-radius: 50%;
      object-fit: cover; border: 2px solid var(--blue-200);
    }
    .page-title {
      font-size: 15px; font-weight: 700; color: var(--slate-800);
      text-transform: capitalize;
    }
    .back-btn {
      width: 32px; height: 32px; border-radius: 50%;
      border: none; background: var(--slate-100);
      cursor: pointer; font-size: 18px;
      display: flex; align-items: center; justify-content: center;
    }
    .back-btn:hover { background: var(--blue-50); }
  `;

  _getTitle() {
    const map = {
      home: '', events: 'Events', donations: 'Donate',
      'campaign-detail': '', notifications: 'Notifications',
      profile: 'Profile', 'admin-dashboard': 'Admin Dashboard'
    };
    return map[this.store.currentPage] || '';
  }

  _isDetail() {
    return ['campaign-detail'].includes(this.store.currentPage);
  }

  render() {
    const user = this.store.currentUser;
    const isHome = this.store.currentPage === 'home';
    const isAdmin = user?.role === 'admin';

    return html`
      <header>
        <div style="display:flex;align-items:center;gap:10px">
          ${this._isDetail() ? html`
            <button class="back-btn" @click=${() => this.navigate('donations')}>←</button>
          ` : ''}
          ${isHome || isAdmin ? html`
            <div class="logo" @click=${() => this.navigate(isAdmin ? 'admin-dashboard' : 'home')}>
              Alumni<span>Give</span>
            </div>
          ` : html`
            <div class="page-title">${this._getTitle()}</div>
          `}
        </div>

        <div class="right">
          ${!isAdmin ? html`
            <button class="icon-btn" @click=${() => this.navigate('notifications')} style="position:relative">
              🔔
              ${this.store.unreadCount > 0 ? html`
                <span class="notif-badge">${this.store.unreadCount}</span>
              ` : ''}
            </button>
          ` : ''}
          <img class="avatar avatar-btn" src="${user?.avatar}" alt="${user?.name}"
            @click=${() => this.navigate(isAdmin ? 'admin-dashboard' : 'profile')} />
        </div>
      </header>
    `;
  }
}
customElements.define('top-bar', TopBar);
