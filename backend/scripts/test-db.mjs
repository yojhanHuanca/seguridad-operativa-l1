import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { loadTestEnvironment } from "../tests/integration/environment.mjs";

try {
  loadTestEnvironment();
  const result = spawnSync(process.execPath, [
    fileURLToPath(new URL("../node_modules/prisma/build/index.js", import.meta.url)),
    "migrate", "deploy",
  ], { cwd: fileURLToPath(new URL("../", import.meta.url)), env: process.env, stdio: "inherit" });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
