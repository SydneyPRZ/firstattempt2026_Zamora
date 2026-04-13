import { LitElement, html, css } from 'lit';
import { store } from '../data/store.js';

class CampaignCard extends LitElement {
  static styles = css`
    .card {
      background: var(--surface);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-light);
      transition: var(--transition);
      cursor: pointer;
    }

    .card:active { transform: scale(0.98); }

    .card-image {
      height: 140px;
      background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      position: relative;
    }

    .tags {
      position: absolute;
      top: 10px;
      left: 10px;
      display: flex;
      gap: 6px;
    }

    .tag {
      padding: 3px 8px;
      border-radius: var(--radius-full);
      font-size: 10px;
      font-weight: 600;
      background: rgba(255,255,255,0.95);
      color: var(--primary);
    }

    .tag.urgent {
      background: var(--accent-red);
      color: white;
    }

    .card-body { padding: 14px 16px; }

    .category {
      font-size: 11px;
      font-weight: 600;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    .title {
      font-family: var(--font-display);
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 6px;
      line-height: 1.3;
    }

    .desc {
      font-size: 13px;
      color: var(--text-secondary);
      margin-bottom: 12px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .progress-wrap { margin-bottom: 10px; }

    .progress-bar {
      height: 6px;
      background: var(--surface-3);
      border-radius: var(--radius-full);
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
      border-radius: var(--radius-full);
      transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .progress-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 6px;
    }

    .raised {
      font-size: 13px;
      font-weight: 700;
      color: var(--primary);
    }

    .goal {
      font-size: 12px;
      color: var(--text-muted);
    }

    .meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid var(--border-light);
      padding-top: 10px;
      margin-top: 10px;
    }

    .donors {
      font-size: 12px;
      color: var(--text-secondary);
    }

    .btn-donate {
      background: var(--primary);
      color: white;
      border: none;
      border-radius: var(--radius-full);
      padding: 7px 16px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition);
    }

    .btn-donate:hover { background: var(--primary-dark); }

    .deadline {
      font-size: 11px;
      color: var(--text-muted);
    }
  `;

  static properties = {
    campaign: { type: Object },
    compact: { type: Boolean },
  };

  _percent(c) {
    return Math.min(100, Math.round((c.raised / c.goal) * 100));
  }

  _fmt(n) {
    return '₱' + n.toLocaleString('en-PH');
  }

  _viewCampaign(e) {
    e.stopPropagation();
    store.navigate('campaign-detail', { currentCampaignId: this.campaign.id });
  }

  _donate(e) {
    e.stopPropagation();
    store.navigate('donate-flow', { currentCampaignId: this.campaign.id });
  }

  _emoji(cat) {
    return { Infrastructure: '🏗️', Scholarship: '🎓', Education: '📚', Sports: '⚽' }[cat] || '💙';
  }

  render() {
    const c = this.campaign;
    const pct = this._percent(c);
    return html`
      <div class="card" @click=${this._viewCampaign}>
        <div class="card-image">
          ${this._emoji(c.category)}
          <div class="tags">
            ${c.featured ? html`<span class="tag">Featured</span>` : ''}
            ${c.urgent ? html`<span class="tag urgent">⚡ Urgent</span>` : ''}
          </div>
        </div>
        <div class="card-body">
          <div class="category">${c.category}</div>
          <div class="title">${c.title}</div>
          <div class="desc">${c.shortDesc}</div>
          <div class="progress-wrap">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${pct}%"></div>
            </div>
            <div class="progress-info">
              <span class="raised">${this._fmt(c.raised)} raised</span>
              <span class="goal">of ${this._fmt(c.goal)}</span>
            </div>
          </div>
          <div class="meta">
            <span class="donors">👥 ${c.donors} donors</span>
            <button class="btn-donate" @click=${this._donate}>Donate Now</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('campaign-card', CampaignCard);
