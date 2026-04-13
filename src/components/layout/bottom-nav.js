import { html, css } from 'lit';
import { BaseComponent } from '../../utils/base-component.js';

export class BottomNav extends BaseComponent {
  static styles = css`
    :host { display: block; }
    nav {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      height: var(--nav-height);
      background: white;
      border-top: 1px solid var(--slate-100);
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0 8px;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.06);
      z-index: 100;
    }
    .nav-item {
      display: flex; flex-direction: column; align-items: center; gap: 3px;
      padding: 6px 10px;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all 0.2s;
      border: none; background: transparent;
      flex: 1;
      color: var(--slate-400);
      font-size: 10px; font-weight: 600; font-family: var(--font-body);
      letter-spacing: 0.3px; text-transform: uppercase;
    }
    .nav-item:hover { color: var(--blue-500); }
    .nav-item.active { color: var(--blue-600); }
    .nav-icon { font-size: 20px; line-height: 1; position: relative; }
    .n-badge {
      position: absolute; top: -4px; right: -6px;
      background: var(--red); color: white;
      font-size: 9px; font-weight: 700;
      padding: 2px 5px; border-radius: 999px;
      min-width: 16px; text-align: center;
    }
    .center-btn {
      width: 50px; height: 50px; border-radius: 50%;
      background: linear-gradient(135deg, var(--blue-600), var(--blue-400));
      box-shadow: var(--shadow-blue);
      display: flex; align-items: center; justify-content: center;
      font-size: 24px; cursor: pointer; border: none;
      transition: transform 0.2s, box-shadow 0.2s;
      margin-top: -16px;
    }
    .center-btn:hover { transform: scale(1.1); }
    .active-dot {
      width: 4px; height: 4px; border-radius: 50%;
      background: var(--blue-600); margin: 0 auto;
    }
  `;

  get navItems() {
    return [
      { id: 'home', label: 'Home', icon: '🏠' },
      { id: 'events', label: 'Events', icon: '📅' },
      { id: 'donations', label: 'Give', icon: '💙', center: true },
      { id: 'notifications', label: 'Alerts', icon: '🔔', badge: this.store.unreadCount },
      { id: 'profile', label: 'Profile', icon: '👤' }
    ];
  }

  render() {
    const cur = this.store.currentPage;
    return html`
      <nav>
        ${this.navItems.map(p => p.center ? html`
          <button class="center-btn" @click=${() => this.navigate(p.id)} title="Donations">💙</button>
        ` : html`
          <button class="nav-item ${cur === p.id ? 'active' : ''}" @click=${() => this.navigate(p.id)}>
            <span class="nav-icon" style="position:relative">
              ${p.icon}
              ${p.badge ? html`<span class="n-badge">${p.badge > 9 ? '9+' : p.badge}</span>` : ''}
            </span>
            ${p.label}
            ${cur === p.id ? html`<div class="active-dot"></div>` : ''}
          </button>
        `)}
      </nav>
    `;
  }
}
customElements.define('bottom-nav', BottomNav);
