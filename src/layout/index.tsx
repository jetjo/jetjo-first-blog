import * as React from "react";
import { Link } from "gatsby";
import {
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitle,
} from "./index.module.css";

import { useSiteMeta } from "../feature/use-site-meta";

export default function Layout({
  pageTitle,
  children,
}: {
  pageTitle?: string;
  children: React.ReactNode;
}) {
  const { meta } = useSiteMeta();
  return (
    <div className={container}>
      <header className={siteTitle}> {meta.title} </header>
      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link className={navLinkText} to="/">
              Home
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link className={navLinkText} to="/about">
              About
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link className={navLinkText} to="/blog-list">
              Blogs
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        {pageTitle && <h1 className={heading}>{pageTitle}</h1>}
        {children}
      </main>
    </div>
  );
}
