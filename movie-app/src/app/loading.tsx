import { MovieSkeleton } from '@/app/movies/_components/MovieSkeleton';

export default function Loading() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="h-10 w-64 animate-pulse rounded-xl bg-slate-800/60" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <MovieSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
