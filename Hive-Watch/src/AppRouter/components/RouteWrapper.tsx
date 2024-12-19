import { JSX } from "react";
import { RouteEntry } from "./generateRouteLookup";
import { ComponentProvider } from "./Provider";
import Route from "./Route";

export default function routeWrapper(
  children: RouteEntry[]
): JSX.Element[] {
  const wrapWithProvider = (children: RouteEntry[]) => {
    return children.map((child, i) => {
      // Check if the child is a Route component
      // Get the children of this Route
      const routeChildren = child.children;
      // Recursively wrap the children of this route
      const wrappedChildren =
        wrapWithProvider(routeChildren);

      return (
        <ComponentProvider
          initialValue={wrappedChildren}
          key={child.componentID}
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

  return wrapWithProvider(children);
}
