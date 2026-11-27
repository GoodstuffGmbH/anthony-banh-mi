import { locations } from './index';
import { resolveServices } from '../lib/services';

// Dienste mit Einwilligung, abgeleitet aus den Standortdaten.
export const services = resolveServices({
  mapEmbedUrl: locations.find((l) => l.googleMapEmbedUrl)?.googleMapEmbedUrl,
});
