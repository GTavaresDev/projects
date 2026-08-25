import { Router, Request, Response } from 'express';
import { jsonStore } from '../../services/jsonStore';

const router = Router();

// Welcome / API Directory Index
const welcomeHandler = (_req: Request, res: Response) => {
  const collections = jsonStore.getAvailableCollections();
  res.status(200).json({
    message: '🚀 Catalog Backend API is running successfully!',
    version: '1.3.0',
    documentation: 'See .agents/API_REFERENCE.md',
    endpoints: {
      health: '/api/v1/health',
      collectionsSummary: '/api/v1/collections',
      movies: '/api/v1/movies',
      books: '/api/v1/books',
      universalSearch: '/api/v1/search?q=:term',
      cityDistance: '/api/v1/city-distance?origin=Sao+Paulo&destination=Curitiba',
      wordCompare: '/api/v1/city-distance/word-compare?word1=algoritmo&word2=logaritmo',
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
    version: '1.3.0',
    availableCollections: collections,
  });
});

router.get('/collections', (_req: Request, res: Response) => {
  const collections = jsonStore.getAvailableCollections();
  const summary = collections.map((name) => {
    const items = jsonStore.readCollection(name);
    let sampleFields: string[];
    if (items.length > 0) {
      sampleFields = Object.keys(items[0]);
    } else {
      sampleFields = [];
    }
    return {
      name,
      endpoint: `/api/v1/${name}`,
      totalItems: items.length,
      sampleFields,
    };
  });

  res.status(200).json({ data: summary });
});

export const healthRoutes = router;
