// Launch-Sperre: schlägt fehl, solange im Build noch RÜCKFRAGE-Platzhalter
// oder ein noindex stehen. Aufruf: node scripts/check-launch.mjs dist
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.argv[2] ?? 'dist';
const rules = [
  { name: 'RÜCKFRAGE-Platzhalter', pattern: /RÜCKFRAGE/g },
  { name: 'noindex', pattern: /<meta[^>]+name="robots"[^>]+noindex/g },
];

const files = readdirSync(root, { recursive: true })
  .map(String)
  .filter((f) => /\.(html|xml|txt|json)$/.test(f));

const findings = [];
for (const file of files) {
  const text = readFileSync(join(root, file), 'utf8');
  for (const rule of rules) {
    const count = text.match(rule.pattern)?.length ?? 0;
    if (count) findings.push(`${relative('.', join(root, file))}: ${count}× ${rule.name}`);
  }
}

if (findings.length) {
  console.error(`Launch gesperrt (${findings.length} Dateien mit offenen Punkten):`);
  for (const f of findings) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`Launch-Prüfung bestanden (${files.length} Dateien).`);
