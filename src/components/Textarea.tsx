import { useId, type ChangeEvent, type FocusEvent } from 'react';
import { CONTROL_MULTILINE, FIELD_WRAP, controlBorder, describedBy } from '../internal/field.js';
import { FieldLabel } from '../internal/FieldLabel.js';
import { FieldMessage } from '../internal/FieldMessage.js';

export interface TextareaProps {
  /** The value. With `onChange` the control is controlled, and without it this is the starting value. */
  value?: string;
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  resize?: boolean;
  error?: string;
  hint?: string;
  /** Monospace for the control alone: code, JSON, a key. */
  mono?: boolean;
  /** Lands on the wrapper, not the control. */
  className?: string;
  /** Called at each keystroke, as the input event fires. */
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  /** Marks the control `data-no-ai`, so a browser agent leaves its value alone. */
  noAI?: boolean;
}

/** A multiline text control with its label and the message under it. */
export function Textarea({
  value = '',
  id,
  name,
  label,
  placeholder,
  rows = 4,
  maxLength,
  required = false,
  disabled = false,
  readOnly = false,
  resize = true,
  error,
  hint,
  mono = false,
  className = '',
  onChange,
  onBlur,
  noAI = false,
}: TextareaProps) {
  const uid = useId();
  const fieldId = id ?? uid;
  const valueProp = onChange ? { value, onChange } : { defaultValue: value };

  return (
    <div data-field="" data-no-ai={noAI ? '' : undefined} className={`${FIELD_WRAP} ${className}`}>
      {label && <FieldLabel htmlFor={fieldId} text={label} required={required} />}
      <textarea
        id={fieldId}
        name={name}
        rows={rows}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy(fieldId, error, hint)}
        className={`${CONTROL_MULTILINE} ${controlBorder(!!error)} ${resize ? 'resize-y' : 'resize-none'} ${mono ? 'font-mono' : ''}`}
        {...valueProp}
        onBlur={onBlur}
      />
      <FieldMessage base={fieldId} error={error} hint={hint} />
    </div>
  );
}
