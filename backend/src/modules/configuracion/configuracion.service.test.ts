import { describe, expect, it } from "vitest";
import { buildCodigoPlan, codigoPlanSequenceForCase } from "./codigo-plan.js";
import { codigoSopSequence, codigoSopSequenceForYear } from "./codigo-sop.js";

describe("codigoSopSequenceForYear", () => {
  it("lee la secuencia del formato vigente prefijo secuencia-año", () => {
    expect(codigoSopSequenceForYear("SOP 58-2026", "SOP", 2026)).toBe(58);
    expect(codigoSopSequenceForYear("sop 000059-2026", "SOP", 2026)).toBe(59);
  });

  it("lee códigos importados cuando el año está antes de la secuencia", () => {
    expect(codigoSopSequenceForYear("SOP-2026-000123", "SOP", 2026)).toBe(123);
  });

  it("lee secuencias históricas para continuar desde el mayor número migrado", () => {
    expect(codigoSopSequence("SOP 900-2021", "SOP")).toBe(900);
    expect(codigoSopSequence("SOP-2021-000901", "SOP")).toBe(901);
  });

  it("toma la secuencia pegada al año y no confunde meses intermedios", () => {
    expect(codigoSopSequenceForYear("SOP 08-001-2026", "SOP", 2026)).toBe(1);
  });

  it("ignora códigos de otro año o de otro prefijo", () => {
    expect(codigoSopSequenceForYear("SOP 58-2025", "SOP", 2026)).toBeNull();
    expect(codigoSopSequenceForYear("GOSU 58-2026", "SOP", 2026)).toBeNull();
  });

  it("ignora textos que solo empiezan parecido al prefijo", () => {
    expect(codigoSopSequenceForYear("SOPORTE 58-2026", "SOP", 2026)).toBeNull();
  });
});

describe("codigoPlanSequenceForCase", () => {
  it("lee el numero de plan cuando el codigo pertenece al SOP", () => {
    expect(codigoPlanSequenceForCase("SOP 58-2026-PLA-01", "SOP 58-2026", "PLA")).toBe(1);
    expect(codigoPlanSequenceForCase("SOP-2026-000123-PLA-03", "SOP-2026-000123", "PLA")).toBe(3);
  });

  it("ignora codigos globales porque los planes reinician por SOP", () => {
    expect(codigoPlanSequenceForCase("PLA-234", "SOP 58-2026", "PLA")).toBeNull();
  });

  it("arma codigos unicos por SOP aunque la etiqueta visible sea PLA-01", () => {
    expect(buildCodigoPlan("SOP 58-2026", "PLA", 1)).toBe("SOP 58-2026-PLA-01");
    expect(buildCodigoPlan("SOP 59-2026", "PLA", 1)).toBe("SOP 59-2026-PLA-01");
  });
});
