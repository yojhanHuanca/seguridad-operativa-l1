import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
});

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
  withCredentials: true,
});

/** Origen del backend (sin /api) para resolver rutas /uploads/... que devuelve la API. */
export const API_ORIGIN = (import.meta.env.VITE_API_URL ?? "http://localhost:3000/api").replace(/\/api\/?$/, "");

api.interceptors.request.use((config) => {
  // Las consultas y el acceso no deben quedar cargando indefinidamente.
  // No acortar aquí importaciones, guardados ni subidas grandes de archivos.
  const method = config.method?.toLowerCase();
  if (!config.timeout && (method === "get" || /^\/auth\/(login|google)$/.test(config.url ?? ""))) config.timeout = 90_000;
  const token = localStorage.getItem("sigma_auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthAttempt = error.config?.url?.includes("/auth/login") || error.config?.url?.includes("/auth/google");
    if (error.response?.status === 403 && error.response?.data?.code === "PASSWORD_CHANGE_REQUIRED") {
      try {
        const stored = localStorage.getItem("sigma_auth_user");
        if (stored) localStorage.setItem("sigma_auth_user", JSON.stringify({ ...JSON.parse(stored), debe_cambiar_password: true }));
      } catch {
        localStorage.removeItem("sigma_auth_user");
      }
      if (window.location.pathname !== "/cambiar-contrasena") window.location.assign("/cambiar-contrasena");
    }
    if (error.response?.status === 401 && !isAuthAttempt) {
      localStorage.removeItem("sigma_auth_token");
      localStorage.removeItem("sigma_auth_user");
      if (window.location.pathname !== "/login") window.location.assign("/login");
    }
    return Promise.reject(error);
  },
);

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
  /** Solo lo llenan los endpoints paginados (ej. GET /cases con page+limit). */
  meta?: { total: number };
}

export function apiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const envelope = error.response?.data as ApiEnvelope<unknown> | undefined;
    if (envelope?.message) return envelope.message;
    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      return "El servidor tardó demasiado en responder. Revisa tu conexión y vuelve a intentarlo.";
    }
    if (!error.response && error.code === "ERR_NETWORK") {
      return "No se pudo conectar con el servidor. Revisa tu conexión. Si estabas guardando, comprueba si el cambio se aplicó antes de enviarlo otra vez.";
    }
  }
  return fallback;
}
