import { FIELD_LABEL } from './field.js';

interface Props {
  text: string;
  required?: boolean;
  /** The control the label names. Without it the label is a `span`. */
  htmlFor?: string;
  id?: string;
  /** Kept for assistive technology and not drawn. */
  hidden?: boolean;
  /** Replaces the field label class, for a choice label. */
  className?: string;
}

/**
 * A field's label with its required marker. The marker is hidden from
 * assistive technology, because the control states the requirement itself.
 */
export function FieldLabel({
  text,
  required = false,
  htmlFor,
  id,
  hidden = false,
  className = FIELD_LABEL,
}: Props) {
  const cls = hidden ? `${className} sr-only` : className;
  const content = (
    <>
      {text}
      {required && (
        <span className="ms-0.5 text-danger" aria-hidden="true">
          *
        </span>
      )}
    </>
  );
  return htmlFor === undefined ? (
    <span id={id} className={cls}>
      {content}
    </span>
  ) : (
    <label id={id} htmlFor={htmlFor} className={cls}>
      {content}
    </label>
  );
}
