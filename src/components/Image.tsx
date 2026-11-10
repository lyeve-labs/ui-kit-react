/** The shapes an image without a known size reserves its box at. */
export type ImageRatio = '1/1' | '4/3' | '3/2' | '16/9';

export interface ImageProps {
  src: string;
  /** What the image shows. An empty string marks it decorative. */
  alt: string;
  /** The image's own size in pixels. Both, or the ratio reserves the box. */
  width?: number;
  height?: number;
  /** The box an image of unknown size is cropped to. */
  ratio?: ImageRatio;
  /** Drawn under the image, which then sits in a figure. */
  caption?: string;
  /** `eager` for an image a reader sees before scrolling. */
  loading?: 'lazy' | 'eager';
  className?: string;
}

const RATIO: Record<ImageRatio, string> = {
  '1/1': 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '16/9': 'aspect-video',
};

/**
 * An image whose box is reserved before its bytes arrive, so the text under
 * it never moves. It takes no event handler, so the server writes no inline
 * handler that a content security policy would refuse.
 */
export function Image({
  src,
  alt,
  width,
  height,
  ratio = '16/9',
  caption,
  loading = 'lazy',
  className = '',
}: ImageProps) {
  const sized = width !== undefined && height !== undefined;
  const imgClass = sized
    ? 'block h-auto max-w-full rounded-md'
    : `block w-full rounded-md object-cover ${RATIO[ratio]}`;

  if (caption) {
    return (
      <figure className={`m-0 ${className}`}>
        <img
          className={imgClass}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
        />
        <figcaption className="mt-site-xs text-sm text-muted">{caption}</figcaption>
      </figure>
    );
  }
  return (
    <img
      className={`${imgClass} ${className}`}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
    />
  );
}
