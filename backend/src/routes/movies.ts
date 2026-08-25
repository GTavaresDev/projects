import { Router, Request, Response } from 'express';
import { jsonStore } from '../services/jsonStore';
import { z } from 'zod';

const router = Router();

const createMovieSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  description: z.string().min(1, 'Description is required').trim(),
  image: z.string().url('Image must be a valid URL'),
});

const updateMovieSchema = createMovieSchema.partial();

// Search movies
router.get('/search', (req: Request, res: Response) => {
  const query = (req.query.q as string) || '';
  const page = parseInt((req.query.page as string) || '1', 10);
  const limit = parseInt((req.query.limit as string) || '10', 10);

  if (!query.trim()) {
    res.status(400).json({ error: { code: 'INVALID_QUERY', message: 'Search query is required' } });
    return;
  }

  const result = jsonStore.search('movies', query, { page, limit });
  res.status(200).json(result);
});

// List movies
router.get('/', (req: Request, res: Response) => {
  const page = parseInt((req.query.page as string) || '1', 10);
  const limit = parseInt((req.query.limit as string) || '10', 10);

  const result = jsonStore.list('movies', { page, limit });
  res.status(200).json(result);
});

// Get movie by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const movie = jsonStore.getById('movies', id);

  if (!movie) {
    res.status(404).json({ error: { code: 'MOVIE_NOT_FOUND', message: 'Movie not found' } });
    return;
  }

  res.status(200).json({ data: movie });
});

// Create movie
router.post('/', (req: Request, res: Response) => {
  const parseResult = createMovieSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: parseResult.error.errors.map((e) => e.message).join(', '),
      },
    });
    return;
  }

  const movie = jsonStore.create('movies', parseResult.data);
  res.status(201).json({ data: movie });
});

// Update movie
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const parseResult = updateMovieSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: parseResult.error.errors.map((e) => e.message).join(', '),
      },
    });
    return;
  }

  const movie = jsonStore.update('movies', id, parseResult.data);

  if (!movie) {
    res.status(404).json({ error: { code: 'MOVIE_NOT_FOUND', message: 'Movie not found' } });
    return;
  }

  res.status(200).json({ data: movie });
});

// Delete movie
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = jsonStore.delete('movies', id);

  if (!deleted) {
    res.status(404).json({ error: { code: 'MOVIE_NOT_FOUND', message: 'Movie not found' } });
    return;
  }

  res.status(204).send();
});

export const movieRoutes = router;
