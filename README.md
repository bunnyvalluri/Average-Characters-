# ⚡ Marvel Cinematic Universe — Avengers Character Archives & Cinematic Timeline

<div align="center">

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.10-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.16.0-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Responsive](https://img.shields.io/badge/Design-Fully_Responsive-22C55E?style=for-the-badge&logo=google-chrome&logoColor=white)](#-device-responsiveness)

<p align="center">
  <strong>An immersive, interactive web application exploring Marvel's Earth's Mightiest Heroes, villains, cinematic timelines, and complete MCU filmography.</strong>
</p>

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-device-responsiveness">Responsive Design</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-author--credits">Author & Credits</a>
</p>

</div>

---

## 🌟 Overview

The **Avengers Character Archives** is a modern, high-performance web experience crafted with **React 19**, **Vite**, **Tailwind CSS**, and **Framer Motion**. It provides Marvel fans with an interactive hub to explore character biographies, superpowers, cinematic history, and complete MCU movie catalog with dynamic ambient color theming matching each hero.

---

## ✨ Key Features

### 🦸 1. Dynamic Hero Showcase & Ambient Glow
- **Character Switcher**: Cycle through iconic characters (Iron Man, Captain America, Thor, Hulk, Spider-Man, Doctor Strange, Thanos, Deadpool, Venom, etc.).
- **Dynamic Theming**: Real-time ambient radial background and UI theme transformation tailored to each character's signature color.
- **Hero Thumbnail Strip**: Scrollable bottom strip for quick 1-tap character selection across any device.
- **Custom Typography**: Over 40 unique superhero typography fonts integrated dynamically for authentic comic & cinematic branding.

### 📅 2. Dual-Mode Responsive Timeline
- **Desktop & Laptop**: Alternating 2-column centered chronological timeline with animated node connectors.
- **Mobile & Tablet**: Single-column left-spine timeline ensuring movie cards, artwork, and MCU lore never get squished on smaller screens.
- **Category Filter Tabs**: Switch between **All Appearances**, **MCU Canon**, and **Pre-MCU / Legacy** films.

### 🎬 3. Marvel Cinematic Universe Movie Hub
- **Phase Filters**: Categorized by Phase 1, Phase 2, Phase 3, Phase 4, Multiverse Saga, and Legacy classics.
- **Searchable Database**: Instant real-time search filtering by movie title, release year, or lead hero.
- **Interactive Details Modal**: Click any movie card to view high-resolution posters, release dates, storylines, and jump directly to related characters.

### 🔍 4. Smart Navigation & Search
- **Live Autocomplete Search**: Global search bar in the navbar that suggests matching characters in real time.
- **Mobile Drawer Menu**: Animated backdrop-blurred slide-over drawer for easy access on mobile devices.
- **Floating Controls**: Smooth scroll-to-top floating button and safe-area responsive video landing intro.

---

## 📱 Device Responsiveness

The application is engineered with a **mobile-first responsive architecture** tested across diverse screen resolutions:

| Device Category | Target Viewports | Key Adaptations |
|---|---|---|
| **Small Phones** | 320px – 375px (iPhone SE, Galaxy A) | Fluid font clamping, 2-column movie grid, single-spine timeline, touch buttons |
| **Standard & Large Phones** | 390px – 430px (iPhone 14/15/16 Pro Max, Pixel 8) | Swipe gestures, slide-over mobile drawer, horizontal hero picker |
| **Tablets & iPads** | 768px – 1024px (iPad Mini/Air/Pro) | Clean split-screen hero layout, 3–4 column movie grid, balanced timeline |
| **Laptops & Desktops** | 1280px – 1920px (MacBook, Full HD monitors) | Alternating 2-column timeline, 5–6 column movie hub, ambient backlight glow |
| **Ultrawide Displays** | 2560px+ (2K / 4K monitors) | Max-width content constraint, centered focus layout |

---

## ⌨️ Gestures & Keyboard Shortcuts

- **Desktop Keyboard Navigation**:
  - `→` (Right Arrow): Next Superhero
  - `←` (Left Arrow): Previous Superhero
- **Touch / Mobile Gestures**:
  - **Swipe Left / Drag Left**: Next Superhero
  - **Swipe Right / Drag Right**: Previous Superhero
  - **Tap Thumbnail**: Instant character jump

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **[React 19](https://react.dev/)** | Component architecture & modern state management |
| **[Vite 6](https://vitejs.dev/)** | Next-generation lightning-fast frontend tooling |
| **[Tailwind CSS 3](https://tailwindcss.com/)** | Utility-first responsive design & custom design tokens |
| **[Framer Motion](https://www.framer.com/motion/)** | Physics-based animations, layout transitions & drag gestures |
| **[React Router 7](https://reactrouter.com/)** | Client-side routing between Landing page and Main Archive |
| **[PostCSS](https://postcss.org/) & [Autoprefixer](https://github.com/postcss/autoprefixer)** | Cross-browser CSS compatibility |

---

## 📂 Project Structure

```text
├── public/
│   ├── movies/             # High-res MCU and Legacy movie posters
│   ├── landing.mp4         # Cinematic intro video
│   ├── avengers-logo.png   # Favicon & branding assets
│   └── *.png               # Character cutout artwork
├── src/
│   ├── assets/
│   │   ├── characters.js   # Character dataset (bios, powers, dates, colors, fonts)
│   │   └── fonts/          # 40+ superhero custom typography files
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky glassmorphic nav & live character search
│   │   ├── HeroSection.jsx     # Main hero stage, backlight glow & thumbnail strip
│   │   ├── CharacterInfo.jsx   # Hero bio, power pills, vital statistics, CTA buttons
│   │   ├── Timeline.jsx        # Dual-mode responsive chronological timeline
│   │   └── Movies.jsx          # Interactive MCU movie hub with phase filtering
│   ├── ColorThemeContext.jsx   # Global dynamic color theme context
│   ├── App.jsx                 # App routes, video landing page, floating actions
│   ├── App.css                 # Custom keyframes & animation tokens
│   ├── index.css               # Design system, @font-face declarations & resets
│   └── main.jsx                # React root entry point
├── index.html              # HTML5 root with responsive viewport & meta tags
├── tailwind.config.js      # Custom breakpoints & theme extensions
├── vite.config.js          # Vite build configuration
└── package.json            # Project dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** / **pnpm**

### 1. Clone the Repository
```bash
git clone https://github.com/bunnyvalluri/Average-Characters-.git
cd Average-Characters-
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build Locally
```bash
npm run preview
```

---

## 🎨 Customization

- **Add New Characters**: Open `src/assets/characters.js` and add a new character object with name, bio, power details, theme color, and custom font.
- **Add Movie Posters**: Add poster images into `public/movies/` and register them in `src/components/Timeline.jsx` and `src/components/Movies.jsx`.
- **Add Custom Fonts**: Place font files (`.ttf`, `.otf`) in `src/assets/fonts/` and declare `@font-face` in `src/index.css`.

---

## 👤 Author & Credits

- **Creator / Developer**: [VALLURI RAHUL](https://valluri-rahul-portfolio.vercel.app/)
- **Portfolio**: [https://valluri-rahul-portfolio.vercel.app/](https://valluri-rahul-portfolio.vercel.app/)
- **GitHub**: [@bunnyvalluri](https://github.com/bunnyvalluri)

---

## 📜 Disclaimer & License

This project is created for **educational and personal portfolio purposes**. All character names, images, artwork, and movie titles are intellectual property of **Marvel Studios**, **Marvel Characters, Inc.**, and **The Walt Disney Company**.
