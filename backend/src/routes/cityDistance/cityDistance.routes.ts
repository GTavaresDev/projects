import { Router, Request, Response } from 'express';
import { CityDistanceService } from './cityDistance.service';

export function createCityDistanceRouter(): Router {
  const router = Router();

  // GET /api/v1/city-distance/cities — List all supported cities
  router.get('/cities', (_req: Request, res: Response) => {
    const cities = CityDistanceService.getSupportedCities();
    return res.json({
      data: cities,
      total: cities.length,
    });
  });

  // GET /api/v1/city-distance/word-compare?word1=roma&word2=amor
  router.get('/word-compare', (req: Request, res: Response) => {
    let word1 = req.query.word1 as string;
    if (!word1) {
      word1 = (req.query.w1 as string) || 'React';
    }

    let word2 = req.query.word2 as string;
    if (!word2) {
      word2 = (req.query.w2 as string) || 'Redux';
    }

    const result = CityDistanceService.compareWords(word1, word2);
    return res.json({ data: result });
  });

  // GET /api/v1/city-distance?origin=Sao+Paulo&destination=Curitiba
  router.get('/', (req: Request, res: Response) => {
    let origin = req.query.origin as string;
    if (!origin) {
      origin = (req.query.from as string) || 'São Paulo';
    }

    let destination = req.query.destination as string;
    if (!destination) {
      destination = (req.query.to as string) || 'Curitiba';
    }

    try {
      const result = CityDistanceService.calculateCityDistance(origin, destination);
      return res.json({ data: result });
    } catch (error: any) {
      return res.status(400).json({
        error: {
          code: 'UNSUPPORTED_CITY',
          message: error.message || 'One or both cities are not supported in the mapped registry.',
          hint: 'Use GET /api/v1/city-distance/cities to see all mapped cities.',
        },
      });
    }
  });

  return router;
}
