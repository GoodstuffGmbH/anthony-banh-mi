import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Menu, Locations, Site } from '../src/data/schema.ts';
import menu from '../src/data/menu.json' with { type: 'json' };
import locations from '../src/data/locations.json' with { type: 'json' };
import site from '../src/data/site.json' with { type: 'json' };

test('menu.json entspricht dem Schema', () => {
  assert.doesNotThrow(() => Menu.parse(menu));
});

test('locations.json entspricht dem Schema', () => {
  assert.doesNotThrow(() => Locations.parse(locations));
});

test('site.json entspricht dem Schema', () => {
  assert.doesNotThrow(() => Site.parse(site));
});

test('Speisekarte hat die fünf Kategorien aus dem Entwurf', () => {
  const ids = Menu.parse(menu).categories.map((c) => c.id);
  assert.deepEqual(ids, ['snacks-lunch', 'vegan-vegetarisch', 'kaffee-getraenke', 'fruehstueck', 'kuchen-desserts']);
});

const allItems = (m) => m.categories.flatMap((c) => [...c.items, ...c.groups.flatMap((g) => g.items)]);

test('Alle fünf Bánh mì der Karte haben Preis und Beschreibung', () => {
  const items = Object.fromEntries(allItems(Menu.parse(menu)).map((i) => [i.id, i]));
  const card = { 'banh-mi-schwein': 7.9, 'banh-mi-haehnchen': 7.5, 'banh-mi-tofu': 6.5, 'banh-mi-ei': 6.9, 'banh-mi-sua': 3.9 };
  for (const [id, amount] of Object.entries(card)) {
    assert.ok(items[id], `${id} fehlt`);
    assert.deepEqual(items[id].prices, [{ amount }], id);
    assert.ok(items[id].description, `${id} ohne Beschreibung`);
  }
});

test('IDs sind eindeutig (Kategorien, Gruppen, Positionen)', () => {
  const parsed = Menu.parse(menu);
  const ids = [
    ...parsed.categories.map((c) => c.id),
    ...parsed.categories.flatMap((c) => c.groups.map((g) => g.id)),
    ...allItems(parsed).map((i) => i.id),
  ];
  assert.equal(new Set(ids).size, ids.length);
});

test('Schema lehnt negative Preise und leere Preislisten ab', () => {
  const negative = structuredClone(menu);
  negative.categories[0].items[0].prices[0].amount = -1;
  assert.throws(() => Menu.parse(negative));
  const empty = structuredClone(menu);
  empty.categories[0].items[0].prices = [];
  assert.throws(() => Menu.parse(empty));
});

test('Getränke mit Größe: Volumen in Litern, mehrere Größen möglich', () => {
  const wine = allItems(Menu.parse(menu)).find((i) => i.id === 'zibomare-weiss');
  assert.deepEqual(wine.prices, [
    { amount: 6.9, volume: 0.2 },
    { amount: 19.9, volume: 0.75 },
  ]);
});

test('Schema verlangt DE- und EN-Namen', () => {
  const bad = structuredClone(menu);
  bad.categories[0].name.en = '';
  assert.throws(() => Menu.parse(bad));
});

test('Allergene: null = offen, Liste = gepflegt, Feld ist Pflicht', () => {
  const ok = structuredClone(menu);
  ok.categories[0].items[0].allergens = ['A', 'C'];
  assert.doesNotThrow(() => Menu.parse(ok));
  const missing = structuredClone(menu);
  delete missing.categories[0].items[0].allergens;
  assert.throws(() => Menu.parse(missing));
});

test('Kartenlinks nur mit https (kein javascript:/data:)', () => {
  const base = Locations.parse(locations)[0];
  for (const bad of ['javascript:alert(1)', 'data:text/html,x', 'http://maps.example.org']) {
    assert.throws(() => Locations.parse([{ ...base, mapUrl: bad }]), bad);
  }
  assert.doesNotThrow(() => Locations.parse([{ ...base, mapUrl: 'https://maps.example.org/?q=x' }]));
});

test('Google-Place-ID: nur ChIJ-Format, daraus entstehen nur https-Links', async () => {
  const { placeUrl, writeReviewUrl } = await import('../src/lib/google.ts');
  const base = Locations.parse(locations)[0];
  assert.match(base.googlePlaceId, /^ChIJ/);
  for (const bad of ['', 'x', 'javascript:alert(1)', 'ChIJ abc"><script>']) {
    assert.throws(() => Locations.parse([{ ...base, googlePlaceId: bad }]), bad);
  }
  assert.ok(placeUrl(base.googlePlaceId, 'A & B').startsWith('https://www.google.com/maps/search/?api=1&query=A%20%26%20B&query_place_id=ChIJ'));
  assert.ok(writeReviewUrl(base.googlePlaceId).startsWith('https://search.google.com/local/writereview?placeid=ChIJ'));
});
