# Pruebas HTTP con base real

Ejecutar desde backend. Requiere PostgreSQL local y una base vacía llamada
seguridad_operativa_test. Puede crearse desde pgAdmin (Databases > Create > Database).

```powershell
Copy-Item .env.test.example .env.test
notepad .env.test
npm run test:db:prepare
npm run test:integration
npm test
npm run build
```

Editar usuario, contraseña y puerto de PostgreSQL en .env.test antes de preparar.
No volver a copiar la plantilla si ya configuraste el archivo.
El comando prepare aplica las migraciones existentes, no crea el servidor PostgreSQL.
No ejecuta reset ni el seed general. La configuración solo admite una base local
con el nombre indicado y esquema public; nunca utiliza .env como alternativa.

La suite usa app.ts, controladores, servicios, JWT, bcrypt y Prisma reales, sin mocks.
Comprueba conexión, login inválido, sesión y auditoría persistidas, acceso Admin,
rechazo de Monitorista y revocación después del logout. Crea usuarios únicos y
limpia únicamente sus usuarios, sesiones, auditoría y roles creados por la suite.
Si se interrumpe el proceso por fuerza, pueden quedar datos ficticios en esta base.

Estas pruebas son una primera cobertura de integración. No certifican todos los
flujos del negocio ni sustituyen las pruebas del frontend y la revisión de dependencias.
