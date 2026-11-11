/** The classes and id rules a form control shares, copied from the kit's field module. */

export const FIELD_WRAP = 'flex flex-col gap-1.5';

export const FIELD_LABEL = 'text-sm font-medium text-fg';

export const FIELD_HINT = 'text-xs text-faint';

export const FIELD_ERROR = 'text-xs text-danger';

const CONTROL_DEPTH = 'inset-shadow-well';

const CONTROL_FOCUS_RING = 'focus-visible:ring-1 focus-visible:ring-inset';

export const CONTROL_BASE =
  'w-full h-control rounded-lg bg-surface-2 border px-3 text-sm text-fg ' +
  'placeholder:text-faint transition-colors outline-none ' +
  `${CONTROL_DEPTH} ` +
  'disabled:opacity-50 disabled:cursor-not-allowed';

export const CONTROL_MULTILINE =
  'w-full min-h-control rounded-lg bg-surface-2 border px-3 py-2 text-sm text-fg ' +
  'placeholder:text-faint transition-colors outline-none ' +
  `${CONTROL_DEPTH} ` +
  'disabled:opacity-50 disabled:cursor-not-allowed';

/**
 * The control's border. A field in error keeps its red border on focus, so a
 * red ring inside it marks the focus. The kit also paints a suggested value
 * from a form assistant here, which a control rendered with no assistant
 * never shows.
 */
export function controlBorder(error: boolean): string {
  return error
    ? `border-danger focus:border-danger ${CONTROL_FOCUS_RING} focus-visible:ring-danger`
    : 'border-line hover:border-line-strong focus:border-focus';
}

/**
 * The id of whichever message is on screen, for the control's
 * `aria-describedby`. The error wins over the hint, and with neither the
 * attribute is left off rather than pointing at nothing.
 */
export function describedBy(
  id: string | undefined,
  error?: string,
  hint?: string,
): string | undefined {
  if (!id) return undefined;
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

/** Joins ids for an ARIA list attribute, or nothing when none is set. */
export function joinIds(...ids: (string | undefined)[]): string | undefined {
  return ids.filter(Boolean).join(' ') || undefined;
}
