import { Router, Request, Response } from 'express';
import { AnalyticsService } from './analytics.service';

const router = Router();

// GET /api/v1/stats
router.get('/stats', (_req: Request, res: Response) => {
  const data = AnalyticsService.getGlobalStats();
  res.status(200).json({ data });
});

// GET /api/v1/:collection/facets
router.get('/:collection/facets', (req: Request, res: Response) => {
  const { collection } = req.params;
  const data = AnalyticsService.getCollectionFacets(collection);

  if (!data) {
    res.status(404).json({
      error: {
        code: 'COLLECTION_NOT_FOUND',
        message: `Collection '${collection}' not found or empty`,
      },
    });
    return;
  }

  res.status(200).json({ data });
});

export const analyticsRoutes = router;
