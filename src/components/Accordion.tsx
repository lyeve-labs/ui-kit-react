import { Children, cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from 'react';
import { AccordionItem, type AccordionItemProps } from './AccordionItem.js';

export interface AccordionProps {
  /** Lets more than one item stay open. By default opening one closes the others. */
  multiple?: boolean;
  /** Drops the outer border and rounding, for an accordion inside a card or panel. */
  flush?: boolean;
  className?: string;
  /** The items, each an `AccordionItem` placed directly inside. */
  children: ReactNode;
}

/**
 * A set of disclosures. Each item is a `details` element, so the browser opens
 * and closes it and a page rendered on the server needs no script. Unless
 * `multiple` is set the items share one `name`, and opening one closes the
 * others.
 *
 * The name reaches each item as a prop rather than through context, which a
 * Server Component cannot read, so the items are direct children. It counts
 * from the start of each server render, so a page put together from several
 * renders gives each its own `identifierPrefix`.
 */
export function Accordion({ multiple = false, flush = false, className = '', children }: AccordionProps) {
  const uid = useId();
  const name = multiple ? undefined : `accordion-${uid}`;
  return (
    <div
      className={`${flush ? 'divide-y divide-line' : 'divide-y divide-line rounded-xl border border-line overflow-hidden'} ${className}`}
    >
      {Children.map(children, (child) =>
        isValidElement(child) && child.type === AccordionItem
          ? cloneElement(child as ReactElement<AccordionItemProps>, { name })
          : child,
      )}
    </div>
  );
}
