CREATE TABLE "plan_recordatorios" (
  "id_recordatorio" SERIAL NOT NULL,
  "id_plan" INTEGER NOT NULL,
  "dias_antes" SMALLINT NOT NULL,
  "fecha_limite" DATE NOT NULL,
  "estado" VARCHAR(20) NOT NULL DEFAULT 'pendiente',
  "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "claimed_at" TIMESTAMP(6),
  "sent_at" TIMESTAMP(6),
  CONSTRAINT "plan_recordatorios_pkey" PRIMARY KEY ("id_recordatorio")
);

CREATE UNIQUE INDEX "uq_plan_recordatorio_hito" ON "plan_recordatorios"("id_plan", "dias_antes", "fecha_limite");
CREATE INDEX "idx_plan_recordatorio_pendiente" ON "plan_recordatorios"("estado", "created_at");
ALTER TABLE "plan_recordatorios" ADD CONSTRAINT "plan_recordatorios_id_plan_fkey" FOREIGN KEY ("id_plan") REFERENCES "planes_accion"("id_plan") ON DELETE CASCADE ON UPDATE NO ACTION;
