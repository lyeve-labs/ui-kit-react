import type { ReactNode } from 'react';

export interface SectionProps {
  /** The band's name for a screen reader, which makes it a region. */
  label?: string;
  /** Drawn behind the content and cropped to the band. */
  image?: { src: string; alt?: string };
  overlay?: 'none' | 'light' | 'dark';
  /** `tall` is 60% of the window and `screen` all of it, content centered. */
  height?: 'auto' | 'tall' | 'screen';
  intro?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const HEIGHT = {
  auto: '',
  tall: 'min-h-band-tall justify-center',
  screen: 'min-h-svh justify-center',
} as const;

/**
 * A band of a page: an optional introduction, the content and an optional
 * footer. An overlay names its scheme in `data-scheme`, so everything inside
 * draws in that palette over the page color at 85%, which keeps the words
 * readable whatever the image shows. The layers stack by source order.
 */
export function Section({
  label,
  image,
  overlay = 'none',
  height = 'auto',
  intro,
  footer,
  children,
  className = '',
}: SectionProps) {
  const layered = image !== undefined || overlay !== 'none';
  return (
    <section
      aria-label={label}
      data-scheme={overlay === 'none' ? undefined : overlay}
      className={`relative isolate flex flex-col gap-site-md px-site-lg py-site-xl ${HEIGHT[height]} ${layered ? 'overflow-hidden rounded-md' : ''} ${className}`}
    >
      {image && (
        <img
          className="absolute inset-0 size-full object-cover"
          src={image.src}
          alt={image.alt ?? ''}
          decoding="async"
        />
      )}
      {overlay !== 'none' && <div className="absolute inset-0 bg-ink/85" aria-hidden="true"></div>}
      {intro && <header className="relative">{intro}</header>}
      {children && <div className="relative">{children}</div>}
      {footer && <footer className="relative">{footer}</footer>}
    </section>
  );
}
