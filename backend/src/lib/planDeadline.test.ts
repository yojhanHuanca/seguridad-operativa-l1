import { describe, expect, it } from "vitest";
import { planDeadline, planEstaActivo, planVencido, type PlanDeadlineSource, type PlanEstadoSource } from "./planDeadline.js";

const d = (iso: string) => new Date(`${iso}T00:00:00.000Z`);

describe("planDeadline", () => {
  it("la prórroga aprobada manda sobre todo, incluso con actividades más tardías", () => {
    const plan: PlanDeadlineSource = {
      fecha_plan: d("2026-01-01"),
      fecha_reprogramada: d("2026-06-01"),
      actividades_plan: [{ fecha_fin: d("2026-12-31") }],
    };
    expect(planDeadline(plan)).toEqual(d("2026-06-01"));
  });

  it("sin prórroga, usa la fecha fin más lejana de las actividades", () => {
    const plan: PlanDeadlineSource = {
      fecha_plan: d("2026-01-01"),
      fecha_reprogramada: null,
      actividades_plan: [{ fecha_fin: d("2026-03-01") }, { fecha_fin: d("2026-05-15") }, { fecha_fin: null }],
    };
    expect(planDeadline(plan)).toEqual(d("2026-05-15"));
  });

  it("sin prórroga ni actividades con fecha, cae a fecha_plan — caso de planes importados", () => {
    const plan: PlanDeadlineSource = { fecha_plan: d("2026-01-01"), fecha_reprogramada: null };
    expect(planDeadline(plan)).toEqual(d("2026-01-01"));
  });
});

describe("planEstaActivo", () => {
  const estado = (nombre: string): PlanEstadoSource => ({ catalogo_detalle: { nombre } });

  it.each(["Cerrado", "Rechazado", "Finalizado", "cerrado por auditoría"])('"%s" no está activo', (nombre) => {
    expect(planEstaActivo(estado(nombre))).toBe(false);
  });

  it.each(["Pendiente", "En Ejecución", "Enviado"])('"%s" sigue activo', (nombre) => {
    expect(planEstaActivo(estado(nombre))).toBe(true);
  });
});

describe("planVencido", () => {
  const activo: PlanEstadoSource = { catalogo_detalle: { nombre: "En Ejecución" } };
  const cerrado: PlanEstadoSource = { catalogo_detalle: { nombre: "Cerrado" } };

  it("un plan cerrado nunca está vencido, aunque su fecha ya haya pasado", () => {
    const plan = { fecha_plan: d("2020-01-01"), fecha_reprogramada: null, ...cerrado };
    expect(planVencido(plan, d("2026-01-01"))).toBe(false);
  });

  it("vence el día siguiente a su fecha límite, no el mismo día", () => {
    const plan = { fecha_plan: d("2026-06-15"), fecha_reprogramada: null, ...activo };
    expect(planVencido(plan, d("2026-06-15"))).toBe(false); // vence hoy: todavía no vencido
    expect(planVencido(plan, d("2026-06-16"))).toBe(true); // un día después: vencido
  });

  it("compara por día calendario, no por instante exacto — una hora de diferencia no debe cambiar el resultado", () => {
    const plan = { fecha_plan: d("2026-06-15"), fecha_reprogramada: null, ...activo };
    const hoyConHora = new Date("2026-06-15T23:59:00.000Z");
    expect(planVencido(plan, hoyConHora)).toBe(false);
  });
});
