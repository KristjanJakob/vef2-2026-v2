import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

export const titleSchema = z
  .string()
  .trim()
  .min(1, 'Titill má ekki vera tómur.')
  .max(255, 'Titill má að hámarki vera 255 stafir.');

test('titleSchema rejects empty after trim', () => {
  const r = titleSchema.safeParse('   ');
  assert.equal(r.success, false);
});

test('titleSchema accepts trimmed non-empty', () => {
  const r = titleSchema.safeParse('  halló  ');
  assert.equal(r.success, true);
  if (r.success) assert.equal(r.data, 'halló');
});