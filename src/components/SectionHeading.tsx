import type { ReactNode } from 'react';
import { sectionHeading, type SectionVariant } from '../internal/layout.js';

export interface SectionHeadingProps {
  /** 2 under a page title, 3 inside a card. The element, not the treatment. */
  level?: 2 | 3;
  /** `eyebrow` is the small uppercase label above a band, at either level. */
  variant?: SectionVariant;
  /** Controls drawn beside the heading, wrapping under it when the row is full. */
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** A heading for a section of a page, always a real heading element, with an optional row of controls. */
export function SectionHeading({
  level = 2,
  variant = 'default',
  actions,
  className = '',
  children,
}: SectionHeadingProps) {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 ${className}`}>
      {level === 2 ? (
        <h2 className={sectionHeading(2, variant)}>{children}</h2>
      ) : (
        <h3 className={sectionHeading(3, variant)}>{children}</h3>
      )}
      {actions && (
        <div className="ms-auto flex min-w-0 flex-wrap items-center justify-end gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
