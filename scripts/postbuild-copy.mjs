import { cpSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const nextDir = join(root, ".next");
const standaloneDir = join(nextDir, "standalone");
const standaloneNextDir = join(standaloneDir, ".next");
const staticDir = join(nextDir, "static");
const publicDir = join(root, "public");

if (!existsSync(standaloneDir)) {
  console.warn("Standalone output not found, skipping postbuild copy.");
  process.exit(0);
}

mkdirSync(standaloneNextDir, { recursive: true });

if (existsSync(staticDir)) {
  cpSync(staticDir, join(standaloneNextDir, "static"), { recursive: true });
}

if (existsSync(publicDir)) {
  cpSync(publicDir, join(standaloneDir, "public"), { recursive: true });
}

console.log("Postbuild assets copied successfully.");
