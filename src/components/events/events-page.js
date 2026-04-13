import { html, css } from 'lit';
import { BaseComponent } from '../../utils/base-component.js';
import { EVENTS } from '../../data/mock-data.js';
import { sharedStyles } from '../../styles/shared.js';

export class EventsPage extends BaseComponent {
  static properties = { view: {type:String}, filter: {type:String}, search: {type:String}, rsvpd: {type:Object} };

  constructor() {
    super();
    this.view = 'list';
    this.filter = 'all';
    this.search = '';
    this.rsvpd = {};
  }

  static styles = [sharedStyles, css`
    .view-toggle {
      display: flex; gap: 0; background: var(--slate-100);
      border-radius: var(--radius-md); padding: 3px;
      margin-bottom: 16px;
    }
    .view-btn {
      flex: 1; padding: 9px; border: none; border-radius: 8px;
      background: transparent; cursor: pointer; font-size: 13px;
      font-weight: 600; color: var(--slate-500); font-family: var(--font-body);
      transition: all 0.2s;
    }
    .view-btn.active { background: white; color: var(--blue-700); box-shadow: var(--shadow-sm); }
    .search-bar {
      position: relative; margin-bottom: 14px;
    }
    .search-bar input {
      padding-left: 40px; background: white; border-color: var(--slate-200);
    }
    .search-icon {
      position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
      font-size: 16px; pointer-events: none;
    }
    .filters { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; margin-bottom: 20px; }
    .filters::-webkit-scrollbar { display: none; }

    .event-card {
      background: white; border-radius: var(--radius-lg);
      overflow: hidden; box-shadow: var(--shadow-md);
      margin-bottom: 14px; cursor: pointer;
      transition: transform 0.2s;
    }
    .event-card:hover { transform: translateY(-2px); }
    .event-img { width: 100%; height: 140px; object-fit: cover; display: block; }
    .event-body { padding: 16px; }
    .event-meta {
      display: flex; justify-content: space-between;
      align-items: center; margin-bottom: 8px;
    }
    .event-date { font-size: 12px; color: var(--blue-600); font-weight: 700; }
    .event-title { font-size: 16px; font-weight: 700; color: var(--slate-800); margin-bottom: 6px; }
    .event-loc { font-size: 13px; color: var(--slate-500); margin-bottom: 12px; }
    .event-footer { display: flex; justify-content: space-between; align-items: center; }
    .attendees { font-size: 12px; color: var(--slate-500); }
    .rsvp-btn {
      padding: 8px 18px; border-radius: var(--radius-md); border: none;
      font-family: var(--font-body); font-size: 13px; font-weight: 700;
      cursor: pointer; transition: all 0.2s;
    }
    .rsvp-btn.attending {
      background: var(--green-light); color: #065f46;
    }
    .rsvp-btn.default {
      background: var(--blue-600); color: white; box-shadow: var(--shadow-blue);
    }
    .rsvp-btn.default:hover { background: var(--blue-700); }

    /* Calendar View */
    .calendar { background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); overflow: hidden; margin-bottom: 16px; }
    .cal-header { background: var(--blue-700); color: white; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; }
    .cal-title { font-family: var(--font-display); font-size: 18px; }
    .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; }
    .cal-day-name { padding: 10px 4px; font-size: 11px; font-weight: 700; color: var(--slate-500); text-transform: uppercase; }
    .cal-day {
      padding: 8px 4px; font-size: 13px; color: var(--slate-600);
      cursor: pointer; transition: background 0.15s;
      border-radius: 6px; margin: 2px;
    }
    .cal-day:hover { background: var(--blue-50); }
    .cal-day.has-event { background: var(--blue-100); color: var(--blue-700); font-weight: 700; }
    .cal-day.today { background: var(--blue-600); color: white; border-radius: 50%; font-weight: 700; }
    .cal-day.other-month { color: var(--slate-300); }
    .fee-badge { font-size: 12px; font-weight: 700; color: var(--gold); }
    .free-badge { font-size: 12px; font-weight: 700; color: var(--green); }
  `];

  get filtered() {
    let evts = EVENTS;
    if (this.filter !== 'all') evts = evts.filter(e => e.category.toLowerCase() === this.filter);
    if (this.search) evts = evts.filter(e => e.title.toLowerCase().includes(this.search.toLowerCase()) || e.location.toLowerCase().includes(this.search.toLowerCase()));
    return evts;
  }

  _toggleRsvp(id) {
    this.rsvpd = { ...this.rsvpd, [id]: !this.rsvpd[id] };
  }

  _renderCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const eventDays = EVENTS.map(e => new Date(e.date).getDate());
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(html`<div class="cal-day other-month"></div>`);
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === now.getDate();
      const hasEvent = eventDays.includes(d);
      cells.push(html`<div class="cal-day ${isToday ? 'today' : ''} ${hasEvent && !isToday ? 'has-event' : ''}">${d}</div>`);
    }

    const monthName = now.toLocaleString('default', { month: 'long', year: 'numeric' });
    return html`
      <div class="calendar">
        <div class="cal-header">
          <div class="cal-title">${monthName}</div>
          <span>📅</span>
        </div>
        <div style="padding:12px">
          <div class="cal-grid">
            ${days.map(d => html`<div class="cal-day-name">${d}</div>`)}
            ${cells}
          </div>
        </div>
        <div style="padding:0 12px 12px;font-size:12px;color:var(--blue-600)">
          🔵 = Event date
        </div>
      </div>
    `;
  }

  _renderEventCard(e) {
    const attending = this.rsvpd[e.id];
    return html`
      <div class="event-card">
        <img class="event-img" src="${e.image}" alt="${e.title}" loading="lazy" />
        <div class="event-body">
          <div class="event-meta">
            <span class="badge badge-blue">${e.category}</span>
            ${e.fee > 0 ? html`<span class="fee-badge">₱${e.fee.toLocaleString()}</span>` : html`<span class="free-badge">FREE</span>`}
          </div>
          <div class="event-title">${e.title}</div>
          <div class="event-date">📅 ${new Date(e.date).toLocaleDateString('en-PH', { weekday:'short', year:'numeric', month:'long', day:'numeric' })} · ${e.time}</div>
          <div class="event-loc">📍 ${e.location}</div>
          <div class="event-footer">
            <div class="attendees">👤 ${e.attendees}/${e.maxAttendees} going</div>
            <button class="rsvp-btn ${attending ? 'attending' : 'default'}"
              @click=${(ev) => { ev.stopPropagation(); this._toggleRsvp(e.id); }}>
              ${attending ? '✅ Going' : 'RSVP'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const categories = ['all', 'social', 'career', 'reunion', 'professional', 'charity'];
    return html`
      <div class="page-container">
        <div class="view-toggle">
          <button class="view-btn ${this.view === 'list' ? 'active' : ''}" @click=${() => this.view = 'list'}>📋 List</button>
          <button class="view-btn ${this.view === 'calendar' ? 'active' : ''}" @click=${() => this.view = 'calendar'}>📅 Calendar</button>
        </div>

        <div class="search-bar">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Search events..." .value=${this.search}
            @input=${e => this.search = e.target.value} />
        </div>

        <div class="filters">
          ${categories.map(c => html`
            <button class="chip ${this.filter === c ? 'active' : ''}" @click=${() => this.filter = c}>
              ${c === 'all' ? 'All Events' : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          `)}
        </div>

        ${this.view === 'calendar' ? this._renderCalendar() : ''}

        ${this.filtered.length === 0 ? html`
          <div class="empty-state">
            <div class="empty-state-icon">📅</div>
            <div class="empty-state-title">No events found</div>
            <div class="empty-state-desc">Try changing your search or filters</div>
          </div>
        ` : this.filtered.map(e => this._renderEventCard(e))}
      </div>
    `;
  }
}
customElements.define('events-page', EventsPage);
