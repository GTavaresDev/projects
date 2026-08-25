import Link from 'next/link';
import { movieRepository } from '@/core';
import { MovieCard } from '@/app/movies/_components/MovieCard';
import { ErrorState } from '@/components/ui/error-state';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Clapperboard } from 'lucide-react';

export default async function HomePage() {
  try {
    const { data: movies } = await movieRepository.getMovies(1, 6);

    return (
      <div className="space-y-12">
        {/* Featured Movies Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clapperboard className="h-6 w-6 text-indigo-400" />
              <h2 className="text-2xl font-bold text-white">Featured Movies</h2>
            </div>
            <Link
              href="/movies"
              className="flex items-center gap-1 text-sm font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View Full Catalog &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    );
  } catch (error) {
    return <ErrorState message="Could not load featured movies. Ensure backend is running." />;
  }
}
