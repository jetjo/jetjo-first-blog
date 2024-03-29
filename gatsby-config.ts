import type { GatsbyConfig } from "gatsby";
import { MDXContent, Node } from "./src/utils/mdx/eval";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `JetJo's Blog`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: false,
  plugins: ["gatsby-plugin-image", "gatsby-plugin-sharp"]//, "gatsby-plugin-mdx"],
};

export default config;

export type Context = {
  id: string;
  name: string;
  /** 当使用此文件作为页面模版时, 页面的URL */
  path: string;
  /** 此文件在文件系统中的绝对路径 */
  fullPath: string;
  load?: ({ path, fullPath }: Context) => Promise<PageContext>;
};

export type PageContext = {
  title: string;
  nodes?: Node[];
  node?: Node;
  slots?: MDXContent[];
  slot?: MDXContent;
};

export type CreatePageContext = {
  path: string;
  component: string;
  context: PageContext;
};
