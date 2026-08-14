import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { homeForRole, useAuth } from "./auth";

export function ProtectedRoute({ children, roles }: { children: ReactNode; roles?: string[] }) {
  const { user, token } = useAuth();
  const location = useLocation();

  if (!user || !token) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (roles && !roles.some((role) => role.toLowerCase() === user.rol.toLowerCase())) {
    return <Navigate to={homeForRole(user.rol)} replace />;
  }
  return children;
}
