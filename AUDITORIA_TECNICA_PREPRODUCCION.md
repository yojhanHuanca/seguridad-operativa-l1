# Auditoría técnica de SMS L1 / Seguridad Operativa

**Auditoría inicial:** 28 de septiembre de 2026  
**Revisión de pendientes:** 3 de octubre de 2026  
**Resultado inicial:** 🔴 **NO APTO PARA PRODUCCIÓN**  
**Alcance:** revisión estática del código y configuración del checkout local, sin modificar el código fuente ni conectarse a bases de datos.

## Resumen ejecutivo

El proyecto tiene una estructura modular, validación Zod en los flujos principales, restricciones de rol en rutas de operación, controles de acceso por área para planes SOP, sesiones revocables, transacciones para la carga histórica SOP, manejo de evidencias autenticado y contenedores con health checks. El backend y frontend compilan, y la suite unitaria del backend pasa.

**Estado actualizado:** las correcciones locales de autenticación, cargas, proxy, pantalla de importación y pruebas se aplicaron y pasaron sus verificaciones. Para que el código quede listo para entregar a TI, el pendiente principal de desarrollo sigue siendo versionar y probar la evolución completa del esquema y sacar el DDL de contingencias del camino de petición. TI administra el servidor, certificados, secretos y respaldos; esos pasos quedan como checklist de instalación y no como tareas de despliegue para desarrollo.

## Alcance e inventario

Se revisaron las áreas de autenticación, usuarios y roles, casos SOP y planes, reportes públicos, contingencias, monitoreo, importaciones, archivos, notificaciones, configuración, auditoría, validaciones, acceso a datos, Docker, variables de entorno de ejemplo y pruebas.

| Elemento | Inventario observado |
|---|---:|
| Archivos en `backend/src` | 190 |
| Archivos en `frontend/src` | 233 |
| Modelos de Prisma | 47 |
| Declaraciones de rutas Express | 118 |
| Archivos de pruebas backend/E2E | 23 |
| Migraciones Prisma versionadas | 1 |

El checkout estaba en `main` (`84346348`). La auditoría incluyó los cambios locales existentes en `backend/src/modules/cases/case.workflow.ts` y `frontend/src/pages/admin/ImportacionPage.tsx`; no los preparó ni los modificó. No se leyeron ni imprimieron valores secretos de `.env`.

## Inventario resumido de API

Todas las rutas montadas después de `router.use(verifyToken)` exigen token. Los roles se validan además en las rutas indicadas. El inventario de 118 declaraciones está agrupado por módulo para facilitar su revisión.

| Métodos y rutas | Acceso previsto | Validación / control observado |
|---|---|---|
| `GET /api`, `GET /api/health` | Público | Health comprueba conexión Prisma; devuelve estado de DB. |
| `POST /api/auth/login`, `/google`, `/forgot-password`, `/reset-password`; `GET /api/auth/home` | Público; `POST /logout` autenticado | Rate limits en login/Google/reset y recuperación; reset usa token aleatorio hasheado y expiración. |
| `GET /api/catalogs`, `POST /api/reports`, `GET /api/reports/consulta/:codigo`, `POST /api/reports/consulta/:codigo/responder-info`, `GET /api/configuracion/publica` | Público por diseño | Registro público limitado; evidencias autenticadas por firma MIME; consulta pública requiere cookie firmada del dispositivo. `GET /api/catalogs` expone el catálogo general. |
| `GET /api/users/basicos` | Cualquier sesión | Devuelve directorio reducido; padrón completo y cambios requieren Admin. |
| `GET/POST/PATCH/DELETE /api/areas`; `GET/POST/PATCH/DELETE /api/estaciones`; `GET /api/roles`; `GET/POST/PATCH/DELETE /api/catalogs/...` | Lecturas autenticadas; cambios Admin | Sin esquema común visible en todas las rutas de catálogo. |
| `/api/cases` y `/api/cases/planes` (`GET`, consultas/cuentas/detalles) | SO, Jefe de Área, Admin | El Jefe se filtra por su área; acciones de plan comprueban titularidad/área. |
| `/api/cases/:codigo/...`, `/api/cases/planes/:idPlan/...`, `/api/cases/actividades/:idActividad` | SO/Admin; Jefe/Admin para ejecución; algunos comentarios ambos | Zod en acciones principales y máquina de estados en backend. Permisos especiales para reabrir/rechazar. |
| `/api/reports` (`GET/POST`) y `/api/reports/:codigo` | Reportante, SO, Admin para lectura; creación autenticada o pública | Esquema Zod; reportante queda limitado a los propios. |
| `/api/eventos` (`GET/POST/PATCH/PUT/DELETE`, conteos, indicadores, asignados) | Monitorista; SO solo con bandera responsable en el panel de monitoreo; rutas asignadas SO/Admin | Guards de rol; revisión de parámetros y reglas sigue siendo desigual entre módulos. |
| `/api/contingencias` (`GET/POST/PUT/DELETE`, detalle/catálogos) | Gestión de Planes de Contingencia, Admin | DTOs Zod y validaciones del dominio; el repositorio también ejecuta DDL de compatibilidad. |
| `/api/datos-operativos` (`GET/POST/PUT/DELETE`) | Gestión de Contingencias, Monitorista, SO responsable | Reglas de rol en middleware. |
| `/api/importacion/{historial,casos,contingencias,monitoreo}` (`GET/POST`) | Admin | JSON de importación hasta 64 MB, esquema de celdas Zod, 100 000 filas máximas; SOP usa transacción de archivo, contingencias/monitoreo devuelven resultado parcial. |
| `/api/auditoria` (consulta, filtros, conteos, exportación) | Admin | Guards Admin y límites de exportación. |
| `/api/configuracion` (`GET/PATCH`), `/api/dashboard/indicadores` | Lectura autenticada; escritura Admin; dashboard SO/Jefe/Admin | Configuración pública separada. |
| `/api/profile/me/...`, `/api/notifications/...`, `/api/push/...`, `/api/archivos/:carpeta/:archivo` | Cualquier sesión, con ámbito al actor | Perfil y notificaciones se resuelven por usuario del token; archivos validan ubicación y expediente. |

## Hallazgos

| # | Área | Hallazgo | Severidad | Evidencia | Acción requerida |
|---:|---|---|---|---|---|
| 1 | Autenticación/autorización | Hallazgo corregido en fase 2: ahora se rechazan tokens sin sesión, se exige una sesión activa vinculada al usuario y se cargan estado, rol, área y permisos actuales desde la base en cada request autenticada. Cambios de credenciales, rol, estado, área o permisos revocan las sesiones del usuario. | ✅ Corregido en código; requiere validación integrada | `backend/src/middlewares/auth.middleware.ts`; `backend/src/modules/auth/auth.repository.ts`; `backend/src/modules/users/users.service.ts`; tests de middleware. | Invalidar sesiones JWT anteriores al despliegue y validar el comportamiento con una copia de datos representativa. |
| 2 | Dependencias | Los primeros resultados reportaron 8 avisos backend y 13 frontend. Sin cambiar los manifests ni lockfiles, una nueva ejecución de `npm audit --omit=dev` en backend y `npm audit` en frontend reportó cero vulnerabilidades el 28-09-2026. La evaluación refleja el advisory feed consultado al momento de la revalidación. | ✅ Sin avisos en revalidación; vigilar antes de publicar | `backend/package-lock.json`; `frontend/package-lock.json`; salida de `npm audit`. | Repetir la auditoría al preparar el artefacto y aplicar solo actualizaciones compatibles que indiquen los avisos vigentes. |
| 3 | Disponibilidad/rate limiting | `trust proxy` ya se configura mediante `TRUST_PROXY_HOPS`: Compose fija un salto para el backend detrás de su Nginx; el valor predeterminado fuera de Compose es cero. Los limitadores y locks de importación siguen almacenados en memoria y no coordinan varias réplicas. La topología real del hosting no se inspeccionó. | 🟠 Medio si el hosting usa varias réplicas o más proxies | `backend/src/app.ts`; `backend/src/config/env.ts`; `docker-compose.yml`; `docker-compose.production.yml`. | Configurar el número real de proxies; antes de escalar, usar almacén compartido para rate limiting y exclusión/idempotencia de importaciones. |
| 4 | Base de datos/esquema | Solo existe una migración versionada (`20260922110000_import_history`) para un schema de 47 modelos. Compose usa `prisma db push` como paso manual y contingencias crea/altera tablas durante requests. No hay una secuencia completa y probada que sirva tanto para una base nueva como para actualizar la base actual sin perder datos. | 🔴 Alto; pendiente de desarrollo antes de entregar versión final | `backend/prisma/migrations/`; `docker-compose.production.yml`; `backend/src/modules/contingencias/contingencia.repository.ts`. | Preparar migraciones reproducibles y probarlas en una base vacía y una copia anonimizada de la base actual. No ejecutar `db push` ni migraciones en el servidor empresarial hasta completar esa validación. |
| 5 | Archivos/durabilidad | La aplicación guarda archivos en `uploads/` y Compose monta el volumen persistente `uploaded_files`. El repositorio no puede verificar cómo TI montará el volumen ni cómo respaldará/restaurará archivos en su servidor. | 🟡 Operativo; checklist de TI | `backend/src/middlewares/upload.middleware.ts`; `docker-compose.production.yml`; `README-DOCKER.md`. | TI debe mantener el volumen fuera del ciclo de vida del contenedor, respaldarlo junto con PostgreSQL y probar restauración. |
| 6 | Uploads | La extensión se genera ahora desde el MIME permitido, no desde el nombre entregado por el cliente; se añadieron límites a campos y partes del multipart. Siguen permitiéndose hasta 10 archivos de 30 MB por request y no hay cuota agregada de almacenamiento ni análisis antimalware. La firma se comprueba en los primeros bytes, no mediante análisis completo del contenido. | 🟠 Medio | `backend/src/middlewares/upload.middleware.ts`; `backend/src/routes/index.ts:46`. | Definir cuota/tamaño total de acuerdo con operación, política de retención y análisis del almacenamiento/antimalware. |
| 7 | Integridad/concurrencia | Las transiciones SOP se validan leyendo el estado en `CaseService` y luego actualizan en una transacción separada en `CaseRepository`; no se ve comparación condicional del estado previo dentro de la misma transacción. Solicitudes concurrentes pueden validar sobre el mismo estado y escribir transiciones/timeline que se pisan. Los locks de importación de contingencias/monitoreo son `Set` en memoria y no coordinan varias instancias. | 🟠 Medio | `backend/src/modules/cases/case.service.ts:196-200,317-330`; `backend/src/modules/cases/case.repository.ts:617`; `backend/src/modules/importacion/import-lock.ts:1-8`. | Aplicar transiciones con estado esperado dentro de la transacción; decidir si el despliegue será single-instance o usar lock/idempotencia distribuida. |
| 8 | Rendimiento | Varias listas aceptan `limit` sin techo; si no se envían paginación, algunos repositorios devuelven todo el conjunto, incluyendo relaciones. Un usuario autenticado puede solicitar tamaños extremos o respuestas grandes. | 🟠 Medio | `backend/src/modules/cases/case.service.ts:258-289`; patrones equivalentes en users/reports/events. | Definir tamaño máximo y paginación obligatoria para listas que crecerán; conservar un límite explícito para exportación. |
| 9 | Frontend/sesión | El JWT y usuario se guardan en `localStorage`. La web estática de Nginx/Vercel no configura CSP, `X-Frame-Options` ni otros headers de seguridad en los archivos servidos; Helmet solo protege respuestas de la API. | 🟠 Medio | `frontend/src/features/auth/AuthContext.tsx:21-39`; `frontend/nginx.conf`; `frontend/vercel.json`. | Establecer headers del frontend y evaluar cookie HttpOnly/SameSite para la sesión, con revisión de compatibilidad CORS/CSRF. |
| 10 | Errores/logs | Las respuestas de API suelen sanear errores Prisma, pero `errorMiddleware` escribe objetos completos a stdout y Morgan usa formato `dev`; el correo del login fallido queda en descripción de auditoría. No se halló evidencia de que se registren contraseñas o JWT, pero faltan política de redacción/retención y verificación de logs del proveedor. | 🟡 Medio | `backend/src/middlewares/error.middleware.ts`; `backend/src/utils/ApiResponse.ts`; `backend/src/modules/auth/auth.service.ts`. | Redactar datos personales/valores en logs, usar logger estructurado por entorno y revisar acceso/retención. |
| 11 | Frontend/importación | Corregido en fase 2: historial ahora tolera respuesta incompleta; se actualizaron el mock de historial, el selector de hoja XLSX y el texto del botón en los E2E. | ✅ Corregido; 56/56 Chromium pasan | `frontend/src/pages/admin/ImportacionPage.tsx`; `frontend/e2e/admin-importacion.spec.ts`. | Mantener el contrato de historial y los selectores E2E alineados con la UI. |
| 12 | Configuración de instalación | El código Docker entrega frontend y API en el mismo origen (`/api`) y contiene plantillas `.env.production.example`; el sistema no permite comprobar las credenciales ni la topología que TI configure en su servidor. Para instalaciones Vercel separadas se debe definir `VITE_API_URL`. | 🟡 Checklist de entrega TI | `.env.production.example`; `frontend/src/lib/api.ts`; `docker-compose.production.yml`; `README-DOCKER.md`. | Desarrollo entrega plantilla y versión aprobada. TI completa secretos, URL/HTTPS, CORS, proveedor de correo, OAuth/Push y parámetros de proxy en su entorno. |
| 13 | Calidad/pruebas | Corregido en fase 2: se quitó la actualización redundante de formulario desde un efecto; el cálculo al escribir carreras conserva los cálculos automáticos. ESLint finaliza sin errores. Las 56 pruebas E2E Chromium pasan. | ✅ Corregido en código y verificado | `frontend/src/pages/monitoreo/DatosOperativos.tsx`; `frontend/e2e/admin-importacion.spec.ts`. | Volver a ejecutar gates completos en CI antes de publicar. |

## Seguridad

- **Controles presentes:** JWT firmado y con expiración, contraseñas con bcrypt, reset con token aleatorio hasheado y de un solo uso, rate limit de login/reset, CORS con lista, Helmet en API, validación de firma de archivos y acceso autenticado a evidencias.
- **Autorización:** rutas sensibles de Admin, SO, Jefe, Monitorista y Contingencias tienen guards. Se revisó defensa por área de planes SOP y pruebas unitarias que impiden a Jefes operar sobre planes ajenos. No se encontró un IDOR probado en esos escenarios.
- **Sesiones:** la fase 2 cerró el hallazgo de permisos obsoletos: cada request autenticada consulta la sesión y los permisos vigentes. Los clientes con JWT antiguo deberán volver a iniciar sesión.
- **Push:** endpoint de suscripción es entrada del cliente y se usa para realizar llamadas HTTPS salientes. No hay esquema/allowlist de host/IP; añadir validación anti-SSRF y evitar registrar endpoints completos.
- **XSS/archivos:** la extensión ya no proviene del nombre del cliente y se valida la firma inicial; falta definir análisis completo, cuota y política de servicio/descarga de evidencias.

## Base de datos

Hay restricciones únicas e índices y se usan transacciones en varias operaciones. La secuencia Postgres de casos evita colisiones concurrentes, y el importador SOP avanza la secuencia luego de importar códigos históricos. La importación SOP se ejecuta dentro de una transacción; contingencias/monitoreo registran importación parcial por filas.

No se consultó ninguna base local o de producción ni se ejecutaron `migrate`, `db push`, `reset` o `seed`. Sin dump representativo y migraciones completas no es posible certificar compatibilidad con datos existentes ni el plan de actualización.

## Rendimiento

El build divide rutas y módulos; el chunk de ExcelJS es de aproximadamente 930 kB sin comprimir. Listas con respuesta no paginada y el tope de 100 000 filas/64 MB para importación pueden presionar memoria/DB. La verificación de sesión hace consulta por request; es razonable como control, pero debe medirse con carga real.

## Infraestructura y producción

- Docker backend usa multi-stage, imagen Debian, usuario `node`, healthcheck y volumen de archivos. La API y Postgres no publican puertos externos en Compose productivo; Nginx publica el frontend.
- Compose no automatiza backups; la guía correctamente aclara que los volúmenes no son respaldo y pide cifrar y ensayar restauración. No se verificó una restauración real.
- El backend requiere un disco persistente para evidencias si se despliega con filesystem efímero.
- No se comprobó dominio, HTTPS, variables del proveedor, configuración DNS, mail, Google, VAPID, plan de backups ni escalado actual de Vercel/Render/Railway/Supabase.

## Fase 2: correcciones locales y revalidación

Tras entregar el diagnóstico inicial, se autorizaron correcciones locales. Se modificaron autenticación/sesiones, límites multipart y extensiones derivadas del MIME, confianza de proxy configurable, render defensivo del historial, la prueba E2E de importación y el efecto redundante de datos operativos. Se preservaron los cambios preexistentes del flujo SOP (`backend/src/modules/cases/case.workflow.ts`) y de la importación (`frontend/src/pages/admin/ImportacionPage.tsx`); los cambios de esta fase se aplicaron encima sin reemplazarlos.

No se modificaron manifests ni lockfiles. La segunda lectura de advisories informó cero vulnerabilidades tanto en backend como frontend; el primer resultado de advisories quedó resuelto sin actualizar dependencias y debe interpretarse con la fecha de consulta.

## Pruebas ejecutadas

| Comando | Resultado |
|---|---|
| `backend: npm run build` | ✅ Correcto |
| `backend: npm test -- --reporter=dot` | ✅ 16 archivos, 121 tests pasaron |
| `frontend: npm run build` | ✅ Correcto; 3 352 módulos transformados; warning de tiempo de plugin CSS y chunk ExcelJS ~930 kB |
| `frontend: npm run lint` | ✅ Correcto |
| `frontend: npm run test:e2e:chromium -- --reporter=list` | ✅ 56/56 pasaron; el re-run reveló y se corrigió el render defensivo del historial |
| `npm audit --omit=dev` backend | ✅ 0 avisos en revalidación |
| `npm audit` frontend | ✅ 0 avisos en revalidación |
| `docker compose ... config --quiet` (Compose productivo + plantilla) | ✅ Configuración válida |
| `docker compose ... build` (imágenes productivas) | ⚠️ No se pudo ejecutar: Docker Engine local no está iniciado; no se construyeron imágenes |

Los primeros intentos de Vitest/Vite bajo sandbox fallaron por `spawn EPERM`; se repitieron fuera del sandbox. Hubo un primer build frontend que no pudo cargar el módulo nativo de Tailwind y un segundo build fuera del sandbox que pasó. No se actualizaron dependencias ni se ejecutaron pruebas contra producción. El build reescribió artefactos versionados `backend/dist`; se restauraron. Playwright genera capturas en `outputs/`, carpeta que ya estaba sin seguimiento antes de la auditoría.

## Bloqueadores de producción

### Pendientes de desarrollo antes de entregar una versión candidata

1. Crear una historia de migraciones que reproduzca el esquema actual en una base nueva, retirar DDL de contingencias durante requests y probar las migraciones en una copia anonimizada del esquema actual. Esto requiere un dump/esquema autorizado de la base existente para probar compatibilidad; no hace falta acceso al servidor productivo.
2. Cerrar riesgos de concurrencia de cambios de estado SOP y decidir cómo se evitarán duplicidades de importación si se ejecutan varias instancias.
3. Definir límites máximos/paginación para las listas que pueden crecer y una cuota total de evidencias, tamaño agregado por carga y retención.
4. Completar la revisión de seguridad media: headers del frontend, almacenamiento de token en navegador, protección anti-SSRF para Web Push y política de redacción/retención de logs.
5. Repetir `npm audit` y las pruebas al construir la versión candidata. La configuración Compose pasó validación estática; el build de imágenes no se pudo probar porque el Docker Engine local no estaba iniciado.

### Checklist de instalación para TI

1. Elegir servidor/topología y configurar DNS, TLS, firewall y el valor correcto de `TRUST_PROXY_HOPS`.
2. Completar secretos e integraciones en `.env.production`; no compartirlos ni guardarlos en Git.
3. Confirmar almacenamiento persistente para `uploaded_files`, backups cifrados de PostgreSQL y archivos, y ensayar restauración.
4. Restaurar/migrar datos siguiendo las migraciones aprobadas por desarrollo; comprobar cuentas, archivos y secuencias antes de habilitar usuarios.
5. Ejecutar health check y pruebas funcionales de login, permisos por perfil, correo, carga/descarga de evidencias, importación y recuperación.
6. Si TI elige varias réplicas, proporcionar almacenamiento compartido para rate limits/locks o aprobar una estrategia single-instance.

## Recomendación final

🔴 **Aún no hay versión candidata lista para entregar.** Los gates locales disponibles pasan, pero faltan la historia de migraciones y completar varios controles de riesgo medio. Después de eso, desarrollo puede entregar el código, Compose, plantillas y guía a TI; la instalación de infraestructura, secretos, almacenamiento/backups y pruebas en el servidor corresponden a TI. No se desplegó ni modificó ninguna base de datos.

## Seguimiento de cierres — 2026-10-04

Esta sección actualiza el resumen y los pendientes del diagnóstico inicial. Se actualizaron estas partes del código:

- Se generó `20260921000000_baseline` desde el schema previo a la migración de historial. La secuencia ahora contiene esa línea base, `20260922110000_import_history` y `20261004120000_importacion_locks`. La comparación de Prisma reportó 46 tablas en la línea base y 48 modelos en el schema actual.
- Se retiraron los `CREATE TABLE` y `ALTER TABLE` del repositorio de contingencias. Las tablas se crean con migraciones; el rol y los catálogos iniciales se preparan con un comando explícito. Los SQL antiguos quedaron marcados como referencia y no deben ejecutarse.
- Docker usa `prisma migrate deploy`; el Compose local lo ejecuta antes de iniciar la API. La guía ahora separa instalación nueva de adopción de una base existente.
- Las importaciones de contingencias y monitoreo usan un lease PostgreSQL renovable, con recuperación automática tras diez minutos sin heartbeat. Las transiciones principales del SOP comparan el estado esperado dentro de la misma transacción.
- Se limitó la paginación enviada por cliente a 100 elementos y offset de 1 000 000. Los endpoints legacy sin paginación se preservaron por compatibilidad y aún necesitan migración de sus pantallas.
- Las cargas de evidencias permiten hasta 150 MB agregados por petición. Nginx/Vercel envían headers de protección. Los logs de producción usan JSON, evitan query strings y no imprimen cuerpos ni mensajes crudos de error.

Pruebas posteriores: TypeScript compila con declaraciones y mapas en una carpeta temporal, 128 pruebas unitarias pasan, ESLint frontend pasa, build frontend pasa y las configuraciones Compose se validan. La comparación de Prisma fue solo de schemas y no requirió conexión a una base. El `npm run build` directo no pudo escribir algunos artefactos versionados de `backend/dist`; se verificó el mismo build completo en una carpeta temporal, sin dejar esos artefactos modificados.

**Pendiente antes de certificar el recorrido completo:** aplicar toda la secuencia en una PostgreSQL vacía y en una copia anonimizada/restaurada para una instalación existente. El Docker Engine de este equipo no está iniciado y no se obtuvo ni modificó una base de TI. También faltan pruebas concurrentes bajo carga de flujos de planes, y el rate limiting continúa local a cada proceso. Por eso este trabajo deja el código y el procedimiento preparados, pero no declara aprobada la migración de una base empresarial existente.
