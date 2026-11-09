import type { ReactNode } from 'react';
import { CHIP_TONE, type AccentTone } from '../internal/tone.js';

type Size = 'sm' | 'md';

export interface BadgeProps {
  tone?: AccentTone;
  size?: Size;
  /** Draws a dot of the badge's tone before the label. */
  dot?: boolean;
  className?: string;
  children: ReactNode;
}

const dotColor: Record<AccentTone, string> = {
  neutral: 'bg-muted ring-2 ring-muted/20',
  brand: 'bg-brand ring-2 ring-brand/25',
  violet: 'bg-violet ring-2 ring-violet/25',
  success: 'bg-success ring-2 ring-success/25',
  warn: 'bg-warn ring-2 ring-warn/25',
  danger: 'bg-danger ring-2 ring-danger/25',
};

const sizes: Record<Size, string> = {
  sm: 'text-xs px-2 py-0.5 gap-1.5',
  md: 'text-sm px-2.5 py-1 gap-1.5',
};

/** A one-token label that never breaks inside itself, and ends in an ellipsis when its width is capped. */
export function Badge({ tone = 'neutral', size = 'sm', dot = false, className = '', children }: BadgeProps) {
  return (
    <span
      className={`inline-flex max-w-full items-center font-medium whitespace-nowrap rounded-full border ${CHIP_TONE[tone]} ${sizes[size]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 shrink-0 rounded-full ${dotColor[tone]}`}></span>}
      <span className="min-w-0 truncate [&>svg]:inline [&>svg]:align-middle">{children}</span>
    </span>
  );
}
