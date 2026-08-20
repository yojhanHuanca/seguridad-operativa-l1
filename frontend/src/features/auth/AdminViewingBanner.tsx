import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import { homeForRole } from "./auth";

/**
 * Cuando alguien entra a un panel que no es el suyo (Admin vía el switcher,
 * o el RSO de Seguridad Operativa "visitando" Monitoreo), esta franja deja
 * claro en qué contexto está parado y da una salida directa — evita
 * confundir "estoy viendo el panel de X" con una sesión real de X.
 */
export function AdminViewingBanner({ roleLabel }: { roleLabel: string }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;
  const esAdmin = user.rol.toLowerCase() === "admin";
  const esVisitante = user.es_responsable && roleLabel.toLowerCase() !== user.rol.toLowerCase();
  if (!esAdmin && !esVisitante) return null;

  return (
    <div data-print="hide" className="flex items-center gap-2.5 bg-[#412402] px-4 py-2 text-[12.5px] text-[#FAEEDA] sm:px-6">
      <Eye className="h-4 w-4 shrink-0" />
      <span className="min-w-0 flex-1 truncate">
        Estás viendo el panel de <strong className="font-semibold">{roleLabel}</strong> {esAdmin ? "en modo Admin" : `como responsable de ${user.rol}`}.
      </span>
      <button
        type="button"
        onClick={() => navigate(esAdmin ? "/admin/usuarios" : homeForRole(user.rol))}
        className="shrink-0 rounded-md border border-[#FAC775] px-2.5 py-1 text-[11.5px] font-medium transition-colors hover:bg-white/10"
      >
        Salir de esta vista
      </button>
    </div>
  );
}
