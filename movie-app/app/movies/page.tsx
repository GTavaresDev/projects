import { fetchMovies } from '@/lib/api/movies';
import { MovieCard } from '@/components/movies/MovieCard';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Film } from 'lucide-react';

interface MoviesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const resolvedParams = await searchParams;
  const page = resolvedParams.page ? parseInt(resolvedParams.page, 10) : 1;

  try {
    const { data: movies, meta } = await fetchMovies(page, 6);

    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-1">
              <Film className="w-4 h-4" />
              <span>Full Catalog</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">All Movies</h1>
          </div>
          <p className="text-slate-400 text-sm">
            Showing <span className="text-slate-200 font-semibold">{movies.length}</span> of{' '}
            <span className="text-slate-200 font-semibold">{meta.total}</span> movies
          </p>
        </div>

        {movies.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
