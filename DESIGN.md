# Anthony Bánh Mì Design Language

Quelle: `docs/design/entwurf-startseite.jpg`, `docs/design/entwurf-coming-soon.jpg` (Screenshots, Farben per Pixel-Sampling, keine Figma-Variablen). Stand 28.10.2026.

## Visual Theme

**Warm, ruhig, hochwertig – vietnamesisches Sandwich House.**
Cremefarbener Grund, tiefes Waldgrün als Bühne für Food-Fotografie, Gold als feine Linie und Akzent. Klassische Serifen-Versalien wirken wie ein Schild über dem Laden; gesperrte Sans-Versalien für Navigation und Labels. Pflanzen, Holz und warmes Licht in den Bildern.

## Color Palette

### Primitives

| Token | Wert | Herkunft |
|---|---|---|
| `green-950` | `#0b2016` | Hero, Karriere-Kachel, Franchise-Band |
| `green-900` | `#12301f` | Logo-Schrift, Überschriften auf Creme |
| `green-700` | `#2d4a38` | Hover auf Grün |
| `gold-400` | `#d5b47e` | Button-Fläche Hover |
| `gold-500` | `#c9a46a` | Button-Fläche, Linien, Ornamente |
| `gold-700` | `#8a5f2a` | Gold als Text auf Creme |
| `cream-50` | `#fbf6ee` | Seitenhintergrund |
| `cream-100` | `#f3ece2` | Kachel-Label, Footer |
| `cream-200` | `#e7dbcb` | Karten auf Creme, Trennlinien |
| `wood-800` | `#3c281b` | Holz-Band (Coming Soon), Footer-Akzent |
| `ink-900` | `#1d1b16` | Fließtext |
| `ink-600` | `#5c574d` | Sekundärtext |

### Semantic

| Token | Light (einziges Theme) | Rolle |
|---|---|---|
| `--color-bg` | `cream-50` | Seite |
| `--color-surface` | `cream-100` | Karten, Footer |
| `--color-surface-strong` | `cream-200` | Karten-Hover, Linien |
| `--color-inverse` | `green-950` | dunkle Abschnitte |
| `--color-text` | `ink-900` | Fließtext |
| `--color-text-muted` | `ink-600` | Hinweise |
| `--color-heading` | `green-900` | Überschriften auf Creme |
| `--color-on-inverse` | `cream-50` | Text auf Grün |
| `--color-accent` | `gold-500` | Buttons, Linien, Icons auf Grün |
| `--color-accent-text` | `gold-700` | Gold-Text und Links auf Creme |
| `--color-accent-on-inverse` | `gold-500` | Labels auf Grün |
| `--color-focus` | `gold-700` / auf Grün `gold-400` | Fokusring |

Kontraste (WCAG): Text 15,99:1; Überschrift 13,29:1; Gold-Text auf Creme 5,20:1; Gold auf Grün 7,30:1; Grün auf Gold-Button 7,30:1. **Gold `#c9a46a` auf Creme: 2,17:1 → nie als Text.**

Dark Mode: bewusst keiner. Die Marke lebt vom Wechsel Creme/Grün; dunkle Abschnitte sind Teil des Layouts.

## Typography

**Families:**
- Display: Cormorant Garamond (Variable, OFL, selbst gehostet über `@fontsource-variable/cormorant-garamond`)
- Text/UI: Jost (Variable, OFL, `@fontsource-variable/jost`)

Hinweis: Die Logo-Schrift ist ein Bild aus dem Entwurf, die Original-Schrift ist unbekannt (RÜCKFRAGE: Logo als SVG).

**Scale ratio:** ~1,25 (Major Third), Basis 16 px, fluid über `clamp()`.

| Token | Größe | rem | Rolle | Zeilenhöhe | Font / Stil |
|---|---|---|---|---|---|
| `--fs-display` | 40–64 px | 2.5–4 | Hero-H1 | 1.05 | Cormorant 600, Versalien |
| `--fs-h1` | 36–48 px | 2.25–3 | Seiten-H1 | 1.1 | Cormorant 600, Versalien |
| `--fs-h2` | 28–36 px | 1.75–2.25 | Abschnitt | 1.15 | Cormorant 600, Versalien |
| `--fs-h3` | 20–24 px | 1.25–1.5 | Karten-Titel | 1.25 | Cormorant 600, Versalien |
| `--fs-body` | 17 px | 1.0625 | Fließtext | 1.6 | Jost 400 |
| `--fs-small` | 14 px | 0.875 | Hinweise | 1.5 | Jost 400 |
| `--fs-label` | 13 px | 0.8125 | Navigation, Labels, Buttons | 1.2 | Jost 500, Versalien, `letter-spacing: 0.14em` |
| `--fs-eyebrow` | 13 px | 0.8125 | Überzeile über H1 | 1.2 | Jost 500, Versalien, `0.2em`, Gold |

## Components

| Komponente | Ebene | Zweck | Varianten |
|---|---|---|---|
| Button | Primitive | Hauptaktion | `solid` (Gold-Fläche, grüne Schrift), `outline` (Goldrahmen auf Grün), `link` (Label + Pfeil →) |
| Eyebrow | Primitive | Überzeile | auf Creme / auf Grün |
| Ornament | Primitive | Goldlinie mit Raute | kurz / breit |
| Icon | Primitive | Linien-Icons 1,5 px | Blatt, Herz, Stern, Globus, Pin, Personen |
| Logo | Primitive | Porträt + Wortmarke | horizontal (Header), gestapelt (Coming Soon, Über uns) |
| Header | Component | Logo, Navigation mit Untermenüs, DE/EN | Desktop, Mobil (Menü-Popover) |
| CategoryTile | Component | Bild + Label + Pfeil | 5er-Reihe |
| FeatureCard | Component | Großkachel mit Bild/Icon, Titel, Text, Link | `photo` (Text auf Bild), `plain` (Creme, Porträt), `inverse` (Grün) |
| FranchiseBand | Pattern | Grünes Band mit Text links, Bild rechts | – |
| ValueRow | Pattern | 4 Werte mit Icon und Label | – |
| MenuItem | Component | Gericht, Beschreibung, Preis, Kennzeichnung | mit/ohne Bild, vegan-Badge |
| LocationCard | Component | Adresse, Zeiten, Kartenlink | – |
| Footer | Component | Kontakt, Rechtliches, Sprache | – |
| Placeholder | Primitive | sichtbarer `[RÜCKFRAGE: …]`-Hinweis | inline / Block |

Fehlende Zustände im Entwurf (definiert in Code): Hover, Fokus, aktiv (aktuelle Seite), geöffnetes Untermenü, mobiles Menü.

## Layout

**Grid:** Inhaltsbreite max. 1200 px, Seitenrand `clamp(16px, 4vw, 40px)`. Startseite: 5 Kacheln → 3 Großkacheln → Vollbreite-Band → 4 Werte.
**Base unit:** 8 px.
**Spacing scale:** `2xs`=4, `xs`=8, `sm`=16, `md`=24, `lg`=32, `xl`=48, `2xl`=72, `3xl`=96 px.
**Radius:** 0 (Kacheln und Buttons sind eckig). Einzige Ausnahme: Porträt-Kreis.

## Depth

| Ebene | Wert | Einsatz |
|---|---|---|
| 0 | keine | Standard, Flächen trennen über Farbe |
| 1 | `0 1px 2px rgb(11 32 22 / .08)` | Kachel-Label |
| 2 | `0 12px 32px rgb(11 32 22 / .18)` | Mobilmenü, Kachel-Hover |

Bilder unter Text bekommen einen Verlauf `linear-gradient(to top, rgb(11 32 22 / .85), transparent 60%)`.

## Do's and Don'ts

### Do
- Überschriften in Cormorant-Versalien, Labels in gesperrten Jost-Versalien.
- Gold für Linien, Buttons und Akzente auf Grün; auf Creme nur `gold-700` als Text.
- Food-Fotos groß und warm, immer mit echtem Alt-Text.
- Abschnitte über Farbflächen trennen (Creme ↔ Grün), nicht über Schatten.
- Pfeil „→“ als einheitliches Weiter-Signal.

### Don't
- Kein `#c9a46a` als Textfarbe auf Creme.
- Keine runden Ecken an Kacheln und Buttons.
- Keine dritte Schriftfamilie, keine Kursiv-Fließtexte.
- Keine Rohwerte im Komponenten-CSS, nur Tokens.
- Keine eingebetteten Fremddienste (Karten, Fonts, Videos) ohne Einwilligung.

## Responsive

Aus dem Entwurf nicht ablesbar, festgelegt:
- `< 720 px`: Navigation als Menü-Popover; Hero gestapelt (Bild unter Text); Kategorie-Kacheln horizontal scrollbar mit Scroll-Snap; Großkacheln untereinander; Werte 2×2.
- `720–1024 px`: Kacheln 3+2; Großkacheln 1+2.
- `> 1024 px`: wie Entwurf.

## Agent Prompt Guide

- Nur semantische CSS-Variablen aus `src/styles/tokens.css` verwenden, nie Hex-Werte in Komponenten.
- 8-px-Raster; Abstände nur aus der Spacing-Skala.
- Eine H1 pro Seite; Hierarchie H1 → H2 → H3 ohne Sprung.
- Gold ist Akzent, nie Fließtext auf Creme.
- Keine Inhalte erfinden: fehlende Preise, Adressen, Zeiten als `<Placeholder>` mit `RÜCKFRAGE`.
