import jwt from "jsonwebtoken";
import { createHash, randomUUID } from "node:crypto";
import { env } from "../config/env.js";

export const PUBLIC_REPORT_COOKIE = "sop_report_device";

function nombreCookieReporte(codigoSop: string) {
  return `${PUBLIC_REPORT_COOKIE}_${createHash("sha256").update(codigoSop).digest("hex")}`;
}

export function crearAccesoReporte(codigoSop: string) {
  return jwt.sign({ purpose: "public-report", codigoSop, jti: randomUUID() }, env.JWT_SECRET, { expiresIn: "2y" });
}

function leerCookie(cookieHeader: string | undefined, name: string) {
  const value = cookieHeader?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return value ? decodeURIComponent(value.slice(name.length + 1)) : null;
}

export function puedeConsultarReporte(codigoSop: string, cookieHeader: string | undefined) {
  try {
    // Cada reporte conserva su acceso. Se acepta la cookie anterior para no
    // invalidar el último reporte de los navegadores que ya lo registraron.
    const token = leerCookie(cookieHeader, nombreCookieReporte(codigoSop))
      ?? leerCookie(cookieHeader, PUBLIC_REPORT_COOKIE);
    if (!token) return false;
    const payload = jwt.verify(token, env.JWT_SECRET) as { purpose?: string; codigoSop?: string };
    return payload.purpose === "public-report" && payload.codigoSop === codigoSop;
  } catch {
    return false;
  }
}

export function cookieAccesoReporte(token: string, codigoSop: string) {
  const secure = process.env.NODE_ENV === "production";
  return `${nombreCookieReporte(codigoSop)}=${encodeURIComponent(token)}; Max-Age=63072000; Path=/api/reports/consulta/${encodeURIComponent(codigoSop)}; HttpOnly; SameSite=${secure ? "None" : "Lax"}${secure ? "; Secure" : ""}`;
}
