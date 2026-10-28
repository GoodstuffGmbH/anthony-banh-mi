import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const run = (script, dir) => spawnSync(process.execPath, [join('scripts', script), dir], { encoding: 'utf8' });

function site(files) {
  const dir = mkdtempSync(join(tmpdir(), 'abm-'));
  for (const [path, content] of Object.entries(files)) {
    mkdirSync(join(dir, path, '..'), { recursive: true });
    writeFileSync(join(dir, path), content);
  }
  return dir;
}

test('check-launch: Exit 1 bei RÜCKFRAGE-Platzhalter', () => {
  const dir = site({ 'index.html': '<p>[RÜCKFRAGE: Preis]</p>' });
  const r = run('check-launch.mjs', dir);
  assert.equal(r.status, 1);
  assert.match(r.stdout + r.stderr, /index\.html/);
});

test('check-launch: Exit 1 bei noindex', () => {
  const dir = site({ 'index.html': '<meta name="robots" content="noindex">' });
  assert.equal(run('check-launch.mjs', dir).status, 1);
});

test('check-launch: Exit 0 ohne Treffer', () => {
  const dir = site({ 'index.html': '<p>Fertig</p>' });
  assert.equal(run('check-launch.mjs', dir).status, 0);
});

test('check-links: meldet fehlendes Ziel', () => {
  const dir = site({ 'index.html': '<a href="/fehlt/">x</a><img src="/bild.png" alt="">' });
  const r = run('check-links.mjs', dir);
  assert.equal(r.status, 1);
  assert.match(r.stdout + r.stderr, /\/fehlt\//);
  assert.match(r.stdout + r.stderr, /\/bild\.png/);
});

test('check-links: akzeptiert vorhandene Ziele, Anker und externe Links', () => {
  const dir = site({
    'index.html': '<a id="top"></a><a href="/a/?ref=qr">q</a><a href="/a/?ref=qr#x">qx</a><a href="/a/">a</a><a href="/a/#x">x</a><a href="#top">t</a><a href="https://example.org">e</a><a href="mailto:a@b.de">m</a><a href="tel:+49">t</a>',
    'a/index.html': '<p id="x">ok</p>',
  });
  assert.equal(run('check-links.mjs', dir).status, 0);
});

test('check-links: meldet ungültige Prozent-Kodierung statt abzustürzen', () => {
  const dir = site({ 'index.html': '<a href="/%E/">x</a>' });
  const r = run('check-links.mjs', dir);
  assert.equal(r.status, 1);
  assert.match(r.stdout + r.stderr, /%E/);
  assert.doesNotMatch(r.stderr, /URIError/);
});
