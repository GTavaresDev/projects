import { Router, Request, Response } from 'express';
import { jsonStore } from '../../services/jsonStore';
import { BookSchema, BookUpdateSchema } from './books.types';

const router = Router();

// Search books
router.get('/search', (req: Request, res: Response) => {
  const query = (req.query.q as string) || '';
  const page = parseInt((req.query.page as string) || '1', 10);
  const limit = parseInt((req.query.limit as string) || '10', 10);

  if (!query.trim()) {
    res.status(400).json({ error: { code: 'INVALID_QUERY', message: 'Search query is required' } });
    return;
  }

  const result = jsonStore.search('books', query, { page, limit });
  res.status(200).json(result);
});

// List books
router.get('/', (req: Request, res: Response) => {
  const page = parseInt((req.query.page as string) || '1', 10);
  const limit = parseInt((req.query.limit as string) || '10', 10);
  const { page: _p, limit: _l, ...filters } = req.query;

  const result = jsonStore.list('books', { page, limit }, filters);
  res.status(200).json(result);
});

// Get book by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const book = jsonStore.getById('books', id);

  if (!book) {
    res.status(404).json({ error: { code: 'BOOK_NOT_FOUND', message: 'Book not found' } });
    return;
  }

  res.status(200).json({ data: book });
});

// Create book
router.post('/', (req: Request, res: Response) => {
  const parseResult = BookSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: parseResult.error.errors.map((e) => e.message).join(', '),
      },
    });
    return;
  }

  const book = jsonStore.create('books', parseResult.data);
  res.status(201).json({ data: book });
});

// Update book
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const parseResult = BookUpdateSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: parseResult.error.errors.map((e) => e.message).join(', '),
      },
    });
    return;
  }

  const book = jsonStore.update('books', id, parseResult.data);

  if (!book) {
    res.status(404).json({ error: { code: 'BOOK_NOT_FOUND', message: 'Book not found' } });
    return;
  }

  res.status(200).json({ data: book });
});

// Delete book
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = jsonStore.delete('books', id);

  if (!deleted) {
    res.status(404).json({ error: { code: 'BOOK_NOT_FOUND', message: 'Book not found' } });
    return;
  }

  res.status(204).send();
});

export const bookRoutes = router;
