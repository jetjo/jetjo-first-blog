import { evaluate as _evaluate, run } from "@mdx-js/mdx";
import * as _runtime from "react/jsx-runtime";
import type { Context } from "../../../gatsby-config";
// import { pathToFileURL as _pathToFileURL } from "url";
import fileUrl from "file-url";
import Fragment from "../../layout/Fragment";

const pathToFileURL = fileUrl; //|| ((path = "") => _pathToFileURL(path).href);

type _MDXModule = Awaited<ReturnType<typeof run>>;
export type RunOptions = Parameters<typeof run>[1];

export type MDXContent = _MDXModule["default"] & { context: Context };

export type MDXModule = Omit<_MDXModule, "default"> & { default: MDXContent };

export type Node = { code?: string; runTime: RunOptions } & Context;

const mdxRuntime = {
  ..._runtime,
  Fragment,
  baseUrl: import.meta.url,
} as RunOptions;

const mdxRuntime$ = {
  ..._runtime,
  baseUrl: import.meta.url,
} as RunOptions;

async function evaluate(file = "", mdxRuntime: any) {
  return (await _evaluate(file, mdxRuntime)) as MDXModule;
}

export async function loadCom_s(ctxs: Node[]) {
  const com_s = [];
  for (const ctx of ctxs) {
    if (ctx.code) {
      com_s.push(await loadCom_(ctx));
      continue;
    }
    // prettier-ignore
    const runTime = ctx.runTime ? mdxRuntime$ : mdxRuntime;
    const Content = (await evaluate(pathToFileURL(ctx.fullPath), runTime))
      .default;
    Content.context ||= ctx;
    com_s.push(Content);
  }
  return com_s;
}

export async function loadCom_({ code, ...ctx }: Node) {
  // prettier-ignore
  const runTime: any = ctx.runTime ? mdxRuntime$ : mdxRuntime;
  const { default: Content } = (
    code
      ? await run(code, runTime)
      : await evaluate(pathToFileURL(ctx.fullPath), runTime)
  ) as MDXModule;
  Content.context ||= ctx;
  // console.log(Content);

  return Content;
}
