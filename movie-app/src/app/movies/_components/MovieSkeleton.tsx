import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function MovieSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden border-slate-800">
      <Skeleton className="h-64 w-full rounded-none" />
      <CardContent className="space-y-3 p-5">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-slate-800/80 p-5 pt-0">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </CardFooter>
    </Card>
  );
}
