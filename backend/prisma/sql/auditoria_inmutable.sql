CREATE OR REPLACE FUNCTION fn_auditoria_inmutable()
RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'La tabla auditoria es de solo escritura: no se permite % sobre registros existentes', TG_OP;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_auditoria_inmutable ON auditoria;
CREATE TRIGGER trg_auditoria_inmutable
  BEFORE UPDATE OR DELETE ON auditoria
  FOR EACH ROW EXECUTE FUNCTION fn_auditoria_inmutable();
