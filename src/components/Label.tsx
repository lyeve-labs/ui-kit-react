import type { ReactNode } from 'react';
import { FIELD_LABEL } from '../internal/field.js';

export interface LabelProps {
  htmlFor?: string;
  /**
   * Draws the marker beside the text. Set `required` on the control as well:
   * the marker is decorative, and the control's own attribute is what a
   * screen reader reports.
   */
  required?: boolean;
  hint?: string;
  className?: string;
  children: ReactNode;
}

/** A label for a control the caller lays out itself. */
export function Label({ htmlFor, required = false, hint, className = '', children }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={`flex items-center gap-1 ${FIELD_LABEL} ${className}`}>
      {children}
      {required && (
        <span className="text-danger font-bold leading-none" aria-hidden="true">
          *
        </span>
      )}
      {hint && <span className="text-faint normal-case font-normal ms-0.5">({hint})</span>}
    </label>
  );
}
