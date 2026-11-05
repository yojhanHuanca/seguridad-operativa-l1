-- Los tipos o marcas se administran desde el catálogo MODELO_MR.
-- La clasificación de una unidad debe poder referenciar marcas que se agreguen
-- posteriormente desde el panel de Administración.
ALTER TABLE "catalogo_detalle"
DROP CONSTRAINT IF EXISTS "catalogo_detalle_clasificacion_mr_check";
