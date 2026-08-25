import Link from 'next/link';
import { fetchMovies } from '@/lib/api/movies';
import { MovieCard } from '@/components/movies/MovieCard';
import { ErrorState } from '@/components/ui/ErrorState';
import { Film, Sparkles, ArrowRight, Clapperboard } from 'lucide-react';

export default async function HomePage() {
  try {
    const { data: movies } = await fetchMovies(1, 6);

    return (
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden glass-panel p-8 sm:p-12 border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-900">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Shared Catalog Ecosystem
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Explore Cinematic Masterpieces
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Immerse yourself in a curated library of top-tier films. Powered exclusively by our clean architecture <code className="text-indigo-400 font-mono">catalog-api</code> REST backend.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/movies"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold shadow-lg shadow-indigo-500/30 transition-all hover:scale-105"
              >
                Browse All Movies
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Movies Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clapperboard className="w-6 h-6 text-indigo-400" />
              <h2 className="text-2xl font-bold text-white">Featured Movies</h2>
            </div>
            <Link
              href="/movies"
              className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              View Full Catalog &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    );
  } catch (error) {
    return <ErrorState message="Could not load featured movies. Ensure catalog-api is running." />;
  }
}
