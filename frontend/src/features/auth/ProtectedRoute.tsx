import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { homeForRole, useAuth } from "./auth";

export function ProtectedRoute({
  children,
  roles,
  allowResponsableRole,
}: {
  children: ReactNode;
  roles?: string[];
  /** Además de `roles`, deja pasar a este rol si tiene el flag es_responsable (ej. el RSO de SO visitando Monitoreo). */
  allowResponsableRole?: string;
}) {
  const { user, token } = useAuth();
  const location = useLocation();

  if (!user || !token) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  // Admin tiene acceso a todos los paneles, no solo al propio.
  const esAdmin = user.rol.toLowerCase() === "admin";
  const tieneRolPermitido = roles?.some((role) => role.toLowerCase() === user.rol.toLowerCase());
  const esResponsableInvitado =
    allowResponsableRole && user.es_responsable && user.rol.toLowerCase() === allowResponsableRole.toLowerCase();

  if (!esAdmin && roles && !tieneRolPermitido && !esResponsableInvitado) {
    return <Navigate to={homeForRole(user.rol)} replace />;
  }
  return children;
}
