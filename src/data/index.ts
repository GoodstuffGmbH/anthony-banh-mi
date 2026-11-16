import type { ImageMetadata } from 'astro';
import { Locations, Menu, Site } from './schema';
import menuJson from './menu.json';
import locationsJson from './locations.json';
import siteJson from './site.json';

// Ungültige Daten brechen den Build ab.
export const menu = Menu.parse(menuJson);
export const locations = Locations.parse(locationsJson);
export const site = Site.parse(siteJson);

// Kategorien ohne Gerichte bleiben ausgeblendet, bis die Karte sie füllt.
export const visibleCategories = menu.categories.filter((c) => c.items.length || c.groups.length);

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/img/*.{jpg,png}', { eager: true });
const images = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!.replace(/\.\w+$/, ''), mod.default]),
);

export function image(key: string): ImageMetadata {
  const img = images[key];
  if (!img) throw new Error(`Bild "${key}" fehlt in src/assets/img/`);
  return img;
}
