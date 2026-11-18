// A browser ignores control characters and spaces inside a scheme, so
// `java\tscript:` runs as `javascript:`. They are removed before the test.
const IGNORED = /[\x00-\x20]/g;
const DENIED = /^(?:javascript|data|vbscript):/i;

/** The href, or nothing when its scheme would run code. Relative URLs and standard schemes pass. */
export function safeHref(href: string | undefined | null): string | undefined {
  if (!href) return undefined;
  return DENIED.test(href.replace(IGNORED, '')) ? undefined : href;
}
