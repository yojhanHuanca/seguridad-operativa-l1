import { describe, expect, it } from "vitest";
import { assertTransicion, TransicionInvalidaError } from "./case.workflow.js";

describe("assertTransicion", () => {
  it("permite una acción desde una de sus etapas de origen válidas", () => {
    expect(() => assertTransicion("evaluate", "Evaluación")).not.toThrow();
    expect(() => assertTransicion("evaluate", "Pendiente de Información")).not.toThrow();
  });

  it("rechaza una acción desde una etapa que no la admite", () => {
    expect(() => assertTransicion("evaluate", "Ejecución")).toThrow(TransicionInvalidaError);
  });

  it("el mensaje de error nombra la etapa actual y las etapas válidas", () => {
    try {
      assertTransicion("close", "Ejecución");
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(TransicionInvalidaError);
      expect((error as Error).message).toContain("Ejecución");
      expect((error as Error).message).toContain("Verificación");
    }
  });

  it("no bloquea un doble clic: repetir la misma acción en su propia etapa de origen sigue permitido", () => {
    // `approve` solo mueve el caso hacia Evaluación; un segundo click mientras
    // el caso sigue en Recepción (petición duplicada, red lenta) no debe
    // fallar por la máquina de estados — es el mismo caso reportado en el
    // comentario de cabecera del archivo (doble clic / botón atrás).
    expect(() => assertTransicion("approve", "Recepción")).not.toThrow();
  });

  it("un caso ya avanzado no puede repetir una acción de una etapa anterior", () => {
    // Este es el escenario real que la máquina de estados vino a prevenir:
    // una pestaña vieja con los botones de Recepción todavía visibles no
    // puede volver a "aprobar" un caso que ya está en Plan de Acción.
    expect(() => assertTransicion("approve", "Plan de Acción")).toThrow(TransicionInvalidaError);
  });

  it("deja pasar cualquier acción cuando el estado actual es nulo (datos heredados sin estado)", () => {
    expect(() => assertTransicion("close", null)).not.toThrow();
    expect(() => assertTransicion("close", undefined)).not.toThrow();
  });

  it("rollback solo se admite desde las etapas activas listadas, nunca desde Cerrado o Rechazado", () => {
    expect(() => assertTransicion("rollback", "Ejecución")).not.toThrow();
    expect(() => assertTransicion("rollback", "Cerrado")).toThrow(TransicionInvalidaError);
    expect(() => assertTransicion("rollback", "Rechazado")).toThrow(TransicionInvalidaError);
  });

  it("reopen solo se admite desde Cerrado o Rechazado, el reverso exacto de rollback", () => {
    expect(() => assertTransicion("reopen", "Cerrado")).not.toThrow();
    expect(() => assertTransicion("reopen", "Rechazado")).not.toThrow();
    expect(() => assertTransicion("reopen", "Ejecución")).toThrow(TransicionInvalidaError);
  });

  it("acceptPlan admite planes que llegan tarde: el caso ya puede estar en Ejecución", () => {
    // Documentado en case.repository.ts: SO puede arrancar la Ejecución con
    // un plan aceptado sin esperar a los demás; esos planes pendientes deben
    // poder aceptarse después con el caso ya en Ejecución.
    expect(() => assertTransicion("acceptPlan", "Plan de Acción")).not.toThrow();
    expect(() => assertTransicion("acceptPlan", "Ejecución")).not.toThrow();
  });
});
