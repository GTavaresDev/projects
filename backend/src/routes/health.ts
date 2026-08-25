import { Router, Request, Response } from 'express';
import { jsonStore } from '../services/jsonStore';

const router = Router();

// Welcome / API Directory Index
const welcomeHandler = (_req: Request, res: Response) => {
  const collections = jsonStore.getAvailableCollections();
  res.status(200).json({
    message: '🚀 Catalog Backend API is running successfully!',
    version: '1.2.0',
    documentation: 'See .agents/API_REFERENCE.md',
    endpoints: {
      health: '/api/v1/health',
      collectionsSummary: '/api/v1/collections',
      globalStats: '/api/v1/stats',
      universalSearch: '/api/v1/search?q=:term',
      randomItem: '/api/v1/random',
      movieNightCombo: '/api/v1/combos/movie-night',
      placeholderSvg: '/api/v1/utils/placeholder.svg?width=600&height=400&text=Sample',
      weatherSimulation: '/api/v1/utils/weather?city=Sao+Paulo',
      availableDatasets: collections.map((name) => `/api/v1/${name}`),
    },
  });
};

router.get('/', welcomeHandler);
router.get('/health', (_req: Request, res: Response) => {
  const collections = jsonStore.getAvailableCollections();
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'backend',
    version: '1.2.0',
    availableCollections: collections,
  });
});

router.get('/collections', (_req: Request, res: Response) => {
  const collections = jsonStore.getAvailableCollections();
  const summary = collections.map((name) => {
    const items = jsonStore.readCollection(name);
    return {
      name,
      endpoint: `/api/v1/${name}`,
      totalItems: items.length,
      sampleFields: items.length > 0 ? Object.keys(items[0]) : [],
    };
  });

  res.status(200).json({ data: summary });
});

export const healthRoutes = router;
