import { fileURLToPath } from "url";
import _path, { dirname } from "path";
import { getContext } from "./bundle-helper.mjs";
import { compileMDX } from "./mdx/compile.mjs";
import webpackConfig from "./webpack.config.js";
import { createRequire } from "module";
// import { loadCom_s } from "./mdx/eval.mts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// prettier-ignore
const pageTemplatesCtx = await getContext( _path.resolve(__dirname, "./src/templates/pages"), /\.tsx$/);

export async function createPages({ actions, graphql, reporter }) {
  const opts = [];
  const load = async () => {
    for (const { path, fullPath } of pageTemplatesCtx) {
      const blogsCtx = await getContext(
        _path.resolve(__dirname, "./data"),
        /\.mdx$/,
        {
          isSubPath: true,
          basePath: path,
        }
      );
      const nodes = await compileMDX(blogsCtx);
      // const slots = []; // await loadCom_s(blogsCtx); 此段代码运行在编译时, 产生的函数引用无法传递给浏览器运行时
      opts.push({
        path,
        component: fullPath,
        context: { title: "My blogs", nodes },
      });
    }
  };
  await load();
  opts.forEach((o) => actions.createPage(o));
}

export const onCreateWebpackConfig = ({
  stage,
  getConfig,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  const tsLoader = webpackConfig.module.rules.find((r) => r.test.test(".ts"));
  tsLoader.use.forEach((u) => {
    u.loader = require.resolve(u.loader);
  });
  tsLoader.use.unshift(loaders.js());
  actions.setWebpackConfig({
    // resolve: {
    //   fallback: {
    //     url: false,
    //     path: false,
    //   },
    // },
    plugins: [...webpackConfig.plugins],
    module: {
      rules: [tsLoader],
    },
  });
};
