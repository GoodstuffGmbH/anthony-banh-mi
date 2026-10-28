// Prüft interne href/src im Build auf vorhandene Ziele und Anker.
// Aufruf: node scripts/check-links.mjs dist
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2] ?? 'dist';
const pages = readdirSync(root, { recursive: true }).map(String).filter((f) => f.endsWith('.html'));
const html = new Map(pages.map((p) => [p, readFileSync(join(root, p), 'utf8')]));

function resolve(path) {
  const file = join(root, decodeURIComponent(path));
  if (existsSync(file) && statSync(file).isFile()) return file;
  const index = join(file, 'index.html');
  return existsSync(index) ? index : null;
}

const ids = (text) => new Set([...text.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const errors = [];

for (const [page, text] of html) {
  const self = '/' + page.replace(/index\.html$/, '');
  for (const [, attr, value] of text.matchAll(/\s(href|src|srcset)="([^"]+)"/g)) {
    const urls = attr === 'srcset' ? value.split(',').map((s) => s.trim().split(/\s+/)[0]) : [value];
    for (const url of urls) {
      if (/^(https?:|mailto:|tel:|data:)/.test(url)) continue;
      const [path, hash] = url.split('#');
      const target = path === '' ? join(root, page) : resolve(path.startsWith('/') ? path : join(self, path));
      if (!target) {
        errors.push(`${page}: ${url} (Ziel fehlt)`);
        continue;
      }
      if (hash && target.endsWith('.html') && !ids(readFileSync(target, 'utf8')).has(hash)) {
        errors.push(`${page}: ${url} (Anker fehlt)`);
      }
    }
  }
}

if (errors.length) {
  console.error(`${errors.length} defekte Links:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`Linkprüfung bestanden (${pages.length} Seiten).`);
