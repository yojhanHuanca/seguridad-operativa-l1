import "dotenv/config";
import prisma from "../src/lib/prisma.js";
import { CATALOGOS } from "./seed/catalogos-data.js";
import { AREAS } from "./seed/areas-data.js";
import { ROLES } from "./seed/roles-data.js";
import { USUARIOS } from "./seed/usuarios-data.js";

// ── helpers ──────────────────────────────────────────────────────────────

/** DD/MM/YYYY -> Date (formato usado en la hoja BD, ej. "13/5/2024") */
function parseSlashDate(s: string): Date {
  const [d, m, y] = s.split("/").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

const MESES: Record<string, number> = {
  ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5,
  jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11,
};

/** DD-mmm-YY -> Date (formato usado en fechas de plan, ej. "31-jul-25") */
function parseDashDate(s: string): Date {
  const [d, mon, y] = s.split("-");
  const year = 2000 + Number(y);
  return new Date(Date.UTC(year, MESES[mon.toLowerCase()], Number(d)));
}

/** "11:00:00 a. m." -> Date (solo hora, fecha base 1970-01-01) */
function parseTime(s: string): Date {
  const m = s.match(/(\d{1,2}):(\d{2}):(\d{2})\s*([ap])/i);
  if (!m) throw new Error(`Hora no reconocida: ${s}`);
  let h = Number(m[1]);
  const min = Number(m[2]);
  const sec = Number(m[3]);
  const pm = m[4].toLowerCase() === "p";
  if (pm && h !== 12) h += 12;
  if (!pm && h === 12) h = 0;
  return new Date(Date.UTC(1970, 0, 1, h, min, sec));
}

async function findCatalogoDetalleId(id_catalogo: number, nombre: string): Promise<number> {
  const row = await prisma.catalogo_detalle.findFirst({ where: { id_catalogo, nombre } });
  if (!row) throw new Error(`catalogo_detalle no encontrado: catalogo=${id_catalogo} nombre="${nombre}"`);
  return row.id_detalle;
}

// ── 1. Catálogos ─────────────────────────────────────────────────────────

async function seedCatalogos() {
  console.log("→ Catálogos");
  for (const [gi, group] of CATALOGOS.entries()) {
    const catalogo = await prisma.catalogos.upsert({
      where: { nombre: group.nombre },
      update: { descripcion: group.descripcion },
      create: { codigo: group.codigo, nombre: group.nombre, descripcion: group.descripcion },
    });

    for (const [i, item] of group.items.entries()) {
      // Cuando el item trae `codigo` (ej. la matriz de riesgo 1A..4E), ese es
      // el identificador real y `nombre` puede repetirse entre varios items
      // (varios códigos comparten la misma categoría de riesgo) — hay que
      // matchear por `codigo`, no por `nombre`, o se pisan entre sí y se
      // pierden filas en cada reseed.
      const existing = await prisma.catalogo_detalle.findFirst({
        where: item.codigo
          ? { id_catalogo: catalogo.id_catalogo, codigo: item.codigo }
          : { id_catalogo: catalogo.id_catalogo, nombre: item.nombre },
      });
      if (existing) {
        await prisma.catalogo_detalle.update({
          where: { id_detalle: existing.id_detalle },
          data: { codigo: item.codigo, descripcion: item.descripcion, orden: i + 1 },
        });
      } else {
        await prisma.catalogo_detalle.create({
          data: {
            id_catalogo: catalogo.id_catalogo,
            codigo: item.codigo,
            nombre: item.nombre,
            descripcion: item.descripcion,
            orden: i + 1,
          },
        });
      }
    }
    console.log(`  [${gi + 1}/${CATALOGOS.length}] ${group.nombre} (${group.items.length} valores)`);
  }
}

// ── 2. Áreas ─────────────────────────────────────────────────────────────

async function seedAreas() {
  console.log("→ Áreas");
  for (const nombre_area of AREAS) {
    await prisma.areas.upsert({ where: { nombre_area }, update: {}, create: { nombre_area } });
  }
  console.log(`  ${AREAS.length} áreas`);
}

// ── 3. Roles ─────────────────────────────────────────────────────────────

async function seedRoles() {
  console.log("→ Roles");
  for (const nombre_rol of ROLES) {
    await prisma.roles.upsert({ where: { nombre_rol }, update: {}, create: { nombre_rol } });
  }
  console.log(`  ${ROLES.length} roles`);
}

// ── 4. Usuarios (solo los 2 de los datos de ejemplo) ────────────────────

async function seedUsuarios() {
  console.log("→ Usuarios de ejemplo");
  for (const u of USUARIOS) {
    const area = await prisma.areas.findUniqueOrThrow({ where: { nombre_area: u.area } });
    const rol = await prisma.roles.findUniqueOrThrow({ where: { nombre_rol: u.rol } });
    await prisma.usuarios.upsert({
      where: { correo: u.correo },
      update: {
        codigo_usuario: u.codigo_usuario,
        nombre: u.nombre,
        cargo: u.cargo,
        estado: "Activo",
        id_area: area.id_area,
        id_rol: rol.id_rol,
      },
      create: {
        codigo_usuario: u.codigo_usuario,
        nombre: u.nombre,
        correo: u.correo,
        cargo: u.cargo,
        estado: "Activo",
        id_area: area.id_area,
        id_rol: rol.id_rol,
        // password_hash queda null: no hay credenciales reales en el CSV.
      },
    });
  }
  console.log(`  ${USUARIOS.length} usuarios`);
}

// ── 5. Caso SOP de ejemplo (SOP 01-2024) ────────────────────────────────

async function seedCasoEjemplo() {
  console.log("→ Caso SOP de ejemplo (SOP 01-2024)");

  const hector = await prisma.usuarios.findUniqueOrThrow({ where: { correo: "hector.hinostroza@metrolinea1.pe" } });
  const christian = await prisma.usuarios.findUniqueOrThrow({ where: { correo: "christian.oliva@metrolinea1.pe" } });

  const catTipoSOP = await prisma.catalogos.findUniqueOrThrow({ where: { nombre: "Tipo SOP" } });
  const catTipo = await prisma.catalogos.findUniqueOrThrow({ where: { nombre: "Tipo" } });
  const catProcedencia = await prisma.catalogos.findUniqueOrThrow({ where: { nombre: "Procedencia" } });
  const catEstadoHallazgo = await prisma.catalogos.findUniqueOrThrow({ where: { nombre: "Estado Hallazgo" } });
  const catSubtipoSOP = await prisma.catalogos.findUniqueOrThrow({ where: { nombre: "Subtipo SOP" } });
  const catEstadoPlan = await prisma.catalogos.findUniqueOrThrow({ where: { nombre: "Estado Plan de acción" } });

  const estadoHallazgoId = await findCatalogoDetalleId(catEstadoHallazgo.id_catalogo, "Cerrado");
  const procedenciaId = await findCatalogoDetalleId(catProcedencia.id_catalogo, "Incidencias");
  const tipoId = await findCatalogoDetalleId(catTipo.id_catalogo, "No Conformidad");
  const tipoSopId = await findCatalogoDetalleId(catTipoSOP.id_catalogo, "Hallazgo");
  const subtipoSopId = await findCatalogoDetalleId(catSubtipoSOP.id_catalogo, "Incumplimiento Operativo");
  const estadoPlanCerradoId = await findCatalogoDetalleId(catEstadoPlan.id_catalogo, "Cerrado");

  const areaIngenieria = await prisma.areas.findUniqueOrThrow({ where: { nombre_area: "Ingeniería" } });
  const areaOperaciones = await prisma.areas.findUniqueOrThrow({ where: { nombre_area: "Operaciones" } });

  const descripcion = `Se verificó que en los trenes Ansaldo no cuentan con un sello o precinto en los interruptores 1ST10 (bloqueo de puertas), conmutadores KUM (Hombre muerto) y ATP, como lo indica el Manual de conducción del tren Ansaldo.

Incumplimiento del Manual:
3. PREPARACIÓN DEL TREN PARA EL SERVICIO
2º En el Armario 2 (fig. 3.1), verificar la correcta posición de los Interruptores de MT y BT (fig.: 3.3 y 3.4), luego cerrar el seccionador de batería SB (fig. 3.2, pos. 3) y verificar la posición de los conmutadores IEF y KME (fig. 3.5).
En el Armario 1 (fig. 3.1), verificar la correcta posición de los conmutadores KUM y ATP, verificar el sello o precinto de seguridad de las palancas de desbloqueo mecánico del Freno de Estacionamiento y verificar que los grifos neumáticos ubicados en la parte baja se encuentren abiertos, según el esquema mostrado en el propio armario.
(Asegurarse que los interruptores y conmutadores señalados estén con su precinto o sello de seguridad)
Interruptores abiertos
Con sello:
- Consenso bloqueo de puertas (1ST10) (Pos.10)
(...)
Conmutadores con sello Ubic. Pos.
- Hombre Muerto (KUM) Arm. 1 "0"
- Automatic Train Protection (ATP) Arm. 1 "0"
 - GSSOMA-SO-I-23-2024`;

  // Nota: casos_sop guarda además, de forma denormalizada, el "plan vigente"
  // (area_responsable/responsable_plan/estado_plan/fecha_plan). Como este
  // caso tiene 2 planes (PLA-01, PLA-02), se usó PLA-02 como el vigente por
  // ser el que tiene la fecha reprogramada más reciente (17-jun-26 > 11-may-26).
  // Corregir si el criterio real del cliente es otro.
  const caso = await prisma.casos_sop.upsert({
    where: { codigo_sop: "SOP 01-2024" },
    update: {},
    create: {
      codigo_sop: "SOP 01-2024",
      fecha_hallazgo: parseSlashDate("13/5/2024"),
      fecha_evento: parseSlashDate("13/5/2024"),
      estado_hallazgo: estadoHallazgoId,
      procedencia: procedenciaId,
      tipo: tipoId,
      descripcion,
      responsable_hallazgo: hector.id_usuario,
      tipo_sop: tipoSopId,
      subtipo_sop: subtipoSopId,
      acr: null,
      area_responsable: areaOperaciones.id_area,
      responsable_plan: hector.id_usuario,
      estado_plan: estadoPlanCerradoId,
      fecha_plan: parseDashDate("18-jul-25"),
      fecha_reprogramada: parseDashDate("17-jun-26"),
      created_by: hector.id_usuario,
    },
  });

  const planes = [
    {
      codigo_plan: "SOP-01-2024-PLA-01",
      descripcion:
        "Gestionar la adquisición del bloqueo del interruptor 1ST10 (consenso bloqueo de puertas) e ingresar la actividad de revisión del estado del bloqueo del interruptor 1ST10 en un documento de mantenimiento para los trenes Ansaldo.",
      id_area: areaIngenieria.id_area,
      responsable: christian.id_usuario,
      fecha_plan: parseDashDate("31-jul-25"),
      fecha_reprogramada: parseDashDate("11-may-26"),
    },
    {
      codigo_plan: "SOP-01-2024-PLA-02",
      descripcion:
        "Se va a modificar el Manual de Conducción del Tren Ansaldo GOF-OSF-TRE-MAN-001 en el par. 3 PREPARACIÓN DEL TREN PARA EL SERVICIO, parte 2° (Conmutadores con sello - Automatic Train Protección (ATP)), para retirar la necesidad de colocar precinto/ sello en el conmutador del ATP ya que en la operación es necesario realizar el RESET de ATP en cada preparación por no reconocimiento en las inversiones de cabina según la evaluación realizada entre ingeniería y ALSTOM-BOMBARDIER.",
      id_area: areaOperaciones.id_area,
      responsable: hector.id_usuario,
      fecha_plan: parseDashDate("18-jul-25"),
      fecha_reprogramada: parseDashDate("17-jun-26"),
    },
  ];

  for (const p of planes) {
    await prisma.planes_accion.upsert({
      where: { codigo_plan: p.codigo_plan },
      update: {},
      create: {
        id_caso: caso.id_caso,
        codigo_plan: p.codigo_plan,
        descripcion: p.descripcion,
        id_area: p.id_area,
        responsable: p.responsable,
        estado: estadoPlanCerradoId,
        fecha_plan: p.fecha_plan,
        fecha_reprogramada: p.fecha_reprogramada,
      },
    });
  }

  console.log(`  Caso ${caso.codigo_sop} + ${planes.length} planes de acción`);
}

// ── 6. Evento operativo de ejemplo ──────────────────────────────────────

async function seedEventoEjemplo() {
  console.log("→ Evento operativo de ejemplo");

  const catTipoIncidente = await prisma.catalogos.findUniqueOrThrow({ where: { nombre: "Tipo de incidente operativo" } });
  const catUbicacion = await prisma.catalogos.findUniqueOrThrow({ where: { nombre: "Ubicación" } });
  const catLugar = await prisma.catalogos.findUniqueOrThrow({ where: { nombre: "Lugar de Incidente" } });
  const catPersonal = await prisma.catalogos.findUniqueOrThrow({ where: { nombre: "Personal o falla Involucrado" } });
  const catTipoCausa = await prisma.catalogos.findUniqueOrThrow({ where: { nombre: "Tipo Causa" } });
  const catPosibleCausa = await prisma.catalogos.findUniqueOrThrow({ where: { nombre: "Posible Causa" } });

  const tipoIncidenteId = await findCatalogoDetalleId(catTipoIncidente.id_catalogo, "INGRESO A LA VÍA");
  const ubicacionId = await findCatalogoDetalleId(catUbicacion.id_catalogo, "ESTACIÓN");
  const lugarId = await findCatalogoDetalleId(catLugar.id_catalogo, "GAM");
  const personalId = await findCatalogoDetalleId(catPersonal.id_catalogo, "PASAJERO");
  const tipoCausaId = await findCatalogoDetalleId(catTipoCausa.id_catalogo, "FACTOR EXTERNO");
  const posibleCausaId = await findCatalogoDetalleId(catPosibleCausa.id_catalogo, "Recoger objeto");

  // codigo_evento no viene en el CSV y el campo es opcional (String? @unique)
  // -> se deja sin asignar en vez de inventar uno. Como no hay código para
  // usar como llave de upsert, la idempotencia se resuelve buscando por la
  // combinación real de datos del evento (fecha + hora + tipo + lugar).
  const eventoExistente = await prisma.eventos_operativos.findFirst({
    where: {
      fecha: parseSlashDate("8/3/2012"),
      hora: parseTime("11:00:00 a. m."),
      tipo_incidente: tipoIncidenteId,
      lugar_incidente: lugarId,
    },
  });

  const eventoData = {
    codigo_evento: null,
    fecha: parseSlashDate("8/3/2012"),
    hora: parseTime("11:00:00 a. m."),
    anio: 2012,
    mes: 3,
    dia: "jue",
    // rango_horario: la celda de origen tenía #ERROR! -> se deja sin FK.
    tipo_incidente: tipoIncidenteId,
    ubicacion: ubicacionId,
    lugar_incidente: lugarId,
    personal_involucrado: personalId,
    tipo_causa: tipoCausaId,
    posible_causa: posibleCausaId,
  };

  if (eventoExistente) {
    await prisma.eventos_operativos.update({ where: { id_evento: eventoExistente.id_evento }, data: eventoData });
  } else {
    await prisma.eventos_operativos.create({ data: eventoData });
  }

  console.log("  Evento 08/03/2012 · INGRESO A LA VÍA · GAM (sin código, no venía en el CSV)");
}

// ── main ─────────────────────────────────────────────────────────────────

async function main() {
  await seedCatalogos();
  await seedAreas();
  await seedRoles();
  await seedUsuarios();
  await seedCasoEjemplo();
  await seedEventoEjemplo();
  console.log("\nSeed completado.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
