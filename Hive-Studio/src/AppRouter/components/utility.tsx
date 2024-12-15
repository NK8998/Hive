import { Children, ReactNode } from "react";

interface RouteLookup {
  [key: string]: {
    element: React.ReactNode;
    prefetch?: boolean;
    action?: Function;
  };
}

export function generateRouteLookup(children: ReactNode[], parentPath = ""): RouteLookup {
  const routes: RouteLookup = {};

  Children.forEach(children, (child) => {
    if (child.type && child.type.name === "Route") {
      // Construct the full path
      const childPath = child.props.path.startsWith("/")
        ? child.props.path
        : `/${child.props.path}`;
      const fullPath = `${parentPath}${childPath}`.replace(/\/+/g, "/");

      // Add the current route to the lookup table
      routes[fullPath] = {
        element: child.props.element,
        prefetch: child.props.prefetch,
        action: child.props.action,
      };

      // Process child routes recursively
      if (child.props.children) {
        const childRoutes = generateRouteLookup(Children.toArray(child.props.children), fullPath);
        Object.assign(routes, childRoutes);
      }
    } else {
      throw new Error("Unsupported child type");
    }
  });

  return routes;
}
