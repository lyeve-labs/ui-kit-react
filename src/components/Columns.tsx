import type { ReactNode } from 'react';

export interface ColumnsProps {
  /** How many columns stand in one row at most. Without it as many fit as the width allows. */
  max?: 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}

// The cap raises each column's minimum to its share of the row, so it holds
// without a media query.
const TRACKS = {
  auto: 'grid-cols-[repeat(auto-fit,minmax(min(100%,var(--spacing-column-min)),1fr))]',
  2: 'grid-cols-[repeat(auto-fit,minmax(min(100%,max(var(--spacing-column-min),calc((100%_-_var(--spacing-gutter))/2))),1fr))]',
  3: 'grid-cols-[repeat(auto-fit,minmax(min(100%,max(var(--spacing-column-min),calc((100%_-_2*var(--spacing-gutter))/3))),1fr))]',
  4: 'grid-cols-[repeat(auto-fit,minmax(min(100%,max(var(--spacing-column-min),calc((100%_-_3*var(--spacing-gutter))/4))),1fr))]',
} as const;

/**
 * Each child is a column. Columns stand side by side while each keeps the
 * site's minimum column width and stack once one would fall under it, so a
 * narrow container stacks them with no breakpoint.
 */
export function Columns({ max, children, className = '' }: ColumnsProps) {
  return <div className={`grid gap-gutter ${TRACKS[max ?? 'auto']} ${className}`}>{children}</div>;
}
