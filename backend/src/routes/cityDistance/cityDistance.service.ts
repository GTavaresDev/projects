import { Coordinates, CityInfo, WordComparison, CityDistanceResponse } from './cityDistance.types';

export class CityDistanceService {
  private static readonly supportedCities: Record<string, Coordinates & { displayName: string }> = {
    saopaulo: { displayName: 'São Paulo', lat: -23.5505, lng: -46.6333, country: 'Brazil' },
    riodejaneiro: { displayName: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729, country: 'Brazil' },
    curitiba: { displayName: 'Curitiba', lat: -25.4284, lng: -49.2733, country: 'Brazil' },
    brasilia: { displayName: 'Brasília', lat: -15.7975, lng: -47.8919, country: 'Brazil' },
    goiania: { displayName: 'Goiânia', lat: -16.6869, lng: -49.2648, country: 'Brazil' },
    salvador: { displayName: 'Salvador', lat: -12.9777, lng: -38.5016, country: 'Brazil' },
    florianopolis: { displayName: 'Florianópolis', lat: -27.5954, lng: -48.548, country: 'Brazil' },
    portoalegre: { displayName: 'Porto Alegre', lat: -30.0346, lng: -51.2177, country: 'Brazil' },
    belohorizonte: { displayName: 'Belo Horizonte', lat: -19.9167, lng: -43.9345, country: 'Brazil' },
    recife: { displayName: 'Recife', lat: -8.0476, lng: -34.877, country: 'Brazil' },
    fortaleza: { displayName: 'Fortaleza', lat: -3.7172, lng: -38.5433, country: 'Brazil' },
    manaus: { displayName: 'Manaus', lat: -3.119, lng: -60.0217, country: 'Brazil' },
    tokyo: { displayName: 'Tokyo', lat: 35.6762, lng: 139.6503, country: 'Japan' },
    newyork: { displayName: 'New York', lat: 40.7128, lng: -74.006, country: 'USA' },
    london: { displayName: 'London', lat: 51.5074, lng: -0.1278, country: 'United Kingdom' },
    paris: { displayName: 'Paris', lat: 48.8566, lng: 2.3522, country: 'France' },
    lisbon: { displayName: 'Lisbon', lat: 38.7223, lng: -9.1393, country: 'Portugal' },
    berlin: { displayName: 'Berlin', lat: 52.52, lng: 13.405, country: 'Germany' },
    rome: { displayName: 'Rome', lat: 41.9028, lng: 12.4964, country: 'Italy' },
    buenosaires: { displayName: 'Buenos Aires', lat: -34.6037, lng: -58.3816, country: 'Argentina' },
    sydney: { displayName: 'Sydney', lat: -33.8688, lng: 151.2093, country: 'Australia' },
  };

  private static normalizeKey(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');
  }

  public static getSupportedCities(): CityInfo[] {
    return Object.values(this.supportedCities).map((c) => ({
      name: c.displayName,
      country: c.country,
      lat: c.lat,
      lng: c.lng,
    }));
  }

  public static getCoordinates(cityName: string): { name: string; coordinates: Coordinates } | null {
    const key = this.normalizeKey(cityName);
    const found = this.supportedCities[key];
    if (found) {
      return {
        name: found.displayName,
        coordinates: {
          lat: found.lat,
          lng: found.lng,
          country: found.country,
        },
      };
    }
    return null;
  }

  public static calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const earthRadiusKm = 6371;

    const dLat = toRad(coord2.lat - coord1.lat);
    const dLng = toRad(coord2.lng - coord1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coord1.lat)) *
        Math.cos(toRad(coord2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(earthRadiusKm * c * 10) / 10;
  }

  public static formatHours(totalHours: number): string {
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);

    if (hours === 0) {
      return `${minutes} min`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  }

  public static calculateCityDistance(originCity: string, destinationCity: string): CityDistanceResponse {
    const originData = this.getCoordinates(originCity);
    if (!originData) {
      throw new Error(`City "${originCity}" is not in the mapped registry. Check /api/v1/city-distance/cities for supported cities.`);
    }

    const destData = this.getCoordinates(destinationCity);
    if (!destData) {
      throw new Error(`City "${destinationCity}" is not in the mapped registry. Check /api/v1/city-distance/cities for supported cities.`);
    }

    const km = this.calculateDistance(originData.coordinates, destData.coordinates);
    const miles = Math.round(km * 0.621371 * 10) / 10;
    const nauticalMiles = Math.round(km * 0.539957 * 10) / 10;

    return {
      origin: {
        name: originData.name,
        coordinates: originData.coordinates,
      },
      destination: {
        name: destData.name,
        coordinates: destData.coordinates,
      },
      distance: {
        kilometers: km,
        miles,
        nauticalMiles,
      },
      estimatedTravelTime: {
        airplane: this.formatHours(km / 800 + 0.5),
        car: this.formatHours((km * 1.25) / 80),
        bicycle: this.formatHours((km * 1.2) / 20),
        walking: this.formatHours((km * 1.15) / 5),
      },
    };
  }

  public static compareWords(w1: string, w2: string): WordComparison {
    const clean1 = w1.toLowerCase().replace(/[^a-z0-9]/g, '');
    const clean2 = w2.toLowerCase().replace(/[^a-z0-9]/g, '');

    const set1 = new Set(clean1.split(''));
    const set2 = new Set(clean2.split(''));

    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    const commonLetters: string[] = [];
    const sharedVowels: string[] = [];
    const sharedConsonants: string[] = [];

    set1.forEach((char) => {
      if (set2.has(char)) {
        commonLetters.push(char);
        if (vowels.has(char)) {
          sharedVowels.push(char);
        } else {
          sharedConsonants.push(char);
        }
      }
    });

    const sorted1 = clean1.split('').sort().join('');
    const sorted2 = clean2.split('').sort().join('');
    let isAnagram: boolean;
    if (clean1.length > 0 && sorted1 === sorted2) {
      isAnagram = true;
    } else {
      isAnagram = false;
    }

    const totalUniqueLetters = new Set([...set1, ...set2]).size;
    let similarityPercentage: number;
    if (totalUniqueLetters === 0) {
      similarityPercentage = 0;
    } else {
      similarityPercentage = Math.round((commonLetters.length / totalUniqueLetters) * 100);
    }

    return {
      word1: w1,
      word2: w2,
      commonLetters: commonLetters.sort(),
      commonLettersCount: commonLetters.length,
      sharedVowels: sharedVowels.sort(),
      sharedConsonants: sharedConsonants.sort(),
      isAnagram,
      similarityPercentage,
    };
  }
}
