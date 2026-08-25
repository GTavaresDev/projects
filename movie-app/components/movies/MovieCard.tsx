import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/lib/types';
import { Film, ArrowRight } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col group border border-slate-800">
      <div className="relative h-64 w-full overflow-hidden bg-slate-900">
        {movie.image ? (
          <Image
            src={movie.image}
            alt={movie.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
            <Film className="w-12 h-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-medium text-indigo-300 border border-indigo-500/20">
          Movie
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
            {movie.name}
          </h3>
          <p className="mt-2 text-sm text-slate-400 line-clamp-3 leading-relaxed">
            {movie.description}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-xs text-slate-500">ID: {movie.id}</span>
          <Link
            href={`/movies/${movie.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group/link"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
