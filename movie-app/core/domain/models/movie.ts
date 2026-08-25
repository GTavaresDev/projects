export interface Movie {
  id: string;
  name: string;
  description: string;
  image: string;
  genre?: string;
  year?: number;
  rating?: number;
  duration?: string;
  director?: string;
  featured?: boolean;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedMovieResponse {
  data: Movie[];
  meta: PaginationMeta;
}

export interface SingleMovieResponse {
  data: Movie;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
  };
}
