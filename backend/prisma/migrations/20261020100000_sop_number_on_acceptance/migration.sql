-- Reporte público: conserva una referencia de consulta estable y solo consume
-- un correlativo SOP cuando Seguridad Operativa acepta el hallazgo.
ALTER TABLE "casos_sop"
  ADD COLUMN "codigo_consulta" VARCHAR(30),
  ADD COLUMN "sop_asignado" BOOLEAN NOT NULL DEFAULT true;

-- Los expedientes ya existentes mantienen su código e historial actual.
UPDATE "casos_sop"
SET "codigo_consulta" = "codigo_sop"
WHERE "codigo_consulta" IS NULL;

CREATE UNIQUE INDEX "casos_sop_codigo_consulta_key"
  ON "casos_sop"("codigo_consulta");
