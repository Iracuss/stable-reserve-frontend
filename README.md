# Stable Reserve - Frontend

The frontend client for Stable Reserve. It provides a clean, responsive, and intuitive UI built with React and styled with Tailwind CSS, allowing equestrian professionals to manage their facilities, horses, and staff effortlessly.

## 🚀 Tech Stack

* **Framework:** React 18
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router v6
* **HTTP Client:** Axios
* **Icons/UI:** Lucide React / Tailwind components

## ✨ Key Features

* **Stable Dashboard:** An overview of member and horse counts, allowing quick access to specific facility management.
* **Horse & Medical Tracking:** Intuitive cards and forms to track horse profiles, including visual alerts for overdue Coggins tests and Farrier visits.
* **Inline Team Management:** A seamless dropdown form allowing managers to invite users via email, assign roles, view current members, and kick users directly from the stable card.
* **Optimistic UI Updates:** Actions like accepting invites, sending forms, or kicking users instantly update the UI without requiring page reloads.
* **JWT Authentication State:** Secure login, registration, and password reset flows with protected route handling.

## 🛠️ Local Development Setup

### Prerequisites

* Node.js (v18 or higher recommended)
* npm (or yarn/pnpm)

### Environment Variables

Create a `.env` file in the root of the frontend directory to connect the frontend to your Spring Boot backend:

```env
# The base URL for your Spring Boot API
VITE_API_BASE_URL=http://localhost:8080/api
```

### Installation & Running the Application

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Open the app:  
The application will start locally. Open your browser and navigate to:
```plaintext
http://localhost:5173
```

## 📂 Project Structure Overview

* **`/src/api`** — Axios client configuration and service files (e.g., `stableService.js`, `inviteService.js`) to interact with the backend endpoints.
* **`/src/components`** — Reusable UI components (e.g., `StableCard.jsx`, `MemberListItem.jsx`, navigation bars).
* **`/src/pages`** — Top-level route components (e.g., `LandingPage.jsx`, `Dashboard.jsx`, `Login.jsx`).
* **`/src/components/auth`** — React Context providers for managing global state like user authentication.

## 🚢 Build for Production

To create an optimized production build, run:
```bash
npm run build
```

This will generate a `dist` folder containing the compiled static assets, ready to be deployed to platforms like Vercel, Netlify, or an Nginx server.