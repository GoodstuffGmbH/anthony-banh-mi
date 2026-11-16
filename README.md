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

Hosting: STRATO-Webspace des Inhabers, Zugang nur per SFTP. Domain: `www.anthony-banhmi.de`. Header und HTTPS-Weiterleitung: `public/.htaccess`.

- `.github/workflows/ci.yml` prüft jeden Push und Pull Request (Tests, Typen, Build, Links). Es veröffentlicht nichts.
- `.github/workflows/strato-upload.yml` lädt hoch, nur von Hand und nur von `main`: GitHub → Actions → „Upload zu STRATO“ → Run workflow. Pflichtfeld „freigabe“ mit Name und Datum; „livegang“ anhaken verlangt eine grüne Launch-Prüfung. Auf dem Server wird nichts gelöscht.
- Secrets einmalig unter Settings → Secrets and variables → Actions eintragen: `STRATO_SFTP_HOST`, `STRATO_SFTP_USER`, `STRATO_SFTP_PASSWORD`, `STRATO_SFTP_ZIEL` (Ordner, auf den die Domain zeigt), `STRATO_SFTP_KNOWN_HOSTS`.
- `STRATO_SFTP_KNOWN_HOSTS`: Ausgabe von `ssh-keyscan -t ed25519,rsa <Host>`. Vorher den Fingerabdruck (`ssh-keygen -lf <(ssh-keyscan <Host>)`) mit dem abgleichen, den STRATO angibt bzw. den der erste manuelle `sftp`-Login zeigt.
- Bei STRATO: Domain auf den Zielordner zeigen lassen, SSL-Zertifikat aktivieren, Weiterleitung auf die Hauptdomain einrichten.
- Achtung: Ein STRATO-Verzeichnisschutz schreibt eine eigene `.htaccess` in den Ordner; der Upload überschreibt sie. Einen passwortgeschützten Probe-Upload vorher mit STRATO klären.

Barrierefreiheit: axe-core (WCAG 2.2 AA) 0 Verstöße auf 15 Seiten × 2 Viewports (28.10.2026).
