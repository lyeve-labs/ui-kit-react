import type { ReactNode } from 'react';

/** The networks a footer links a profile on, by the name each one uses. */
export const SOCIAL_NETWORKS = {
  x: 'X',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
  mastodon: 'Mastodon',
} as const;

export type SocialNetwork = keyof typeof SOCIAL_NETWORKS;

export interface FooterProps {
  /** A short text, such as the address or the copyright. */
  note?: ReactNode;
  /** With no `href` a label is drawn as text. */
  links?: { label: string; href?: string }[];
  social?: { network: SocialNetwork; href: string }[];
  /** The name of the links' landmark for a screen reader. */
  label?: string;
  /** The name of the list of profiles for a screen reader. */
  socialLabel?: string;
  className?: string;
}

const LINK = 'text-muted underline-offset-4 transition-colors hover:text-fg hover:underline';
const ROW = 'm-0 flex list-none flex-wrap gap-x-site-md gap-y-site-xs p-0';

/**
 * The foot of a site: a note, a row of links and the site's profiles
 * elsewhere. A profile is a plain link named for its network, never a
 * network's script or embed, and `rel="me"` lets the network confirm the site
 * is the profile's owner.
 */
export function Footer({
  note,
  links = [],
  social = [],
  label = 'Footer',
  socialLabel = 'Social',
  className = '',
}: FooterProps) {
  return (
    <footer className={`grid gap-site-md border-t border-line pt-site-md text-sm text-muted ${className}`}>
      {note && <div className="[&_a:not([class])]:underline [&_p:not([class])+p]:mt-site-xs">{note}</div>}
      {links.length > 0 && (
        <nav aria-label={label}>
          <ul className={ROW}>
            {links.map((link, i) => (
              <li key={i} className="shrink-0">
                {link.href ? (
                  <a className={LINK} href={link.href}>
                    {link.label}
                  </a>
                ) : (
                  <span>{link.label}</span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
      {social.length > 0 && (
        // A list without its markers loses the list role in WebKit, and with
        // it its name, so the role is stated.
        <ul role="list" className={ROW} aria-label={socialLabel}>
          {social.map((profile, i) => (
            <li key={i} className="shrink-0">
              <a className={LINK} href={profile.href} rel="me">
                {SOCIAL_NETWORKS[profile.network]}
              </a>
            </li>
          ))}
        </ul>
      )}
    </footer>
  );
}
