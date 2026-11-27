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
- Kontakt, Impressum, Indexierung: `src/data/site.json` (`indexable: true` seit dem Livegang am 19.11.2026; rechtliche Prüfung von Impressum und Datenschutz bestätigt am 19.11.2026)
- Texte: `src/i18n/`
- Seiten ausblenden: `hiddenRoutes` in `src/i18n/routes.ts` (derzeit Franchise und Karriere, entschieden am 19.11.2026); die Seitendateien liegen als `src/pages/_franchise.astro` usw. und werden nicht gebaut

## Dienste mit Einwilligung (Cookie-Einstellungen)

- Google-Karte auf „Standorte“: `googleMapEmbedUrl` in `src/data/locations.json` (Google Maps → Teilen → Karte einbetten, nur die `src`-Adresse; kein API-Schlüssel). `null` = keine Karte, keine Cookie-Einstellungen, CSP ohne `frame-src`.
- Lädt erst nach Klick auf „Einwilligen und Karte laden“; Widerruf über „Cookie-Einstellungen“ im Footer. Entscheidung nur im localStorage (`anthony-consent`, 6 Monate), `CONSENT_VERSION` in `src/lib/consent.ts` erhöhen, wenn sich Zweck oder Anbieter ändert.
- Neuer Dienst (z. B. Statistik): Schlüssel in `CONSENT_KEYS`, Konfiguration in `src/lib/services.ts`, CSP in `src/lib/csp.ts`, Texte in `src/i18n/ui.ts` und Abschnitt in `src/views/Privacy.astro`. Vorher rechtlich prüfen lassen.
- Eingerichtet am 27.11.2026; Datenschutztexte dazu sind noch nicht juristisch geprüft.

## Deployment

Hosting: GitHub Pages aus diesem Repo (öffentlich seit 16.11.2026, entschieden am 16.11.2026: kein SFTP im STRATO-Paket). Domain: `www.anthony-banhmi.de`; DNS bei STRATO: `anthony-banhmi.de` A/AAAA auf GitHub Pages, `www` CNAME auf `goodstuffgmbh.github.io`. Mail (MX) bleibt bei STRATO.

- `.github/workflows/ci.yml` prüft jeden Push und Pull Request (Tests, Typen, Build, Links). Es veröffentlicht nichts.
- `.github/workflows/pages.yml` veröffentlicht, nur von Hand und nur von `main`: GitHub → Actions → „Veröffentlichen“ → Run workflow. Pflichtfeld „freigabe“ mit Name und Datum; „livegang“ anhaken verlangt eine grüne Launch-Prüfung.
- GitHub Pages setzt keine eigenen Header; `public/.htaccess` und `public/_headers` gelten dort nicht. Die CSP steht deshalb zusätzlich als Meta-Tag in `src/layouts/Base.astro`. HTTPS über „Enforce HTTPS“ in den Pages-Einstellungen.
- Domain in der Organisation bestätigen (Settings → Pages → Verified domains, TXT-Eintrag bei STRATO), damit kein fremdes Konto sie beanspruchen kann.

## Sicherheit

Statische Seite ohne Server-Code, Formulare, eigene Cookies oder Drittanbieter-Skripte. Einzige Drittanbieter-Einbindung: Google-Karte, nur nach Einwilligung.

- GitHub Pages mit „Enforce HTTPS“; CSP als Meta-Tag (`src/layouts/Base.astro`).
- Ruleset „main schützen“: kein Löschen, kein Force-Push, Änderungen nur per Pull Request (Squash) mit grünem CI-Check `pruefen`.
- Actions: nur GitHub-eigene Actions, auf Commit-SHAs gepinnt; Standard-Token nur Lesen; Workflows aus Forks brauchen Freigabe; Veröffentlichen nur manuell von `main` (Umgebung `github-pages` nur für `main`).
- Secret Scanning mit Push-Schutz, Dependabot-Sicherheitsupdates, vertrauliche Meldung von Lücken (`SECURITY.md`).
- Eingerichtet am 19.11.2026.

Barrierefreiheit: axe-core (WCAG 2.2 AA) 0 Verstöße auf 15 Seiten × 2 Viewports (28.10.2026).
