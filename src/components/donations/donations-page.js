import { html, css } from 'lit';
import { BaseComponent } from '../../utils/base-component.js';
import { CAMPAIGNS, DONATION_HISTORY, formatCurrency } from '../../data/mock-data.js';
import { sharedStyles } from '../../styles/shared.js';

export class DonationsPage extends BaseComponent {
  static properties = { tab: {type:String}, filter: {type:String} };
  constructor() { super(); this.tab = 'campaigns'; this.filter = 'all'; }

  static styles = [sharedStyles, css`
    .tab-bar {
      display: flex; background: var(--slate-100);
      border-radius: var(--radius-md); padding: 3px; margin-bottom: 20px;
    }
    .tab-btn {
      flex: 1; padding: 10px; border: none; border-radius: 8px;
      background: transparent; cursor: pointer; font-size: 13px; font-weight: 600;
      color: var(--slate-500); font-family: var(--font-body); transition: all 0.2s;
    }
    .tab-btn.active { background: white; color: var(--blue-700); box-shadow: var(--shadow-sm); }
    .campaign-card {
      background: white; border-radius: var(--radius-lg);
      overflow: hidden; box-shadow: var(--shadow-md);
      margin-bottom: 16px; cursor: pointer; transition: transform 0.2s;
    }
    .campaign-card:hover { transform: translateY(-2px); }
    .campaign-img { width: 100%; height: 160px; object-fit: cover; display: block; }
    .campaign-body { padding: 16px; }
    .campaign-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
    .campaign-title { font-size: 16px; font-weight: 700; color: var(--slate-800); flex: 1; margin-right: 8px; }
    .campaign-desc { font-size: 13px; color: var(--slate-500); margin-bottom: 12px; line-height: 1.5; }
    .campaign-stats { display: flex; justify-content: space-between; font-size: 13px; margin-top: 10px; }
    .campaign-raised { color: var(--blue-700); font-weight: 700; }
    .campaign-goal { color: var(--slate-500); }
    .days-left { font-weight: 700; color: var(--red); }
    .days-safe { font-weight: 700; color: var(--slate-500); }
    .donate-quick-btn {
      width: 100%; margin-top: 12px; padding: 12px;
      background: var(--blue-600); color: white; border: none;
      border-radius: var(--radius-md); font-family: var(--font-body);
      font-size: 14px; font-weight: 700; cursor: pointer;
      transition: background 0.2s;
    }
    .donate-quick-btn:hover { background: var(--blue-700); }

    /* History */
    .summary-row {
      display: grid; grid-template-columns: 1fr 1fr 1fr;
      gap: 10px; margin-bottom: 20px;
    }
    .sum-card { background: white; border-radius: var(--radius-lg); padding: 16px; box-shadow: var(--shadow-md); text-align: center; }
    .sum-val { font-family: var(--font-display); font-size: 18px; color: var(--blue-700); }
    .sum-lbl { font-size: 11px; color: var(--slate-500); margin-top: 2px; text-transform: uppercase; letter-spacing: 0.3px; }

    .tx-card {
      background: white; border-radius: var(--radius-lg); padding: 16px;
      box-shadow: var(--shadow-sm); margin-bottom: 10px;
      display: flex; align-items: center; gap: 12px;
    }
    .tx-icon {
      width: 42px; height: 42px; border-radius: 50%;
      background: var(--blue-50); display: flex; align-items: center;
      justify-content: center; font-size: 20px; flex-shrink: 0;
    }
    .tx-info { flex: 1; }
    .tx-campaign { font-size: 14px; font-weight: 600; color: var(--slate-800); }
    .tx-meta { font-size: 12px; color: var(--slate-500); margin-top: 2px; }
    .tx-amount { font-family: var(--font-display); font-size: 16px; color: var(--blue-700); font-weight: 700; }
    .tx-right { text-align: right; }
    .status-dot {
      display: inline-block; width: 7px; height: 7px;
      border-radius: 50%; margin-right: 4px;
    }
    .status-completed { background: var(--green); }
    .status-pending { background: var(--gold); }
    .impact-bar {
      background: linear-gradient(135deg, var(--blue-700), var(--blue-500));
      border-radius: var(--radius-xl); padding: 24px; color: white; margin-bottom: 20px;
    }
    .impact-title { font-family: var(--font-display); font-size: 20px; margin-bottom: 12px; }
    .impact-items { display: flex; gap: 16px; flex-wrap: wrap; }
    .impact-item { text-align: center; }
    .impact-num { font-size: 28px; font-weight: 700; }
    .impact-label { font-size: 11px; opacity: 0.8; }
  `];

  _renderCampaigns() {
    const cats = ['all','Education','Facilities','Sports','Emergency'];
    const filtered = this.filter === 'all' ? CAMPAIGNS : CAMPAIGNS.filter(c => c.category === this.filter);
    return html`
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:8px;margin-bottom:16px">
        ${cats.map(c => html`
          <button class="chip ${this.filter === c ? 'active' : ''}" @click=${() => this.filter = c}>
            ${c === 'all' ? 'All' : c}
          </button>
        `)}
      </div>
      ${filtered.map(c => html`
        <div class="campaign-card" @click=${() => this.navigate('campaign-detail', {campaign: c})}>
          <img class="campaign-img" src="${c.image}" alt="${c.title}" loading="lazy" />
          <div class="campaign-body">
            <div class="campaign-header">
              <div class="campaign-title">${c.title}</div>
              <span class="badge ${c.urgent ? 'badge-red' : 'badge-blue'}">${c.urgent ? '🔥 Urgent' : c.category}</span>
            </div>
            <div class="campaign-desc">${c.description.substring(0, 100)}…</div>
            <div class="progress-bar">
              <div class="progress-fill ${c.urgent ? 'progress-fill-gold' : ''}" style="width:${Math.round(c.raised/c.goal*100)}%"></div>
            </div>
            <div class="campaign-stats">
              <span class="campaign-raised">${formatCurrency(c.raised)}</span>
              <span class="campaign-goal">of ${formatCurrency(c.goal)}</span>
              <span class="${c.daysLeft <= 14 ? 'days-left' : 'days-safe'}">${c.daysLeft}d left</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--slate-500);margin-top:4px">
              <span>${Math.round(c.raised/c.goal*100)}% funded</span>
              <span>${c.donors} donors</span>
            </div>
            <button class="donate-quick-btn"
              @click=${e => { e.stopPropagation(); this.store.openDonateModal(c); }}>
              💙 Donate Now
            </button>
          </div>
        </div>
      `)}
    `;
  }

  _renderHistory() {
    const hist = this.store.donationHistory;
    const total = hist.filter(d=>d.status==='completed').reduce((s,d)=>s+d.amount,0);
    const count = hist.length;
    const campaigns = new Set(hist.map(d=>d.campaignId)).size;
    return html`
      <div class="impact-bar">
        <div class="impact-title">✨ Your Impact</div>
        <div class="impact-items">
          <div class="impact-item">
            <div class="impact-num">${formatCurrency(total)}</div>
            <div class="impact-label">Total Given</div>
          </div>
          <div class="impact-item">
            <div class="impact-num">${count}</div>
            <div class="impact-label">Donations</div>
          </div>
          <div class="impact-item">
            <div class="impact-num">${campaigns}</div>
            <div class="impact-label">Campaigns</div>
          </div>
        </div>
      </div>

      <div class="section-title" style="margin-bottom:12px">Transaction History</div>
      ${hist.map(d => html`
        <div class="tx-card">
          <div class="tx-icon">${d.method === 'GCash' ? '📱' : d.method === 'Maya' ? '💳' : d.method === 'Credit Card' ? '💳' : '🏦'}</div>
          <div class="tx-info">
            <div class="tx-campaign">${d.campaign}</div>
            <div class="tx-meta">
              <span class="status-dot status-${d.status}"></span>
              ${d.date} · ${d.method}
            </div>
          </div>
          <div class="tx-right">
            <div class="tx-amount">${formatCurrency(d.amount)}</div>
            <div style="font-size:11px;color:var(--slate-400);margin-top:2px">${d.receipt}</div>
          </div>
        </div>
      `)}
    `;
  }

  render() {
    return html`
      <div class="page-container">
        <div class="tab-bar">
          <button class="tab-btn ${this.tab==='campaigns'?'active':''}" @click=${()=>this.tab='campaigns'}>🎯 Campaigns</button>
          <button class="tab-btn ${this.tab==='history'?'active':''}" @click=${()=>this.tab='history'}>📜 My History</button>
        </div>
        ${this.tab === 'campaigns' ? this._renderCampaigns() : this._renderHistory()}
      </div>
    `;
  }
}
customElements.define('donations-page', DonationsPage);
