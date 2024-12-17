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

// // Normalize the URL path (remove trailing slashes, normalize multiple slashes)
// const normalizePath = (path: string) => path.replace(/\/+$/, "").replace(/\/+/g, "/");

// urlPath = normalizePath(urlPath);

// const matchSingleRoute = (
//   remainingPath: string,
//   route: any,
//   parentParams: { [key: string]: string },
//   accumulatedPath: string
// ): MatchResult | null => {
//   // Normalize route paths
//   const routeFullPath = normalizePath(route.fullPath || "");
//   const routePartialPathPath = normalizePath(route.partialPathPath || "");
//   const effectivePath = normalizePath(accumulatedPath + routePartialPathPath);

//   const urlSegments = remainingPath.split("/");
//   const routeSegments = effectivePath.split("/");

//   if (urlSegments.length < routeSegments.length) {
//     return null; // URL has fewer segments than required
//   }

//   const params: { [key: string]: string } = { ...parentParams };
//   let isMatch = true;

//   // Match segments
//   for (let i = 0; i < routeSegments.length; i++) {
//     const routeSegment = routeSegments[i];
//     const urlSegment = urlSegments[i];

//     if (routeSegment.startsWith(":")) {
//       const paramName = routeSegment.slice(1);
//       params[paramName] = urlSegment;
//     } else if (routeSegment !== urlSegment) {
//       isMatch = false;
//       break;
//     }
//   }

//   if (!isMatch) {
//     return null;
//   }

//   // Check child routes if there's a match so far
//   const nextRemainingPath = normalizePath(remainingPath.slice(effectivePath.length));
//   if (route.children && route.children.length > 0 && nextRemainingPath) {
//     for (const child of route.children) {
//       const childMatch = matchSingleRoute(nextRemainingPath, child, params, effectivePath);
//       if (childMatch) {
//         return childMatch; // Match found in children
//       }
//     }
//   }

//   // Return the parent route match if no children match
//   return remainingPath === effectivePath || nextRemainingPath === "" ? { route, params } : null;
// };

// // Start matching from top-level routes
// for (const route of routes) {
//   const result = matchSingleRoute(urlPath, route, {}, "");
//   if (result) {
//     return result;
//   }
// }

// // No match found
// return {
//   route: { props: { element: <NotFound />, path: "*" } },
//   params: {},
// };
