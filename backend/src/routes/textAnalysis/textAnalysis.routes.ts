import { Router, Request, Response } from 'express';
import { TextAnalysisService } from './textAnalysis.service';

const router = Router();

// POST /api/v1/text-analysis/analyze
router.post('/analyze', (req: Request, res: Response) => {
  const { text } = req.body;
  if (typeof text !== 'string') {
    res.status(400).json({ error: { code: 'INVALID_INPUT', message: 'Body field "text" must be a string' } });
    return;
  }

  const data = TextAnalysisService.analyze(text);
  res.status(200).json({ data });
});

// GET /api/v1/text-analysis/slugify?text=...
router.get('/slugify', (req: Request, res: Response) => {
  const text = (req.query.text as string) || '';
  if (!text.trim()) {
    res.status(400).json({ error: { code: 'INVALID_INPUT', message: 'Query parameter "text" is required' } });
    return;
  }

  res.status(200).json({
    data: {
      text,
      slug: TextAnalysisService.slugify(text),
    },
  });
});

export const textAnalysisRoutes = router;
