-- Datos organizativos del formato de usuarios. Ambas columnas son opcionales
-- para conservar las cuentas existentes y el alta individual.
ALTER TABLE "usuarios"
  ADD COLUMN "unidad_organizativa" VARCHAR(150),
  ADD COLUMN "jefe_inmediato" VARCHAR(150);
