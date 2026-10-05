import { useQuery } from "@tanstack/react-query";
import { History } from "lucide-react";
import { api, type ApiEnvelope } from "@/lib/api";
import { formatDateTime } from "@/lib/format";
import { Card, CardHeader } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";

interface Entry { id_auditoria: number; accion: string; tabla_afectada: string; fecha: string | null; }
const labels: Record<string, string> = { login: "Inicio de sesión", login_fallido: "Intento de acceso fallido", crear: "Creación de registro", editar: "Actualización de registro", eliminar: "Eliminación de registro" };
const entities: Record<string, string> = { usuarios: "Cuenta", sesiones: "Acceso", casos_sop: "Caso SOP", planes_accion: "Plan de acción", actividades_plan: "Actividad del plan", eventos_monitoreo: "Evento de monitoreo", contingencia_eventos: "Contingencia", roles: "Rol", configuracion: "Configuración" };
export function RecentActivity() {
  const query = useQuery({ queryKey: ["profile", "me", "reciente"], queryFn: async () => {
    const { data } = await api.get<ApiEnvelope<Entry[]>>("/profile/me/reciente");
    return data.data ?? [];
  } });
  return <Card><CardHeader icon={<History className="h-5 w-5" />} title="Actividad reciente" subtitle="Últimas acciones registradas de tu cuenta." />
    {query.isPending ? <p role="status" className="text-sm text-ink-quiet">Cargando actividad...</p> : query.isError ? <div role="alert"><p>No se pudo cargar la actividad.</p><Button size="sm" variant="outline" onClick={() => void query.refetch()}>Reintentar</Button></div> : query.data.length ? <ol className="space-y-0">{query.data.map(entry => <li key={entry.id_auditoria} className="relative ml-2 border-l border-brand-200 py-3 pl-5"><span className="absolute -left-1 top-5 h-2 w-2 rounded-full bg-brand-700" /><p className="text-sm font-semibold text-ink">{labels[entry.accion] ?? entry.accion}</p><p className="mt-1 text-xs text-ink-quiet">{entities[entry.tabla_afectada] ?? "Registro del sistema"} · {entry.fecha ? formatDateTime(entry.fecha) : "Sin fecha"}</p></li>)}</ol> : <p className="text-sm text-ink-quiet">Todavía no hay acciones registradas.</p>}
  </Card>;
}

