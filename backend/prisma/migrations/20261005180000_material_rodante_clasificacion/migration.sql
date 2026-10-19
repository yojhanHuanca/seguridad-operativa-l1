ALTER TABLE "catalogo_detalle" ADD COLUMN "clasificacion_mr" VARCHAR(30);
ALTER TABLE "catalogo_detalle" ADD CONSTRAINT "catalogo_detalle_clasificacion_mr_check"
CHECK ("clasificacion_mr" IS NULL OR "clasificacion_mr" IN ('ALSTOM', 'ANSALDO', 'AUXILIAR'));

-- Preserve all ids and event references. Only backfill the known existing fleet.
UPDATE "catalogo_detalle" d SET "clasificacion_mr" = CASE
  WHEN upper(trim(d.nombre)) ~ '^T0*[1-5]$' THEN 'ANSALDO'
  WHEN upper(trim(d.nombre)) ~ '^T0*([6-9]|[1-3][0-9]|4[0-4])$' THEN 'ALSTOM'
  WHEN upper(trim(d.nombre)) IN ('V-BIVIAL','V-DRESINA','V-GRECO','V-GRUA','VH-PLATAFORMA','V-PLATAFORMA') THEN 'AUXILIAR'
  ELSE NULL END
FROM "catalogos" c WHERE d.id_catalogo = c.id_catalogo AND c.codigo = 'NUMERO_MR';
