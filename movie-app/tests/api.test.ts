import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HttpMovieRepository } from '../core/infrastructure/repositories/http-movie.repository';

global.fetch = vi.fn();

describe('Hexagonal Movie Repository Adapter (HttpMovieRepository)', () => {
  let repository: HttpMovieRepository;

  beforeEach(() => {
    vi.resetAllMocks();
    repository = new HttpMovieRepository();
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

    const result = await repository.getMovies(1, 9);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/v1/movies?page=1&limit=9',
      expect.any(Object)
    );
    expect(result.data).toHaveLength(1);
    expect(result.data[0].name).toBe('Inception');
  });

  it('should return null when movie is not found (404)', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      status: 404,
      ok: false,
      json: async () => ({ error: { code: 'MOVIE_NOT_FOUND', message: 'Not found' } }),
    });

    const result = await repository.getMovieById('non-existent');
    expect(result).toBeNull();
  });

  it('should search movies with search query parameter', async () => {
    const mockResponse = {
      data: [
        { id: 'movie-2', name: 'Interstellar', description: 'Space', image: 'http://img.png' },
      ],
      meta: { page: 1, limit: 9, total: 1, totalPages: 1 },
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await repository.searchMovies('space', 1, 9);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/v1/movies/search?q=space&page=1&limit=9',
      expect.any(Object)
    );
    expect(result.data[0].name).toBe('Interstellar');
  });
});
