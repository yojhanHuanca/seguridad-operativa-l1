# Informe de pruebas — Sistema de Gestión de Seguridad Operativa (Línea 1)

**Fecha:** 18/08/2026 · **Rama:** develop · **Commit:** cc991a2
**Entorno:** backend `localhost:3000` (tsx dev) + PostgreSQL 17 local · 18 usuarios, 45 casos, 41 planes, 6 eventos de monitoreo.

**Alcance:** compilación y linting de ambos proyectos, matriz de permisos por rol contra la API real (5 roles con token válido), recorrido end-to-end del flujo SOP completo, pruebas de validación de entrada, pruebas de exposición de datos, revisión del esquema contra el código e inventario de pantallas.

**No se probó:** navegador (UI/UX visual, responsive, accesibilidad), carga/estrés, backups, despliegue.

---

## 1. Veredicto

El **núcleo funciona**: el ciclo de vida de un caso SOP corre de punta a punta sin errores, la autenticación es sólida y los permisos de *escritura* están bien puestos.

Lo que falta no son detalles, son **tres capas que todavía no existen**:

1. **Reglas de negocio en el servidor** (máquina de estados, propiedad del dato por área/persona).
2. **Confidencialidad de lectura** (hoy cualquier usuario logueado lee todo).
3. **Los módulos de control y análisis** (alertas/SLA, indicadores, auditoría, configuración).

---

## 2. Lo que se probó y funciona

| Área | Resultado |
|---|---|
| Compilación TypeScript backend + frontend | Sin errores |
| Build de producción del frontend | OK (16.9 s) |
| Login JWT + cuenta inactiva + rol nulo | OK |
| `verifyToken` global sobre `/api` | OK — sin token, todo devuelve 401 |
| RBAC de escritura (14 pruebas de escalada de privilegios) | **14/14 correctas** (403) |
| Validación Zod en reports, eventos, cases, catálogos, áreas, estaciones | Body vacío → 400 con mensaje útil |
| Flujo SOP completo (caso de prueba SOP 45-2026) | Recepción → Evaluación → Investigación → Plan → Aceptación → Ejecución → Verificación → Cierre, **sin un solo error** |
| Subida de evidencias | Límite 25 MB, 10 archivos, MIME filtrado, nombres UUID |
| Cambio de contraseña propia | Exige la contraseña actual |
| `PATCH /profile/me` | No permite auto-ascenderse de rol (campos en lista blanca) |
| Asignación Monitorista → Seguridad Operativa | Implementada *(pendiente anotado — resuelto)* |
| "Indicadores" fuera del sidebar de Monitoreo | Hecho *(pendiente anotado — resuelto)* |

---

## 3. Bugs críticos

### C1 — No hay máquina de estados: el expediente se puede corromper desde la API

La UI esconde los botones según la etapa, pero el backend acepta cualquier acción en cualquier orden.

Evidencia sobre SOP 45-2026:

```
caso en "Plan de Acción"  → POST /approve             → 200 → vuelve a "Evaluación"
caso en "Evaluación"      → POST /evaluate (otra vez) → 200 → cambia el riesgo ya evaluado
caso con plan aceptado    → POST /reject              → 200 → caso "Rechazado" con su plan vivo
caso "Rechazado"          → POST /planes/42/accept    → 200 → resucita a "Ejecución"
```

Basta un doble clic, un botón "atrás" o una pestaña vieja para dejar un caso en un estado imposible. Ya existe `/rollback` (con motivo obligatorio y registro), que es la forma correcta de retroceder — y se puede saltar.

**Arreglo:** una tabla de transiciones válidas (`estado actual → acciones permitidas`) verificada en `CaseService` antes de tocar la BD.

### C2 — Un Jefe de Área puede operar los planes de otras áreas

Probado: **Amanda Ridoutt (área 2) aceptó el plan `SOP 45-2026-PLA-01`, que pertenece a Ingeniería (área 5) y al responsable Christian Oliva** → 200.

Lo mismo aplica a cerrar ejecución, subir o borrar evidencias y pedir prórroga: el guard solo comprueba *el rol*, nunca *si el plan es suyo*.

**Arreglo:** en cada endpoint `/planes/:idPlan/*`, comparar `req.user.id_usuario` contra `plan.responsable` (o `req.user.id_area` contra `plan.id_area`).

### C3 — El historial del expediente es falsificable

El "quién hizo qué" sale de un campo `actor` que **manda el cliente**, no de la sesión. Probado: un Jefe de otra área publicó un comentario que quedó firmado como **"Hector Hinostroza (RSO)"**, con rol "seguridad".

Para un sistema de seguridad operativa auditable, un historial que se puede firmar con el nombre de otro no sirve como evidencia.

**Arreglo:** ignorar `actor` del body y usar `req.user` en `case.repository` (hoy además hay un `ACTOR_SO` fijo escrito a mano).

### C4 — La bandeja de notificaciones muestra la de otra persona

`NotificationService.resolverUsuario()` toma el destinatario del query `?usuario=`; si no viene, **cae al primer usuario con rol Seguridad Operativa**. El frontend nunca manda el parámetro.

Consecuencia probada: con el token del **Reportante**, `GET /notifications` devuelve `id_usuario: 1` con **100 notificaciones de Seguridad Operativa**. Y con `?usuario=1` cualquiera lee —y marca como leída— la bandeja de cualquiera.

**Arreglo:** resolver siempre por `req.user.id_usuario` y eliminar el parámetro.

### C5 — Cualquier usuario autenticado lee todo

`GET /cases`, `/cases/:codigo`, `/cases/planes`, `/reports` y `/users` no tienen guard de rol ni filtro por dueño.

Probado con el token de **Reportante**:

- `/reports` → **45 casos**, con `nombre_reportante`, `correo_reportante` y `telefono_reportante` de todos.
- `/users` → **18 usuarios** con correo, cargo, teléfono, área y rol.

Esto además es un **bug funcional visible**: la pantalla "Mis reportes" del reportante lista los 45 casos de toda la empresa, porque no hay filtro ni en el backend ni en el frontend.

**Arreglo:** filtrar `/reports` por `created_by = req.user.id_usuario` para el rol Reportante; restringir `/cases*` a SO/Jefe/Admin (y el Jefe, solo lo de su área); `/users` solo Admin, o una versión reducida (id + nombre) para los selectores.

### C6 — Las evidencias se descargan sin token

`app.use("/uploads", express.static(...))` está montado fuera de la autenticación. Probado: `GET /uploads/casos/<uuid>.jpeg` **sin cabecera Authorization → 200, imagen de 91 KB**. Hay 100 archivos de evidencia expuestos así.

**Arreglo:** servir las evidencias por un endpoint autenticado que verifique que el usuario puede ver ese caso.

---

## 4. Bugs medios

| # | Problema | Nota |
|---|---|---|
| M1 | **El módulo de usuarios no valida nada.** `POST /users` con body vacío → **500** devolviendo al cliente la ruta absoluta del archivo del servidor y el esquema Prisma completo. `PATCH /users/9999` (inexistente) → 500. `GET /users/abc` → 500. | Es el único módulo sin Zod; los demás sí lo tienen |
| M2 | **El reporte "anónimo" no es anónimo.** Se guarda `created_by` con el id del reportante aunque elija modalidad anónima (verificado en BD: caso 48, `created_by = 22`). Y sin auditoría nadie controla quién consulta eso. | Definir con el cliente si es anonimato real o "confidencial", y documentarlo |
| M3 | **El reportante nunca recibe una notificación.** Los destinatarios son solo SO (por rol) y el responsable del plan. Cuando SO le pide información ("Pendiente de Información") **no se le avisa**, así que el proceso se queda colgado. Los tipos `caso_devuelto` e `info_respondida` están declarados pero nunca se emiten. | 8 llamadas a `emitir` en `case.repository.ts` |
| M4 | **Sin límite de intentos de login.** 10 intentos fallidos seguidos → 10× 401, sin bloqueo ni demora. | Falta `express-rate-limit` |
| M5 | **`/api/health` no responde:** devuelve 401 porque `verifyToken` se aplica a todo `/api` antes de llegar a esa ruta. Inservible para monitoreo. | Moverla antes del router |
| M6 | **Cerrar sesión no invalida nada.** El token sigue válido sus 8 h. No hay `/logout` ni refresh (la tabla `sesiones` existe y está vacía). Además `JWT_EXPIRES_IN` del `.env` se ignora: está escrito "8h" a mano en `jwt.ts`. | A las 8 h el usuario sale de golpe, sin aviso |
| M7 | **Enlace roto:** "Nuevo reporte" en el sidebar del Jefe de Área apunta a `/reportes/nuevo`, ruta reservada al rol Reportante → rebota al panel. | `JefeShell.tsx:119` |
| M8 | **No hay ruta 404.** Cualquier URL mal escrita renderiza una pantalla en blanco. | Falta `path="*"` en `AppRouter` |
| M9 | **13 errores de ESLint** (`setState` dentro de `useEffect` en CasosPage e IncidentMap → renders en cascada) y 8 warnings. | `npx eslint .` |
| M10 | **Bundle único de 2.5 MB** (720 KB gzip), sin code-splitting: primera carga lenta. | Salida de `vite build` |
| M11 | **Catálogos inconsistentes:** "No Deseable" y "No deseable" conviven en Análisis de riesgo; "En Proceso" sobra en Estado Hallazgo. | `GET /catalogs` |

---

## 5. Procesos que faltan (no construidos)

### 5.1 Panel de Seguridad Operativa

- **Alertas** — pantalla "en construcción". **No existe cálculo de SLA en el servidor**: `dias_abierto` y `dias_abierto_plan` quedan en 0 para siempre (nadie los actualiza), no hay tarea programada, no hay detección de vencimientos ni avisos. Hoy el plazo se calcula solo en el navegador (`sla.ts`): nadie se entera de un incumplimiento si no abre la pantalla.
- **Planes de Acción (vista consolidada)** — "en construcción".
- **Eventos Operativos** — "en construcción".
- **KPIs y Estadísticas** — "en construcción". El módulo `dashboard` del backend existe pero sus **tres archivos están vacíos (0 bytes)**. El Dashboard Ejecutivo se calcula en el navegador descargando *todos* los casos: funciona con 45, no con 5 000.

### 5.2 Panel de Administrador

- **Auditoría** — "en construcción", y la tabla `auditoria` está vacía porque **ningún código escribe en ella**. No queda registro de quién creó o modificó usuarios, catálogos o casos.
- **Configuración** — "en construcción". Los días de SLA por nivel de riesgo (3/7/14/21) están **escritos en el código del frontend**; el cliente no puede cambiarlos.
- **Roles y Permisos** — el menú existe pero abre la pantalla de Usuarios. No hay administración de permisos.
- **Sin baja de usuarios** (`DELETE /users` no existe): se maneja con el estado Activo/Inactivo. Conviene confirmarlo con el cliente.

### 5.3 Transversales

- **Recuperar contraseña** — no existe (ni endpoint ni pantalla). Si alguien la olvida, depende al 100 % del admin.
- **Paginación en el servidor** — `/cases` y `/reports` devuelven todo siempre; la paginación es solo visual.
- **Exportación** — solo Excel de eventos; el expediente en PDF sigue pendiente.
- **0 tests automatizados**, sin script `test`, sin CI y **sin README**.

### 5.4 Esquema con código muerto

16 tablas del esquema no las toca ninguna línea de código: `auditoria`, `bitacora`, `sesiones`, `logs_sistema`, `configuracion`, `indicadores`, `metas_indicadores`, `historial_indicadores`, `dashboards`, `dashboard_indicadores`, `reporte_estadistico`, `reporte_detalle`, `investigaciones`, `evidencias`, `evidencias_evento`, `solicitudes_prorroga`.

Caso especial — **estaciones tiene tres fuentes de verdad**: el módulo backend `estaciones` (CRUD completo, **cero consumidores**, tabla con **0 filas**), el catálogo "Lugar de Incidente" (lo que realmente edita el admin) y `lib/stations.ts` (26 estaciones con coordenadas, escritas en el frontend). Hay que quedarse con una.

---

## 6. Orden sugerido

**Antes de mostrarlo como sistema real**

1. C5 + C6 — confidencialidad de lectura y de evidencias (es lo que más pesa en un sistema de reportes de seguridad).
2. C1 — máquina de estados.
3. C2 + C3 — propiedad del plan por área y actor tomado de la sesión.
4. C4 — bandeja por usuario logueado.

**Siguiente entrega**

5. M1 (Zod en usuarios y dejar de filtrar internals), M3 (avisos al reportante), M4, M5, M6, M7, M8.
6. SLA en el servidor y módulo de Alertas: es lo que le da sentido al resto del flujo.
7. Auditoría (la tabla ya existe) y Configuración (sacar los SLA del código).

**Deuda técnica**

8. Endpoint de indicadores y paginación en servidor.
9. Limpiar el esquema muerto y unificar estaciones.
10. Tests de los flujos críticos y README.

---

## 7. Rastro dejado por esta prueba

- Caso **SOP 45-2026** ("PRUEBA QA — baldosa suelta…", `id_caso` 48), su plan `PLA-01` y un comentario de prueba firmado como "Hector Hinostroza (RSO)". Quedó en estado **Cerrado**; se puede borrar cuando se quiera.
- El servidor de desarrollo del backend quedó levantado en `localhost:3000`.

---

# PARTE 2 — Prueba desde el navegador (sesión del 18/08/2026)

Segunda ronda pedida por el usuario: entrar a la plataforma como usuario real, recorrer los perfiles y forzar la carga de textos largos para ver si algo se rompe. Se crearon 4 cuentas de prueba (`qa.reportante@`, `qa.so@`, `qa.jefe@`, `qa.monitorista@`, contraseña `QaPrueba2026!`) desde el panel de Administrador.

## 8. Lo que aguantó bien

| Prueba | Resultado |
|---|---|
| Inyección XSS `<script>alert()</script>` en la descripción de un reporte | **Seguro**: React lo escapa, se muestra como texto, 0 scripts inyectados |
| Inyección SQL `'; DROP TABLE casos_sop; --` | **Seguro**: Prisma parametriza, se guarda como texto |
| Doble clic en "Enviar Reporte" | **No duplica** el caso |
| Tildes, ñ, emoji (⚠️🚇), chino | Se guardan y muestran correctamente |
| Plan de acción con 3 planes, 55 actividades, payload de 45 KB | **201 en 0.63 s** |
| 40 actualizaciones de actividad seguidas | 40/40 OK |
| Ciclo completo del plan (aceptar → ejecutar → revisar → verificar → cerrar) | Sin errores |
| Contraseña débil ("1") al crear usuario | Bloqueada en el cliente (mínimo 6) |

## 9. Lo que se rompió con textos largos 🔴

### L1 — La descripción del hallazgo se corta en seco a 300 caracteres, sin avisar
En el modal "Registrar nuevo hallazgo" de Seguridad Operativa el campo tiene `maxlength=300`: se escribieron 442 caracteres y **el sistema guardó 300, cortando a mitad de palabra** ("…señalización de áreas humed"). No hay alerta, no hay confirmación: el analista cree que guardó su texto completo. Verificado en base de datos (SOP 47-2026, 300 caracteres exactos).

**Además el límite es inconsistente entre formularios:** en el asistente del Reportante el mismo campo **no tiene tope ni contador** — deja escribir 1.500 caracteres y recién al final muestra "Máximo 300 caracteres" y **hace desaparecer el botón Continuar** (no lo deshabilita: lo esconde), sin decir cuánto sobra.

**Y es inconsistente entre campos del mismo expediente:** `descripción` del reporte 300 · `peligro` y `consecuencia` 1.000 · `descripción del evento` de Monitoreo 2.000 · `descripción del evento`, `causa raíz` y `conclusiones` de la investigación **sin límite alguno** (se guardaron 2.132 y 2.028 caracteres sin problema). El campo que usa el trabajador que reporta es 7 veces más chico que los que no tienen tope.

### L2 — Errores técnicos crudos en pantalla, con la ruta del servidor
Tres formularios muestran al usuario final el error interno del servidor:

- **Crear usuario con nombre largo** → toast rojo con `Invalid tx.usuarios.create() invocation in C:\trabajo de gea\LINEA-1\seguridad-operativa\backend\src\modules\users\users.repository.ts:74` + el esquema Prisma.
- **Registrar evento con descripción > 2000** → toast con el JSON crudo de Zod: `[{"origin":"string","code":"too_big","maximum":2000,...}]`.
- **Registrar evento con demora = 999999999999999** → `desbordamiento de campo numeric` de PostgreSQL (código 22003) + la ruta del archivo del servidor.

El módulo de casos sí devuelve errores limpios por campo (`{"peligro":["Too big: expected string to have <=1000 characters"]}`). Los otros tres módulos no.

### L3 — El campo "Demora" no tiene tope y tumba el guardado
`demora` es `Decimal(10,2)` en la base pero el formulario y el backend aceptan cualquier número. Con 15 dígitos el registro falla con el error de PostgreSQL descrito arriba. Falta un `max` en el esquema y en el input.

### L4 — Un evento se guardó vacío diciendo "Evento registrado correctamente" ⚠️
Al registrar un evento desde Monitoreo (tras dos intentos rechazados por validación), el sistema confirmó el registro pero **guardó solo fecha, hora y tipo de incidente**: descripción, ubicación, tipo y dirección de vía, lugar, modelo y N.° MR, personal involucrado, tipo y posible causa, cámara, demora e información adicional quedaron **todos en null**, aunque estaban visibles y llenos en pantalla. El evento llegó al panel de Seguridad Operativa como *"Sin descripción · Sin lugar"*, dejando al analista sin nada con que abrir el hallazgo.

**Importante:** el mismo contenido enviado directo a la API se guarda perfecto, así que la pérdida ocurre en el formulario. **No pude reproducirlo de forma limpia** y parte del comportamiento podría deberse a la automatización del navegador que usé. Antes de darlo por confirmado conviene que una persona repita a mano esta secuencia: llenar el formulario → provocar un error de validación → corregir → guardar, y revisar qué quedó grabado.

## 10. Otros hallazgos de la sesión

| # | Hallazgo |
|---|---|
| N1 | **Confirmación visual de C5:** una cuenta de Reportante recién creada, que nunca reportó nada, abre su portal y ve **"47 reportes registrados · 45 en seguimiento"** de toda la empresa, y "Mis reportes" lista los 47 casos ajenos. |
| N2 | **Confirmación visual de C2:** un Jefe de Área recién creado, sin ningún plan asignado, abre "Mis Planes de Acción" y ve **9 planes de otras personas**, puede entrar al detalle de cada uno y operarlos. |
| N3 | **El expediente se vuelve ilegible con contenido real.** Un caso con 3 planes y 55 actividades genera una página de **17.679 px de alto = 24,6 pantallas** de scroll y 55.154 caracteres. Los textos largos se imprimen completos, sin recorte, sin "ver más" y sin alto máximo. |
| N4 | **Los listados no paginan en el servidor:** `/cases/planes` devuelve **509 KB**, `/cases` 231 KB y el detalle de un caso 120 KB, en cada carga de pantalla. Con 48 casos responde en 0,13 s; proyectado a 500 casos son ~2,4 MB por carga y a 5.000 casos ~24 MB. El Dashboard Ejecutivo calcula sus indicadores descargando *todos* los casos. |
| N5 | Los eventos de Monitoreo **nunca reciben código** (`codigo_evento` siempre null), a diferencia de los casos que sí tienen "SOP 47-2026". La columna existe y es única. |
| N6 | El teléfono del formulario de usuario acepta **27 dígitos** sin validación de formato. |
| N7 | El asistente de reporte no muestra la descripción en el resumen final, así que no se puede revisar antes de enviar. |
| N8 | **Accesibilidad:** varios botones y todas las opciones del selector de estación no tienen nombre accesible (aparecen vacíos en el árbol de accesibilidad), lo que rompe la navegación por lector de pantalla y por teclado. |
| N9 | El botón "Eliminar evento" del historial de Monitoreo borra sin que exista ninguna traza (la tabla `auditoria` sigue vacía). No se probó de forma destructiva. |

## 11. Datos de prueba que quedaron

- Usuarios: `qa.reportante@`, `qa.so@`, `qa.jefe@`, `qa.monitorista@metrolinea1.pe` (IDs 38 a 41).
- Casos: **SOP 46-2026** (con el texto de inyección XSS/SQL) y **SOP 47-2026** (cerrado, con 3 planes y 55 actividades de prueba de carga), además de **SOP 45-2026** de la primera ronda.
- Eventos de Monitoreo: IDs 8 (el que quedó vacío) y 9 (creado por API).

Todo es borrable cuando se quiera.
