# Spezifikation: Website Anthony Bánh Mì

Stand: 28.10.2026 · Status: freigegeben (Chat, 28.10.2026) · Auftrag: Goodstuff GmbH (GG), Bereich-ID offen (RÜCKFRAGE)

## Ziel

Mehrsprachige (DE/EN) Website für „Anthony Bánh Mì – Vietnamese Sandwich House“ nach den Entwürfen in `docs/design/`. Erste Version mit allen Bereichen; fehlende Inhalte als sichtbare Platzhalter, nichts erfunden.

## Ausgangslage (geprüft 28.10.2026)

- `anthonybanhmi.com` registriert 03.07.2026 (InterNetX). `.com` und `.de` leiten auf `www.anthony-banhmi.de` weiter, dort STRATO-Seite „Domain reserved“.
- Kein Repo vorhanden. Kein Eintrag im Vorgangsindex.

## Technik

- Astro, statisch (`output: 'static'`), kein Client-Framework.
- Ergebnis `dist/`: per SFTP auf STRATO-Webspace oder Netlify/Cloudflare Pages.
- Inhalte als Daten: `src/data/menu.json`, `src/data/locations.json`, `src/data/site.json`. Texte DE/EN in `src/i18n/`.
- Bilder über `astro:assets` (AVIF/WebP, responsive).
- Schriften selbst gehostet (keine Anfrage an Google).

## Seiten

| Route DE | Route EN | Inhalt |
|---|---|---|
| `/` | `/en/` | Hero, 5 Kategorie-Kacheln, Standorte/Über uns/Karriere, Franchise-Band, 4 Werte |
| `/speisekarte/` | `/en/menu/` | Kategorien, Bánh mì (Tofu, Schwein, Ei, Hähnchen) |
| `/standorte/` | `/en/locations/` | Adresse, Öffnungszeiten, Kartenlink |
| `/ueber-uns/` | `/en/about/` | Geschichte, Konzept |
| `/franchise/` | `/en/franchise/` | Konzept, Kontaktweg |
| `/karriere/` | `/en/careers/` | Teaser, Kontaktweg |
| `/kontakt/` | `/en/contact/` | mailto/tel, kein Formular |
| `/impressum/` | `/en/legal-notice/` | Pflichtangaben (Platzhalter) |
| `/datenschutz/` | `/en/privacy/` | Datenschutzerklärung (Platzhalter) |
| `404` | | Fehlerseite |

## Design

Aus den Entwürfen: Dunkelgrün, Gold, Creme, Holzbraun; Serifen-Display in Versalien; gesperrte Versalien-Sans für Navigation und Labels. Details in `DESIGN.md`.

## Datenschutz und Recht

- Keine Cookies, kein Tracking, kein Consent-Banner nötig.
- Karten nur als externer Link, kein eingebettetes Google Maps.
- Kontakt über `mailto`/`tel`.
- Impressum und Datenschutz vor Launch durch Mensch prüfen.

## Platzhalter-Regel

Fehlende Inhalte als `[RÜCKFRAGE: …]`. `npm run check:launch` schlägt fehl, solange `RÜCKFRAGE` im Build steht.

## Offene Punkte vor Launch

1. Speisekarte mit Preisen, Allergenen, Zusatzstoffen
2. Standorte, Öffnungszeiten, Telefon, E-Mail
3. Impressumsdaten (Betreiber, Rechtsform, Vertretung, Register, USt-ID)
4. Logo als SVG, Zustimmung Anthony zur Porträtnutzung
5. Echte Produktfotos (aktuelle Bilder wirken KI-generiert, Irreführungsrisiko)
6. Hauptdomain festlegen (`anthonybanhmi.com`, `.de`, `anthony-banhmi.de`)
7. Bereich-ID für die GG-Vorgangsakte

## Außenwirkung

GitHub-Repo anlegen, Upload, Veröffentlichung: nur nach ausdrücklicher Freigabe, Name und Datum in die Vorgangsakte.

## Qualität

- Lighthouse ≥ 95 in allen Kategorien
- WCAG 2.2 AA (Kontrast, Fokus, Tastatur, Landmarks, Alt-Texte)
- Schema.org `Restaurant` + `Menu`, hreflang, Sitemap, robots.txt
- Security-Header (CSP u. a.) per `.htaccess` (STRATO/Apache) und `_headers` (Netlify/Cloudflare)
