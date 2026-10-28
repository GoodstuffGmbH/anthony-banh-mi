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
