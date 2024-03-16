import { createRequire } from "module";
import { fileURLToPath } from "url";
import { opendir } from "node:fs/promises";
import path, { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const __require = createRequire(import.meta.url);

export function withContext(require = __require) {
  require.context = async (pathDir, recursive = true, glob) => {
    const keys = [];

    try {
      const dir = await opendir(path.resolve(__dirname, pathDir), {
        encoding: "utf8",
        withFileTypes: true,
        recursive,
      });
      for await (const d of dir) {
        if (!d.path) {
          dir.closeSync();
          throw new Error(
            "d.path is undefined, 需要 node v20.1.0 或更高版本。"
          );
        }
        const p = path.resolve(d.path, d.name);
        if (!d.isFile()) continue;
        if (glob && !glob.test(p)) continue;
        keys.push(p);
      }
    } catch (err) {
      console.error(err);
    }

    return { keys: () => keys };
  };

  return require;
}

const require = withContext();
function getPagePath(templatePath = "", baseDir = "") {
  const r1 = templatePath.slice(baseDir.length);
  const r2 = r1.slice(0, r1.indexOf("."));
  return { path: r2, name: r2.slice(1).replaceAll("/", "-") };
}

export async function getContext(dir, glob) {
  const pageTemplateDir = path.resolve(import.meta.dirname, dir);

  const nodes = await require.context(pageTemplateDir, true, glob);

  return nodes.keys().map((key) => ({
    fullPath: key,
    ...getPagePath(key, pageTemplateDir),
    // name: key.match(/\/([^\/\.]+)(?:\..*)+$/)[1],
  }));

  // console.log(pageTemplatesCtx, '+++++++++++++++++++++++');
}
