import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Activity, ClipboardList, Rocket, Send, Timer } from "lucide-react";
import { JefeShell } from "@/components/layout/JefeShell";
import { Card } from "@/design-system/primitives/Card";
import { Pill } from "@/design-system/primitives/Pill";
import { usePlans } from "@/features/plans/hooks/usePlans";
import { daysUntil, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PlanItem } from "@/features/plans/types";

type PillTone = "neutral" | "brand" | "critical" | "warning" | "info" | "success";
type StatusFilter = "todos" | "pendientes" | "ejecucion" | "verificacion" | "cerrados";

type CaseRow = {
  codigo: string;
  titulo: string;
  plans: PlanItem[];
};

const FILTERS: { id: StatusFilter; label: string; href: string }[] = [
  { id: "todos", label: "Todos", href: "/jefe" },
  { id: "pendientes", label: "Pendientes", href: "/jefe?estado=pendientes" },
  { id: "ejecucion", label: "En Ejecución", href: "/jefe?estado=ejecucion" },
  { id: "verificacion", label: "En Verificación", href: "/jefe?estado=verificacion" },
  { id: "cerrados", label: "Cerrados", href: "/jefe?estado=cerrados" },
];

function normalize(value?: string | null): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function caseStage(p: PlanItem): string {
  return p.casos_sop.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre;
}

function planState(p: PlanItem): string {
  return p.catalogo_detalle.nombre;
}

function isFinalized(p: PlanItem): boolean {
  return normalize(planState(p)).includes("finaliz");
}

function isInVerification(p: PlanItem): boolean {
  const estado = normalize(planState(p));
  return isFinalized(p) || (!estado.includes("cerrad") && normalize(caseStage(p)).includes("verificacion"));
}

function isClosed(p: PlanItem): boolean {
  return normalize(caseStage(p)).includes("cierre") || normalize(caseStage(p)).includes("cerrado") || normalize(planState(p)).includes("cerrado");
}

function isRejected(p: PlanItem): boolean {
  return normalize(caseStage(p)).includes("rechaz") || normalize(planState(p)).includes("rechaz");
}

function hasPendingExtension(p: PlanItem): boolean {
  return p.prorroga_estado === "pendiente";
}

function isAccepted(p: PlanItem): boolean {
  const estado = normalize(planState(p));
  return estado.includes("aceptad") || estado.includes("ejecucion");
}

function isPendingAcceptance(p: PlanItem): boolean {
  const estado = normalize(planState(p));
  return !isClosed(p) && !isRejected(p) && !isInVerification(p) && !hasPendingExtension(p) && !isAccepted(p) && (estado.includes("enviado") || estado.includes("pendiente") || !estado);
}

function isExecuting(p: PlanItem): boolean {
  return isAccepted(p) && !isClosed(p) && !isRejected(p) && !isInVerification(p) && !hasPendingExtension(p);
}

function matchesStatus(p: PlanItem, filter: StatusFilter): boolean {
  if (filter === "todos") return true;
  if (filter === "pendientes") return isPendingAcceptance(p);
  if (filter === "ejecucion") return isExecuting(p) || hasPendingExtension(p);
  if (filter === "verificacion") return isInVerification(p);
  return isClosed(p);
}

function calcProgress(p: PlanItem): number {
  const total = p.actividades_plan.length;
  if (!total) return 0;
  const avance = p.actividades_plan.reduce((acc, it) => {
    const estado = normalize(it.catalogo_detalle?.nombre);
    return acc + (estado.includes("complet") ? 100 : estado.includes("progreso") ? 50 : 0);
  }, 0);
  return Math.round(avance / total);
}

function isReadyForVerification(p: PlanItem): boolean {
  return isExecuting(p) && p.actividades_plan.length > 0 && calcProgress(p) === 100;
}

function statusInfo(p: PlanItem): { label: string; tone: PillTone } {
  if (isRejected(p)) return { label: "Rechazado", tone: "critical" };
  if (isClosed(p)) return { label: "Cerrado", tone: "neutral" };
  if (isFinalized(p)) return { label: "En revisión SO", tone: "warning" };
  if (isInVerification(p)) return { label: "En Verificación", tone: "warning" };
  if (hasPendingExtension(p)) return { label: "Prórroga", tone: "warning" };
  if (isReadyForVerification(p)) return { label: "En Ejecución", tone: "brand" };
  if (isExecuting(p)) return { label: "En Ejecución", tone: "brand" };
  return { label: "Pendiente", tone: "info" };
}

function priorityInfo(p: PlanItem): { label: string; tone: PillTone; rank: number } {
  const riesgo = p.casos_sop.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle;
  const text = normalize(`${riesgo?.codigo ?? ""} ${riesgo?.nombre ?? ""}`);
  const tokens = text.split(/[^a-z0-9]+/).filter(Boolean);

  if (tokens.some((t) => ["critica", "critico", "inaceptable", "extremo", "extrema"].includes(t))) return { label: "Crítica", tone: "critical", rank: 0 };
  if (tokens.some((t) => ["a", "alta", "alto"].includes(t))) return { label: "Alta", tone: "warning", rank: 1 };
  if (tokens.some((t) => ["b", "baja", "bajo"].includes(t))) return { label: "Baja", tone: "neutral", rank: 3 };
  return { label: "Media", tone: "info", rank: 2 };
}

function deadlineRank(p: PlanItem): number {
  if (isClosed(p) || isRejected(p) || isInVerification(p)) return Number.POSITIVE_INFINITY;
  return daysUntil(p.fecha_reprogramada ?? p.fecha_plan);
}

function priorityWeight(p: PlanItem): number {
  if (isRejected(p) || isClosed(p)) return 99;
  const due = deadlineRank(p);
  if (due < 0) return 0;
  if (hasPendingExtension(p)) return 1;
  if (due <= 3) return 2;
  if (isPendingAcceptance(p)) return 3;
  if (isReadyForVerification(p)) return 4;
  if (isExecuting(p)) return 5;
  if (isInVerification(p)) return 6;
  return 7;
}

function groupByCase(plans: PlanItem[]): CaseRow[] {
  const map = new Map<string, CaseRow>();
  for (const plan of plans) {
    const codigo = plan.casos_sop.codigo_sop;
    const current = map.get(codigo);
    if (current) {
      current.plans.push(plan);
    } else {
      map.set(codigo, {
        codigo,
        titulo: plan.casos_sop.titulo?.trim() || plan.casos_sop.descripcion,
        plans: [plan],
      });
    }
  }

  return Array.from(map.values()).map((row) => ({
    ...row,
    plans: [...row.plans].sort((a, b) => priorityWeight(a) - priorityWeight(b) || deadlineRank(a) - deadlineRank(b)),
  }));
}

function planForRow(row: CaseRow): PlanItem {
  return row.plans[0];
}

function countLabel(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function JefeHome() {
  const [params] = useSearchParams();
  const filter = (params.get("estado") || "todos") as StatusFilter;
  const safeFilter: StatusFilter = FILTERS.some((f) => f.id === filter) ? filter : "todos";
  const { data: planes, isLoading } = usePlans();

  const rows = useMemo(() => groupByCase(planes ?? []), [planes]);
  const filteredRows = useMemo(() => {
    return rows
      .filter((row) => row.plans.some((plan) => matchesStatus(plan, safeFilter)))
      .sort((a, b) => {
        const pa = planForRow(a);
        const pb = planForRow(b);
        return priorityWeight(pa) - priorityWeight(pb) || deadlineRank(pa) - deadlineRank(pb);
      });
  }, [rows, safeFilter]);

  return (
    <JefeShell>
      {isLoading ? (
        <Card className="py-14 text-center text-[14px] text-ink-quiet">Cargando planes...</Card>
      ) : filteredRows.length === 0 ? (
        <NoPlanAssigned />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-[26px] font-bold tracking-tight text-ink">Mis Planes de Acción</h1>
              <p className="mt-1 text-[14px] text-ink-soft">Planes asignados por Seguridad Operativa</p>
            </div>
            <span className="text-[13px] text-ink-quiet">{countLabel(filteredRows.length, "caso", "casos")}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <Link
                key={f.id}
                to={f.href}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-[14px] font-medium transition-all",
                  safeFilter === f.id ? "bg-brand-700 text-white shadow-sm" : "bg-surface-2 text-ink-soft hover:bg-surface-3 hover:text-ink"
                )}
              >
                {f.label}
              </Link>
            ))}
          </div>

          <Card padded={false} className="overflow-hidden border-line-soft shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-sm">
                <thead>
                  <tr className="border-b border-line-soft bg-surface-2">
                    <th className="px-4 py-3.5 text-left text-[12px] font-semibold uppercase tracking-wide text-ink-quiet">Código</th>
                    <th className="px-4 py-3.5 text-left text-[12px] font-semibold uppercase tracking-wide text-ink-quiet">Título</th>
                    <th className="px-4 py-3.5 text-left text-[12px] font-semibold uppercase tracking-wide text-ink-quiet">Estado</th>
                    <th className="px-4 py-3.5 text-left text-[12px] font-semibold uppercase tracking-wide text-ink-quiet">Prioridad</th>
                    <th className="px-4 py-3.5 text-left text-[12px] font-semibold uppercase tracking-wide text-ink-quiet whitespace-nowrap">Fecha límite</th>
                    <th className="px-4 py-3.5 text-right text-[12px] font-semibold uppercase tracking-wide text-ink-quiet">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row) => {
                    const plan = planForRow(row);
                    const status = statusInfo(plan);
                    const priority = priorityInfo(plan);
                    const deadline = plan.fecha_reprogramada ?? plan.fecha_plan;
                    const overdue = deadlineRank(plan) < 0;

                    return (
                      <tr key={row.codigo} className="border-b border-line-soft transition-colors last:border-b-0 hover:bg-surface-2">
                        <td className="px-4 py-3.5">
                          <Link
                            to={`/jefe/planes/${encodeURIComponent(row.codigo)}`}
                            className="whitespace-nowrap font-mono text-[14px] font-semibold text-brand-700 transition-colors hover:text-brand-800 hover:underline"
                          >
                            {row.codigo}
                          </Link>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="line-clamp-1 text-[14.5px] font-medium text-ink">{row.titulo}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <Pill tone={status.tone} dot>{status.label}</Pill>
                        </td>
                        <td className="px-4 py-3.5">
                          <Pill tone={priority.tone} dot>{priority.label}</Pill>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={cn("whitespace-nowrap text-[14px]", overdue ? "font-semibold text-critical" : "text-ink")}>{formatDate(deadline)}</span>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <Link
                            to={`/jefe/planes/${encodeURIComponent(row.codigo)}`}
                            className="whitespace-nowrap text-[13.5px] text-ink-quiet transition-colors hover:text-brand-700 hover:underline"
                          >
                            {countLabel(row.plans.length, "plan", "planes")}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </JefeShell>
  );
}

function NoPlanAssigned() {
  return (
    <div className="mx-auto max-w-3xl">
      <Card className="p-6 text-center">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-700">
          <ClipboardList className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-[18px] font-semibold text-ink">Sin planes activos</h3>
        <p className="text-[14px] text-ink-soft">Cuando Seguridad Operativa asigne un Plan de Acción a su área, aparecerá aquí para su ejecución.</p>
      </Card>
      <Card className="mt-6 p-5">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-ink-faint">¿Qué puede hacer aquí?</p>
        <ul className="space-y-2.5">
          {[
            { icon: Rocket, text: "Ejecutar las actividades del Plan de Acción asignado" },
            { icon: Activity, text: "Registrar avances, comentarios y evidencias" },
            { icon: Timer, text: "Solicitar ampliación de plazo si necesita más tiempo" },
            { icon: Send, text: "Enviar el plan a revisión de Seguridad Operativa al finalizar" },
          ].map((it, i) => (
            <li key={i} className="flex items-center gap-3 text-[13.5px] text-ink-soft">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                <it.icon className="h-4 w-4" />
              </span>
              {it.text}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}




