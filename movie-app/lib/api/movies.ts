import { PaginatedMovieResponse, SingleMovieResponse, Movie } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export async function fetchMovies(page = 1, limit = 9): Promise<PaginatedMovieResponse> {
  const res = await fetch(`${API_BASE_URL}/movies?page=${page}&limit=${limit}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch movies: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchMovieById(id: string): Promise<Movie | null> {
  const res = await fetch(`${API_BASE_URL}/movies/${id}`, {
    cache: 'no-store',
  });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch movie ${id}: ${res.statusText}`);
  }
  const data: SingleMovieResponse = await res.json();
  return data.data;
}

export async function searchMovies(query: string, page = 1, limit = 9): Promise<PaginatedMovieResponse> {
  const res = await fetch(`${API_BASE_URL}/movies/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Failed to search movies: ${res.statusText}`);
  }
  return res.json();
}
