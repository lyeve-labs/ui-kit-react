/**
 * Renders a parity case through the Svelte original and through its port,
 * each on the server, as a page for visitors is rendered.
 */

import * as kit from '@lyeve-labs/ui-kit';
import { createElement, type ComponentType, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createRawSnippet, type Component } from 'svelte';
import { render } from 'svelte/server';
import * as ports from '../src/index.js';
import type { FieldWiring } from '../src/index.js';
import { TEST_ICON, type ParityCase } from './corpus.js';
import AccordionItems from './svelte/AccordionItems.svelte';
import TestIconSvelte from './svelte/TestIcon.svelte';

function TestIcon({ size = 24, className }: { size?: number; className?: string }) {
  return <svg data-icon="test" width={size} height={size} className={className}></svg>;
}

/** The wired control both harnesses build from what a Field hands over. */
function wiredAttributes(wiring: FieldWiring): [string, string][] {
  const attributes: [string, string][] = [['id', wiring.id]];
  if (wiring.describedBy) attributes.push(['aria-describedby', wiring.describedBy]);
  if (wiring.labeledBy) attributes.push(['aria-labelledby', wiring.labeledBy]);
  if (wiring.invalid) attributes.push(['aria-invalid', 'true']);
  return attributes;
}

const svelteText = (text: string) => createRawSnippet(() => ({ render: () => `<span>${text}</span>` }));

export function renderSvelte(c: ParityCase): string {
  const props: Record<string, unknown> = { ...c.props };
  if (c.children !== undefined) props.children = svelteText(c.children);
  for (const [name, text] of Object.entries(c.slots ?? {})) props[name] = svelteText(text);
  if (props.icon === TEST_ICON) props.icon = TestIconSvelte;
  // The port leaves out the hint the original draws from an aria-label, so
  // the original is rendered with the hint switched off.
  if (c.component === 'Button') props.hint = false;
  if (c.component === 'Field') {
    props.children = createRawSnippet((wiring: () => FieldWiring) => ({
      render: () =>
        `<input${wiredAttributes(wiring())
          .map(([name, value]) => ` ${name}="${value}"`)
          .join('')}>`,
    }));
  }
  if (c.component === 'Accordion') return render(AccordionItems, { props }).body;
  const component = (kit as unknown as Record<string, Component<Record<string, unknown>>>)[c.component];
  return render(component, { props }).body;
}

/** The original's prop names that React spells its own way. */
const REACT_NAMES: Record<string, string> = {
  class: 'className',
  for: 'htmlFor',
  onclick: 'onClick',
  onkeydown: 'onKeyDown',
  maxlength: 'maxLength',
  readonly: 'readOnly',
  autocomplete: 'autoComplete',
};

const reactProps = (props: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(props).map(([name, value]) => [REACT_NAMES[name] ?? name, value]));

const reactText = (text: string) => <span>{text}</span>;

/**
 * React hoists a preload hint for every image that is not lazy into the
 * document head. A fragment has no head, so the hints lead the output. They
 * are taken off here, and each has to name an image the markup draws.
 */
function takeImagePreloads(html: string): string {
  const preload = /^<link rel="preload" as="image" href="([^"]*)"\/>/;
  const hrefs: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = preload.exec(html))) {
    hrefs.push(match[1]);
    html = html.slice(match[0].length);
  }
  for (const href of hrefs) {
    if (!html.includes(`src="${href}"`)) throw new Error(`a preload names ${href}, which no image draws`);
  }
  return html;
}

export function reactElement(c: ParityCase): ReactNode {
  const props = reactProps(c.props);
  if (c.children !== undefined) props.children = reactText(c.children);
  for (const [name, text] of Object.entries(c.slots ?? {})) props[name] = reactText(text);
  if (props.icon === TEST_ICON) props.icon = TestIcon;
  if (c.component === 'Field') {
    props.children = (wiring: FieldWiring) =>
      createElement('input', Object.fromEntries(wiredAttributes(wiring)));
  }
  if (c.component === 'Accordion') {
    const { items, ...rest } = props as { items: { id: string; title: string; text: string; class?: string }[] };
    return (
      <ports.Accordion {...(rest as Omit<ports.AccordionProps, 'children'>)}>
        {items.map((item) => (
          <ports.AccordionItem key={item.id} id={item.id} title={item.title} className={item.class}>
            {reactText(item.text)}
          </ports.AccordionItem>
        ))}
      </ports.Accordion>
    );
  }
  const component = (ports as unknown as Record<string, ComponentType<Record<string, unknown>>>)[c.component];
  return createElement(component, props);
}

export function renderReact(c: ParityCase, identifierPrefix?: string): string {
  return takeImagePreloads(renderToStaticMarkup(reactElement(c), { identifierPrefix }));
}
