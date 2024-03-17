import { evaluate, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import type { Context } from "../gatsby-config.ts";

export type MDXModule = Awaited<ReturnType<typeof run>>;

export type MDXContent = MDXModule["default"] & { context: Context };

export async function evaluateMDX(file) {
  return await evaluate(file, runtime);
}

export async function gen_Nodes(ctx) {
  const nodes = [];
  for (const blog of ctx) {
    // printMDX(blog.fullPath);
    nodes.push(await evaluateMDX(blog.fullPath));
  }
  return nodes;
}

export type Node = { txt: string } & Context;

export async function loadCom_({ txt, ...context }: Node) {
  const { default: Content } = await run(txt, {
    ...runtime,
    baseUrl: import.meta.url,
  });
  Content.context ||= context;
  return Content as MDXContent;
}
