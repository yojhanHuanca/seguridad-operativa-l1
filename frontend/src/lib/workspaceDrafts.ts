// Borradores de esta pestaña y cuenta. IndexedDB conserva también File/Blob y
// libros grandes; no depende del límite de unos pocos MB de localStorage.
const DB_NAME = "sms-l1-workspace-v1";
const STORE = "drafts";
const TTL = 24 * 60 * 60 * 1000;
const TAB_KEY = "sms-l1-workspace-tab";
type DraftRecord = { id: string; owner: string; tab: string; path: string; updatedAt: number; value: unknown };
const cache = new Map<string, DraftRecord>();
const listeners = new Set<() => void>();
let dbPromise: Promise<IDBDatabase> | undefined;
let pending = 0;
let failure = false;
let revision = 0;
let ephemeralTab: string | undefined;
const revokedOwners = new Set<string>();
let activeOwner = "public";

export function draftTab() {
  try {
    let id = sessionStorage.getItem(TAB_KEY);
    if (!id) { id = crypto.randomUUID(); sessionStorage.setItem(TAB_KEY, id); }
    return id;
  } catch { failure = true; return ephemeralTab ??= crypto.randomUUID(); }
}

function database() {
  return dbPromise ??= new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error("Almacenamiento de borradores bloqueado"));
  });
}

function emit() { revision++; listeners.forEach(listener => listener()); }
export const subscribeDrafts = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
export const draftRevision = () => revision;
export const draftStorageStatus = () => ({ pending, failure });

// Las contraseñas y credenciales temporales nunca se conservan en borradores.
export function safeDraft(value: unknown): unknown {
  if (value instanceof Blob || value instanceof Date || value instanceof Set || value instanceof Map) return value;
  if (Array.isArray(value)) return value.map(safeDraft);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value)
    .filter(([key]) => !/token|credential/i.test(key))
    .map(([key, item]) => [key, /password|contras[eñn]|^pw(?:Actual|Nueva|Confirmar)$/i.test(key) ? "" : safeDraft(item)]));
  return value;
}

async function persist(action: (store: IDBObjectStore) => void) {
  pending++; emit();
  try {
    const db = await database();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      action(tx.objectStore(STORE));
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
    return true;
  } catch { failure = true; return false; }
  finally { pending--; emit(); }
}

export async function loadWorkspaceDrafts(owner: string, tab: string) {
  activeOwner = owner;
  revokedOwners.delete(owner);
  try {
    const db = await database();
    const records = await new Promise<DraftRecord[]>((resolve, reject) => {
      const req = db.transaction(STORE).objectStore(STORE).getAll();
      req.onsuccess = () => resolve(req.result as DraftRecord[]);
      req.onerror = () => reject(req.error);
    });
    const expired = records.filter(record => Date.now() - record.updatedAt > TTL);
    for (const record of expired) cache.delete(record.id);
    for (const record of records) {
      if (record.owner === owner && record.tab === tab && Date.now() - record.updatedAt <= TTL) cache.set(record.id, record);
    }
    if (expired.length) void persist(store => { for (const record of expired) store.delete(record.id); });
  } catch { failure = true; }
  emit();
}

export const workspaceDraftId = (owner: string, tab: string, path: string, key: string) => JSON.stringify([owner, tab, path, key]);
export const readWorkspaceDraft = (id: string) => cache.get(id)?.value;
export function writeWorkspaceDraft(owner: string, tab: string, path: string, key: string, value: unknown) {
  if (revokedOwners.has(owner)) return Promise.resolve(false);
  const record: DraftRecord = { id: workspaceDraftId(owner, tab, path, key), owner, tab, path, updatedAt: Date.now(), value };
  cache.set(record.id, record);
  const stored = { ...record, value: safeDraft(value) };
  const saved = persist(store => { store.put(stored); });
  emit();
  return saved;
}

export function clearWorkspaceDrafts(owner?: string, path?: string, prefix?: string) {
  const tab = draftTab();
  const removed = [...cache.values()].filter(record => record.tab === tab && (!owner || record.owner === owner) && (!path || record.path === path) && (!prefix || (JSON.parse(record.id)[3] as string).startsWith(prefix)));
  if (!path && !prefix) for (const record of removed) revokedOwners.add(record.owner);
  for (const record of removed) cache.delete(record.id);
  // Al salir también se eliminan los borradores de esta pestaña que todavía
  // no se cargaron en memoria (por ejemplo, después de cambiar de cuenta).
  if (!path && !prefix) void persist(store => {
    const cursor = store.openCursor();
    cursor.onsuccess = () => {
      const item = cursor.result;
      if (!item) return;
      const record = item.value as DraftRecord;
      if (record.tab === tab && (!owner || record.owner === owner)) item.delete();
      item.continue();
    };
  });
  else if (removed.length) void persist(store => { for (const record of removed) store.delete(record.id); });
  emit();
}

export function clearPageDraft(prefix: string) {
  clearWorkspaceDrafts(activeOwner, window.location.pathname, prefix);
}
