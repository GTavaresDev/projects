'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const hasQuery = baseUrl.includes('?');
    const separator = hasQuery ? '&' : '?';
    return `${baseUrl}${separator}page=${page}`;
  };

  return (
    <div className="flex items-center justify-center gap-3 mt-10">
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      ) : (
        <div className="p-2.5 rounded-xl glass-card text-slate-600 opacity-50 cursor-not-allowed">
          <ChevronLeft className="w-5 h-5" />
        </div>
      )}

      <span className="text-sm font-medium text-slate-400 px-3">
        Page <strong className="text-slate-200">{currentPage}</strong> of{' '}
        <strong className="text-slate-200">{totalPages}</strong>
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all"
          aria-label="Next Page"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      ) : (
        <div className="p-2.5 rounded-xl glass-card text-slate-600 opacity-50 cursor-not-allowed">
          <ChevronRight className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
