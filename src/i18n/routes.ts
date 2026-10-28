export const langs = ['de', 'en'] as const;
export type Lang = (typeof langs)[number];

// Eine Zeile pro Seite: DE ohne Präfix, EN unter /en/.
export const routes = {
  home: { de: '/', en: '/en/' },
  menu: { de: '/speisekarte/', en: '/en/menu/' },
  locations: { de: '/standorte/', en: '/en/locations/' },
  about: { de: '/ueber-uns/', en: '/en/about/' },
  franchise: { de: '/franchise/', en: '/en/franchise/' },
  careers: { de: '/karriere/', en: '/en/careers/' },
  contact: { de: '/kontakt/', en: '/en/contact/' },
  imprint: { de: '/impressum/', en: '/en/legal-notice/' },
  privacy: { de: '/datenschutz/', en: '/en/privacy/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

export const href = (key: RouteKey, lang: Lang, hash?: string) => routes[key][lang] + (hash ? `#${hash}` : '');
export const otherLang = (lang: Lang): Lang => (lang === 'de' ? 'en' : 'de');
