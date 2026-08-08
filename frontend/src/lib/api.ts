import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
});

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
}

export function apiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const envelope = error.response?.data as ApiEnvelope<unknown> | undefined;
    if (envelope?.message) return envelope.message;
  }
  return fallback;
}
