import { locations, menu, site, visibleCategories } from './index';
import type { MenuItemT } from './schema';
import { routes, type Lang, type RouteKey } from '../i18n/routes';

// Schema.org nur mit belegten Feldern. Was in den Daten null ist, fehlt hier.
const abs = (path: string) => new URL(path, site.url).href;

export function restaurant(lang: Lang, imageUrl?: string) {
  const known = locations.filter((l) => l.street && l.city);
  return {
    '@type': 'Restaurant',
    '@id': abs('/#restaurant'),
    name: site.name,
    description: site.tagline,
    url: abs(routes.home[lang]),
    servesCuisine: 'Vietnamese',
    hasMenu: abs(routes.menu[lang]),
    ...(imageUrl && { image: abs(imageUrl) }),
    ...(site.email && { email: site.email }),
    ...(site.phone && { telephone: site.phone }),
    ...(site.social.length && { sameAs: site.social.map((s) => s.url) }),
    ...(known.length && {
      address: known.map((l) => ({
        '@type': 'PostalAddress',
        streetAddress: l.street,
        postalCode: l.postalCode,
        addressLocality: l.city,
        addressCountry: 'DE',
      })),
    }),
  };
}

const menuItem = (lang: Lang) => (i: MenuItemT) => ({
  '@type': 'MenuItem',
  name: i.name[lang],
  ...(i.description && { description: i.description[lang] }),
  ...(i.prices && {
    offers: i.prices.map((p) => ({
      '@type': 'Offer',
      price: p.amount.toFixed(2),
      priceCurrency: menu.currency,
      ...(p.volume && { eligibleQuantity: { '@type': 'QuantitativeValue', value: p.volume, unitCode: 'LTR' } }),
    })),
  }),
  ...(i.tags.includes('vegan') && { suitableForDiet: 'https://schema.org/VeganDiet' }),
  ...(i.tags.includes('vegetarisch') && { suitableForDiet: 'https://schema.org/VegetarianDiet' }),
});

export function menuSchema(lang: Lang) {
  return {
    '@type': 'Menu',
    name: `${site.name} – ${lang === 'de' ? 'Speisekarte' : 'Menu'}`,
    url: abs(routes.menu[lang]),
    inLanguage: lang,
    hasMenuSection: visibleCategories.map((c) => ({
      '@type': 'MenuSection',
      name: c.name[lang],
      ...(c.items.length && { hasMenuItem: c.items.map(menuItem(lang)) }),
      ...(c.groups.length && {
        hasMenuSection: c.groups.map((g) => ({
          '@type': 'MenuSection',
          name: g.name[lang],
          hasMenuItem: g.items.map(menuItem(lang)),
        })),
      }),
    })),
  };
}

export function breadcrumb(lang: Lang, key: RouteKey, name: string) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: site.name, item: abs(routes.home[lang]) },
      { '@type': 'ListItem', position: 2, name, item: abs(routes[key][lang]) },
    ],
  };
}
