export function MovieSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col animate-pulse border border-slate-800">
      <div className="h-64 bg-slate-800/60 w-full" />
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="h-6 bg-slate-800 rounded-md w-3/4" />
          <div className="h-4 bg-slate-800/60 rounded-md w-full" />
          <div className="h-4 bg-slate-800/60 rounded-md w-5/6" />
        </div>
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
          <div className="h-3 bg-slate-800 rounded w-1/4" />
          <div className="h-4 bg-slate-800 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}
