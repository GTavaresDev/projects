import { Router, Request, Response } from 'express';
import { RandomService } from './random.service';

const router = Router();

// GET /api/v1/random (Roulette)
router.get('/', (req: Request, res: Response) => {
  const collectionParam = req.query.collection as string;
  const result = RandomService.getRandomItem(collectionParam);

  if (!result) {
    res.status(404).json({ error: { code: 'NO_DATA', message: 'No item found' } });
    return;
  }

  res.status(200).json({ data: result });
});

export const randomRoutes = router;
