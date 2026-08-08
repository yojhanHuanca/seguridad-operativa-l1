import type { ReactNode } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Activity, Bell, Building2, Calendar, ChevronRight, Clock, FolderKanban, Timer, Train, TrendingUp } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Card } from "@/design-system/primitives/Card";
import { usePlans } from "@/features/plans/hooks/usePlans";
import { cn } from "@/lib/utils";
import type { PlanItem } from "@/features/plans/types";

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

function isInVerification(p: PlanItem): boolean {
  return normalize(caseStage(p)).includes("verificacion");
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
  return normalize(planState(p)).includes("aceptad");
}

function isPendingAcceptance(p: PlanItem): boolean {
  const estado = normalize(planState(p));
  return !isClosed(p) && !isRejected(p) && !isInVerification(p) && !hasPendingExtension(p) && !isAccepted(p) && (estado.includes("enviado") || estado.includes("pendiente") || !estado);
}

function isExecuting(p: PlanItem): boolean {
  return isAccepted(p) && !isClosed(p) && !isRejected(p) && !isInVerification(p) && !hasPendingExtension(p);
}

function AreaLabel({ plans }: { plans: PlanItem[] }) {
  const areas = Array.from(new Set(plans.map((p) => p.areas.nombre_area).filter(Boolean)));
  const label = areas.length === 1 ? areas[0] : areas.length > 1 ? "Todas las áreas" : "Área asignada";

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-700">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[11px] text-ink-quiet">Área seleccionada</p>
          <p className="text-[13px] font-semibold text-ink">{label}</p>
        </div>
      </div>
    </Card>
  );
}

function JefeSidebar() {
  const [searchParams] = useSearchParams();
  const { data: planes } = usePlans();
  const plans = planes ?? [];
  const active = searchParams.get("estado") || "todos";

  const counts = {
    todos: plans.length,
    ejecucion: plans.filter(isExecuting).length,
    verificacion: plans.filter(isInVerification).length,
    pendientes: plans.filter(isPendingAcceptance).length,
  };

  const items = [
    { id: "todos", label: "Todos", icon: FolderKanban, count: counts.todos, href: "/jefe" },
    { id: "ejecucion", label: "En Ejecución", icon: Activity, count: counts.ejecucion, href: "/jefe?estado=ejecucion" },
    { id: "verificacion", label: "En Verificación", icon: Timer, count: counts.verificacion, href: "/jefe?estado=verificacion" },
    { id: "pendientes", label: "Pendientes", icon: Clock, count: counts.pendientes, href: "/jefe?estado=pendientes" },
  ];

  return (
    <aside className="hidden w-80 shrink-0 lg:block">
      <div className="sticky top-24 space-y-4">
        <AreaLabel plans={plans} />

        <Card className="overflow-hidden p-0">
          <div className="px-8 py-5">
            <h3 className="text-[13px] font-semibold text-ink">Mis Planes de Acción</h3>
          </div>
          <div className="mx-5 h-px bg-line-soft" />
          <div className="space-y-3 p-5 pt-3">
            {items.map((item) => {
              const Icon = item.icon;
              const selected = active === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  className={cn(
                    "flex h-11 w-full items-center gap-3 rounded-lg px-4 text-[13px] font-medium transition-colors",
                    selected ? "bg-brand-50 text-brand-700" : "text-ink-soft hover:bg-surface hover:text-ink"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1 text-center">{item.label}</span>
                  {item.count > 0 && (
                    <span className="grid h-6 min-w-6 place-items-center rounded-full bg-brand-100 px-2 text-[11px] font-semibold tabular-nums text-brand-700">
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-brand-700" />
            <h3 className="text-[13px] font-semibold text-ink">Resumen del Área</h3>
          </div>
          <div className="space-y-2.5 text-[11.5px]">
            <div className="flex justify-between gap-3">
              <span className="text-ink-soft">Total planes</span>
              <span className="font-medium text-ink">{counts.todos}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-ink-soft">En ejecución</span>
              <span className="font-medium text-ink">{counts.ejecucion}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-ink-soft">En verificación</span>
              <span className="font-medium text-ink">{counts.verificacion}</span>
            </div>
          </div>
        </Card>
      </div>
    </aside>
  );
}

export function JefeShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { data: planes } = usePlans();
  const plans = planes ?? [];
  const activeCount = plans.filter((p) => !isClosed(p) && !isRejected(p)).length;
  const areas = Array.from(new Set(plans.map((p) => p.areas.nombre_area).filter(Boolean)));
  const firstArea = areas.length === 1 ? areas[0] : "Área";
  const userName = areas.length === 1 ? `Jefe de ${firstArea}` : "Jefe de Área";

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1560px] items-center justify-between gap-6 px-8">
          <Link to="/jefe" className="flex min-w-0 items-center gap-3">
            <Logo size={76} />
            <span className="hidden h-6 w-px bg-line sm:inline-block" />
            <span className="hidden items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[11.5px] font-medium text-brand-800 sm:flex">
              <Train className="h-3.5 w-3.5" /> Portal del Jefe de Área
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              to="/jefe"
              className={cn(
                "relative inline-flex h-9 items-center gap-2 rounded-lg px-3.5 text-[13px] font-medium transition-colors",
                location.pathname.startsWith("/jefe") ? "bg-brand-50 text-brand-800" : "text-ink-soft hover:bg-surface hover:text-ink"
              )}
            >
              <Calendar className="h-4 w-4" /> Mi Plan
              {activeCount > 0 && (
                <span className="ml-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand-700 px-1.5 text-[10.5px] font-semibold tabular-nums text-white">
                  {activeCount}
                </span>
              )}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/jefe"
              className="relative grid h-9 w-9 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-surface hover:text-ink"
              aria-label="Notificaciones"
            >
              <Bell className="h-[18px] w-[18px]" />
              {activeCount > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-critical ring-2 ring-white" />}
            </Link>
            <div className="flex h-9 items-center gap-2 rounded-lg pl-1.5 pr-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-800">
                JA
              </span>
              <div className="hidden text-left leading-tight lg:block">
                <p className="text-[12px] font-semibold text-ink">{userName}</p>
                <p className="text-[10.5px] text-ink-quiet">{firstArea}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1560px] gap-7 px-8 py-8">
        <JefeSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-[1560px] flex-wrap items-center justify-between gap-3 px-8 py-5 text-[12px] text-ink-quiet">
          <p>SIGMA L1 · Portal del Jefe de Área Responsable — Línea 1 del Metro de Lima</p>
          <p className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3" /> Ejecución y seguimiento del Plan de Acción
          </p>
        </div>
      </footer>
    </div>
  );
}





