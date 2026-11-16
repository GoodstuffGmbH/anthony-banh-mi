# Anthony Bánh Mì – Website

Statische Website (Astro, DE/EN) für „Anthony Bánh Mì – Vietnamese Sandwich House“.
Designsprache: `DESIGN.md`.

## Befehle

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Build nach `dist/` |
| `npm run preview` | Build lokal ansehen |
| `npm test` | Daten- und Skripttests |
| `npm run check` | Typprüfung |
| `npm run check:links` | interne Links im Build prüfen |
| `npm run check:launch` | Launch-Sperre: rot, solange `RÜCKFRAGE` oder `noindex` im Build steht |

## Inhalte pflegen

- Speisekarte: `src/data/menu.json`. `prices: null` = Platzhalter; `volume` in Litern; Getränke in `groups`; Allergene je Gericht nur, wenn eine Liste vorliegt (sonst gilt `allergenInfo`); Kategorien ohne Einträge werden nicht angezeigt
- Standorte: `src/data/locations.json`
- Kontakt, Impressum, Indexierung: `src/data/site.json` (`indexable` erst zum Launch auf `true`)
- Texte: `src/i18n/`

## Deployment

GitHub Pages über `.github/workflows/pages.yml`: Jeder Push auf `main` wird getestet, gebaut und veröffentlicht. Domain: `www.anthony-banhmi.de`.

Barrierefreiheit: axe-core (WCAG 2.2 AA) 0 Verstöße auf 15 Seiten × 2 Viewports (28.10.2026).
