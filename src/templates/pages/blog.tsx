import * as React from "react";
import SEO from "../../feature/seo";
import Layout from "../../layout";
// import { resolve } from "url";
import { loadCom_ } from "../../utils/mdx/eval";
import type { MDXContent } from "../../utils/mdx/eval";

import type { PageContext } from "../../../gatsby-config";
import { gen_BlogHeader2 } from "../../3rd/mdx-header";
import { flushSync } from "react-dom";

type Prop = {
  pageContext: PageContext;
};

const Blog_ = React.memo(function Blog_({ pageContext }: Prop) {
  const [Blog, setBlog] = React.useState<MDXContent>(pageContext.slot!);
  // console.log(pageContext, blog, "pageContext");

  React.useEffect(() => {
    let ignore = false;
    const load = async () => {
      if (ignore || !pageContext.node) return;
      const B = await loadCom_(pageContext.node);
      // NOTE: 因为`B`是一个函数, 如果直接传递给setBlog, 会被当作`updater function`, 会导致b被调用, 所以需要使用一个函数包装一下
      setBlog(() => B);
    };
    load();
    return () => {
      ignore = true;
    };
  }, [pageContext.node]);

  return (
    <Layout>
      {Blog &&
        Blog({
          components: gen_BlogHeader2(Blog.context),
        })}
    </Layout>
  );
});

export default Blog_;

export const Head = () => <SEO title="Blog" />;
