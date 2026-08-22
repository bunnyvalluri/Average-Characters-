# Marvel Characters REST API Backend

A lightweight, high-performance Node.js / Express backend service providing REST API access to the Marvel & Avengers roster.

## Architecture

```
backend/
├── src/
│   ├── config/             # Environment & server settings
│   │   └── index.js
│   ├── controllers/        # Request handlers & response formatting
│   │   └── characterController.js
│   ├── routes/             # Express API routes
│   │   └── characterRoutes.js
│   ├── services/           # Business logic, search & data caching
│   │   └── characterService.js
│   └── server.js           # Server bootstrap & error handling
├── .env.example
├── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Service health status & total character count |
| `GET` | `/api/characters` | Paginated character list (`?page=1&limit=50&search=thor`) |
| `GET` | `/api/characters/search` | Search by name, alias, or superpower (`?q=iron`) |
| `GET` | `/api/characters/:id` | Fetch single character by numeric ID |
| `GET` | `/api/categories` | List available universe / faction categories |

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development Mode
```bash
npm run dev
```
Server runs with auto-reload on `http://localhost:5000`.

### 3. Run in Production Mode
```bash
npm start
```
