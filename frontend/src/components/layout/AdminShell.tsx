import { type ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronsLeft,
  ChevronsRight,
  Cog,
  History,
  ListTree,
  Menu,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

const COLLAPSE_KEY = "sigma-admin-sidebar-collapsed";

const ITEMS: NavItem[] = [
  { to: "/admin/usuarios", label: "Usuarios y roles", icon: Users },
  { to: "/admin/catalogos", label: "Catálogos", icon: ListTree },
  { to: "/admin/auditoria", label: "Auditoría", icon: History },
  { to: "/admin/configuracion", label: "Configuración", icon: Cog },
];

const TITLES: Record<string, string> = {
  "/admin/usuarios": "Usuarios y roles",
  "/admin/catalogos": "Catálogos",
  "/admin/auditoria": "Auditoría",
  "/admin/configuracion": "Configuración",
};

function SidebarContent({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const location = useLocation();

  return (
    <>
      <Link
        to="/admin/usuarios"
        onClick={onNavigate}
        className={cn("flex h-[78px] shrink-0 items-center gap-3 border-b border-line-soft px-4", collapsed && "justify-center px-2")}
      >
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
          <ShieldCheck className="h-4.5 w-4.5" />
        </div>
        {!collapsed && (
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[13.5px] font-bold text-ink">Administrador</p>
            <p className="truncate text-[10.5px] text-ink-quiet">SIGMA L1</p>
          </div>
        )}
      </Link>

      <nav className="scrollbar-none flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {ITEMS.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
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
          })}
        </div>
      </nav>

      {!collapsed && (
        <div className="shrink-0 border-t border-line-soft p-3">
          <div className="flex items-center gap-3 rounded-2xl bg-surface px-3 py-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-700 text-[13px] font-bold text-white">A</div>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[13px] font-semibold text-ink">Administrador</p>
              <p className="mt-0.5 truncate text-[11.5px] text-ink-quiet">Línea 1 · Metro de Lima</p>
            </div>
          </div>
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

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-surface md:flex">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-white transition-[width] duration-200 md:flex",
          collapsed ? "w-[64px]" : "w-[264px]"
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
          <aside className="absolute left-0 top-0 flex h-full w-[264px] flex-col bg-white shadow-xl">
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
            <div className="ml-auto hidden items-center gap-2.5 sm:flex">
              <Logo size={28} withWordmark={false} />
            </div>
          </div>
        </header>

        <main className="w-full max-w-none px-4 py-5 sm:px-6 sm:py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
