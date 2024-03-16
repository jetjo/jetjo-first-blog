import * as React from "react";
import SEO from "../../feature/seo";
import Layout from "../../layout";

export default function BlogList({ pageContext }) {
  // console.log(pageContext);
  return (
    <Layout pageTitle={pageContext.title}>
      <ul>
        {pageContext.nodes.map((node) => (
          <li key={node.name}>{node.name}</li>
        ))}
      </ul>
    </Layout>
  );
}

export const Head = () => <SEO title="Blog List" />;
