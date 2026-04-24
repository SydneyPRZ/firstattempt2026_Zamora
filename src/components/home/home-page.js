import { html, css } from 'lit';
import { BaseComponent } from '../../utils/base-component.js';
import { CAMPAIGNS, TOP_DONORS, formatCurrency } from '../../data/mock-data.js';
import { sharedStyles } from '../../styles/shared.js';

export class HomePage extends BaseComponent {
  static styles = [sharedStyles, css`
    .hero-card {
      background: linear-gradient(135deg, var(--blue-800) 0%, var(--blue-600) 100%);
      border-radius: var(--radius-xl);
      padding: 28px 24px;
      color: white;
      margin-bottom: 24px;
      position: relative;
      overflow: hidden;
    }
    .hero-card::before {
      content: '';
      position: absolute; top: -30px; right: -20px;
      width: 160px; height: 160px; border-radius: 50%;
      background: rgba(255,255,255,0.07);
    }
    .hero-card::after {
      content: '';
      position: absolute; bottom: -40px; left: 10px;
      width: 120px; height: 120px; border-radius: 50%;
      background: rgba(255,255,255,0.05);
    }
    .greeting { font-size: 14px; opacity: 0.8; margin-bottom: 4px; }
    .user-name { font-family: var(--font-display); font-size: 24px; margin-bottom: 16px; }
    .hero-stats { display: flex; gap: 20px; }
    .hero-stat { flex: 1; }
    .hero-stat-val { font-family: var(--font-display); font-size: 22px; }
    .hero-stat-label { font-size: 11px; opacity: 0.75; text-transform: uppercase; letter-spacing: 0.5px; }
    .quick-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
    .q-stat {
      background: white; border-radius: var(--radius-lg); padding: 18px 16px;
      box-shadow: var(--shadow-md);
    }
    .q-stat-icon { font-size: 28px; margin-bottom: 8px; }
    .q-stat-val { font-family: var(--font-display); font-size: 20px; color: var(--slate-800); }
    .q-stat-lbl { font-size: 12px; color: var(--slate-500); margin-top: 2px; }

    .campaign-scroll {
      display: flex; gap: 14px; overflow-x: auto;
      padding-bottom: 8px; scroll-snap-type: x mandatory;
    }
    .campaign-scroll::-webkit-scrollbar { display: none; }

    .campaign-card {
      min-width: 220px; background: white;
      border-radius: var(--radius-lg); overflow: hidden;
      box-shadow: var(--shadow-md); scroll-snap-align: start;
      cursor: pointer; transition: transform 0.2s;
    }
    .campaign-card:hover { transform: translateY(-3px); }
    .campaign-img {
      width: 100%; height: 110px;
      object-fit: cover; display: block;
    }
    .campaign-body { padding: 14px; }
    .campaign-cat {
      font-size: 10px; font-weight: 700; color: var(--blue-600);
      text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;
    }
    .campaign-title {
      font-size: 14px; font-weight: 700; color: var(--slate-800);
      margin-bottom: 10px; line-height: 1.35;
    }
    .urgent-banner {
      background: var(--red-light); color: #991b1b;
      font-size: 11px; font-weight: 700;
      padding: 6px 12px; border-radius: var(--radius-sm);
      display: flex; align-items: center; gap: 4px;
      margin-bottom: 12px;
    }
    .top-donors { display: flex; flex-direction: column; gap: 10px; }
    .donor-row {
      display: flex; align-items: center; gap: 12px;
      background: white; border-radius: var(--radius-md);
      padding: 14px 16px; box-shadow: var(--shadow-sm);
    }
    .donor-rank {
      font-family: var(--font-display); font-size: 18px;
      color: var(--slate-300); width: 28px; text-align: center;
    }
    .donor-rank.top1 { color: var(--gold); }
    .donor-rank.top2 { color: var(--slate-400); }
    .donor-rank.top3 { color: #cd7f32; }
    .donor-info { flex: 1; }
    .donor-name { font-size: 14px; font-weight: 700; color: var(--slate-800); }
    .donor-batch { font-size: 12px; color: var(--slate-500); }
    .donor-amount { font-family: var(--font-display); font-size: 16px; color: var(--blue-700); }
  `];

  render() {
    const user = this.store.currentUser;
    const featured = CAMPAIGNS.filter(c => c.featured);
    const urgent = CAMPAIGNS.filter(c => c.urgent);
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    return html`
      <div class="page-container">
        <!-- Hero Card -->
        <div class="hero-card">
          <div class="greeting">${greeting} 👋</div>
          <div class="user-name">${user?.name?.split(' ')[0] || 'Alumni'}</div>
          <div class="hero-stats">
            <div class="hero-stat">
              <div class="hero-stat-val">${formatCurrency(user?.totalDonated || 0)}</div>
              <div class="hero-stat-label">Total Given</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-val">${user?.donationCount || 0}</div>
              <div class="hero-stat-label">Donations</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-val">Batch '${user?.batch || '--'}</div>
              <div class="hero-stat-label">Your Batch</div>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="quick-stats">
          <div class="q-stat">
            <div class="q-stat-icon">🎯</div>
            <div class="q-stat-val">4</div>
            <div class="q-stat-lbl">Active Campaigns</div>
          </div>
          <div class="q-stat">
            <div class="q-stat-icon">👥</div>
            <div class="q-stat-val">465</div>
            <div class="q-stat-lbl">Total Donors</div>
          </div>
          <div class="q-stat">
            <div class="q-stat-icon">💰</div>
            <div class="q-stat-val">₱1.48M</div>
            <div class="q-stat-lbl">Total Raised</div>
          </div>
          <div class="q-stat">
            <div class="q-stat-icon">📅</div>
            <div class="q-stat-val">5</div>
            <div class="q-stat-lbl">Upcoming Events</div>
          </div>
        </div>

        <!-- Urgent Needs -->
        ${urgent.length > 0 ? html`
          <div style="margin-bottom:24px">
            <div class="section-title">⚡ Urgent Needs</div>
            <div class="section-subtitle">These campaigns need your help now</div>
            ${urgent.map(c => html`
              <div class="campaign-card" style="min-width:auto;margin-bottom:10px"
                @click=${() => this.navigate('campaign-detail', { campaign: c })}>
                <div class="urgent-banner">⚠️ Only ${c.daysLeft} days left!</div>
                <div class="campaign-body" style="padding-top:0">
                  <div class="campaign-cat">${c.category}</div>
                  <div class="campaign-title">${c.title}</div>
                  <div class="progress-bar">
                    <div class="progress-fill progress-fill-gold" style="width:${Math.round(c.raised/c.goal*100)}%"></div>
                  </div>
                  <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:13px">
                    <span style="color:var(--slate-500)">${Math.round(c.raised/c.goal*100)}% funded</span>
                    <span style="color:var(--gold);font-weight:700">${formatCurrency(c.goal - c.raised)} to go</span>
                  </div>
                </div>
              </div>
            `)}
          </div>
        ` : ''}

        <!-- Featured Campaigns -->
        <div style="margin-bottom:24px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <div>
              <div class="section-title">Featured Campaigns</div>
            </div>
            <a style="font-size:13px;color:var(--blue-600);cursor:pointer" @click=${() => this.navigate('donations')}>See all →</a>
          </div>
          <div class="campaign-scroll">
            ${featured.map(c => html`
              <div class="campaign-card" @click=${() => this.navigate('campaign-detail', { campaign: c })}>
                <img class="campaign-img" src="${c.image}" alt="${c.title}" loading="lazy" />
                <div class="campaign-body">
                  <div class="campaign-cat">${c.category}</div>
                  <div class="campaign-title">${c.title}</div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width:${Math.round(c.raised/c.goal*100)}%"></div>
                  </div>
                  <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:12px;color:var(--slate-500)">
                    <span>${Math.round(c.raised/c.goal*100)}%</span>
                    <span>${c.donors} donors</span>
                  </div>
                </div>
              </div>
            `)}
          </div>
        </div>

        <!-- Top Donors -->
        <div style="margin-bottom:24px">
          <div class="section-title">🏆 Top Donors</div>
          <div class="section-subtitle">Our most generous alumni</div>
          <div class="top-donors">
            ${TOP_DONORS.slice(0, 5).map(d => html`
              <div class="donor-row">
                <div class="donor-rank ${d.rank <= 3 ? 'top'+d.rank : ''}">${d.rank === 1 ? '🥇' : d.rank === 2 ? '🥈' : d.rank === 3 ? '🥉' : '#'+d.rank}</div>
                <img class="avatar" src="${d.avatar}" alt="${d.name}" />
                <div class="donor-info">
                  <div class="donor-name">${d.name}</div>
                  <div class="donor-batch">Batch ${d.batch}</div>
                </div>
                <div class="donor-amount">${formatCurrency(d.amount)}</div>
              </div>
            `)}
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('home-page', HomePage);
