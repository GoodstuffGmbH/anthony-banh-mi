// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { routes } from './src/i18n/routes.ts';
import siteData from './src/data/site.json' with { type: 'json' };

// Domain nur in src/data/site.json pflegen (Hauptdomain: RÜCKFRAGE offen).
const SITE = siteData.url;

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404/'),
      // DE und EN haben unterschiedliche Pfade, daher hreflang aus der Routentabelle.
      serialize(item) {
        const path = new URL(item.url).pathname;
        const route = Object.values(routes).find((r) => r.de === path || r.en === path);
        if (route) {
          item.links = [
            { lang: 'de', url: SITE + route.de },
            { lang: 'en', url: SITE + route.en },
            { lang: 'x-default', url: SITE + route.de },
          ];
        }
        return item;
      },
    }),
  ],
  build: {
    // Kein Inline-CSS/JS, damit die CSP ohne 'unsafe-inline' auskommt.
    inlineStylesheets: 'never',
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
