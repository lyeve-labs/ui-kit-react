import type { ComponentType, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { CARD_FOOTER, CARD_HEADER, CARD_PAD, CARD_SURFACE, sectionHeading } from '../internal/layout.js';
import { Image, type ImageRatio } from './Image.js';

type Pad = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
  title?: string;
  description?: string;
  /**
   * The card's own heading. `header` wins over `heading`, and `heading` over
   * `title`. Renders the icon, a heading element at `headingLevel` and the
   * `meta` row.
   */
  heading?: string;
  /** 2 under a page title, 3 inside another card. */
  headingLevel?: 2 | 3;
  /** Drawn before the heading. Decorative, so it carries no name of its own. */
  icon?: ComponentType<{ size?: number; className?: string }>;
  /** A count, a status or a timestamp, at the end of the heading row. */
  meta?: string;
  /**
   * Drawn edge to edge above the heading. With its own width and height it
   * keeps its shape, and without them it is cropped to `ratio`.
   */
  image?: { src: string; alt: string; width?: number; height?: number; ratio?: ImageRatio };
  pad?: Pad;
  hover?: boolean;
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
  /** Makes the card a button, which Enter and Space activate as well as a click. */
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
  children: ReactNode;
}

/** A surface for a group of content, with an optional image, heading and footer band. */
export function Card({
  title,
  description,
  heading,
  headingLevel = 3,
  icon: Icon,
  meta,
  image,
  pad = 'md',
  hover = false,
  className = '',
  header,
  footer,
  onClick,
  onKeyDown,
  children,
}: CardProps) {
  // A card that takes role="button" honors Enter and Space itself, as a
  // native button would, and still forwards the caller's own handler.
  function activate(e: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(e);
    if (!onClick || e.defaultPrevented) return;
    if (e.key !== 'Enter' && e.key !== ' ') return;
    // Space scrolls the page on an element that is not a button.
    e.preventDefault();
    e.currentTarget.click();
  }

  return (
    <div
      data-print="keep"
      className={`${CARD_SURFACE} ${pad === 'none' ? 'overflow-hidden' : ''} transition-colors ${hover || onClick ? 'hover:border-brand/50' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? activate : onKeyDown}
    >
      {image && (
        <div className="overflow-hidden rounded-t-card [&_img]:w-full [&_img]:rounded-none">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            ratio={image.ratio}
          />
        </div>
      )}

      {(header || heading || title) && (
        <div className={CARD_HEADER}>
          {header ? (
            header
          ) : heading ? (
            <>
              <div className="flex items-center gap-2">
                {Icon && <Icon size={16} className="shrink-0 text-faint" />}
                {headingLevel === 2 ? (
                  <h2 className={sectionHeading(2)}>{heading}</h2>
                ) : (
                  <h3 className={sectionHeading(3)}>{heading}</h3>
                )}
                {meta && <span className="ms-auto shrink-0 text-xs text-faint">{meta}</span>}
              </div>
              {description && <p className="text-sm text-muted mt-0.5">{description}</p>}
            </>
          ) : (
            <>
              <h3 className="font-heading font-semibold text-fg">{title}</h3>
              {description && <p className="text-sm text-muted mt-0.5">{description}</p>}
            </>
          )}
        </div>
      )}

      {/* The kit writes no class attribute for pad none, where the class is empty. */}
      <div className={CARD_PAD[pad] || undefined}>{children}</div>

      {footer && <div className={CARD_FOOTER}>{footer}</div>}
    </div>
  );
}
