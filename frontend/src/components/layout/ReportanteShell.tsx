import { type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { nombreSistema, useConfiguracionPublica } from "@/features/configuracion/hooks/useConfiguracion";

// Sin cuenta, el seguimiento es por código (ConsultarReportePage), no por
// "Mis reportes" — reemplaza ese ítem en vez de dejar al anónimo sin nada.
const NAV_PUBLICO: { to: string; label: string }[] = [
  { to: "/reportes/nuevo", label: "Nuevo reporte" },
  { to: "/reportes/consulta", label: "Consultar mi reporte" },
];

export function ReportanteShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: identidad } = useConfiguracionPublica();
  const systemName = nombreSistema(identidad);
  const nav = NAV_PUBLICO;

  const isActive = (to: string) => (to === "/reportes" ? location.pathname === "/reportes" : location.pathname.startsWith(to));

  return (
    <>
      <div className="min-h-screen bg-surface">
        <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur-xl">
          <div className="mx-auto flex h-[88px] max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
            <div className="flex items-center gap-8">
              <Link to="/">
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
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <Link to="/reportes/nuevo" className="hidden sm:block">
                <Button size="sm">
                  <Plus className="h-4 w-4" /> Registrar reporte
                </Button>
              </Link>
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
