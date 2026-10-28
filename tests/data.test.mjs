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
  assert.deepEqual(ids, ['kaffee-getraenke', 'fruehstueck', 'kuchen-desserts', 'snacks-lunch', 'vegan-vegetarisch']);
});

test('Bánh mì mit Tofu, Schwein, Ei und Hähnchen sind enthalten', () => {
  const items = Menu.parse(menu).categories.flatMap((c) => c.items.map((i) => i.id));
  for (const id of ['banh-mi-tofu', 'banh-mi-schwein', 'banh-mi-ei', 'banh-mi-haehnchen']) {
    assert.ok(items.includes(id), `${id} fehlt`);
  }
});

test('IDs sind eindeutig', () => {
  const parsed = Menu.parse(menu);
  const ids = [...parsed.categories.map((c) => c.id), ...parsed.categories.flatMap((c) => c.items.map((i) => i.id))];
  assert.equal(new Set(ids).size, ids.length);
});

test('Schema lehnt negative Preise ab', () => {
  const bad = structuredClone(menu);
  bad.categories[3].items[0].price = -1;
  assert.throws(() => Menu.parse(bad));
});

test('Schema verlangt DE- und EN-Namen', () => {
  const bad = structuredClone(menu);
  bad.categories[0].name.en = '';
  assert.throws(() => Menu.parse(bad));
});
