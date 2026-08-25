import { Router, Request, Response } from 'express';
import { WeatherService } from './weather.service';

const router = Router();

// GET /api/v1/weather?city=Curitiba
router.get('/', (req: Request, res: Response) => {
  const city = (req.query.city as string) || 'São Paulo';
  const data = WeatherService.getCurrentWeather(city);
  res.status(200).json({ data });
});

// GET /api/v1/weather/forecast?city=Curitiba&days=5
router.get('/forecast', (req: Request, res: Response) => {
  const city = (req.query.city as string) || 'São Paulo';
  const days = parseInt((req.query.days as string) || '5', 10);
  const data = WeatherService.getForecast(city, days);
  res.status(200).json({ data });
});

export const weatherRoutes = router;
