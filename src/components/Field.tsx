import { useId, type ReactNode } from 'react';
import { FIELD_WRAP, describedBy } from '../internal/field.js';
import { FieldLabel } from '../internal/FieldLabel.js';
import { FieldMessage } from '../internal/FieldMessage.js';

/** What Field hands the control it wraps. */
export interface FieldWiring {
  /** The id the control must carry. The label's `for` already points at it. */
  id: string;
  /**
   * The id of whichever message is on screen, for the control's
   * `aria-describedby`. Undefined when there is neither a hint nor an error.
   */
  describedBy: string | undefined;
  /** True while an error is showing, for the control's `aria-invalid`. */
  invalid: boolean;
  /** The id of the caption, for a group's `aria-labelledby`. Set only for a `group` with a label. */
  labeledBy: string | undefined;
}

export interface FieldProps {
  /** Overrides the generated id, for a control the caller has to address by name. */
  id?: string;
  label?: string;
  /** Screen-reader-only label, for a control whose visible name is a table column header. */
  labelHidden?: boolean;
  /**
   * The control is a group. A label's `for` reaches one form control and
   * never a group, so the caption is drawn as text with an id instead, handed
   * over as `labeledBy`.
   */
  group?: boolean;
  hint?: string;
  /** Replaces the hint while it is set, and marks the wiring invalid. */
  error?: string;
  /** Draws the marker beside the label. Set `required` on the control as well. */
  required?: boolean;
  className?: string;
  /** Receives what the control must carry so the message row reaches a screen reader. */
  children: (wiring: FieldWiring) => ReactNode;
}

/** A label, a control of the caller's own and the message under it, wired together by id. */
export function Field({
  id,
  label,
  labelHidden = false,
  group = false,
  hint,
  error,
  required = false,
  className = '',
  children,
}: FieldProps) {
  const uid = useId();
  const fieldId = id ?? uid;
  const wiring: FieldWiring = {
    id: fieldId,
    describedBy: describedBy(fieldId, error, hint),
    invalid: !!error,
    labeledBy: group && label ? `${fieldId}-label` : undefined,
  };

  return (
    <div data-field="" className={`${FIELD_WRAP} ${className}`}>
      {label &&
        (group ? (
          <FieldLabel id={`${fieldId}-label`} text={label} required={required} hidden={labelHidden} />
        ) : (
          <FieldLabel htmlFor={fieldId} text={label} required={required} hidden={labelHidden} />
        ))}
      {children(wiring)}
      <FieldMessage base={fieldId} error={error} hint={hint} />
    </div>
  );
}
