import { css } from 'lit';

export const sharedStyles = css`
  :host { display: block; }

  .card {
    background: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }

  .card-body { padding: 20px; }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: var(--radius-md);
    border: none;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    white-space: nowrap;
  }

  .btn-primary {
    background: var(--blue-600);
    color: white;
    box-shadow: var(--shadow-blue);
  }

  .btn-primary:hover {
    background: var(--blue-700);
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(37,99,235,0.35);
  }

  .btn-secondary {
    background: var(--blue-50);
    color: var(--blue-700);
    border: 1.5px solid var(--blue-200);
  }

  .btn-secondary:hover { background: var(--blue-100); }

  .btn-ghost {
    background: transparent;
    color: var(--slate-600);
    border: 1.5px solid var(--slate-200);
  }

  .btn-ghost:hover { background: var(--slate-50); }

  .btn-danger { background: var(--red); color: white; }

  .btn-sm { padding: 8px 16px; font-size: 13px; }
  .btn-lg { padding: 16px 32px; font-size: 16px; border-radius: var(--radius-lg); }
  .btn-full { width: 100%; }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .badge-blue { background: var(--blue-100); color: var(--blue-700); }
  .badge-green { background: var(--green-light); color: #065f46; }
  .badge-gold { background: var(--gold-light); color: #92400e; }
  .badge-red { background: var(--red-light); color: #991b1b; }
  .badge-slate { background: var(--slate-100); color: var(--slate-600); }

  .progress-bar {
    width: 100%;
    height: 8px;
    background: var(--slate-100);
    border-radius: 999px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--blue-500), var(--blue-400));
    border-radius: 999px;
    transition: width 0.8s ease;
  }

  .progress-fill-gold {
    background: linear-gradient(90deg, var(--gold), #fbbf24);
  }

  .progress-fill-green {
    background: linear-gradient(90deg, var(--green), #34d399);
  }

  .section-title {
    font-family: var(--font-display);
    font-size: 22px;
    color: var(--slate-800);
    margin-bottom: 4px;
  }

  .section-subtitle {
    font-size: 13px;
    color: var(--slate-500);
    margin-bottom: 16px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
    box-shadow: var(--shadow-sm);
  }

  .avatar-lg { width: 64px; height: 64px; }
  .avatar-xl { width: 88px; height: 88px; border-width: 3px; }

  .stat-card {
    background: white;
    border-radius: var(--radius-lg);
    padding: 20px;
    box-shadow: var(--shadow-md);
  }

  .stat-value {
    font-family: var(--font-display);
    font-size: 28px;
    color: var(--blue-700);
    line-height: 1;
  }

  .stat-label {
    font-size: 12px;
    color: var(--slate-500);
    margin-top: 4px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .page-container {
    max-width: 480px;
    margin: 0 auto;
    padding: 0 16px;
    padding-bottom: calc(var(--nav-height) + 16px);
    padding-top: calc(var(--top-bar-height) + 16px);
  }

  .input-group { margin-bottom: 16px; }

  .input-label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: var(--slate-700);
    margin-bottom: 6px;
  }

  input, select, textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid var(--slate-200);
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: 15px;
    color: var(--slate-800);
    background: white;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }

  input:focus, select:focus, textarea:focus {
    border-color: var(--blue-400);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .divider {
    height: 1px;
    background: var(--slate-100);
    margin: 16px 0;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    border: 1.5px solid var(--slate-200);
    background: white;
    color: var(--slate-600);
  }

  .chip.active {
    background: var(--blue-600);
    color: white;
    border-color: var(--blue-600);
  }

  .empty-state {
    text-align: center;
    padding: 48px 24px;
    color: var(--slate-400);
  }

  .empty-state-icon { font-size: 48px; margin-bottom: 12px; }
  .empty-state-title { font-size: 16px; font-weight: 600; color: var(--slate-600); margin-bottom: 4px; }
  .empty-state-desc { font-size: 14px; }
`;
