import { Image } from './Image.js';

/** An image in a gallery, cropped to 4:3 so the tiles line up. */
export interface GalleryImage {
  src: string;
  /** What the image shows. An empty string marks it decorative. */
  alt: string;
  caption?: string;
}

export interface GalleryProps {
  images: GalleryImage[];
  layout?: 'grid' | 'row';
  /** The row's name for a screen reader. */
  label?: string;
  className?: string;
}

const LAYOUT = {
  grid: 'grid gap-gutter grid-cols-[repeat(auto-fill,minmax(min(100%,var(--spacing-column-min)),1fr))]',
  row: 'relative flex snap-x snap-mandatory gap-gutter overflow-x-auto overscroll-x-contain pb-site-sm',
} as const;

/**
 * Images in a grid, or in a row that scrolls sideways and stops on each one,
 * with no script. The row is a scrolling region, so it takes keyboard focus
 * and a name. A list without its markers loses the list role in WebKit, so
 * the role is stated.
 */
export function Gallery({ images, layout = 'grid', label = 'Gallery', className = '' }: GalleryProps) {
  if (images.length === 0) return null;
  return (
    <ul
      role="list"
      className={`m-0 list-none p-0 ${LAYOUT[layout]} ${className}`}
      tabIndex={layout === 'row' ? 0 : undefined}
      aria-label={layout === 'row' ? label : undefined}
    >
      {images.map((image, i) => (
        <li key={i} className={layout === 'row' ? 'shrink-0 basis-[min(80%,22rem)] snap-start' : 'min-w-0'}>
          <Image src={image.src} alt={image.alt} caption={image.caption} ratio="4/3" />
        </li>
      ))}
    </ul>
  );
}
