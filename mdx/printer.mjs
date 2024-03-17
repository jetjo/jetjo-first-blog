import fs from "node:fs/promises";
import { compile } from "@mdx-js/mdx";

async function getMDXStr(path) {
  const compiled = await compile(await fs.readFile(path, "utf-8"), {
    outputFormat: "function-body",
  });
  return String(compiled);
}

/**
 * @param {import('./gatsby-config').Context[]} ctx
 * @returns {Promise<import('./eval.mts').Node[]>}
 */
export async function gen_NodesStr(ctx) {
  const nodes = [];
  for (const blog of ctx) {
    // printMDX(blog.fullPath);
    nodes.push({ txt: await getMDXStr(blog.fullPath), ...blog });
  }
  return nodes;
}
