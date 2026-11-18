import type { ReactNode } from 'react';
import { ChevronDown } from '../internal/ChevronDown.js';

export interface AccordionItemProps {
  /** The item's id on the page, so a link can point at it. Unique on the page. */
  id: string;
  title: string;
  /** The name the items of one accordion share. Set by `Accordion`. */
  name?: string;
  className?: string;
  children: ReactNode;
}

/**
 * One disclosure. The browser opens and closes it, so it works before any
 * script runs. The title is plain text, never a heading: screen readers treat
 * a summary as a button, and a heading inside one hides the item's state.
 */
export function AccordionItem({ id, title, name, className = '', children }: AccordionItemProps) {
  return (
    <details id={id} name={name} className={`bg-surface ${className}`}>
      <summary className="flex w-full cursor-pointer list-none items-center justify-between px-5 py-4 text-start text-sm font-medium text-fg transition-colors hover:bg-surface-2/50 [[open]>&]:bg-surface-2/40 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <ChevronDown
          size={16}
          className="shrink-0 text-faint transition-transform duration-base [[open]>summary>&]:rotate-180"
        />
      </summary>
      <div className="[[open]>&]:animate-popover-in px-5 pb-4 pt-1 text-sm text-muted">{children}</div>
    </details>
  );
}
