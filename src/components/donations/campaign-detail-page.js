import { html, css } from 'lit';
import { BaseComponent } from '../../utils/base-component.js';
import { formatCurrency } from '../../data/mock-data.js';
import { sharedStyles } from '../../styles/shared.js';

export class CampaignDetailPage extends BaseComponent {
  static styles = [sharedStyles, css`
    .hero-img { width: 100%; height: 220px; object-fit: cover; display: block; margin-top: -16px; }
    .content { padding: 20px; }
    .cat-row { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
    .title { font-family: var(--font-display); font-size: 26px; color: var(--slate-800); margin-bottom: 16px; line-height: 1.25; }
    .funding-box { background: var(--blue-50); border-radius: var(--radius-lg); padding: 18px; margin-bottom: 20px; }
    .funding-amounts { display: flex; justify-content: space-between; margin-bottom: 10px; }
    .raised-amt { font-family: var(--font-display); font-size: 24px; color: var(--blue-700); }
    .goal-amt { font-size: 13px; color: var(--slate-500); align-self: flex-end; }
    .funding-meta { display: flex; justify-content: space-between; margin-top: 8px; font-size: 13px; color: var(--slate-600); }
    .story { font-size: 15px; color: var(--slate-600); line-height: 1.7; margin-bottom: 20px; }
    .section-head { font-family: var(--font-display); font-size: 18px; color: var(--slate-800); margin-bottom: 12px; }
    .benefits-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
    .benefit-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--slate-700); }
    .testimonials { display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px; }
    .testimonial {
      background: white; border-radius: var(--radius-lg); padding: 16px;
      box-shadow: var(--shadow-sm); border-left: 4px solid var(--blue-400);
    }
    .testimonial-text { font-size: 14px; color: var(--slate-600); line-height: 1.6; margin-bottom: 12px; font-style: italic; }
    .testimonial-author { display: flex; align-items: center; gap: 8px; }
    .author-name { font-size: 13px; font-weight: 700; color: var(--slate-700); }
    .donate-sticky {
      position: sticky; bottom: calc(var(--nav-height) + 12px);
      margin: 0 -20px -20px; padding: 16px 20px;
      background: white; box-shadow: 0 -4px 20px rgba(0,0,0,0.08);
      border-top: 1px solid var(--slate-100);
    }
    .donate-btn {
      width: 100%; padding: 16px;
      background: linear-gradient(135deg, var(--blue-700), var(--blue-500));
      color: white; border: none; border-radius: var(--radius-lg);
      font-family: var(--font-display); font-size: 18px; cursor: pointer;
      box-shadow: var(--shadow-blue); transition: all 0.2s;
    }
    .donate-btn:hover { transform: translateY(-1px); box-shadow: 0 12px 30px rgba(37,99,235,0.4); }
    .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
  `];

  render() {
    const c = this.store.currentCampaign;
    if (!c) return html`<div class="page-container"><p>Campaign not found.</p></div>`;
    const pct = Math.round(c.raised / c.goal * 100);

    return html`
      <div style="padding-top:var(--top-bar-height)">
        <img class="hero-img" src="${c.image}" alt="${c.title}" />
        <div class="content">
          <div class="cat-row">
            <span class="badge ${c.urgent ? 'badge-red' : 'badge-blue'}">${c.urgent ? '🔥 Urgent' : c.category}</span>
            <span class="badge badge-slate">🕐 ${c.daysLeft} days left</span>
          </div>

          <div class="title">${c.title}</div>

          <div class="funding-box">
            <div class="funding-amounts">
              <div class="raised-amt">${formatCurrency(c.raised)}</div>
              <div class="goal-amt">of ${formatCurrency(c.goal)} goal</div>
            </div>
            <div class="progress-bar" style="height:10px">
              <div class="progress-fill ${c.urgent ? 'progress-fill-gold' : ''}" style="width:${pct}%"></div>
            </div>
            <div class="funding-meta">
              <span><strong>${pct}%</strong> funded</span>
              <span><strong>${c.donors}</strong> donors</span>
              <span><strong>${c.daysLeft}</strong> days left</span>
            </div>
          </div>

          <div class="tags">
            ${c.tags.map(t => html`<span class="chip">#${t}</span>`)}
          </div>

          <div class="section-head">📖 About this Campaign</div>
          <div class="story">${c.story}</div>

          <div class="section-head">🎁 Donor Benefits</div>
          <div class="benefits-list">
            ${c.benefits.map(b => html`
              <div class="benefit-item">✅ ${b}</div>
            `)}
          </div>

          ${c.testimonials?.length ? html`
            <div class="section-head">💬 What People Say</div>
            <div class="testimonials">
              ${c.testimonials.map(t => html`
                <div class="testimonial">
                  <div class="testimonial-text">"${t.text}"</div>
                  <div class="testimonial-author">
                    <img class="avatar" src="${t.avatar}" alt="${t.name}" />
                    <div class="author-name">${t.name}</div>
                  </div>
                </div>
              `)}
            </div>
          ` : ''}

          <div class="donate-sticky">
            <button class="donate-btn" @click=${() => this.store.openDonateModal(c)}>
              💙 Donate Now
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('campaign-detail-page', CampaignDetailPage);
