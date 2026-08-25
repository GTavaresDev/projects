import { Router, Request, Response } from 'express';
import { jsonStore } from '../services/jsonStore';
import { z } from 'zod';

const router = Router();

const createRecipeSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  description: z.string().min(1, 'Description is required').trim(),
  image: z.string().url('Image must be a valid URL'),
});

const updateRecipeSchema = createRecipeSchema.partial();

// Search recipes
router.get('/search', (req: Request, res: Response) => {
  const query = (req.query.q as string) || '';
  const page = parseInt((req.query.page as string) || '1', 10);
  const limit = parseInt((req.query.limit as string) || '10', 10);

  if (!query.trim()) {
    res.status(400).json({ error: { code: 'INVALID_QUERY', message: 'Search query is required' } });
    return;
  }

  const result = jsonStore.search('recipes', query, { page, limit });
  res.status(200).json(result);
});

// List recipes
router.get('/', (req: Request, res: Response) => {
  const page = parseInt((req.query.page as string) || '1', 10);
  const limit = parseInt((req.query.limit as string) || '10', 10);

  const result = jsonStore.list('recipes', { page, limit });
  res.status(200).json(result);
});

// Get recipe by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const recipe = jsonStore.getById('recipes', id);

  if (!recipe) {
    res.status(404).json({ error: { code: 'RECIPE_NOT_FOUND', message: 'Recipe not found' } });
    return;
  }

  res.status(200).json({ data: recipe });
});

// Create recipe
router.post('/', (req: Request, res: Response) => {
  const parseResult = createRecipeSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: parseResult.error.errors.map((e) => e.message).join(', '),
      },
    });
    return;
  }

  const recipe = jsonStore.create('recipes', parseResult.data);
  res.status(201).json({ data: recipe });
});

// Update recipe
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const parseResult = updateRecipeSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: parseResult.error.errors.map((e) => e.message).join(', '),
      },
    });
    return;
  }

  const recipe = jsonStore.update('recipes', id, parseResult.data);

  if (!recipe) {
    res.status(404).json({ error: { code: 'RECIPE_NOT_FOUND', message: 'Recipe not found' } });
    return;
  }

  res.status(200).json({ data: recipe });
});

// Delete recipe
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = jsonStore.delete('recipes', id);

  if (!deleted) {
    res.status(404).json({ error: { code: 'RECIPE_NOT_FOUND', message: 'Recipe not found' } });
    return;
  }

  res.status(204).send();
});

export const recipeRoutes = router;
