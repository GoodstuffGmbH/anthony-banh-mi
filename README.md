# Anthony Bánh Mì – Website

Statische Website (Astro, DE/EN) für „Anthony Bánh Mì – Vietnamese Sandwich House“.
Auftrag der Goodstuff GmbH. Spezifikation: `docs/specs/`, Plan: `docs/plans/`, Designsprache: `DESIGN.md`.

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

- Speisekarte: `src/data/menu.json` (Preis `null` = Platzhalter)
- Standorte: `src/data/locations.json`
- Kontakt, Impressum, Indexierung: `src/data/site.json` (`indexable` erst zum Launch auf `true`)
- Texte: `src/i18n/`

## Deployment

`dist/` per SFTP auf den Webspace laden (`.htaccess` für Apache/STRATO liegt bei) oder auf Netlify/Cloudflare Pages (`_headers`). Veröffentlichung nur nach Freigabe.

## Offene Punkte vor Launch (RÜCKFRAGE)

1. Speisekarte mit Preisen, Beschreibungen, Allergenen; Bestätigung der Bánh-mì-Sorten (Hähnchen, Schwein, Ei, Tofu)
2. Standorte, Öffnungszeiten, Telefon, E-Mail
3. Impressumsdaten; Impressum und Datenschutz rechtlich prüfen lassen
4. Logo als SVG, Zustimmung zur Porträtnutzung
5. Echte Produktfotos (aktuelle wirken KI-generiert)
6. Hauptdomain (`anthonybanhmi.com`, `.de` oder `anthony-banhmi.de`) und Hosting
7. Bereich-ID für die GG-Vorgangsakte

Prüfberichte: `docs/faktencheck-2026-10-28.md`. Barrierefreiheit: axe-core (WCAG 2.2 AA) 0 Verstöße auf 15 Seiten × 2 Viewports (28.10.2026).
