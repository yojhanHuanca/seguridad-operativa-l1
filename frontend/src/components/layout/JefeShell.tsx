import { type ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  Activity,
  BarChart3,
  Calendar,
  ChevronsLeft,
  ChevronsRight,
  CheckCircle2,
  Clock,
  FolderKanban,
  Menu,
  Timer,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { usePlans } from "@/features/plans/hooks/usePlans";
import { useJefeAreaFilter } from "@/features/plans/hooks/useJefeAreaFilter";
import { planStatusCounts } from "@/features/plans/lib/planStatus";
import { cn } from "@/lib/utils";
import { SessionExitButton } from "@/features/auth/SessionExitButton";
import { AdminPanelSwitcher } from "@/features/auth/AdminPanelSwitcher";
import { AdminViewingBanner } from "@/features/auth/AdminViewingBanner";
import { useAuth } from "@/features/auth/auth";
import { nombreSistema, useConfiguracion } from "@/features/configuracion/hooks/useConfiguracion";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  count?: number;
}

const COLLAPSE_KEY = "sigma-jefe-sidebar-collapsed";

const TITLES: Record<string, { title: string; crumb: string }> = {
  "/jefe": { title: "Mi Plan de Acción", crumb: "Inicio" },
  "/jefe/indicadores": { title: "Indicadores", crumb: "Inicio / Indicadores" },
};

function isActive(pathname: string, search: string, to: string) {
  const [toPath, toQuery] = to.split("?");
  if (pathname !== toPath) return false;
  return (toQuery ?? "") === (search.startsWith("?") ? search.slice(1) : search);
}

function metaFor(pathname: string) {
  if (pathname.startsWith("/jefe/plan")) return { title: "Detalle del plan", crumb: "Inicio / Detalle" };
  return TITLES[pathname] ?? TITLES["/jefe"];
}

function NavLink({ item, collapsed, active, onNavigate }: { item: NavItem; collapsed: boolean; active: boolean; onNavigate?: () => void }) {
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      className={cn(
        "flex h-10 items-center gap-3 rounded-xl px-2.5 text-[13px] font-medium transition-colors",
        collapsed && "justify-center px-0",
        active ? "bg-brand-50 font-semibold text-brand-800" : "text-ink-soft hover:bg-surface hover:text-ink"
      )}
    >
      <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-brand-700" : "text-ink-faint")} />
      {!collapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
      {!collapsed && item.count != null && item.count > 0 && (
        <span
          className={cn(
            "grid h-5 min-w-5 shrink-0 place-items-center rounded-full px-1.5 text-[11px] font-semibold tabular-nums",
            active ? "bg-brand-100 text-brand-700" : "bg-surface-2 text-ink-quiet"
          )}
        >
          {item.count}
        </span>
      )}
    </Link>
  );
}

function SidebarContent({ collapsed, onNavigate, area }: { collapsed: boolean; onNavigate?: () => void; area: string }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const areaFiltro = useJefeAreaFilter();
  const { data: planes } = usePlans(areaFiltro);
  const plans = planes ?? [];
  const counts = planStatusCounts(plans);

  const items: NavItem[] = [
    { to: "/jefe", label: "Todos", icon: FolderKanban, count: counts.todos },
    { to: "/jefe?estado=pendientes", label: "Pendientes", icon: Clock, count: counts.pendientes },
    { to: "/jefe?estado=ejecucion", label: "En Ejecución", icon: Activity, count: counts.ejecucion },
    { to: "/jefe?estado=verificacion", label: "En Verificación", icon: Timer, count: counts.verificacion },
    { to: "/jefe?estado=cerrados", label: "Cerrados", icon: CheckCircle2, count: counts.cerrados },
    { to: "/jefe/indicadores", label: "Indicadores", icon: BarChart3 },
  ];

  const search = location.pathname === "/jefe" ? `?${searchParams.toString()}`.replace(/\?$/, "") : "";

  return (
    <>
      <div className={cn("flex shrink-0 items-center gap-2 border-b border-line-soft px-4", collapsed ? "h-16 justify-center px-2" : "h-[112px]")}>
        <Link to="/jefe" onClick={onNavigate} className="flex min-w-0 flex-1 items-center gap-3">
          <Logo size={collapsed ? 32 : 66} withWordmark={false} />
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[13.5px] font-bold text-ink">Jefe de Área</p>
              <p className="truncate text-[10.5px] text-ink-quiet">{area}</p>
            </div>
          )}
        </Link>
      </div>

      <nav className="scrollbar-none flex-1 overflow-y-auto px-3 py-4">
        {!collapsed && <p className="mb-2 px-2.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink-faint">Mis planes de acción</p>}
        <div className="space-y-1">
          {items.map((item) => (
            <NavLink key={item.to} item={item} collapsed={collapsed} active={isActive(location.pathname, search, item.to)} onNavigate={onNavigate} />
          ))}
        </div>
      </nav>

      {!collapsed && (
        <div className="shrink-0 border-t border-line-soft p-3">
          <SessionExitButton withLabel className="mb-2 w-full justify-start" />
          <Link to="/jefe/perfil" onClick={onNavigate} className="flex items-center gap-3 rounded-2xl bg-surface px-3 py-3 transition-colors hover:bg-surface-2">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-700 text-[13px] font-bold text-white">JA</div>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[13px] font-semibold text-ink">Jefe de {area}</p>
              <p className="mt-0.5 truncate text-[11.5px] text-ink-quiet">Línea 1 · Metro de Lima</p>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

export function JefeShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { user } = useAuth();
  const firstArea = user?.area ?? "Área";

  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(COLLAPSE_KEY) === "1");
  const [mobileOpenPath, setMobileOpenPath] = useState<string | null>(null);
  const mobileOpen = mobileOpenPath === location.pathname;
  const meta = metaFor(location.pathname);
  const { data: configuracion } = useConfiguracion();
  const systemName = nombreSistema(configuracion);

  useEffect(() => {
    localStorage.setItem(COLLAPSE_KEY, collapsed ? "1" : "0");
  }, [collapsed]);

  return (
    <>
      <AdminViewingBanner roleLabel="Jefe de Área" />
      <div className="min-h-screen bg-surface md:flex">
        {/* Desktop sidebar */}
        <aside
          data-print="hide"
          className={cn(
            "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-white transition-[width] duration-200 md:flex",
            collapsed ? "w-[64px]" : "w-[280px]"
          )}
        >
          <SidebarContent collapsed={collapsed} area={firstArea} />
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="absolute -right-3 top-[22px] grid h-5 w-5 place-items-center rounded-full border border-line bg-white text-ink-quiet shadow-sm transition-colors hover:text-brand-700"
            aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
          >
            {collapsed ? <ChevronsRight className="h-3 w-3" /> : <ChevronsLeft className="h-3 w-3" />}
          </button>
        </aside>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div data-print="hide" className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpenPath(null)} aria-hidden />
            <aside className="absolute left-0 top-0 flex h-full w-[280px] flex-col bg-white shadow-xl">
              <SidebarContent collapsed={false} area={firstArea} onNavigate={() => setMobileOpenPath(null)} />
            </aside>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <header data-print="hide" className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur-xl">
            <div className="flex min-h-[78px] items-center gap-3 px-4 py-3 sm:px-6">
              <button
                type="button"
                onClick={() => setMobileOpenPath(location.pathname)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-soft hover:bg-surface hover:text-ink md:hidden"
                aria-label="Abrir menú"
              >
                <Menu className="h-4 w-4" />
              </button>

              <div className="min-w-0">
                <p className="text-[11.5px] font-medium text-ink-quiet">
                  {systemName} <span className="px-1.5 text-ink-faint">›</span> {meta.crumb}
                </p>
                <p className="mt-0.5 truncate font-display text-[19px] font-bold tracking-tight text-ink">{meta.title}</p>
              </div>

              <div className="ml-auto flex items-center gap-2.5">
                <Link to="/jefe" className="grid h-9 w-9 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-surface hover:text-ink" aria-label="Mi Plan">
                  <Calendar className="h-4 w-4" />
                </Link>
                <Link to="/jefe/indicadores" className="grid h-9 w-9 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-surface hover:text-ink" aria-label="Indicadores">
                  <BarChart3 className="h-4 w-4" />
                </Link>
                <AdminPanelSwitcher />
              </div>
            </div>
          </header>

          <main className="w-full max-w-none px-4 py-5 sm:px-6 sm:py-6 lg:px-8">{children}</main>

          <footer className="border-t border-line bg-white">
            <div className="mx-auto flex max-w-[1720px] flex-wrap items-center justify-between gap-3 px-4 py-5 text-[12px] text-ink-quiet sm:px-6">
              <p>{systemName} · Portal del Jefe de Área — Línea 1 del Metro de Lima</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
