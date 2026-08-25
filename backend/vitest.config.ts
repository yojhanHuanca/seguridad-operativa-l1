import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    // Sin esto, un test que se cuelga esperando una promesa (p. ej. un mock de
    // Prisma que no responde) tranca el proceso indefinidamente en vez de fallar.
    testTimeout: 10_000,
    server: {
      deps: {
        // El cliente generado ubica el binario del motor con rutas relativas a
        // `__dirname`. Vitest corre los módulos a través de la transformación
        // de Vite por defecto, que reescribe esas rutas y rompe esa búsqueda
        // ("@prisma/client did not initialize yet" aunque el cliente esté bien
        // generado — se confirmó que el mismo import funciona con tsx normal).
        // Marcarlo como externo lo deja cargar con `require`/`import` nativo.
        external: [/generated\/prisma/, /\.prisma[\\/]client/],
      },
    },
  },
});
