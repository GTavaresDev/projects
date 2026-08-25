export interface WeatherData {
  city: string;
  temperatureC: number;
  temperatureF: number;
  feelsLikeC: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeedKmH: number;
  uvIndex: number;
  airQuality: string;
  updatedAt: string;
}

export interface ForecastItem {
  date: string;
  dayOfWeek: string;
  maxTempC: number;
  minTempC: number;
  condition: string;
  icon: string;
  rainChancePercent: number;
}

export interface ForecastResponse {
  city: string;
  days: number;
  forecast: ForecastItem[];
}
