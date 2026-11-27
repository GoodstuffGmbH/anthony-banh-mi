// Links zu Google aus der Place-ID. Reine Links: kein Skript, kein Embed, keine Cookies.
const enc = encodeURIComponent;

// Eintrag auf Google Maps (dort stehen auch die Rezensionen).
export const placeUrl = (placeId: string, name: string) =>
  `https://www.google.com/maps/search/?api=1&query=${enc(name)}&query_place_id=${enc(placeId)}`;

// Direkt zum Bewertungsformular (Google verlangt dort eine Anmeldung).
export const writeReviewUrl = (placeId: string) => `https://search.google.com/local/writereview?placeid=${enc(placeId)}`;

// Sprache der Karte: Google legt sie im pb-Wert fest („!3m2!1sde!2sde“ = Oberfläche, Region).
export function mapsEmbedForLang(embedUrl: string, lang: 'de' | 'en'): string {
  return embedUrl.replace(/(!5e0!3m2!1s)[a-z]{2}(!2s)/, `$1${lang}$2`);
}

// Nur https-Links auf Google-Adressen dürfen aus Fremdtexten (Rezensionen) als Link übernommen werden.
export function safeGoogleUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  try {
    const u = new URL(value);
    const ok = u.protocol === 'https:' && (u.hostname === 'google.com' || u.hostname.endsWith('.google.com'));
    return ok ? u.href : null;
  } catch {
    return null;
  }
}
