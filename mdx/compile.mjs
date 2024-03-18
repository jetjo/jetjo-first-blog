import fs from "node:fs/promises";
import { compile as _compile } from "@mdx-js/mdx";

async function compile(path) {
  const compiled = await _compile(await fs.readFile(path, "utf-8"), {
    outputFormat: "function-body",
  });
  return String(compiled);
}

/**
 * @param {import('../gatsby-config').Context[]} ctxs
 * @returns {Promise<import('../src/utils/mdx/eval.mts').Node[]>}
 */
export async function compileMDX(ctxs) {
  const nodes = [];
  for (const ctx of ctxs) {
    nodes.push({ code: await compile(ctx.fullPath), ...ctx });
  }
  return nodes;
}
