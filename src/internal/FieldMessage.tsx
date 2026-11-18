import { FIELD_ERROR, FIELD_HINT } from './field.js';

/** The line under a field: the error when there is one, else the hint, at the ids `describedBy` names. */
export function FieldMessage({ base, error, hint }: { base: string; error?: string; hint?: string }) {
  if (error) {
    return (
      <p id={`${base}-error`} className={FIELD_ERROR}>
        {error}
      </p>
    );
  }
  if (hint) {
    return (
      <p id={`${base}-hint`} className={FIELD_HINT}>
        {hint}
      </p>
    );
  }
  return null;
}
