import { nanoid } from "nanoid";
import { Children, ReactNode } from "react";

// Bring recursion into one synchronous function to prevent weird behaviour

interface RouteEntry {
  fullPath: string;
  partialPath: string;
  element: React.ReactNode;
  prefetch?: boolean;
  action?: Function;
  isVisited: boolean;
  parent: string | null;
  isActive: boolean;
  children?: RouteEntry[];
  componentID: string;
  index: boolean;
  cacheEnabled: boolean;
}

export function generateRouteLookup(
  children: ReactNode[],
  cacheEnabled: boolean,
  parentPath = "",
  parentFullPath: string | null = null
): RouteEntry[] {
  function processRoutes(
    children: ReactNode[],
    cacheEnabled: boolean,
    parentPath = "",
    parentFullPath: string | null = null
  ): RouteEntry[] {
    const routes: RouteEntry[] = [];

    Children.forEach(children, (child) => {
      if (child.type && child.type.name === "Route") {
        // Construct the full path
        const childPath = child.props.path.startsWith("/")
          ? child.props.path
          : `/${child.props.path}`;
        const fullPath = `${parentPath}${childPath}`.replace(/\/+/g, "/");

        // Create the current route entry
        const route: RouteEntry = {
          fullPath,
          partialPath: childPath,
          element: child.props.element,
          prefetch: child.props.prefetch,
          action: child.props.action,
          isVisited: false,
          parent: parentFullPath,
          index: child.props.index,
          isActive: false,
          componentID: nanoid(8),
          children: [],
          cacheEnabled,
        };

        // Recursively process child routes and assign them to the children property
        if (child.props.children) {
          route.children = processRoutes(
            Children.toArray(child.props.children),
            fullPath,
            fullPath,
            cacheEnabled
          );
        }

        // Add the route to the list
        routes.push(route);
      } else {
        throw new Error("Unsupported child type");
      }
    });

    // Sort routes such that those with ":" in partialPath come after those without
    routes.sort((a, b) => {
      const aHasColon = a.partialPath.includes(":");
      const bHasColon = b.partialPath.includes(":");
      return aHasColon === bHasColon ? 0 : aHasColon ? 1 : -1;
    });

    // Sort children of each route as well
    routes.forEach((route) => {
      if (route.children && route.children.length > 0) {
        route.children.sort((a, b) => {
          const aHasColon = a.partialPath.includes(":");
          const bHasColon = b.partialPath.includes(":");
          return aHasColon === bHasColon ? 0 : aHasColon ? 1 : -1;
        });
      }
    });

    return routes;
  }

  const routes = processRoutes(children, cacheEnabled, parentPath, parentFullPath);
  return routes;
}
