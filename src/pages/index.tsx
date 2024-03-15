// Step 1: Import React
import * as React from "react";
import Layout from "../layout";

// Step 2: Define your component
const IndexPage = () => {
  return (
    <Layout pageTitle={"Welcome to my Gatsby site!"}>
      <p>I'm making this by following the Gatsby Tutorial.</p>
    </Layout>
  );
};

export const Head = () => <title>Home Page</title>;

// Step 3: Export your component
export default IndexPage;
