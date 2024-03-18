import { fileURLToPath } from "url";
import _path, { dirname } from "path";
import { getContext } from "./bundle-helper.mjs";
import webpackConfig from "./webpack.config.js";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// prettier-ignore
const dataTemplatesCtx = await getContext( _path.resolve(__dirname, "./src/templates/pages"), /\.mts$/);
const pageTemplatesCtx = await getContext(
  _path.resolve(__dirname, "./src/templates/pages"),
  /\.tsx$/,
  { loads: dataTemplatesCtx }
);

export async function createPages({ actions, graphql, reporter }) {
  const opts = [];
  for (const ctx of pageTemplatesCtx) {
    const { id, name, path, fullPath, load, loads } = ctx;
    if (loads) {
      opts.push(...(await loads(ctx)));
      continue;
    }
    opts.push({
      path,
      component: fullPath,
      context: load && (await load(ctx)),
    });
  }
  console.log(opts, "++++++++++++++++++++++++++");
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
