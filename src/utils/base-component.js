/**
 * BaseComponent
 * All AlumniGive LitElement components extend this.
 *
 * Features:
 *  - Store subscription + auto requestUpdate
 *  - navigate() shortcut
 *  - isOnline getter
 *  - shouldUpdate guard to skip unnecessary re-renders
 */
import { LitElement } from 'lit';
import { store } from '../data/store.js';

export class BaseComponent extends LitElement {
  constructor() {
    super();
    this._storeUnsub = null;
    this._prevStoreSnapshot = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._storeUnsub = store.subscribe(() => this.requestUpdate());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._storeUnsub) { this._storeUnsub(); this._storeUnsub = null; }
  }

  get store()    { return store; }
  get isOnline() { return store.isOnline; }

  navigate(page, data) { store.navigate(page, data); }

  // Utility: format currency (available in all components)
  fmt(n) { return '₱' + (n || 0).toLocaleString('en-PH'); }
}
