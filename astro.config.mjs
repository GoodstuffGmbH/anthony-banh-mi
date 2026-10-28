// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Hauptdomain noch offen (RÜCKFRAGE, siehe docs/specs). Bis dahin .com.
export default defineConfig({
  site: 'https://www.anthonybanhmi.com',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'de', locales: { de: 'de-DE', en: 'en' } },
      filter: (page) => !page.endsWith('/404/'),
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
