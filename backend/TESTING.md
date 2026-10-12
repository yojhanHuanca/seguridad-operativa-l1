# Pruebas y cobertura del backend

Ejecutar desde la carpeta `backend`, con PostgreSQL local disponible y `.env.test` configurado para `seguridad_operativa_test`:

```powershell
npm ci
npm run test:db:prepare
npm run test:coverage
Start-Process .\coverage\combined\index.html
```

`test:coverage` ejecuta pruebas unitarias y de integración en una misma medición. Excluye el cliente generado de Prisma, las pruebas y las declaraciones de tipos. Los archivos se aíslan para que los mocks unitarios no sustituyan PostgreSQL en las pruebas de integración.

Las pruebas de integración crean sus propios usuarios, áreas y reportes y eliminan esos registros al terminar. El cargador de entorno bloquea bases distintas de `seguridad_operativa_test` y servidores distintos del equipo local. No ejecutar contra producción. Los transportes externos de correo y push están deshabilitados durante las pruebas.

También se pueden obtener informes separados:

```powershell
npm run test:coverage:unit
npm run test:coverage:integration
```

Se guardan respectivamente en `coverage/unit` y `coverage/integration`. Los porcentajes separados no se suman: consultar `coverage/combined` para el resultado conjunto.

Los escenarios reales incluyen autenticación, fotos, permisos, material rodante, reportes anónimos e identificados y el ciclo de planes de acción. Un reporte puede distribuir planes entre distintos jefes de área: cada plan mantiene su ejecución y revisión independientes. Seguridad Operativa puede iniciar la ejecución con un plan aceptado mientras otro sigue Enviado. Devolver un plan no modifica los planes cerrados; el caso se cierra cuando todos sus planes fueron revisados y cerrados.

La cobertura indica código ejecutado, no ausencia de errores. Completar también las pruebas de frontend y la compilación antes de preparar un despliegue. Este informe no mide capacidad de usuarios simultáneos ni entrega real de correo o push.

Las pruebas `password-lifecycle.test.ts` verifican, para los seis roles, el cambio obligatorio de contraseña temporal, la conservación de la clave al editar datos, el restablecimiento por administrador y por enlace, la revocación de sesiones y la ausencia de contraseñas o hashes en respuestas y auditoría. Las cuentas existentes conservan su acceso: la migración agrega `debe_cambiar_password` con valor inicial `false`; solo las cuentas nuevas y los restablecimientos administrativos lo activan.

Antes de desplegar esta versión del backend, aplicar la migración en el entorno correspondiente con `npx prisma migrate deploy` y generar el cliente con `npx prisma generate`. No usar `migrate reset` ni volver a ejecutar semillas para este cambio. Publicar también el frontend que incluye `/cambiar-contrasena`.
