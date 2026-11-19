import type { APIRoute } from 'astro';
import { locations, site, visibleCategories } from '../data';
import { routes, langs, isVisible, type RouteKey } from '../i18n/routes';
import { useT } from '../i18n/ui';

// llms.txt (llmstxt.org): Kurzfassung der Website für KI-Assistenten.
// Nur Angaben aus den Daten, nichts Zusätzliches.
const abs = (path: string) => new URL(path, site.url).href;
const eur = (n: number) => `${n.toFixed(2).replace('.', ',')} €`;
const pages = (['menu', 'locations', 'about', 'franchise', 'careers', 'contact', 'imprint', 'privacy'] as RouteKey[]).filter(isVisible);

export const GET: APIRoute = () => {
  const de = useT('de');
  const city = locations.find((l) => l.city)?.city;
  const lines: string[] = [
    `# ${site.name}`,
    '',
    `> ${site.tagline}${city ? ` in ${city}` : ''}. ${de.meta.homeDescription}`,
    '',
  ];

  for (const lang of langs) {
    const t = useT(lang);
    lines.push(lang === 'de' ? '## Seiten' : '## Pages (English)', '');
    lines.push(`- [${t.meta.homeTitle}](${abs(routes.home[lang])})`);
    for (const key of pages) {
      const seo = t.seo[key as keyof typeof t.seo];
      lines.push(`- [${seo.title}](${abs(routes[key][lang])}): ${seo.description}`);
    }
    lines.push('');
  }

  lines.push('## Speisekarte', '');
  for (const c of visibleCategories) {
    lines.push(`### ${c.name.de}`, '');
    const items = [...c.items, ...c.groups.flatMap((g) => g.items)];
    for (const i of items) {
      const price = i.prices?.map((p) => (p.volume ? `${eur(p.amount)} (${String(p.volume).replace('.', ',')} l)` : eur(p.amount))).join(' / ');
      lines.push(`- ${i.name.de}${price ? `: ${price}` : ''}`);
    }
    lines.push('');
  }

  lines.push('## Kontakt', '');
  for (const l of locations.filter((l) => l.street && l.city)) {
    lines.push(`- Adresse: ${l.street}, ${l.postalCode} ${l.city}`);
  }
  if (site.phone) lines.push(`- Telefon: ${site.phone}`);
  if (site.email) lines.push(`- E-Mail: ${site.email}`);
  lines.push('');

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
