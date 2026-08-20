# Correo para el área de TI

**Para:** (área de TI)
**CC:** (supervisor de Seguridad Operativa)
**Asunto:** Sistema de Gestión de Seguridad Operativa – Línea 1: repositorio y coordinación de despliegue

---

Estimados señores del área de TI:

Junto con saludarlos, les escribo en relación al **Sistema de Gestión de Seguridad Operativa (SOP)** que venimos desarrollando para el área de Seguridad Operativa de Línea 1, a fin de que puedan revisarlo y coordinar con nosotros los requerimientos para su despliegue.

## Repositorio

- **URL:** https://github.com/yojhanHuanca/Seguridad_operativa_soma
- **Rama de trabajo:** `develop`

Si el repositorio les figura como privado, por favor indíquenme los usuarios de GitHub a los que debo otorgar acceso.

## Alcance de la plataforma

Aplicación web que cubre el ciclo completo de un caso SOP: registro del reporte (por el trabajador o desde el módulo de Monitoreo), evaluación de riesgo por Seguridad Operativa, investigación, planes de acción a cargo de las áreas responsables, verificación y cierre del expediente.

Maneja cinco perfiles: Reportante, Monitorista, Seguridad Operativa, Jefe de Área y Administrador.

## Stack técnico

| Componente | Tecnología |
|---|---|
| Backend | Node.js + Express + TypeScript (Prisma ORM) |
| Base de datos | PostgreSQL 17 |
| Frontend | React + Vite (build estático) |
| Autenticación | JWT |
| Evidencias | Archivos (imágenes, video, PDF) en almacenamiento persistente |

Variables de entorno que requiere el backend: `DATABASE_URL`, `PORT`, `JWT_SECRET`, `JWT_EXPIRES_IN`. El frontend requiere `VITE_API_URL`.

## Estado actual

El flujo principal está operativo de extremo a extremo y en pruebas internas. Continuamos trabajando en los módulos de indicadores, alertas por vencimiento de plazos y auditoría, además del endurecimiento de seguridad previo al pase a producción.

## Forma de entrega

La entrega se realizará **dockerizada**, mediante un `docker-compose` que levante backend, frontend y base de datos, de modo que de su lado solo sea necesario definir las variables de entorno y el volumen de almacenamiento de evidencias. Actualmente estamos preparando esa configuración.

## Lo que necesitaríamos de su parte

1. Entorno donde se alojará la aplicación (on-premise o nube) y si cuentan con Docker disponible.
2. Instancia de PostgreSQL: ¿la proveen ustedes como servicio administrado o la incluimos en el `docker-compose`?
3. Volumen persistente para las evidencias, con su política de respaldo y de retención.
4. Dominio y certificado HTTPS, e indicación de si la aplicación irá detrás de un proxy reverso.
5. Definición sobre autenticación: si se mantiene el usuario/contraseña propio de la plataforma o debe integrarse con el directorio corporativo (LDAP / SSO).
6. Servidor SMTP, en caso de que se requiera envío de notificaciones por correo.

## Consultas

1. ¿Existe algún lineamiento o checklist de seguridad institucional que la aplicación deba cumplir antes del pase a producción?
2. ¿Requieren ambientes separados de desarrollo, pruebas y producción?
3. ¿Qué versión de Node.js soportan? Hoy desarrollamos sobre una versión reciente y podemos fijar la imagen a la LTS que ustedes indiquen.
4. ¿Cómo manejan la custodia de credenciales y secretos (`JWT_SECRET`, cadena de conexión a la base de datos)?
5. La carga inicial del padrón de usuarios (nombre, correo, área, cargo), ¿la proveerá RR.HH. o el área de TI?

Quedo atento a sus comentarios y a su disponibilidad para una reunión de coordinación, si lo consideran conveniente.

Saludos cordiales,

**Yojhan Huanca**
Practicante — Seguridad Operativa
Línea 1, Metro de Lima
