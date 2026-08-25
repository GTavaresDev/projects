import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-emerald-600/20 text-emerald-300 border-emerald-500/30',
        secondary: 'border-transparent bg-slate-800 text-slate-300 border-slate-700',
        destructive: 'border-transparent bg-red-900/30 text-red-400 border-red-800/40',
        outline: 'text-slate-300 border-slate-700',
        accent: 'border-transparent bg-teal-500/10 text-teal-300 border-teal-500/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
