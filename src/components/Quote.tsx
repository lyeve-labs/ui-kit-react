import type { ReactNode } from 'react';

export interface QuoteProps {
  /** Who said it, drawn under the quotation. */
  source?: string;
  /** The quotation, which sits in a paragraph. */
  children: ReactNode;
  className?: string;
}

/** A quotation and who said it, set off by a rule in the site's second color. */
export function Quote({ source, children, className = '' }: QuoteProps) {
  return (
    <figure className={`m-0 border-s-4 border-brand-2 ps-site-md ${className}`}>
      <blockquote className="m-0 font-heading text-xl text-fg">
        <p className="m-0">{children}</p>
      </blockquote>
      {source && <figcaption className="mt-site-xs text-sm text-muted">{source}</figcaption>}
    </figure>
  );
}
