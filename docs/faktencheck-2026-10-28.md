# Faktencheck Website-Texte (28.10.2026)

Skill `halluzination-check`. Geprüft: `src/i18n/ui.ts`, `src/views/*.astro`.

| Aussage | Ort | Ergebnis | Beleg |
|---|---|---|---|
| „Angaben gemäß § 5 DDG“, Pflichtangaben Name, Anschrift, Rechtsform, Vertretung, E-Mail, Register, USt-IdNr. | Impressum | belegt | [gesetze-im-internet.de/ddg/__5.html](https://www.gesetze-im-internet.de/ddg/__5.html) |
| USt-IdNr. gemäß § 27a UStG | Impressum | belegt (§ 5 Abs. 1 Nr. 6 DDG verweist auf § 27a UStG) | ebd. |
| Erklärung nach § 36 VSBG | Impressum | belegt; Pflicht entfällt bei ≤ 10 Beschäftigten (Abs. 3). Platzhalter bleibt, Entscheidung beim Betreiber | [gesetze-im-internet.de/vsbg/__36.html](https://www.gesetze-im-internet.de/vsbg/__36.html) |
| Rechtsgrundlagen Art. 6 Abs. 1 lit. b und f DSGVO; Rechte Art. 15–21; Beschwerde Art. 77 | Datenschutz | belegt (DSGVO-Systematik) | DSGVO Kapitel II und III, Art. 77 |
| Bánh mì = vietnamesisches Baguette-Sandwich, knuspriges Brot, Füllung, eingelegtes Gemüse, Kräuter | Über uns | belegt | [Wikipedia: Bánh mì](https://en.wikipedia.org/wiki/B%C3%A1nh_m%C3%AC) |
| Keine Cookies, kein Tracking, Schriften vom eigenen Server | Datenschutz | technisch geprüft (Build ohne Drittanfragen, kein Set-Cookie) | Build `dist/` |
| Bánh mì mit Hähnchen, Schwein, Ei, Tofu | Speisekarte, SEO-Beschreibung | **RÜCKFRAGE**: nur aus den gelieferten Fotos abgeleitet, vom Restaurant bestätigen lassen | – |
| Kategorien Kaffee & Getränke, Frühstück, Kuchen & Desserts, Snacks / Lunch, Vegan / Vegetarisch; Werte | Startseite | aus Entwurf übernommen | `docs/design/entwurf-startseite.jpg` |

## Entfernt

- „Catering“ (Kontaktseite): nicht belegt, gestrichen.

## Nicht verwendet

- Kein Verweis auf die EU-OS-Plattform: Die ODR-Verordnung wurde zum 20.07.2025 aufgehoben; vor Launch durch Rechtsprüfung bestätigen.

Impressum und Datenschutzerklärung bleiben Entwürfe und werden vor Veröffentlichung rechtlich geprüft (Launch-Sperre über Platzhalter).
