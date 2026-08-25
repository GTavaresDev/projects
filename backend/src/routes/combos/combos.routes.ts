import { Router, Request, Response } from 'express';
import { CombosService } from './combos.service';

const router = Router();

// GET /api/v1/combos/movie-night?genre=Sci-Fi
router.get('/movie-night', (req: Request, res: Response) => {
  const genreParam = req.query.genre as string;
  const combo = CombosService.getMovieNight(genreParam);

  if (!combo) {
    res.status(404).json({ error: { code: 'DATA_UNAVAILABLE', message: 'Movies or recipes dataset is empty' } });
    return;
  }

  res.status(200).json({ data: combo });
});

export const combosRoutes = router;
