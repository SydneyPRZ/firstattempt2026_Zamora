import { LitElement, html, css } from 'lit';

class ToastAlert extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      bottom: calc(var(--nav-height) + 16px);
      left: 50%;
      transform: translateX(-50%);
      z-index: 200;
      width: calc(100% - 32px);
      max-width: 440px;
    }

    .toast {
      background: var(--text-primary);
      color: white;
      padding: 14px 18px;
      border-radius: var(--radius-md);
      font-size: 14px;
      font-weight: 500;
      box-shadow: var(--shadow-lg);
      display: flex;
      align-items: center;
      gap: 10px;
      animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .toast.success { background: #064E3B; }
    .toast.error { background: #7F1D1D; }
    .toast.info { background: #1E3A8A; }

    .icon { font-size: 18px; }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  static properties = {
    message: { type: String },
    type: { type: String },
    key: { type: Number },
  };

  _icon() {
    return { success: '✅', error: '❌', info: 'ℹ️' }[this.type] || '✅';
  }

  render() {
    return html`
      <div class="toast ${this.type || 'success'}">
        <span class="icon">${this._icon()}</span>
        <span>${this.message}</span>
      </div>
    `;
  }
}

customElements.define('toast-alert', ToastAlert);
