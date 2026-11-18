import type { ReactNode } from 'react';
import { ToneGlyph } from '../internal/ToneGlyph.js';

/** The two outcomes a submit has. Anything else is a hint, not a result. */
type Tone = 'danger' | 'success';

export interface FormMessageProps {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

const tones: Record<Tone, string> = {
  danger: 'text-danger',
  success: 'text-success',
};

/**
 * The outcome of a submit. A failure takes role="alert" and interrupts,
 * because the reader has to act. A confirmation waits for a pause and takes
 * no role, because Orca speaks nothing inserted into a status bar.
 */
export function FormMessage({ tone = 'danger', className = '', children }: FormMessageProps) {
  return (
    <div
      className={`flex items-start gap-2 text-sm ${tones[tone]} ${className}`}
      role={tone === 'danger' ? 'alert' : undefined}
      aria-live={tone === 'danger' ? 'assertive' : 'polite'}
      aria-atomic={tone === 'danger' ? undefined : 'true'}
    >
      {/* Color alone would be the only thing telling a failure from a confirmation. */}
      <ToneGlyph tone={tone} />
      <p className="min-w-0 flex-1">{children}</p>
    </div>
  );
}
