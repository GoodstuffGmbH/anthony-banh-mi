import { test } from 'node:test';
import assert from 'node:assert/strict';
import { telHref } from '../src/lib/format.ts';

test('telHref entfernt Leerzeichen, Schrägstriche, Bindestriche und Klammern', () => {
  assert.equal(telHref('0351 / 123-45 (0)'), 'tel:0351123450');
});

test('telHref behält das führende Plus', () => {
  assert.equal(telHref('+49 351 123 456'), 'tel:+49351123456');
});
