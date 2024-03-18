import _path from "path";
import * as React from "react";
import SEO from "../../feature/seo";
import Layout from "../../layout";
import { loadCom_ } from "../../utils/mdx/eval";
import type { PageContext } from "../../../gatsby-config";
import type { MDXContent } from "../../utils/mdx/eval";
import { gen_BlogHeader2 } from "../../3rd/mdx-header";

type Prop = {
  pageContext: PageContext;
};

const BlogList = React.memo(function BlogList({ pageContext }: Prop) {
  const [Blogs, setBlogs] = React.useState<MDXContent[]>([]);
  // console.log(pageContext);

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
              components: gen_BlogHeader2(node.context),
            })}
          </li>
        ))}
      </ul>
    </Layout>
  );
});

export default BlogList;

export const Head = () => <SEO title="Blog List" />;
