import { Button } from './Button.js';

/** A link in a navigation bar. With no `href` the label is drawn as text. */
export interface NavLink {
  label: string;
  href?: string;
  /** The page the bar is drawn on, announced as the current page. */
  current?: boolean;
}

export interface NavBarProps {
  /** The site's name, drawn beside the logo. */
  brand?: string;
  /** Drawn 32px tall. Its width and height reserve its box. */
  logo?: { src: string; alt: string; width: number; height: number };
  links?: NavLink[];
  /** The one button at the end of the bar. */
  action?: { label: string; href: string };
  /** The landmark's name for a screen reader. */
  label?: string;
  className?: string;
}

/**
 * A site's navigation: its name or logo, its links and one call to action.
 * The links wrap onto more lines as the page narrows, so every one stays in
 * reach on a phone without a menu that needs script.
 */
export function NavBar({ brand, logo, links = [], action, label = 'Main', className = '' }: NavBarProps) {
  // The name beside a logo already says what the logo shows.
  const logoAlt = brand ? '' : (logo?.alt ?? '');
  return (
    <nav aria-label={label} className={`flex flex-wrap items-center gap-x-site-md gap-y-site-sm ${className}`}>
      {(brand || logo) && (
        <span className="me-auto inline-flex items-center gap-site-sm font-heading text-xl font-bold text-fg">
          {logo && (
            <img
              className="h-8 w-auto"
              src={logo.src}
              alt={logoAlt}
              width={logo.width}
              height={logo.height}
              decoding="async"
            />
          )}{' '}
          {brand ?? ''}
        </span>
      )}
      {links.length > 0 && (
        <ul className="m-0 flex list-none flex-wrap gap-x-site-md gap-y-site-xs p-0">
          {links.map((link, i) => (
            <li key={i} className="shrink-0">
              {link.href ? (
                <a
                  href={link.href}
                  aria-current={link.current ? 'page' : undefined}
                  className="text-fg no-underline underline-offset-4 transition-colors hover:text-brand hover:underline aria-[current=page]:text-brand aria-[current=page]:underline"
                >
                  {link.label}
                </a>
              ) : (
                <span className="text-fg">{link.label}</span>
              )}
            </li>
          ))}
        </ul>
      )}
      {action && <Button href={action.href}>{action.label}</Button>}
    </nav>
  );
}
