import type { ReactNode } from 'react';

export interface ProseProps {
  children: ReactNode;
  className?: string;
}

// A rule for an element names only one without a class, so a component placed
// inside, such as a Button drawn as a link, keeps its own color.
const PROSE = [
  'max-w-prose text-base leading-body text-fg',
  '[&>*+*]:mt-site-sm [&>*+h2]:mt-site-lg [&>*+h3]:mt-site-md',
  '[&_h2:not([class])]:font-heading [&_h2:not([class])]:text-h3 [&_h2:not([class])]:leading-h3',
  '[&_h2:not([class])]:tracking-h3 [&_h2:not([class])]:font-semibold',
  '[&_h3:not([class])]:font-heading [&_h3:not([class])]:text-lg [&_h3:not([class])]:font-semibold',
  '[&_ul:not([class])]:list-disc [&_ul:not([class])]:ps-6',
  '[&_ol:not([class])]:list-decimal [&_ol:not([class])]:ps-6',
  '[&_li:not([class])+li]:mt-site-xs',
  '[&_a:not([class])]:text-brand [&_a:not([class])]:underline [&_a:not([class])]:underline-offset-2',
  '[&_blockquote:not([class])]:border-s-4 [&_blockquote:not([class])]:border-line',
  '[&_blockquote:not([class])]:ps-site-md [&_blockquote:not([class])]:text-muted',
  '[&_code:not([class])]:rounded-xs [&_code:not([class])]:bg-surface-2 [&_code:not([class])]:px-1',
  '[&_code:not([class])]:font-mono [&_code:not([class])]:text-[0.9em]',
  '[&_strong:not([class])]:font-semibold',
].join(' ');

/** Styles the text it holds, such as paragraphs, headings, lists, quotations, links and code. */
export function Prose({ children, className = '' }: ProseProps) {
  return <div className={`${PROSE} ${className}`}>{children}</div>;
}
