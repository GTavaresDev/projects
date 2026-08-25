import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { movieRepository } from '@/core';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ErrorState } from '@/components/ui/error-state';
import { ArrowLeft, Film, Calendar, Clock, Star, User, Sparkles } from 'lucide-react';

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = await params;

  try {
    const movie = await movieRepository.getMovieById(id);

    if (!movie) {
      notFound();
    }

    let heroMedia: React.ReactNode;
    if (movie.image) {
      heroMedia = (
        <Image
          src={movie.image}
          alt={movie.name}
          fill
          className="object-cover"
          priority
          unoptimized
        />
      );
    } else {
      heroMedia = (
        <div className="flex h-full w-full items-center justify-center bg-slate-800 text-slate-500">
          <Film className="h-16 w-16" />
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-5xl space-y-8">
        <Link href="/movies">
          <Button variant="ghost" size="sm" className="-ml-2 gap-2 text-slate-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Catalog</span>
          </Button>
        </Link>

        <Card className="overflow-hidden border-slate-800 shadow-2xl">
          <div className="relative h-96 w-full bg-slate-900">
            {heroMedia}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  {movie.genre && <Badge variant="default">{movie.genre}</Badge>}
                  {movie.featured && (
                    <Badge variant="accent" className="gap-1">
                      <Sparkles className="h-3 w-3" /> Featured
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {movie.name}
                </h1>
              </div>

              {typeof movie.rating === 'number' && (
                <div className="flex items-center gap-1.5 rounded-2xl border border-amber-500/30 bg-slate-950/90 px-4 py-2 font-bold text-amber-300 shadow-lg backdrop-blur-md">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="text-lg">{movie.rating.toFixed(1)}</span>
                  <span className="text-xs font-normal text-slate-400">/ 10</span>
                </div>
              )}
            </div>
          </div>

          <CardContent className="space-y-6 p-8">
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              {movie.director && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-indigo-400" />
                  <span>
                    Director: <strong className="text-slate-200">{movie.director}</strong>
                  </span>
                </div>
              )}
              {movie.year && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-indigo-400" />
                  <span>
                    Year: <strong className="text-slate-200">{movie.year}</strong>
                  </span>
                </div>
              )}
              {movie.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-indigo-400" />
                  <span>
                    Duration: <strong className="text-slate-200">{movie.duration}</strong>
                  </span>
                </div>
              )}
            </div>

            <Separator />

            <div>
              <h2 className="mb-3 text-xl font-bold text-slate-100">Synopsis</h2>
              <p className="text-base leading-relaxed text-slate-300">{movie.description}</p>
            </div>

            {Array.isArray(movie.tags) && movie.tags.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold text-slate-400">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    return <ErrorState message="Could not fetch movie details from API." />;
  }
}
