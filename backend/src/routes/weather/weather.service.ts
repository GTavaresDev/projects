import { WeatherData, ForecastItem, ForecastResponse } from './weather.types';

export class WeatherService {
  private static temperatures = [17, 19, 22, 25, 28, 30, 26, 21];

  private static conditions = [
    { name: 'Sunny', icon: '☀️', humidity: 42 },
    { name: 'Partly Cloudy', icon: '⛅', humidity: 55 },
    { name: 'Cloudy', icon: '☁️', humidity: 68 },
    { name: 'Scattered Showers', icon: '🌦️', humidity: 78 },
    { name: 'Thunderstorm', icon: '⛈️', humidity: 88 },
  ];

  public static getCitySeed(city: string, hourOffset = 0): number {
    let hash = 0;
    for (let i = 0; i < city.length; i++) {
      hash = (hash << 5) - hash + city.charCodeAt(i);
      hash |= 0;
    }
    const currentHour = new Date().getHours() + hourOffset;
    return Math.abs(hash + currentHour);
  }

  public static getCurrentWeather(city: string): WeatherData {
    const seed = this.getCitySeed(city);
    const temp = this.temperatures[seed % this.temperatures.length];
    const condition = this.conditions[seed % this.conditions.length];

    return {
      city,
      temperatureC: temp,
      temperatureF: Math.round((temp * 9) / 5 + 32),
      feelsLikeC: temp + 2,
      condition: condition.name,
      icon: condition.icon,
      humidity: condition.humidity,
      windSpeedKmH: (seed % 20) + 5,
      uvIndex: (seed % 9) + 1,
      airQuality: seed % 3 === 0 ? 'Moderate' : 'Good',
      updatedAt: new Date().toISOString(),
    };
  }

  public static getForecast(city: string, days = 5): ForecastResponse {
    const validDays = Math.min(Math.max(days, 1), 7);
    const forecast: ForecastItem[] = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();

    for (let i = 0; i < validDays; i++) {
      const forecastDate = new Date(today);
      forecastDate.setDate(today.getDate() + i);

      const seed = this.getCitySeed(city, i * 24);
      const maxTemp = this.temperatures[seed % this.temperatures.length] + 2;
      const minTemp = maxTemp - ((seed % 6) + 4);
      const condition = this.conditions[seed % this.conditions.length];

      forecast.push({
        date: forecastDate.toISOString().split('T')[0],
        dayOfWeek: dayNames[forecastDate.getDay()],
        maxTempC: maxTemp,
        minTempC: minTemp,
        condition: condition.name,
        icon: condition.icon,
        rainChancePercent: (seed % 60) + 10,
      });
    }

    return {
      city,
      days: validDays,
      forecast,
    };
  }
}
