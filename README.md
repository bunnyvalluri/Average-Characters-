# Avengers & Marvel Characters Explorer (220+ Heroes)

A visually stunning web application showcasing 223 Marvel and Avengers characters, X-Men, Spider-Verse heroes, Midnight Sons, and villains with cinematic filmographies, powers, interactive audio/video trailers, and dynamic color themes. Built with React, Vite, Framer Motion, and Tailwind CSS.

## Features
- **220+ Character Roster**: Complete database of Marvel cinematic and comic characters with custom fonts, palettes, and lore
- **Interactive Filmography Timelines**: Explore movies across MCU and legacy eras with instant YouTube trailer playback
- **Smart Category Filtering**: Seamlessly filter between Avengers, Endgame heroes, Guardians, X-Men, Villains, and Cosmic legends
- **Instant Global Search**: Fast fuzzy search across character names, real identities, and superpowers (Ctrl+K or /)
- **Dynamic Theming**: Color palettes automatically harmonize to the selected character's signature theme
- **Fully Responsive & Optimized**: Lightning-fast performance on mobile and desktop devices

## Project Structure
```
├── public/                # Static assets (character images, movie posters, logos)
│   └── movies/            # Movie poster images
├── src/
│   ├── App.jsx            # Main React component
│   ├── App.css            # App-level styles
│   ├── main.jsx           # React entry point
│   ├── index.css          # Global styles (Tailwind)
│   ├── ColorThemeContext.jsx # Theme context provider
│   ├── assets/
│   │   ├── characters.js  # Character data
│   │   └── ...            # SVGs, fonts
│   ├── components/
│   │   ├── CharacterInfo.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Movies.jsx
│   │   ├── Navbar.jsx
│   │   └── Timeline.jsx
├── index.html             # Main HTML file
├── package.json           # Project metadata and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── eslint.config.js       # ESLint configuration
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
```sh
npm install
```

### Development
```sh
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build for Production
```sh
npm run build
```

### Preview Production Build
```sh
npm run preview
```

## Customization
- Add or update character images in `public/`
- Edit character data in `src/assets/characters.js`
- Update movie posters in `public/movies/`
- Modify UI components in `src/components/`
- Add custom fonts in `src/assets/fonts/` or `src/assets/Additional Fonts/`

## Screenshots
Add screenshots of your app here:

![Home Page](public/avengers-logo.png)
<!-- Add more screenshots as needed -->

## Technologies Used
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## Author
- **Developer**: [VALLURI RAHUL](https://valluri-rahul-portfolio.vercel.app/)
- **Portfolio**: [https://valluri-rahul-portfolio.vercel.app/](https://valluri-rahul-portfolio.vercel.app/)
- **GitHub**: [@bunnyvalluri](https://github.com/bunnyvalluri)

## Credits
- Marvel Studios for character images and movie posters
- [Hero Patterns](https://www.heropatterns.com/) for background patterns
- Fonts from [Google Fonts](https://fonts.google.com/) and other free sources

## License
This project is for educational and personal use. All character images and movie posters are property of Marvel Studios and their respective owners.
