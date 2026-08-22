<div align="center">

# ⚡ Marvel & Avengers Cinematic Universe Explorer

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  <strong>An enterprise-grade, high-performance full-stack web platform exploring the expansive Marvel Multiverse.</strong><br>
  Featuring 1,000+ characters, interactive cinematic timelines, signature chromatic theming, instant fuzzy search, and a modular REST API.
</p>

[Explore Features](#-key-features) • [Architecture](#-monorepo-architecture) • [Getting Started](#-getting-started) • [API Documentation](#-rest-api-documentation) • [Image Pipeline](#-automation--optimization-pipeline)

---

</div>

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Monorepo Architecture](#-monorepo-architecture)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Monorepo Scripts Reference](#-monorepo-scripts-reference)
- [REST API Documentation](#-rest-api-documentation)
- [Automation & Optimization Pipeline](#-automation--optimization-pipeline)
- [Performance & Build Optimization](#-performance--build-optimization)
- [Deployment Guide](#-deployment-guide)
- [Contributing](#-contributing)
- [Author & Acknowledgments](#-author--acknowledgments)
- [Disclaimer & License](#-disclaimer--license)

---

## 🌌 Overview

The **Marvel & Avengers Cinematic Universe Explorer** is a modern full-stack web application architected as a monorepo. It combines a lightning-fast React 19 single-page client built with Vite and Tailwind CSS with a lightweight, cached Node.js / Express REST API backend.

From Earth's Mightiest Heroes and the X-Men to cosmic entities, multiverse variants, and iconic villains, the platform provides deep lore, power breakdowns, chronological filmographies, and embedded video trailer modals for over 1,000 Marvel characters.

---

## ✨ Key Features

- 🦸 **1,000+ Character Database**: Exhaustive records including real name, biological origins, mortality status, powers, backstory, and signature aesthetics.
- 🎨 **Dynamic Chromatic Harmonization**: Seamlessly recalculates and applies theme palettes, glowing accents, and typography in real time based on the active hero's signature color.
- 🎬 **Interactive Filmography Timelines**: Dual-epoch filmographies covering pre-MCU and MCU Multiverse eras with interactive year-by-year event details.
- 🎥 **Embedded Trailer Playback**: Modal video trailers integrated directly into character profiles with smooth framer-motion transitions.
- 🔍 **Instant Fuzzy Search & Filter System**: Real-time query execution across character names, alter egos, and superpowers with quick-select faction categories (*Avengers, Guardians, X-Men, Villains, Cosmic, Endgame*).
- ⚡ **High-Throughput REST API**: Layered Express architecture providing sub-millisecond in-memory cached responses, multi-field search filtering, and pagination.
- 🖼️ **Automated Sharp Image Pipeline**: Integrated image optimization tooling ensuring sub-200KB responsive asset delivery without visual quality loss.

---

## 🏗️ Monorepo Architecture

The repository is organized following clean architectural separation of concerns (SoC):

```
Avengers-Characters/
│
├── frontend/                     # React 19 Client Application (Vite + Tailwind)
│   ├── public/                  # Optimized static assets & character artwork
│   │   └── movies/              # Filmography and cinematic posters
│   ├── src/
│   │   ├── assets/              # Core datasets, timeline data & custom font faces
│   │   │   ├── characters.js    # 1,000-character roster data module
│   │   │   ├── timelineData.js  # MCU & legacy timeline chronological mappings
│   │   │   └── fonts/           # Marvel-themed font families (.ttf / .otf)
│   │   ├── components/          # Modular, reusable UI components
│   │   │   ├── CharacterInfo.jsx# Biography, attributes & powers overview
│   │   │   ├── HeroSection.jsx  # Interactive character showcase carousel
│   │   │   ├── MarvelImage.jsx  # Resilient image loader with fallback states
│   │   │   ├── Movies.jsx       # Filmography card grid
│   │   │   ├── Navbar.jsx       # Search bar, category filters & navigation
│   │   │   └── Timeline.jsx     # Vertical chronological timeline component
│   │   ├── utils/               # Helper utilities & trailer ID resolvers
│   │   ├── App.jsx              # Client root layout & state orchestrator
│   │   ├── ColorThemeContext.jsx# Dynamic theme context provider
│   │   └── index.css            # Tailwind base, utilities & @font-face rules
│   ├── vite.config.js           # Rollup manual chunking & build optimization
│   └── package.json             # Frontend dependencies & scripts
│
├── backend/                      # Node.js + Express REST API Service
│   ├── src/
│   │   ├── config/              # Server configuration & environment variables
│   │   │   └── index.js
│   │   ├── controllers/         # Request handling & HTTP response logic
│   │   │   └── characterController.js
│   │   ├── routes/              # Express API route declarations
│   │   │   └── characterRoutes.js
│   │   ├── services/            # In-memory query engine, search & caching
│   │   │   └── characterService.js
│   │   └── server.js            # Express application bootstrap & error handling
│   ├── .env.example             # Backend environment template
│   ├── package.json             # Backend dependencies & scripts
│   └── README.md                # Dedicated backend documentation
│
├── scripts/                      # Automation & Ingestion Tooling
│   ├── optimize_images.mjs      # Sharp-powered image compressor & resizer
│   ├── download_characters.mjs  # Marvel Fandom Wikia API asset scraper
│   ├── apply_character_data.mjs # Dataset synchronization & migration utility
│   └── README.md                # Scripts documentation
│
├── .env.example                 # Root environment template
├── .gitignore                   # Monorepo git ignore rules
├── netlify.toml                 # Production build & redirect rules for Netlify
└── package.json                 # Monorepo workspaces & root CLI scripts
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/), [Vite 6](https://vitejs.dev/) |
| **Styling & Design** | [Tailwind CSS 3.4](https://tailwindcss.com/), Custom `@font-face` Typography, CSS Glassmorphism |
| **Animations & Transitions** | [Framer Motion 12](https://www.framer.com/motion/), [React Vertical Timeline](https://github.com/stephane-monnot/react-vertical-timeline) |
| **Backend Framework** | [Node.js](https://nodejs.org/), [Express 4](https://expressjs.com/) |
| **Asset Optimization** | [Sharp](https://sharp.pixelplumbing.com/) (Lossless/MozJPEG & PNG quantization) |
| **Package Management** | npm Workspaces (Monorepo architecture) |
| **Code Quality** | ESLint 9, PostCSS, Autoprefixer |
| **Deployment & Hosting** | [Netlify](https://www.netlify.com/) (Frontend CDN), Vercel / Render ready |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher ([Download Node.js](https://nodejs.org/))
- **npm**: `v9.0.0` or higher

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bunnyvalluri/Average-Characters-.git
   cd "Avengers charcters"
   ```

2. **Install all dependencies (Root, Frontend, & Backend):**
   ```bash
   npm run install:all
   ```

### Environment Variables

Copy the example environment configuration:
```bash
cp .env.example .env
```

| Variable | Description | Default |
|---|---|---|
| `PORT` | Express server port | `5000` |
| `NODE_ENV` | Runtime environment (`development` / `production`) | `development` |
| `CORS_ORIGIN` | Allowed CORS origins for API requests | `*` |
| `VITE_API_URL` | Client backend API endpoint | `http://localhost:5000/api` |

### Running Locally

- **Start Frontend Development Server** (Vite on `http://localhost:5173`):
  ```bash
  npm run dev
  # or
  npm run dev:frontend
  ```

- **Start Backend API Server** (Express with hot-reloading on `http://localhost:5000`):
  ```bash
  npm run dev:backend
  ```

---

## 📜 Monorepo Scripts Reference

All lifecycle scripts can be executed directly from the root workspace:

```bash
# Development
npm run dev                  # Start frontend Vite development server
npm run dev:frontend         # Explicitly run frontend Vite server
npm run dev:backend          # Start backend server with node --watch

# Production & Build
npm run build                # Compile optimized frontend production bundle
npm run preview              # Preview production build locally
npm run start:backend        # Start Express server in production mode

# Dependency Management
npm run install:all          # Install dependencies for both frontend & backend

# Automation & Tools
npm run optimize:images      # Run Sharp image compression on all public assets
npm run download:characters  # Query Marvel Wikia API for missing artwork
npm run apply:data           # Synchronize ingested character data into datasets
```

---

## 📡 REST API Documentation

The backend service exposes a clean REST API running on `http://localhost:5000/api`.

### Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Service health status, server timestamp, and total roster count |
| `GET` | `/characters` | Paginated character list with optional search query |
| `GET` | `/characters/search` | Fast fuzzy search across names, alter egos, and superpowers |
| `GET` | `/characters/:id` | Detailed character profile by numeric ID |
| `GET` | `/categories` | List available universe factions and category IDs |

### Query Parameters

#### `GET /api/characters`
- `page` *(number, optional)*: Current page number (Default: `1`)
- `limit` *(number, optional)*: Items per page. Pass `0` for unpaginated output (Default: `50`)
- `search` *(string, optional)*: Filter by character name, alias, powers, or lore

```bash
# Example: Fetch page 1 with 20 items searching for 'Spider'
curl "http://localhost:5000/api/characters?page=1&limit=20&search=spider"
```

#### `GET /api/characters/search`
- `q` *(string, required)*: Search keyword

```bash
# Example: Search for character by superpower or name
curl "http://localhost:5000/api/characters/search?q=thunder"
```

### Sample Response (`GET /api/characters/1`)
```json
{
  "id": 1,
  "name": "Iron Man",
  "originalName": "Anthony Edward \"Tony\" Stark",
  "photo": "/iron-man.png",
  "description": "A genius, billionaire, playboy, and philanthropist, Tony Stark created advanced armored suits to fight crime and protect the world.",
  "powers": "Genius-level intellect, master engineer, nanotechnology armor providing superhuman strength, supersonic flight, and repulsor blasts.",
  "birth": "May 29, 1970 (Manhattan, New York)",
  "death": "October 17, 2023 (Earth-616, sacrificed to defeat Thanos)",
  "bgColor": "#b71c1c",
  "fontFamily": "Iron Man",
  "trailerId": "8ugaeA-nMTc",
  "trailerTitle": "Iron Man • Marvel Studios Official Trailer",
  "trailerCategory": "Armored Avenger"
}
```

---

## 🧰 Automation & Optimization Pipeline

Located in the [`scripts/`](file:///c:/Avengers%20charcters/scripts/) directory:

1. **`scripts/optimize_images.mjs`**:
   - Scans character portraits (`frontend/public/`) and movie posters (`frontend/public/movies/`).
   - Automatically downsizes oversized dimensions while retaining aspect ratios.
   - Applies high-effort PNG palette compression (85% quality, level 9 effort) and MozJPEG compression for smooth 60fps web scrolling.

2. **`scripts/download_characters.mjs`**:
   - Automates portrait scraping from the Marvel Fandom Wikia API, verifying thumbnail resolutions and streaming directly to `frontend/public/`.

3. **`scripts/apply_character_data.mjs`**:
   - Programmatically synchronizes newly ingested character data and movie event timelines across `characters.js` and `timelineData.js`.

---

## ⚡ Performance & Build Optimization

- **Chunk Splitting**: Vendor dependencies are partitioned via Rollup (`vendor-react`, `vendor-motion`) for optimal browser caching.
- **Font Display Strategy**: All `@font-face` declarations utilize `font-display: swap` to eliminate render-blocking font loads.
- **Image Quantization**: Artwork is pre-compressed to achieve low memory footprints and near-instant initial render times.
- **In-Memory Query Engine**: Express server caches JSON records in memory for `< 5ms` API response latencies.

---

## 🚢 Deployment Guide

### Deploying the Frontend (Netlify / Vercel)
The client is preconfigured with [`netlify.toml`](file:///c:/Avengers%20charcters/netlify.toml):
```toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
Simply connect your Git repository to Netlify or Vercel; build settings are detected automatically.

### Deploying the Backend (Render / Railway / Docker)
Set the root directory to `backend/`, command to `npm start`, and configure the `PORT` environment variable.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👨‍💻 Author & Acknowledgments

- **Lead Developer**: [VALLURI RAHUL](https://valluri-rahul-portfolio.vercel.app/)
- **Portfolio**: [https://valluri-rahul-portfolio.vercel.app/](https://valluri-rahul-portfolio.vercel.app/)
- **GitHub**: [@bunnyvalluri](https://github.com/bunnyvalluri)

### Special Thanks
- [Marvel Studios](https://www.marvel.com/) & [Marvel Comics](https://www.marvel.com/comics) for iconic characters and lore.
- [Marvel Fandom Wikia](https://marvel.fandom.com/) for media archives.

---

## ⚖️ Disclaimer & License

This project is open-source and intended solely for educational and portfolio demonstration purposes. All character imagery, names, lore, and movie materials are copyrighted trademarks of **Marvel Characters, Inc. / Marvel Studios / The Walt Disney Company**. No copyright infringement is intended.

Distributed under the **MIT License**.
