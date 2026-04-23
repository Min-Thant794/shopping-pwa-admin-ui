# Shopping PWA — Admin Dashboard

<p align="center">
  The admin-facing interface of the Shopping PWA system —<br/>
  real-time order monitoring, analytics, and management built with React and Vite.
</p>

<p align="center">
  <a href="https://shopping-pwa-admin-ui.vercel.app">Live Demo</a>
  ·
  <a href="https://github.com/Min-Thant794/shoppingWebsite">Customer Repo</a>
  ·
  <a href="https://github.com/Min-Thant794/shopping-backend">Backend Repo</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Build-Vite-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Charts-Recharts-FF6384?style=for-the-badge" alt="Recharts" />
  <img src="https://img.shields.io/badge/Realtime-Socket.IO-010101?style=for-the-badge&logo=socket.io" alt="Socket.IO" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel" alt="Vercel" />
</p>

---

## Overview

The **Admin Dashboard** is one of three parts that make up the Shopping PWA platform. It provides a role-protected interface for administrators to monitor incoming orders, track order statuses in real time, and review analytics — all connected to the shared backend API via REST and Socket.IO.

| Part | Repo | Live |
|------|------|------|
| Customer Website | [shoppingWebsite](https://github.com/Min-Thant794/shoppingWebsite) | [shopping-website-delta-five.vercel.app](https://shopping-website-delta-five.vercel.app) |
| Backend API | [shopping-backend](https://github.com/Min-Thant794/shopping-backend) | — |
| **Admin Dashboard** | **[shopping-pwa-admin-ui](https://github.com/Min-Thant794/shopping-pwa-admin-ui)** | **[shopping-pwa-admin-ui.vercel.app](https://shopping-pwa-admin-ui.vercel.app)** |

---

## Architecture

```text
Admin Dashboard (React + Vite)
        │
        ├── Axios ──────────────────► REST API
        │                              (Node.js + Express + MongoDB)
        └── Socket.IO Client ───────► Real-time Events
```

The admin UI communicates with the same backend API used by the customer storefront. Admins receive live order events via Socket.IO without needing to refresh the page.

---

## Features

### Order Management
- View all incoming customer orders in a structured list
- Update and manage individual order statuses (e.g., pending → processing → shipped)
- Real-time order arrival notifications powered by Socket.IO — no manual refresh needed

### Analytics Dashboard
- Visual order analytics rendered with **Recharts**
- Charts update dynamically as new orders come in
- Quickly identify trends across order volumes and statuses

### Authentication & Access Control
- Admin login with JWT-based authentication
- Protected routes — unauthenticated users are redirected to login
- Role-aware navigation that adapts based on the logged-in user's permissions

### UI & Notifications
- Clean, responsive layout built with **Tailwind CSS**
- Toast notifications via **React Toastify** for actions like status updates and errors
- Client-side routing with **React Router DOM** for a smooth single-page experience

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 |
| Build Tool | Vite |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Real-time | Socket.IO Client |
| Notifications | React Toastify |

---

## Project Structure

```
shopping-pwa-admin-ui/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components (tables, charts, navbars)
│   ├── pages/              # Route-level page components
│   │   ├── Dashboard.jsx   # Main analytics and overview page
│   │   ├── Orders.jsx      # Order listing and management
│   │   └── Login.jsx       # Admin authentication page
│   ├── hooks/              # Custom React hooks (e.g., socket listeners)
│   ├── services/           # Axios API call functions
│   ├── context/            # Auth context / global state
│   ├── App.jsx             # Root component with route definitions
│   └── main.jsx            # Vite entry point
├── .env                    # Environment variables (not committed)
├── index.html              # HTML shell
├── vite.config.js          # Vite configuration
└── package.json
```

> **Note:** The folder structure above reflects the intended architecture. Exact filenames may vary.

---

## Getting Started

This repository is run independently. Make sure the [backend](https://github.com/Min-Thant794/shopping-backend) is also running, as the admin UI depends on it.

### Prerequisites

- Node.js `v18+`
- npm `v9+`
- A running instance of the [Shopping Backend](https://github.com/Min-Thant794/shopping-backend)

### 1. Clone the repository

```bash
git clone https://github.com/Min-Thant794/shopping-pwa-admin-ui.git
cd shopping-pwa-admin-ui
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=your_backend_api_url
VITE_SOCKET_URL=your_backend_socket_url
```

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | The base URL of your backend REST API (e.g., `http://localhost:4000/api`) |
| `VITE_SOCKET_URL` | The Socket.IO server URL (e.g., `http://localhost:4000`) |

> **Tip:** For local development, both values typically point to `http://localhost:4000`.

### 4. Run the development server

```bash
npm run dev
```

The admin dashboard will be available at `http://localhost:5173` (or the next available port).

### 5. Build for production

```bash
npm run build
```

The production-ready output will be in the `dist/` folder. Deploy it to any static hosting platform (e.g., Vercel, Netlify).

---

## Environment Variable Reference

| Variable | Required | Example |
|----------|----------|---------|
| `VITE_API_BASE_URL` | ✅ Yes | `https://your-backend.onrender.com/api` |
| `VITE_SOCKET_URL` | ✅ Yes | `https://your-backend.onrender.com` |

---

## Screenshots

### Admin Dashboard

<p align="center">
  <img src="./screenshots/adminDashboard.png" width="80%" />
</p>
<p align="center">
  <sub>Main dashboard with real-time order monitoring and analytics charts</sub>
</p>

---

## Deployment

This project is deployed on **Vercel** using the following steps:

1. Push your code to GitHub
2. Import the repository into [Vercel](https://vercel.com)
3. Add the environment variables (`VITE_API_BASE_URL`, `VITE_SOCKET_URL`) under **Project Settings → Environment Variables**
4. Deploy — Vercel will automatically detect Vite and configure the build

**Build settings (auto-detected by Vercel):**

| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

---

## Related Repositories

This admin dashboard is part of a three-repository full-stack project:

- 🛒 **Customer Website** — [shoppingWebsite](https://github.com/Min-Thant794/shoppingWebsite)
- ⚙️ **Backend API** — [shopping-backend](https://github.com/Min-Thant794/shopping-backend)
- 🛡️ **Admin Dashboard** — *(this repository)*

---

## Planned Improvements

- [ ] Add screenshots and UI previews
- [ ] Product management (add / edit / delete products from the dashboard)
- [ ] User management and role assignment
- [ ] More detailed analytics filters (by date range, category, etc.)
- [ ] Export orders to CSV
- [ ] Write unit and integration tests
- [ ] Add a deployment guide

---

## What I Learned

- Structuring a role-protected React application with separate admin and customer UIs
- Consuming the same backend API from multiple frontends
- Handling real-time events from Socket.IO in a React component lifecycle
- Rendering live-updating charts with Recharts
- Deploying a Vite-based React app to Vercel with custom environment variables

---

## Author

**Min Thant Tun** — [@Min-Thant794](https://github.com/Min-Thant794)

> Part of the Shopping PWA — a full-stack mentorship project where I first experienced connecting frontend, backend, database, and real-time features into one working system.