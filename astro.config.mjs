// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { routes } from './src/i18n/routes.ts';

const SITE = 'https://www.anthonybanhmi.com';

// Hauptdomain noch offen (RÜCKFRAGE, siehe docs/specs). Bis dahin .com.
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
        item.lastmod = new Date().toISOString();
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
