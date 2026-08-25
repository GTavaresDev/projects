'use client';

import { ErrorState } from '@/components/ui/ErrorState';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="An unexpected error occurred"
      message={error.message || 'Something went wrong while attempting to display movie catalog content.'}
      onRetry={reset}
    />
  );
}
