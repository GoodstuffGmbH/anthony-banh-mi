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

Hosting: GitHub Pages aus diesem Repo (öffentlich seit 16.11.2026, entschieden am 16.11.2026: kein SFTP im STRATO-Paket). Domain: `www.anthony-banhmi.de`; DNS bei STRATO: `anthony-banhmi.de` A/AAAA auf GitHub Pages, `www` CNAME auf `goodstuffgmbh.github.io`. Mail (MX) bleibt bei STRATO.

- `.github/workflows/ci.yml` prüft jeden Push und Pull Request (Tests, Typen, Build, Links). Es veröffentlicht nichts.
- `.github/workflows/pages.yml` veröffentlicht, nur von Hand und nur von `main`: GitHub → Actions → „Veröffentlichen“ → Run workflow. Pflichtfeld „freigabe“ mit Name und Datum; „livegang“ anhaken verlangt eine grüne Launch-Prüfung.
- GitHub Pages setzt keine eigenen Header; `public/.htaccess` und `public/_headers` gelten dort nicht. Die CSP steht deshalb zusätzlich als Meta-Tag in `src/layouts/Base.astro`. HTTPS über „Enforce HTTPS“ in den Pages-Einstellungen.
- Domain in der Organisation bestätigen (Settings → Pages → Verified domains, TXT-Eintrag bei STRATO), damit kein fremdes Konto sie beanspruchen kann.

Barrierefreiheit: axe-core (WCAG 2.2 AA) 0 Verstöße auf 15 Seiten × 2 Viewports (28.10.2026).
