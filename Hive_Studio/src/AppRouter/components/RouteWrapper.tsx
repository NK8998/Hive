import { Children } from "react";
import { ComponentProvider, useLocation } from "./Provider";
import Route from "./Route";

export default function routeWrapper(children) {
  const wrapWithProvider = (children) => {
    return children.map((child, i) => {
      // Check if the child is a Route component
      // Get the children of this Route
      const routeChildren = child.children;
      // Recursively wrap the children of this route
      const wrappedChildren = wrapWithProvider(routeChildren);

      return (
        <ComponentProvider initialValue={wrappedChildren} key={child.componentID}>
          <Route {...child} />
        </ComponentProvider>
      );
    });
  };

  return wrapWithProvider(children);
}
