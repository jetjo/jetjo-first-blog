import path from "path";
import { getContext } from "./bundle-helper.mjs";

const __dirname = import.meta.dirname;

// prettier-ignore
const pageTemplatesCtx = await getContext( path.resolve(__dirname, "./src/templates/pages"), /\.tsx$/);

const blogsCtx = await getContext(path.resolve(__dirname, "./data"), /\.mdx$/);

export async function createPages({ actions, graphql, reporter }) {
  pageTemplatesCtx.forEach(({ path, fullPath }) => {
    actions.createPage({
      path,
      component: fullPath,
      context: { title: "My blogs", nodes: blogsCtx },
    });
  });
}
