import type { ConsentKey } from './consent';

// Dienste von Google, die nur mit Einwilligung laufen. Ohne Konfiguration ist ein Dienst aus (null):
// dann gibt es weder Platzhalter noch Einstellungen noch CSP-Ausnahme.
export interface Services {
  // Einbettungs-Adresse aus „Teilen → Karte einbetten“ in Google Maps (kein API-Schlüssel nötig).
  maps: { embedUrl: string } | null;
}

export interface ServiceInput {
  mapEmbedUrl?: string | null;
}

// Einbettungs-Adresse aus Google Maps („Teilen → Karte einbetten“): https://www.google.com/maps/embed?pb=…
export function isMapsEmbedUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' && u.hostname === 'www.google.com' && u.pathname === '/maps/embed' && u.searchParams.has('pb');
  } catch {
    return false;
  }
}

// Ungültige Werte brechen den Build ab, damit ein Tippfehler nicht still den Dienst abschaltet.
export function resolveServices(input: ServiceInput): Services {
  const url = typeof input.mapEmbedUrl === 'string' && input.mapEmbedUrl.trim() ? input.mapEmbedUrl.trim() : null;
  if (url && !isMapsEmbedUrl(url)) throw new Error('googleMapEmbedUrl: erwartet https://www.google.com/maps/embed?pb=…');
  return { maps: url ? { embedUrl: url } : null };
}

export const enabledKeys = (s: Services): ConsentKey[] => (['maps'] as const).filter((k) => s[k] !== null);
