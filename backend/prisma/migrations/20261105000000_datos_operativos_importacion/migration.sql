ALTER TABLE "datos_operativos" ADD COLUMN "id_importacion" INTEGER;
CREATE INDEX "idx_datos_operativos_importacion" ON "datos_operativos"("id_importacion");
ALTER TABLE "datos_operativos" ADD CONSTRAINT "datos_operativos_id_importacion_fkey" FOREIGN KEY ("id_importacion") REFERENCES "importaciones"("id_importacion") ON DELETE SET NULL ON UPDATE NO ACTION;
