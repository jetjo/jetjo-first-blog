// Step 1: Import React
import * as React from "react";
import Layout from "../layout";
import { StaticImage } from "gatsby-plugin-image";
import SEO from "../feature/seo";

// Step 2: Define your component
const IndexPage = () => {
  return (
    <Layout pageTitle={"Welcome to my Gatsby site!"}>
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <StaticImage
        alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
        src="../assets/images/clifford.webp"
      />
    </Layout>
  );
};

export const Head = () => <SEO title="Home" />;

// Step 3: Export your component
export default IndexPage;
