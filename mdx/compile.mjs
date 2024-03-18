import fs from "node:fs/promises";
import { compile as _compile } from "@mdx-js/mdx";

async function compile(path) {
  const compiled = await _compile(await fs.readFile(path, "utf-8"), {
    outputFormat: "function-body",
  });
  return String(compiled);
}

/** @typedef {import('../gatsby-config').Context} Context */
/** @typedef {import('../src/utils/mdx/eval').Node} Node */
/**
 * @param {Context[]|Context} ctxs
 * @returns {Promise<Node[]|Node>}
 */
export async function compileMDX(ctxs) {
  if (!Array.isArray(ctxs)) {
    return { code: await compile(ctxs.fullPath), ...ctxs };
  }
  const nodes = [];
  for (const ctx of ctxs) {
    nodes.push({ code: await compile(ctx.fullPath), ...ctx });
  }
  return nodes;
}
