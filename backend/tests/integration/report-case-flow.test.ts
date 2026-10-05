import { randomUUID } from "node:crypto";
import bcrypt from "bcrypt";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import app from "../../src/app.js";
import prisma from "../../src/lib/prisma.js";
import { ConfiguracionService } from "../../src/modules/configuracion/configuracion.service.js";

const run = randomUUID().slice(0, 8);
const password = `Test-${randomUUID()}`;
const roleIds: number[] = [], groupIds: number[] = [], detailIds: number[] = [];
const userIds: number[] = [], areaIds: number[] = [], caseIds: number[] = [], eventIds: number[] = [];
const actors: Record<string, { id: number; token: string; area: number }> = {};
const catalogs: Record<string, number> = {};
const codes: string[] = [];

beforeAll(async () => {
  const db = await prisma.$queryRaw<{ name: string }[]>`SELECT current_database() AS name`;
  expect(db[0]?.name).toBe("seguridad_operativa_test");
  const groups: Record<string, string[]> = {
    "Estado Hallazgo": ["Recepción", "Evaluación", "Pendiente de Información", "Investigación", "Plan de Acción", "Ejecución", "Prórroga Solicitada", "Verificación", "Cerrado", "Rechazado"],
    "Estado Plan de acción": ["Enviado", "Aceptado", "En Ejecución", "Finalizado", "Cerrado"],
    "Estado Actividad": ["Pendiente", "En progreso", "Completado"],
    "Procedencia": ["Incidencias"], "Tipo SOP": ["Hallazgo"], "Tipo": ["Observación"],
    "Tipo de Reporte": [`Reporte-${run}`], "Lugar de Incidente": [`Lugar-${run}`], "Análisis de Riesgo": [`Riesgo-${run}`],
  };
  for (const [nombre, values] of Object.entries(groups)) {
    let group = await prisma.catalogos.findUnique({ where: { nombre } });
    if (!group) {
      group = await prisma.catalogos.create({ data: { nombre, codigo: `TEST-${run}-${groupIds.length}` } });
      groupIds.push(group.id_catalogo);
    }
    for (const value of values) {
      let detail = await prisma.catalogo_detalle.findFirst({ where: { id_catalogo: group.id_catalogo, nombre: value } });
      if (!detail) {
        detail = await prisma.catalogo_detalle.create({ data: { id_catalogo: group.id_catalogo, nombre: value } });
        detailIds.push(detail.id_detalle);
      }
      catalogs[value] = detail.id_detalle;
    }
  }
  await ConfiguracionService.bootstrapSequences();
  const hash = await bcrypt.hash(password, 10);
  for (const [key, roleName] of Object.entries({ so: "Seguridad Operativa", jefe: "Jefe de Área", ajeno: "Jefe de Área", reportante: "Reportante", monitor: "Monitorista", admin: "Admin" })) {
    let role = await prisma.roles.findUnique({ where: { nombre_rol: roleName } });
    if (!role) {
      role = await prisma.roles.create({ data: { nombre_rol: roleName } });
      roleIds.push(role.id_rol);
    }
    const area = await prisma.areas.create({ data: { nombre_area: `Prueba-${key}-${run}` } });
    areaIds.push(area.id_area);
    const user = await prisma.usuarios.create({ data: {
      codigo_usuario: `T-${userIds.length}-${run}`, nombre: `Usuario ${key} ${run}`, correo: `${key}-${run}@example.invalid`,
      password_hash: hash, id_rol: role.id_rol, id_area: area.id_area, estado: "Activo",
    } });
    userIds.push(user.id_usuario);
    const login = await request(app).post("/api/auth/login").send({ correo: user.correo, password }).expect(200);
    actors[key] = { id: user.id_usuario, token: login.body.data.token, area: area.id_area };
  }
});

afterAll(async () => {
  try {
    await prisma.casos_sop.deleteMany({ where: { id_caso: { in: caseIds } } });
    await prisma.eventos_operativos.deleteMany({ where: { id_evento: { in: eventIds } } });
    await prisma.notificaciones.deleteMany({ where: { OR: [
      { usuario: { in: userIds } }, ...codes.map(code => ({ titulo: { contains: code } })),
    ] } });
    await prisma.auditoria.deleteMany({ where: { usuario: { in: userIds } } });
    await prisma.sesiones.deleteMany({ where: { usuario: { in: userIds } } });
    await prisma.usuarios.deleteMany({ where: { id_usuario: { in: userIds } } });
    await prisma.areas.deleteMany({ where: { id_area: { in: areaIds } } });
    await prisma.catalogo_detalle.deleteMany({ where: { id_detalle: { in: detailIds } } });
    await prisma.catalogos.deleteMany({ where: { id_catalogo: { in: groupIds }, catalogo_detalle: { none: {} } } });
    await prisma.roles.deleteMany({ where: { id_rol: { in: roleIds }, usuarios: { none: {} } } });
  } finally { await prisma.$disconnect(); }
});

const auth = (who = "so") => `Bearer ${actors[who]!.token}`;
const reportBody = () => ({ id_tipo: catalogs[`Reporte-${run}`], id_lugar: catalogs[`Lugar-${run}`], descripcion: `Condición insegura detectada en prueba ${run}`, modalidad: "anonimo" });
async function createReport(identified = false) {
  const client = request.agent(app);
  const response = await client.post("/api/reports")
    .set("Authorization", auth("reportante"))
    .send({ ...reportBody(), ...(identified ? { modalidad: "identificado", nombre_reportante: "Persona privada", correo_reportante: "privado@example.invalid", telefono_reportante: "+51999999999" } : {}) }).expect(201);
  const { id_caso, id_evento, codigo_sop } = response.body.data;
  caseIds.push(id_caso); eventIds.push(id_evento); codes.push(codigo_sop);
  return { client, id: id_caso as number, code: codigo_sop as string };
}
async function state(id: number) {
  const row = await prisma.casos_sop.findUniqueOrThrow({ where: { id_caso: id }, include: { catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: true } });
  return row.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre;
}
async function plannedCase() {
  const report = await createReport();
  await request(app).post(`/api/cases/${encodeURIComponent(report.code)}/approve`).set("Authorization", auth()).expect(200);
  await request(app).post(`/api/cases/${encodeURIComponent(report.code)}/evaluate`).set("Authorization", auth()).send({
    id_riesgo: catalogs[`Riesgo-${run}`], id_area: actors.jefe!.area, id_responsable: actors.so!.id,
    clasificacion: "Condición insegura", descripcion_evento: "Evaluación de condición insegura", requiere_investigacion: false,
  }).expect(200);
  expect(await state(report.id)).toBe("Plan de Acción");
  await request(app).post(`/api/cases/${encodeURIComponent(report.code)}/plans`).set("Authorization", auth()).send({
    descripcion: "Corregir la condición insegura", id_area: actors.jefe!.area, responsable: actors.jefe!.id,
    fecha_plan: "2026-12-31", actividades: [{ descripcion: "Inspeccionar y corregir el equipo", responsable: actors.jefe!.id }],
  }).expect(201);
  const plan = await prisma.planes_accion.findFirstOrThrow({ where: { id_caso: report.id }, include: { actividades_plan: true } });
  return { ...report, plan };
}

describe("API real: reportes y ciclo de planes", () => {
  it("desactivar una cuenta revoca sus sesiones y bloquea nuevos accesos", async () => {
    const user = actors.monitor!;
    await request(app).patch(`/api/users/${user.id}`).set("Authorization", auth("jefe")).send({ estado: "Inactivo" }).expect(403);
    await request(app).patch(`/api/users/${user.id}`).set("Authorization", auth("admin")).send({ estado: "Inactivo" }).expect(200);
    await request(app).get("/api/users/basicos").set("Authorization", auth("monitor")).expect(401);
    await request(app).post("/api/auth/login").send({ correo: `monitor-${run}@example.invalid`, password }).expect(401);
    await request(app).patch(`/api/users/${user.id}`).set("Authorization", auth("admin")).send({ estado: "Activo" }).expect(200);
    const login = await request(app).post("/api/auth/login").send({ correo: `monitor-${run}@example.invalid`, password }).expect(200);
    user.token = login.body.data.token;
  });
  it("cambiar el rol invalida el token anterior y usa el nuevo rol al ingresar", async () => {
    const user = actors.monitor!;
    const role = await prisma.roles.findUniqueOrThrow({ where: { nombre_rol: "Reportante" } });
    const previousRole = (await prisma.usuarios.findUniqueOrThrow({ where: { id_usuario: user.id } })).id_rol!;
    await request(app).patch(`/api/users/${user.id}`).set("Authorization", auth("admin")).send({ id_rol: role.id_rol }).expect(200);
    await request(app).get("/api/users/basicos").set("Authorization", auth("monitor")).expect(401);
    const login = await request(app).post("/api/auth/login").send({ correo: `monitor-${run}@example.invalid`, password }).expect(200);
    expect(login.body.data.usuario.rol).toBe("Reportante");
    await request(app).get("/api/users").set("Authorization", `Bearer ${login.body.data.token}`).expect(403);
    await request(app).patch(`/api/users/${user.id}`).set("Authorization", auth("admin")).send({ id_rol: previousRole }).expect(200);
    const restored = await request(app).post("/api/auth/login").send({ correo: `monitor-${run}@example.invalid`, password }).expect(200);
    user.token = restored.body.data.token;
  });
  it("investigación conserva causa raíz y conclusiones antes de preparar planes", async () => {
    const report = await createReport();
    const url = `/api/cases/${encodeURIComponent(report.code)}`;
    await request(app).post(`${url}/approve`).set("Authorization", auth()).expect(200);
    await request(app).post(`${url}/evaluate`).set("Authorization", auth()).send({ id_riesgo: catalogs[`Riesgo-${run}`], clasificacion: "Condición insegura", descripcion_evento: "Descripción del evento investigado", requiere_investigacion: true }).expect(200);
    expect(await state(report.id)).toBe("Investigación");
    await request(app).post(`${url}/investigation`).set("Authorization", auth()).send({ causa_raiz: "x", conclusiones: "y" }).expect(400);
    await request(app).post(`${url}/investigation`).set("Authorization", auth()).send({ causa_raiz: "Falta de mantenimiento preventivo", conclusiones: "Actualizar el programa de mantenimiento" }).expect(200);
    expect(await state(report.id)).toBe("Plan de Acción");
    expect(await prisma.investigacion_caso.findUniqueOrThrow({ where: { id_caso: report.id } })).toMatchObject({ causa_raiz: "Falta de mantenimiento preventivo", conclusiones: "Actualizar el programa de mantenimiento" });
  });
  it("solicitudes de información solo se responden una vez desde el dispositivo autorizado", async () => {
    const client = request.agent(app);
    const created = await client.post("/api/reports").send(reportBody()).expect(201);
    const { id_caso, id_evento, codigo_sop } = created.body.data;
    caseIds.push(id_caso); eventIds.push(id_evento); codes.push(codigo_sop);
    const caseUrl = `/api/cases/${encodeURIComponent(codigo_sop)}/request-info`;
    await request(app).post(caseUrl).set("Authorization", auth()).send({ mensaje: "Indique la ubicación exacta del hallazgo" }).expect(201);
    await request(app).post(caseUrl).set("Authorization", auth()).send({ mensaje: "Indique la hora exacta del hallazgo" }).expect(201);
    expect(await state(id_caso)).toBe("Pendiente de Información");
    const pending = await prisma.solicitudes_informacion.findFirstOrThrow({ where: { id_caso } });
    const url = `/api/reports/consulta/${encodeURIComponent(codigo_sop)}/responder-info`;
    const body = { id_solicitud: pending.id_solicitud, respuesta: "Ocurrió en el acceso norte de la estación" };
    await request(app).post(url).send(body).expect(403);
    await client.post(url).send(body).expect(200);
    expect(await state(id_caso)).toBe("Pendiente de Información");
    await client.post(url).send(body).expect(400);
    const remaining = await prisma.solicitudes_informacion.findFirstOrThrow({ where: { id_caso, respondida: false } });
    await client.post(url).send({ id_solicitud: remaining.id_solicitud, respuesta: "El hallazgo ocurrió a las 09:30" }).expect(200);
    expect(await state(id_caso)).toBe("Recepción");
    expect(await prisma.solicitudes_informacion.findUniqueOrThrow({ where: { id_solicitud: pending.id_solicitud } })).toMatchObject({ respondida: true, respuesta: body.respuesta });
  });
  it("la prórroga amplía el plazo y la reapertura requiere permiso vigente", async () => {
    const report = await plannedCase();
    const url = `/api/cases/planes/${report.plan.id_plan}`;
    await request(app).post(`${url}/accept`).set("Authorization", auth("jefe")).expect(200);
    await request(app).post(`${url}/extension`).set("Authorization", auth("jefe")).send({ nueva_fecha: "2026-12-01", justificacion: "Se necesita completar la inspección" }).expect(400);
    await request(app).post(`${url}/extension`).set("Authorization", auth("jefe")).send({ nueva_fecha: "2027-01-31", justificacion: "Se necesita completar la inspección" }).expect(201);
    expect(await state(report.id)).toBe("Prórroga Solicitada");
    await request(app).post(`${url}/extension/review`).set("Authorization", auth()).send({ decision: "aprobada", fecha_aprobada: "2027-02-15" }).expect(200);
    expect((await prisma.planes_accion.findUniqueOrThrow({ where: { id_plan: report.plan.id_plan } })).fecha_reprogramada?.toISOString().slice(0, 10)).toBe("2027-02-15");
    await request(app).post(`${url}/complete-execution`).set("Authorization", auth("jefe")).send({ descripcion: "Se completó la corrección del equipo" }).expect(200);
    await request(app).post(`${url}/review-final`).set("Authorization", auth()).send({ decision: "aprobada" }).expect(200);
    const caseUrl = `/api/cases/${encodeURIComponent(report.code)}`;
    await request(app).post(`${caseUrl}/close`).set("Authorization", auth()).expect(200);
    await request(app).post(`${caseUrl}/reopen`).set("Authorization", auth()).send({ destino: "Verificación" }).expect(403);
    await request(app).patch(`/api/users/${actors.so!.id}`).set("Authorization", auth("admin")).send({ puede_reabrir_casos: true }).expect(200);
    await request(app).post(`${caseUrl}/reopen`).set("Authorization", auth()).send({ destino: "Verificación" }).expect(401);
    const login = await request(app).post("/api/auth/login").send({ correo: `so-${run}@example.invalid`, password }).expect(200);
    actors.so!.token = login.body.data.token;
    await request(app).post(`${caseUrl}/reopen`).set("Authorization", auth()).send({ destino: "Verificación", nota: "Verificar nuevamente la corrección" }).expect(200);
    expect(await state(report.id)).toBe("Verificación");
    await request(app).patch(`/api/users/${actors.so!.id}`).set("Authorization", auth("admin")).send({ puede_reabrir_casos: false }).expect(200);
    const restored = await request(app).post("/api/auth/login").send({ correo: `so-${run}@example.invalid`, password }).expect(200);
    actors.so!.token = restored.body.data.token;
  });
  it("un reporte distribuye planes entre áreas y solo se cierra cuando todos fueron revisados", async () => {
    const report = await plannedCase();
    await request(app).post(`/api/cases/${encodeURIComponent(report.code)}/plans`).set("Authorization", auth()).send({
      descripcion: "Corregir señalización por otra área", id_area: actors.ajeno!.area, responsable: actors.ajeno!.id,
      fecha_plan: "2026-12-31", actividades: [{ descripcion: "Inspeccionar señalización", responsable: actors.ajeno!.id }],
    }).expect(201);
    const second = await prisma.planes_accion.findFirstOrThrow({ where: { id_caso: report.id, responsable: actors.ajeno!.id }, include: { catalogo_detalle: true, actividades_plan: true } });
    expect(second.codigo_plan).not.toBe(report.plan.codigo_plan);
    const firstUrl = `/api/cases/planes/${report.plan.id_plan}`;
    const secondUrl = `/api/cases/planes/${second.id_plan}`;
    await request(app).post(`${secondUrl}/accept`).set("Authorization", auth("jefe")).expect(403);
    await request(app).post(`${firstUrl}/accept`).set("Authorization", auth("jefe")).expect(200);
    expect(await state(report.id)).toBe("Plan de Acción");
    // SO can start execution with the accepted plan while another area waits.
    await request(app).post(`/api/cases/${encodeURIComponent(report.code)}/start-execution`).set("Authorization", auth()).expect(200);
    await request(app).post(`${secondUrl}/complete-execution`).set("Authorization", auth("ajeno")).send({ descripcion: "Intento de finalizar un plan aún sin aceptar" }).expect(400);
    await request(app).post(`${firstUrl}/complete-execution`).set("Authorization", auth("jefe")).send({ descripcion: "Equipo inspeccionado y condición corregida" }).expect(200);
    await request(app).post(`${firstUrl}/review-final`).set("Authorization", auth()).send({ decision: "aprobada" }).expect(200);
    expect(await state(report.id)).toBe("Ejecución");
    const waiting = await prisma.planes_accion.findUniqueOrThrow({ where: { id_plan: second.id_plan }, include: { catalogo_detalle: true, actividades_plan: true } });
    expect(waiting.catalogo_detalle.nombre).toBe("Enviado");
    expect(Number(waiting.actividades_plan[0]!.porcentaje)).toBe(0);
    await request(app).post(`/api/cases/${encodeURIComponent(report.code)}/close`).set("Authorization", auth()).expect(409);
    await request(app).post(`${secondUrl}/accept`).set("Authorization", auth("ajeno")).expect(200);
    await request(app).post(`${secondUrl}/complete-execution`).set("Authorization", auth("ajeno")).send({ descripcion: "Señalización inspeccionada y corregida" }).expect(200);
    await request(app).post(`${secondUrl}/review-final`).set("Authorization", auth()).send({ decision: "rechazada", nota: "Completar la inspección del segundo equipo" }).expect(200);
    const first = await prisma.planes_accion.findUniqueOrThrow({ where: { id_plan: report.plan.id_plan }, include: { catalogo_detalle: true, actividades_plan: true } });
    expect(first.catalogo_detalle.nombre).toBe("Cerrado");
    expect(Number(first.actividades_plan[0]!.porcentaje)).toBe(100);
    expect(await state(report.id)).toBe("Ejecución");
    await request(app).post(`${secondUrl}/complete-execution`).set("Authorization", auth("ajeno")).send({ descripcion: "Se completó la inspección pendiente del equipo" }).expect(200);
    await request(app).post(`${secondUrl}/review-final`).set("Authorization", auth()).send({ decision: "aprobada" }).expect(200);
    expect(await state(report.id)).toBe("Verificación");
    await request(app).post(`/api/cases/${encodeURIComponent(report.code)}/close`).set("Authorization", auth()).expect(200);
    expect(await state(report.id)).toBe("Cerrado");
  });
  it("rechaza datos inválidos y catálogos cruzados sin crear un caso", async () => {
    const before = await prisma.casos_sop.count();
    await request(app).post("/api/reports").send({ ...reportBody(), descripcion: "corto" }).expect(400);
    await request(app).post("/api/reports").send({ ...reportBody(), id_lugar: catalogs[`Reporte-${run}`] }).expect(400);
    await request(app).post("/api/reports").send({ ...reportBody(), origen: "seguridad_operativa" }).expect(400);
    expect(await prisma.casos_sop.count()).toBe(before);
  });
  it("un reporte anónimo no persiste la identidad de la sesión", async () => {
    const report = await createReport();
    expect(await prisma.casos_sop.findUniqueOrThrow({ where: { id_caso: report.id } })).toMatchObject({ created_by: null, nombre_reportante: null, correo_reportante: null, telefono_reportante: null });
    expect(await state(report.id)).toBe("Recepción");
  });
  it("el reportante identificado solo consulta sus propios reportes", async () => {
    const report = await createReport(true);
    await request(app).get(`/api/reports/${encodeURIComponent(report.code)}`).set("Authorization", auth("reportante")).expect(200);
    await request(app).get(`/api/reports/${encodeURIComponent(report.code)}`).set("Authorization", auth("monitor")).expect(403);
    const publicClient = request.agent(app);
    await publicClient.get(`/api/reports/consulta/${encodeURIComponent(report.code)}`).expect(403);
  });
  it("un rol ajeno no puede aprobar y una transición repetida conserva el estado", async () => {
    const report = await createReport();
    const url = `/api/cases/${encodeURIComponent(report.code)}/approve`;
    await request(app).post(url).set("Authorization", auth("jefe")).expect(403);
    expect(await state(report.id)).toBe("Recepción");
    await request(app).post(url).set("Authorization", auth()).expect(200);
    await request(app).post(url).set("Authorization", auth()).expect(409);
    expect(await state(report.id)).toBe("Evaluación");
  });
  it("el jefe de otra área no consulta ni modifica el plan", async () => {
    const report = await plannedCase();
    await request(app).get(`/api/cases/${encodeURIComponent(report.code)}`).set("Authorization", auth("ajeno")).expect(404);
    await request(app).post(`/api/cases/planes/${report.plan.id_plan}/accept`).set("Authorization", auth("ajeno")).send({ actor: "Nombre suplantado" }).expect(403);
    await request(app).patch(`/api/cases/actividades/${report.plan.actividades_plan[0]!.id_actividad}`).set("Authorization", auth("ajeno")).send({ estado: "Completado" }).expect(403);
    expect(await state(report.id)).toBe("Plan de Acción");
  });
  it("aceptar nuevamente un plan no debe reiniciar actividades completadas", async () => {
    const report = await plannedCase();
    const url = `/api/cases/planes/${report.plan.id_plan}/accept`;
    await request(app).post(url).set("Authorization", auth("jefe")).send({ actor: "Nombre suplantado" }).expect(200);
    const id = report.plan.actividades_plan[0]!.id_actividad;
    await request(app).patch(`/api/cases/actividades/${id}`).set("Authorization", auth("jefe")).send({ estado: "Completado" }).expect(200);
    await request(app).post(url).set("Authorization", auth("jefe")).expect(400);
    expect(Number((await prisma.actividades_plan.findUniqueOrThrow({ where: { id_actividad: id } })).porcentaje)).toBe(100);
    const timeline = await prisma.timeline_caso.findMany({ where: { id_caso: report.id, kind: "plan_aprobado" } });
    expect(timeline).toHaveLength(1);
    expect(timeline[0]!.actor).toBe(`Usuario jefe ${run}`);
  });
  it("ejecuta, verifica y cierra el caso con auditoría y estados persistidos", async () => {
    const report = await plannedCase();
    const url = `/api/cases/planes/${report.plan.id_plan}`;
    await request(app).post(`${url}/accept`).set("Authorization", auth("jefe")).expect(200);
    expect(await state(report.id)).toBe("Ejecución");
    await request(app).post(`/api/cases/${encodeURIComponent(report.code)}/close`).set("Authorization", auth()).expect(409);
    await request(app).post(`${url}/complete-execution`).set("Authorization", auth("jefe")).send({ descripcion: "Se completó la corrección y se inspeccionó el equipo" }).expect(200);
    await request(app).post(`${url}/review-final`).set("Authorization", auth("jefe")).send({ decision: "aprobada" }).expect(403);
    await request(app).post(`${url}/review-final`).set("Authorization", auth()).send({ decision: "aprobada" }).expect(200);
    expect(await state(report.id)).toBe("Verificación");
    await request(app).post(`/api/cases/${encodeURIComponent(report.code)}/close`).set("Authorization", auth()).send({ nota: "Corrección verificada" }).expect(200);
    expect(await state(report.id)).toBe("Cerrado");
    const plan = await prisma.planes_accion.findUniqueOrThrow({ where: { id_plan: report.plan.id_plan }, include: { catalogo_detalle: true, actividades_plan: true } });
    expect(plan.catalogo_detalle.nombre).toBe("Cerrado");
    expect(plan.actividades_plan.every(a => Number(a.porcentaje) === 100)).toBe(true);
    expect(await prisma.auditoria.count({ where: { usuario: actors.so!.id, id_registro: report.id, tabla_afectada: "casos_sop" } })).toBeGreaterThan(0);
    await request(app).post(`/api/cases/${encodeURIComponent(report.code)}/reopen`).set("Authorization", auth()).send({ destino: "Verificación" }).expect(403);
    expect(await state(report.id)).toBe("Cerrado");
  });
});
