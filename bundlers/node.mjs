import { getContext } from "./helper.mjs";

export const pageTemplatesCtx = await getContext(
  "../src/templates/pages",
  /\.tsx$/
);

export const blogsCtx = await getContext("../data", /\.mdx$/);
