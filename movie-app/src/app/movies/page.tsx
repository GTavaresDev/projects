import { movieRepository } from '@/core';
import { MovieCard } from './_components/MovieCard';
import { Pagination } from '@/components/ui/pagination';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import { Film } from 'lucide-react';

interface MoviesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const resolvedParams = await searchParams;
  const page = resolvedParams.page ? parseInt(resolvedParams.page, 10) : 1;

  try {
    const { data: movies, meta } = await movieRepository.getMovies(page, 6);

    return (
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-center">
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-indigo-400">
              <Film className="h-4 w-4" />
              <span>Full Catalog</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">All Movies</h1>
          </div>
          <p className="text-sm text-slate-400">
            Showing <span className="font-semibold text-slate-200">{movies.length}</span> of{' '}
            <span className="font-semibold text-slate-200">{meta.total}</span> movies
          </p>
        </div>

        {movies.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <Pagination currentPage={meta.page} totalPages={meta.totalPages} baseUrl="/movies" />
          </>
        )}
      </div>
    );
  } catch (error) {
    return <ErrorState message="Could not fetch movie catalog from API." />;
  }
}
