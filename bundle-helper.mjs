import { createRequire } from "module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { opendir } from "node:fs/promises";
import _path, { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function withWebpackContext(require = createRequire(import.meta.url)) {
  require.context = async (pathDir, recursive = true, glob) => {
    const keys = [];

    try {
      const dir = await opendir(_path.resolve(__dirname, pathDir), {
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
        const p = _path.resolve(d.path, d.name);
        if (!d.isFile()) continue;
        if (glob && !glob.test(p)) continue;
        keys.push(p);
      }
    } catch (err) {
      console.error(err);
    }

    // return { keys: () => keys };
    const require = createRequire(import.meta.url);
    require.keys = () => keys;
    return require;
  };

  return require;
}

const contextBucket = new Map();

const findContext = (dir, glob) => {
  const key = `${dir}:${glob}`;
  return contextBucket.get(key);
};
const require = withWebpackContext();

/**
 * @returns {Promise<import('./gatsby-config').Context[]>}
 */
export async function getContext(dir, glob, opt = {}) {
  const { isSubPath, basePath, loads } = opt;
  const absDir = _path.resolve(import.meta.dirname, dir);
  // prettier-ignore
  const context = findContext(absDir, glob) || (await require.context(absDir, true, glob));
  contextBucket.set(`${absDir}:${glob}`, context);

  const getPath = (fullPath = "") => {
    const relP = fullPath.slice(absDir.length);
    const path = relP.slice(0, relP.indexOf("."));
    return {
      path: isSubPath ? basePath + path : path,
      name: path.slice(1).replaceAll(/[\\\/\.\s]+/g, "-"),
      identifier: fullPath.replaceAll(new RegExp(glob, "g"), ""),
    };
  };

  const getLoads = async (ctx) => {
    const load = loads.find((l) => l.identifier === ctx.identifier);
    if (!load) return {};
    // prettier-ignore
    const { default: def, isGroup } = await import(pathToFileURL(load.fullPath).href);
    // const { default: def, isGroup } = require(load.fullPath);
    return isGroup ? { loads: def } : { load: def };
  };

  const res = context.keys().map((key) => ({
    fullPath: key,
    ...getPath(key, absDir),
  })); // as Context[];

  if (!Array.isArray(loads)) return res;

  for (const ctx of res) {
    Object.assign(ctx, await getLoads(ctx));
  }

  return res;
}
