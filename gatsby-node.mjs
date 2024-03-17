import { fileURLToPath } from "url";
import path_, { dirname } from "path";
import { getContext } from "./bundle-helper.mjs";
import { gen_NodesStr } from "./mdx/printer.mjs";
import webpackConfig from "./webpack.config.js";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// prettier-ignore
const pageTemplatesCtx = await getContext( path_.resolve(__dirname, "./src/templates/pages"), /\.tsx$/);

export async function createPages({ actions, graphql, reporter }) {
  const opts = [];
  for (const { path, fullPath } of pageTemplatesCtx) {
    const blogsCtx = await getContext(
      path_.resolve(__dirname, "./data"),
      /\.mdx$/,
      {
        isSubPath: true,
        basePath: path,
      }
    );
    const nodes = await gen_NodesStr(blogsCtx);
    opts.push({
      path,
      component: fullPath,
      context: { title: "My blogs", nodes },
    });
  }
  // console.log(opts.map((e) => e.context.nodes));
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
