import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HttpCityDistanceRepository } from '../core/infrastructure/repositories/http-city-distance.repository';

global.fetch = vi.fn();

describe('Hexagonal City Distance Repository (HttpCityDistanceRepository)', () => {
  let repository: HttpCityDistanceRepository;

  beforeEach(() => {
    vi.resetAllMocks();
    repository = new HttpCityDistanceRepository();
  });

  it('should fetch supported mapped cities list', async () => {
    const mockResponse = {
      data: [
        { name: 'São Paulo', country: 'Brazil', lat: -23.55, lng: -46.63 },
        { name: 'Curitiba', country: 'Brazil', lat: -25.42, lng: -49.27 },
      ],
      total: 2,
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const cities = await repository.getSupportedCities();
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/city-distance/cities'),
      expect.any(Object)
    );
    expect(cities).toHaveLength(2);
    expect(cities[0].name).toBe('São Paulo');
  });

  it('should calculate distance between two cities', async () => {
    const mockResponse = {
      data: {
        origin: { name: 'São Paulo', coordinates: { lat: -23.55, lng: -46.63, country: 'Brazil' } },
        destination: {
          name: 'Curitiba',
          coordinates: { lat: -25.42, lng: -49.27, country: 'Brazil' },
        },
        distance: { kilometers: 338.4, miles: 210.3, nauticalMiles: 182.7 },
        estimatedTravelTime: {
          airplane: '45 min',
          car: '5h 17m',
          bicycle: '20h 18m',
          walking: '77h 50m',
        },
      },
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await repository.calculateDistance('São Paulo', 'Curitiba');
    expect(result.distance.kilometers).toBe(338.4);
    expect(result.origin.name).toBe('São Paulo');
  });
});
