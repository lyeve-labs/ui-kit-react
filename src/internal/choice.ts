/** The classes a checkbox draws with, copied from the kit's choice module. */
import { FIELD_HINT } from './field.js';
import { HIT_AREA } from './touch.js';

export type ChoiceSize = 'sm' | 'md' | 'lg';

/** `card` draws a bordered option whose whole surface is the target. */
export type ChoiceVariant = 'inline' | 'card';

const CHOICE_SQUARE: Record<ChoiceSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

const WRAP_INLINE = `${HIT_AREA} inline-flex select-none items-start gap-2.5`;
const WRAP_CARD = 'flex select-none items-start gap-2.5 rounded-lg border p-3 transition-colors';

export function choiceWrap(variant: ChoiceVariant, checked: boolean, disabled: boolean): string {
  const cursor = disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer';
  if (variant === 'card') {
    // The input covers the card, so the pointer is over the input and the hover is a peer's.
    const paint = checked ? 'border-line bg-brand/8' : 'border-line bg-surface-2';
    const hover = disabled ? '' : ' peer-hover:border-line-strong';
    return `${WRAP_CARD} ${paint}${hover} ${cursor}`;
  }
  return `${WRAP_INLINE} ${cursor}`;
}

/** The native input, invisible and stretched over the whole target so it takes every click. */
export const CHOICE_INPUT =
  'peer absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed';

const BOX_BASE = 'pointer-events-none flex shrink-0 items-center justify-center transition-colors';

export const CHOICE_FOCUS =
  'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-focus peer-focus-visible:outline-offset-2';

/** The drawn box. A part-checked box paints as a checked one. */
export function choiceBox(size: ChoiceSize, checked: boolean, mixed: boolean): string {
  const paint =
    checked || mixed
      ? 'border-brand bg-brand text-ink'
      : 'border-line-strong/60 bg-surface-2 peer-enabled:peer-hover:border-line-strong';
  return `${BOX_BASE} ${CHOICE_SQUARE[size]} rounded-xs border ${paint} ${CHOICE_FOCUS}`;
}

export const CHOICE_LABEL_STACK = 'flex flex-col gap-0.5';

export function choiceLabel(size: ChoiceSize): string {
  const scale: Record<ChoiceSize, string> = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };
  return `${scale[size]} text-fg`;
}

export const CHOICE_DESCRIPTION = FIELD_HINT;

export function choiceIcon(size: ChoiceSize): string {
  return `flex shrink-0 items-center justify-center ${CHOICE_SQUARE[size]}`;
}

export const CHOICE_ICON_PX: Record<ChoiceSize, number> = { sm: 14, md: 16, lg: 20 };

/** Both marks are stroked paths on one 10 by 8 grid, so they match the kit's icons in weight. */
export const CHOICE_MARK = { check: 'M1 4l3 3 5-6', mixed: 'M1.5 4h7' };
