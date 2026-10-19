-- La afluencia diaria se captura de forma independiente de QTY pasajeros.
-- Los registros históricos quedan pendientes hasta que se capture este dato.
ALTER TABLE "datos_operativos" ADD COLUMN "afluencia" DECIMAL(15, 0);
ALTER TABLE "datos_operativos" ADD CONSTRAINT "datos_operativos_afluencia_no_negativa" CHECK ("afluencia" >= 0);
