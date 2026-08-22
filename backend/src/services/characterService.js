import fs from 'fs';
import { config } from '../config/index.js';

class CharacterService {
  constructor() {
    this.characters = [];
    this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(config.charactersFilePath)) {
        const fileContent = fs.readFileSync(config.charactersFilePath, 'utf8');
        const jsonMatch = fileContent.match(/const characters = (\[[\s\S]*?\]);/);
        if (jsonMatch) {
          this.characters = JSON.parse(jsonMatch[1]);
          console.log(`✓ Loaded ${this.characters.length} characters into memory`);
        }
      }
    } catch (e) {
      console.warn('Could not parse characters.js directly, using fallback:', e.message);
      this.characters = [];
    }
  }

  getStats() {
    return {
      status: 'ok',
      service: 'Marvel Characters API Server',
      totalCharacters: this.characters.length,
      timestamp: new Date().toISOString()
    };
  }

  getAll({ search, page = 1, limit = 50 }) {
    let results = [...this.characters];

    if (search) {
      const q = search.toLowerCase().trim();
      results = results.filter(c =>
        c.name.toLowerCase().includes(q) ||
        (c.originalName && c.originalName.toLowerCase().includes(q)) ||
        (c.powers && c.powers.toLowerCase().includes(q)) ||
        (c.description && c.description.toLowerCase().includes(q))
      );
    }

    const total = results.length;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = parseInt(limit, 10) || 50;
    const startIndex = (pageNum - 1) * limitNum;
    const paginated = limitNum === 0 ? results : results.slice(startIndex, startIndex + limitNum);

    return {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: limitNum === 0 ? 1 : Math.ceil(total / limitNum),
      data: paginated
    };
  }

  search(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      return { total: 0, query: '', data: [] };
    }

    const matches = this.characters.filter(c =>
      c.name.toLowerCase().includes(q) ||
      (c.originalName && c.originalName.toLowerCase().includes(q)) ||
      (c.powers && c.powers.toLowerCase().includes(q))
    );

    return {
      total: matches.length,
      query: q,
      data: matches
    };
  }

  getById(id) {
    const numericId = parseInt(id, 10);
    return this.characters.find(c => c.id === numericId) || null;
  }

  getCategories() {
    return {
      categories: [
        { id: 'all', label: `All Heroes (${this.characters.length})` },
        { id: 'endgame', label: 'Endgame (Battle & Heist)' },
        { id: 'avengers', label: 'Avengers' },
        { id: 'guardians', label: 'Guardians' },
        { id: 'xmen', label: 'X-Men & Mutants' },
        { id: 'villains', label: 'Villains & Anti-Heroes' },
        { id: 'cosmic', label: 'Cosmic & Multiverse' }
      ]
    };
  }
}

export const characterService = new CharacterService();
