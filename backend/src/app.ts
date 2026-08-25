import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Clean Feature Modules
import { healthRoutes } from './routes/health';
import { weatherRoutes } from './routes/weather';
import { placeholderRoutes } from './routes/placeholders';
import { textAnalysisRoutes } from './routes/textAnalysis';
import { searchRoutes } from './routes/search';
import { randomRoutes } from './routes/random';
import { combosRoutes } from './routes/combos';
import { analyticsRoutes } from './routes/analytics';
import { movieRoutes } from './routes/movies';
import { recipeRoutes } from './routes/recipes';
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

  // 1. Health & Discovery Index
  app.use('/api/v1', healthRoutes);

  // 2. Dedicated Feature APIs (Clean Architecture)
  app.use('/api/v1/weather', weatherRoutes);
  app.use('/api/v1/placeholders', placeholderRoutes);
  app.use('/api/v1/text-analysis', textAnalysisRoutes);
  app.use('/api/v1/search', searchRoutes);
  app.use('/api/v1/random', randomRoutes);
  app.use('/api/v1/combos', combosRoutes);
  app.use('/api/v1', analyticsRoutes);

  // 3. Backward-compatibility aliases for /api/v1/utils/*
  app.use('/api/v1/utils/weather', weatherRoutes);
  app.use('/api/v1/utils/placeholder.svg', placeholderRoutes);
  app.use('/api/v1/utils/analyze-text', textAnalysisRoutes);

  // 4. Catalog APIs
  app.use('/api/v1/movies', movieRoutes);
  app.use('/api/v1/recipes', recipeRoutes);

  // 5. Dynamic Collection Fallback for any dataset in data/<collection>/
  app.use('/api/v1/:collection', createCollectionRouter());

  return app;
}
