import { type ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ClipboardCheck,
  Clock,
  FileText,
  Folder,
  Gavel,
  Home,
  LayoutDashboard,
  Menu,
  Rocket,
  Search,
  Timer,
  UserCircle2,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";
import { useCases } from "@/features/cases/hooks/useCases";
import { toCaseRow } from "@/features/cases/adapter";
import { CASE_FILTERS, countByFilter, filterHref, type CaseFilterId } from "@/features/cases/lib/filters";

interface NavLink {
  to: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  match: (pathname: string, search: string) => boolean;
}

interface NavGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  defaultOpen: boolean;
  links: NavLink[];
}

const COLLAPSE_KEY = "sigma-so-sidebar-collapsed";
const PILL_ID = "so-sidebar-active-pill";

// Presentación de cada filtro de la bandeja en el menú lateral. Las etiquetas y
// el criterio de filtrado viven en features/cases/lib/filters.ts: aquí solo se
// decide el icono y si el filtro lleva contador de pendientes.
const FILTER_NAV: Record<CaseFilterId, { icon: LucideIcon; badge: boolean }> = {
  todos: { icon: Folder, badge: false },
  nuevos: { icon: FileText, badge: true },
  pendientes: { icon: Clock, badge: true },
  investigacion: { icon: Activity, badge: true },
  proceso: { icon: Rocket, badge: true },
  prorrogas: { icon: Timer, badge: true },
  verificacion: { icon: ClipboardCheck, badge: true },
  cerrados: { icon: CheckCircle2, badge: false },
};

export function SeguridadOperativaShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(COLLAPSE_KEY) === "1");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: rawCases } = useCases({});

  useEffect(() => {
    localStorage.setItem(COLLAPSE_KEY, collapsed ? "1" : "0");
  }, [collapsed]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  // Los contadores usan exactamente el mismo predicado que la pestaña a la que
  // enlaza cada botón, así que el número del badge y lo que abre el filtro
  // siempre coinciden.
  const counts = countByFilter((rawCases ?? []).map(toCaseRow));

  const groups: NavGroup[] = [
    {
      id: "inicio",
      label: "Inicio",
      icon: Home,
      defaultOpen: true,
      links: [
        { to: "/seguridad", label: "Dashboard Ejecutivo", icon: LayoutDashboard, match: (p) => p === "/seguridad" },
        { to: "/seguridad/decisiones", label: "Centro de Decisiones", icon: Gavel, match: (p) => p === "/seguridad/decisiones" },
        { to: "/seguridad/alertas", label: "Alertas", icon: AlertTriangle, match: (p) => p === "/seguridad/alertas" },
      ],
    },
    {
      id: "gestion-reportes",
      label: "Gestión de Reportes",
      icon: Folder,
      defaultOpen: true,
      links: CASE_FILTERS.filter((f) => f.sidebar).map((f) => {
        const nav = FILTER_NAV[f.id];
        return {
          to: filterHref(f.id),
          label: f.label,
          icon: nav.icon,
          badge: nav.badge ? counts[f.id] || undefined : undefined,
          // Se compara el parámetro y no la querystring completa para que el
          // enlace siga marcándose activo aunque la bandeja lleve búsqueda.
          match: (p: string, s: string) =>
            p === "/seguridad/casos" && (new URLSearchParams(s).get("filtro") ?? "todos") === f.id,
        };
      }),
    },
    {
      id: "reportes",
      label: "Reportes",
      icon: BarChart3,
      defaultOpen: false,
      links: [{ to: "/seguridad/reportes", label: "Indicadores y Estadísticas", icon: BarChart3, match: (p) => p === "/seguridad/reportes" }],
    },
  ];

  const standaloneLinks: NavLink[] = [
    { to: "/seguridad/usuarios", label: "Administración de Usuarios", icon: Users, match: (p) => p === "/seguridad/usuarios" },
    { to: "/seguridad/notificaciones", label: "Notificaciones", icon: Bell, match: (p) => p === "/seguridad/notificaciones" },
    { to: "/seguridad/perfil", label: "Mi Perfil", icon: UserCircle2, match: (p) => p === "/seguridad/perfil" },
  ];

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.map((g) => [g.id, g.defaultOpen]))
  );

  const toggleGroup = (id: string) => setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));

  const renderLink = (link: NavLink, onNavigate?: () => void) => {
    const active = link.match(location.pathname, location.search);
    return (
      <Link
        key={link.to}
        to={link.to}
        onClick={onNavigate}
        title={collapsed ? link.label : undefined}
        className={cn(
          "relative flex h-8 items-center gap-2 rounded-lg pl-1.5 pr-2 text-[12.5px] font-medium",
          collapsed && "justify-center px-0"
        )}
      >
        {active && (
          <motion.span
            layoutId={PILL_ID}
            className="absolute inset-0 rounded-lg bg-brand-50"
            transition={{ type: "spring", stiffness: 520, damping: 38 }}
          />
        )}
        <span
          className={cn(
            "relative z-10 grid h-5 w-5 shrink-0 place-items-center rounded-md transition-colors",
            active ? "bg-brand-600 text-white" : "text-ink-faint"
          )}
        >
          <link.icon className="h-3.5 w-3.5" strokeWidth={active ? 2.25 : 2} />
        </span>
        {!collapsed && (
          <span className={cn("relative z-10 min-w-0 flex-1 truncate", active ? "font-semibold text-brand-800" : "text-ink-soft")}>
            {link.label}
          </span>
        )}
        {!collapsed && link.badge ? (
          <span className="relative z-10 grid h-[17px] min-w-[17px] shrink-0 place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold tabular-nums text-white">
            {link.badge}
          </span>
        ) : null}
      </Link>
    );
  };

  const sidebarContent = (onNavigate?: () => void) => (
    <>
      <div className={cn("flex h-14 shrink-0 items-center justify-between border-b border-line px-3.5", collapsed && "justify-center px-2")}>
        <Link to="/seguridad" onClick={onNavigate} className="min-w-0">
          <Logo size={26} withWordmark={!collapsed} />
        </Link>
        {onNavigate && (
          <button
            type="button"
            onClick={onNavigate}
            className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-ink-soft hover:bg-surface hover:text-ink md:hidden"
            aria-label="Cerrar menú"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-2.5 py-3">
        {!collapsed && (
          <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-faint">Dashboard Ejecutivo</p>
        )}

        {groups.map((group, idx) => {
          const open = collapsed || openGroups[group.id];
          return (
            <div key={group.id} className={cn("mb-1", idx === groups.length - 1 && "mb-0")}>
              <button
                type="button"
                onClick={() => (collapsed ? undefined : toggleGroup(group.id))}
                title={collapsed ? group.label : undefined}
                className={cn(
                  "flex h-8 w-full items-center gap-2 rounded-lg px-2 text-[12.5px] font-semibold text-ink transition-colors hover:bg-surface",
                  collapsed && "justify-center px-0"
                )}
              >
                <group.icon className="h-4 w-4 shrink-0 text-ink-soft" />
                {!collapsed && (
                  <>
                    <span className="min-w-0 flex-1 truncate text-left">{group.label}</span>
                    <ChevronDown className={cn("h-3 w-3 shrink-0 text-ink-faint transition-transform", open && "rotate-180")} />
                  </>
                )}
              </button>

              {open && (
                <div className={cn("mt-0.5 space-y-0.5", !collapsed && "pl-1")}>{group.links.map((link) => renderLink(link, onNavigate))}</div>
              )}
            </div>
          );
        })}

        <div className={cn("mt-3 space-y-0.5 border-t border-line-soft pt-3", collapsed && "border-t-0 pt-1")}>
          {standaloneLinks.map((link) => renderLink(link, onNavigate))}
        </div>
      </nav>

      <div className={cn("shrink-0 border-t border-line p-2.5", collapsed && "px-2")}>
        <Link
          to="/seguridad/perfil"
          onClick={onNavigate}
          className={cn("flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-surface", collapsed && "justify-center")}
        >
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-100 text-[10.5px] font-bold text-brand-800">AR</div>
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[12px] font-semibold text-ink">Analista SO</p>
              <p className="truncate text-[10.5px] text-ink-quiet">Seguridad Operativa</p>
            </div>
          )}
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-surface md:flex">
      {/* Desktop sidebar */}
      <aside
        data-print="hide"
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-white transition-[width] duration-200 md:flex",
          collapsed ? "w-[64px]" : "w-[248px]"
        )}
      >
        {sidebarContent()}
        <button
          type="button"
          data-print="hide"
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
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} aria-hidden />
          <aside className="absolute left-0 top-0 flex h-full w-[248px] flex-col bg-white shadow-xl">
            {sidebarContent(() => setMobileOpen(false))}
          </aside>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <header data-print="hide" className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur-xl">
          <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-soft hover:bg-surface hover:text-ink md:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="h-4 w-4" />
            </button>

            <div className="flex h-8 min-w-0 max-w-md flex-1 items-center gap-2 rounded-lg border border-line bg-surface px-2.5">
              <Search className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
              <input
                placeholder="Buscar caso por código, título o estación…"
                className="w-full min-w-0 bg-transparent text-[12.5px] outline-none placeholder:text-ink-faint"
              />
            </div>

            <div className="ml-auto flex items-center gap-2.5">
              <Link
                to="/seguridad/notificaciones"
                className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-surface hover:text-ink"
                aria-label="Notificaciones"
              >
                <Bell className="h-4 w-4" />
              </Link>
              <Link to="/seguridad/perfil" className="flex items-center gap-1.5 rounded-lg py-1 pl-1 pr-1.5 hover:bg-surface">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-100 text-[10.5px] font-bold text-brand-800">
                  AR
                </div>
                <span className="hidden text-[12.5px] font-medium text-ink sm:block">Analista SO</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1240px] px-4 py-5 sm:px-6 sm:py-6">{children}</main>
      </div>
    </div>
  );
}
