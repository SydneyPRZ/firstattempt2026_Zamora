import { html, css } from 'lit';
import { BaseComponent } from '../../utils/base-component.js';
import { ADMIN_STATS, CAMPAIGNS, BATCH_LEADERBOARD, TOP_DONORS, formatCurrency } from '../../data/mock-data.js';
import { sharedStyles } from '../../styles/shared.js';

export class AdminDashboard extends BaseComponent {
  static properties = { tab: {type:String}, showNewCampaign: {type:Boolean} };
  constructor() { super(); this.tab = 'overview'; this.showNewCampaign = false; }

  static styles = [sharedStyles, css`
    .admin-header {
      background: linear-gradient(135deg, var(--blue-900), var(--blue-700));
      padding: calc(var(--top-bar-height) + 20px) 20px 24px;
      color: white;
    }
    .admin-title { font-family: var(--font-display); font-size: 24px; margin-bottom: 4px; }
    .admin-sub { opacity: 0.75; font-size: 14px; }
    .admin-kpis { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 16px 0; }
    .kpi-card {
      background: rgba(255,255,255,0.12); border-radius: var(--radius-lg);
      padding: 16px; backdrop-filter: blur(4px);
    }
    .kpi-val { font-family: var(--font-display); font-size: 22px; color: white; }
    .kpi-lbl { font-size: 11px; opacity: 0.75; text-transform: uppercase; letter-spacing: 0.4px; margin-top: 2px; }
    .kpi-trend { font-size: 12px; margin-top: 6px; }
    .trend-up { color: #6ee7b7; }
    .trend-dn { color: #fca5a5; }

    .tab-bar {
      display: flex; background: var(--slate-100);
      border-radius: var(--radius-md); padding: 3px;
      margin: 16px 16px 0; overflow-x: auto;
    }
    .tab-bar::-webkit-scrollbar { display: none; }
    .tab-btn {
      flex: 1; padding: 9px 6px; border: none; border-radius: 8px;
      background: transparent; cursor: pointer; font-size: 11px; font-weight: 700;
      color: var(--slate-500); font-family: var(--font-body); transition: all 0.2s;
      white-space: nowrap;
    }
    .tab-btn.active { background: white; color: var(--blue-700); box-shadow: var(--shadow-sm); }
    .content { padding: 16px 16px 80px; }

    /* Bar Chart */
    .chart-container { background: white; border-radius: var(--radius-lg); padding: 20px; box-shadow: var(--shadow-md); margin-bottom: 16px; }
    .chart-title { font-size: 14px; font-weight: 700; color: var(--slate-700); margin-bottom: 16px; }
    .bar-chart { display: flex; align-items: flex-end; gap: 8px; height: 100px; }
    .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .bar { width: 100%; border-radius: 4px 4px 0 0; background: linear-gradient(180deg, var(--blue-400), var(--blue-600)); min-height: 4px; transition: height 0.5s; }
    .bar-label { font-size: 10px; color: var(--slate-500); }

    /* Donut */
    .cat-breakdown { display: flex; flex-direction: column; gap: 10px; }
    .cat-row { display: flex; align-items: center; gap: 10px; }
    .cat-color { width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0; }
    .cat-name { font-size: 13px; color: var(--slate-700); flex: 1; }
    .cat-pct { font-size: 13px; font-weight: 700; color: var(--slate-800); }
    .cat-bar { flex: 2; height: 6px; background: var(--slate-100); border-radius: 999px; overflow: hidden; }
    .cat-fill { height: 100%; border-radius: 999px; }

    /* Campaign management */
    .campaign-row {
      background: white; border-radius: var(--radius-lg); padding: 16px;
      box-shadow: var(--shadow-sm); margin-bottom: 10px;
    }
    .campaign-row-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
    .campaign-row-title { font-size: 14px; font-weight: 700; color: var(--slate-800); flex: 1; margin-right: 8px; }
    .action-row { display: flex; gap: 8px; margin-top: 10px; }
    .act-btn {
      flex: 1; padding: 8px; border-radius: var(--radius-sm); border: none;
      font-size: 12px; font-weight: 700; cursor: pointer; font-family: var(--font-body);
      transition: all 0.15s;
    }
    .act-edit { background: var(--blue-50); color: var(--blue-700); }
    .act-pause { background: var(--gold-light); color: #92400e; }
    .act-view { background: var(--slate-100); color: var(--slate-600); }

    /* New Campaign Form */
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(15,23,42,0.55);
      z-index: 200; display: flex; align-items: flex-end;
      backdrop-filter: blur(4px);
    }
    .form-sheet {
      width: 100%; max-width: 480px; margin: 0 auto;
      background: white; border-radius: var(--radius-xl) var(--radius-xl) 0 0;
      padding: 0 0 32px; max-height: 88vh; overflow-y: auto;
    }
    .form-handle { width: 40px; height: 4px; background: var(--slate-200); border-radius: 2px; margin: 12px auto; }
    .form-header {
      padding: 8px 24px 16px; border-bottom: 1px solid var(--slate-100);
      display: flex; justify-content: space-between; align-items: center;
    }
    .form-title { font-family: var(--font-display); font-size: 20px; }
    .close-btn {
      width: 32px; height: 32px; border-radius: 50%; border: none;
      background: var(--slate-100); cursor: pointer; font-size: 16px;
    }
    .form-body { padding: 20px 24px; }

    /* Leaderboard */
    .lb-card {
      background: white; border-radius: var(--radius-lg); padding: 16px;
      box-shadow: var(--shadow-sm); margin-bottom: 10px;
      display: flex; align-items: center; gap: 12px;
    }
    .lb-rank { font-family: var(--font-display); font-size: 20px; width: 36px; text-align: center; }
    .lb-batch { font-size: 14px; font-weight: 700; color: var(--slate-800); }
    .lb-meta { font-size: 12px; color: var(--slate-500); }
    .lb-amount { font-family: var(--font-display); font-size: 16px; color: var(--blue-700); margin-left: auto; text-align: right; }
    .lb-change { font-size: 12px; }
    .up { color: var(--green); }
    .dn { color: var(--red); }
    .add-btn {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      width: 100%; padding: 14px; background: var(--blue-600); color: white;
      border: none; border-radius: var(--radius-md); font-family: var(--font-body);
      font-size: 14px; font-weight: 700; cursor: pointer; margin-bottom: 16px;
    }
  `];

  _renderOverview() {
    const s = ADMIN_STATS;
    const maxAmt = Math.max(...s.monthlyData.map(d=>d.amount));
    const cats = [
      { name: 'Education', pct: 36, color: '#3b82f6' },
      { name: 'Facilities', pct: 29, color: '#10b981' },
      { name: 'Emergency', pct: 20, color: '#ef4444' },
      { name: 'Sports', pct: 15, color: '#f59e0b' }
    ];
    return html`
      <div class="chart-container">
        <div class="chart-title">📈 Monthly Donations (₱)</div>
        <div class="bar-chart">
          ${s.monthlyData.map(d => html`
            <div class="bar-col">
              <div class="bar" style="height:${Math.round(d.amount/maxAmt*90)}px" title="${formatCurrency(d.amount)}"></div>
              <div class="bar-label">${d.month}</div>
            </div>
          `)}
        </div>
      </div>

      <div class="chart-container">
        <div class="chart-title">🍩 By Category</div>
        <div class="cat-breakdown">
          ${cats.map(c => html`
            <div class="cat-row">
              <div class="cat-color" style="background:${c.color}"></div>
              <div class="cat-name">${c.name}</div>
              <div class="cat-bar"><div class="cat-fill" style="width:${c.pct}%;background:${c.color}"></div></div>
              <div class="cat-pct">${c.pct}%</div>
            </div>
          `)}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="stat-card">
          <div class="stat-value" style="font-size:20px">₱1.48M</div>
          <div class="stat-label">Total Raised</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="font-size:20px">465</div>
          <div class="stat-label">Total Donors</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="font-size:20px">4</div>
          <div class="stat-label">Active Campaigns</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="font-size:20px;color:var(--green)">+18.5%</div>
          <div class="stat-label">Monthly Growth</div>
        </div>
      </div>
    `;
  }

  _renderCampaigns() {
    return html`
      <button class="add-btn" @click=${() => this.showNewCampaign = true}>
        ➕ Create New Campaign
      </button>
      ${CAMPAIGNS.map(c => html`
        <div class="campaign-row">
          <div class="campaign-row-header">
            <div class="campaign-row-title">${c.title}</div>
            <span class="badge ${c.urgent ? 'badge-red' : 'badge-blue'}">${c.urgent ? 'Urgent' : c.category}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${Math.round(c.raised/c.goal*100)}%"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-top:6px;color:var(--slate-500)">
            <span>${formatCurrency(c.raised)} of ${formatCurrency(c.goal)}</span>
            <span>${Math.round(c.raised/c.goal*100)}% · ${c.donors} donors</span>
          </div>
          <div class="action-row">
            <button class="act-btn act-edit">✏️ Edit</button>
            <button class="act-btn act-pause">⏸ Pause</button>
            <button class="act-btn act-view" @click=${()=>this.navigate('campaign-detail',{campaign:c})}>👁 View</button>
          </div>
        </div>
      `)}
    `;
  }

  _renderLeaderboard() {
    return html`
      <div class="section-title" style="margin-bottom:4px">🏆 Batch Leaderboard</div>
      <div class="section-subtitle">Ranked by total donations</div>
      ${BATCH_LEADERBOARD.map(b => html`
        <div class="lb-card">
          <div class="lb-rank">${b.rank === 1 ? '🥇' : b.rank === 2 ? '🥈' : b.rank === 3 ? '🥉' : '#'+b.rank}</div>
          <div>
            <div class="lb-batch">${b.batch}</div>
            <div class="lb-meta">${b.members} members · avg ${formatCurrency(b.avgDonation)}</div>
          </div>
          <div class="lb-amount">
            <div>${formatCurrency(b.totalDonated)}</div>
            <div class="lb-change ${b.trend === 'up' ? 'up' : 'dn'}">${b.trend === 'up' ? '▲' : '▼'} ${b.change}</div>
          </div>
        </div>
      `)}
    `;
  }

  _renderNewCampaignForm() {
    return html`
      <div class="modal-overlay" @click=${e => e.target === e.currentTarget && (this.showNewCampaign = false)}>
        <div class="form-sheet">
          <div class="form-handle"></div>
          <div class="form-header">
            <div class="form-title">New Campaign</div>
            <button class="close-btn" @click=${() => this.showNewCampaign = false}>✕</button>
          </div>
          <div class="form-body">
            <div class="input-group">
              <label class="input-label">Campaign Title</label>
              <input type="text" placeholder="e.g., Scholarship Fund 2026" />
            </div>
            <div class="input-group">
              <label class="input-label">Category</label>
              <select>
                <option>Education</option><option>Facilities</option>
                <option>Sports</option><option>Emergency</option>
              </select>
            </div>
            <div class="input-group">
              <label class="input-label">Funding Goal (₱)</label>
              <input type="number" placeholder="500000" />
            </div>
            <div class="input-group">
              <label class="input-label">End Date</label>
              <input type="date" />
            </div>
            <div class="input-group">
              <label class="input-label">Description</label>
              <textarea rows="3" placeholder="Describe the campaign purpose..."></textarea>
            </div>
            <div class="input-group">
              <label class="input-label">Campaign Story</label>
              <textarea rows="4" placeholder="Tell the full story to inspire donors..."></textarea>
            </div>
            <div style="margin-bottom:12px">
              <label class="input-label">Preset Donation Amounts (₱)</label>
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
                ${[100,250,500,1000,2500,5000].map(a => html`
                  <input type="number" .value=${String(a)} style="text-align:center;padding:10px 8px" />
                `)}
              </div>
            </div>
            <div style="display:flex;gap:8px">
              <button class="btn btn-ghost btn-full" @click=${() => this.showNewCampaign = false}>Cancel</button>
              <button class="btn btn-primary btn-full" @click=${() => { alert('Campaign created! (mock)'); this.showNewCampaign = false; }}>
                🚀 Publish Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const s = ADMIN_STATS;
    return html`
      <div>
        <div class="admin-header">
          <div class="admin-title">Admin Dashboard</div>
          <div class="admin-sub">AlumniGive Management Portal</div>
          <div class="admin-kpis">
            <div class="kpi-card">
              <div class="kpi-val">${formatCurrency(s.totalRaised)}</div>
              <div class="kpi-lbl">Total Raised</div>
              <div class="kpi-trend trend-up">▲ +18.5% this month</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-val">${s.totalDonors}</div>
              <div class="kpi-lbl">Total Donors</div>
              <div class="kpi-trend trend-up">▲ +24 new this month</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-val">${s.activeCampaigns}</div>
              <div class="kpi-lbl">Active Campaigns</div>
              <div class="kpi-trend trend-up">2 ending soon</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-val">₱3,190</div>
              <div class="kpi-lbl">Avg Donation</div>
              <div class="kpi-trend trend-up">▲ +8% vs last month</div>
            </div>
          </div>
        </div>

        <div class="tab-bar">
          <button class="tab-btn ${this.tab==='overview'?'active':''}" @click=${()=>this.tab='overview'}>📊 Overview</button>
          <button class="tab-btn ${this.tab==='campaigns'?'active':''}" @click=${()=>this.tab='campaigns'}>🎯 Campaigns</button>
          <button class="tab-btn ${this.tab==='leaderboard'?'active':''}" @click=${()=>this.tab='leaderboard'}>🏆 Leaderboard</button>
        </div>

        <div class="content">
          ${this.tab === 'overview' ? this._renderOverview() : ''}
          ${this.tab === 'campaigns' ? this._renderCampaigns() : ''}
          ${this.tab === 'leaderboard' ? this._renderLeaderboard() : ''}
        </div>

        <div style="position:fixed;bottom:16px;left:0;right:0;padding:0 16px;max-width:480px;margin:0 auto">
          <button class="btn btn-ghost" style="width:100%;background:white"
            @click=${() => this.store.logout()}>🚪 Sign Out</button>
        </div>

        ${this.showNewCampaign ? this._renderNewCampaignForm() : ''}
      </div>
    `;
  }
}
customElements.define('admin-dashboard', AdminDashboard);
