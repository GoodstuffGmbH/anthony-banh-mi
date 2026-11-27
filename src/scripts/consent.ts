import {
  CONSENT_KEYS,
  CONSENT_STORAGE_KEY,
  isGranted,
  readRecord,
  updateRecord,
  type ConsentKey,
  type ConsentRecord,
} from '../lib/consent';

// Eigene, kleine Einwilligungslösung: keine Cookies, kein Drittanbieter, keine Übertragung an einen Server.
// Die Entscheidung liegt nur im localStorage dieses Browsers.
const MAPS_PREFIX = 'https://www.google.com/maps/embed?pb=';

const load = (): ConsentRecord | null => {
  try {
    return readRecord(localStorage.getItem(CONSENT_STORAGE_KEY), Date.now());
  } catch {
    return null;
  }
};

const save = (record: ConsentRecord) => {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Speicher gesperrt: Die Auswahl gilt dann nur, bis die Seite neu geladen wird.
  }
};

let record = load();

function applyMaps() {
  const granted = isGranted(record, 'maps');
  for (const host of document.querySelectorAll<HTMLElement>('[data-embed="maps"]')) {
    const placeholder = host.querySelector<HTMLElement>('[data-embed-placeholder]');
    const live = host.querySelector<HTMLElement>('[data-embed-live]');
    if (!placeholder || !live) continue;
    const src = host.dataset.src ?? '';
    if (granted && src.startsWith(MAPS_PREFIX)) {
      if (!live.firstElementChild) {
        const frame = document.createElement('iframe');
        frame.src = src;
        frame.title = host.dataset.title ?? '';
        frame.loading = 'lazy';
        frame.referrerPolicy = 'no-referrer';
        live.append(frame);
      }
      live.hidden = false;
      placeholder.hidden = true;
    } else {
      // Widerruf: Karte sofort entfernen.
      live.replaceChildren();
      live.hidden = true;
      placeholder.hidden = false;
    }
  }
}

function commit(changes: Partial<Record<ConsentKey, boolean>>) {
  record = updateRecord(record, Date.now(), changes);
  save(record);
  applyMaps();
}

const dialog = document.querySelector<HTMLDialogElement>('#consent-settings');
const boxes = () => [...(dialog?.querySelectorAll<HTMLInputElement>('input[type="checkbox"][name]') ?? [])];

function openSettings() {
  if (!dialog) return;
  for (const box of boxes()) box.checked = isGranted(record, box.name as ConsentKey);
  dialog.showModal();
}

const isKey = (name: string): name is ConsentKey => (CONSENT_KEYS as readonly string[]).includes(name);

function setAll(value: boolean) {
  const changes: Partial<Record<ConsentKey, boolean>> = {};
  for (const box of boxes()) if (isKey(box.name)) changes[box.name] = value;
  commit(changes);
}

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const trigger = target.closest<HTMLElement>('[data-consent-open], [data-consent-action], [data-embed-consent]');
  if (!trigger) return;

  if (trigger.dataset.embedConsent !== undefined) {
    const key = trigger.dataset.embedConsent;
    if (isKey(key)) commit({ [key]: true });
    return;
  }
  if (trigger.hasAttribute('data-consent-open')) {
    openSettings();
    return;
  }
  switch (trigger.dataset.consentAction) {
    case 'save': {
      const changes: Partial<Record<ConsentKey, boolean>> = {};
      for (const box of boxes()) if (isKey(box.name)) changes[box.name] = box.checked;
      commit(changes);
      dialog?.close();
      break;
    }
    case 'accept':
      setAll(true);
      dialog?.close();
      break;
    case 'reject':
      setAll(false);
      dialog?.close();
      break;
    case 'close':
      dialog?.close();
      break;
  }
});

applyMaps();
