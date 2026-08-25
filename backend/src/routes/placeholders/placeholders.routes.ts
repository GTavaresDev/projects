import { Router, Request, Response } from 'express';
import { PlaceholderService } from './placeholders.service';

const router = Router();

// GET /api/v1/placeholders/svg?width=600&height=400&text=...
router.get('/svg', (req: Request, res: Response) => {
  const width = parseInt((req.query.width as string) || '600', 10);
  const height = parseInt((req.query.height as string) || '400', 10);
  const text = req.query.text as string;
  const bg = (req.query.bg as string) || '0f172a';
  const color = (req.query.color as string) || '94a3b8';

  const svg = PlaceholderService.generateSvg({ width, height, text, bg, color });
  res.type('image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send(svg);
});

// Shortcut: GET /api/v1/placeholders/:width/:height
router.get('/:width/:height', (req: Request, res: Response) => {
  const width = parseInt(req.params.width, 10) || 600;
  const height = parseInt(req.params.height, 10) || 400;
  const text = req.query.text as string;
  const bg = (req.query.bg as string) || '1e1b4b';
  const color = (req.query.color as string) || '818cf8';

  const svg = PlaceholderService.generateSvg({ width, height, text, bg, color });
  res.type('image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send(svg);
});

export const placeholderRoutes = router;
