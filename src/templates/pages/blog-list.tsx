import * as React from "react";
import SEO from "../../feature/seo";
import Layout from "../../layout";
// import { resolve } from "url";
import { loadCom_ } from "../../utils/mdx/eval.mts";
import { parseMDXHeader } from "../../utils/mdx/compile.mjs";
import type { MDXContent } from "../../utils/mdx/eval.mts";

function genCom_(context) {
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

import type { PageContext } from "../../../gatsby-config";

type Prop = {
  pageContext: PageContext;
};

const BlogList = React.memo(function BlogList({ pageContext }: Prop) {
  const [Blogs, setBlogs] = React.useState<MDXContent[]>([]);
console.log(pageContext);

  React.useEffect(() => {
    let ignore = false;
    const load = async () => {
      if (ignore || !pageContext.nodes) return;
      const b = [];
      for (const node of pageContext.nodes) {
        b.push(await loadCom_(node));
      }
      setBlogs(b);
    };
    load();
    return () => {
      ignore = true;
    };
  }, [pageContext.nodes]);

  return (
    <Layout pageTitle={pageContext.title}>
      <ul>
        {[...Blogs, ...(pageContext.slots || [])].map((node, idx) => (
          <li key={idx}>
            {node({
              components: genCom_(node.context),
            })}
          </li>
        ))}
      </ul>
    </Layout>
  );
});

export default BlogList;

export const Head = () => <SEO title="Blog List" />;
