import { Router, Request, Response } from 'express';
import { jsonStore } from '../services/jsonStore';

export function createCollectionRouter(collectionName?: string): Router {
  const router = Router({ mergeParams: true });

  const getCollection = (req: Request): string => {
    return collectionName || (req.params.collection as string);
  };

  // Search in collection
  router.get('/search', (req: Request, res: Response) => {
    const collection = getCollection(req);
    const query = (req.query.q as string) || '';
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '10', 10);

    if (!query.trim()) {
      res.status(400).json({ error: { code: 'INVALID_QUERY', message: 'Search query is required' } });
      return;
    }

    // Extract additional filter parameters (excluding pagination/query keys)
    const { q, page: _p, limit: _l, ...filters } = req.query;

    const result = jsonStore.search(collection, query, { page, limit }, filters);
    res.status(200).json(result);
  });

  // List collection with optional filters & pagination
  router.get('/', (req: Request, res: Response) => {
    const collection = getCollection(req);
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '10', 10);

    const { page: _p, limit: _l, ...filters } = req.query;

    const result = jsonStore.list(collection, { page, limit }, filters);
    res.status(200).json(result);
  });

  // Get item by ID
  router.get('/:id', (req: Request, res: Response) => {
    const collection = getCollection(req);
    const { id } = req.params;
    const item = jsonStore.getById(collection, id);

    if (!item) {
      res.status(404).json({
        error: {
          code: `${collection.toUpperCase().slice(0, -1)}_NOT_FOUND`,
          message: `Item not found in ${collection}`,
        },
      });
      return;
    }

    res.status(200).json({ data: item });
  });

  // Create new item
  router.post('/', (req: Request, res: Response) => {
    const collection = getCollection(req);
    const { name, description, image, ...rest } = req.body;

    if (!name || !description || !image) {
      res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Fields "name", "description", and "image" are required',
        },
      });
      return;
    }

    const created = jsonStore.create(collection, { name, description, image, ...rest });
    res.status(201).json({ data: created });
  });

  // Update item
  router.put('/:id', (req: Request, res: Response) => {
    const collection = getCollection(req);
    const { id } = req.params;

    const updated = jsonStore.update(collection, id, req.body);
    if (!updated) {
      res.status(404).json({
        error: {
          code: `${collection.toUpperCase().slice(0, -1)}_NOT_FOUND`,
          message: `Item not found in ${collection}`,
        },
      });
      return;
    }

    res.status(200).json({ data: updated });
  });

  // Delete item
  router.delete('/:id', (req: Request, res: Response) => {
    const collection = getCollection(req);
    const { id } = req.params;

    const deleted = jsonStore.delete(collection, id);
    if (!deleted) {
      res.status(404).json({
        error: {
          code: `${collection.toUpperCase().slice(0, -1)}_NOT_FOUND`,
          message: `Item not found in ${collection}`,
        },
      });
      return;
    }

    res.status(204).send();
  });

  return router;
}
