import { useState } from "react";
import { AlertCircle, ArrowRight, ChevronLeft, ChevronRight, History, Loader2 } from "lucide-react";
import { Button } from "@/design-system/primitives/Button";
import { useAuditoria } from "@/features/auditoria/hooks/useAuditoria";
import { formatDateTime } from "@/lib/format";
import { configChanges, type ConfigChange } from "./presentation";

export function ConfigurationDiff({ changes }: { changes: ConfigChange[] }) {
  return (
    <ul className="divide-y divide-line-soft">
      {changes.map((change) => (
        <li key={change.label} className="py-3 first:pt-0 last:pb-0">
          <p className="mb-2 text-xs font-medium text-ink-soft">{change.label}</p>
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-3 text-sm">
            <div className="min-w-0 rounded-lg bg-surface px-3 py-2">
              <span className="block text-[10px] uppercase tracking-wide text-ink-soft">Antes</span>
              <span className="break-words text-ink-soft">{change.before}</span>
            </div>
            <ArrowRight aria-hidden="true" className="h-4 w-4 text-ink-quiet" />
            <div className="min-w-0 rounded-lg bg-brand-50 px-3 py-2">
              <span className="block text-[10px] uppercase tracking-wide text-brand-800">Después</span>
              <span className="break-words font-medium text-brand-900">{change.after}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ConfigurationHistory() {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, isFetching, refetch } = useAuditoria({ tabla: "configuracion", page, limit: 5 });
  if (isPending) return <p role="status" className="flex items-center gap-2 py-8 text-sm text-ink-soft"><Loader2 className="h-4 w-4 animate-spin" />Cargando historial…</p>;
  if (isError) return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <p className="flex items-center gap-2"><AlertCircle className="h-4 w-4" />No se pudo cargar el historial.</p>
      <Button variant="outline" size="sm" className="mt-3" onClick={() => refetch()}>Reintentar</Button>
    </div>
  );
  if (!data?.items.length) return (
    <div className="rounded-xl border border-dashed border-line-strong px-5 py-12 text-center">
      <History className="mx-auto mb-3 h-7 w-7 text-ink-quiet" />
      <p className="font-medium text-ink">Aún no hay cambios registrados</p>
      <p className="mt-2 text-sm text-ink-soft">Las próximas actualizaciones aparecerán aquí con su fecha y responsable.</p>
    </div>
  );
  return (
    <div aria-busy={isFetching}>
      <div className="space-y-3">
        {data.items.map((item) => {
          const changes = configChanges(item.datos_previos, item.datos_nuevos);
          return (
            <details key={item.id_auditoria} className="group rounded-xl border border-line open:border-brand-200">
              <summary className="cursor-pointer rounded-xl p-4 text-sm focus-visible:outline-2 focus-visible:outline-brand-700">
                <span className="ml-1 font-semibold text-ink">{item.usuarios?.nombre || "Usuario no disponible"}</span>
                <span className="mt-1 block text-xs text-ink-soft">{formatDateTime(item.fecha)}</span>
                <span className="mt-2 block text-sm text-ink-soft">{item.descripcion || "Actualizó la configuración del sistema"}</span>
                <span className="mt-2 block text-xs font-medium text-brand-700">Ver detalle del cambio</span>
              </summary>
              <div className="border-t border-line-soft p-4">
                {changes.length ? <ConfigurationDiff changes={changes} /> : <p className="text-sm text-ink-soft">Este registro no contiene un detalle de los parámetros visibles.</p>}
              </div>
            </details>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 text-xs text-ink-soft">
        <span>Página {page} de {Math.max(1, Math.ceil(data.total / 5))} · {data.total} registros</span>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" aria-label="Página anterior" disabled={page === 1 || isFetching} onClick={() => setPage(page - 1)}><ChevronLeft className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon" aria-label="Página siguiente" disabled={page * 5 >= data.total || isFetching} onClick={() => setPage(page + 1)}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
}
