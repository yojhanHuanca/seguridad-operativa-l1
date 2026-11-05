-- Conserva las posibles causas analizadas por Seguridad Operativa durante
-- la Evaluación del SOP, separadas de la causa raíz de la Investigación.
ALTER TABLE "casos_sop"
  ADD COLUMN IF NOT EXISTS "posibles_causas" TEXT;
