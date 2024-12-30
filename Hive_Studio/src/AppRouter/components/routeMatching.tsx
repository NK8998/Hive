import NotFound from "./404/NotFound";

interface MatchResult {
  route: any;
  params: { [key: string]: string };
}

const checkPath = (fullPath) => {
  const isStatic = !fullPath.includes(":");
  const hasOptionalSegments = fullPath.includes("?");

  return { isStatic, hasOptionalSegments };
};

const resetCurrentRoute = (routes) => {
  for (const route of routes) {
    route.isActive = false;

    if (route.children.length > 0) {
      resetCurrentRoute(route.children);
    }
  }
};

export const matchRoute = (routes, urlPath, currentRoute) => {
  if (currentRoute) {
    resetCurrentRoute(currentRoute);
  }
  let normalizedUrlPath = urlPath.replace(/\/$/, "");
  let topLevelParent = null;
  let foundRoute = false;
  let params = {};

  const looper = (routes, urlPath, nested = false) => {
    for (const route of routes) {
      // conditions for when a topLevelParent exists
      if (foundRoute) break;
      if (!nested) topLevelParent = route;

      // reinitializing
      foundRoute = false;
      params = {};
      route.isActive = false;
      route.isVisited = true;

      const { fullPath, children, partialPath } = route;

      const { isStatic, hasOptionalSegments } = checkPath(fullPath);

      if (isStatic) {
        let usablePath = normalizedUrlPath.replaceAll("/", "");
        const normalizedFullPath = fullPath.replaceAll("/", "");
        const normalizedPartialPath = partialPath.replaceAll("/", "");

        if (usablePath.includes(normalizedPartialPath)) {
          route.isActive = true;
          route.isVisited = true;
        } else {
          route.isActive = false;
        }

        if (normalizedFullPath === usablePath) {
          // set the property of isActive to the child with index true
          const indexChild = children.find((child) => child.index);
          if (indexChild) {
            indexChild.isVisited = true;
            indexChild.isActive = true;
          }
          foundRoute = true;

          break;
        }

        if (children.length > 0) {
          looper(children, urlPath, true);
        }
      } else if (!isStatic) {
        const fullPathSegments = fullPath.split("/").filter(Boolean); // Remove empty segments
        const urlPathSegments = normalizedUrlPath.split("/").filter(Boolean);
        // check to see if static parts match exactly

        let staticSegmentsMatch = true; // Rename to reflect intention
        for (let i = 0; i < fullPathSegments.length; i++) {
          if (fullPathSegments[i].includes(":")) {
            // Extract dynamic segment and add to params
            const paramName = fullPathSegments[i].split(":")[1];
            params[paramName] = urlPathSegments[i];
          } else {
            if (fullPathSegments[i] !== urlPathSegments[i]) {
              staticSegmentsMatch = false; // Track if any static segment doesn't match
            }
          }
        }

        if (fullPathSegments.length < urlPathSegments.length) {
          // making sure all the parents are matched
          route.isActive = true;
          route.isVisited = true;
        }

        if (fullPathSegments.length === urlPathSegments.length && staticSegmentsMatch) {
          route.isActive = true;
          const indexChild = children.find((child) => child.index);
          if (indexChild) {
            indexChild.isActive = true;
            indexChild.isVisited = true;
          }
          foundRoute = true;
          break;
        }

        // if route doesn't match from the above condition the check children
        if (children.length > 0) {
          looper(children, urlPath, true);
        }
      }
    }
    const route = topLevelParent.isActive ? topLevelParent : null;
    return { route, params };
  };

  const result = looper(routes, urlPath);
  return { route: result.route, params: result.params };
};
