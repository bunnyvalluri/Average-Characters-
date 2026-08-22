import { characterService } from '../services/characterService.js';

export const characterController = {
  getHealth: (req, res) => {
    const stats = characterService.getStats();
    res.json(stats);
  },

  getAllCharacters: (req, res) => {
    const { search, page, limit } = req.query;
    const result = characterService.getAll({ search, page, limit });
    res.json(result);
  },

  searchCharacters: (req, res) => {
    const { q } = req.query;
    const result = characterService.search(q);
    res.json(result);
  },

  getCharacterById: (req, res) => {
    const { id } = req.params;
    const character = characterService.getById(id);

    if (!character) {
      return res.status(404).json({
        error: 'Character not found',
        id: parseInt(id, 10)
      });
    }

    res.json(character);
  },

  getCategories: (req, res) => {
    const categories = characterService.getCategories();
    res.json(categories);
  }
};
