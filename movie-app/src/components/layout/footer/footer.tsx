import { Film } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-8 text-sm text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Film className="h-4 w-4 text-indigo-400" />
          <span className="font-semibold text-slate-200">CineCatalog</span>
          <span>&copy; {new Date().getFullYear()} — Movie Catalog Frontend</span>
        </div>
        <p className="text-xs text-slate-500">
          Powered by shared{' '}
          <code className="rounded bg-slate-900 px-1.5 py-0.5 text-indigo-400">catalog-api</code>{' '}
          REST backend.
        </p>
      </div>
    </footer>
  );
}
