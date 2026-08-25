import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

describe('Enhanced Catalog Backend API Test Suite', () => {
  describe('System & Discovery', () => {
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

  describe('Spotlight & Combinations', () => {
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

    it('GET /api/v1/combos/movie-night generates a paired movie + recipe evening', async () => {
      const res = await request(app).get('/api/v1/combos/movie-night');
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('movie');
      expect(res.body.data).toHaveProperty('recipe');
      expect(res.body.data).toHaveProperty('tip');
    });
  });

  describe('Analytics & Facets', () => {
    it('GET /api/v1/stats calculates global averages and tag counts', async () => {
      const res = await request(app).get('/api/v1/stats');
      expect(res.status).toBe(200);
      expect(res.body.data.totalItems).toBeGreaterThanOrEqual(30);
      expect(res.body.data.collections).toHaveProperty('movies');
    });

    it('GET /api/v1/movies/facets returns unique genres and rating ranges', async () => {
      const res = await request(app).get('/api/v1/movies/facets');
      expect(res.status).toBe(200);
      expect(res.body.data.facets).toHaveProperty('genres');
      expect(res.body.data.facets).toHaveProperty('ratingRange');
    });
  });

  describe('Developer Utilities', () => {
    it('GET /api/v1/utils/placeholder.svg generates valid SVG', async () => {
      const res = await request(app).get('/api/v1/utils/placeholder.svg?width=400&height=200&text=Test');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toContain('image/svg+xml');
      const text = res.text || res.body.toString();
      expect(text).toContain('<svg');
      expect(text).toContain('Test');
    });

    it('POST /api/v1/utils/analyze-text calculates reading time and slug', async () => {
      const res = await request(app)
        .post('/api/v1/utils/analyze-text')
        .send({ text: 'Hello World from Next.js & Express!' });
      expect(res.status).toBe(200);
      expect(res.body.data.slug).toBe('hello-world-from-next-js-express');
      expect(res.body.data.wordCount).toBe(6);
    });

    it('GET /api/v1/utils/weather returns dynamic weather simulation', async () => {
      const res = await request(app).get('/api/v1/utils/weather?city=Lisbon');
      expect(res.status).toBe(200);
      expect(res.body.data.city).toBe('Lisbon');
      expect(res.body.data).toHaveProperty('temperatureC');
      expect(res.body.data).toHaveProperty('condition');
    });
  });

  describe('Core Datasets (Movies, Recipes, Products, Books)', () => {
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

    it('GET /api/v1/products lists tech items', async () => {
      const res = await request(app).get('/api/v1/products');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('GET /api/v1/books lists literature & tech books', async () => {
      const res = await request(app).get('/api/v1/books');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });
});
