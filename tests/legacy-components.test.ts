import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { SimpleSparkles } from '../components/ui/simple-sparkles.tsx';
import { StickyScroll } from '../components/ui/sticky-scroll-reveal.tsx';

test('retained decorative sparkles produce stable server and hydration inputs', () => {
  const render = () => renderToStaticMarkup(createElement(SimpleSparkles));
  const first = render();
  assert.equal(first, render());
  assert.equal((first.match(/bg-blue-400/g) ?? []).length, 20);
  assert.doesNotMatch(first, /NaN|undefined/);
});
test('retained sticky content renders empty and populated snapshots safely', () => {
  assert.doesNotThrow(() => renderToStaticMarkup(createElement(StickyScroll, { content: [] })));
  const html = renderToStaticMarkup(createElement(StickyScroll, {
    content: [{ title: 'Recorded title', description: 'Recorded description', content: 'Recorded content' }],
  }));
  for (const text of ['Recorded title', 'Recorded description', 'Recorded content']) assert.ok(html.includes(text));
});
