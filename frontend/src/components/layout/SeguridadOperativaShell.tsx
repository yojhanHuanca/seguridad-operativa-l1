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
  Download,
  ExternalLink,
  FilePlus2,
  Folder,
  Gauge,
  Home,
  LayoutDashboard,
  Menu,
  PieChart,
  Radar,
  Rocket,
  ShieldAlert,
  Timer,
  UserCircle2,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SessionExitButton } from "@/features/auth/SessionExitButton";
import { AdminPanelSwitcher } from "@/features/auth/AdminPanelSwitcher";
import { AdminViewingBanner } from "@/features/auth/AdminViewingBanner";
import { useAuth } from "@/features/auth/auth";
import { Logo } from "@/components/brand/Logo";
import { useCases } from "@/features/cases/hooks/useCases";
import { toCaseRow } from "@/features/cases/adapter";
import { CASE_FILTERS, countByFilter, filterHref, type CaseFilterId } from "@/features/cases/lib/filters";
import { useCurrentSoUser } from "@/features/users/hooks/useCurrentSoUser";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { useEventosAsignados } from "@/features/eventos/hooks/useEventos";

interface NavLink {
  to: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  badgeTone?: "brand" | "danger" | "neutral";
  match: (pathname: string, search: string) => boolean;
  /** Enlace externo: se abre en pestaña nueva y nunca se marca como activo. */
  external?: boolean;
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
  nuevos: { icon: FilePlus2, badge: true },
  pendientes: { icon: Clock, badge: true },
  investigacion: { icon: Activity, badge: true },
  proceso: { icon: Rocket, badge: true },
  prorrogas: { icon: Timer, badge: true },
  verificacion: { icon: ClipboardCheck, badge: true },
  cerrados: { icon: CheckCircle2, badge: true },
};

export function SeguridadOperativaShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(COLLAPSE_KEY) === "1");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: rawCases } = useCases({});
  const { data: notifications } = useNotifications();

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
  const activeFilterId = new URLSearchParams(location.search).get("filtro") ?? "todos";
  const activeFilter = CASE_FILTERS.find((f) => f.id === activeFilterId);
  const currentPageTitle = getPageTitle(location.pathname);
  const currentSection =
    location.pathname === "/seguridad/casos" ? activeFilter?.label ?? "Gestión de Reportes" : currentPageTitle;
  // Dos contadores distintos porque son dos cosas distintas: el de Alertas
  // cuenta casos que esperan una decisión (estado), el de Notificaciones
  // cuenta avisos sin leer (eventos). Antes ambos badges mostraban este mismo
  // número y hacían pensar que las dos secciones tenían el mismo contenido.
  const pendingDecisions = counts.nuevos + counts.pendientes + counts.prorrogas + counts.verificacion;
  const unreadNotifications = notifications?.no_leidas ?? 0;
  const currentSoUser = useCurrentSoUser();
  const { nombre: userName, cargo: userRole, iniciales: userInitials, user: soUser } = currentSoUser;
  const { data: eventosAsignados } = useEventosAsignados(soUser?.id_usuario);
  const eventosAsignadosPendientes = (eventosAsignados ?? []).filter((e) => !e.id_caso_creado).length;

  const groups: NavGroup[] = [
    {
      id: "inicio",
      label: "Inicio",
      icon: Home,
      defaultOpen: true,
      links: [
        { to: "/seguridad", label: "Dashboard Ejecutivo", icon: LayoutDashboard, match: (p) => p === "/seguridad" },
        {
          to: "/seguridad/eventos-asignados",
          label: "Eventos asignados",
          icon: ShieldAlert,
          badge: eventosAsignadosPendientes || undefined,
          badgeTone: "danger",
          match: (p) => p === "/seguridad/eventos-asignados",
        },
        { to: "/seguridad/alertas", label: "Alertas", icon: AlertTriangle, badge: pendingDecisions || undefined, badgeTone: "neutral", match: (p) => p === "/seguridad/alertas" },
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
      label: "Indicadores",
      icon: BarChart3,
      defaultOpen: true,
      links: [
        { to: "/seguridad/reportes/kpis", label: "KPIs", icon: Gauge, match: (p) => p === "/seguridad/reportes" || p === "/seguridad/reportes/kpis" },
        { to: "/seguridad/reportes/estadisticas", label: "Estadísticas", icon: PieChart, match: (p) => p === "/seguridad/reportes/estadisticas" },
        { to: "/seguridad/reportes/exportar", label: "Exportar", icon: Download, match: (p) => p === "/seguridad/reportes/exportar" },
      ],
    },
  ];

  const standaloneLinks: NavLink[] = [
    { to: "https://sofia.lineauno.pe/", label: "SOFIA", icon: ExternalLink, external: true, match: () => false },
    { to: "/seguridad/notificaciones", label: "Notificaciones", icon: Bell, badge: unreadNotifications || undefined, badgeTone: "danger", match: (p) => p === "/seguridad/notificaciones" },
    { to: "/seguridad/perfil", label: "Mi Perfil", icon: UserCircle2, match: (p) => p === "/seguridad/perfil" },
  ];

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.map((g) => [g.id, g.defaultOpen]))
  );

  const toggleGroup = (id: string) => setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));

  const renderLink = (link: NavLink, onNavigate?: () => void) => {
    const active = link.match(location.pathname, location.search);
    const className = cn(
      "group relative flex h-10 items-center gap-2 rounded-xl pl-2 pr-2.5 text-[13px] font-medium transition-colors hover:bg-surface",
      collapsed && "justify-center px-0"
    );
    const content = (
      <>
        {active && (
          <motion.span
            layoutId={PILL_ID}
            className="absolute inset-0 rounded-xl bg-brand-50"
            transition={{ type: "spring", stiffness: 520, damping: 38 }}
          />
        )}
        <span
          className={cn(
            "relative z-10 grid h-5 w-5 shrink-0 place-items-center rounded-md transition-colors",
            active ? "bg-brand-600 text-white" : "text-ink-faint group-hover:text-ink-soft"
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
          <span
            className={cn(
              "relative z-10 grid h-[20px] min-w-[20px] shrink-0 place-items-center rounded-full px-1.5 text-[10.5px] font-semibold tabular-nums",
              active
                ? "bg-brand-200 text-brand-900"
                : link.badgeTone === "danger"
                  ? "bg-critical text-white"
                  : link.badgeTone === "neutral"
                    ? "bg-surface-2 text-ink-quiet"
                    : "bg-brand-100 text-brand-700"
            )}
          >
            {link.badge}
          </span>
        ) : null}
      </>
    );

    if (link.external) {
      return (
        <a key={link.to} href={link.to} target="_blank" rel="noreferrer" onClick={onNavigate} title={collapsed ? link.label : undefined} className={className}>
          {content}
        </a>
      );
    }

    return (
      <Link key={link.to} to={link.to} onClick={onNavigate} title={collapsed ? link.label : undefined} className={className}>
        {content}
      </Link>
    );
  };

  const sidebarContent = (onNavigate?: () => void) => (
    <>
      <div
        className={cn(
          "flex shrink-0 items-center justify-between border-b border-line px-4",
          collapsed ? "h-16 justify-center px-2" : "h-[112px]"
        )}
      >
        <Link to="/seguridad" onClick={onNavigate} className={cn("min-w-0", !collapsed && "flex items-center gap-3")}>
          <Logo size={collapsed ? 32 : 66} withWordmark={false} />
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <p className="font-display text-[17px] font-bold tracking-tight text-ink">
                SIGMA<span className="text-brand-600"> L1</span>
              </p>
              <p className="mt-0.5 max-w-[130px] text-[11.5px] font-medium leading-[1.2] text-ink-quiet">
                Seguridad Operativa · Metro de Lima
              </p>
            </div>
          )}
        </Link>
        <div className="flex shrink-0 items-center gap-1">
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
      </div>

      <nav className="scrollbar-none flex-1 overflow-y-auto overscroll-contain px-3 py-4">
        {!collapsed && (
          <p className="mb-3 px-1.5 text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-faint">
            {currentSection}
          </p>
        )}

        {groups.map((group, idx) => {
          const open = collapsed || openGroups[group.id];
          const groupActive = group.links.some((link) => link.match(location.pathname, location.search));
          return (
            <div key={group.id} className={cn("mb-2", idx === groups.length - 1 && "mb-0")}>
              <button
                type="button"
                onClick={() => (collapsed ? undefined : toggleGroup(group.id))}
                title={collapsed ? group.label : undefined}
                className={cn(
                  "flex h-10 w-full items-center gap-2 rounded-xl px-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-surface",
                  groupActive && "bg-surface",
                  collapsed && "justify-center px-0"
                )}
              >
                <group.icon className={cn("h-4 w-4 shrink-0", groupActive ? "text-brand-700" : "text-ink-soft")} />
                {!collapsed && (
                  <>
                    <span className="min-w-0 flex-1 truncate text-left">{group.label}</span>
                    <ChevronDown className={cn("h-3 w-3 shrink-0 text-ink-faint transition-transform", open && "rotate-180")} />
                  </>
                )}
              </button>

              {open && (
                <div className={cn("mt-1 space-y-1", !collapsed && "ml-[18px] border-l border-line-soft pl-3")}>
                  {group.links.map((link) => renderLink(link, onNavigate))}
                </div>
              )}
            </div>
          );
        })}

        <div className={cn("mt-4 space-y-1 border-t border-line-soft pt-4", collapsed && "border-t-0 pt-1")}>
          {standaloneLinks.map((link) => renderLink(link, onNavigate))}
        </div>
      </nav>

      <div className={cn("shrink-0 border-t border-line bg-white p-3", collapsed && "px-2")}>
        <Link
          to="/seguridad/perfil"
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-2xl bg-surface px-3 py-3 transition-colors hover:bg-brand-50",
            collapsed && "justify-center rounded-xl px-0"
          )}
        >
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-700 text-[13px] font-bold text-white">{userInitials}</div>
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[13px] font-semibold text-ink">{userName}</p>
              <p className="mt-0.5 truncate text-[11.5px] text-ink-quiet">{userRole}</p>
            </div>
          )}
        </Link>
      </div>
    </>
  );

  return (
    <>
      <AdminViewingBanner roleLabel="Seguridad Operativa" />
      <div className="min-h-screen bg-surface md:flex">
      {/* Desktop sidebar */}
      <aside
        data-print="hide"
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-white transition-[width] duration-200 md:flex",
          collapsed ? "w-[64px]" : "w-[296px]"
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
          <aside className="absolute left-0 top-0 flex h-full w-[296px] flex-col bg-white shadow-xl">
            {sidebarContent(() => setMobileOpen(false))}
          </aside>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <header data-print="hide" className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur-xl">
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
                SIGMA L1 <span className="px-1.5 text-ink-faint">›</span> {getBreadcrumb(location.pathname)}
              </p>
              <p className="mt-0.5 truncate font-display text-[19px] font-bold tracking-tight text-ink">{currentPageTitle}</p>
            </div>

            <div className="ml-auto flex items-center gap-2.5">
              {user?.es_responsable && (
                <Link
                  to="/monitoreo"
                  className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-surface hover:text-ink"
                  aria-label="Ir a Monitoreo"
                  title="Ir a Monitoreo"
                >
                  <Radar className="h-4 w-4" />
                </Link>
              )}
              <AdminPanelSwitcher />
              <SessionExitButton />
              <Link
                to="/seguridad/notificaciones"
                className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-surface hover:text-ink"
                aria-label="Notificaciones"
              >
                <Bell className="h-4 w-4" />
              </Link>
              <Link to="/seguridad/perfil" className="flex items-center gap-1.5 rounded-lg py-1 pl-1 pr-1.5 hover:bg-surface">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-100 text-[10.5px] font-bold text-brand-800">
                  {userInitials}
                </div>
                <span className="hidden text-[12.5px] font-medium text-ink sm:block">{userName}</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="w-full max-w-none px-4 py-5 sm:px-6 sm:py-6 lg:px-8">{children}</main>
      </div>
      </div>
    </>
  );
}

function getPageTitle(pathname: string) {
  if (pathname === "/seguridad") return "Dashboard Ejecutivo";
  if (pathname.startsWith("/seguridad/casos")) return "Gestión de Casos";
  if (pathname === "/seguridad/eventos-asignados") return "Eventos asignados";
  if (pathname === "/seguridad/alertas") return "Alertas";
  if (pathname === "/seguridad/reportes" || pathname === "/seguridad/reportes/kpis") return "KPIs";
  if (pathname === "/seguridad/reportes/estadisticas") return "Estadísticas";
  if (pathname === "/seguridad/reportes/exportar") return "Exportar Reportes";
  if (pathname === "/seguridad/usuarios") return "Administración de Usuarios";
  if (pathname === "/seguridad/notificaciones") return "Notificaciones";
  if (pathname === "/seguridad/perfil") return "Mi Perfil";
  return "Seguridad Operativa";
}

function getBreadcrumb(pathname: string) {
  if (pathname === "/seguridad") return "Inicio";
  if (pathname.startsWith("/seguridad/casos")) return "Inicio / Casos";
  if (pathname === "/seguridad/eventos-asignados") return "Inicio / Eventos asignados";
  if (pathname === "/seguridad/alertas") return "Inicio / Alertas";
  if (pathname === "/seguridad/reportes" || pathname === "/seguridad/reportes/kpis") return "Inicio / Reportes / KPIs";
  if (pathname === "/seguridad/reportes/estadisticas") return "Inicio / Reportes / Estadísticas";
  if (pathname === "/seguridad/reportes/exportar") return "Inicio / Reportes / Exportar";
  if (pathname === "/seguridad/usuarios") return "Inicio / Usuarios";
  if (pathname === "/seguridad/notificaciones") return "Inicio / Notificaciones";
  if (pathname === "/seguridad/perfil") return "Inicio / Perfil";
  return "Inicio";
}
