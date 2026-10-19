import { describe, expect, it, vi } from "vitest";
import jwt from "jsonwebtoken";

vi.mock("../config/env.js", () => ({ env: { JWT_SECRET: "qa-public-report-test-secret" } }));
import { cookieAccesoReporte, crearAccesoReporte, puedeConsultarReporte, PUBLIC_REPORT_COOKIE } from "./publicReportAccess.js";

const cookie = (codigo: string) => cookieAccesoReporte(crearAccesoReporte(codigo), codigo).split(";")[0]!;

describe("acceso del reportante sin cuenta", () => {
  it("rechaza conocer solo el código o una cookie de otro reporte", () => {
    expect(puedeConsultarReporte("SOP-A", undefined)).toBe(false);
    expect(puedeConsultarReporte("SOP-A", cookie("SOP-B"))).toBe(false);
  });
  it("mantiene acceso a varios reportes del mismo navegador", () => {
    const a = cookie("SOP-A");
    const b = cookie("SOP-B");
    expect(a.split("=")[0]).not.toBe(b.split("=")[0]);
    expect(puedeConsultarReporte("SOP-A", `${a}; ${b}`)).toBe(true);
    expect(puedeConsultarReporte("SOP-B", `${a}; ${b}`)).toBe(true);
    expect(puedeConsultarReporte("SOP-C", `${a}; ${b}`)).toBe(false);
  });
  it("conserva acceso mediante la cookie anterior únicamente a su reporte", () => {
    const legacy = `${PUBLIC_REPORT_COOKIE}=${crearAccesoReporte("SOP-ANTERIOR")}`;
    expect(puedeConsultarReporte("SOP-ANTERIOR", legacy)).toBe(true);
    expect(puedeConsultarReporte("SOP-OTRO", legacy)).toBe(false);
  });
  it("rechaza cookies malformadas, alteradas, vencidas o con otro propósito", () => {
    expect(puedeConsultarReporte("SOP-A", `${PUBLIC_REPORT_COOKIE}=%E0%A4%A`)).toBe(false);
    expect(puedeConsultarReporte("SOP-A", `${PUBLIC_REPORT_COOKIE}=alterado`)).toBe(false);
    for (const payload of [
      { purpose: "public-report", codigoSop: "SOP-A", exp: 1 },
      { purpose: "login", codigoSop: "SOP-A" },
    ]) {
      const token = jwt.sign(payload, "qa-public-report-test-secret");
      expect(puedeConsultarReporte("SOP-A", `${PUBLIC_REPORT_COOKIE}=${token}`)).toBe(false);
    }
  });
  it("limita el envío de la cookie a consulta y respuesta de su reporte", () => {
    const header = cookieAccesoReporte(crearAccesoReporte("SOP-A"), "SOP-A");
    expect(header).toContain("Path=/api/reports/consulta/SOP-A;");
    expect(header).toContain("HttpOnly");
  });
});
