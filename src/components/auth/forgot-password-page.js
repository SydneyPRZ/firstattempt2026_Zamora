import { html, css } from 'lit';
import { LitElement } from 'lit';
import { store } from '../../data/store.js';

export class ForgotPasswordPage extends LitElement {
  static properties = { email: {type:String}, sent: {type:Boolean} };
  constructor() { super(); this.email = ''; this.sent = false; }

  static styles = css`
    :host { display: flex; min-height: 100vh; background: var(--slate-50); }
    .container {
      width: 100%; max-width: 480px; margin: 0 auto;
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; padding: 40px 28px;
    }
    .icon { font-size: 56px; margin-bottom: 20px; }
    h2 { font-family: var(--font-display); font-size: 26px; color: var(--slate-800); margin-bottom: 8px; }
    p { color: var(--slate-500); font-size: 14px; text-align: center; margin-bottom: 28px; line-height: 1.6; }
    input {
      width: 100%; padding: 14px 18px; border: 1.5px solid var(--slate-200);
      border-radius: var(--radius-md); font-family: var(--font-body); font-size: 15px;
      margin-bottom: 16px; outline: none; box-sizing: border-box;
    }
    input:focus { border-color: var(--blue-400); box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
    .btn {
      width: 100%; padding: 14px; background: var(--blue-600); color: white;
      border: none; border-radius: var(--radius-md); font-family: var(--font-body);
      font-size: 15px; font-weight: 600; cursor: pointer; margin-bottom: 16px;
    }
    .back { color: var(--blue-600); cursor: pointer; font-size: 14px; }
    .success { background: var(--green-light); padding: 20px; border-radius: var(--radius-md); text-align: center; color: #065f46; }
  `;

  render() {
    return html`
      <div class="container">
        <div class="icon">${this.sent ? '📬' : '🔐'}</div>
        <h2>${this.sent ? 'Email sent!' : 'Reset password'}</h2>
        ${this.sent ? html`
          <div class="success">
            We've sent a reset link to <strong>${this.email}</strong>.<br>
            Check your inbox and follow the instructions.
          </div>
        ` : html`
          <p>Enter your registered email address and we'll send you a link to reset your password.</p>
          <input type="email" placeholder="your@email.com" .value=${this.email}
            @input=${e => this.email = e.target.value} />
          <button class="btn" @click=${() => { if(this.email) this.sent = true; }}>Send Reset Link</button>
        `}
        <a class="back" @click=${() => store.navigate('login')}>← Back to Sign In</a>
      </div>
    `;
  }
}
customElements.define('forgot-password-page', ForgotPasswordPage);
