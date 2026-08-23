import { type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SessionExitButton } from "@/features/auth/SessionExitButton";
import { AdminPanelSwitcher } from "@/features/auth/AdminPanelSwitcher";
import { AdminViewingBanner } from "@/features/auth/AdminViewingBanner";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/auth";
import { useReports } from "@/features/reports/hooks/useReports";
import { nombreSistema, useConfiguracionPublica } from "@/features/configuracion/hooks/useConfiguracion";

const NAV: { to: string; label: string }[] = [
  { to: "/reportes", label: "Inicio" },
  { to: "/reportes/nuevo", label: "Nuevo reporte" },
  { to: "/reportes/mis-reportes", label: "Mis reportes" },
  { to: "/reportes/notificaciones", label: "Notificaciones" },
];

// Sin cuenta, el seguimiento es por código (ConsultarReportePage), no por
// "Mis reportes" — reemplaza ese ítem en vez de dejar al anónimo sin nada.
const NAV_ANONIMO: { to: string; label: string }[] = [
  { to: "/reportes/nuevo", label: "Nuevo reporte" },
  { to: "/reportes/consulta", label: "Consultar mi reporte" },
];

export function ReportanteShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  // Quien reporta sin cuenta (QR/URL pública) llega a esta misma cáscara —
  // /reports exige sesión, así que no se pide si no hay una: antes esa
  // llamada devolvía 401 y el interceptor global mandaba a /login incluso
  // en la página que se supone es pública.
  const { token } = useAuth();
  const estaAutenticado = Boolean(token);
  const { data: reports } = useReports({ enabled: estaAutenticado });
  const { data: identidad } = useConfiguracionPublica();
  const systemName = nombreSistema(identidad);
  const solicitudesPendientes = reports?.reduce(
    (total, report) => total + (report.solicitudes_informacion?.some((solicitud) => !solicitud.respondida) ? 1 : 0),
    0
  ) ?? 0;

  const nav = estaAutenticado ? NAV : NAV_ANONIMO;

  const isActive = (to: string) => (to === "/reportes" ? location.pathname === "/reportes" : location.pathname.startsWith(to));

  return (
    <>
      <AdminViewingBanner roleLabel="Reportante" />
      <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur-xl">
        {/* Alto = logo (66) + aire. `size` en Logo es el alto real de la imagen,
            así que la barra ya no reserva espacio muerto. */}
        <div className="mx-auto flex h-[88px] max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Link to={estaAutenticado ? "/reportes" : "/"}>
              <Logo size={66} wordmark={systemName} />
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex h-9 items-center rounded-lg px-3.5 text-[13px] font-medium transition-colors",
                    isActive(item.to) ? "bg-brand-50 text-brand-800" : "text-ink-soft hover:bg-surface hover:text-ink"
                  )}
                >
                  <span>{item.label}</span>
                  {item.to === "/reportes/notificaciones" && solicitudesPendientes > 0 && (
                    <span className="ml-2 rounded-full bg-warning px-1.5 py-0.5 text-[10px] font-bold text-warning-ink">
                      {solicitudesPendientes}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {estaAutenticado && (
              <>
                <AdminPanelSwitcher />
                <SessionExitButton />
              </>
            )}
            <Link to="/reportes/nuevo" className="hidden sm:block">
              <Button size="sm">
                <Plus className="h-4 w-4" /> Registrar reporte
              </Button>
            </Link>
            {estaAutenticado && (
              <>
                <Link
                  to="/reportes/notificaciones"
                  className="relative grid h-9 w-9 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-surface hover:text-ink"
                  aria-label="Notificaciones"
                >
                  <Bell className="h-[18px] w-[18px]" />
                  {solicitudesPendientes > 0 && (
                    <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-warning px-1 text-[10px] font-bold leading-none text-warning-ink ring-2 ring-white">
                      {solicitudesPendientes}
                    </span>
                  )}
                </Link>
                <Link
                  to="/reportes/perfil"
                  className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-[11px] font-bold text-brand-800 transition-colors hover:bg-brand-200"
                  aria-label="Mi perfil"
                  title="Mi perfil"
                >
                  RE
                </Link>
              </>
            )}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="grid h-9 w-9 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-surface hover:text-ink md:hidden"
              aria-label="Menú"
            >
              <Menu className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="flex flex-col gap-1 border-t border-line-soft bg-white px-4 py-3 md:hidden">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-lg px-3.5 py-2.5 text-[13.5px] font-medium",
                  isActive(item.to) ? "bg-brand-50 text-brand-800" : "text-ink-soft"
                )}
              >
                <span>{item.label}</span>
                {item.to === "/reportes/notificaciones" && solicitudesPendientes > 0 && (
                  <span className="ml-2 rounded-full bg-warning px-1.5 py-0.5 text-[10px] font-bold text-warning-ink">
                    {solicitudesPendientes}
                  </span>
                )}
              </Link>
            ))}
            <Link to="/reportes/nuevo" onClick={() => setMenuOpen(false)} className="mt-1">
              <Button size="sm" className="w-full">
                <Plus className="h-4 w-4" /> Registrar reporte
              </Button>
            </Link>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8">{children}</main>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4 py-6 text-[12px] text-ink-quiet sm:px-6">
          <p>{systemName} — Seguridad Operativa · Línea 1 del Metro de Lima</p>
        </div>
      </footer>
      </div>
    </>
  );
}
