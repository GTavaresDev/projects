import { MovieRepository } from '../../domain/ports/movie.repository';
import { Movie, PaginatedMovieResponse, SingleMovieResponse } from '../../domain/models/movie';
import { request, ApiError } from '../http/api-client';

export class HttpMovieRepository implements MovieRepository {
  async getMovies(page = 1, limit = 9): Promise<PaginatedMovieResponse> {
    return request<PaginatedMovieResponse>(`/movies?page=${page}&limit=${limit}`);
  }

  async getMovieById(id: string): Promise<Movie | null> {
    try {
      const response = await request<SingleMovieResponse>(`/movies/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 404) {
        return null;
      }
      throw error;
    }
  }

  async searchMovies(query: string, page = 1, limit = 9): Promise<PaginatedMovieResponse> {
    return request<PaginatedMovieResponse>(
      `/movies/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
  }
}

// Singleton repository instance for convenient usage
export const movieRepository = new HttpMovieRepository();
