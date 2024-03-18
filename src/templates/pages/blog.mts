import _path, { dirname } from "path";

import type { Context } from "../../../gatsby-config";
import { getContext } from "../../../bundle-helper.mjs";
import { compileMDX } from "../../../mdx/compile.mjs";
import { createRequire } from "module";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const gen_Title = (name = "") => {
  const r1 = name
    .replaceAll(/[^a-zA-Z0-9_-]+/g, "")
    .replaceAll("-", " ")
    .trim();
  const cap = r1.charAt(0).toUpperCase();
  return cap + r1.slice(1);
};

export default async ({ path: pagePath, fullPath: page }: Context) => {
  const opts = [];
  const blogsCtx = await getContext(
    _path.resolve(__dirname, "../../../data/blogs"),
    /\.mdx$/,
    {
      isSubPath: true,
      basePath: pagePath,
      loads: undefined,
    }
  );
  for (const ctx of blogsCtx) {
    const node = await compileMDX(ctx);
    // const slots = []; // await loadCom_s(blogsCtx); 此段代码运行在编译时, 产生的函数引用无法传递给浏览器运行时
    const { id, name, path, fullPath } = ctx;
    opts.push({
      path,
      component: page,
      context: { title: gen_Title(name), node },
    });
  }
  return opts;
};

export const isGroup = true;
