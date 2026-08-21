import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load characters from frontend data or JSON
let characters = [];
try {
  const charactersFile = path.resolve(__dirname, '../../frontend/src/assets/characters.js');
  if (fs.existsSync(charactersFile)) {
    const fileContent = fs.readFileSync(charactersFile, 'utf8');
    const jsonMatch = fileContent.match(/const characters = (\[[\s\S]*?\]);/);
    if (jsonMatch) {
      characters = JSON.parse(jsonMatch[1]);
    }
  }
} catch (e) {
  console.warn('Could not parse characters.js directly, using fallback:', e.message);
}

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Marvel Characters API Server',
    totalCharacters: characters.length,
    timestamp: new Date().toISOString()
  });
});

// 2. Get All Characters (with pagination & category filter)
app.get('/api/characters', (req, res) => {
  const { category, search, page = 1, limit = 50 } = req.query;
  let results = [...characters];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(c =>
      c.name.toLowerCase().includes(q) ||
      (c.originalName && c.originalName.toLowerCase().includes(q)) ||
      (c.powers && c.powers.toLowerCase().includes(q)) ||
      (c.description && c.description.toLowerCase().includes(q))
    );
  }

  const total = results.length;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 50;
  const startIndex = (pageNum - 1) * limitNum;
  const paginated = limitNum === 0 ? results : results.slice(startIndex, startIndex + limitNum);

  res.json({
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: limitNum === 0 ? 1 : Math.ceil(total / limitNum),
    data: paginated
  });
});

// 3. Search Characters by Name or Query
app.get('/api/characters/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase().trim();
  if (!q) {
    return res.json({ total: 0, data: [] });
  }

  const matches = characters.filter(c =>
    c.name.toLowerCase().includes(q) ||
    (c.originalName && c.originalName.toLowerCase().includes(q)) ||
    (c.powers && c.powers.toLowerCase().includes(q))
  );

  res.json({
    total: matches.length,
    query: q,
    data: matches
  });
});

// 4. Get Single Character by ID
app.get('/api/characters/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const character = characters.find(c => c.id === id);

  if (!character) {
    return res.status(404).json({ error: 'Character not found', id });
  }

  res.json(character);
});

// 5. Get Available Categories
app.get('/api/categories', (req, res) => {
  res.json({
    categories: [
      { id: 'all', label: `All Heroes (${characters.length})` },
      { id: 'endgame', label: 'Endgame (Battle & Heist)' },
      { id: 'avengers', label: 'Avengers' },
      { id: 'guardians', label: 'Guardians' },
      { id: 'xmen', label: 'X-Men & Mutants' },
      { id: 'villains', label: 'Villains & Anti-Heroes' },
      { id: 'cosmic', label: 'Cosmic & Multiverse' }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`⚡ Marvel Characters Backend API running on port ${PORT}`);
  console.log(`👉 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👉 All characters: http://localhost:${PORT}/api/characters`);
});
