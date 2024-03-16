import * as React from 'react'
import { useSiteMeta } from "../use-site-meta";

export default function SEO({ title }) {
  const { meta } = useSiteMeta();
  return (
    <title>
      {title} | {meta.title}
    </title>
  );
}
