import { createRequire } from "module";
import { fileURLToPath } from "url";
import { opendir } from "node:fs/promises";
import path_, { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function withWebpackContext(require = createRequire(import.meta.url)) {
  require.context = async (pathDir, recursive = true, glob) => {
    const keys = [];

    try {
      const dir = await opendir(path_.resolve(__dirname, pathDir), {
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
        const p = path_.resolve(d.path, d.name);
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

/**
 * @returns {Promise<import('./gatsby-config').Context[]>}
 */
export async function getContext(dir, glob, { isSubPath, basePath } = {}) {
  const absDir = path_.resolve(import.meta.dirname, dir);

  const getPath = (fullPath = "") => {
    const relP = fullPath.slice(absDir.length);
    const path = relP.slice(0, relP.indexOf("."));
    return {
      path: isSubPath ? basePath + path : path,
      name: path.slice(1).replaceAll(/[\\\/\.\s]+/g, "-"),
    };
  };

  const context = await withWebpackContext().context(absDir, true, glob);
  return context.keys().map((key) => ({
    fullPath: key,
    ...getPath(key, absDir),
    // name: key.match(/\/([^\/\.]+)(?:\..*)+$/)[1],
  })); // as Context[];
}
