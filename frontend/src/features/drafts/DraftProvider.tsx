import { useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { useAuth } from "@/features/auth/auth";
import { draftRevision, draftStorageStatus, draftTab, loadWorkspaceDrafts, subscribeDrafts } from "@/lib/workspaceDrafts";
import { queryClient } from "@/lib/queryClient";
import { DraftContext } from "./context";

function OwnerDraftProvider({ owner, children }: { owner: string; children: ReactNode }) {
  const [tab] = useState(draftTab);
  const [ready, setReady] = useState(false);
  useSyncExternalStore(subscribeDrafts, draftRevision);
  const status = draftStorageStatus();
  const context = useMemo(() => ({ owner, tab, ready }), [owner, tab, ready]);
  useEffect(() => {
    let active = true;
    void loadWorkspaceDrafts(owner, tab).then(() => { if (active) setReady(true); });
    return () => { active = false; };
  }, [owner, tab]);
  useEffect(() => {
    const protect = (event: BeforeUnloadEvent) => {
      const current = draftStorageStatus();
      if (current.pending || current.failure || queryClient.isMutating() > 0) { event.preventDefault(); event.returnValue = ""; }
    };
    window.addEventListener("beforeunload", protect);
    return () => window.removeEventListener("beforeunload", protect);
  }, []);
  if (!ready) return <div role="status" className="grid min-h-screen place-items-center text-sm text-ink-soft">Recuperando tu espacio de trabajo…</div>;
  return <DraftContext.Provider value={context}>
    {status.failure && <div role="alert" className="fixed inset-x-0 top-0 z-[100] border-b border-amber-300 bg-amber-50 px-4 py-2 text-center text-sm text-amber-950">El navegador no pudo conservar el borrador. Guarda tus cambios antes de recargar o cerrar esta pestaña.</div>}
    {children}
  </DraftContext.Provider>;
}

export function DraftProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const owner = user ? `user:${user.id_usuario}` : "public";
  return <OwnerDraftProvider key={owner} owner={owner}>{children}</OwnerDraftProvider>;
}
