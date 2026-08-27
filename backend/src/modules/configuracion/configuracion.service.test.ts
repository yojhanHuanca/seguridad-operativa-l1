import { describe, expect, it } from "vitest";
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
