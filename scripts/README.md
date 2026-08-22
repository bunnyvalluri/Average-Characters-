# Automation & Utility Scripts

This directory contains data ingestion, scraping, and asset optimization scripts for the Marvel & Avengers monorepo.

## Available Scripts

### 1. `optimize_images.mjs`
- **Purpose**: Scans `frontend/public/` character PNGs and `frontend/public/movies/` posters, resizing any oversized images to optimal display dimensions and compressing PNG/JPEG formats using Sharp.
- **Run**:
  ```bash
  npm run optimize:images
  # or directly:
  node scripts/optimize_images.mjs
  ```

### 2. `download_characters.mjs`
- **Purpose**: Queries the Marvel Fandom / Wikia API for missing character profile images and downloads them into `frontend/public/`.
- **Run**:
  ```bash
  npm run download:characters
  # or directly:
  node scripts/download_characters.mjs
  ```

### 3. `apply_character_data.mjs`
- **Purpose**: Ingests new character definitions, biographical lore, powers, and timeline filmography entries into `frontend/src/assets/characters.js` and `frontend/src/assets/timelineData.js`.
- **Run**:
  ```bash
  npm run apply:data
  # or directly:
  node scripts/apply_character_data.mjs
  ```
