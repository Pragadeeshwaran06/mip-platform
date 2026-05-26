# Micro-Internship Engine (MIP)

![Micro-Internship Engine](https://img.shields.io/badge/Status-Active-success.svg)
![React](https://img.shields.io/badge/Frontend-React%2019-blue.svg)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green.svg)
![SQLite](https://img.shields.io/badge/Database-SQLite-blue.svg)
![Security](https://img.shields.io/badge/Security-Helmet%20%7C%20Rate%20Limit-orange.svg)

## 📌 Overview

The **Micro-Internship Engine** is a robust, full-stack web application designed to connect students with companies through short-term, project-based internships. Built with a focus on modern UI/UX design, scalability, and secure architecture, this platform facilitates seamless matching, application processing, and task management.

This project was developed with a mobile-first, fully responsive design approach and features an intuitive interface with a premium "Midnight & Indigo" theme.

## ✨ Key Features

- **Role-Based Access Control (RBAC):** Distinct dashboards and capabilities for Students, Companies, and Administrators.
- **AI-Based Task Matching:** Intelligent algorithm that scores and recommends relevant micro-internships to students based on their profiles and skills.
- **Interactive Student Portfolio:** A dynamic showcase of student skills, past projects, and earned gamified badges.
- **Gamification & Activity Feeds:** Engaging user experience through achievement badges, progress tracking, and a live activity feed.
- **Real-Time Search & Filtering:** High-performance, instantaneous search capabilities for browsing available tasks.
- **Comprehensive Admin Dashboard:** Total administrative control over users, task approvals, platform analytics, and moderation.
- **Robust Security Middleware:** Implemented secure backend practices using Helmet (HTTP headers), CORS configurations, rate limiting, and bcrypt for password hashing.
- **Seamless Mock Data System:** Graceful fallback to rich local mock data (50+ tasks, 25+ student profiles) when the backend is unreachable or for isolated testing.

## 💻 Tech Stack

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 (Fluid typography, mobile-first responsive design)
- **Architecture:** Component-based architecture with dynamic state management

### Backend
- **Server:** Node.js with Express v5
- **Database:** SQLite3 for lightweight, persistent relational data storage
- **Security:** `helmet` (Header protection), `express-rate-limit` (DDoS prevention), `cors` (Cross-Origin Resource Sharing), `bcryptjs` (Cryptographic hashing)

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- Git

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd my-website/MIP
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   
   # Initialize the database with seed data
   node seed.js
   
   # Start the backend server
   npm start
   ```
   *The backend will typically run on http://localhost:5000*

3. **Frontend Setup:**
   Open a new terminal window:
   ```bash
   cd MIP/frontend
   npm install
   
   # Start the Vite development server
   npm run dev
   ```
   *The frontend will be available at http://localhost:5173*

## 🔒 Security Implementations

Security was a priority during the development of this platform:
- **Helmet.js** to secure Express apps by setting various HTTP headers.
- **Rate Limiting** to protect against brute-force attacks and DDoS.
- **Password Hashing** with `bcryptjs` ensures user credentials are safely stored.
- **CORS Configuration** strictly defining allowed origins and methods.

## 📱 Responsive Design

The platform uses a comprehensive mobile-first CSS architecture, ensuring a flawless experience across all device sizes. From flexible grid layouts to touch-optimized interaction targets, the UI dynamically adapts to desktop, tablet, and mobile environments.

---

*This project is actively maintained and serves as a comprehensive demonstration of full-stack development, API integration, and modern web design principles.*
