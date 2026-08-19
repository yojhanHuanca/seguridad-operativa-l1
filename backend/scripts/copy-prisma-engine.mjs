import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const sourceDir = join(process.cwd(), "src", "generated", "prisma");
const targetDir = join(process.cwd(), "dist", "generated", "prisma");

if (!existsSync(sourceDir)) {
  process.exit(0);
}

mkdirSync(targetDir, { recursive: true });

for (const fileName of readdirSync(sourceDir)) {
  if (fileName.endsWith(".node")) {
    copyFileSync(join(sourceDir, fileName), join(targetDir, fileName));
  }
}