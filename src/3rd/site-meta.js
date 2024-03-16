import config from "../../gatsby-config.ts";

function getSiteMeta() {
  return {
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
  };
}

export { getSiteMeta };
