// Step 1: Import React
import * as React from "react";
import Layout from "../layout";

// Step 2: Define your component
const AboutPage = () => {
  return (
    <Layout pageTitle={"About Me"}>
      <p>
        Hi there! I'm the proud creator of this site, which I built with Gatsby.
      </p>
    </Layout>
  );
};

// Step 4: 使用`Gatsby Head Api`定义并导出此页面的元数据
// https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
// https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-seo-component/
export const Head = () => {
  return (
    <>
      <title>About me</title>
      <meta name="Description" content="This is a page about me" />
      <meta name="Keywords" content="gatsby, react, tutorial" />
    </>
  );
};

// Step 3: Export your component
export default AboutPage;
