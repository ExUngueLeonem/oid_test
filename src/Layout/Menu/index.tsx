import * as React from 'react';

import { NavLink } from "react-router-dom";
import "./Menu.scss";

export type RouteInfo = {
  path?: string;
  title: string;
  routes?: RouteInfo[];
};

function MenuItem({ page, level = 0, parent = "" }: { page: RouteInfo; level?: number; parent?: string }) {
  return (
    <li className={`sidebar-nav__item ${Array.isArray(page.routes) ? "sidebar-nav__item-group" : ""}`}>
      {page.path ? (
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to={!!parent ? parent + "/" + page.path : page.path}
        >
          {page.title}
        </NavLink>
      ) : (
        <span className="sidebar-nav__item-link">{page.title}</span>
      )}
      {Array.isArray(page.routes) && (
        <ul className="nav-flyout">
          {page.routes.map((p, i) => (
            <MenuItem key={`page_item_${i}`} page={p} level={level + 1} parent={page.path} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Menu({ pages, title, logo }: { pages: RouteInfo[]; title?: string; logo?: string }) {
  return (
    <aside className="sidebar">
      <header>
        {logo} <span className="content-title">{title}</span>
      </header>
      <nav className="sidebar-nav">
        <ul>
          {pages.map((page, i) => (
            <MenuItem key={`page_nav_${i}`} {...{ page }} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
