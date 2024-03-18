import _path, { dirname } from "path";

import type { Context } from "../../../gatsby-config";
import { getContext } from "../../../bundle-helper.mjs";
import { compileMDX } from "../../../mdx/compile.mjs";
import { createRequire } from "module";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export default async ({ path, fullPath }: Context) => {
  // const opts = [];
  // for (const { path, fullPath } of pageTemplatesCtx) {
  const blogsCtx = await getContext(
    _path.resolve(__dirname, "../../../data/blogs"),
    /\.mdx$/,
    {
      isSubPath: true,
      basePath: '/blog',
      loads: undefined,
    }
  );
  const nodes = await compileMDX(blogsCtx);
  // const slots = []; // await loadCom_s(blogsCtx); 此段代码运行在编译时, 产生的函数引用无法传递给浏览器运行时
  return { title: "My blogs", nodes };
};

export const isGroup = false;
