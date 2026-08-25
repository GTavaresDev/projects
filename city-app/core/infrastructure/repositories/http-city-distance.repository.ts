import { CityDistanceRepository } from '../../domain/ports/cityDistance.repository';
import {
  CityDistanceResponse,
  CityInfo,
  WordComparison,
  ApiDataResponse,
} from '../../domain/models/cityDistance';
import { request } from '../http/api-client';

export class HttpCityDistanceRepository implements CityDistanceRepository {
  async getSupportedCities(): Promise<CityInfo[]> {
    const response = await request<ApiDataResponse<CityInfo[]>>('/city-distance/cities');
    return response.data;
  }

  async calculateDistance(origin: string, destination: string): Promise<CityDistanceResponse> {
    const encodedOrigin = encodeURIComponent(origin);
    const encodedDest = encodeURIComponent(destination);
    const response = await request<ApiDataResponse<CityDistanceResponse>>(
      `/city-distance?origin=${encodedOrigin}&destination=${encodedDest}`
    );
    return response.data;
  }

  async compareWords(word1: string, word2: string): Promise<WordComparison> {
    const encodedW1 = encodeURIComponent(word1);
    const encodedW2 = encodeURIComponent(word2);
    const response = await request<ApiDataResponse<WordComparison>>(
      `/city-distance/word-compare?word1=${encodedW1}&word2=${encodedW2}`
    );
    return response.data;
  }
}

export const cityDistanceRepository = new HttpCityDistanceRepository();
