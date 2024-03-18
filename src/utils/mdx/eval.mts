import { evaluate as _evaluate, run } from "@mdx-js/mdx";
import * as _runtime from "react/jsx-runtime";
import type { Context } from "../../../gatsby-config";
import { pathToFileURL as _pathToFileURL } from "url";
import fileUrl from "file-url";

const pathToFileURL = ((path = "") => _pathToFileURL(path).href) || fileUrl;

type _MDXModule = Awaited<ReturnType<typeof run>>;
export type RunOptions = Parameters<typeof run>[1];

export type MDXContent = _MDXModule["default"] & { context: Context };

export type MDXModule = Omit<_MDXModule, "default"> & { default: MDXContent };

export type Node = { code?: string } & Context;

const mdxRuntime = { ..._runtime, baseUrl: import.meta.url } as RunOptions;

async function evaluate(file = "") {
  return (await _evaluate(file, mdxRuntime)) as MDXModule;
}

export async function loadCom_s(ctxs: Node[]) {
  const com_s = [];
  for (const ctx of ctxs) {
    if (ctx.code) {
      com_s.push(await loadCom_(ctx));
      continue;
    }
    const Content = (await evaluate(pathToFileURL(ctx.fullPath))).default;
    Content.context ||= ctx;
    com_s.push(Content);
  }
  return com_s;
}

export async function loadCom_({ code, ...ctx }: Node) {
  const { default: Content } = (
    code
      ? await run(code, mdxRuntime)
      : await evaluate(pathToFileURL(ctx.fullPath))
  ) as MDXModule;
  Content.context ||= ctx;
  return Content;
}
