import { useMemo, useState, type ReactNode } from "react";
import { api, type ApiEnvelope } from "@/lib/api";
import { AuthContext, type AuthUser, type AuthValue } from "./auth";

interface LoginResult { token: string; usuario: AuthUser }
const TOKEN_KEY = "sigma_auth_token";
const USER_KEY = "sigma_auth_user";

function readUser(): AuthUser | null {
  try {
    const value = localStorage.getItem(USER_KEY);
    return value ? JSON.parse(value) as AuthUser : null;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readUser);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));

  const value = useMemo<AuthValue>(() => ({
    user,
    token,
    login: async (correo, password) => {
      const response = await api.post<ApiEnvelope<LoginResult>>("/auth/login", { correo, password });
      if (!response.data.data) throw new Error("La respuesta del servidor no contiene una sesión válida");
      localStorage.setItem(TOKEN_KEY, response.data.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data.data.usuario));
      setToken(response.data.data.token);
      setUser(response.data.data.usuario);
      return response.data.data.usuario;
    },
    logout: async () => {
      // Avisa al servidor para invalidar la sesión (cierra la fila en
      // `sesiones`); si la llamada falla (sin red, token ya vencido) se
      // limpia igual el lado del cliente, para no dejar a nadie atrapado sin
      // poder salir.
      try {
        await api.post("/auth/logout");
      } catch {
        // intencional: logout local sigue aunque esto falle
      }
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setToken(null);
      setUser(null);
    },
  }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
