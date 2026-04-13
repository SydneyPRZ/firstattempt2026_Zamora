import { html, css } from 'lit';
import { BaseComponent } from '../../utils/base-component.js';
import { sharedStyles } from '../../styles/shared.js';

export class DonateModal extends BaseComponent {
  static properties = {
    amount: {type: Number},
    custom: {type: Boolean},
    customAmt: {type: String},
    method: {type: String},
    step: {type: Number},
    receiptData: {type: Object}
  };

  constructor() {
    super();
    this.amount = 500;
    this.custom = false;
    this.customAmt = '';
    this.method = 'GCash';
    this.step = 1;
    this.receiptData = null;
  }

  static styles = [sharedStyles, css`
    .overlay {
      position: fixed; inset: 0; background: rgba(15,23,42,0.55);
      z-index: 200; display: flex; align-items: flex-end;
      backdrop-filter: blur(4px);
      animation: fadeIn 0.2s ease;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .sheet {
      width: 100%; max-width: 480px; margin: 0 auto;
      background: white; border-radius: var(--radius-xl) var(--radius-xl) 0 0;
      padding: 0 0 32px;
      animation: slideUp 0.3s ease;
      max-height: 90vh; overflow-y: auto;
    }
    @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
    .handle {
      width: 40px; height: 4px; background: var(--slate-200);
      border-radius: 2px; margin: 12px auto 4px;
    }
    .sheet-header {
      padding: 12px 24px 16px;
      border-bottom: 1px solid var(--slate-100);
      display: flex; justify-content: space-between; align-items: center;
    }
    .sheet-title { font-family: var(--font-display); font-size: 20px; color: var(--slate-800); }
    .close-btn {
      width: 32px; height: 32px; border-radius: 50%; border: none;
      background: var(--slate-100); cursor: pointer; font-size: 18px;
      display: flex; align-items: center; justify-content: center;
    }
    .sheet-body { padding: 20px 24px; }
    .campaign-chip {
      background: var(--blue-50); border-radius: var(--radius-md);
      padding: 10px 14px; margin-bottom: 20px;
      display: flex; align-items: center; gap: 8px;
    }
    .campaign-chip-name { font-size: 14px; font-weight: 600; color: var(--blue-800); }
    .amt-label { font-size: 13px; font-weight: 700; color: var(--slate-600); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.4px; }
    .preset-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-bottom: 12px; }
    .preset-btn {
      padding: 14px 8px; border-radius: var(--radius-md);
      border: 1.5px solid var(--slate-200); background: white;
      font-family: var(--font-body); font-size: 14px; font-weight: 700;
      cursor: pointer; transition: all 0.15s; color: var(--slate-700);
    }
    .preset-btn.selected {
      border-color: var(--blue-500); background: var(--blue-50); color: var(--blue-700);
    }
    .preset-btn:hover { border-color: var(--blue-300); }
    .custom-row { display: flex; gap: 8px; margin-bottom: 20px; align-items: center; }
    .custom-input-wrap { flex: 1; position: relative; }
    .peso-sign {
      position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
      font-size: 15px; color: var(--slate-500); font-weight: 600;
    }
    .custom-input-wrap input { padding-left: 28px; }
    .method-grid { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
    .method-btn {
      display: flex; align-items: center; gap: 12px;
      padding: 14px 16px; border-radius: var(--radius-md);
      border: 1.5px solid var(--slate-200); background: white;
      cursor: pointer; transition: all 0.15s; font-family: var(--font-body);
    }
    .method-btn.selected { border-color: var(--blue-500); background: var(--blue-50); }
    .method-icon { font-size: 24px; }
    .method-name { font-size: 14px; font-weight: 700; color: var(--slate-800); }
    .method-desc { font-size: 12px; color: var(--slate-500); }
    .method-radio {
      margin-left: auto; width: 18px; height: 18px; border-radius: 50%;
      border: 2px solid var(--slate-300); display: flex; align-items: center; justify-content: center;
    }
    .method-radio.checked { border-color: var(--blue-600); background: var(--blue-600); }
    .method-radio.checked::after { content: ''; width: 8px; height: 8px; border-radius: 50%; background: white; }
    .summary-box {
      background: var(--slate-50); border-radius: var(--radius-lg); padding: 16px; margin-bottom: 20px;
    }
    .summary-row-item { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 8px; color: var(--slate-600); }
    .summary-total { display: flex; justify-content: space-between; font-size: 16px; font-weight: 700; color: var(--slate-800); border-top: 1px solid var(--slate-200); padding-top: 10px; margin-top: 4px; }
    .total-amt { font-family: var(--font-display); font-size: 20px; color: var(--blue-700); }
    .confirm-btn {
      width: 100%; padding: 16px;
      background: linear-gradient(135deg, var(--blue-700), var(--blue-500));
      color: white; border: none; border-radius: var(--radius-lg);
      font-family: var(--font-display); font-size: 18px; cursor: pointer;
      box-shadow: var(--shadow-blue); transition: all 0.2s; margin-bottom: 10px;
    }
    .confirm-btn:hover { transform: translateY(-1px); }
    .security-note { text-align: center; font-size: 12px; color: var(--slate-400); }

    /* Receipt */
    .receipt {
      text-align: center; padding: 8px;
    }
    .receipt-icon { font-size: 56px; margin-bottom: 12px; }
    .receipt-title { font-family: var(--font-display); font-size: 24px; color: var(--slate-800); margin-bottom: 6px; }
    .receipt-sub { font-size: 14px; color: var(--slate-500); margin-bottom: 20px; }
    .receipt-box {
      background: var(--blue-50); border-radius: var(--radius-lg); padding: 20px;
      text-align: left; margin-bottom: 20px;
    }
    .receipt-item { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 10px; color: var(--slate-700); }
    .receipt-item:last-child { margin-bottom: 0; font-weight: 700; color: var(--blue-800); font-size: 16px; }
    .step-dots { display: flex; justify-content: center; gap: 6px; padding: 8px 0; }
    .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--slate-200); }
    .dot.active { background: var(--blue-600); width: 20px; border-radius: 3px; }
  `];

  get finalAmount() {
    return this.custom && this.customAmt ? parseInt(this.customAmt) || 0 : this.amount;
  }

  _setPreset(a) { this.amount = a; this.custom = false; this.customAmt = ''; }
  _setCustom() { this.custom = true; this.amount = 0; }

  _confirm() {
    const campaign = this.store.donateTargetCampaign;
    const donation = this.store.submitDonation({
      campaignId: campaign.id,
      campaign: campaign.title,
      amount: this.finalAmount,
      method: this.method
    });
    this.receiptData = donation;
    this.step = 3;
  }

  _close() { this.store.closeDonateModal(); this.step = 1; this.receiptData = null; }

  _renderStep1() {
    const presets = [100, 250, 500, 1000, 2500, 5000];
    return html`
      <div class="amt-label">Select Amount</div>
      <div class="preset-grid">
        ${presets.map(a => html`
          <button class="preset-btn ${!this.custom && this.amount === a ? 'selected' : ''}"
            @click=${() => this._setPreset(a)}>₱${a.toLocaleString()}</button>
        `)}
      </div>
      <div class="custom-row">
        <button class="preset-btn ${this.custom ? 'selected' : ''}" style="white-space:nowrap" @click=${this._setCustom}>Custom</button>
        <div class="custom-input-wrap">
          <span class="peso-sign">₱</span>
          <input type="number" placeholder="Enter amount" .value=${this.customAmt}
            @input=${e => { this.customAmt = e.target.value; this.custom = true; this.amount = 0; }}
            ?disabled=${!this.custom} />
        </div>
      </div>
      <button class="confirm-btn" ?disabled=${this.finalAmount < 1}
        @click=${() => this.step = 2}>
        Continue → ₱${this.finalAmount.toLocaleString()}
      </button>
    `;
  }

  _renderStep2() {
    const methods = [
      { id: 'GCash', icon: '📱', name: 'GCash', desc: 'Pay via GCash mobile wallet' },
      { id: 'Maya', icon: '💜', name: 'Maya', desc: 'Pay via Maya (PayMaya)' },
      { id: 'Credit Card', icon: '💳', name: 'Credit / Debit Card', desc: 'Visa, Mastercard, JCB' },
      { id: 'Bank Transfer', icon: '🏦', name: 'Bank Transfer', desc: 'BDO, BPI, Metrobank' }
    ];
    const campaign = this.store.donateTargetCampaign;
    return html`
      <div class="amt-label">Payment Method</div>
      <div class="method-grid">
        ${methods.map(m => html`
          <button class="method-btn ${this.method === m.id ? 'selected' : ''}"
            @click=${() => this.method = m.id}>
            <span class="method-icon">${m.icon}</span>
            <div style="flex:1;text-align:left">
              <div class="method-name">${m.name}</div>
              <div class="method-desc">${m.desc}</div>
            </div>
            <div class="method-radio ${this.method === m.id ? 'checked' : ''}"></div>
          </button>
        `)}
      </div>
      <div class="summary-box">
        <div class="summary-row-item"><span>Campaign</span><span style="text-align:right;max-width:60%">${campaign?.title}</span></div>
        <div class="summary-row-item"><span>Payment via</span><span>${this.method}</span></div>
        <div class="summary-total"><span>Total</span><span class="total-amt">₱${this.finalAmount.toLocaleString()}</span></div>
      </div>
      <button class="confirm-btn" @click=${this._confirm}>🔒 Confirm Donation</button>
      <div class="security-note">🔐 Secured & encrypted transaction</div>
    `;
  }

  _renderReceipt() {
    const d = this.receiptData;
    return html`
      <div class="receipt">
        <div class="receipt-icon">🎉</div>
        <div class="receipt-title">Thank you!</div>
        <div class="receipt-sub">Your donation has been received. You're making a difference!</div>
        <div class="receipt-box">
          <div class="receipt-item"><span>Reference</span><span>${d?.receipt}</span></div>
          <div class="receipt-item"><span>Campaign</span><span style="text-align:right;max-width:55%">${d?.campaign}</span></div>
          <div class="receipt-item"><span>Method</span><span>${d?.method}</span></div>
          <div class="receipt-item"><span>Date</span><span>${d?.date}</span></div>
          <div class="receipt-item"><span>Amount</span><span>₱${d?.amount?.toLocaleString()}</span></div>
        </div>
        <button class="confirm-btn" @click=${this._close}>Done ✓</button>
        <div class="security-note">A receipt has been saved to your donation history.</div>
      </div>
    `;
  }

  render() {
    const campaign = this.store.donateTargetCampaign;
    const titles = ['', 'Donation Amount', 'Payment Method', 'Receipt'];
    return html`
      <div class="overlay" @click=${e => e.target === e.currentTarget && this._close()}>
        <div class="sheet">
          <div class="handle"></div>
          <div class="sheet-header">
            <div class="sheet-title">${titles[this.step]}</div>
            <button class="close-btn" @click=${this._close}>✕</button>
          </div>
          <div class="sheet-body">
            ${this.step < 3 ? html`
              <div class="campaign-chip">
                <span>💙</span>
                <div class="campaign-chip-name">${campaign?.title}</div>
              </div>
              <div class="step-dots">
                <div class="dot ${this.step >= 1 ? 'active' : ''}"></div>
                <div class="dot ${this.step >= 2 ? 'active' : ''}"></div>
                <div class="dot ${this.step >= 3 ? 'active' : ''}"></div>
              </div>
            ` : ''}
            ${this.step === 1 ? this._renderStep1() : ''}
            ${this.step === 2 ? this._renderStep2() : ''}
            ${this.step === 3 ? this._renderReceipt() : ''}
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('donate-modal', DonateModal);
