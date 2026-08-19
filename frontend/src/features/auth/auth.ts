import { createContext, useContext } from "react";

export interface AuthUser {
  id_usuario: number;
  codigo_usuario: string;
  nombre: string;
  correo: string;
  estado: string | null;
  rol: string;
  area: string | null;
  id_area: number | null;
  ultimo_acceso: string | null;
  es_responsable: boolean;
}

export interface AuthValue {
  user: AuthUser | null;
  token: string | null;
  login: (correo: string, password: string) => Promise<AuthUser>;
  logout: () => void;
}

export const AuthContext = createContext<AuthValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}

export function homeForRole(role: string) {
  const normalized = role.trim().toLowerCase();
  if (normalized === "admin" || normalized === "administrador") return "/admin/usuarios";
  if (normalized === "seguridad operativa") return "/seguridad";
  if (normalized === "jefe de área" || normalized === "jefe de area") return "/jefe";
  if (normalized === "monitorista") return "/monitoreo";
  return "/reportes";
}
