import { EmptyState } from '@/components/ui/EmptyState';

export default function NotFound() {
  return (
    <EmptyState
      title="404 — Movie Not Found"
      description="The movie or page you are looking for does not exist in our catalog."
      actionHref="/movies"
      actionLabel="Return to Catalog"
    />
  );
}
