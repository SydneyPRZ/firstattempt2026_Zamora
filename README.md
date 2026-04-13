# 🎓 AlumniGive — Alumni Donation Web Application

A complete, modern single-page application built with **LitElement** and **Vite**.  
Blue-themed, card-based UI with smooth navigation, reusable components, and full mock data.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+ (check with `node -v`)
- **npm** v8+

### Run the App

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (opens at http://localhost:3000)
npm run dev
```

### Demo Login Credentials
| Role   | Email                  | Password  |
|--------|------------------------|-----------|
| Alumni | maria@example.com      | pass123   |
| Admin  | admin@alumni.edu       | admin123  |

---

## 📁 Project Structure

```
alumni-donation-app/
├── index.html                          # App shell + CSS variables
├── vite.config.js                      # Vite config
├── package.json
└── src/
    ├── main.js                         # Entry point
    ├── data/
    │   ├── mock-data.js                # All mock data (campaigns, events, users…)
    │   └── store.js                    # Reactive app state store
    ├── styles/
    │   └── shared.js                   # Shared LitElement CSS (buttons, cards, etc.)
    ├── utils/
    │   └── base-component.js           # BaseComponent with store subscription
    └── components/
        ├── app-root.js                 # Root router component
        ├── auth/
        │   ├── login-page.js           # Login with role selection
        │   └── forgot-password-page.js # Forgot password flow
        ├── layout/
        │   ├── top-bar.js              # Fixed top header
        │   └── bottom-nav.js           # Fixed bottom navigation
        ├── home/
        │   └── home-page.js            # Dashboard: stats, campaigns, top donors
        ├── events/
        │   └── events-page.js          # Calendar & list view with RSVP
        ├── donations/
        │   ├── donations-page.js       # Campaigns list + donation history
        │   ├── campaign-detail-page.js # Full campaign page with testimonials
        │   └── donate-modal.js         # 3-step donation flow + receipt
        ├── notifications/
        │   └── notifications-page.js   # Notification center
        ├── profile/
        │   └── profile-page.js         # Profile, academic records, cert vault
        └── admin/
            └── admin-dashboard.js      # Admin: overview, campaign mgmt, leaderboard
```

---

## ✨ Features

### Alumni Features
| Feature | Description |
|---------|-------------|
| **Home Dashboard** | Total donations, active campaigns, urgent needs, top donors |
| **Events Module** | Calendar + list view, category filters, search, RSVP |
| **Donations Page** | Campaigns by category, instant donate button |
| **Campaign Detail** | Story, funding progress, testimonials, benefits |
| **Donate Modal** | 3-step: amount → payment → receipt |
| **Payment Methods** | GCash, Maya, Credit Card, Bank Transfer |
| **Donation History** | Impact summary, full transaction log |
| **Notifications** | Filtered by type, mark read, live badge count |
| **Profile Page** | Personal info edit, academic records, document requests |
| **Certificate Vault** | View & download donation proof certificates |

### Admin Features
| Feature | Description |
|---------|-------------|
| **Overview** | Bar chart (monthly), category donut, KPI cards |
| **Campaign Management** | List, edit, pause, view all campaigns |
| **New Campaign Form** | Title, category, goal, preset amounts, publish |
| **Batch Leaderboard** | Rankings with trends and contribution totals |

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--blue-600` | `#2563eb` | Primary buttons, active states |
| `--blue-700` | `#1d4ed8` | Hover states, headings |
| `--gold` | `#f59e0b` | Urgent campaigns, awards |
| `--green` | `#10b981` | Success states, free events |
| `--radius-lg` | `20px` | Cards |
| `--radius-xl` | `28px` | Hero cards, modals |
| `--font-display` | DM Serif Display | Headings, numbers |
| `--font-body` | Plus Jakarta Sans | All body text |

---

## 🔧 Build for Production

```bash
npm run build      # outputs to /dist
npm run preview    # preview production build locally
```

---

## 🛠 Tech Stack

- **LitElement 3** — Web Components framework
- **Vite 5** — Build tool & dev server
- **Google Fonts** — DM Serif Display + Plus Jakarta Sans
- **No backend** — All data is mock/in-memory via `store.js`

---

## 📝 Extending the App

### Add a new page
1. Create `src/components/yourpage/your-page.js` extending `BaseComponent`
2. Import it in `src/components/app-root.js`
3. Add a case in `_renderPage()` in `app-root.js`
4. Add a nav item in `bottom-nav.js` if needed

### Connect a real backend
- Replace functions in `src/data/store.js` with `fetch()` calls
- Replace `MOCK_USERS` login with a real auth API call
- Swap mock arrays in `mock-data.js` with API responses

