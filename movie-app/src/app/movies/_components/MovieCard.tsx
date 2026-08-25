import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/core';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Film, ArrowRight, Star, Calendar, Clock } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  let coverElement: React.ReactNode;

  if (movie.image) {
    coverElement = (
      <Image
        src={movie.image}
        alt={movie.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        unoptimized
      />
    );
  } else {
    coverElement = (
      <div className="flex h-full w-full items-center justify-center bg-slate-800 text-slate-500">
        <Film className="h-12 w-12" />
      </div>
    );
  }

  return (
    <Link href={`/movies/details/${movie.id}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden border-slate-800 transition-all duration-300 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10">
        <div className="relative h-64 w-full overflow-hidden bg-slate-900">
          {coverElement}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

          <div className="absolute right-3 top-3 flex items-center gap-1.5">
            {movie.genre && (
              <Badge variant="default" className="bg-slate-950/80 backdrop-blur-md">
                {movie.genre}
              </Badge>
            )}
          </div>

          {typeof movie.rating === 'number' && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full border border-amber-500/20 bg-slate-950/80 px-2.5 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>{movie.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <CardContent className="flex flex-1 flex-col justify-between p-5">
          <div>
            <h3 className="line-clamp-1 text-xl font-bold text-slate-100 transition-colors group-hover:text-indigo-400">
              {movie.name}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
              {movie.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              {movie.year && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  {movie.year}
                </span>
              )}
              {movie.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-500" />
                  {movie.duration}
                </span>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="mt-auto flex items-center justify-between border-t border-slate-800/80 p-5 pt-0">
          <span className="font-mono text-xs text-slate-500">ID: {movie.id}</span>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 transition-colors group-hover:text-indigo-300">
            <span>Details</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
