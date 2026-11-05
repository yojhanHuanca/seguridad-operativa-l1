import { useCallback, useState, useSyncExternalStore, type Dispatch, type SetStateAction } from "react";
import { useLocation } from "react-router-dom";
import { useDraftOwner } from "./context";
import { clearWorkspaceDrafts, readWorkspaceDraft, subscribeDrafts, workspaceDraftId, writeWorkspaceDraft } from "@/lib/workspaceDrafts";

/** Igual que useState, con recuperación local por cuenta, pestaña y ruta. */
export function useDraftState<T>(key: string, initial: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
  const { owner, tab } = useDraftOwner();
  const { pathname } = useLocation();
  const id = workspaceDraftId(owner, tab, pathname, key);
  const [defaults, setDefaults] = useState(() => ({ id, value: typeof initial === "function" ? (initial as () => T)() : initial }));
  let fallback = defaults.value;
  if (defaults.id !== id) {
    fallback = typeof initial === "function" ? (initial as () => T)() : initial;
    setDefaults({ id, value: fallback });
  }
  const saved = useSyncExternalStore(subscribeDrafts, () => readWorkspaceDraft(id));
  const value = saved === undefined ? fallback : saved as T;
  const setValue = useCallback<Dispatch<SetStateAction<T>>>((next) => {
    const current = readWorkspaceDraft(id);
    const previous = current === undefined ? fallback : current as T;
    const result = typeof next === "function" ? (next as (value: T) => T)(previous) : next;
    if (Object.is(result, previous)) return;
    writeWorkspaceDraft(owner, tab, pathname, key, result);
  }, [owner, tab, pathname, key, id, fallback]);
  return [value, setValue];
}

export function useClearDraft(prefix: string) {
  const { owner } = useDraftOwner();
  const { pathname } = useLocation();
  return useCallback(() => clearWorkspaceDrafts(owner, pathname, prefix), [owner, pathname, prefix]);
}

export function useDraftExists(key: string) {
  const { owner, tab } = useDraftOwner();
  const { pathname } = useLocation();
  const id = workspaceDraftId(owner, tab, pathname, key);
  return useSyncExternalStore(subscribeDrafts, () => readWorkspaceDraft(id) !== undefined);
}
