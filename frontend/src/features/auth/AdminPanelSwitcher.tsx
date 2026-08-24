import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, ShieldCheck, ShieldAlert, Briefcase, Radar, Check } from "lucide-react";
import { useAuth } from "./auth";
import { cn } from "@/lib/utils";

const PANELES = [
  { to: "/admin/usuarios", label: "Administrador", icon: ShieldCheck, match: (p: string) => p.startsWith("/admin") },
  { to: "/seguridad", label: "Seguridad Operativa", icon: ShieldAlert, match: (p: string) => p.startsWith("/seguridad") },
  { to: "/jefe", label: "Jefe de Área", icon: Briefcase, match: (p: string) => p.startsWith("/jefe") },
  { to: "/monitoreo", label: "Monitoreo", icon: Radar, match: (p: string) => p.startsWith("/monitoreo") },
];

/** Solo el Admin ve esto: le permite saltar entre paneles sin escribir la URL a mano. */
export function AdminPanelSwitcher({ className }: { className?: string }) {
  const { user } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  if (!user || user.rol.toLowerCase() !== "admin") return null;

  return (
    <div className={cn("relative", className)} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        title="Cambiar de panel"
        aria-label="Cambiar de panel"
        className="inline-flex h-9 items-center gap-2 rounded-lg border border-line px-3 text-[12.5px] font-medium text-ink-soft transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800"
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:block">Cambiar panel</span>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-40 w-56 overflow-hidden rounded-xl border border-line bg-white py-1.5 shadow-lg">
          <p className="px-3 py-1.5 text-[10.5px] font-semibold uppercase text-ink-faint">Cambiar de panel</p>
          {PANELES.map((p) => {
            const active = p.match(location.pathname);
            return (
              <Link
                key={p.to}
                to={p.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink"
              >
                <p.icon className={active ? "h-4 w-4 text-brand-700" : "h-4 w-4 text-ink-faint"} />
                <span className="flex-1">{p.label}</span>
                {active && <Check className="h-3.5 w-3.5 text-brand-700" />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
