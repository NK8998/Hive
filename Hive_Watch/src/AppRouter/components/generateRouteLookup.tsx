import { nanoid } from "nanoid";
import React, { Children, ReactElement, ReactNode } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import Route from "./Route";

interface RouteProps {
  path: string;
  element: React.ReactNode;
  children?: ReactNode;
  prefetch?: boolean;
  action?: (...args: any[]) => Promise<void>;
  index?: boolean;
  classList?: string;
}

export interface RouteEntry {
  fullPath: string;
  partialPath: string;
  element: React.ReactNode;
  prefetch?: boolean;
  action?: (
    ...args: any
  ) =>
    | Promise<void>
    | ((dispatch: Dispatch, getState: RootState) => Promise<void>);
  isVisited: boolean;
  parent: string | null;
  isActive: boolean;
  children: RouteEntry[];
  componentID: string;
  index: boolean;
  cacheEnabled: boolean;
  classList: string;
}

export function generateRouteLookup(
  children: ReactNode,
  cacheEnabled: boolean,
  parentPath = "",
  parentFullPath: string | null = null
): RouteEntry[] {
  //
  // sort first
  function sortRoutesFirst(unsortedChildren: ReactElement<RouteProps>[]) {
    unsortedChildren.sort((a, b) => {
      const aHasColon = a.props.path.includes(":");
      const bHasColon = b.props.path.includes(":");

      const aHasWildcard = a.props.path.includes("*");
      const bHasWildcard = b.props.path.includes("*");

      // If either of the paths contains '*', prioritize that path to be last
      if (aHasWildcard && !bHasWildcard) {
        return 1; // a comes after b
      }
      if (!aHasWildcard && bHasWildcard) {
        return -1; // b comes after a
      }

      // Otherwise, if both have or don't have ':', they stay in the same order
      return aHasColon === bHasColon ? 0 : aHasColon ? 1 : -1;
    });
  }
  // sort first

  function processRoutes(
    children: ReactNode,
    cacheEnabled: boolean,
    parentPath = "",
    parentFullPath: string | null = null
  ): RouteEntry[] {
    //
    const elements = Children.toArray(children).filter(
      (child): child is ReactElement<RouteProps> =>
        React.isValidElement<RouteProps>(child) &&
        typeof child.type !== "string" &&
        child.type === Route // Compare component type directly
    );

    if (elements.length !== Children.toArray(children).length) {
      throw new Error(
        "Unsupported child detected. Ensure all children are Route components."
      );
    }

    sortRoutesFirst(elements);

    const routes: RouteEntry[] = [];

    elements.forEach((child) => {
      const childPath = child.props.path.startsWith("/")
        ? child.props.path
        : `/${child.props.path}`;
      const fullPath = `${parentPath}${childPath}`.replace(/\/+/g, "/");

      const route: RouteEntry = {
        fullPath,
        partialPath: childPath,
        element: child.props.element,
        prefetch: child.props.prefetch,
        action: child.props.action,
        isVisited: false,
        parent: parentFullPath,
        index: !!child.props.index,
        isActive: false,
        componentID: nanoid(8),
        children: [],
        cacheEnabled,
        classList: child.props.classList ?? "",
      };

      if (child.props.children) {
        route.children = processRoutes(
          child.props.children,
          cacheEnabled,
          fullPath,
          fullPath
        );
      }

      routes.push(route);
    });
    return routes;
  }

  return processRoutes(children, cacheEnabled, parentPath, parentFullPath);
}
