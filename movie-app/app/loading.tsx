import { MovieSkeleton } from '@/components/movies/MovieSkeleton';

export default function Loading() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="h-10 bg-slate-800/60 rounded-xl w-64 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <MovieSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
