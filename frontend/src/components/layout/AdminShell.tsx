import { type ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Building2,
  ChevronDown,
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

const TITLES: Record<string, string> = {
  "/admin/usuarios": "Gestión de usuarios",
  "/admin/roles": "Roles y accesos",
  "/admin/catalogos": "Gestión de áreas",
  "/admin/estaciones": "Gestión de estaciones",
  "/admin/material-rodante": "Material rodante",
  "/admin/importacion": "Importación histórica",
  "/admin/auditoria": "Auditoría",
  "/admin/configuracion": "Configuración",
};

function SidebarContent({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const location = useLocation();

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
              <p className="font-display text-[17px] font-bold tracking-tight text-ink">
                SIGMA<span className="text-brand-600"> L1</span>
              </p>
              <p className="mt-0.5 max-w-[130px] text-[11.5px] font-medium leading-[1.2] text-ink-quiet">
                Administración · Metro de Lima
              </p>
            </div>
          )}
        </Link>
      </div>

      <nav className="scrollbar-none flex-1 overflow-y-auto px-3 py-4">
        {!collapsed && <p className="mb-3 px-2 text-[10px] font-semibold uppercase text-ink-faint">Gestión de usuarios</p>}
        <div className="rounded-lg bg-surface px-2 py-2">
          <div className={cn("mb-1 flex h-8 items-center gap-3 px-1 text-[13px] font-semibold text-ink", collapsed && "justify-center")}>
            <Cog className="h-4.5 w-4.5 text-brand-700" />
            {!collapsed && <><span className="flex-1">Gestión</span><ChevronDown className="h-3.5 w-3.5 text-ink-faint" /></>}
          </div>
          <div className={cn("space-y-0.5", !collapsed && "ml-3 border-l border-line pl-2")}>
          {ITEMS.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onNavigate}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex min-h-10 items-center gap-3 rounded-lg px-2.5 text-[12.5px] font-medium transition-colors",
                  collapsed && "justify-center px-0",
                  active ? "bg-brand-50 font-semibold text-brand-800 ring-1 ring-inset ring-brand-600" : "text-ink-soft hover:bg-white hover:text-ink"
                )}
              >
                <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-brand-700" : "text-ink-faint")} />
                {!collapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
              </Link>
            );
          })}
          </div>
        </div>

        <Link to="/admin/configuracion" onClick={onNavigate} className="mt-3 flex h-10 items-center gap-3 rounded-lg px-2.5 text-[12.5px] font-medium text-ink-soft hover:bg-surface hover:text-ink">
          <Cog className="h-4 w-4 text-ink-faint" />{!collapsed && <><span className="flex-1">Configuración</span><ChevronDown className="h-3.5 w-3.5" /></>}
        </Link>
        <div className="my-3 border-t border-line-soft" />
        <Link to="/admin/auditoria" onClick={onNavigate} className="flex h-10 items-center gap-3 rounded-lg px-2.5 text-[12.5px] font-medium text-ink-soft hover:bg-surface hover:text-ink">
          <History className="h-4 w-4 text-ink-faint" />{!collapsed && <span>Auditoría</span>}
        </Link>
      </nav>

      {!collapsed && (
        <div className="shrink-0 border-t border-line-soft p-3">
          <SessionExitButton withLabel className="mb-3 w-full justify-start" />
          <Link to="/admin/perfil" onClick={onNavigate} className="flex items-center gap-3 rounded-2xl bg-surface px-3 py-3 transition-colors hover:bg-surface-2">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-700 text-[13px] font-bold text-white">A</div>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[13px] font-semibold text-ink">Administrador</p>
              <p className="mt-0.5 truncate text-[11.5px] text-ink-quiet">Acceso Total</p>
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

  useEffect(() => {
    localStorage.setItem(COLLAPSE_KEY, collapsed ? "1" : "0");
  }, [collapsed]);

  return (
    <div className="min-h-screen bg-surface md:flex">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-white transition-[width] duration-200 md:flex",
          collapsed ? "w-[64px]" : "w-[296px]"
        )}
      >
        <SidebarContent collapsed={collapsed} />
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
            <SidebarContent collapsed={false} onNavigate={() => setMobileOpen(false)} />
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
                SIGMA L1 <span className="px-1.5 text-ink-faint">›</span> Administrador
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
