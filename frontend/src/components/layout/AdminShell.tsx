import { type ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Building2,
  ChevronsLeft,
  ChevronsRight,
  Cog,
  FileSpreadsheet,
  History,
  MapPin,
  Menu,
  ShieldCheck,
  TrainFront,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { SessionExitButton } from "@/features/auth/SessionExitButton";
import { AdminPanelSwitcher } from "@/features/auth/AdminPanelSwitcher";
import { nombreSistema, useConfiguracion } from "@/features/configuracion/hooks/useConfiguracion";
import { useAuth } from "@/features/auth/auth";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

const COLLAPSE_KEY = "sigma-admin-sidebar-collapsed";

const ITEMS: NavItem[] = [
  { to: "/admin/usuarios", label: "Gestión de Usuarios", icon: Users },
  { to: "/admin/roles", label: "Roles y Permisos", icon: ShieldCheck },
  { to: "/admin/catalogos", label: "Gestión de Áreas", icon: Building2 },
  { to: "/admin/estaciones", label: "Gestión de Estaciones", icon: MapPin },
  { to: "/admin/material-rodante", label: "Material Rodante", icon: TrainFront },
  { to: "/admin/importacion", label: "Importación Histórica", icon: FileSpreadsheet },
];

const NAV_GROUPS = [
  { label: "Administración", items: ITEMS.slice(0, 3) },
  { label: "Operación", items: ITEMS.slice(3) },
  { label: "Sistema", items: [
    { to: "/admin/configuracion", label: "Configuración", icon: Cog },
    { to: "/admin/auditoria", label: "Auditoría", icon: History },
  ] },
];

const TITLES: Record<string, string> = {
  "/admin/usuarios": "Gestión de usuarios",
  "/admin/roles": "Roles y accesos",
  "/admin/catalogos": "Gestión de áreas",
  "/admin/estaciones": "Gestión de estaciones",
  "/admin/material-rodante": "Material rodante",
  "/admin/importacion": "Importación histórica",
  "/admin/auditoria": "Auditoría",
  "/admin/configuracion": "Configuración",
  "/admin/perfil": "Mi perfil",
};

function SidebarContent({ collapsed, onNavigate, systemName }: { collapsed: boolean; onNavigate?: () => void; systemName: string }) {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <>
      <div
        className={cn(
          "flex shrink-0 items-center gap-2 border-b border-line-soft px-4",
          collapsed ? "h-16 justify-center px-2" : "h-[112px]"
        )}
      >
        <Link to="/admin/usuarios" onClick={onNavigate} className="flex min-w-0 flex-1 items-center gap-3">
          <Logo size={collapsed ? 32 : 66} withWordmark={false} />
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <p className="truncate font-display text-[17px] font-bold tracking-tight text-ink">{systemName}</p>
              <p className="mt-0.5 max-w-[130px] text-[11.5px] font-medium leading-[1.2] text-ink-quiet">
                Administración · Metro de Lima
              </p>
            </div>
          )}
        </Link>
      </div>

      <nav aria-label="Navegación de administración" className="scrollbar-none flex-1 space-y-5 overflow-y-auto px-3 py-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            {!collapsed && <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-ink-soft">{group.label}</p>}
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = location.pathname === item.to;
                return <Link key={item.to} to={item.to} onClick={onNavigate} title={collapsed ? item.label : undefined} aria-label={collapsed ? item.label : undefined} aria-current={active ? "page" : undefined}
                  className={cn("flex min-h-10 items-center gap-3 rounded-lg px-3 text-[12.5px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-brand-700", collapsed && "justify-center px-0", active ? "bg-brand-50 font-semibold text-brand-900 ring-1 ring-inset ring-brand-200" : "text-ink-soft hover:bg-surface hover:text-ink")}>
                  <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-brand-700" : "text-ink-quiet")} />
                  {!collapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
                  {active && !collapsed && <span className="h-1.5 w-1.5 rounded-full bg-brand-700" />}
                </Link>;
              })}
            </div>
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="shrink-0 border-t border-line-soft p-3">
          <SessionExitButton withLabel className="mb-3 w-full justify-start" />
          <Link to="/admin/perfil" onClick={onNavigate} className="flex items-center gap-3 rounded-2xl bg-surface px-3 py-3 transition-colors hover:bg-surface-2">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-700 text-[13px] font-bold text-white">{user?.nombre?.charAt(0).toUpperCase() || "A"}</div>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[13px] font-semibold text-ink">{user?.nombre || "Administrador"}</p>
              <p className="mt-0.5 truncate text-[11.5px] text-ink-quiet">Administrador</p>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(COLLAPSE_KEY) === "1");
  const [mobileOpen, setMobileOpen] = useState(false);
  const title = TITLES[location.pathname] ?? "Administrador";
  const { data: configuracion } = useConfiguracion();
  const systemName = nombreSistema(configuracion);

  useEffect(() => {
    localStorage.setItem(COLLAPSE_KEY, collapsed ? "1" : "0");
  }, [collapsed]);

  return (
    <div className="min-h-screen bg-surface md:flex">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-white transition-[width] duration-200 md:flex",
          collapsed ? "w-[64px]" : "w-[256px]"
        )}
      >
        <SidebarContent collapsed={collapsed} systemName={systemName} />
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
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} aria-hidden />
          <aside className="absolute left-0 top-0 flex h-full w-[296px] flex-col bg-white shadow-xl">
            <SidebarContent collapsed={false} systemName={systemName} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur-xl">
          <div className="flex min-h-[78px] items-center gap-3 px-4 py-3 sm:px-6">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-soft hover:bg-surface hover:text-ink md:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="min-w-0">
              <p className="text-[11.5px] font-medium text-ink-quiet">
                {systemName} <span className="px-1.5 text-ink-faint">›</span> Administrador
              </p>
              <p className="mt-0.5 truncate font-display text-[19px] font-bold tracking-tight text-ink">{title}</p>
            </div>
            <div className="ml-auto">
              <AdminPanelSwitcher />
            </div>
          </div>
        </header>

        <main className="w-full max-w-none px-4 py-5 sm:px-6 sm:py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
