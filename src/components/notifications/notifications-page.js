import { html, css } from 'lit';
import { BaseComponent } from '../../utils/base-component.js';
import { sharedStyles } from '../../styles/shared.js';

export class NotificationsPage extends BaseComponent {
  static styles = [sharedStyles, css`
    .notif-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 16px;
    }
    .mark-all { font-size: 13px; color: var(--blue-600); cursor: pointer; font-weight: 600; }
    .notif-item {
      display: flex; gap: 12px; background: white;
      border-radius: var(--radius-lg); padding: 16px;
      box-shadow: var(--shadow-sm); margin-bottom: 10px;
      cursor: pointer; transition: all 0.2s;
      border-left: 4px solid transparent;
      position: relative;
    }
    .notif-item.unread { border-left-color: var(--blue-500); background: var(--blue-50); }
    .notif-item:hover { box-shadow: var(--shadow-md); }
    .notif-icon {
      width: 40px; height: 40px; border-radius: 50%;
      background: var(--blue-100); display: flex;
      align-items: center; justify-content: center;
      font-size: 18px; flex-shrink: 0;
    }
    .notif-icon.campaign { background: var(--blue-100); }
    .notif-icon.transaction { background: var(--green-light); }
    .notif-icon.event { background: var(--gold-light); }
    .notif-icon.system { background: var(--slate-100); }
    .notif-info { flex: 1; }
    .notif-title { font-size: 14px; font-weight: 700; color: var(--slate-800); margin-bottom: 4px; }
    .notif-msg { font-size: 13px; color: var(--slate-500); line-height: 1.5; }
    .notif-time { font-size: 11px; color: var(--slate-400); margin-top: 6px; }
    .unread-dot {
      position: absolute; top: 16px; right: 16px;
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--blue-600);
    }
    .type-filter { display: flex; gap: 8px; margin-bottom: 16px; overflow-x: auto; }
    .type-filter::-webkit-scrollbar { display: none; }
  `];

  static properties = { typeFilter: {type:String} };
  constructor() { super(); this.typeFilter = 'all'; }

  get filtered() {
    const n = this.store.notifications;
    if (this.typeFilter === 'all') return n;
    if (this.typeFilter === 'unread') return n.filter(x => !x.read);
    return n.filter(x => x.type === this.typeFilter);
  }

  render() {
    const types = ['all','unread','campaign','transaction','event','system'];
    return html`
      <div class="page-container">
        <div class="notif-header">
          <div>
            <div style="font-size:13px;color:var(--slate-500)">
              ${this.store.unreadCount} unread notification${this.store.unreadCount !== 1 ? 's' : ''}
            </div>
          </div>
          <span class="mark-all" @click=${() => this.store.markAllNotificationsRead()}>Mark all read</span>
        </div>

        <div class="type-filter">
          ${types.map(t => html`
            <button class="chip ${this.typeFilter === t ? 'active' : ''}" @click=${() => this.typeFilter = t}>
              ${t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          `)}
        </div>

        ${this.filtered.length === 0 ? html`
          <div class="empty-state">
            <div class="empty-state-icon">🔔</div>
            <div class="empty-state-title">No notifications</div>
            <div class="empty-state-desc">You're all caught up!</div>
          </div>
        ` : this.filtered.map(n => html`
          <div class="notif-item ${n.read ? '' : 'unread'}"
            @click=${() => this.store.markNotificationRead(n.id)}>
            <div class="notif-icon ${n.type}">${n.icon}</div>
            <div class="notif-info">
              <div class="notif-title">${n.title}</div>
              <div class="notif-msg">${n.message}</div>
              <div class="notif-time">${n.time}</div>
            </div>
            ${!n.read ? html`<div class="unread-dot"></div>` : ''}
          </div>
        `)}
      </div>
    `;
  }
}
customElements.define('notifications-page', NotificationsPage);
