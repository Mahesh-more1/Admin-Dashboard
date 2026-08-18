# 📊 Enterprise Admin Dashboard & Management Suite

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy Status](https://img.shields.io/badge/Deployment-GitHub%20Pages-brightgreen)](https://mahesh-more1.github.io/Admin-Dashboard/)
[![UI Design](https://img.shields.io/badge/Design-Vanilla%20CSS%20Glassmorphism-7380ec)](#)

A high-performance, responsive **Single Page Application (SPA) Admin Dashboard** built with modern Vanilla JavaScript (ES6+), HTML5, and CSS3 Glassmorphism. Featuring full **Multi-Account Authentication**, persistent **LocalStorage State Database**, real-time search indexing, visual analytics, order fulfillment, product catalog management, customer CRM, message inbox, and customizable visual themes.

---

## 🔗 Live Demonstration

Access the deployed application on GitHub Pages:

👉 **[Launch Admin Dashboard Live Demo](https://mahesh-more1.github.io/Admin-Dashboard/)**  
*(Alternative Docs Deployment: [https://mahesh-more1.github.io/Admin-Dashboard/docs/](https://mahesh-more1.github.io/Admin-Dashboard/docs/))*

---

## 🔑 Demo Login Accounts

You can test authentication using pre-configured admin accounts or click the **1-Click Quick Demo Login** buttons on the Sign In page:

| Account Name | Email | Password | Admin Role |
| :--- | :--- | :--- | :--- |
| **John Doe** | `john.admin@dashboard.com` | `password123` | **Super Admin** |
| **Mike Tyson** | `mike.tyson@ironmike.com` | `password123` | **Store Manager** |
| **Elena Rostova** | `elena.rostova@tech.de` | `password123` | **Analytics Lead** |

*Note: You can also register custom new user accounts directly on the Sign Up tab!*

---

## ✨ Features & Module Overview

### 1. 🔐 Multi-Account Authentication & Session Manager
- **Sign In & Sign Up Views**: User login and registration with role assignment (*Super Admin, Store Manager, Content Lead*).
- **Session Persistence**: Current active user session is saved in `localStorage`. Automatically logs you back into your workspace on page refresh.
- **Real Sign Out & User Switching**: Logging out clears the session, shows toast feedback, and returns to the authentication portal. Profile UI headers, footers, and banners sync dynamically per account.

### 2. 📊 Interactive SPA Navigation & Views
- **Dashboard View**: Overview banner, date range filter, gross sales/expenses/income KPI cards with circular progress rings, recent transactions table, activity feed, and quick shortcuts.
- **Customer Directory**: CRM table with customer contact info, location tags, VIP tier badges (*Diamond, Platinum, Gold, Silver*), lifetime spend, search & tier filters, Add Customer modal, and profile viewer.
- **Order & Fulfillment Manager**: Comprehensive order records with status filter tabs (*Pending, Delivered, Declined, Paid, Due*), sorting (*Newest, Oldest, High/Low Price*), search, Create New Order modal, and order receipt details.
- **Analytics & Revenue Intelligence**: Key financial indicators, monthly revenue vs. expenses dual-bar charts, product category sales donut breakdown, and period toggles (*Weekly, Monthly, Yearly*).
- **Messages Inbox**: Split-pane communication center with unread message badge count in the sidebar, thread reader, reply box, compose message modal, and delete thread option.
- **Product Catalog & Inventory**: Grid Cards & List Table view modes, stock level indicators (*In Stock, Low Stock, Out of Stock*), category filter, search, quick stock editor, and product publishing form.
- **Reports & Audit Exporter**: Custom report builder (*Sales, Inventory, Customer LTV, Tax*) with time range and format selection (*PDF, CSV, XLSX*) featuring simulated file downloads.
- **System Preferences & Settings**: Tabbed options for Profile Info, Notification switches, Password/2FA Security, Dark/Light Mode toggle, and Primary Accent Color palette picker (*Indigo, Cyan, Emerald, Rose, Amber*).

### 3. 🎨 Zero-Gap Modern Design System
- **Responsive Flex/Grid Architecture**: Eliminates layout holes and floating blank columns. Every page expands to fill 100% of the viewport smoothly.
- **Global Header Search**: Live search bar matching orders, products, and customer profiles with jump-to modal popups.
- **Notification Dropdown**: Bell icon with unread badge counter and "Mark all as read" capability.
- **Toast Notifications**: Floating notification alerts for instant feedback on user actions.

---

## 🛠️ Tech Stack

- **Frontend Core:** HTML5, Modern Vanilla JavaScript (ES6+)
- **Styling & Theme Engine:** Vanilla CSS3 (Custom Properties, Glassmorphism, CSS Grid, Flexbox, Animations)
- **Data Persistence:** `LocalStorage` Database API
- **Fonts & Icons:** Google Fonts (Poppins), Material Icons Sharp
- **Deployment:** GitHub Pages & GitHub Actions Workflow

---

## 📁 Repository Structure

```
Admin-Dashboard/
├── .github/
│   └── workflows/
│       └── static.yml       # GitHub Actions automated deployment workflow
├── docs/                    # GitHub Pages alternative deployment root
│   ├── images/
│   ├── index.html
│   ├── style.css
│   ├── main.js
│   ├── orders.js
│   └── logo.svg
├── images/                  # Demo avatar assets
├── index.html               # Main SPA HTML structure & Auth portal
├── style.css                # Central CSS Design System & Theme variables
├── main.js                  # SPA Routing & Authentication controller
├── orders.js                # LocalStorage Database Engine & Mock Data
├── logo.svg                 # Brand Logo SVG
└── README.md                # Project Documentation
```

---

## 🚀 Local Setup & Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Mahesh-more1/Admin-Dashboard.git
   cd Admin-Dashboard
   ```

2. **Run Locally**
   - Open `index.html` directly in any modern browser.
   - Or use VS Code **Live Server** extension to launch locally on `http://localhost:5500`.

---

## 🌐 GitHub Pages Deployment Options

This project is configured for 100% smooth GitHub Pages hosting:

1. Open **Settings ➔ Pages** in your GitHub repository.
2. Under **Build and deployment**:
   - **Option A (Branch)**: Select Branch: `main` ➔ Folder: `/docs` ➔ Click **Save**.
   - **Option B (Actions)**: Select Source: **GitHub Actions**.

---

## 📄 License

Distributed under the **MIT License**. Free to use, modify, and distribute for personal and commercial projects.
