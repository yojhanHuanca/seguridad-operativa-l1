CREATE TABLE "importaciones" (
  "id_importacion" SERIAL NOT NULL,
  "modulo" VARCHAR(30) NOT NULL,
  "archivo" VARCHAR(255) NOT NULL,
  "hoja" VARCHAR(255),
  "usuario" INTEGER NOT NULL,
  "estado" VARCHAR(30) NOT NULL DEFAULT 'procesando',
  "filas_total" INTEGER NOT NULL DEFAULT 0,
  "importados" INTEGER NOT NULL DEFAULT 0,
  "duplicados" INTEGER NOT NULL DEFAULT 0,
  "errores" INTEGER NOT NULL DEFAULT 0,
  "resumen" JSONB,
  "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "completed_at" TIMESTAMP(6),
  "reverted_at" TIMESTAMP(6),
  "reverted_by" INTEGER,
  "motivo_reversion" VARCHAR(500),
  CONSTRAINT "importaciones_pkey" PRIMARY KEY ("id_importacion")
);

ALTER TABLE "casos_sop" ADD COLUMN "id_importacion" INTEGER;
ALTER TABLE "eventos_monitoreo" ADD COLUMN "id_importacion" INTEGER;
ALTER TABLE "contingencia_eventos" ADD COLUMN "id_importacion" INTEGER;

CREATE INDEX "idx_importaciones_fecha" ON "importaciones"("created_at");
CREATE INDEX "idx_importaciones_usuario" ON "importaciones"("usuario");
CREATE INDEX "idx_importaciones_estado" ON "importaciones"("estado");
CREATE INDEX "idx_caso_importacion" ON "casos_sop"("id_importacion");
CREATE INDEX "idx_monitoreo_importacion" ON "eventos_monitoreo"("id_importacion");
CREATE INDEX "idx_cont_evento_importacion" ON "contingencia_eventos"("id_importacion");

ALTER TABLE "importaciones" ADD CONSTRAINT "importaciones_usuario_fkey" FOREIGN KEY ("usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "importaciones" ADD CONSTRAINT "importaciones_reverted_by_fkey" FOREIGN KEY ("reverted_by") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "casos_sop" ADD CONSTRAINT "casos_sop_id_importacion_fkey" FOREIGN KEY ("id_importacion") REFERENCES "importaciones"("id_importacion") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "eventos_monitoreo" ADD CONSTRAINT "eventos_monitoreo_id_importacion_fkey" FOREIGN KEY ("id_importacion") REFERENCES "importaciones"("id_importacion") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "contingencia_eventos" ADD CONSTRAINT "contingencia_eventos_id_importacion_fkey" FOREIGN KEY ("id_importacion") REFERENCES "importaciones"("id_importacion") ON DELETE SET NULL ON UPDATE NO ACTION;
