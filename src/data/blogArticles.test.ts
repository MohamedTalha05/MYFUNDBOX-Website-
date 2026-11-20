import test from 'node:test';
import assert from 'node:assert/strict';
import { articleDate, latestArticles, type BlogArticle } from './blogArticles';

const a = (over: Partial<BlogArticle>): BlogArticle => ({
  locale: 'en',
  url: 'https://myfundbox.com/post/x',
  title: 'T',
  description: 'D',
  image: null,
  category: null,
  publishedAt: null,
  updatedAt: null,
  ...over,
});

test('prefers a real publication date over the last-modified date', () => {
  assert.deepEqual(articleDate(a({ publishedAt: '2026-05-01', updatedAt: '2026-07-01' })), { iso: '2026-05-01', kind: 'published' });
  assert.deepEqual(articleDate(a({ updatedAt: '2026-07-01' })), { iso: '2026-07-01', kind: 'updated' });
  assert.equal(articleDate(a({})), null);
});

test('returns the newest articles for the locale, newest first', () => {
  const src = [
    a({ url: '1', updatedAt: '2026-05-01' }),
    a({ url: '2', updatedAt: '2026-07-01' }),
    a({ url: '3', updatedAt: '2026-06-01' }),
    a({ url: '4', updatedAt: '2026-04-01' }),
    a({ url: 'de', locale: 'de', updatedAt: '2026-08-01' }),
  ];
  assert.deepEqual(latestArticles('en', 3, src).map((x) => x.url), ['2', '3', '1']);
});

test('falls back to English when a locale has fewer than three articles', () => {
  const src = [a({ url: 'en1', updatedAt: '2026-01-01' }), a({ url: 'de1', locale: 'de', updatedAt: '2026-02-01' })];
  assert.deepEqual(latestArticles('de', 3, src).map((x) => x.url), ['en1']);
});
