import Link from 'next/link';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Card, CardContent } from './card';
import { Button } from './button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  retryHref?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something Went Wrong',
  message = 'Failed to communicate with the shared catalog backend. Make sure catalog-api is running on port 4000.',
  retryHref = '/',
  onRetry,
}: ErrorStateProps) {
  return (
    <Card className="border-red-900/30 bg-red-950/10">
      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 shadow-inner">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="mb-6 max-w-md text-sm text-slate-400">{message}</p>
        {onRetry ? (
          <Button variant="destructive" onClick={onRetry} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>
        ) : (
          <Link href={retryHref}>
            <Button variant="destructive" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              <span>Try Again</span>
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
