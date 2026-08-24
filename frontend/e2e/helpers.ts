import type { Page } from '@playwright/test';

type TestRole = 'Admin' | 'Seguridad Operativa' | 'Jefe de Área' | 'Monitorista';

const now = new Date('2026-08-24T12:00:00.000Z').toISOString();

const roles = [
  { id_rol: 1, nombre_rol: 'Admin' },
  { id_rol: 2, nombre_rol: 'Seguridad Operativa' },
  { id_rol: 3, nombre_rol: 'Jefe de Área' },
  { id_rol: 5, nombre_rol: 'Monitorista' },
];

const areas = [
  { id_area: 1, nombre_area: 'Operaciones' },
  { id_area: 2, nombre_area: 'Mantenimiento' },
];

const catalogGroups = [
  {
    id_catalogo: 1,
    codigo: 'TIPO_REPORTE',
    nombre: 'Tipo de Reporte',
    descripcion: null,
    catalogo_detalle: [
      { id_detalle: 101, codigo: null, nombre: 'Accidente', descripcion: null, color: null, orden: 1 },
      { id_detalle: 102, codigo: null, nombre: 'Condición Insegura', descripcion: null, color: null, orden: 2 },
    ],
  },
  {
    id_catalogo: 2,
    codigo: 'LUGAR_INCIDENTE',
    nombre: 'Lugar de Incidente',
    descripcion: null,
    catalogo_detalle: [
      { id_detalle: 201, codigo: 'E01', nombre: 'Villa El Salvador', descripcion: null, color: null, orden: 1 },
      { id_detalle: 202, codigo: 'E02', nombre: 'Maria Auxiliadora', descripcion: null, color: null, orden: 2 },
    ],
  },
  {
    id_catalogo: 3,
    codigo: 'LUGAR_ESPECIFICO',
    nombre: 'Lugar Específico',
    descripcion: null,
    catalogo_detalle: [
      { id_detalle: 301, codigo: null, nombre: 'Andén', descripcion: null, color: null, orden: 1 },
      { id_detalle: 302, codigo: null, nombre: 'Mezzanine', descripcion: null, color: null, orden: 2 },
    ],
  },
  {
    id_catalogo: 4,
    codigo: 'ESTADO_HALLAZGO',
    nombre: 'Estado Hallazgo',
    descripcion: null,
    catalogo_detalle: [
      { id_detalle: 401, codigo: null, nombre: 'Recepción', descripcion: null, color: '#2563eb', orden: 1 },
      { id_detalle: 402, codigo: null, nombre: 'Cerrado', descripcion: null, color: '#64748b', orden: 9 },
    ],
  },
  {
    id_catalogo: 5,
    codigo: 'ANALISIS_RIESGO',
    nombre: 'Análisis de Riesgo',
    descripcion: null,
    catalogo_detalle: [
      { id_detalle: 501, codigo: 'A', nombre: 'Aceptable', descripcion: null, color: '#16a34a', orden: 1 },
      { id_detalle: 502, codigo: 'I', nombre: 'Inaceptable', descripcion: null, color: '#dc2626', orden: 2 },
    ],
  },
];

const configuracion = {
  sistema: { nombre: 'SIGMA L1', version: '1.0.0' },
  numeracion: { prefijoExpedientes: 'SOP', secuenciaExpedientes: 56, prefijoPlanes: 'PLA', secuenciaPlanes: 28 },
  plazos: { diasMaxInvestigacion: 15, diasResponderPlanes: 7, diasSolicitarProrroga: 3 },
  meta: { ultimaActualizacion: now },
};

const indicadores = {
  totalReportes: 0,
  reportesPorTipo: [],
  reportesCerradoVsProceso: [],
  planes: { total: 0, abiertos: 0, donut: [] },
  tendenciaMensual: [],
  analisisRiesgo: [],
  planesAbiertosPorArea: [],
  vencimientoPlanesAbiertos: [],
  reprogramacionPlanesAbiertos: [],
};

function envelope(data: unknown, meta?: unknown) {
  return { success: true, message: 'mock', data, ...(meta ? { meta } : {}) };
}

export async function mockApi(page: Page) {
  await page.route('**/api/**', async (route) => {
    const url = new URL(route.request().url());
    const path = url.pathname.replace(/^\/api/, '');
    const method = route.request().method();

    const json = (data: unknown, meta?: unknown) => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(envelope(data, meta)),
    });

    if (method === 'POST' && path === '/reports') {
      return json({ codigo_sop: 'SOP 99-2026', id_caso: 99, id_evento: 99 });
    }

    if (path === '/configuracion/publica') return json({ nombre: 'SIGMA L1', version: '1.0.0' });
    if (path === '/configuracion') return json(configuracion);
    if (path === '/roles') return json(roles);
    if (path === '/areas') return json(areas);
    if (path === '/catalogs') return json(catalogGroups);
    if (path.startsWith('/catalogs/')) return json({ id_catalogo: 1, nombre: 'Catálogo', catalogo_detalle: [] });
    if (path === '/users/counts') {
      return json({
        total: 4,
        activos: 4,
        conRol: 4,
        sinRol: 0,
        porRol: { '1': 1, '2': 1, '3': 1, '5': 1 },
        porPermiso: { es_responsable: 1, puede_reabrir_casos: 0, puede_rechazar_reportes: 0 },
      });
    }
    if (path === '/users' || path === '/users/basicos') return json([], { total: 0 });
    if (path === '/cases/counts') {
      return json({ todos: 0, nuevos: 0, pendientes: 0, investigacion: 0, proceso: 0, prorrogas: 0, verificacion: 0, cerrados: 0 });
    }
    if (path === '/cases/planes') return json([]);
    if (path === '/cases') return json([], { total: 0 });
    if (path === '/reports') return json([], { total: 0 });
    if (path.startsWith('/reports/consulta/')) {
      return json({
        id_caso: 99,
        codigo_sop: 'SOP 99-2026',
        titulo: 'Reporte de prueba',
        descripcion: 'Reporte creado desde prueba automatizada',
        fecha_hallazgo: now,
        fecha_evento: now,
        created_at: now,
        catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { nombre: 'Recepción', color: '#2563eb' },
        catalogo_detalle_casos_sop_tipoTocatalogo_detalle: { nombre: 'Accidente' },
        catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: { nombre: 'Hallazgo' },
        areas: null,
        anexos_caso: [],
        solicitudes_informacion: [],
        evento_caso: [],
      });
    }
    if (path === '/notifications') return json({ id_usuario: 1, no_leidas: 0, items: [] });
    if (path === '/eventos/counts') return json({ total: 0, registrados: 0, enInvestigacion: 0, cerrados: 0 });
    if (path.startsWith('/eventos/asignados/')) return json([]);
    if (path === '/eventos') return json([], { total: 0 });
    if (path === '/dashboard/indicadores') return json(indicadores);
    if (path === '/auditoria') return json([], { total: 0 });
    if (path === '/auditoria/tablas') return json([]);
    if (path === '/auditoria/counts') return json({});
    if (path === '/profile/me') {
      return json({
        id_usuario: 1,
        codigo_usuario: 'EMP-0001',
        nombre: 'Usuario Prueba',
        correo: 'prueba@linea1.pe',
        cargo: 'Tester',
        telefono: null,
        estado: 'Activo',
        ultimo_acceso: now,
        es_responsable: true,
        puede_reabrir_casos: false,
        puede_rechazar_reportes: false,
        roles: { nombre_rol: 'Admin' },
        areas: { nombre_area: 'Operaciones' },
      });
    }
    if (path === '/profile/me/actividad') return json([]);

    return json([]);
  });
}

export async function loginAs(page: Page, role: TestRole) {
  const user = {
    id_usuario: role === 'Admin' ? 1 : role === 'Seguridad Operativa' ? 2 : role === 'Jefe de Área' ? 3 : 5,
    codigo_usuario: 'EMP-TEST',
    nombre: `${role} Prueba`,
    correo: 'prueba@linea1.pe',
    estado: 'Activo',
    rol: role,
    area: 'Operaciones',
    id_area: 1,
    ultimo_acceso: now,
    es_responsable: role === 'Seguridad Operativa',
    puede_reabrir_casos: false,
    puede_rechazar_reportes: false,
  };

  await page.addInitScript(({ user }) => {
    window.localStorage.setItem('sigma_auth_token', 'token-e2e');
    window.localStorage.setItem('sigma_auth_user', JSON.stringify(user));
  }, { user });
}

export async function expectNoRuntimeCrash(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(150);
  await page.locator('body').waitFor({ state: 'visible' });
}
