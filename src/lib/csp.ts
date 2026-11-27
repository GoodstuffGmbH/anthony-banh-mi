import type { Services } from './services';

// Content-Security-Policy als Meta-Tag. Ohne Dienste bleibt sie so streng wie bisher; jeder aktive Dienst
// öffnet nur die Adressen, die er braucht.
const BASE: Record<string, string[]> = {
  'default-src': ["'self'"],
  'img-src': ["'self'", 'data:'],
  'style-src': ["'self'"],
  'script-src': ["'self'"],
  'font-src': ["'self'"],
  'connect-src': ["'self'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
};

export function buildCsp(services: Services): string {
  const policy = Object.fromEntries(Object.entries(BASE).map(([k, v]) => [k, [...v]]));
  const add = (directive: string, ...sources: string[]) => {
    policy[directive] = [...(policy[directive] ?? []), ...sources];
  };

  if (services.maps) add('frame-src', 'https://www.google.com');

  return [...Object.entries(policy).map(([k, v]) => `${k} ${v.join(' ')}`), 'upgrade-insecure-requests'].join('; ');
}
