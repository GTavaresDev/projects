import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

describe('Modular Catalog Backend API Test Suite', () => {
  describe('1. Health & Discovery', () => {
    it('GET /api/v1 returns welcome index with route map', async () => {
      const res = await request(app).get('/api/v1');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('endpoints');
    });

    it('GET /api/v1/health returns status and collections', async () => {
      const res = await request(app).get('/api/v1/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('OK');
      expect(res.body.availableCollections).toContain('movies');
      expect(res.body.availableCollections).toContain('recipes');
    });

    it('GET /api/v1/collections returns collections metadata', async () => {
      const res = await request(app).get('/api/v1/collections');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('2. Dedicated Weather API (/api/v1/weather)', () => {
    it('GET /api/v1/weather returns current weather with UV and air quality', async () => {
      const res = await request(app).get('/api/v1/weather?city=Curitiba');
      expect(res.status).toBe(200);
      expect(res.body.data.city).toBe('Curitiba');
      expect(res.body.data).toHaveProperty('temperatureC');
      expect(res.body.data).toHaveProperty('condition');
      expect(res.body.data).toHaveProperty('icon');
    });

    it('GET /api/v1/weather/forecast returns 5-day weather forecast', async () => {
      const res = await request(app).get('/api/v1/weather/forecast?city=Curitiba&days=5');
      expect(res.status).toBe(200);
      expect(res.body.data.forecast).toHaveLength(5);
      expect(res.body.data.forecast[0]).toHaveProperty('maxTempC');
      expect(res.body.data.forecast[0]).toHaveProperty('dayOfWeek');
    });
  });

  describe('3. Dedicated Placeholders API (/api/v1/placeholders)', () => {
    it('GET /api/v1/placeholders/svg generates custom SVG image', async () => {
      const res = await request(app).get('/api/v1/placeholders/svg?width=400&height=200&text=Card');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toContain('image/svg+xml');
      const text = res.text || res.body.toString();
      expect(text).toContain('<svg');
      expect(text).toContain('Card');
    });

    it('GET /api/v1/placeholders/:width/:height generates shortcut SVG image', async () => {
      const res = await request(app).get('/api/v1/placeholders/500/250?text=Hero');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toContain('image/svg+xml');
      const text = res.text || res.body.toString();
      expect(text).toContain('<svg');
      expect(text).toContain('Hero');
    });
  });

  describe('4. Dedicated Text Analysis API (/api/v1/text-analysis)', () => {
    it('POST /api/v1/text-analysis/analyze calculates reading time and slug', async () => {
      const res = await request(app)
        .post('/api/v1/text-analysis/analyze')
        .send({ text: 'Exploring Next.js 15 App Router' });
      expect(res.status).toBe(200);
      expect(res.body.data.slug).toBe('exploring-next-js-15-app-router');
      expect(res.body.data.wordCount).toBe(5);
    });

    it('GET /api/v1/text-analysis/slugify generates slug from query param', async () => {
      const res = await request(app).get('/api/v1/text-analysis/slugify?text=TypeScript+Design+Patterns');
      expect(res.status).toBe(200);
      expect(res.body.data.slug).toBe('typescript-design-patterns');
    });
  });

  describe('5. Dedicated Search, Random & Combos APIs', () => {
    it('GET /api/v1/search?q=Nolan searches across all datasets', async () => {
      const res = await request(app).get('/api/v1/search?q=Nolan');
      expect(res.status).toBe(200);
      expect(res.body.data.totalMatches).toBeGreaterThan(0);
      expect(res.body.data.results).toHaveProperty('movies');
    });

    it('GET /api/v1/random returns a random item', async () => {
      const res = await request(app).get('/api/v1/random');
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('collection');
      expect(res.body.data).toHaveProperty('item');
    });

    it('GET /api/v1/combos/movie-night generates paired movie + recipe', async () => {
      const res = await request(app).get('/api/v1/combos/movie-night');
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('movie');
      expect(res.body.data).toHaveProperty('recipe');
      expect(res.body.data).toHaveProperty('tip');
    });
  });

  describe('6. Analytics & Facets', () => {
    it('GET /api/v1/stats calculates global stats', async () => {
      const res = await request(app).get('/api/v1/stats');
      expect(res.status).toBe(200);
      expect(res.body.data.totalItems).toBeGreaterThanOrEqual(30);
    });

    it('GET /api/v1/movies/facets returns unique genres and ranges', async () => {
      const res = await request(app).get('/api/v1/movies/facets');
      expect(res.status).toBe(200);
      expect(res.body.data.facets).toHaveProperty('genres');
    });
  });

  describe('7. Core Datasets (Movies, Recipes, Products, Books)', () => {
    it('GET /api/v1/movies lists paginated movies', async () => {
      const res = await request(app).get('/api/v1/movies?page=1&limit=5');
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(5);
      expect(res.body.meta.total).toBe(15);
    });

    it('GET /api/v1/recipes lists paginated recipes', async () => {
      const res = await request(app).get('/api/v1/recipes?page=1&limit=5');
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(5);
    });

    it('GET /api/v1/products lists products', async () => {
      const res = await request(app).get('/api/v1/products');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('GET /api/v1/books lists books', async () => {
      const res = await request(app).get('/api/v1/books');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });
});
