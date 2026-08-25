import { searchMovies } from '@/lib/api/movies';
import { MovieCard } from '@/components/movies/MovieCard';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Search } from 'lucide-react';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  const page = resolvedParams.page ? parseInt(resolvedParams.page, 10) : 1;

  if (!query.trim()) {
    return (
      <EmptyState
        title="Search Movies"
        description="Enter a search term in the search bar above to discover movies."
      />
    );
  }

  try {
    const { data: movies, meta } = await searchMovies(query, page, 6);

    return (
      <div className="space-y-8">
        <div className="border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-1">
            <Search className="w-4 h-4" />
            <span>Search Results</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Results for &ldquo;<span className="text-indigo-400">{query}</span>&rdquo;
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Found <span className="text-slate-200 font-semibold">{meta.total}</span> matching movies
          </p>
        </div>

        {movies.length === 0 ? (
          <EmptyState
            title="No Matching Movies Found"
            description={`We couldn't find any movies matching "${query}". Try searching with a different term.`}
            actionHref="/movies"
            actionLabel="View All Movies"
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <Pagination
              currentPage={meta.page}
              totalPages={meta.totalPages}
              baseUrl={`/search?q=${encodeURIComponent(query)}`}
            />
          </>
        )}
      </div>
    );
  } catch (error) {
    return <ErrorState message="Could not execute movie search request." />;
  }
}
