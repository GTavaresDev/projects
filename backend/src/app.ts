import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { healthRoutes } from './routes/health';
import { spotlightRoutes } from './routes/spotlight';
import { analyticsRoutes } from './routes/analytics';
import { utilsRoutes } from './routes/utils';
import { movieRoutes } from './routes/movies';
import { recipeRoutes } from './routes/recipes';
import { createCollectionRouter } from './routes/genericCollection';

dotenv.config();

export function createApp(): Express {
  const app = express();

  app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
  app.use(express.json());

  // Root redirect/welcome
  app.get('/', (_req: Request, res: Response) => {
    res.redirect('/api/v1');
  });

  // 1. Health & Discovery (mounted at /api/v1)
  app.use('/api/v1', healthRoutes);

  // 2. Spotlight, Recommendations & Random generator
  app.use('/api/v1', spotlightRoutes);

  // 3. Developer & UI Dynamic Utilities (Placeholders, Weather, Text Analysis)
  app.use('/api/v1', utilsRoutes);

  // 4. Analytics, Metrics & Facets
  app.use('/api/v1', analyticsRoutes);

  // 5. Dedicated catalog endpoints
  app.use('/api/v1/movies', movieRoutes);
  app.use('/api/v1/recipes', recipeRoutes);

  // 6. Generic Dynamic Fallback for any dataset under data/
  app.use('/api/v1/:collection', createCollectionRouter());

  return app;
}
