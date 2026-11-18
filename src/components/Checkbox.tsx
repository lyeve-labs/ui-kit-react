import { useId, type ComponentType } from 'react';
import {
  CHOICE_DESCRIPTION,
  CHOICE_FOCUS,
  CHOICE_ICON_PX,
  CHOICE_INPUT,
  CHOICE_LABEL_STACK,
  CHOICE_MARK,
  choiceBox,
  choiceIcon,
  choiceLabel,
  choiceWrap,
  type ChoiceSize,
  type ChoiceVariant,
} from '../internal/choice.js';
import { FIELD_WRAP } from '../internal/field.js';
import { FieldLabel } from '../internal/FieldLabel.js';
import { FieldMessage } from '../internal/FieldMessage.js';

export interface CheckboxProps {
  /** Whether the box is ticked. With `onChange` it is controlled, and without it this is the starting state. */
  checked?: boolean;
  /** Partly checked. Announced as aria-checked="mixed". */
  indeterminate?: boolean;
  label?: string;
  /** Screen-reader-only label, for a checkbox in a table cell whose column header is the visible name. */
  labelHidden?: boolean;
  /** Secondary line under the label. */
  description?: string;
  hint?: string;
  error?: string;
  /** Drawn before the label. */
  icon?: ComponentType<{ size?: number; className?: string }>;
  size?: ChoiceSize;
  /** `card` draws a bordered option whose whole surface is the target. */
  variant?: ChoiceVariant;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: string;
  className?: string;
  onChange?: (checked: boolean) => void;
  /** Marks the control `data-no-ai`, so a browser agent leaves its value alone. */
  noAI?: boolean;
}

/** A checkbox inside its label, inline or as a card, named by its label and described by its message. */
export function Checkbox({
  checked = false,
  indeterminate = false,
  label,
  labelHidden = false,
  description,
  hint,
  error,
  icon: Icon,
  size = 'md',
  variant = 'inline',
  required = false,
  disabled = false,
  id,
  name,
  value,
  className = '',
  onChange,
  noAI = false,
}: CheckboxProps) {
  const uid = useId();
  const fieldId = id ?? uid;

  // Error, then hint, then description: a screen reader announces one
  // message, so the most urgent one wins.
  const messageId = error
    ? `${fieldId}-error`
    : hint
      ? `${fieldId}-hint`
      : description
        ? `${fieldId}-description`
        : undefined;

  // A part-checked box is on, not a third color.
  const on = checked || indeterminate;

  // A card fills its column. An inline option must not, or a stray click far
  // from the box would toggle it.
  const rootClass = variant === 'card' ? FIELD_WRAP : `${FIELD_WRAP} items-start`;

  const checkedProp = onChange
    ? { checked, onChange: (e: { currentTarget: HTMLInputElement }) => onChange(e.currentTarget.checked) }
    : { defaultChecked: checked };
  // The server writes the attribute as the kit does. The drawn mark and
  // aria-checked carry the mixed state, since the input itself is invisible.
  const mixedAttr = indeterminate ? { indeterminate: '' } : {};

  const control = (
    <input
      type="checkbox"
      id={fieldId}
      name={name}
      value={value}
      required={required}
      disabled={disabled}
      {...checkedProp}
      {...mixedAttr}
      aria-checked={indeterminate ? 'mixed' : undefined}
      aria-invalid={error ? 'true' : undefined}
      aria-labelledby={label ? `${fieldId}-label` : undefined}
      aria-describedby={messageId}
      className={CHOICE_INPUT}
    />
  );

  const mark = (
    <span className={`${choiceBox(size, checked, indeterminate)} mt-0.5`}>
      {on && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
          <path
            d={indeterminate ? CHOICE_MARK.mixed : CHOICE_MARK.check}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );

  const body = (label || description || Icon) && (
    <span className={CHOICE_LABEL_STACK}>
      {(label || Icon) && (
        <span className="flex items-center gap-2">
          {Icon && (
            <span className={choiceIcon(size)}>
              <Icon size={CHOICE_ICON_PX[size]} />
            </span>
          )}
          {label && (
            // Named by aria-labelledby rather than by the wrapping label, so
            // the description below stays a description.
            <FieldLabel
              id={`${fieldId}-label`}
              text={label}
              required={required}
              className={choiceLabel(size)}
              hidden={labelHidden}
            />
          )}
        </span>
      )}
      {description && (
        <span id={`${fieldId}-description`} className={CHOICE_DESCRIPTION}>
          {description}
        </span>
      )}
    </span>
  );

  return (
    <div data-field="" data-no-ai={noAI ? '' : undefined} className={`${rootClass} ${className}`}>
      {variant === 'card' ? (
        <label className="relative block">
          {control}
          <span className={`${choiceWrap('card', on, disabled)} ${CHOICE_FOCUS}`}>
            {mark}
            {body}
          </span>
        </label>
      ) : (
        <label className={choiceWrap('inline', on, disabled)}>
          <span className="relative flex shrink-0 items-center justify-center">
            {control}
            {mark}
          </span>
          {body}
        </label>
      )}
      <FieldMessage base={fieldId} error={error} hint={hint} />
    </div>
  );
}
