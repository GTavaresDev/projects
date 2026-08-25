'use client';

import Link from 'next/link';
import { Film, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useHeaderSearch } from './useHeaderSearch';

export function Header() {
  const { query, setQuery, handleSearch } = useHeaderSearch();

  return (
    <header className="glass-panel sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 p-2 text-white shadow-lg shadow-indigo-500/30 transition-transform group-hover:scale-105">
            <Film className="h-5 w-5" />
          </div>
          <span className="bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-xl font-bold text-transparent">
            CineCatalog
          </span>
        </Link>

        <form onSubmit={handleSearch} className="relative hidden max-w-md flex-1 sm:block">
          <Input
            type="text"
            placeholder="Search movies by title, director or tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 rounded-full border-slate-700/60 bg-slate-900/90 pl-10 pr-4 text-sm placeholder:text-slate-400"
          />
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </form>

        <nav className="flex items-center gap-3 text-sm font-medium">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              Home
            </Button>
          </Link>
          <Link href="/movies">
            <Button variant="default" size="sm" className="shadow-none">
              Explore Catalog
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
