import { Children } from "react";
import { ComponentProvider } from "./Provider";
import Route from "./Route";

export default function routeWrapper(children) {
  const wrapWithProvider = (children, parentPath = "") => {
    return Children.map(children, (child, i) => {
      // Check if the child is a Route component
      if (child.type && child.type.name === "Route") {
        // Construct the full path for the current route
        const fullPath = `${parentPath}${child.props.path.startsWith("/") ? "" : "/"}${
          child.props.path
        }`;

        // Get the children of this Route
        const routeChildren = Children.toArray(child.props.children);

        // Recursively wrap the children of this route
        const wrappedChildren = wrapWithProvider(routeChildren, fullPath);

        // Wrap the Route component in a ComponentProvider
        return (
          <ComponentProvider initialValue={wrappedChildren}>
            <Route {...child.props} path={fullPath} element={child.props.element}>
              {wrappedChildren}
            </Route>
          </ComponentProvider>
        );
      }

      // If it's not a Route, throw an error
      throw new Error("Unsupported child type");
    });
  };

  return wrapWithProvider(children);
}
