import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = process.cwd();
const output = join(root, "_site");
const fitletDist = resolve(process.env.FITLET_DIST ?? ".build/fitlet-source/dist/client");
const tatsuSource = resolve(process.env.TATSU_SOURCE ?? ".build/tatsu-source");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const name of ["index.html", "styles.css", "script.js", "CNAME", "robots.txt", "sitemap.xml", "site.webmanifest"]) {
  await cp(join(root, name), join(output, name));
}
await cp(join(root, "assets"), join(output, "assets"), { recursive: true });
await cp(fitletDist, join(output, "fitlet"), { recursive: true });

const tatsuOutput = join(output, "tatsu");
await mkdir(tatsuOutput, { recursive: true });
const entries = await readdir(tatsuSource, { withFileTypes: true });
for (const entry of entries) {
  if (entry.isFile() && /\.(html|js|png|jpe?g|webp)$/i.test(entry.name)) {
    await cp(join(tatsuSource, entry.name), join(tatsuOutput, entry.name));
  }
}
await cp(join(tatsuSource, "screenshot"), join(tatsuOutput, "screenshot"), { recursive: true });
