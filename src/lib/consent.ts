// Einwilligungs-Logik ohne DOM (testbar). Die Entscheidung liegt nur im localStorage des Browsers,
// nicht in einem Cookie und nicht auf einem Server.
// Dienste mit Einwilligung. Neuer Dienst = Eintrag hier, Zweck in Datenschutz und UI-Texten ergänzen.
export const CONSENT_KEYS = ['maps'] as const;
export type ConsentKey = (typeof CONSENT_KEYS)[number];

export const CONSENT_STORAGE_KEY = 'anthony-consent';
// Ändert sich Zweck oder Anbieter eines Dienstes, Version erhöhen: alle werden neu gefragt.
export const CONSENT_VERSION = 1;
// Nach 6 Monaten wird neu gefragt.
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

export interface ConsentRecord {
  v: number;
  ts: number;
  // Dienste, zu denen der Nutzer entschieden hat (auch „abgelehnt“).
  asked: ConsentKey[];
  // Davon erlaubt.
  granted: ConsentKey[];
}

const isKey = (x: unknown): x is ConsentKey => typeof x === 'string' && (CONSENT_KEYS as readonly string[]).includes(x);

export function makeRecord(now: number, asked: readonly ConsentKey[], granted: readonly ConsentKey[]): ConsentRecord {
  const a = [...new Set(asked)];
  // Erlaubt werden kann nur, was auch gefragt wurde.
  const g = [...new Set(granted)].filter((k) => a.includes(k));
  return { v: CONSENT_VERSION, ts: now, asked: a, granted: g };
}

// Liest den gespeicherten Wert. Alles Ungültige, Abgelaufene oder Zukünftige gilt als „keine Entscheidung“.
export function readRecord(raw: string | null | undefined, now: number): ConsentRecord | null {
  if (!raw) return null;
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof data !== 'object' || data === null) return null;
  const d = data as Record<string, unknown>;
  if (d.v !== CONSENT_VERSION) return null;
  if (typeof d.ts !== 'number' || !Number.isFinite(d.ts)) return null;
  if (d.ts > now || now - d.ts > CONSENT_MAX_AGE_MS) return null;
  if (!Array.isArray(d.asked) || !Array.isArray(d.granted)) return null;
  const asked = d.asked.filter(isKey);
  const granted = d.granted.filter(isKey);
  return makeRecord(d.ts, asked, granted);
}

export const isGranted = (record: ConsentRecord | null, key: ConsentKey): boolean => !!record && record.granted.includes(key);

// Aktive Dienste, zu denen es noch keine Entscheidung gibt (dann erscheint der Banner).
export const pending = (record: ConsentRecord | null, enabled: readonly ConsentKey[]): ConsentKey[] =>
  enabled.filter((k) => !record || !record.asked.includes(k));

// Entscheidung zu einzelnen Diensten ändern, alle anderen bleiben, wie sie sind.
export function updateRecord(
  record: ConsentRecord | null,
  now: number,
  changes: Partial<Record<ConsentKey, boolean>>,
): ConsentRecord {
  const asked = new Set<ConsentKey>(record?.asked ?? []);
  const granted = new Set<ConsentKey>(record?.granted ?? []);
  for (const key of CONSENT_KEYS) {
    const value = changes[key];
    if (value === undefined) continue;
    asked.add(key);
    if (value) granted.add(key);
    else granted.delete(key);
  }
  return makeRecord(now, [...asked], [...granted]);
}
