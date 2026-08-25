import { cityDistanceRepository, CityInfo, CityDistanceResponse } from '@/core';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Compass,
  MapPin,
  Plane,
  Car,
  Bike,
  Footprints,
  Sparkles,
  ArrowRight,
  Route,
  Globe,
  Building2,
  ChevronDown,
} from 'lucide-react';

interface HomePageProps {
  searchParams: Promise<{ origin?: string; destination?: string }>;
}

const DEFAULT_SUPPORTED_CITIES: CityInfo[] = [
  { name: 'São Paulo', country: 'Brazil', lat: -23.5505, lng: -46.6333 },
  { name: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lng: -43.1729 },
  { name: 'Curitiba', country: 'Brazil', lat: -25.4284, lng: -49.2733 },
  { name: 'Brasília', country: 'Brazil', lat: -15.7975, lng: -47.8919 },
  { name: 'Goiânia', country: 'Brazil', lat: -16.6869, lng: -49.2648 },
  { name: 'Salvador', country: 'Brazil', lat: -12.9777, lng: -38.5016 },
  { name: 'Belo Horizonte', country: 'Brazil', lat: -19.9167, lng: -43.9345 },
  { name: 'Florianópolis', country: 'Brazil', lat: -27.5954, lng: -48.548 },
  { name: 'Porto Alegre', country: 'Brazil', lat: -30.0346, lng: -51.2177 },
  { name: 'Recife', country: 'Brazil', lat: -8.0476, lng: -34.877 },
  { name: 'Fortaleza', country: 'Brazil', lat: -3.7172, lng: -38.5433 },
  { name: 'Manaus', country: 'Brazil', lat: -3.119, lng: -60.0217 },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
  { name: 'New York', country: 'USA', lat: 40.7128, lng: -74.006 },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
  { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
  { name: 'Lisbon', country: 'Portugal', lat: 38.7223, lng: -9.1393 },
  { name: 'Berlin', country: 'Germany', lat: 52.52, lng: 13.405 },
  { name: 'Rome', country: 'Italy', lat: 41.9028, lng: 12.4964 },
  { name: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lng: -58.3816 },
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093 },
];

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedParams = await searchParams;
  let origin = resolvedParams.origin;
  if (!origin) {
    origin = 'São Paulo';
  }

  let destination = resolvedParams.destination;
  if (!destination) {
    destination = 'Curitiba';
  }

  let supportedCities: CityInfo[] = [];
  try {
    const fetched = await cityDistanceRepository.getSupportedCities();
    if (fetched && fetched.length > 0) {
      supportedCities = fetched;
    } else {
      supportedCities = DEFAULT_SUPPORTED_CITIES;
    }
  } catch (err: any) {
    supportedCities = DEFAULT_SUPPORTED_CITIES;
  }

  let data: CityDistanceResponse | null = null;
  let errorMessage: string | null = null;

  try {
    data = await cityDistanceRepository.calculateDistance(origin, destination);
  } catch (err: any) {
    errorMessage = err.message || 'Failed to calculate distance for the selected cities.';
  }

  const presets = [
    { from: 'São Paulo', to: 'Curitiba', label: 'SP ➔ Curitiba' },
    { from: 'Rio de Janeiro', to: 'Salvador', label: 'Rio ➔ Salvador' },
    { from: 'Brasília', to: 'Goiânia', label: 'Brasília ➔ Goiânia' },
    { from: 'Tokyo', to: 'Paris', label: 'Tokyo ➔ Paris' },
    { from: 'London', to: 'New York', label: 'London ➔ NYC' },
  ];

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="glass-panel relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-900 p-8 sm:p-12">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300">
            <Globe className="h-3.5 w-3.5" />
            Hexagonal Geodetic Explorer
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Select Two Cities to Measure Distance
          </h1>
          <p className="text-lg leading-relaxed text-slate-300">
            Choose any two cities from our mapped geodetic catalog to calculate exact spherical
            distance and travel times across Airplane, Car, Bicycle, and Walking.
          </p>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-semibold text-slate-400">Popular routes:</span>
            {presets.map((preset) => (
              <a
                key={preset.label}
                href={`/?origin=${encodeURIComponent(preset.from)}&destination=${encodeURIComponent(preset.to)}`}
              >
                <Badge
                  variant="secondary"
                  className="cursor-pointer transition-colors hover:border-emerald-500/40 hover:bg-slate-800 hover:text-emerald-300"
                >
                  {preset.label}
                </Badge>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Select-based City Calculator Form (Strictly No Free Text Input) */}
      <Card className="border-slate-800 bg-slate-900/80">
        <CardContent className="p-6">
          <form method="GET" action="/" className="grid grid-cols-1 gap-4 sm:grid-cols-12">
            <div className="sm:col-span-5">
              <label className="mb-1.5 block text-xs font-semibold text-slate-400">
                Origin City (Select from list)
              </label>
              <div className="relative">
                <select
                  name="origin"
                  defaultValue={origin}
                  required
                  className="flex h-11 w-full cursor-pointer appearance-none rounded-xl border border-slate-800 bg-slate-900/90 pl-10 pr-10 text-sm font-medium text-slate-100 transition-all focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  {supportedCities.map((city) => (
                    <option key={city.name} value={city.name} className="bg-slate-900 text-white">
                      {city.name} &bull; {city.country}
                    </option>
                  ))}
                </select>
                <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400" />
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div className="sm:col-span-5">
              <label className="mb-1.5 block text-xs font-semibold text-slate-400">
                Destination City (Select from list)
              </label>
              <div className="relative">
                <select
                  name="destination"
                  defaultValue={destination}
                  required
                  className="flex h-11 w-full cursor-pointer appearance-none rounded-xl border border-slate-800 bg-slate-900/90 pl-10 pr-10 text-sm font-medium text-slate-100 transition-all focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  {supportedCities.map((city) => (
                    <option key={city.name} value={city.name} className="bg-slate-900 text-white">
                      {city.name} &bull; {city.country}
                    </option>
                  ))}
                </select>
                <Compass className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-400" />
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div className="flex items-end sm:col-span-2">
              <Button type="submit" className="w-full gap-2 font-semibold">
                <span>Calculate</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Error Display */}
      {errorMessage && (
        <Card className="border-red-900/40 bg-red-950/20 text-center">
          <CardContent className="p-8">
            <p className="font-semibold text-red-400">{errorMessage}</p>
            <p className="mt-1 text-sm text-slate-400">
              Please choose a valid city from the supported catalog below.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Results Display */}
      {data && (
        <div className="space-y-8">
          <Card className="border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/20">
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Route className="h-5 w-5 text-emerald-400" />
                  <CardTitle className="text-2xl">Calculated Geodetic Distance</CardTitle>
                </div>
                <Badge variant="default" className="gap-1 font-mono text-sm">
                  <Sparkles className="h-3 w-3" />
                  {data.origin.name} ({data.origin.coordinates.country}) ➔ {data.destination.name} (
                  {data.destination.coordinates.country})
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-center">
                  <span className="text-xs uppercase tracking-wider text-slate-400">
                    Kilometers
                  </span>
                  <p className="mt-1 text-3xl font-extrabold text-emerald-400">
                    {data.distance.kilometers.toLocaleString()}{' '}
                    <span className="text-sm font-normal text-slate-400">km</span>
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-center">
                  <span className="text-xs uppercase tracking-wider text-slate-400">Miles</span>
                  <p className="mt-1 text-3xl font-extrabold text-white">
                    {data.distance.miles.toLocaleString()}{' '}
                    <span className="text-sm font-normal text-slate-400">mi</span>
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-center">
                  <span className="text-xs uppercase tracking-wider text-slate-400">
                    Nautical Miles
                  </span>
                  <p className="mt-1 text-3xl font-extrabold text-teal-300">
                    {data.distance.nauticalMiles.toLocaleString()}{' '}
                    <span className="text-sm font-normal text-slate-400">NM</span>
                  </p>
                </div>
              </div>

              {/* Estimated Travel Times */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-slate-300">
                  Estimated Travel Time by Mode
                </h4>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-center">
                    <Plane className="mb-2 h-6 w-6 text-sky-400" />
                    <span className="text-xs text-slate-400">Airplane</span>
                    <span className="mt-1 font-bold text-white">
                      {data.estimatedTravelTime.airplane}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-center">
                    <Car className="mb-2 h-6 w-6 text-emerald-400" />
                    <span className="text-xs text-slate-400">Car</span>
                    <span className="mt-1 font-bold text-white">
                      {data.estimatedTravelTime.car}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-center">
                    <Bike className="mb-2 h-6 w-6 text-amber-400" />
                    <span className="text-xs text-slate-400">Bicycle</span>
                    <span className="mt-1 font-bold text-white">
                      {data.estimatedTravelTime.bicycle}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-center">
                    <Footprints className="mb-2 h-6 w-6 text-violet-400" />
                    <span className="text-xs text-slate-400">Walking</span>
                    <span className="mt-1 font-bold text-white">
                      {data.estimatedTravelTime.walking}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Mapped Supported Cities Directory */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">
            Available Mapped Cities ({supportedCities.length})
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          Click any city below to set it as destination from {origin}:
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {supportedCities.map((city) => (
            <a
              key={city.name}
              href={`/?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(city.name)}`}
              className="group block rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 transition-all hover:border-emerald-500/40 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200 transition-colors group-hover:text-emerald-300">
                  {city.name}
                </span>
                <MapPin className="h-3.5 w-3.5 text-slate-500 group-hover:text-emerald-400" />
              </div>
              <span className="mt-1 block text-xs text-slate-400">{city.country}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
