import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}page=${page}`;
  };

  return (
    <nav className="flex items-center justify-center gap-2 pt-6" aria-label="Pagination Navigation">
      {currentPage > 1 ? (
        <Link href={createPageUrl(currentPage - 1)}>
          <Button variant="outline" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="sm" disabled className="gap-1 opacity-40">
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>
      )}

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const page = idx + 1;
          const isActive = page === currentPage;

          return (
            <Link key={page} href={createPageUrl(page)}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                size="sm"
                className={cn('h-9 w-9 p-0', isActive && 'shadow-md shadow-indigo-500/25')}
              >
                {page}
              </Button>
            </Link>
          );
        })}
      </div>

      {currentPage < totalPages ? (
        <Link href={createPageUrl(currentPage + 1)}>
          <Button variant="outline" size="sm" className="gap-1">
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="sm" disabled className="gap-1 opacity-40">
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </nav>
  );
}
