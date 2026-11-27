// Links zu Google aus der Place-ID. Reine Links: kein Skript, kein Embed, keine Cookies.
const enc = encodeURIComponent;

// Eintrag auf Google Maps (dort stehen auch die Rezensionen).
export const placeUrl = (placeId: string, name: string) =>
  `https://www.google.com/maps/search/?api=1&query=${enc(name)}&query_place_id=${enc(placeId)}`;

// Direkt zum Bewertungsformular (Google verlangt dort eine Anmeldung).
export const writeReviewUrl = (placeId: string) => `https://search.google.com/local/writereview?placeid=${enc(placeId)}`;
