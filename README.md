# AlumniGive — Alumni Donation Platform
**Lit · Vite · JavaScript · PWA · No Backend**

AlumniGive is a web-based alumni donation and engagement platform built for university communities. It allows verified alumni to browse active fundraising campaigns, make donations, RSVP to events, track their giving history, and download verified donation certificates. Administrators can monitor fundraising performance, manage campaigns, create new donation drives, and view batch leaderboards.

This project was built as part of **Module 4: Progressive Web Application** for the course **4-112 (MW 7:30AM–9:00AM)** using the **Lit Web Components framework** with **Vite** as the development server.

---

## Framework

**Lit** — a lightweight web components library by Google. Each screen of the application is built as a separate, reusable Lit component with scoped CSS, reactive properties, and event-based communication between components.

Official docs: https://lit.dev

---

## Module

**Module 4: Progressive Web Application (PWA)**

**Screens covered:**

- Unified Login (Alumni / Admin) with role selection
- Home Dashboard — donation stats, urgent campaigns, top donors
- Events — calendar view + list view with RSVP
- Donations — campaign browser with category filters
- Campaign Detail — story, testimonials, funding progress, benefits
- Donate Modal — 3-step flow (amount → payment → receipt)
- Donation History — impact summary + transaction log
- Notification Center — filtered alerts with unread badges
- Profile — personal info, academic records, document requests
- Certificate Vault — view and download donation proof
- Admin Dashboard — KPI cards, monthly chart, category breakdown
- Admin Campaign Management — view, edit, pause campaigns
- Admin New Campaign Form — 4-step creation with preset amounts
- Admin Batch Leaderboard — alumni batch rankings with trends

---

## PWA — `feature/pwa-ready`

This branch converts AlumniGive into a fully installable, offline-capable Progressive Web App.

### What was added

| File | Purpose |
|------|---------|
| `public/manifest.json` | Defines app name, icons, colors, shortcuts, and display mode |
| `public/offline.html` | Custom branded page shown when user is offline with no cache |
| `public/icons/icon-192x192.png` | App icon (small — required minimum for installability) |
| `public/icons/icon-512x512.png` | App icon (large — used for splash screen and install prompt) |
| `public/pwa-192x192.png` | Maskable icon for Android adaptive icon shapes |
| `public/pwa-512x512.png` | Maskable icon (large) |
| `public/apple-touch-icon.png` | iOS home screen icon (180×180) |
| `src/components/pwa/pwa-manager.js` | LitElement component — install prompt, update banner, network status indicator |
| `index.html` | Updated with PWA meta tags, manifest link, Apple meta tags, and skeleton loader |
| `src/main.js` | Updated to register the service worker via `virtual:pwa-register` |
| `vite.config.js` | Updated with `vite-plugin-pwa` and full Workbox caching configuration |
| `src/data/store.js` | Updated with `localStorage` persistence and `isOnline` reactive state |
| `src/utils/base-component.js` | Updated with `isOnline` getter for all components |
| `src/components/app-root.js` | Updated with lazy loading for all non-critical page components |

### Caching Strategy

**Three strategies are used depending on the type of content:**

| Strategy | Applied To | Behaviour |
|----------|-----------|-----------|
| **Cache-First** | JS/CSS assets, font files | Serve from cache instantly. Files have hashed names so a new version always means a new URL — safe to cache forever. |
| **Stale-While-Revalidate** | Campaign images (Unsplash), Google Fonts CSS | Serve cached version instantly, then update cache in background. User sees fresh content on next visit. |
| **Network-First** | App HTML shell | Try network first. If offline or slow, serve cached version. Ensures users get the freshest content when online. |

**On first load** — all core files are pre-cached during the service worker install event (HTML, CSS, JS chunks, icons, fonts).  
**On repeat visits** — files are served instantly from cache with no network needed.  
**On network failure** — the app loads entirely from cache. If a page is not cached, `offline.html` is shown instead of a browser error.  
**On app update** — a non-intrusive banner appears asking the user to update. The version is controlled by `CACHE_VERSION` in `vite.config.js`.

---

## How to Test PWA Features

```bash
npm install
npm run build
npm run preview
```

Then open `http://localhost:4173` in Chrome:

1. Open **DevTools (F12)** → **Application** tab
2. Click **Service Workers** — should show ✅ `activated and running`
3. Click **Cache Storage** — expand `workbox-precache-v2-...` to see all cached files
4. Click **Manifest** — should show app name, icons, theme color, and shortcuts
5. Look for the **install icon (⊕)** in the Chrome address bar → click to install
6. Go to **Application → Service Workers** → check the **Offline** checkbox → refresh → app still loads ✅
7. Run **Lighthouse** (DevTools → Lighthouse tab) → select **Progressive Web App** → all checkmarks should be green

> ⚠️ Use `npm run preview` (not `npm run dev`) to test PWA features. Service workers require a production build to generate the `sw.js` file.

---

## File Structure

```
alumni-donation-app/
│
├── public/                              ← PWA static assets (copied to dist/ as-is)
│   ├── manifest.json                    ← Web App Manifest
│   ├── offline.html                     ← Offline fallback page
│   ├── favicon.svg
│   ├── apple-touch-icon.png             ← iOS home screen icon (180×180)
│   ├── pwa-192x192.png                  ← Maskable icon (Android)
│   ├── pwa-512x512.png                  ← Maskable icon (large)
│   └── icons/
│       ├── icon-72x72.png
│       ├── icon-96x96.png
│       ├── icon-128x128.png
│       ├── icon-144x144.png             ← Windows tile
│       ├── icon-152x152.png             ← iPad icon
│       ├── icon-192x192.png             ← Required minimum
│       ├── icon-384x384.png
│       └── icon-512x512.png             ← Large install prompt / splash screen
│
├── index.html                           ← App entry point (PWA meta tags added)
├── package.json                         ← Project dependencies (Lit + Vite + PWA plugin)
├── package-lock.json                    ← Locked dependency versions
├── vite.config.js                       ← Vite + vite-plugin-pwa + Workbox config
├── README.md                            ← This file
│
└── src/
    ├── main.js                          ← Imports all components + SW registration
    ├── styles/
    │   └── shared.js                    ← Global CSS variables and shared component styles
    ├── data/
    │   ├── mock-data.js                 ← Static mock data for all views
    │   └── store.js                     ← Reactive state store with localStorage persistence
    ├── utils/
    │   └── base-component.js            ← Base LitElement class with store subscription
    └── components/
        ├── app-root.js                  ← Root router with lazy loading
        ├── pwa/
        │   └── pwa-manager.js           ← Install prompt, update banner, network indicator
        ├── auth/
        │   ├── login-page.js            ← Unified login with role tabs
        │   └── forgot-password-page.js  ← Password reset flow
        ├── layout/
        │   ├── top-bar.js               ← Fixed top navigation bar
        │   └── bottom-nav.js            ← Fixed bottom tab navigation with badge
        ├── home/
        │   └── home-page.js             ← Dashboard with stats, campaigns, top donors
        ├── events/
        │   └── events-page.js           ← Calendar view + list view with RSVP
        ├── donations/
        │   ├── donations-page.js        ← Campaign browser + donation history tabs
        │   ├── campaign-detail-page.js  ← Full campaign story and donate button
        │   └── donate-modal.js          ← 3-step donation bottom sheet
        ├── notifications/
        │   └── notifications-page.js    ← Notification center with type filters
        ├── profile/
        │   └── profile-page.js          ← Profile, academic records, certificate vault
        └── admin/
            └── admin-dashboard.js       ← Admin KPIs, charts, campaigns, leaderboard
```

---

## Installation

### Requirements

- **Node.js v18 or higher** — download at https://nodejs.org (choose LTS version)
- **npm** (comes bundled with Node.js)

### Steps

```bash
# Step 1: Clone the repository
git clone https://github.com/YOUR_USERNAME/alumni-donation-app.git

# Step 2: Navigate into the project folder
cd alumni-donation-app

# Step 3: Switch to the PWA branch
git checkout feature/pwa-ready

# Step 4: Install dependencies (installs Lit + Vite + vite-plugin-pwa automatically)
npm install

# Step 5: Start the development server
npm run dev
```

Then open your browser and go to:

```
http://localhost:3000
```

> ⚠️ **Windows PowerShell users:** If you get a script execution error, open PowerShell as Administrator and run:
> ```
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```
> Or use **Command Prompt (cmd)** instead — it works without any changes.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy to Netlify, GitHub Pages, or Vercel.

---

## How to Use the App

| Role | How to Log In | What You'll See |
|------|--------------|----------------|
| **Alumni** | Click "Alumni" tab → `maria@example.com` / `pass123` | Home, Events, Donate, Notifications, Profile |
| **Admin** | Click "Admin" tab → `admin@alumni.edu` / `admin123` | Admin Dashboard, Campaign Management, Leaderboard |

All data is static/mock — no real backend, database, or authentication required. No real money is transferred.

---

## AI Tools Used

| Tool | Usage |
|------|-------|
| **Claude (Anthropic)** | Primary — generated the entire Lit web application, PWA conversion, architecture guide, video script, and all documentation |
| **ChatGPT** | Secondary reference for Lit reactive property patterns |
| **GitHub Copilot (VS Code)** | Inline code suggestions during manual editing |

---

## Master Prompts

### Original App Generation Prompt

The following prompt was used to generate the complete working Lit application:

```
I am currently developing a simple Alumni Donation web application using the LIT
(LitElement) JavaScript framework. I want the system to be a clean, modern, and
desktop and mobile friendly single-page application with reusable components and
smooth navigation. The design should follow a soft, card-based UI with a blue theme,
rounded corners, and a bottom navigation bar that includes Home, Events, Donations,
Notifications, and Profile.

The application should include a home dashboard where users can quickly see important
information such as total donations, donation benefits, campaign progress, top donors,
and urgent donation needs. There should also be an events module that allows users to
view alumni activities through both a calendar view and a list view, with features
like search, filters, and RSVP buttons. For donations, the system should display
featured campaigns, ongoing donation drives, and a summary of the user's donation
history.

Each campaign should have a detailed page showing its purpose, story, funding goal,
and testimonials, along with a clear "Donate Now" button. The donation process must
be simple and secure, allowing users to choose preset or custom amounts, select
payment methods like GCash, Maya, or card, and receive a receipt. Users should also
be able to view their donation history, including total contributions, transaction
records, and their overall impact.

The system should include a notification center to keep users updated about campaigns,
events, and transactions. There should also be a profile section where users can
manage their personal information, view academic records, and download verified
credentials. Additionally, a certificate vault feature should allow users to view and
download proof of their donations.

Authentication features such as login, forgot password, and role selection (Alumni or
Admin) should be implemented. For administrators, the system should include a dashboard
for monitoring fundraising performance, managing campaigns, creating new donation drives,
and setting donation options before publishing. There should also be a leaderboard
feature that ranks alumni batches based on their donation contributions.

Use LitElement for all components, keep the code modular and reusable, and use mock
data instead of a backend for now. Please provide a complete project structure,
component-based code, and instructions on how to run the application, preferably
using a simple setup like Vite.
```

### PWA Conversion Master Prompt

The following prompt was used to convert the existing Lit app into a Progressive Web App:

```
I am an Information Technology student working on an existing Alumni Donation web
application built using the LIT (LitElement) JavaScript framework, and the project
is currently stored in a public GitHub repository. I want to transform this static
framework-based project into a high-performance, offline-ready Progressive Web
Application (PWA) using best practices. I am working in a new Git branch called
feature/pwa-ready, and I want to follow a professional development workflow where
major architectural changes are handled safely in a feature branch.

Guide me step-by-step through the entire PWA conversion process in a practical and
implementation-focused way, since I am still learning. Start with a short overview
of all the files that will be created or modified, then proceed step-by-step. I need
exact file names, complete code snippets that I can copy and paste, and a clear
folder structure if needed. Please avoid vague explanations and instead provide clear
reasoning for each step so I can explain this in an architecture presentation.

First, generate a complete and valid manifest.json file with proper fields such as
name, short_name, start_url, display, background_color, and theme_color, using a
clean and professional naming style suitable for a university project. Include properly
configured app icons with multiple sizes (192x192 and 512x512), and explain where to
place these assets in the project.

Next, help me create and configure a service worker and show exactly how to register
it in my main entry file. Clearly explain the purpose of the install, activate, and
fetch events, and how they contribute to offline functionality.

For caching, implement a reliable offline-first or cache-first strategy. Make sure
that HTML, CSS, JavaScript, and image assets are cached properly so that the app still
loads even when offline. Also, prevent common issues like stale caches and explain
how to handle cache updates or versioning correctly.

Since I am using the LIT framework, make sure all steps are compatible with it, and
also consider if the project uses tools like Vite or similar build systems. Adjust
the implementation accordingly.

Finally, include a section on common errors and debugging, such as service worker
not registering, manifest not being detected, or caching issues, and provide quick
fixes for each.
```

---

## AI Hallucinations & Errors Fixed Manually

During development using Claude AI, the following issues were encountered and corrected manually:

### 1. ❌ Hallucination — `virtual:pwa-register` Not Recognized in Dev Mode

**What the AI generated:** The AI used `import('virtual:pwa-register')` directly in `main.js` without a try/catch block.

**Why it was wrong:** In Vite dev mode without a production build, `virtual:pwa-register` does not exist as a module. Calling it without error handling crashes the entire app boot sequence with an unresolved module error.

**Fix applied:** Wrapped the entire service worker registration inside a `try/catch` block so the app continues to work in development even if the virtual module is unavailable:

```js
try {
  const { registerSW } = await import('virtual:pwa-register');
  // ... registration logic
} catch {
  console.info('[PWA] SW registration not available in this environment');
}
```

---

### 2. ❌ Hallucination — Incorrect Icon `purpose` Field in Manifest

**What the AI initially wrote:**
```json
{ "src": "/icons/icon-192x192.png", "sizes": "192x192", "purpose": "any maskable" }
```

**Why it was wrong:** Combining `any` and `maskable` in a single icon entry using a space-separated string is deprecated behavior. Modern browsers and the Lighthouse PWA audit expect them as **separate icon entries** with individual `purpose` values.

**Fix applied:** Split into two separate entries:
```json
{ "src": "/icons/icon-192x192.png", "sizes": "192x192", "purpose": "any" },
{ "src": "/pwa-192x192.png",        "sizes": "192x192", "purpose": "maskable" }
```

---

### 3. ❌ Hallucination — `skipWaiting: true` Set by Default

**What the AI initially configured:**
```js
skipWaiting: true
```

**Why it was wrong:** `skipWaiting: true` forces the new service worker to take over immediately — even while the user is in the middle of using the app. This causes the page to reload unexpectedly mid-session, which is a terrible user experience, especially during a donation flow.

**Fix applied:** Changed to `skipWaiting: false` and added the `pwa-manager.js` component to show a non-disruptive update banner instead, letting the user choose when to update:
```js
skipWaiting: false,
clientsClaim: true
```

---

### 4. ❌ Hallucination — `navigateFallback` Pointing to `index.html`

**What the AI initially configured:**
```js
navigateFallback: '/index.html'
```

**Why it was wrong:** Using `index.html` as the offline fallback means the full Lit application tries to boot when the user is offline — but many of its dynamic imports and external resources (Google Fonts, Unsplash images) will fail, causing a broken or partial UI with console errors.

**Fix applied:** Created a fully self-contained `offline.html` with zero external dependencies and pointed `navigateFallback` to it:
```js
navigateFallback: '/offline.html'
```

---

### 5. ❌ Error — `public/` Folder Missing from Original Project

**What happened:** The AI gave instructions to place `manifest.json` and `offline.html` inside a `public/` folder without mentioning it needed to be created first.

**Why it was wrong:** The original Vite project did not have a `public/` folder. Vite only creates one if you explicitly add it.

**Fix applied:** Manually created the `public/` folder on GitHub by using **Add file → Create new file** and typing `public/manifest.json` as the filename — GitHub automatically creates the parent folder.

---

### 6. ❌ Error — npm Script Execution Blocked on Windows

**What happened:** Running `npm install` in Windows PowerShell returned:
```
File cannot be loaded because running scripts is disabled on this system.
```

**Why it happened:** Windows PowerShell has a default execution policy that blocks unsigned scripts, including npm's `.ps1` launcher.

**Fix applied:** Either ran the following in PowerShell as Administrator:
```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Or switched to **Command Prompt (cmd)** which does not have this restriction.

---

## Screenshots

01 - Home Nav
<img width="2567" height="1315" alt="image" src="https://github.com/user-attachments/assets/71639419-dc60-4ba6-bd99-6b49d01b1c6c" />

02 - Calendar of Events
<img width="2563" height="1350" alt="image" src="https://github.com/user-attachments/assets/25c53e3a-9fc1-4b0d-8124-5915bbe4eba3" />

03 - List View
<img width="2562" height="1359" alt="image" src="https://github.com/user-attachments/assets/94b8ae5c-aaac-4d55-b117-9488f3787b97" />

04 - Donating for a Cause
<img width="2556" height="1359" alt="image" src="https://github.com/user-attachments/assets/6d715379-ab32-4bef-a5db-4866e9c59178" />


05 - Scholarship Fund 2024 – Campaign Details
<img width="2566" height="1350" alt="image" src="https://github.com/user-attachments/assets/5cf59d34-63ac-42b5-959a-d27967182d67" />

06 - Secure Checkout – Donation
<img width="2563" height="1353" alt="image" src="https://github.com/user-attachments/assets/728e4822-8952-421f-a4d0-a1efc08bfbd8" />

07 - Donation History
<img width="2553" height="1357" alt="image" src="https://github.com/user-attachments/assets/13c2b896-dd37-4047-abed-adafbe57605f" />
08 - Notifications Center
<img width="2557" height="1357" alt="image" src="https://github.com/user-attachments/assets/91000d10-5f2a-4b9c-b6d6-3a5e08d508b7" />

09 - Profile – Account Overview
<img width="2560" height="1362" alt="image" src="https://github.com/user-attachments/assets/aeeddc4a-61fe-4824-bc93-86986115c648" />

10 - Profile – Edit & Credentials
<img width="2563" height="1353" alt="image" src="https://github.com/user-attachments/assets/16acfa1b-942f-4601-9d03-61552a0b391e" />

11 - Certificate Vault – Your Impact
<img width="2562" height="1360" alt="image" src="https://github.com/user-attachments/assets/f65791c6-a1df-42d8-ba98-9d8ba47dda66" />

12 - Log in
<img width="2562" height="1359" alt="image" src="https://github.com/user-attachments/assets/ba3d8627-e862-4e49-82c2-9799090a992e" />

13 - Forgot Password – Account Recovery
<img width="2554" height="1355" alt="image" src="https://github.com/user-attachments/assets/b4ac9587-8696-4c04-bc83-718432f49766" />

14 - Admin Home – Dashboard
<img width="2558" height="1304" alt="image" src="https://github.com/user-attachments/assets/5719f266-7100-414c-9c38-905574c2b29f" />

15 - Admin – Donation Campaigns
<img width="2557" height="1317" alt="image" src="https://github.com/user-attachments/assets/697a274b-a600-4b3b-abc6-080c3a3c39bf" />


16 - Create Campaign/Donation – Campaign Details
<img width="2561" height="1359" alt="image" src="https://github.com/user-attachments/assets/4571bf57-cd21-47ef-9b52-06c0dc0da34e" />

17 - Batch Donation
<img width="2570" height="1313" alt="image" src="https://github.com/user-attachments/assets/45e4b6db-d5bf-4b2a-a908-c98010143fef" />

## Author
Sydney Pamela Zamora Course: 4-112 | MW 7:30AM – 9:00AM Module 3: Donation Module

