import { html, css } from 'lit';
import { LitElement } from 'lit';
import { store } from '../../data/store.js';

export class LoginPage extends LitElement {
  static properties = {
    email: { type: String },
    password: { type: String },
    role: { type: String },
    error: { type: String },
    loading: { type: Boolean }
  };

  constructor() {
    super();
    this.email = '';
    this.password = '';
    this.role = 'alumni';
    this.error = '';
    this.loading = false;
  }

  static styles = css`
    :host { display: flex; min-height: 100vh; }
    .container {
      display: flex; flex-direction: column;
      min-height: 100vh; width: 100%; max-width: 480px; margin: 0 auto;
      background: white;
    }
    .hero {
      background: linear-gradient(160deg, var(--blue-800) 0%, var(--blue-600) 60%, var(--blue-400) 100%);
      padding: 60px 32px 48px;
      position: relative; overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute; top: -40px; right: -40px;
      width: 200px; height: 200px;
      border-radius: 50%;
      background: rgba(255,255,255,0.06);
    }
    .hero::after {
      content: '';
      position: absolute; bottom: -60px; left: -20px;
      width: 240px; height: 240px;
      border-radius: 50%;
      background: rgba(255,255,255,0.04);
    }
    .logo {
      font-family: var(--font-display);
      font-size: 32px; color: white;
      margin-bottom: 8px;
    }
    .logo-accent { color: var(--gold); }
    .tagline { color: rgba(255,255,255,0.75); font-size: 14px; }
    .form-area {
      flex: 1; padding: 32px 28px;
      display: flex; flex-direction: column;
    }
    .role-tabs {
      display: flex; gap: 8px; margin-bottom: 28px;
      background: var(--slate-100); padding: 4px; border-radius: var(--radius-md);
    }
    .role-tab {
      flex: 1; padding: 10px; border: none; border-radius: 8px;
      background: transparent; cursor: pointer;
      font-family: var(--font-body); font-size: 14px; font-weight: 600;
      color: var(--slate-500); transition: all 0.2s;
    }
    .role-tab.active { background: white; color: var(--blue-700); box-shadow: var(--shadow-sm); }
    .title { font-family: var(--font-display); font-size: 26px; color: var(--slate-800); margin-bottom: 6px; }
    .subtitle { font-size: 14px; color: var(--slate-500); margin-bottom: 28px; }
    .input-group { margin-bottom: 16px; }
    label { display: block; font-size: 13px; font-weight: 600; color: var(--slate-700); margin-bottom: 6px; }
    input {
      width: 100%; padding: 13px 16px;
      border: 1.5px solid var(--slate-200); border-radius: var(--radius-md);
      font-family: var(--font-body); font-size: 15px;
      background: var(--slate-50); color: var(--slate-800);
      transition: all 0.2s; outline: none; box-sizing: border-box;
    }
    input:focus { border-color: var(--blue-400); background: white; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
    .forgot { text-align: right; margin-top: -8px; margin-bottom: 20px; }
    .forgot a { font-size: 13px; color: var(--blue-600); text-decoration: none; cursor: pointer; }
    .btn-login {
      width: 100%; padding: 15px;
      background: linear-gradient(135deg, var(--blue-700), var(--blue-500));
      color: white; border: none; border-radius: var(--radius-md);
      font-family: var(--font-body); font-size: 15px; font-weight: 700;
      cursor: pointer; box-shadow: var(--shadow-blue);
      transition: all 0.2s; margin-bottom: 20px;
    }
    .btn-login:hover { transform: translateY(-1px); box-shadow: 0 12px 30px rgba(37,99,235,0.35); }
    .btn-login:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
    .error-msg {
      background: var(--red-light); color: #991b1b;
      padding: 12px 16px; border-radius: var(--radius-md);
      font-size: 14px; margin-bottom: 16px;
      border: 1px solid #fca5a5;
    }
    .divider { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--slate-200); }
    .divider span { font-size: 13px; color: var(--slate-400); }
    .demo-hint {
      background: var(--blue-50); border: 1px solid var(--blue-100);
      border-radius: var(--radius-md); padding: 14px 16px;
      font-size: 13px; color: var(--blue-700);
    }
    .demo-hint strong { display: block; margin-bottom: 4px; }
    .demo-hint code {
      background: white; padding: 2px 6px; border-radius: 4px;
      font-family: monospace; font-size: 12px;
    }
    .demo-row { display: flex; justify-content: space-between; margin-top: 4px; }
  `;

  _setRole(r) { this.role = r; this.error = ''; }

  _fillDemo(r) {
    if (r === 'alumni') { this.email = 'maria@example.com'; this.password = 'pass123'; }
    else { this.email = 'admin@alumni.edu'; this.password = 'admin123'; }
    this.role = r;
  }

  async _login() {
    if (!this.email || !this.password) { this.error = 'Please enter your email and password.'; return; }
    this.loading = true; this.error = '';
    await new Promise(r => setTimeout(r, 600));
    const ok = store.login(this.email, this.password);
    if (!ok) {
      this.error = 'Invalid email or password. Try the demo credentials below.';
    }
    this.loading = false;
  }

  render() {
    return html`
      <div class="container">
        <div class="hero">
          <div class="logo">Alumni<span class="logo-accent">Give</span></div>
          <div class="tagline">Connect. Give. Impact. — Davao Alumni Network</div>
        </div>
        <div class="form-area">
          <div class="role-tabs">
            <button class="role-tab ${this.role === 'alumni' ? 'active' : ''}" @click=${() => this._setRole('alumni')}>🎓 Alumni</button>
            <button class="role-tab ${this.role === 'admin' ? 'active' : ''}" @click=${() => this._setRole('admin')}>⚙️ Admin</button>
          </div>
          <div class="title">Welcome back</div>
          <div class="subtitle">Sign in to your alumni account</div>
          ${this.error ? html`<div class="error-msg">⚠️ ${this.error}</div>` : ''}
          <div class="input-group">
            <label>Email Address</label>
            <input type="email" placeholder="your@email.com" .value=${this.email}
              @input=${e => this.email = e.target.value}
              @keydown=${e => e.key === 'Enter' && this._login()} />
          </div>
          <div class="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" .value=${this.password}
              @input=${e => this.password = e.target.value}
              @keydown=${e => e.key === 'Enter' && this._login()} />
          </div>
          <div class="forgot">
            <a @click=${() => store.navigate('forgot-password')}>Forgot password?</a>
          </div>
          <button class="btn-login" @click=${this._login} ?disabled=${this.loading}>
            ${this.loading ? '⏳ Signing in…' : 'Sign In →'}
          </button>
          <div class="divider"><span>Demo Credentials</span></div>
          <div class="demo-hint">
            <strong>Try the app instantly:</strong>
            <div class="demo-row">
              <span>Alumni: <code>maria@example.com</code> / <code>pass123</code></span>
              <a style="color:var(--blue-600);cursor:pointer;font-size:12px" @click=${() => this._fillDemo('alumni')}>Fill →</a>
            </div>
            <div class="demo-row">
              <span>Admin: <code>admin@alumni.edu</code> / <code>admin123</code></span>
              <a style="color:var(--blue-600);cursor:pointer;font-size:12px" @click=${() => this._fillDemo('admin')}>Fill →</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('login-page', LoginPage);
