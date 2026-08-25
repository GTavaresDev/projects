import { Film } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}

export function EmptyState({
  title = 'No Movies Found',
  description = 'We couldn\'t find any movies matching your request in the catalog.',
  actionHref,
  actionLabel,
}: EmptyStateProps) {
  return (
    <div className="glass-card rounded-2xl p-12 text-center max-w-md mx-auto my-12 border border-slate-800">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
        <Film className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-6">{description}</p>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-flex items-center px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
