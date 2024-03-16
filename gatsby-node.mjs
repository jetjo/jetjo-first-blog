import { pageTemplatesCtx, blogsCtx } from "./bundlers/node.mjs";

export async function createPages({ actions, graphql, reporter }) {
  pageTemplatesCtx.forEach(({ path, fullPath }) => {
    actions.createPage({
      path,
      component: fullPath,
      context: { title: "My blogs", nodes: blogsCtx },
    });
  });
}
