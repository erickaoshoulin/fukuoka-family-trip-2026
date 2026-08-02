import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = join(projectRoot, "gh-pages");
const clientDir = join(projectRoot, "dist", "client");
const workerEntry = pathToFileURL(join(projectRoot, "dist", "server", "index.js")).href;
const basePath = process.env.GITHUB_PAGES_BASE_PATH ?? "/fukuoka-family-trip-2026/";
const githubPagesUrl =
  process.env.GITHUB_PAGES_URL ??
  "https://erickaoshoulin.github.io/fukuoka-family-trip-2026/";
const base = basePath.endsWith("/") ? basePath : `${basePath}/`;
const canonicalBase = githubPagesUrl.endsWith("/") ? githubPagesUrl : `${githubPagesUrl}/`;
const sitesHost = "https://fukuoka-family-trip-2026.kslin.chatgpt.site";

const { default: worker } = await import(workerEntry);
const response = await worker.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`Could not render the home page: ${response.status}`);
}

let html = await response.text();

// The SSR output uses root-relative Vite paths. GitHub project pages live under
// /fukuoka-family-trip-2026/, so rewrite both HTML attributes and inline RSC
// payloads before publishing the static snapshot.
html = html.replaceAll(sitesHost, canonicalBase.slice(0, -1));
html = html.replace(/(href|src|content)="\/(?!\/)([^"]*)"/g, (_, attribute, path) =>
  `${attribute}="${base}${path}"`,
);
html = html.replaceAll('="/assets/', `="${base}assets/`);
html = html.replaceAll('import("/assets/', `import("${base}assets/`);

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(clientDir, outputDir, { recursive: true });
await writeFile(join(outputDir, "index.html"), html);
await writeFile(join(outputDir, "404.html"), html);
await writeFile(join(outputDir, ".nojekyll"), "");

const cssPath = [...html.matchAll(/href="([^"]+\.css)"/g)][0]?.[1] ?? "";
const scriptPath = [...html.matchAll(/import\("([^"]+\.js)"\)/g)][0]?.[1] ?? "";
if (!cssPath.startsWith(base) || !scriptPath.startsWith(base)) {
  throw new Error("GitHub Pages asset paths were not rewritten correctly");
}

console.log(`GitHub Pages artifact ready: ${outputDir}`);
console.log(`CSS: ${cssPath}`);
console.log(`Entry: ${scriptPath}`);
