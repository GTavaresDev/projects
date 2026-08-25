import { Router, Request, Response } from 'express';

const router = Router();

// Dynamic SVG Placeholder Generator
// e.g., <img src="http://localhost:4000/api/v1/utils/placeholder.svg?width=600&height=400&text=My+Card&bg=1e1b4b&color=818cf8" />
router.get('/utils/placeholder.svg', (req: Request, res: Response) => {
  const width = parseInt((req.query.width as string) || '600', 10);
  const height = parseInt((req.query.height as string) || '400', 10);
  const text = (req.query.text as string) || `${width} × ${height}`;
  const bg = (req.query.bg as string) || '0f172a';
  const color = (req.query.color as string) || '94a3b8';
  const fontSize = Math.max(16, Math.floor(Math.min(width, height) / 12));

  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#${bg}"/><line x1="0" y1="0" x2="${width}" y2="${height}" stroke="#${color}" stroke-width="1" stroke-opacity="0.15"/><line x1="0" y1="${height}" x2="${width}" y2="0" stroke="#${color}" stroke-width="1" stroke-opacity="0.15"/><circle cx="${width / 2}" cy="${height / 2}" r="${Math.min(width, height) / 4}" fill="none" stroke="#${color}" stroke-width="1.5" stroke-opacity="0.25"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="${fontSize}" font-weight="600" fill="#${color}">${text}</text></svg>`;

  res.type('image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send(svg);
});

// Text Analysis & Slug Utility
router.post('/utils/analyze-text', (req: Request, res: Response) => {
  const { text } = req.body;
  if (typeof text !== 'string') {
    res.status(400).json({ error: { code: 'INVALID_INPUT', message: 'Body field "text" must be a string' } });
    return;
  }

  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCount = text.length;
  const readingTimeMinutes = parseFloat((wordCount / 200).toFixed(2));
  const slug = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  res.status(200).json({
    data: {
      originalText: text,
      slug,
      wordCount,
      charCount,
      readingTimeMinutes,
      estimatedReadingTime: readingTimeMinutes < 1 ? '< 1 min read' : `${Math.ceil(readingTimeMinutes)} min read`,
    },
  });
});

// Dynamic Weather Simulation for Weather Widgets
router.get('/utils/weather', (req: Request, res: Response) => {
  const city = (req.query.city as string) || 'São Paulo';
  
  let hash = 0;
  for (let i = 0; i < city.length; i++) {
    hash = (hash << 5) - hash + city.charCodeAt(i);
    hash |= 0;
  }
  const currentHour = new Date().getHours();
  const seed = Math.abs(hash + currentHour);

  const temperatures = [18, 21, 24, 27, 29, 31, 23, 19];
  const conditions = [
    { name: 'Sunny', icon: '☀️', humidity: 45 },
    { name: 'Partly Cloudy', icon: '⛅', humidity: 55 },
    { name: 'Cloudy', icon: '☁️', humidity: 65 },
    { name: 'Scattered Showers', icon: '🌦️', humidity: 75 },
    { name: 'Thunderstorm', icon: '⛈️', humidity: 85 },
  ];

  const temp = temperatures[seed % temperatures.length];
  const condition = conditions[seed % conditions.length];

  res.status(200).json({
    data: {
      city,
      temperatureC: temp,
      temperatureF: Math.round((temp * 9) / 5 + 32),
      feelsLikeC: temp + 2,
      condition: condition.name,
      icon: condition.icon,
      humidity: condition.humidity,
      windSpeedKmH: (seed % 20) + 5,
      updatedAt: new Date().toISOString(),
    },
  });
});

export const utilsRoutes = router;
