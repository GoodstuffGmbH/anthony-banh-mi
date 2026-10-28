import { z } from 'zod';

// Texte immer zweisprachig. Fehlt ein Inhalt, steht der Wert auf null und die
// Seite zeigt einen RÜCKFRAGE-Platzhalter. Nichts wird erfunden.
const Localized = z.object({ de: z.string().min(1), en: z.string().min(1) });
const Slug = z.string().regex(/^[a-z0-9-]+$/);

export const MenuItem = z.object({
  id: Slug,
  name: Localized,
  description: Localized.nullable(),
  price: z.number().positive().nullable(),
  image: Slug.nullable(),
  tags: z.array(z.enum(['vegan', 'vegetarisch', 'scharf'])),
});

export const MenuCategory = z.object({
  id: Slug,
  name: Localized,
  image: Slug.nullable(),
  items: z.array(MenuItem),
});

export const Menu = z.object({
  currency: z.literal('EUR'),
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
  hours: z.array(z.object({ days: Localized, time: z.string() })).nullable(),
  mapUrl: z.url().nullable(),
});

export const Locations = z.array(Location);

export const Site = z.object({
  name: z.string(),
  tagline: z.string(),
  url: z.url(),
  indexable: z.boolean(),
  email: z.email().nullable(),
  phone: z.string().nullable(),
  social: z.array(z.object({ label: z.string(), url: z.url() })),
  operator: z.object({
    company: z.string().nullable(),
    representative: z.string().nullable(),
    street: z.string().nullable(),
    postalCode: z.string().nullable(),
    city: z.string().nullable(),
    register: z.string().nullable(),
    vatId: z.string().nullable(),
  }),
});

export type MenuT = z.infer<typeof Menu>;
export type MenuCategoryT = z.infer<typeof MenuCategory>;
export type MenuItemT = z.infer<typeof MenuItem>;
export type LocationT = z.infer<typeof Location>;
export type SiteT = z.infer<typeof Site>;
