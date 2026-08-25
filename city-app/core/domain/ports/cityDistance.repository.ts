import { CityDistanceResponse, CityInfo, WordComparison } from '../models/cityDistance';

export interface CityDistanceRepository {
  getSupportedCities(): Promise<CityInfo[]>;
  calculateDistance(origin: string, destination: string): Promise<CityDistanceResponse>;
  compareWords(word1: string, word2: string): Promise<WordComparison>;
}
