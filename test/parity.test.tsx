// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { CASES, COMPONENTS } from './corpus.js';
import { renderReact, renderSvelte } from './harness.js';
import { normalizeHtml } from './normalize.js';

describe('the parity corpus', () => {
  it('holds a case for every ported component', () => {
    const covered = new Set(CASES.map((c) => c.component));
    expect(COMPONENTS.filter((name) => !covered.has(name))).toEqual([]);
  });

  it('names each case once', () => {
    const names = CASES.map((c) => c.name);
    expect(names.filter((name, i) => names.indexOf(name) !== i)).toEqual([]);
  });
});

describe.each(CASES.map((c) => [`${c.component}: ${c.name}`, c] as const))('%s', (_, c) => {
  it('draws the markup of its Svelte original', () => {
    const svelte = normalizeHtml(renderSvelte(c));
    const react = normalizeHtml(renderReact(c));
    expect(react, `the port draws other markup than ${c.component}.svelte`).toBe(svelte);
  });

  it('carries no script', () => {
    const html = renderReact(c);
    expect(html).not.toMatch(/<script/i);
    expect(html).not.toMatch(/\son[a-z]+=/i);
  });
});

describe('ids across several server renders', () => {
  const accordion = CASES.find((c) => c.name === 'accordion with two items')!;
  const name = (prefix?: string) => /<details[^>]*\sname="([^"]+)"/.exec(renderReact(accordion, prefix))![1];

  it('repeat when each render counts from the start', () => {
    expect(name()).toBe(name());
  });

  it('differ when each render takes its own identifier prefix', () => {
    expect(name('faq')).not.toBe(name('plans'));
  });
});
