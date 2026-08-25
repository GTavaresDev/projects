export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public responseBody?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  let url: string;
  if (endpoint.startsWith('/')) {
    url = `${API_BASE_URL}${endpoint}`;
  } else {
    url = `${API_BASE_URL}/${endpoint}`;
  }

  const response = await fetch(url, {
    cache: 'no-store',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = null;
    }

    let errorMessage: string;
    if (errorData && errorData.error && errorData.error.message) {
      errorMessage = errorData.error.message;
    } else {
      errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    }

    throw new ApiError(errorMessage, response.status, errorData);
  }

  return response.json();
}
