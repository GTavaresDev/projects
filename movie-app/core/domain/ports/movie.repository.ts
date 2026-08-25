import { Movie, PaginatedMovieResponse } from '../models/movie';

export interface MovieRepository {
  getMovies(page?: number, limit?: number): Promise<PaginatedMovieResponse>;
  getMovieById(id: string): Promise<Movie | null>;
  searchMovies(query: string, page?: number, limit?: number): Promise<PaginatedMovieResponse>;
}
