CREATE UNIQUE INDEX "catalogo_detalle_mr_codigo_unique"
ON "catalogo_detalle" ("id_catalogo", upper(trim("nombre")))
WHERE "clasificacion_mr" IS NOT NULL;
