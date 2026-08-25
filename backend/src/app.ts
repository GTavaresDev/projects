import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Clean Feature Modules
import { healthRoutes } from './routes/health';
import { movieRoutes } from './routes/movies';
import { bookRoutes } from './routes/books';
import { searchRoutes } from './routes/search';
import { createCityDistanceRouter } from './routes/cityDistance';
import { createCollectionRouter } from './routes/genericCollection';

dotenv.config();

export function createApp(): Express {
  const app = express();

  app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
  app.use(express.json());

  // Root redirect
  app.get('/', (_req: Request, res: Response) => {
    res.redirect('/api/v1');
  });

  // 1. Health & Discovery Index (/api/v1/health, /api/v1/collections, /api/v1)
  app.use('/api/v1', healthRoutes);

  // 2. Core Catalogs
  app.use('/api/v1/movies', movieRoutes);
  app.use('/api/v1/books', bookRoutes);

  // 3. Search (Spotlight across Movies & Books)
  app.use('/api/v1/search', searchRoutes);

  // 4. Fun Utility API: City Distance & Word Comparison
  app.use('/api/v1/city-distance', createCityDistanceRouter());

  // 5. Dynamic Fallback for any dataset in data/<collection>/
  app.use('/api/v1/:collection', createCollectionRouter());

  return app;
}
