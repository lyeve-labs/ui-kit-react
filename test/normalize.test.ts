// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { normalizeHtml } from './normalize.js';

const same = (a: string, b: string) => expect(normalizeHtml(a)).toBe(normalizeHtml(b));
const differ = (a: string, b: string) => expect(normalizeHtml(a)).not.toBe(normalizeHtml(b));

describe('normalizeHtml', () => {
  it('drops comments, which carry the hydration markers', () => {
    same('<!--[--><p><!---->Hi<!--]--></p><!--]-->', '<p>Hi</p>');
  });

  it('drops whitespace-only text and collapses whitespace runs inside text', () => {
    same('<p> <span>a</span>\n  <span>b   c</span> </p>', '<p><span>a</span><span>b c</span></p>');
  });

  it('keeps the edge whitespace of text that holds more than whitespace', () => {
    differ('<span> N</span>', '<span>N</span>');
  });

  it('sorts attributes', () => {
    same('<a href="/x" class="c" aria-label="L"></a>', '<a aria-label="L" class="c" href="/x"></a>');
  });

  it('compares class as a token set', () => {
    same('<p class="b  a b "></p>', '<p class="a b"></p>');
    differ('<p class="a b"></p>', '<p class="a c"></p>');
  });

  it('writes a boolean attribute as empty', () => {
    same('<input disabled="disabled" required>', '<input disabled="" required="">');
  });

  it('normalizes style declarations', () => {
    same('<p style="color:red;  margin : 0 ;"></p>', '<p style="margin: 0; color: red"></p>');
    differ('<p style="color: red"></p>', '<p style="color: blue"></p>');
  });

  it('canonicalizes generated ids by first appearance in every attribute that refers to one', () => {
    same(
      '<label for="s1"></label><input id="s1" aria-describedby="s1-hint x"><p id="s1-hint"></p>',
      '<label for="_R_0_"></label><input id="_R_0_" aria-describedby="_R_0_-hint x"><p id="_R_0_-hint"></p>',
    );
    same(
      '<details name="accordion-s1"></details><details name="accordion-s1"></details>',
      '<details name="accordion-_R_k_"></details><details name="accordion-_R_k_"></details>',
    );
    same('<i id="_p-R_0_"></i>', '<i id="s2"></i>');
  });

  it('keeps generated ids apart that differ, and fixed ids as written', () => {
    differ('<i id="s1"></i><i id="s1"></i>', '<i id="_R_0_"></i><i id="_R_1_"></i>');
    differ('<i id="refunds"></i>', '<i id="cancel"></i>');
    differ('<input name="news">', '<input name="mail">');
  });

  it('fails on a different element, attribute or text', () => {
    differ('<p>a</p>', '<div>a</div>');
    differ('<p aria-hidden="true"></p>', '<p></p>');
    differ('<p>a</p>', '<p>b</p>');
    differ('<p><span>a</span></p>', '<p>a</p>');
  });

  it('reads a void element and the text inside a textarea', () => {
    same('<img src="/a"/><textarea>hi</textarea>', '<img src="/a"><textarea>hi</textarea>');
    differ('<textarea>hi</textarea>', '<textarea></textarea>');
  });
});
