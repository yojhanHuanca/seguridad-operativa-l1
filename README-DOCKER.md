# Despliegue con Docker

Esta guía describe cómo ejecutar Seguridad Operativa L1 en un equipo local y cómo entregar el sistema al área de TI para instalarlo en un servidor. El paquete contiene la aplicación, PostgreSQL y el almacenamiento de archivos. No incluye datos reales ni credenciales de la empresa.

## Componentes

- **Frontend:** React/Vite compilado y servido por Nginx.
- **API:** Node.js/Express con Prisma.
- **Base de datos:** PostgreSQL 16 con volumen persistente.
- **Evidencias y avatares:** volumen persistente separado de la imagen de la API.
- **Correo:** Resend API para correos de asignación y otros avisos. En local, Mailpit captura los correos para pruebas.
- **Google OAuth y Web Push:** integraciones externas opcionales; requieren sus credenciales propias.

Nginx publica el sitio y reenvía `/api` a la API dentro de la red privada de Docker. La API y PostgreSQL no exponen puertos al host en la configuración productiva.

## Requisitos

- Docker Engine o Docker Desktop con Docker Compose v2.
- Git para clonar el repositorio.
- En un servidor: nombre DNS, HTTPS y reglas de firewall administradas por TI.

## Ejecutar localmente

Desde la raíz del repositorio, en PowerShell:

```powershell
Copy-Item .env.docker.example .env.docker
```

Edita `.env.docker` y reemplaza `POSTGRES_PASSWORD` y `JWT_SECRET` con valores aleatorios diferentes. En una máquina con OpenSSL se pueden crear con:

```sh
openssl rand -hex 32
```

Luego levanta los servicios:

```powershell
docker compose --env-file .env.docker up --build -d
docker compose --env-file .env.docker ps
```

En la primera instalación local, prepara el rol y los catálogos de contingencias una vez:

```powershell
docker compose --env-file .env.docker exec backend node scripts/seed-contingencias.mjs
```

Abre el sistema en `http://localhost:8080` y la bandeja local de correo en `http://localhost:8025`. Al iniciar el stack local, el servicio de migraciones aplica los cambios versionados antes de arrancar la API. Los correos no salen a destinatarios reales en este modo.

Para ver registros:

```powershell
docker compose --env-file .env.docker logs -f backend
```

Para detener los contenedores conservando la base y los archivos:

```powershell
docker compose --env-file .env.docker down
```

`down -v` elimina los volúmenes y borra permanentemente la base local y los archivos cargados; úsalo solo cuando realmente quieras reiniciar todo desde cero.

## Preparar una instalación para TI

1. Clonar el repositorio en el servidor que TI haya elegido.
2. Copiar `.env.production.example` como `.env.production` y completar los secretos y las integraciones.
3. Revisar en `.env.production` que `FRONTEND_URL` sea el nombre HTTPS definitivo y que `FRONTEND_PORT` coincida con la configuración de red.
4. **Solo para una instalación nueva con una base vacía**, aplicar las migraciones versionadas:

   ```sh
   docker compose --env-file .env.production -f docker-compose.production.yml --profile setup run --rm schema
   ```

   La secuencia incluye la línea base del esquema anterior, el historial de importaciones y el lock compartido para importaciones. `migrate deploy` registra las migraciones y no se ejecuta dentro de las peticiones de la web.

   **Instalación ya existente:** no ejecutes este paso directamente contra su base. Primero TI debe respaldarla y comparar el esquema con la línea base y las migraciones. Si la base ya contiene cambios aplicados anteriormente con `db push`, el responsable de base de datos debe verificar uno por uno los objetos de cada migración antes de marcarlos como aplicados con `prisma migrate resolve --applied <nombre>`. Después se ejecuta `migrate deploy` para aplicar solo las migraciones que faltan. Si el esquema no coincide, preparar y probar una migración de ajuste en una copia restaurada antes de tocar la base real.

5. Construir e iniciar la aplicación:

   ```sh
   docker compose --env-file .env.production -f docker-compose.production.yml up --build -d
   docker compose --env-file .env.production -f docker-compose.production.yml ps
   ```

   En una base nueva, preparar una vez el rol y los catálogos iniciales del módulo de contingencias:

   ```sh
   docker compose --env-file .env.production -f docker-compose.production.yml exec backend node scripts/seed-contingencias.mjs
   ```

   Este paso carga datos de catálogo; la estructura de tablas la instala Prisma Migrate. No ejecutar el seed general de desarrollo en una base empresarial.

6. Configurar HTTPS en el proxy o balanceador aprobado por TI, reenviando al puerto del frontend. Mantener los puertos 3000 y 5432 cerrados desde la red externa.

`TRUST_PROXY_HOPS` controla cuántos proxies Express considera confiables al calcular la IP del cliente para los límites de solicitudes. El valor de ejemplo `1` corresponde a una conexión directa al Nginx del contenedor frontend. Si TI coloca otro proxy/balanceador delante, debe ajustar el valor al número real de saltos de la cadena; no lo aumente sin confirmar esa topología, porque afecta los rate limits y el registro de IP.
7. Verificar el acceso al sitio, `/api/health`, inicio de sesión, creación de un reporte, archivos adjuntos y correos de prueba antes de habilitar el uso real.

El contenedor `schema` ejecuta `prisma migrate deploy` solo cuando TI lo solicita en producción. No se ejecuta al reiniciar el sistema. Cada nueva versión debe incluir su migración SQL revisada; no usar `prisma db push` en una instalación con datos.

## Configuración de integraciones

### Correo

La aplicación usa **Resend API** para los correos de asignación de planes de acción y otros avisos. TI debe proporcionar `RESEND_API_KEY` y un `EMAIL_FROM` cuyo dominio esté autorizado en la cuenta del proveedor. Sin una clave válida, el correo no se enviará aunque la operación de la aplicación pueda continuar.

El envío por Gmail API no está implementado. `GOOGLE_CLIENT_ID` es para iniciar sesión con Google; no habilita el envío de correos. En el entorno local, Mailpit recibe los correos y permite revisarlos desde su interfaz web.

### Inicio de sesión con Google

Completar `GOOGLE_CLIENT_ID` y `VITE_GOOGLE_CLIENT_ID` con el Client ID de la aplicación web de OAuth. Registrar `FRONTEND_URL` como origen autorizado en la consola de Google. Si quedan vacíos, el inicio con Google no estará disponible; el acceso con las cuentas normales seguirá el flujo propio del sistema.

### Notificaciones push

Configurar un par VAPID en `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY` y `VITE_VAPID_PUBLIC_KEY` (la clave pública debe coincidir en backend y frontend). Web Push necesita HTTPS en el nombre definitivo del sistema; HTTP en una red local no habilita esta función de forma general.

## Datos, archivos y respaldos

Clonar el repositorio solo copia el código. No copia la base con los casos, las cuentas de usuario, las evidencias ni los avatares. Antes de trasladar el sistema actual, TI debe planificar la exportación e importación de la base de datos y copiar el contenido del almacenamiento de archivos, preservando las rutas registradas. El mecanismo y la ventana de migración dependen del entorno de origen.

La configuración productiva conserva datos en los volúmenes `postgres_data` y `uploaded_files`. Los volúmenes de Docker no son un respaldo por sí solos y residen en el servidor donde se crearon. TI debe respaldar ambos, cifrar las copias, limitar su acceso y ensayar la restauración. Un respaldo de PostgreSQL puede generarse así:

Las cargas de evidencias aceptan hasta 10 archivos de 30 MB cada uno, con un máximo agregado de 150 MB por petición. TI debe dimensionar `uploaded_files` y su política de retención para ese uso.

```sh
docker compose --env-file .env.production -f docker-compose.production.yml exec -T postgres \
  pg_dump -U seguridad_operativa -d seguridad_operativa -Fc > seguridad-operativa.dump
```

Las evidencias y avatares también deben incluirse en el respaldo desde el volumen `uploaded_files`. Al mover la instalación a otro servidor, se deben transferir y restaurar tanto la base como los archivos antes de abrir el acceso.

La aplicación no crea automáticamente cuentas empresariales al iniciar. TI o el administrador designado debe provisionar las cuentas y roles iniciales mediante el procedimiento aprobado para la instalación.

## Actualizar la aplicación

Antes de actualizar, respaldar PostgreSQL y los archivos. Obtener la versión o commit aprobado y reconstruir:

```sh
docker compose --env-file .env.production -f docker-compose.production.yml up --build -d
```

Si el cambio incluye modificaciones de esquema, revisar el cambio y ejecutar el servicio `schema` siguiendo el procedimiento de TI antes de reiniciar la API. No borrar volúmenes como parte de una actualización.

## Resolución de problemas

- **El sitio no abre:** revisar `docker compose ... ps`, el puerto publicado, el firewall y el proxy HTTPS.
- **La API indica que la base no está disponible:** revisar salud y registros de `postgres` y `backend`, así como `POSTGRES_PASSWORD`.
- **No se puede iniciar sesión con Google:** revisar ambos Client ID y el origen HTTPS autorizado.
- **No llegan correos:** revisar `RESEND_API_KEY`, `EMAIL_FROM`, la verificación del dominio y los registros del backend. En local, abrir Mailpit.
- **No aparecen evidencias tras reiniciar:** verificar que el volumen `uploaded_files` siga montado y restaurar desde respaldo si el volumen original se perdió.
- **Web Push no está disponible:** comprobar HTTPS y que las tres variables VAPID estén completas y correspondan al mismo par.

## Archivos de configuración

- `docker-compose.yml`: ejecución local con PostgreSQL y Mailpit.
- `docker-compose.production.yml`: despliegue autocontenido, con servicios internos y un único puerto público para el frontend.
- `.env.docker.example`: plantilla para desarrollo local.
- `.env.production.example`: plantilla para el servidor administrado por TI.
