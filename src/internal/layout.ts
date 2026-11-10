/**
 * The spacing and surface classes the ported components share, copied from
 * the kit's layout module so the kit's stylesheet styles them.
 */

/** The treatment a section heading takes, independent of its level. */
export type SectionVariant = 'default' | 'eyebrow';

export const CARD_SURFACE =
  'bg-surface bg-card border border-line rounded-card shadow-card inset-shadow-highlight';

export const CARD_PAD: Record<'none' | 'sm' | 'md' | 'lg', string> = {
  none: '',
  sm: 'p-card-sm',
  md: 'p-card',
  lg: 'p-page-x',
};

export const CARD_HEADER = 'px-card py-card-sm border-b border-line';

export const CARD_FOOTER = 'px-card py-card-sm border-t border-line bg-surface-2/40 rounded-b-card';

/** The type treatment of a section heading, by level. An eyebrow is the same at both. */
export function sectionHeading(level: 2 | 3, variant: SectionVariant = 'default'): string {
  if (variant === 'eyebrow') return 'text-xs font-semibold uppercase tracking-wider text-muted';
  return level === 2
    ? 'font-heading text-h3 leading-h3 tracking-h3 font-semibold text-fg'
    : 'font-heading text-sm font-semibold text-fg';
}
