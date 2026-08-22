import { Router } from 'express';
import { characterController } from '../controllers/characterController.js';

const router = Router();

// Health check
router.get('/health', characterController.getHealth);

// Search endpoint (must be before /:id)
router.get('/characters/search', characterController.searchCharacters);

// Character collection
router.get('/characters', characterController.getAllCharacters);

// Single character by ID
router.get('/characters/:id', characterController.getCharacterById);

// Available categories
router.get('/categories', characterController.getCategories);

export default router;
