import * as React from "react";
import { parseMDXHeader } from "../utils/mdx/compile.mjs";

export function gen_BlogHeader2(context) {
  function BlogHeader2(prop) {
    const { title, slug, date } = JSON.parse(parseMDXHeader(prop.children));
    return (
      <div>
        <a href={context.path}>
          <h2>{title}</h2>
        </a>
        <p>Posted: {date}</p>
        {/* <p>{slug}</p> */}
      </div>
    );
  }

  const _createMdxContentComps = {
    h2: BlogHeader2,
  };
  return _createMdxContentComps;
}
