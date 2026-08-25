export interface Coordinates {
  lat: number;
  lng: number;
  country: string;
}

export interface CityInfo {
  name: string;
  country: string;
  lat: number;
  lng: number;
}

export interface WordComparison {
  word1: string;
  word2: string;
  commonLetters: string[];
  commonLettersCount: number;
  sharedVowels: string[];
  sharedConsonants: string[];
  isAnagram: boolean;
  similarityPercentage: number;
}

export interface CityDistanceResponse {
  origin: {
    name: string;
    coordinates: Coordinates;
  };
  destination: {
    name: string;
    coordinates: Coordinates;
  };
  distance: {
    kilometers: number;
    miles: number;
    nauticalMiles: number;
  };
  estimatedTravelTime: {
    airplane: string;
    car: string;
    bicycle: string;
    walking: string;
  };
}

export interface ApiDataResponse<T> {
  data: T;
  total?: number;
}
