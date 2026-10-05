import { defineConfig } from "vitest/config";
import { coverageOptions } from "./vitest.coverage";
import { fileURLToPath } from "node:url";
// @ts-ignore Configuración compartida con el lanzador Node.
import { loadTestEnvironment } from "./tests/integration/environment.mjs";

loadTestEnvironment();

export default defineConfig({
  resolve: {
    // Un prisma.js antiguo en src/lib importa @prisma/client en lugar del
    // cliente actual. Las pruebas deben usar la fuente TypeScript vigente.
    alias: [{
      find: /^(?:\.\.\/)+lib\/prisma\.js$/,
      replacement: fileURLToPath(new URL("./src/lib/prisma.ts", import.meta.url)),
    }, {
      find: "./lib/prisma.js",
      replacement: fileURLToPath(new URL("./src/lib/prisma.ts", import.meta.url)),
    }, {
      find: "../../src/lib/prisma.js",
      replacement: fileURLToPath(new URL("./src/lib/prisma.ts", import.meta.url)),
    }],
  },
  test: {
    environment: "node",
    coverage: { ...coverageOptions, reportsDirectory: "./coverage/integration" },
    include: ["tests/integration/**/*.test.ts"],
    fileParallelism: false,
    testTimeout: 15_000,
    hookTimeout: 30_000,
    server: { deps: { inline: [/generated[\\/]prisma/], external: [/\.prisma[\\/]client/] } },
  },
});
