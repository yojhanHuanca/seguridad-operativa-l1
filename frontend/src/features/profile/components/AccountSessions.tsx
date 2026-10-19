import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ShieldCheck } from "lucide-react";
import { api, type ApiEnvelope } from "@/lib/api";
import { formatDateTime } from "@/lib/format";
import { Card, CardHeader } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";

interface Session {
  id_sesion: number;
  fecha_inicio: string | null;
  navegador: string | null;
  dispositivo: string | null;
  actual: boolean;
}

export function AccountSessions() {
  const [open, setOpen] = useState(false);
  const query = useQuery({
    queryKey: ["profile", "me", "sesiones"], enabled: open,
    queryFn: async () => {
      const { data } = await api.get<ApiEnvelope<Session[]>>("/profile/me/sesiones");
      return data.data ?? [];
    },
  });
  return <Card>
    <CardHeader icon={<ShieldCheck className="h-5 w-5" />} title="Sesiones de tu cuenta" subtitle="Últimas 20 sesiones registradas como activas." action={<Button size="sm" variant="outline" aria-expanded={open} onClick={() => setOpen(value => !value)}>{open ? "Ocultar sesiones" : "Ver sesiones"}</Button>} />
    {open && (query.isPending ? <p className="text-sm text-ink-quiet">Cargando sesiones...</p> : query.isError ? <div role="alert"><p>No se pudieron cargar las sesiones.</p><Button variant="outline" size="sm" onClick={() => void query.refetch()}>Reintentar</Button></div> : <ul className="divide-y divide-line-soft">{query.data.map(session => <li key={session.id_sesion} className="py-3">
      <p className="text-sm font-medium text-ink">{session.actual ? "Esta sesión" : "Otra sesión"}</p>
      <p className="mt-1 break-words text-xs text-ink-quiet">{session.dispositivo || session.navegador || "Dispositivo no identificado"}</p>
      <p className="mt-1 text-xs text-ink-quiet">Inicio: {session.fecha_inicio ? formatDateTime(session.fecha_inicio) : "Sin fecha registrada"}</p>
    </li>)}</ul>)}
  </Card>;
}
