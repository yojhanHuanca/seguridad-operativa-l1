import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, History, LogIn, PlusCircle, Search, ShieldAlert, Trash2, UserCog, UserRound } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Button } from "@/design-system/primitives/Button";
import { Input } from "@/design-system/primitives/Input";
import { Card } from "@/components/ui/card";
import { useAuditoria, useAuditoriaCounts } from "@/features/auditoria/hooks/useAuditoria";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AccionAuditoria, AuditoriaItem } from "@/features/auditoria/types";

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

const ACCION_DOT: Record<AccionAuditoria, string> = {
  crear: "bg-brand-600",
  editar: "bg-blue-500",
  eliminar: "bg-red-500",
  login: "bg-ink-faint",
  login_fallido: "bg-orange-500",
};

const TABLA_LABEL: Record<string, string> = {
  auditoria: "Auditoría",
  casos_sop: "Casos SOP",
  caso_sop: "Casos SOP",
  planes_accion: "Planes de Acción",
  importacion_historica: "Importación Histórica",
  usuarios: "Usuarios",
  roles: "Roles",
  catalogos: "Catálogos",
  catalogo_detalle: "Catálogos",
  eventos_operativos: "Eventos Operativos",
  eventos_monitoreo: "Monitoreo",
  auth: "Sistema",
  sesiones: "Sesiones",
};

/** Nombre de campo → etiqueta legible, para el detalle de cambios. Lo que no está acá se muestra tal cual. */
const CAMPO_LABEL: Record<string, string> = {
  nombre: "Nombre",
  correo: "Correo",
  telefono: "Teléfono",
  cargo: "Cargo",
  estado: "Estado",
  id_rol: "Rol",
  id_area: "Área",
  es_responsable: "RSO (visita Monitoreo)",
  codigo_sop: "Código SOP",
  origen: "Origen",
  modalidad: "Modalidad",
  evidencias: "Evidencias",
};

function formatValor(v: unknown): string {
  if (v === null || v === undefined || v === "") return "—";
  if (typeof v === "boolean") return v ? "Sí" : "No";
  return String(v);
}

function capitalizar(valor: string) {
  return valor
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letra) => letra.toUpperCase());
}

function destinoRegistro(registro: AuditoriaItem): string {
  if (registro.accion === "login" || registro.accion === "login_fallido") return "Centro de Administración";

  const codigo = registro.descripcion?.match(/\b(?:SOP|EXP|PLAN|PLA)[\s-]?\d{1,6}(?:-\d{2,4})?\b/i)?.[0];
  if (codigo) return codigo;

  const tabla = TABLA_LABEL[registro.tabla_afectada] ?? capitalizar(registro.tabla_afectada);
  return registro.id_registro != null ? `${tabla} #${registro.id_registro}` : tabla;
}

function detalleRegistro(registro: AuditoriaItem): string {
  const descripcion = registro.descripcion?.trim();
  if (!descripcion) return "—";
  if (registro.accion === "login") return "Inicio de sesión";
  return descripcion.replace(/\s+—\s+Mozilla\/5\.0.*$/i, "");
}

/** Antes/después lado a lado — lo que de verdad importa en una auditoría "de empresa grande": qué cambió exactamente. */
function DiffCambios({ antes, despues }: { antes: Record<string, unknown>; despues: Record<string, unknown> }) {
  const campos = Object.keys(despues);
  return (
    <div className="overflow-hidden rounded-lg border border-line-soft">
      <table className="w-full text-left text-[11.5px]">
        <thead>
          <tr className="bg-surface text-[10px] uppercase tracking-wide text-ink-faint">
            <th className="px-3 py-2 font-semibold">Campo</th>
            <th className="px-3 py-2 font-semibold">Antes</th>
            <th className="px-3 py-2 font-semibold">Después</th>
          </tr>
        </thead>
        <tbody>
          {campos.map((campo) => (
            <tr key={campo} className="border-t border-line-soft">
              <td className="px-3 py-1.5 font-medium text-ink-soft">{CAMPO_LABEL[campo] ?? campo}</td>
              <td className="px-3 py-1.5 text-red-600 line-through decoration-red-300">{formatValor(antes[campo])}</td>
              <td className="px-3 py-1.5 font-medium text-brand-700">{formatValor(despues[campo])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DatosRegistrados({ datos }: { datos: Record<string, unknown> }) {
  const campos = Object.keys(datos);
  return (
    <div className="overflow-hidden rounded-lg border border-line-soft">
      <table className="w-full text-left text-[11.5px]">
        <thead>
          <tr className="bg-surface text-[10px] uppercase tracking-wide text-ink-faint">
            <th className="px-3 py-2 font-semibold">Campo</th>
            <th className="px-3 py-2 font-semibold">Valor registrado</th>
          </tr>
        </thead>
        <tbody>
          {campos.map((campo) => (
            <tr key={campo} className="border-t border-line-soft">
              <td className="px-3 py-1.5 font-medium text-ink-soft">{CAMPO_LABEL[campo] ?? campo}</td>
              <td className="px-3 py-1.5 font-medium text-brand-700">{formatValor(datos[campo])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FilaAuditoria({ registro }: { registro: AuditoriaItem }) {
  const [abierto, setAbierto] = useState(false);
  const Icon = ACCION_ICON[registro.accion];
  const tieneDetalle = Boolean(registro.datos_previos || registro.datos_nuevos || registro.ip || registro.user_agent);
  const actorCargo = registro.usuarios.cargo || "Administrador";

  return (
    <>
      <tr
        className={cn("border-b border-line-soft last:border-0 hover:bg-brand-50/25", tieneDetalle && "cursor-pointer")}
        onClick={() => tieneDetalle && setAbierto((v) => !v)}
      >
        <td className="px-4 py-4 align-top whitespace-nowrap font-mono text-[11.5px] leading-relaxed text-ink-soft">{formatDateTime(registro.fecha)}</td>
        <td className="px-4 py-3">
          <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold leading-none", ACCION_TONE[registro.accion])}>
            <Icon className="h-3.5 w-3.5" /> {ACCION_LABEL[registro.accion]}
          </span>
        </td>
        <td className="px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <UserRound className="h-4 w-4 shrink-0 text-ink-faint" />
            <div className="min-w-0">
              <p className="font-semibold text-ink">{registro.usuarios.nombre}</p>
              <p className="text-[11.5px] text-ink-faint">({actorCargo})</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 font-semibold text-ink">{destinoRegistro(registro)}</td>
        <td className="max-w-[460px] px-4 py-3 leading-relaxed text-ink-soft">{detalleRegistro(registro)}</td>
        <td className="px-4 py-3 text-right">
          {tieneDetalle && (
            <ChevronDown className={cn("ml-auto h-4 w-4 text-ink-faint transition-transform", abierto && "rotate-180")} />
          )}
        </td>
      </tr>
      {abierto && tieneDetalle && (
        <tr className="border-b border-line-soft bg-surface/60">
          <td colSpan={6} className="px-4 py-3">
            <div className="flex flex-col gap-3">
              {registro.datos_previos && registro.datos_nuevos && (
                <DiffCambios antes={registro.datos_previos} despues={registro.datos_nuevos} />
              )}
              {!registro.datos_previos && registro.datos_nuevos && (
                <DatosRegistrados datos={registro.datos_nuevos} />
              )}
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-ink-faint">
                {registro.ip && <span>IP: <span className="font-mono text-ink-soft">{registro.ip}</span></span>}
                {registro.user_agent && <span className="max-w-full break-all">Navegador: <span className="text-ink-soft">{registro.user_agent}</span></span>}
                {registro.id_registro != null && <span>ID del registro: <span className="font-mono text-ink-soft">{registro.id_registro}</span></span>}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export function AuditoriaPanelContent() {
  const [accionFiltro, setAccionFiltro] = useState("todas");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
      setPagina(1);
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [query]);

  const filtrosActivos = {
    accion: accionFiltro !== "todas" ? accionFiltro : undefined,
    search: debouncedQuery || undefined,
  };

  const { data: pageData, isLoading } = useAuditoria({ ...filtrosActivos, page: pagina, limit: POR_PAGINA });
  const { data: accionCounts } = useAuditoriaCounts();

  const registros = pageData?.items ?? [];
  const total = pageData?.total ?? 0;
  const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const hayFiltros = accionFiltro !== "todas" || Boolean(debouncedQuery);

  function limpiarFiltros() {
    setAccionFiltro("todas");
    setQuery("");
    setDebouncedQuery("");
    setPagina(1);
  }

  return (
    <>
      <section className="rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">Trazabilidad</p>
            <p className="mt-1 text-[18px] font-bold leading-tight text-ink">
              {total} {total === 1 ? "registro" : "registros"}
              {hayFiltros ? " filtrados" : " del sistema"}
            </p>
            <p className="mt-1 text-[12.5px] text-ink-quiet">Historial completo de acciones administrativas.</p>
          </div>
          {hayFiltros && (
            <Button variant="ghost" size="sm" onClick={limpiarFiltros}>
              Limpiar filtros
            </Button>
          )}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {(Object.keys(ACCION_LABEL) as AccionAuditoria[]).map((accion) => {
            const activo = accionFiltro === accion;
            const cantidad = accionCounts?.[accion] ?? 0;
            const Icon = ACCION_ICON[accion];
            return (
              <button
                key={accion}
                type="button"
                aria-pressed={activo}
                onClick={() => {
                  setAccionFiltro(activo ? "todas" : accion);
                  setPagina(1);
                }}
                className={cn(
                  "group flex min-h-[76px] items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors",
                  activo ? "border-brand-600 bg-brand-50 ring-2 ring-brand-600/10" : "border-line bg-white hover:border-brand-200 hover:bg-surface"
                )}
              >
                <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg", ACCION_TONE[accion])}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[20px] font-bold leading-none text-ink">{cantidad}</span>
                  <span className="mt-1 block truncate text-[11.5px] text-ink-quiet">{ACCION_LABEL[accion]}</span>
                </span>
                <span className={cn("ml-auto h-2 w-2 shrink-0 rounded-full", ACCION_DOT[accion])} />
              </button>
            );
          })}
        </div>
      </section>

      <div className="mt-4 rounded-2xl border border-line bg-white p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por actor, destino o detalle..."
            className="pl-10"
            aria-label="Buscar auditoría"
          />
        </div>
      </div>

      {isLoading ? (
        <Card className="mt-4 p-8 text-center text-[13px] text-ink-quiet">Cargando...</Card>
      ) : registros.length === 0 ? (
        <Card className="mt-4 flex flex-col items-center gap-2 border-dashed p-9 text-center">
          <History className="h-7 w-7 text-ink-faint" />
          <p className="text-[13px] font-semibold text-ink">Sin registros</p>
          <p className="text-[11.5px] text-ink-quiet">
            {hayFiltros ? "Prueba con otros filtros." : "Todavía no hay acciones registradas en el sistema."}
          </p>
        </Card>
      ) : (
        <>
          <Card className="mt-6 overflow-hidden rounded-2xl border border-line bg-white p-0 shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-[1040px] w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-line bg-surface text-[11px] uppercase tracking-wide text-ink-quiet">
                    <th className="px-4 py-4 font-semibold">Fecha/Hora</th>
                    <th className="px-4 py-3 font-semibold">Acción</th>
                    <th className="px-4 py-3 font-semibold">Actor</th>
                    <th className="px-4 py-3 font-semibold">Destino</th>
                    <th className="px-4 py-3 font-semibold">Detalle</th>
                    <th className="px-4 py-3 font-semibold" />
                  </tr>
                </thead>
                <tbody>
                  {registros.map((r) => (
                    <FilaAuditoria key={r.id_auditoria} registro={r} />
                  ))}
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
