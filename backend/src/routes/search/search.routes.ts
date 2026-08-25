import { Router, Request, Response } from 'express';
import { SearchService } from './search.service';

const router = Router();

// GET /api/v1/search?q=...&limit=5
router.get('/', (req: Request, res: Response) => {
  const query = (req.query.q as string) || '';
  const limitPerCollection = parseInt((req.query.limit as string) || '5', 10);

  if (!query.trim()) {
    res.status(400).json({ error: { code: 'INVALID_QUERY', message: 'Search query parameter "q" is required' } });
    return;
  }

  const data = SearchService.globalSearch(query, limitPerCollection);
  res.status(200).json({ data });
});

export const searchRoutes = router;
