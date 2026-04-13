# Donation Module - Zamora

# Framework

Lit + Vite

# Module
Module 4: Donation Module

## Quick Start

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

# Prompt
CHATGPT:
I am developing a simple web application using java script framework LIT to make an Alumni Donation website. Here i sent a pdf on the design and funtionalities of the website. please make a prompt

CLAUDE:
I am currently developing a simple Alumni Donation web application using the LIT (LitElement) JavaScript framework. I want the system to be a clean, modern, and desktop and mobile friendly single-page application with reusable components and smooth navigation. The design should follow a soft, card-based UI with a blue theme, rounded corners, and a bottom navigation bar that includes Home, Events, Donations, Notifications, and Profile.
The application should include a home dashboard where users can quickly see important information such as total donations, donation benefits, campaign progress, top donors, and urgent donation needs. There should also be an events module that allows users to view alumni activities through both a calendar view and a list view, with features like search, filters, and RSVP buttons. For donations, the system should display featured campaigns, ongoing donation drives, and a summary of the user’s donation history.
Each campaign should have a detailed page showing its purpose, story, funding goal, and testimonials, along with a clear “Donate Now” button. The donation process must be simple and secure, allowing users to choose preset or custom amounts, select payment methods like GCash, Maya, or card, and receive a receipt. Users should also be able to view their donation history, including total contributions, transaction records, and their overall impact.
The system should include a notification center to keep users updated about campaigns, events, and transactions. There should also be a profile section where users can manage their personal information, view academic records, and download verified credentials. Additionally, a certificate vault feature should allow users to view and download proof of their donations.
Authentication features such as login, forgot password, and role selection (Alumni or Admin) should be implemented. For administrators, the system should include a dashboard for monitoring fundraising performance, managing campaigns, creating new donation drives, and setting donation options before publishing. There should also be a leaderboard feature that ranks alumni batches based on their donation contributions.
Use LitElement for all components, keep the code modular and reusable, and use mock data instead of a backend for now. Please provide a complete project structure, component-based code, and instructions on how to run the application, preferably using a simple setup like Vite.


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

