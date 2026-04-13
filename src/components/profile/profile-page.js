import { html, css } from 'lit';
import { BaseComponent } from '../../utils/base-component.js';
import { CERTIFICATES, ACADEMIC_RECORDS, DONATION_HISTORY, formatCurrency } from '../../data/mock-data.js';
import { sharedStyles } from '../../styles/shared.js';

export class ProfilePage extends BaseComponent {
  static properties = { tab: {type:String}, editing: {type:Boolean} };
  constructor() { super(); this.tab = 'profile'; this.editing = false; }

  static styles = [sharedStyles, css`
    .profile-hero {
      background: linear-gradient(135deg, var(--blue-800), var(--blue-600));
      padding: 32px 24px 24px; color: white;
      border-radius: 0 0 var(--radius-xl) var(--radius-xl);
      margin: calc(-1 * var(--top-bar-height) - 16px) -16px 0;
      padding-top: calc(var(--top-bar-height) + 28px);
      margin-bottom: 20px;
    }
    .profile-avatar-row { display: flex; align-items: flex-end; gap: 16px; margin-bottom: 12px; }
    .profile-avatar {
      width: 80px; height: 80px; border-radius: 50%;
      border: 3px solid rgba(255,255,255,0.5); object-fit: cover;
    }
    .profile-name { font-family: var(--font-display); font-size: 22px; }
    .profile-batch { opacity: 0.8; font-size: 14px; margin-top: 2px; }
    .profile-stats { display: flex; gap: 20px; margin-top: 12px; }
    .p-stat { text-align: center; }
    .p-stat-val { font-family: var(--font-display); font-size: 18px; }
    .p-stat-lbl { font-size: 11px; opacity: 0.75; }

    .tab-bar {
      display: flex; gap: 0; background: var(--slate-100);
      border-radius: var(--radius-md); padding: 3px; margin-bottom: 20px;
      overflow-x: auto;
    }
    .tab-bar::-webkit-scrollbar { display: none; }
    .tab-btn {
      flex: 1; padding: 9px 6px; border: none; border-radius: 8px;
      background: transparent; cursor: pointer;
      font-size: 11px; font-weight: 700; letter-spacing: 0.2px;
      color: var(--slate-500); font-family: var(--font-body);
      transition: all 0.2s; white-space: nowrap;
    }
    .tab-btn.active { background: white; color: var(--blue-700); box-shadow: var(--shadow-sm); }

    .info-card { background: white; border-radius: var(--radius-lg); padding: 20px; box-shadow: var(--shadow-md); margin-bottom: 16px; }
    .info-row { display: flex; justify-content: space-between; padding: 11px 0; border-bottom: 1px solid var(--slate-100); font-size: 14px; }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: var(--slate-500); font-weight: 500; }
    .info-val { color: var(--slate-800); font-weight: 600; text-align: right; max-width: 55%; }

    .cert-card {
      background: white; border-radius: var(--radius-lg); padding: 18px;
      box-shadow: var(--shadow-md); margin-bottom: 12px;
      border-left: 4px solid var(--blue-400);
    }
    .cert-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
    .cert-type { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--blue-600); }
    .cert-campaign { font-size: 15px; font-weight: 700; color: var(--slate-800); margin-bottom: 4px; }
    .cert-amount { font-family: var(--font-display); font-size: 20px; color: var(--blue-700); }
    .cert-meta { font-size: 12px; color: var(--slate-500); }
    .dl-btn {
      padding: 8px 16px; border-radius: var(--radius-md); border: 1.5px solid var(--blue-200);
      background: var(--blue-50); color: var(--blue-700); font-size: 13px;
      font-weight: 700; cursor: pointer; font-family: var(--font-body);
      transition: all 0.2s;
    }
    .dl-btn:hover { background: var(--blue-100); }

    .cred-card {
      background: white; border-radius: var(--radius-lg); padding: 16px;
      box-shadow: var(--shadow-sm); margin-bottom: 10px;
      display: flex; justify-content: space-between; align-items: center;
    }
    .cred-name { font-size: 14px; font-weight: 600; color: var(--slate-800); }
    .cred-type { font-size: 12px; color: var(--slate-500); margin-top: 2px; }
    .award-item {
      display: flex; align-items: center; gap: 10px;
      background: var(--gold-light); border-radius: var(--radius-md);
      padding: 12px 14px; margin-bottom: 8px;
      font-size: 14px; font-weight: 600; color: #92400e;
    }
    .logout-btn {
      width: 100%; padding: 14px; border-radius: var(--radius-md);
      border: 1.5px solid var(--red-light); background: white;
      color: var(--red); font-family: var(--font-body);
      font-size: 14px; font-weight: 700; cursor: pointer;
      margin-top: 8px; transition: all 0.2s;
    }
    .logout-btn:hover { background: var(--red-light); }
  `];

  _renderProfile() {
    const u = this.store.currentUser;
    return html`
      <div class="info-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <div style="font-weight:700;color:var(--slate-700)">Personal Information</div>
          <button class="dl-btn" @click=${() => this.editing = !this.editing}>
            ${this.editing ? '✓ Save' : '✏️ Edit'}
          </button>
        </div>
        <div class="info-row"><span class="info-label">Full Name</span><span class="info-val">${u.name}</span></div>
        <div class="info-row"><span class="info-label">Email</span><span class="info-val">${u.email}</span></div>
        <div class="info-row"><span class="info-label">Phone</span><span class="info-val">${u.phone}</span></div>
        <div class="info-row"><span class="info-label">Address</span><span class="info-val">${u.address}</span></div>
        <div class="info-row"><span class="info-label">Batch</span><span class="info-val">${u.batch}</span></div>
        <div class="info-row"><span class="info-label">Course</span><span class="info-val">${u.course}</span></div>
        <div class="info-row"><span class="info-label">Employer</span><span class="info-val">${u.employer}</span></div>
        <div class="info-row"><span class="info-label">LinkedIn</span><span class="info-val" style="color:var(--blue-600)">${u.linkedIn}</span></div>
      </div>
      <button class="logout-btn" @click=${() => this.store.logout()}>🚪 Sign Out</button>
    `;
  }

  _renderAcademic() {
    const a = ACADEMIC_RECORDS;
    return html`
      <div class="info-card">
        <div style="font-weight:700;color:var(--slate-700);margin-bottom:12px">Academic Profile</div>
        <div class="info-row"><span class="info-label">Student ID</span><span class="info-val">${a.studentId}</span></div>
        <div class="info-row"><span class="info-label">Program</span><span class="info-val">${a.program}</span></div>
        <div class="info-row"><span class="info-label">College</span><span class="info-val">${a.college}</span></div>
        <div class="info-row"><span class="info-label">Year Graduated</span><span class="info-val">${a.yearGraduated}</span></div>
        <div class="info-row"><span class="info-label">Honors</span><span class="info-val" style="color:var(--gold);font-weight:700">🏅 ${a.honors}</span></div>
        <div class="info-row"><span class="info-label">GWA</span><span class="info-val">${a.gwa}</span></div>
      </div>
      <div class="section-title" style="margin-bottom:12px">🏆 Awards & Recognition</div>
      ${a.awards.map(aw => html`<div class="award-item">⭐ ${aw}</div>`)}
      <div class="section-title" style="margin:16px 0 12px">📄 Official Documents</div>
      ${a.credentials.map(cr => html`
        <div class="cred-card">
          <div>
            <div class="cred-name">${cr.name}</div>
            <div class="cred-type">${cr.type}</div>
          </div>
          <button class="dl-btn" @click=${() => alert('Download request sent. Processing may take 3-5 business days.')}>
            ⬇️ Request
          </button>
        </div>
      `)}
    `;
  }

  _renderCerts() {
    return html`
      <div style="margin-bottom:16px">
        <div class="section-title">🏅 Certificate Vault</div>
        <div class="section-subtitle">Your donation proof and recognition certificates</div>
      </div>
      ${CERTIFICATES.map(c => html`
        <div class="cert-card">
          <div class="cert-header">
            <div>
              <div class="cert-type">${c.type}</div>
              <div class="cert-campaign">${c.campaign}</div>
              <div class="cert-meta">${c.date} · ${c.certNo}</div>
            </div>
            <div>
              <div class="cert-amount">${formatCurrency(c.amount)}</div>
              <button class="dl-btn" style="margin-top:8px;display:block;text-align:center"
                @click=${() => alert(`Certificate ${c.certNo} downloaded!`)}>
                ⬇️ Download
              </button>
            </div>
          </div>
        </div>
      `)}
    `;
  }

  render() {
    const u = this.store.currentUser;
    const totalDonated = DONATION_HISTORY.filter(d=>d.status==='completed').reduce((s,d)=>s+d.amount,0);

    return html`
      <div style="padding-top:0">
        <div class="profile-hero">
          <div class="profile-avatar-row">
            <img class="profile-avatar" src="${u.avatar}" alt="${u.name}" />
            <div>
              <div class="profile-name">${u.name}</div>
              <div class="profile-batch">🎓 Batch ${u.batch} · ${u.course}</div>
            </div>
          </div>
          <div class="profile-stats">
            <div class="p-stat">
              <div class="p-stat-val">${formatCurrency(totalDonated)}</div>
              <div class="p-stat-lbl">Total Given</div>
            </div>
            <div class="p-stat">
              <div class="p-stat-val">${DONATION_HISTORY.length}</div>
              <div class="p-stat-lbl">Donations</div>
            </div>
            <div class="p-stat">
              <div class="p-stat-val">${CERTIFICATES.length}</div>
              <div class="p-stat-lbl">Certs</div>
            </div>
          </div>
        </div>

        <div style="padding: 0 16px 80px">
          <div class="tab-bar">
            <button class="tab-btn ${this.tab==='profile'?'active':''}" @click=${()=>this.tab='profile'}>👤 Profile</button>
            <button class="tab-btn ${this.tab==='academic'?'active':''}" @click=${()=>this.tab='academic'}>🎓 Academic</button>
            <button class="tab-btn ${this.tab==='certs'?'active':''}" @click=${()=>this.tab='certs'}>🏅 Vault</button>
          </div>
          ${this.tab === 'profile' ? this._renderProfile() : ''}
          ${this.tab === 'academic' ? this._renderAcademic() : ''}
          ${this.tab === 'certs' ? this._renderCerts() : ''}
        </div>
      </div>
    `;
  }
}
customElements.define('profile-page', ProfilePage);
