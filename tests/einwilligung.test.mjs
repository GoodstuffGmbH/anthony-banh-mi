import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CONSENT_MAX_AGE_MS,
  CONSENT_VERSION,
  isGranted,
  makeRecord,
  pending,
  readRecord,
  updateRecord,
} from '../src/lib/consent.ts';
import { enabledKeys, isMapsEmbedUrl, resolveServices } from '../src/lib/services.ts';
import { buildCsp } from '../src/lib/csp.ts';
import { mapsEmbedForLang, safeGoogleUrl } from '../src/lib/google.ts';
import locations from '../src/data/locations.json' with { type: 'json' };

const NOW = 1_800_000_000_000;
const EMBED = locations[0].googleMapEmbedUrl;

test('Einwilligung: gespeicherter Wert wird gelesen und geprüft', () => {
  const rec = makeRecord(NOW, ['maps'], ['maps']);
  const back = readRecord(JSON.stringify(rec), NOW + 1000);
  assert.deepEqual(back, rec);
  assert.equal(isGranted(back, 'maps'), true);
  assert.equal(isGranted(makeRecord(NOW, ['maps'], []), 'maps'), false);
  assert.equal(isGranted(null, 'maps'), false);
});

test('Einwilligung: Müll, falsche Version, Zukunft und Ablauf gelten als keine Entscheidung', () => {
  const good = { v: CONSENT_VERSION, ts: NOW, asked: ['maps'], granted: ['maps'] };
  assert.ok(readRecord(JSON.stringify(good), NOW));
  for (const raw of [null, '', 'x', '[]', 'null', '"a"', '{}']) assert.equal(readRecord(raw, NOW), null, String(raw));
  assert.equal(readRecord(JSON.stringify({ ...good, v: CONSENT_VERSION + 1 }), NOW), null);
  assert.equal(readRecord(JSON.stringify({ ...good, ts: NOW + 1 }), NOW), null);
  assert.equal(readRecord(JSON.stringify({ ...good, ts: 'x' }), NOW), null);
  assert.ok(readRecord(JSON.stringify(good), NOW + CONSENT_MAX_AGE_MS), 'genau 6 Monate gilt noch');
  assert.equal(readRecord(JSON.stringify(good), NOW + CONSENT_MAX_AGE_MS + 1), null);
});

test('Einwilligung: erlaubt ist nur, was gefragt wurde; Unbekanntes fliegt raus', () => {
  const raw = JSON.stringify({ v: CONSENT_VERSION, ts: NOW, asked: [], granted: ['maps', 'tracker'] });
  const rec = readRecord(raw, NOW);
  assert.deepEqual(rec.asked, []);
  assert.deepEqual(rec.granted, []);
});

test('Einwilligung: Entscheidung setzen und widerrufen', () => {
  assert.deepEqual(pending(null, ['maps']), ['maps']);
  assert.deepEqual(pending(null, []), []);
  const yes = updateRecord(null, NOW, { maps: true });
  assert.deepEqual(yes.granted, ['maps']);
  assert.deepEqual(pending(yes, ['maps']), []);
  const no = updateRecord(yes, NOW + 1, { maps: false });
  assert.deepEqual(no.granted, []);
  assert.deepEqual(no.asked, ['maps']);
  const same = updateRecord(no, NOW + 2, {});
  assert.deepEqual(same.granted, []);
});

test('Dienste: ohne Adresse ist die Karte aus', () => {
  for (const input of [{}, { mapEmbedUrl: '' }, { mapEmbedUrl: '  ' }, { mapEmbedUrl: null }])
    assert.deepEqual(enabledKeys(resolveServices(input)), [], JSON.stringify(input));
});

test('Dienste: Karte mit echter Einbettungs-Adresse, ungültige Werte brechen ab', () => {
  assert.deepEqual(enabledKeys(resolveServices({ mapEmbedUrl: EMBED })), ['maps']);
  for (const bad of [
    'https://example.org/maps/embed?pb=x',
    'http://www.google.com/maps/embed?pb=x',
    'https://www.google.com/maps/embed',
    'https://www.google.com/maps?pb=x',
    'https://www.google.com.evil.example/maps/embed?pb=x',
    'javascript:alert(1)',
  ]) {
    assert.equal(isMapsEmbedUrl(bad), false, bad);
    assert.throws(() => resolveServices({ mapEmbedUrl: bad }), bad);
  }
});

test('Karte: die hinterlegte Adresse stimmt mit dem Eintrag überein', () => {
  assert.equal(isMapsEmbedUrl(EMBED), true);
  assert.ok(EMBED.includes('0x4709cf4d732dd751%3A0xdd434ae45666aaa9'), 'Feature-ID des Eintrags');
});

test('Karte: Sprache wird nur im Oberflächen-Teil getauscht', () => {
  assert.equal(mapsEmbedForLang(EMBED, 'de'), EMBED);
  const en = mapsEmbedForLang(EMBED, 'en');
  assert.ok(en.includes('!5e0!3m2!1sen!2sde'));
  assert.equal(en.length, EMBED.length);
  assert.equal(mapsEmbedForLang('https://www.google.com/maps/embed?pb=!1sde', 'en'), 'https://www.google.com/maps/embed?pb=!1sde');
});

test('CSP: ohne Dienste unverändert streng, mit Karte nur frame-src für Google', () => {
  const base =
    "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests";
  assert.equal(buildCsp(resolveServices({})), base);
  const maps = buildCsp(resolveServices({ mapEmbedUrl: EMBED }));
  assert.equal(maps, base.replace('; upgrade-insecure-requests', '; frame-src https://www.google.com; upgrade-insecure-requests'));
  assert.doesNotMatch(maps, /unsafe-inline|unsafe-eval|\*/);
});

test('Google-Links: nur https-Adressen auf google.com', () => {
  assert.ok(safeGoogleUrl('https://www.google.com/maps/contrib/123'));
  for (const bad of ['javascript:alert(1)', 'http://www.google.com/x', 'https://evil.example/', 'https://google.com.evil.example/', 'https://notgoogle.com/', 42, null, 'x'])
    assert.equal(safeGoogleUrl(bad), null, String(bad));
});
