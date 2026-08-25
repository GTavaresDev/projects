import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

describe('Clean Catalog Backend API Test Suite', () => {
  describe('1. Health & Discovery', () => {
    it('GET /api/v1 returns welcome index with route map', async () => {
      const res = await request(app).get('/api/v1');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('endpoints');
      expect(res.body.endpoints).toHaveProperty('movies');
      expect(res.body.endpoints).toHaveProperty('books');
      expect(res.body.endpoints).toHaveProperty('cityDistance');
    });

    it('GET /api/v1/health returns status and active collections', async () => {
      const res = await request(app).get('/api/v1/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('OK');
      expect(res.body.availableCollections).toContain('movies');
      expect(res.body.availableCollections).toContain('books');
    });

    it('GET /api/v1/collections returns collections metadata', async () => {
      const res = await request(app).get('/api/v1/collections');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      const names = res.body.data.map((c: any) => c.name);
      expect(names).toContain('movies');
      expect(names).toContain('books');
    });
  });

  describe('2. Movies Catalog API (/api/v1/movies)', () => {
    it('GET /api/v1/movies lists paginated movies', async () => {
      const res = await request(app).get('/api/v1/movies?page=1&limit=5');
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(5);
      expect(res.body.meta.total).toBe(15);
    });

    it('GET /api/v1/movies/search finds movies by term', async () => {
      const res = await request(app).get('/api/v1/movies/search?q=Inception');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0].name).toBe('Inception');
    });
  });

  describe('3. Books Catalog API (/api/v1/books)', () => {
    it('GET /api/v1/books lists books', async () => {
      const res = await request(app).get('/api/v1/books');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThanOrEqual(4);
    });

    it('GET /api/v1/books/:id fetches single book', async () => {
      const res = await request(app).get('/api/v1/books/book-001');
      expect(res.status).toBe(200);
      expect(res.body.data.name).toContain('Clean Code');
    });

    it('GET /api/v1/books/search searches books by tag or author', async () => {
      const res = await request(app).get('/api/v1/books/search?q=Martin');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('4. Spotlight Search (/api/v1/search)', () => {
    it('GET /api/v1/search?q=Code searches across datasets', async () => {
      const res = await request(app).get('/api/v1/search?q=Code');
      expect(res.status).toBe(200);
      expect(res.body.data.totalMatches).toBeGreaterThan(0);
      expect(res.body.data.results).toHaveProperty('books');
    });
  });

  describe('5. City Distance & Word Comparison API (/api/v1/city-distance)', () => {
    it('GET /api/v1/city-distance/cities returns list of mapped cities', async () => {
      const res = await request(app).get('/api/v1/city-distance/cities');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.total).toBeGreaterThanOrEqual(15);
      const cityNames = res.body.data.map((c: any) => c.name);
      expect(cityNames).toContain('São Paulo');
      expect(cityNames).toContain('Curitiba');
      expect(cityNames).toContain('Tokyo');
    });

    it('GET /api/v1/city-distance calculates distance between mapped cities', async () => {
      const res = await request(app).get('/api/v1/city-distance?origin=Sao+Paulo&destination=Curitiba');
      expect(res.status).toBe(200);
      expect(res.body.data.distance.kilometers).toBeGreaterThan(300);
      expect(res.body.data.distance.kilometers).toBeLessThan(450);
      expect(res.body.data.estimatedTravelTime).toHaveProperty('airplane');
      expect(res.body.data.estimatedTravelTime).toHaveProperty('car');
    });

    it('GET /api/v1/city-distance returns 400 for unmapped city', async () => {
      const res = await request(app).get('/api/v1/city-distance?origin=Atlantis&destination=Curitiba');
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('UNSUPPORTED_CITY');
    });

    it('GET /api/v1/city-distance/word-compare compares letters and anagrams', async () => {
      const res = await request(app).get('/api/v1/city-distance/word-compare?word1=roma&word2=amor');
      expect(res.status).toBe(200);
      expect(res.body.data.isAnagram).toBe(true);
      expect(res.body.data.commonLetters).toEqual(['a', 'm', 'o', 'r']);
      expect(res.body.data.similarityPercentage).toBe(100);
    });
  });
});
