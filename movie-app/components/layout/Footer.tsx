import { Film } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-8 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-slate-200">CineCatalog</span>
          <span>&copy; {new Date().getFullYear()} — Movie Catalog Frontend</span>
        </div>
        <p className="text-xs text-slate-500">
          Powered by shared <code className="text-indigo-400 bg-slate-900 px-1.5 py-0.5 rounded">catalog-api</code> REST backend.
        </p>
      </div>
    </footer>
  );
}
