import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
});

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
});

/** Origen del backend (sin /api) para resolver rutas /uploads/... que devuelve la API. */
export const API_ORIGIN = (import.meta.env.VITE_API_URL ?? "http://localhost:3000/api").replace(/\/api\/?$/, "");

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("sigma_auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthAttempt = error.config?.url?.includes("/auth/login") || error.config?.url?.includes("/auth/google");
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
  }
  return fallback;
}
