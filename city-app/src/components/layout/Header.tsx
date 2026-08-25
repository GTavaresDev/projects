import Link from 'next/link';
import { Compass, Sparkles, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="glass-panel sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-2 text-white shadow-lg shadow-emerald-500/30 transition-transform group-hover:scale-105">
            <Compass className="h-5 w-5" />
          </div>
          <span className="bg-gradient-to-r from-white via-slate-200 to-emerald-300 bg-clip-text text-xl font-bold text-transparent">
            CityGeo & Trivia
          </span>
        </Link>

        <nav className="flex items-center gap-3 text-sm font-medium">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              City Distance
            </Button>
          </Link>
          <Link href="/compare">
            <Button variant="default" size="sm" className="gap-1.5 shadow-none">
              <Sparkles className="h-3.5 w-3.5" />
              Word Analyzer
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
