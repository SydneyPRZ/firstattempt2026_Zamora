# Donation Module - Zamora

A complete, modern single-page application built with **LitElement** and **Vite**.  
Blue-themed, card-based UI with smooth navigation, reusable components, and full mock data.

# Framework

Lit + Vite

# Module

Module 4: Donation Module
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

## AI Tools Used
Claude
Chatgpt

```

---

## Prompt

```
I am currently developing a simple Alumni Donation web application using the LIT (LitElement) JavaScript framework. I want the system to be a clean, modern, and desktop and mobile friendly single-page application with reusable components and smooth navigation. The design should follow a soft, card-based UI with a blue theme, rounded corners, and a bottom navigation bar that includes Home, Events, Donations, Notifications, and Profile.
The application should include a home dashboard where users can quickly see important information such as total donations, donation benefits, campaign progress, top donors, and urgent donation needs. There should also be an events module that allows users to view alumni activities through both a calendar view and a list view, with features like search, filters, and RSVP buttons. For donations, the system should display featured campaigns, ongoing donation drives, and a summary of the user’s donation history.
Each campaign should have a detailed page showing its purpose, story, funding goal, and testimonials, along with a clear “Donate Now” button. The donation process must be simple and secure, allowing users to choose preset or custom amounts, select payment methods like GCash, Maya, or card, and receive a receipt. Users should also be able to view their donation history, including total contributions, transaction records, and their overall impact.
The system should include a notification center to keep users updated about campaigns, events, and transactions. There should also be a profile section where users can manage their personal information, view academic records, and download verified credentials. Additionally, a certificate vault feature should allow users to view and download proof of their donations.
Authentication features such as login, forgot password, and role selection (Alumni or Admin) should be implemented. For administrators, the system should include a dashboard for monitoring fundraising performance, managing campaigns, creating new donation drives, and setting donation options before publishing. There should also be a leaderboard feature that ranks alumni batches based on their donation contributions.
Use LitElement for all components, keep the code modular and reusable, and use mock data instead of a backend for now. Please provide a complete project structure, component-based code, and instructions on how to run the application, preferably using a simple setup like Vite.
---

## Project Structure

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

## Author
Sydney Pamela Zamora Course: 4-112 | MW 7:30AM – 9:00AM Module 3: Donation Module

