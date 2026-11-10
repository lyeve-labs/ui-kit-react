import { TONE_GLYPH, type StatusTone } from './tone.js';

/** A message's tone as a bare stroked glyph, the way FormMessage draws it. */
export function ToneGlyph({ tone }: { tone: StatusTone }) {
  return (
    <svg
      className="mt-0.5 shrink-0"
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={TONE_GLYPH[tone]} />
    </svg>
  );
}
