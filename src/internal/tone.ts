/** The tones a message or a chip takes, copied from the kit's tone module. */

export type StatusTone = 'neutral' | 'brand' | 'success' | 'warn' | 'danger';

export type AccentTone = StatusTone | 'violet';

/** The path a tone's glyph draws on a 24 by 24 grid, so the tone reads in a shape as well as a color. */
export const TONE_GLYPH: Record<StatusTone, string> = {
  neutral: 'M12 8h.01M11 12h1v4h1',
  brand: 'M12 8h.01M11 12h1v4h1',
  success: 'M20 6L9 17l-5-5',
  warn: 'M12 8v5M12 17h.01',
  danger: 'M18 6L6 18M6 6l12 12',
};

export const CHIP_TONE: Record<AccentTone, string> = {
  neutral: 'bg-surface-2 text-muted border-line',
  brand: 'bg-brand/10 text-brand border-brand/20',
  violet: 'bg-violet/10 text-violet border-violet/20',
  success: 'bg-success/10 text-success border-success/20',
  warn: 'bg-warn/10 text-warn border-warn/20',
  danger: 'bg-danger/10 text-danger border-danger/20',
};
