/**
 * Turns server-rendered HTML into a canonical form, so a Svelte render and a
 * React render of the same markup compare equal and every real difference
 * still shows.
 *
 * What it forgives, and why each one means nothing to a browser or a reader:
 * - comments, which carry Svelte's hydration markers
 * - whitespace-only text nodes, and runs of whitespace inside text
 * - attribute order, and the order of class tokens
 * - how a boolean attribute is spelled
 * - spacing and order inside a style attribute
 * - the spelling of a generated id, which each framework counts its own way
 */

import { JSDOM } from 'jsdom';

const { window } = new JSDOM('');
const { Node } = window;

const BOOLEAN_ATTRIBUTES = new Set([
  'allowfullscreen',
  'async',
  'autofocus',
  'autoplay',
  'checked',
  'controls',
  'default',
  'defer',
  'disabled',
  'formnovalidate',
  'hidden',
  'inert',
  'ismap',
  'loop',
  'multiple',
  'muted',
  'nomodule',
  'novalidate',
  'open',
  'playsinline',
  'readonly',
  'required',
  'reversed',
  'selected',
]);

/** The attributes that hold an id or a list of them, plus the name an accordion builds from one. */
const ID_ATTRIBUTES = new Set([
  'id',
  'for',
  'aria-describedby',
  'aria-labelledby',
  'aria-controls',
  'name',
]);

const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
]);

/**
 * A generated id: Svelte's `s1` and React's `_R_0_`, with React's older
 * spellings and an identifier prefix. A fixed id a caller passes matches
 * none of them, so it is compared as written.
 */
const GENERATED_ID = /_[A-Za-z0-9-]*R_[0-9A-Za-z]+_|\xabr[0-9a-z]+\xbb|:r[0-9a-z]+:|(?<![A-Za-z0-9_])s\d+(?![A-Za-z0-9])/g;

function normalizeStyle(value: string): string {
  return value
    .split(';')
    .map((declaration) => {
      const colon = declaration.indexOf(':');
      if (colon < 0) return declaration.trim();
      const property = declaration.slice(0, colon).trim().toLowerCase();
      const body = declaration.slice(colon + 1).trim().replace(/\s+/g, ' ');
      return `${property}: ${body}`;
    })
    .filter(Boolean)
    .sort()
    .join('; ');
}

/** Returns the HTML in canonical form, one node per line, so a difference reads as a line diff. */
export function normalizeHtml(html: string): string {
  const fragment = JSDOM.fragment(html);
  const ids = new Map<string, string>();
  const canonicalId = (value: string) =>
    value.replace(GENERATED_ID, (found) => {
      if (!ids.has(found)) ids.set(found, `uid${ids.size + 1}`);
      return ids.get(found)!;
    });

  const lines: string[] = [];
  const walk = (node: ChildNode, depth: number) => {
    const pad = '  '.repeat(depth);
    if (node.nodeType === Node.TEXT_NODE) {
      const text = (node.textContent ?? '').replace(/\s+/g, ' ');
      if (text.trim() !== '') lines.push(`${pad}${JSON.stringify(text)}`);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const element = node as Element;
    const tag = element.tagName.toLowerCase();
    const attributes = [...element.attributes]
      .map(({ name, value }) => {
        if (name === 'class') value = [...new Set(value.split(/\s+/).filter(Boolean))].sort().join(' ');
        else if (name === 'style') value = normalizeStyle(value);
        else if (BOOLEAN_ATTRIBUTES.has(name)) value = '';
        if (ID_ATTRIBUTES.has(name)) value = canonicalId(value.trim().split(/\s+/).join(' '));
        return [name, value] as const;
      })
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
      .map(([name, value]) => ` ${name}="${value.replace(/"/g, '&quot;')}"`)
      .join('');

    lines.push(`${pad}<${tag}${attributes}>`);
    // A template's content lives in its own fragment, which childNodes misses.
    const children = tag === 'template' ? (element as HTMLTemplateElement).content : element;
    for (const child of children.childNodes) walk(child, depth + 1);
    if (!VOID_ELEMENTS.has(tag)) lines.push(`${pad}</${tag}>`);
  };

  for (const child of fragment.childNodes) walk(child, 0);
  return lines.join('\n');
}
