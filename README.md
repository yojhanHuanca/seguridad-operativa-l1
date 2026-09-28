# 🛡️ Seguridad Operativa L1

**Sistema web para la gestión de Seguridad Operativa de Línea 1.** Centraliza el registro y seguimiento de casos SOP, sus planes de acción, las contingencias y sus indicadores.

![React 19](https://img.shields.io/badge/React-19.2.8-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-3178C6?logo=typescript&logoColor=white)
![Node.js 22](https://img.shields.io/badge/Node.js-22-5FA04E?logo=nodedotjs&logoColor=white)
![Express 5](https://img.shields.io/badge/Express-5.2.1-444444?logo=express&logoColor=white)
![PostgreSQL 16](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Prisma 6](https://img.shields.io/badge/Prisma-6.19.3-2D3748?logo=prisma&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker%20Compose-v2-2496ED?logo=docker&logoColor=white)

> Las versiones de las bibliotecas corresponden a las versiones fijadas en los archivos `package-lock.json`. PostgreSQL y Node.js corresponden a las imágenes configuradas para Docker.

## 📑 Guías: cuál debes abrir

| Archivo | Para qué sirve |
| --- | --- |
| **`README.md`** (este archivo, en la raíz del repositorio) | Presentación del sistema y primeros pasos para probarlo localmente. |
| **[`README-DOCKER.md`](README-DOCKER.md)** (también en la raíz) | Guía completa para instalar con Docker, configurar integraciones, preparar el despliegue para TI, conservar datos y solucionar problemas. |

**Si solo quieres probar el sistema en tu computadora**, sigue «Inicio rápido» más abajo. **Si vas a instalarlo en un servidor o entregarlo a TI**, abre [`README-DOCKER.md`, sección “Preparar una instalación para TI”](README-DOCKER.md#preparar-una-instalacion-para-ti) y sigue sus pasos en orden.

## ✨ Módulos principales

- **Casos SOP:** registro, consulta y seguimiento de casos.
- **Planes de acción:** asignación y seguimiento por área y responsable.
- **Contingencias:** registro y consulta de indicadores operativos.
- **Importaciones:** validación y carga de datos históricos.
- **Evidencias:** archivos asociados a casos, servidos mediante acceso protegido.
- **Notificaciones:** avisos dentro de la aplicación y funciones opcionales de correo y Web Push.

Las pantallas y acciones disponibles dependen del perfil y los permisos de la cuenta.

## 🧰 Tecnologías y versiones

| Componente | Tecnología | Versión fijada/configurada |
| --- | --- | --- |
| Interfaz | React | 19.2.8 |
| Lenguaje del frontend | TypeScript | 6.0.3 |
| Compilación del frontend | Vite | 8.1.5 |
| Entorno del backend | Node.js | 22 (`node:22-bookworm-slim`) |
| API | Express | 5.2.1 |
| Lenguaje del backend | TypeScript | 5.9.3 |
| Base de datos | PostgreSQL | 16 (`postgres:16-alpine`) |
| ORM y esquema | Prisma | 6.19.3 |
| Servidor del frontend | Nginx | 1.27 Alpine |
| Contenedores | Docker Compose | v2 |

## 🚀 Inicio rápido: prueba local con Docker

### Requisitos

- Docker Desktop o Docker Engine con Docker Compose v2.
- Git.

### 1. Clona el repositorio

```sh
git clone https://github.com/yojhanHuanca/seguridad-operativa-l1.git
cd seguridad-operativa-l1
```

### 2. Crea tu archivo local de configuración

En PowerShell:

```powershell
Copy-Item .env.docker.example .env.docker
```

Abre `.env.docker` y reemplaza `POSTGRES_PASSWORD` y `JWT_SECRET` por valores aleatorios diferentes. No compartas ni subas ese archivo: contiene los secretos de tu entorno.

### 3. Construye e inicia el sistema

```powershell
docker compose --env-file .env.docker up --build -d
docker compose --env-file .env.docker ps
```

Espera a que los servicios indiquen que están activos y saludables. Luego abre:

- **Aplicación:** [http://localhost:8080](http://localhost:8080)
- **Bandeja local para correos de prueba:** [http://localhost:8025](http://localhost:8025)

En esta modalidad, Mailpit captura los correos; no los envía a destinatarios reales. La base local empieza vacía y no existe registro público. Para crear tu primer administrador local, sigue la sección [“Crear la primera cuenta administradora local”](README-DOCKER.md#crear-la-primera-cuenta-administradora-local) de la guía Docker. Ese usuario sirve solo para la base de prueba local.

### Comandos útiles

Ver los registros del backend:

```powershell
docker compose --env-file .env.docker logs -f backend
```

Detener los servicios conservando la base y los archivos:

```powershell
docker compose --env-file .env.docker down
```

> **Atención:** `docker compose down --volumes` elimina la base local y los archivos cargados. No uses `--volumes` si necesitas conservar esos datos.

## 🔌 Integraciones externas

- **Correo transaccional:** Resend API. Requiere `RESEND_API_KEY` y un remitente autorizado en `EMAIL_FROM`.
- **Inicio de sesión con Google:** opcional. Requiere credenciales OAuth configuradas en backend y frontend.
- **Web Push:** opcional. Requiere claves VAPID y HTTPS en el entorno publicado.

El inicio de sesión con Google no habilita el envío de correo mediante Gmail. La configuración detallada de cada integración está en [`README-DOCKER.md`, “Configuración de integraciones”](README-DOCKER.md#configuracion-de-integraciones).

## 🏢 Instalación en un servidor de la empresa

El inicio rápido sirve para pruebas locales. Para la instalación empresarial, TI debe definir el servidor, el nombre HTTPS, los secretos, las credenciales de integraciones, las cuentas iniciales y los procedimientos de respaldo y restauración.

**Ruta exacta:** raíz del repositorio → [`README-DOCKER.md`](README-DOCKER.md) → sección [“Preparar una instalación para TI”](README-DOCKER.md#preparar-una-instalacion-para-ti). La guía también incluye migración de datos y archivos, actualización y resolución de problemas.

## 🔐 Datos y seguridad

El repositorio contiene el código y las plantillas de configuración; no contiene las cuentas, los casos, las evidencias ni los secretos de la empresa. Clonar el repositorio **no** migra esos datos. Para trasladar información existente, TI debe planificar la migración de la base y de los archivos adjuntos según [`README-DOCKER.md`, “Datos, archivos y respaldos”](README-DOCKER.md#datos-archivos-y-respaldos).

Nunca subas archivos `.env` completados, contraseñas, claves API ni respaldos con datos reales al repositorio.

## 🗂️ Estructura del repositorio

```text
.
├── backend/                 # API, lógica del servidor y esquema Prisma
├── frontend/                # Aplicación web React
├── docker-compose.yml       # Entorno local con PostgreSQL y Mailpit
├── docker-compose.production.yml  # Despliegue autocontenido para servidor
├── README.md                # Presentación e inicio rápido
└── README-DOCKER.md         # Instalación detallada y guía para TI
```
