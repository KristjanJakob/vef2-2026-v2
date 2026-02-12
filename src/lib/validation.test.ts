import test from 'node:test';
import assert from 'node:assert/strict';
import { titleSchema } from './validation.js';

void test('titleSchema rejects empty after trim', () => {
  const r = titleSchema.safeParse('   ');
  assert.equal(r.success, false);
});

void test('titleSchema accepts trimmed non-empty', () => {
  const r = titleSchema.safeParse('  halló  ');
  assert.equal(r.success, true);
  if (r.success) assert.equal(r.data, 'halló');
});