import { defineConfig } from "vitest/config";
import { coverageOptions } from "./vitest.coverage.ts";
// @ts-ignore Configuración compartida con el lanzador Node.
import { loadTestEnvironment } from "./tests/integration/environment.mjs";

loadTestEnvironment();

export default defineConfig({
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
