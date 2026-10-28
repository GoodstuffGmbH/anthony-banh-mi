# Website Anthony Bánh Mì Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan.

**Goal:** Statische, zweisprachige Website (DE/EN) nach `docs/specs/2026-10-28-website-design.md`, mit allen Bereichen und markierten Platzhaltern.

**Architecture:** Astro erzeugt reine HTML-Dateien. Inhalte liegen in JSON-Datendateien und i18n-Wörterbüchern, Seiten sind dünne Templates darüber. Ein Prüfskript für den Build verhindert einen Launch mit offenen `RÜCKFRAGE`-Platzhaltern und mit kaputten internen Links.

**Tech Stack:** Astro 5, TypeScript, Zod (über `astro:content`/eigene Schemas), sharp (Bildoptimierung), Node 26.

---

## Dateistruktur

```
astro.config.mjs            Site-URL, i18n (de Standard ohne Präfix, en unter /en/), Sitemap
package.json                Skripte: dev, build, preview, check, test, check:launch
public/
  .htaccess                 Security-Header, Caching, 404 (STRATO/Apache)
  _headers                  dieselben Header für Netlify/Cloudflare
  robots.txt
  favicon.svg
  fonts/                    selbst gehostete WOFF2
src/
  data/site.json            Name, Domain, Kontakt, Social (Platzhalter)
  data/menu.json            Kategorien und Gerichte, Preise null = Platzhalter
  data/locations.json       Standorte (Platzhalter)
  data/schema.ts            Zod-Schemas für die drei Dateien
  i18n/de.ts, en.ts         UI- und Seitentexte
  i18n/index.ts             t(), Routen-Mapping DE<->EN
  styles/tokens.css         Design-Tokens aus DESIGN.md
  styles/global.css         Reset, Typografie, Utilities
  components/               Header, Footer, LangSwitch, Logo, CategoryTile, MenuItem,
                            LocationCard, ValueIcon, Placeholder, Seo, JsonLd
  layouts/Base.astro        HTML-Gerüst, Seo, Header, Footer, Skip-Link
  pages/...                 DE-Routen; pages/en/... EN-Routen; 404.astro
  assets/img/               Produktfotos, Logo-Ausschnitt
scripts/
  check-launch.mjs          sucht „RÜCKFRAGE“ in dist/, Exit 1 bei Treffer
  check-links.mjs           prüft interne href/src in dist/ auf Existenz
tests/
  data.test.mjs             validiert JSON-Daten gegen Schemas (node --test)
```

## Task 1: Projekt-Grundgerüst

**Files:** `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `README.md`

- [ ] `npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git --skip-houston` (falls der Ordner nicht leer ist: in einen temporären Ordner erzeugen und die Dateien übernehmen)
- [ ] `npm install` und `npm install @astrojs/sitemap sharp zod`
- [ ] i18n in `astro.config.mjs`: `defaultLocale: 'de'`, `locales: ['de','en']`, `routing.prefixDefaultLocale: false`; `site: 'https://www.anthonybanhmi.com'` (bis Hauptdomain geklärt ist)
- [ ] Prüfen: `npm run build` → Exit 0
- [ ] Commit `chore: Astro-Grundgerüst`

## Task 2: Datenschemas und Daten (TDD)

**Files:** `src/data/schema.ts`, `src/data/*.json`, `tests/data.test.mjs`

- [ ] Test schreiben: jede JSON-Datei parst gegen ihr Schema; jede Menü-Kategorie hat DE- und EN-Namen; jeder Preis ist `null` oder Zahl > 0
- [ ] `npm test` → FAIL (Dateien fehlen)
- [ ] Schemas und Daten anlegen: 5 Kategorien laut Entwurf; Bánh mì Tofu, Schwein, Ei, Hähnchen; alle Preise `null`; ein Standort mit `RÜCKFRAGE`-Feldern
- [ ] `npm test` → PASS
- [ ] Commit `feat: Datenmodell Speisekarte, Standorte, Site`

## Task 3: Design-Tokens und Basis-Layout

**Files:** `DESIGN.md` (aus map-design), `src/styles/tokens.css`, `src/styles/global.css`, `src/layouts/Base.astro`, `src/components/{Header,Footer,LangSwitch,Logo,Seo}.astro`, `public/fonts/*`

- [ ] Tokens aus `DESIGN.md` übertragen (Farben, Typo-Skala, Abstände, Radius, Schatten)
- [ ] Schriften laden und unter `public/fonts/` ablegen, `@font-face` mit `font-display: swap`
- [ ] Base-Layout: `lang`, Skip-Link, `<header>`, `<main id="main">`, `<footer>`; Navigation mit Disclosure-Untermenüs (`<details>`), mobil als Popover
- [ ] Prüfen: `npm run build`, Startseite im Browser, Tastaturbedienung der Navigation
- [ ] Commit `feat: Design-Tokens und Layout`

## Task 4: Startseite DE/EN

**Files:** `src/pages/index.astro`, `src/pages/en/index.astro`, `src/components/{Hero,CategoryTile,FeatureCard,FranchiseBand,ValueIcon}.astro`

- [ ] Abschnitte laut `docs/design/entwurf-startseite.jpg`
- [ ] Bilder über `<Image>`/`<Picture>` mit `widths`, Hero mit `loading="eager"` und `fetchpriority="high"`
- [ ] Prüfen: Build, Sichtprüfung 375 px und 1280 px
- [ ] Commit `feat: Startseite`

## Task 5: Unterseiten DE/EN

**Files:** `src/pages/{speisekarte,standorte,ueber-uns,franchise,karriere,kontakt,impressum,datenschutz}.astro`, Entsprechungen unter `src/pages/en/`, `src/pages/404.astro`, `src/components/{MenuItem,LocationCard,Placeholder}.astro`

- [ ] Speisekarte aus `menu.json`; Preis `null` → `<Placeholder>`
- [ ] Standorte aus `locations.json`; Kartenlink extern, kein Embed
- [ ] Impressum/Datenschutz als Gerüst mit Platzhaltern (keine erfundenen Angaben)
- [ ] LangSwitch verlinkt jeweils die Gegenseite
- [ ] Prüfen: Build, `node scripts/check-links.mjs` → 0 Fehler
- [ ] Commit `feat: Unterseiten`

## Task 6: Prüfskripte (TDD)

**Files:** `scripts/check-launch.mjs`, `scripts/check-links.mjs`, `tests/scripts.test.mjs`

- [ ] Tests: `check-launch` meldet Treffer in einem Temp-Ordner mit „RÜCKFRAGE“ und Exit 1, ohne Treffer Exit 0; `check-links` meldet fehlendes Ziel
- [ ] `npm test` → FAIL, dann Skripte schreiben, `npm test` → PASS
- [ ] Commit `test: Launch- und Linkprüfung`

## Task 7: SEO

**Files:** `src/components/{Seo,JsonLd}.astro`, `public/robots.txt`, `astro.config.mjs`

- [ ] Title/Description je Seite und Sprache, Canonical, `hreflang` (de, en, x-default), Open Graph
- [ ] JSON-LD: `Restaurant` (Startseite/Standorte), `Menu` (Speisekarte), `BreadcrumbList`; nur belegte Felder
- [ ] Sitemap mit i18n
- [ ] Prüfen: Build, JSON-LD parst (`node -e` über `dist/`)
- [ ] Commit `feat: SEO und strukturierte Daten`

## Task 8: Security-Header

**Files:** `public/.htaccess`, `public/_headers`

- [ ] CSP `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
- [ ] Prüfen: `npm run preview`, Seiten laden ohne CSP-Fehler in der Konsole
- [ ] Commit `feat: Security-Header`

## Task 9: Review und Verifikation

- [ ] design-review: Kontraste, Fokus, Landmarks, axe im Browser
- [ ] halluzination-check auf alle Texte
- [ ] hawkscan gegen `npm run preview`
- [ ] Abschluss: `npm test && npm run check && npm run build && node scripts/check-links.mjs`; `npm run check:launch` muss bis zur Lieferung der Inhalte rot sein
