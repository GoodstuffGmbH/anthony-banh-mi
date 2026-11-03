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

- Speisekarte: `src/data/menu.json`. Quelle sind die Karten in `docs/quellen/` (01.11.2026). `prices: null` = Platzhalter; `volume` in Litern; Getränke in `groups`; Allergene je Gericht nur, wenn eine Liste vorliegt (sonst gilt `allergenInfo`)
- Standorte: `src/data/locations.json`
- Kontakt, Impressum, Indexierung: `src/data/site.json` (`indexable` erst zum Launch auf `true`)
- Texte: `src/i18n/`

## Deployment

`dist/` per SFTP auf den Webspace laden (`.htaccess` für Apache/STRATO liegt bei) oder auf Netlify/Cloudflare Pages (`_headers`). Veröffentlichung nur nach Freigabe.

## Offene Punkte vor Launch (RÜCKFRAGE)

1. Speisekarte: Bánh mì und Getränke sind übernommen (Karten vom 01.11.2026). Offen sind Frühstück sowie Kuchen & Desserts. Außerdem zu bestätigen:
   - Schreibweisen: „Bánh Mì Sữa“ (Karte: „SƯA“), „Double Espresso“ und „Latte Macchiato“ (Karte: „Expresso“, „Macciato“)
   - Deutsche Untertitel der Getränke sind übersetzt (die Karte ist englisch) und brauchen eine redaktionelle Prüfung
   - Konzepttext auf „Über uns“ ist ein Entwurf aus den Angaben der Karten (Bäcker, Bohnen, Matcha, Mamas Rezept, hausgemachte Getränke) und braucht eine redaktionelle Prüfung
2. Standorte, Öffnungszeiten, Telefon, E-Mail
3. Impressumsdaten; Impressum, Datenschutz und Allergenhinweis rechtlich prüfen lassen. Entschieden am 01.11.2026 (office@thats-coffee.de, Name in Akte nachtragen): Allergene wie auf der Karte nur als „Allergenliste auf Anfrage“, nicht je Gericht.
4. Logo als SVG, Zustimmung zur Porträtnutzung
5. Echte Produktfotos (aktuelle wirken KI-generiert)
6. Hauptdomain (`anthonybanhmi.com`, `.de` oder `anthony-banhmi.de`) und Hosting
7. Bereich-ID für die GG-Vorgangsakte

Prüfberichte: `docs/faktencheck-2026-10-28.md`. Barrierefreiheit: axe-core (WCAG 2.2 AA) 0 Verstöße auf 15 Seiten × 2 Viewports (28.10.2026).
