import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchMovies, fetchMovieById, searchMovies } from '../lib/api/movies';

global.fetch = vi.fn();

describe('Movie Catalog API Client', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch movies with pagination parameters', async () => {
    const mockResponse = {
      data: [{ id: 'movie-1', name: 'Inception', description: 'Dream', image: 'http://img.png' }],
      meta: { page: 1, limit: 9, total: 1, totalPages: 1 },
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchMovies(1, 9);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/api/v1/movies?page=1&limit=9', { cache: 'no-store' });
    expect(result.data).toHaveLength(1);
    expect(result.data[0].name).toBe('Inception');
  });

  it('should return null when movie is not found (404)', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      status: 404,
      ok: false,
    });

    const result = await fetchMovieById('non-existent');
    expect(result).toBeNull();
  });

  it('should search movies with search query parameter', async () => {
    const mockResponse = {
      data: [{ id: 'movie-2', name: 'Interstellar', description: 'Space', image: 'http://img.png' }],
      meta: { page: 1, limit: 9, total: 1, totalPages: 1 },
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await searchMovies('space', 1, 9);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/api/v1/movies/search?q=space&page=1&limit=9', { cache: 'no-store' });
    expect(result.data[0].name).toBe('Interstellar');
  });
});
