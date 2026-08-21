import { useState } from "react";
import { ChevronLeft, ChevronRight, History, LogIn, PlusCircle, ShieldAlert, Trash2, UserCog } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Button } from "@/design-system/primitives/Button";
import { Input, Select } from "@/design-system/primitives/Input";
import { Card } from "@/components/ui/card";
import { useAuditoria, useAuditoriaTablas } from "@/features/auditoria/hooks/useAuditoria";
import { useUsersBasicos } from "@/features/users/hooks/useUsersBasicos";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AccionAuditoria } from "@/features/auditoria/types";

const POR_PAGINA = 30;

const ACCION_LABEL: Record<AccionAuditoria, string> = {
  crear: "Creó",
  editar: "Editó",
  eliminar: "Eliminó",
  login: "Inicio de sesión",
  login_fallido: "Intento fallido",
};

const ACCION_ICON: Record<AccionAuditoria, typeof PlusCircle> = {
  crear: PlusCircle,
  editar: UserCog,
  eliminar: Trash2,
  login: LogIn,
  login_fallido: ShieldAlert,
};

const ACCION_TONE: Record<AccionAuditoria, string> = {
  crear: "bg-brand-50 text-brand-700",
  editar: "bg-blue-50 text-blue-700",
  eliminar: "bg-red-50 text-red-700",
  login: "bg-surface-2 text-ink-soft",
  login_fallido: "bg-orange-50 text-orange-700",
};

export function AuditoriaPanelContent() {
  const { data: usuarios = [] } = useUsersBasicos();
  const { data: tablas = [] } = useAuditoriaTablas();

  const [usuarioFiltro, setUsuarioFiltro] = useState("todos");
  const [tablaFiltro, setTablaFiltro] = useState("todas");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [pagina, setPagina] = useState(1);

  const { data: pageData, isLoading } = useAuditoria({
    usuario: usuarioFiltro !== "todos" ? Number(usuarioFiltro) : undefined,
    tabla: tablaFiltro !== "todas" ? tablaFiltro : undefined,
    desde: desde || undefined,
    hasta: hasta || undefined,
    page: pagina,
    limit: POR_PAGINA,
  });

  const registros = pageData?.items ?? [];
  const total = pageData?.total ?? 0;
  const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);

  return (
    <>
      <div>
        <h1 className="font-display text-[20px] font-bold text-ink">Auditoría</h1>
        <p className="mt-1 text-[12.5px] text-ink-quiet">{total} acciones registradas</p>
      </div>

      <div className="mt-5 grid gap-3 rounded-2xl border border-line bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
        <Select
          value={usuarioFiltro}
          onChange={(e) => {
            setUsuarioFiltro(e.target.value);
            setPagina(1);
          }}
          aria-label="Filtrar por usuario"
        >
          <option value="todos">Todos los usuarios</option>
          {usuarios.map((u) => (
            <option key={u.id_usuario} value={u.id_usuario}>{u.nombre}</option>
          ))}
        </Select>
        <Select
          value={tablaFiltro}
          onChange={(e) => {
            setTablaFiltro(e.target.value);
            setPagina(1);
          }}
          aria-label="Filtrar por tabla"
        >
          <option value="todas">Todas las tablas</option>
          {tablas.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </Select>
        <Input
          type="date"
          value={desde}
          onChange={(e) => {
            setDesde(e.target.value);
            setPagina(1);
          }}
          aria-label="Desde"
        />
        <Input
          type="date"
          value={hasta}
          onChange={(e) => {
            setHasta(e.target.value);
            setPagina(1);
          }}
          aria-label="Hasta"
        />
      </div>

      {isLoading ? (
        <Card className="mt-4 p-8 text-center text-[13px] text-ink-quiet">Cargando...</Card>
      ) : registros.length === 0 ? (
        <Card className="mt-4 flex flex-col items-center gap-2 border-dashed p-9 text-center">
          <History className="h-7 w-7 text-ink-faint" />
          <p className="text-[13px] font-semibold text-ink">Sin registros</p>
          <p className="text-[11.5px] text-ink-quiet">
            {usuarioFiltro !== "todos" || tablaFiltro !== "todas" || desde || hasta
              ? "Prueba con otros filtros."
              : "Todavía no hay acciones registradas en el sistema."}
          </p>
        </Card>
      ) : (
        <>
          <Card className="mt-4 overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-line bg-surface text-[11px] text-ink-quiet">
                    <th className="px-4 py-3 font-semibold">Fecha</th>
                    <th className="px-4 py-3 font-semibold">Usuario</th>
                    <th className="px-4 py-3 font-semibold">Acción</th>
                    <th className="px-4 py-3 font-semibold">Tabla</th>
                    <th className="px-4 py-3 font-semibold">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {registros.map((r) => {
                    const Icon = ACCION_ICON[r.accion];
                    return (
                      <tr key={r.id_auditoria} className="border-b border-line-soft last:border-0 hover:bg-surface">
                        <td className="px-4 py-3 whitespace-nowrap text-ink-soft">{formatDateTime(r.fecha)}</td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-ink">{r.usuarios.nombre}</p>
                          {r.usuarios.cargo && <p className="text-[10.5px] text-ink-faint">{r.usuarios.cargo}</p>}
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10.5px] font-medium", ACCION_TONE[r.accion])}>
                            <Icon className="h-3.5 w-3.5" /> {ACCION_LABEL[r.accion]}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-[10.5px] text-ink-soft">{r.tabla_afectada}</td>
                        <td className="px-4 py-3 text-ink-soft">{r.descripcion ?? "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[12px] text-ink-quiet">
              Mostrando {(paginaActual - 1) * POR_PAGINA + 1}–{Math.min(paginaActual * POR_PAGINA, total)} de {total}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPagina((p) => Math.max(1, p - 1))} disabled={paginaActual === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-[12px] text-ink-quiet">Página {paginaActual} de {totalPaginas}</span>
              <Button variant="outline" size="sm" onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))} disabled={paginaActual === totalPaginas}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export function AdminAuditoriaPage() {
  return (
    <AdminShell>
      <AuditoriaPanelContent />
    </AdminShell>
  );
}
