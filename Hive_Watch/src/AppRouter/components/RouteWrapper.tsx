import { JSX } from "react";
import { RouteEntry } from "./generateRouteLookup";
import { ComponentProvider } from "./Provider";
import Route from "./Route";

export default function routeWrapper(children: RouteEntry[]): JSX.Element[] {
  const wrapWithProvider = (children: RouteEntry[]) => {
    return children.map((child) => {
      // Check if the child is a Route component
      // Get the children of this Route
      const routeChildren = child.children;
      // Recursively wrap the children of this route
      const wrappedChildren = wrapWithProvider(routeChildren);

      return (
        <ComponentProvider
          _routeChildren={wrappedChildren}
          key={child.componentID}
          _isHidden={child.isActive}
        >
          <Route
            {...(child as any)}
            path={child.partialPath}
            element={child.element}
          />
        </ComponentProvider>
      );
    });
  };

  const wrappedRoutes = wrapWithProvider(children);

  return wrappedRoutes;
}
