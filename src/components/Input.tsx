import { useId, type ComponentPropsWithRef } from 'react';
import { CONTROL_BASE, FIELD_WRAP, controlBorder, describedBy, joinIds } from '../internal/field.js';
import { FieldLabel } from '../internal/FieldLabel.js';
import { FieldMessage } from '../internal/FieldMessage.js';

type Forwarded = Omit<
  ComponentPropsWithRef<'input'>,
  'value' | 'defaultValue' | 'type' | 'placeholder' | 'disabled' | 'required' | 'id' | 'className'
>;

export interface InputProps extends Forwarded {
  /** The value. With `onChange` the input is controlled, and without it this is the starting value. */
  value?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  /**
   * Ids of other elements that describe the input, separated by spaces, read
   * after the input's own hint or error.
   */
  describedBy?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  /** Monospace for the control alone: a slug, a key, a locale tag. */
  mono?: boolean;
  /** Marks the control `data-no-ai`, so a browser agent leaves its value alone. */
  noAI?: boolean;
  /** Lands on the wrapper, not the control. */
  className?: string;
}

/** A single-line text control with its label and the message under it. */
export function Input({
  value = '',
  label,
  type = 'text',
  placeholder = '',
  hint,
  error,
  describedBy: callerIds,
  disabled = false,
  required = false,
  id,
  mono = false,
  noAI = false,
  className = '',
  ...rest
}: InputProps) {
  // useId and not the label: two fields under one label would take one id.
  const uid = useId();
  const fieldId = id ?? uid;
  const valueProp = rest.onChange ? { value } : { defaultValue: value };

  return (
    <div data-field="" data-no-ai={noAI ? '' : undefined} className={`${FIELD_WRAP} ${className}`}>
      {label && <FieldLabel htmlFor={fieldId} text={label} required={required} />}
      <input
        id={fieldId}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        {...valueProp}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={joinIds(describedBy(fieldId, error, hint), callerIds)}
        className={`${CONTROL_BASE} ${controlBorder(!!error)} ${mono ? 'font-mono' : ''}`}
        {...rest}
      />
      <FieldMessage base={fieldId} error={error} hint={hint} />
    </div>
  );
}
