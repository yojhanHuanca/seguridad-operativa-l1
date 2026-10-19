UPDATE "catalogo_detalle" AS detail
SET "nombre" = 'Patio taller Villa El Salvador', "estado" = true
FROM "catalogos" AS catalog
WHERE detail."id_catalogo" = catalog."id_catalogo"
  AND catalog."codigo" = 'LUGAR_INCIDENTE'
  AND lower(detail."nombre") = 'taller villa el salvador'
  AND detail."id_detalle" = (
    SELECT MIN(alias."id_detalle") FROM "catalogo_detalle" AS alias
    WHERE alias."id_catalogo" = detail."id_catalogo"
      AND lower(alias."nombre") = 'taller villa el salvador'
  )
  AND NOT EXISTS (
    SELECT 1 FROM "catalogo_detalle" AS official
    WHERE official."id_catalogo" = detail."id_catalogo" AND official."nombre" = 'Patio taller Villa El Salvador'
  );

UPDATE "catalogo_detalle" AS alias
SET "estado" = false
FROM "catalogos" AS catalog
WHERE alias."id_catalogo" = catalog."id_catalogo"
  AND catalog."codigo" = 'LUGAR_INCIDENTE'
  AND lower(alias."nombre") = 'taller villa el salvador'
  AND EXISTS (
    SELECT 1 FROM "catalogo_detalle" AS official
    WHERE official."id_catalogo" = alias."id_catalogo" AND official."nombre" = 'Patio taller Villa El Salvador'
  );

UPDATE "catalogo_detalle" AS detail
SET "nombre" = 'Patio de maniobras Bayovar', "estado" = true
FROM "catalogos" AS catalog
WHERE detail."id_catalogo" = catalog."id_catalogo"
  AND catalog."codigo" = 'LUGAR_INCIDENTE'
  AND lower(detail."nombre") IN ('taller bayóvar', 'taller bayovar', 'patio taller bayóvar', 'patio taller bayovar', 'maniobras bayovar')
  AND detail."id_detalle" = (
    SELECT MIN(alias."id_detalle") FROM "catalogo_detalle" AS alias
    WHERE alias."id_catalogo" = detail."id_catalogo"
      AND lower(alias."nombre") IN ('taller bayóvar', 'taller bayovar', 'patio taller bayóvar', 'patio taller bayovar', 'maniobras bayovar')
  )
  AND NOT EXISTS (
    SELECT 1 FROM "catalogo_detalle" AS official
    WHERE official."id_catalogo" = detail."id_catalogo" AND official."nombre" = 'Patio de maniobras Bayovar'
  );

UPDATE "catalogo_detalle" AS alias
SET "estado" = false
FROM "catalogos" AS catalog
WHERE alias."id_catalogo" = catalog."id_catalogo"
  AND catalog."codigo" = 'LUGAR_INCIDENTE'
  AND lower(alias."nombre") IN ('taller bayóvar', 'taller bayovar', 'patio taller bayóvar', 'patio taller bayovar', 'maniobras bayovar')
  AND EXISTS (
    SELECT 1 FROM "catalogo_detalle" AS official
    WHERE official."id_catalogo" = alias."id_catalogo" AND official."nombre" = 'Patio de maniobras Bayovar'
  );

UPDATE "catalogo_detalle" AS detail
SET "estado" = true
FROM "catalogos" AS catalog
WHERE detail."id_catalogo" = catalog."id_catalogo"
  AND catalog."codigo" = 'LUGAR_INCIDENTE'
  AND detail."nombre" IN ('Patio taller Villa El Salvador', 'Patio de maniobras Bayovar');

INSERT INTO "catalogo_detalle" ("id_catalogo", "nombre", "orden", "estado")
SELECT catalog."id_catalogo", option_item."nombre", option_item."orden", true
FROM "catalogos" AS catalog
CROSS JOIN (VALUES ('N/A', 3)) AS option_item("nombre", "orden")
WHERE catalog."codigo" = 'TIPO_VIA'
  AND NOT EXISTS (
    SELECT 1 FROM "catalogo_detalle" AS existing_item
    WHERE existing_item."id_catalogo" = catalog."id_catalogo" AND upper(existing_item."nombre") = option_item."nombre"
  );

UPDATE "catalogo_detalle" AS detail
SET "estado" = true, "orden" = 3
FROM "catalogos" AS catalog
WHERE detail."id_catalogo" = catalog."id_catalogo"
  AND catalog."codigo" = 'TIPO_VIA'
  AND upper(detail."nombre") = 'N/A';

INSERT INTO "catalogo_detalle" ("id_catalogo", "nombre", "orden", "estado")
SELECT catalog."id_catalogo", option_item."nombre", option_item."orden", true
FROM "catalogos" AS catalog
CROSS JOIN (VALUES ('ILEGAL', 2)) AS option_item("nombre", "orden")
WHERE catalog."codigo" = 'DIRECCION_VIA'
  AND NOT EXISTS (
    SELECT 1 FROM "catalogo_detalle" AS existing_item
    WHERE existing_item."id_catalogo" = catalog."id_catalogo" AND upper(existing_item."nombre") = option_item."nombre"
  );

UPDATE "catalogo_detalle" AS detail
SET "estado" = true, "orden" = 2
FROM "catalogos" AS catalog
WHERE detail."id_catalogo" = catalog."id_catalogo"
  AND catalog."codigo" = 'DIRECCION_VIA'
  AND upper(detail."nombre") = 'ILEGAL';

UPDATE "catalogo_detalle" AS detail
SET "estado" = true, "orden" = 3
FROM "catalogos" AS catalog
WHERE detail."id_catalogo" = catalog."id_catalogo"
  AND catalog."codigo" = 'DIRECCION_VIA'
  AND upper(detail."nombre") = 'N/A';
