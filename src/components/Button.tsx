import type { ComponentPropsWithRef, MouseEvent, ReactNode } from 'react';
import { safeHref } from '../internal/href.js';
import { Spinner } from '../internal/Spinner.js';
import { TOUCH_GROW } from '../internal/touch.js';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'violet';
type Size = 'sm' | 'md' | 'lg' | 'icon';

type Forwarded = Omit<
  ComponentPropsWithRef<'button'> & ComponentPropsWithRef<'a'>,
  'type' | 'href' | 'disabled' | 'className' | 'onClick' | 'children'
>;

export interface ButtonProps extends Forwarded {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  /** Draws a link instead of a button. */
  href?: string;
  full?: boolean;
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  children: ReactNode;
}

// A forced colors scheme replaces a filled button's fill with the canvas, so
// it draws an outline there or the button reads as loose text.
const FILLED_EDGE =
  'forced-colors:outline-solid forced-colors:outline-1 forced-colors:-outline-offset-1 ' +
  'forced-colors:outline-[color:ButtonText] forced-colors:disabled:outline-[color:GrayText]';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand bg-lift bg-origin-border text-ink border border-transparent hover:bg-brand-light ' +
    `active:bg-brand-deep inset-shadow-bevel shadow-raised ${FILLED_EDGE}`,
  violet: `bg-violet text-ink hover:brightness-110 active:brightness-90 border border-transparent inset-shadow-bevel shadow-raised ${FILLED_EDGE}`,
  secondary:
    'bg-surface-2 text-fg border border-line hover:bg-line active:bg-line-strong/30 inset-shadow-highlight shadow-raised',
  danger: `bg-danger text-ink hover:brightness-110 active:brightness-90 border border-transparent inset-shadow-bevel shadow-raised ${FILLED_EDGE}`,
  ghost:
    'text-muted border border-transparent hover:bg-surface-2 hover:text-fg active:bg-line active:text-fg',
  outline: 'border border-line text-fg hover:border-brand hover:text-brand active:bg-brand/10',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5 rounded-md',
  md: 'px-4 py-2 text-sm gap-2 rounded-lg',
  lg: 'px-5 py-2.5 text-base gap-2 rounded-lg',
  icon: 'p-1.75 rounded-lg',
};

/** A button, or a link drawn as one when given an `href`. */
export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  href,
  full = false,
  className = '',
  onClick,
  children,
  ...rest
}: ButtonProps) {
  const cls =
    `inline-flex items-center justify-center font-medium whitespace-nowrap ` +
    `transition-colors ` +
    `disabled:opacity-50 disabled:cursor-not-allowed select-none ${TOUCH_GROW} ` +
    `${full ? 'w-full' : ''} ${variants[variant]} ${sizes[size]} ${className}`;
  const spinner = loading && <Spinner size={size === 'lg' ? 16 : 14} />;

  if (href) {
    // An anchor has no disabled state, so an inert link drops its href, which
    // takes it out of the tab order and stops activation.
    const inert = disabled || loading;
    return (
      <a
        href={inert ? undefined : safeHref(href)}
        className={`${cls} ${inert ? 'pointer-events-none opacity-50' : ''}`}
        aria-disabled={inert ? 'true' : undefined}
        tabIndex={inert ? -1 : undefined}
        onClick={inert ? undefined : onClick}
        {...rest}
      >
        {spinner}
        {children}
      </a>
    );
  }
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading ? 'true' : undefined}
      onClick={onClick}
      className={cls}
      {...rest}
    >
      {spinner}
      {children}
    </button>
  );
}
