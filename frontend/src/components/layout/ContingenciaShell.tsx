import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronsLeft, ChevronsRight, ClipboardList, Database, History, Menu, Plus, type LucideIcon } from "lucide-react";
import { SessionExitButton } from "@/features/auth/SessionExitButton";
import { AdminViewingBanner } from "@/features/auth/AdminViewingBanner";
import { AdminPanelSwitcher } from "@/features/auth/AdminPanelSwitcher";
import { useAuth } from "@/features/auth/auth";
import { Logo } from "@/components/brand/Logo";
import { nombreSistema, useConfiguracion } from "@/features/configuracion/hooks/useConfiguracion";
import { cn } from "@/lib/utils";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

const COLLAPSE_KEY = "sigma-contingencias-sidebar-collapsed";

const NAV: NavItem[] = [
  { to: "/contingencias/registro", label: "Registro", icon: ClipboardList },
  { to: "/contingencias/historial", label: "Historial", icon: History },
  { to: "/contingencias/indicadores", label: "Indicadores", icon: Plus },
  { to: "/contingencias/datos-operativos", label: "Datos Operativos", icon: Database },
];

const TITLES: Record<string, { title: string; crumb: string }> = {
  "/contingencias/registro": { title: "Registro", crumb: "Inicio / Registro" },
  "/contingencias/historial": { title: "Historial", crumb: "Inicio / Historial" },
  "/contingencias/indicadores": { title: "Indicadores", crumb: "Inicio / Indicadores" },
  "/contingencias/datos-operativos": { title: "Datos Operativos", crumb: "Inicio / Datos Operativos" },
  "/contingencias/perfil": { title: "Mi perfil", crumb: "Inicio / Perfil" },
};

function isActive(pathname: string, to: string) {
  if (to === "/contingencias/historial") {
    return pathname.startsWith(to) || pathname.startsWith("/contingencias/evento/") || pathname.startsWith("/contingencias/editar/");
  }
  return to === "/contingencias/registro" ? pathname === to : pathname.startsWith(to);
}

function metaFor(pathname: string) {
  if (pathname.startsWith("/contingencias/evento/")) return { title: "Detalle del evento", crumb: "Inicio / Historial / Detalle" };
  if (pathname.startsWith("/contingencias/editar/")) return { title: "Editar evento", crumb: "Inicio / Historial / Editar" };
  return TITLES[pathname] ?? TITLES["/contingencias/registro"];
}

function NavItemLink({ item, collapsed, onNavigate }: { item: NavItem; collapsed: boolean; onNavigate?: () => void }) {
  const location = useLocation();
  const active = isActive(location.pathname, item.to);

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
    </Link>
  );
}

function SidebarContent({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const { user } = useAuth();
  const nombre = user?.nombre?.trim() || "Contingencias";
  const inicial = nombre.charAt(0).toUpperCase() || "C";

  return (
    <>
      <div className={cn("flex shrink-0 items-center gap-2 border-b border-line-soft px-4", collapsed ? "h-16 justify-center px-2" : "h-[112px]")}>
        <Link to="/contingencias/registro" onClick={onNavigate} className="flex min-w-0 flex-1 items-center gap-3">
          <Logo size={collapsed ? 32 : 66} withWordmark={false} />
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[13.5px] font-bold text-ink">Contingencias</p>
              <p className="truncate text-[10.5px] text-ink-quiet">Planes de Contingencia</p>
            </div>
          )}
        </Link>
      </div>

      <nav aria-label="Navegación de contingencias" className="scrollbar-none flex-1 overflow-y-auto px-3 py-4">
        {!collapsed && <p className="mb-2 px-2.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink-faint">Gestión</p>}
        <div className="space-y-1">
          {NAV.map((item) => (
            <NavItemLink key={item.to} item={item} collapsed={collapsed} onNavigate={onNavigate} />
          ))}
        </div>
      </nav>

      {!collapsed && (
        <div className="shrink-0 border-t border-line-soft p-3">
          <SessionExitButton withLabel className="mb-2 w-full justify-start" />
          <Link to="/contingencias/perfil" onClick={onNavigate} className="flex items-center gap-3 rounded-2xl bg-surface px-3 py-3 transition-colors hover:bg-surface-2">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-700 text-[13px] font-bold text-white">{inicial}</div>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[13px] font-semibold text-ink">{nombre}</p>
              <p className="mt-0.5 truncate text-[11.5px] text-ink-quiet">Línea 1 · Metro de Lima</p>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

export function ContingenciaShell({ children }: { children: ReactNode }) {
  const location = useLocation();
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
      <AdminViewingBanner roleLabel="Gestión de Planes de Contingencia" />
      <div className="min-h-screen bg-surface md:flex">
      <aside
        data-print="hide"
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-white transition-[width] duration-200 md:flex",
          collapsed ? "w-[64px]" : "w-[264px]"
        )}
      >
        <SidebarContent collapsed={collapsed} />
        <button
          type="button"
          onClick={() => setCollapsed((current) => !current)}
          className="absolute -right-3 top-[22px] grid h-5 w-5 place-items-center rounded-full border border-line bg-white text-ink-quiet shadow-sm transition-colors hover:text-brand-700"
          aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
        >
          {collapsed ? <ChevronsRight className="h-3 w-3" /> : <ChevronsLeft className="h-3 w-3" />}
        </button>
      </aside>

      {mobileOpen && (
        <div data-print="hide" className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpenPath(null)} aria-hidden />
          <aside className="absolute left-0 top-0 flex h-full w-[264px] flex-col bg-white shadow-xl">
            <SidebarContent collapsed={false} onNavigate={() => setMobileOpenPath(null)} />
          </aside>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <header data-print="hide" className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur-xl">
          <div className="flex min-h-[64px] items-center gap-3 px-4 py-2.5 sm:px-6">
            <button
              type="button"
              aria-label="Abrir menú"
              onClick={() => setMobileOpenPath(location.pathname)}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-soft hover:bg-surface hover:text-ink md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="min-w-0">
              <p className="text-[11.5px] font-medium text-ink-quiet">
                {systemName} <span className="px-1.5 text-ink-faint">›</span> {meta.crumb}
              </p>
              <p className="mt-0.5 truncate font-display text-[19px] font-bold tracking-tight text-ink">{meta.title}</p>
            </div>
            <div className="ml-auto">
              <AdminPanelSwitcher />
            </div>
          </div>
        </header>
        <main className="w-full max-w-none px-4 py-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
    </>
  );
}
