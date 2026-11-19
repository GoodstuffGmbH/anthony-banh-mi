import { z } from 'zod';

// Texte immer zweisprachig. Fehlt ein Inhalt, steht der Wert auf null und die
// Seite zeigt einen RÜCKFRAGE-Platzhalter. Nichts wird erfunden.
const Localized = z.object({ de: z.string().min(1), en: z.string().min(1) });
const Slug = z.string().regex(/^[a-z0-9-]+$/);
// Externe Links nur https: kein javascript:/data: in href.
const HttpsUrl = z.url({ protocol: /^https$/ });

// Maschinenlesbare Öffnungszeiten für schema.org (openingHoursSpecification).
const Weekday = z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
const ClockTime = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);
const HoursSpec = z.object({ dayOfWeek: z.array(Weekday).min(1), opens: ClockTime, closes: ClockTime });

// Preis je Größe. volume in Litern, nur bei Getränken mit Größenangabe.
const Price = z.object({ amount: z.number().positive(), volume: z.number().positive().optional() });

export const MenuItem = z.object({
  id: Slug,
  name: Localized,
  // null = keine Beschreibung (z. B. Espresso)
  description: Localized.nullable(),
  // null = Preis noch nicht geliefert
  prices: z.array(Price).min(1).nullable(),
  image: Slug.nullable(),
  // null = keine Angabe je Gericht (Hinweis menu.allergenInfo gilt), [] = keine kennzeichnungspflichtigen
  allergens: z.array(z.string().min(1)).nullable(),
  tags: z.array(z.enum(['klassisch', 'vegan', 'vegetarisch', 'suess', 'scharf'])),
});

// Aufpreise wie Hafermilch, gelten für die ganze Gruppe.
const Extra = z.object({ name: Localized, amount: z.number().positive() });

export const MenuGroup = z.object({
  id: Slug,
  name: Localized,
  note: Localized.nullable(),
  items: z.array(MenuItem).min(1),
  extras: z.array(Extra),
});

export const MenuCategory = z.object({
  id: Slug,
  name: Localized,
  image: Slug.nullable(),
  note: Localized.nullable(),
  items: z.array(MenuItem),
  groups: z.array(MenuGroup),
});

export const Menu = z.object({
  currency: z.literal('EUR'),
  // null = Hinweis zu Allergenen fehlt noch
  allergenInfo: Localized.nullable(),
  categories: z.array(MenuCategory).min(1),
});

export const Location = z.object({
  id: Slug,
  name: z.string().nullable(),
  street: z.string().nullable(),
  postalCode: z.string().nullable(),
  city: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.email().nullable(),
  hours: z.array(z.object({ days: Localized, time: z.string(), spec: HoursSpec.optional() })).nullable(),
  mapUrl: HttpsUrl.nullable(),
});

export const Locations = z.array(Location);

export const Site = z.object({
  name: z.string(),
  tagline: z.string(),
  url: z.url(),
  indexable: z.boolean(),
  email: z.email().nullable(),
  phone: z.string().nullable(),
  social: z.array(z.object({ label: z.string(), url: HttpsUrl })),
  operator: z.object({
    company: z.string().nullable(),
    // Geschäftsführung (vertretungsberechtigt)
    representative: z.string().nullable(),
    // Prokura, optional im Impressum
    procuration: z.string().nullable(),
    street: z.string().nullable(),
    postalCode: z.string().nullable(),
    city: z.string().nullable(),
    register: z.string().nullable(),
    vatId: z.string().nullable(),
  }),
});

export type MenuT = z.infer<typeof Menu>;
export type MenuCategoryT = z.infer<typeof MenuCategory>;
export type MenuGroupT = z.infer<typeof MenuGroup>;
export type MenuItemT = z.infer<typeof MenuItem>;
export type LocationT = z.infer<typeof Location>;
export type SiteT = z.infer<typeof Site>;
