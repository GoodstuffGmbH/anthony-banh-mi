import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatPrice, formatVolume, telHref } from '../src/lib/format.ts';

test('telHref entfernt Leerzeichen, Schrägstriche, Bindestriche und Klammern', () => {
  assert.equal(telHref('0351 / 123-45 (0)'), 'tel:0351123450');
});

test('telHref behält das führende Plus', () => {
  assert.equal(telHref('+49 351 123 456'), 'tel:+49351123456');
});

test('formatPrice und formatVolume folgen der Sprache', () => {
  assert.equal(formatPrice(3.9, 'de'), '3,90\u00a0€');
  assert.equal(formatPrice(3.9, 'en'), '€3.90');
  assert.equal(formatVolume(0.33, 'de'), '0,33 l');
  assert.equal(formatVolume(0.33, 'en'), '0.33 l');
});
