import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchMovieById } from '@/lib/api/movies';
import { ErrorState } from '@/components/ui/ErrorState';
import { ArrowLeft, Film, Calendar, Tag, Play } from 'lucide-react';

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = await params;

  try {
    const movie = await fetchMovieById(id);

    if (!movie) {
      notFound();
    }

    return (
      <div className="space-y-8 max-w-5xl mx-auto">
        <Link
          href="/movies"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>

        <div className="glass-card rounded-3xl overflow-hidden border border-slate-800">
          <div className="relative h-96 w-full bg-slate-900">
            {movie.image ? (
              <Image
                src={movie.image}
                alt={movie.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                <Film className="w-16 h-16" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 mb-3">
                  <Tag className="w-3.5 h-3.5" /> Movie Feature
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{movie.name}</h1>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="flex items-center gap-6 text-sm text-slate-400 border-b border-slate-800 pb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>Added: {movie.createdAt ? new Date(movie.createdAt).toLocaleDateString() : 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-indigo-400" />
                <span>ID: {movie.id}</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-100 mb-3">Synopsis</h2>
              <p className="text-slate-300 leading-relaxed text-base">{movie.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return <ErrorState message="Could not fetch movie details from API." />;
  }
}
