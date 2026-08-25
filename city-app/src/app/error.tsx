'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Card className="border-red-900/30 bg-red-950/10">
      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 shadow-inner">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-white">Something Went Wrong</h3>
        <p className="mb-6 max-w-md text-sm text-slate-400">
          {error.message || 'Failed to connect to backend on port 4000.'}
        </p>
        <Button variant="destructive" onClick={reset} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          <span>Try Again</span>
        </Button>
      </CardContent>
    </Card>
  );
}
