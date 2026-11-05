import jwt from "jsonwebtoken";
import { createHash, randomUUID } from "node:crypto";
import { env } from "../config/env.js";

export const PUBLIC_REPORT_COOKIE = "sop_report_device";

function nombreCookieReporte(codigoConsulta: string) {
  return `${PUBLIC_REPORT_COOKIE}_${createHash("sha256").update(codigoConsulta).digest("hex")}`;
}

export function crearAccesoReporte(codigoConsulta: string) {
  return jwt.sign({ purpose: "public-report", codigoConsulta, jti: randomUUID() }, env.JWT_SECRET, { expiresIn: "2y" });
}

function leerCookie(cookieHeader: string | undefined, name: string) {
  const value = cookieHeader?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return value ? decodeURIComponent(value.slice(name.length + 1)) : null;
}

export function puedeConsultarReporte(codigoConsulta: string, cookieHeader: string | undefined) {
  try {
    // Cada reporte conserva su acceso aunque, al aprobarse, reciba un SOP nuevo.
    const token = leerCookie(cookieHeader, nombreCookieReporte(codigoConsulta))
      ?? leerCookie(cookieHeader, PUBLIC_REPORT_COOKIE);
    if (!token) return false;
    const payload = jwt.verify(token, env.JWT_SECRET) as { purpose?: string; codigoConsulta?: string; codigoSop?: string };
    // `codigoSop` mantiene vigentes las cookies emitidas antes de este cambio.
    return payload.purpose === "public-report" && (payload.codigoConsulta ?? payload.codigoSop) === codigoConsulta;
  } catch {
    return false;
  }
}

export function cookieAccesoReporte(token: string, codigoConsulta: string) {
  const secure = process.env.NODE_ENV === "production";
  return `${nombreCookieReporte(codigoConsulta)}=${encodeURIComponent(token)}; Max-Age=63072000; Path=/api/reports/consulta/${encodeURIComponent(codigoConsulta)}; HttpOnly; SameSite=${secure ? "None" : "Lax"}${secure ? "; Secure" : ""}`;
}
