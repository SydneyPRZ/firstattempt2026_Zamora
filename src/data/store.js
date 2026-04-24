/**
 * AlumniGive App Store
 * Reactive state management with localStorage persistence for offline support.
 */
import { MOCK_USERS, DONATION_HISTORY, NOTIFICATIONS } from './mock-data.js';

// ── Persistence helpers ──────────────────────────────────────────────────────
const STORAGE_KEY = 'alumgive_state';

function saveState(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

class AppStore {
  constructor() {
    const saved = loadState();

    // Restore session — user must still be valid
    const savedUser = saved?.currentUser;
    const validUser = savedUser
      ? MOCK_USERS.find(u => u.id === savedUser.id)
      : null;

    this._currentUser        = validUser ? { ...validUser, ...savedUser } : null;
    this._currentPage        = validUser
      ? (validUser.role === 'admin' ? 'admin-dashboard' : 'home')
      : 'login';
    this._currentCampaign    = null;
    this._notifications      = saved?.notifications ?? [...NOTIFICATIONS];
    this._donationHistory    = saved?.donationHistory ?? [...DONATION_HISTORY];
    this._listeners          = [];
    this._showDonateModal    = false;
    this._donateTargetCampaign = null;
    this._isOnline           = navigator.onLine;

    // Track network
    window.addEventListener('online',  () => { this._isOnline = true;  this.notify(); });
    window.addEventListener('offline', () => { this._isOnline = false; this.notify(); });
  }

  // ── Subscription ──────────────────────────────────────────────────────────
  subscribe(listener) {
    this._listeners.push(listener);
    return () => { this._listeners = this._listeners.filter(l => l !== listener); };
  }

  notify() {
    this._listeners.forEach(l => l());
    this._persist();
  }

  _persist() {
    saveState({
      currentUser:     this._currentUser,
      notifications:   this._notifications,
      donationHistory: this._donationHistory
    });
  }

  // ── Getters ───────────────────────────────────────────────────────────────
  get currentUser()            { return this._currentUser; }
  get currentPage()            { return this._currentPage; }
  get currentCampaign()        { return this._currentCampaign; }
  get notifications()          { return this._notifications; }
  get unreadCount()            { return this._notifications.filter(n => !n.read).length; }
  get donationHistory()        { return this._donationHistory; }
  get showDonateModal()        { return this._showDonateModal; }
  get donateTargetCampaign()   { return this._donateTargetCampaign; }
  get isOnline()               { return this._isOnline; }

  // ── Auth ──────────────────────────────────────────────────────────────────
  login(email, password) {
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (user) {
      this._currentUser = { ...user };
      this._currentPage = user.role === 'admin' ? 'admin-dashboard' : 'home';
      this.notify();
      return true;
    }
    return false;
  }

  logout() {
    this._currentUser = null;
    this._currentPage = 'login';
    localStorage.removeItem(STORAGE_KEY);
    this.notify();
  }

  // ── Navigation ────────────────────────────────────────────────────────────
  navigate(page, data = null) {
    this._currentPage = page;
    if (data?.campaign) this._currentCampaign = data.campaign;
    this.notify();
  }

  // ── Donations ─────────────────────────────────────────────────────────────
  openDonateModal(campaign) {
    this._donateTargetCampaign = campaign;
    this._showDonateModal = true;
    this.notify();
  }

  closeDonateModal() {
    this._showDonateModal = false;
    this._donateTargetCampaign = null;
    this.notify();
  }

  submitDonation(donation) {
    const newDonation = {
      id: 'd' + Date.now(),
      ...donation,
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      receipt: 'RCP-' + Date.now()
    };
    this._donationHistory.unshift(newDonation);
    if (this._currentUser) {
      this._currentUser.totalDonated = (this._currentUser.totalDonated || 0) + donation.amount;
      this._currentUser.donationCount = (this._currentUser.donationCount || 0) + 1;
    }
    this._showDonateModal = false;
    this._donateTargetCampaign = null;
    this._notifications.unshift({
      id: 'n' + Date.now(), type: 'transaction',
      title: 'Donation confirmed!',
      message: `Your ₱${donation.amount.toLocaleString()} donation to "${donation.campaign}" has been received.`,
      time: 'Just now', read: false, icon: '✅'
    });
    this.notify();
    return newDonation;
  }

  // ── Notifications ─────────────────────────────────────────────────────────
  markAllNotificationsRead() {
    this._notifications = this._notifications.map(n => ({ ...n, read: true }));
    this.notify();
  }

  markNotificationRead(id) {
    this._notifications = this._notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    this.notify();
  }
}

export const store = new AppStore();
