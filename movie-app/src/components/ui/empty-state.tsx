import Link from 'next/link';
import { Film, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from './card';
import { Button } from './button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  title = 'No Movies Found',
  description = 'There are no movies matching your current filters or request.',
  actionLabel = 'Explore All Movies',
  actionHref = '/movies',
}: EmptyStateProps) {
  return (
    <Card className="border-dashed border-slate-800 bg-slate-900/30">
      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 shadow-inner">
          <Film className="h-8 w-8" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="mb-6 max-w-md text-sm text-slate-400">{description}</p>
        <Link href={actionHref}>
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>{actionLabel}</span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
