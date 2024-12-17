// const matchRoute = (urlPath, routes) => {
//   // Separate static and dynamic routes
//   const staticRoutes = routes.filter((route) => !route.includes(":"));
//   const dynamicRoutes = routes
//     .filter((route) => route.includes(":"))
//     .sort((a, b) => b.split("/").length - a.split("/").length); // Sort by specificity

//   // Check for a match in static routes first
//   const staticMatch = staticRoutes.find((route) => urlPath === route);
//   if (staticMatch) {
//     return { route: staticMatch, params: {} }; // Exact match found
//   }

//   // Check for a match in dynamic routes
//   for (const route of dynamicRoutes) {
//     const routeSegments = route.split("/");
//     const urlSegments = urlPath.split("/");

//     // Skip if URL has fewer segments than required by the route (excluding optional segments)
//     const requiredSegments = routeSegments.filter((seg) => !seg.endsWith("?"));
//     if (urlSegments.length < requiredSegments.length) {
//       continue;
//     }

//     const params = {};
//     let isMatch = true;

//     for (let i = 0; i < routeSegments.length; i++) {
//       const routeSegment = routeSegments[i];
//       const urlSegment = urlSegments[i];

//       if (routeSegment.endsWith("?")) {
//         // Optional segment: Skip if not present in URL
//         if (urlSegment !== undefined && routeSegment.startsWith(":")) {
//           const paramName = routeSegment.slice(1, -1);
//           params[paramName] = urlSegment;
//         }
//       } else if (routeSegment.startsWith(":")) {
//         // Dynamic parameter
//         if (urlSegment === undefined) {
//           isMatch = false; // Required parameter missing
//           break;
//         }
//         const paramName = routeSegment.slice(1);
//         params[paramName] = urlSegment;
//       } else if (routeSegment !== urlSegment) {
//         // Static segment mismatch
//         isMatch = false;
//         break;
//       }
//     }

//     if (isMatch && urlSegments.length <= routeSegments.length) {
//       return { route, params }; // Dynamic match with extracted parameters
//     }
//   }

//   return null; // No match found
// };

// const routes = ["/", "/home", "/watch", "/flag/:id", "/flag/secondFlag/:innerID", "/:channelName"];

// const urlPath0 = "/";
// const urlPath1 = "/watch";
// const urlPath2 = "/MrBeast";
// const urlPath3 = "/home";
// const urlPath4 = "/flag/459953044";
// const urlPath5 = "/flag/secondFlag/458488";
// const urlPath6 = "/MrBeast/videos";
// const urlPath7 = "/MrBeast";

// console.log(matchRoute(urlPath0, routes));
// // Output: { route: "/", params: {} }

// console.log(matchRoute(urlPath1, routes));
// // Output: { route: "/watch", params: {} }

// console.log(matchRoute(urlPath2, routes));
// // Output: { route: "/:channelName", params: { channelName: "MrBeast" } }

// console.log(matchRoute(urlPath3, routes));
// // Output: { route: "/home", params: {} }

// console.log(matchRoute(urlPath4, routes));
// // Output: { route: "/flag/:id", params: { id: "459953044" } }

// console.log(matchRoute(urlPath5, routes));
// // Output: { route: "/flag/secondFlag/:innerID", params: { innerID: "458488" } }

// console.log(matchRoute(urlPath6, routes));
// // Output: { route: "/:channelName/:subRoute", params: { channelName: "MrBeast", subRoute: "videos" } }

// console.log(matchRoute(urlPath7, routes));
// // Output: { route: "/:channelName", params: { channelName: "MrBeast" } }

const matchRoute = (urlPath, routes, parent = null) => {
  const staticRoutes = routes.filter((route) => !route.fullPath.includes(":"));
  const dynamicRoutes = routes.filter((route) => route.fullPath.includes(":"));

  // Helper function to match routes
  const matchRoutes = (urlPath, routes, parentChain) => {
    let indexRoute = null;

    for (const route of routes) {
      const params = {};

      // Split the URL and route paths into segments
      const urlSegments = urlPath.split("/").filter(Boolean);
      const routeSegments = route.fullPath.split("/").filter(Boolean);

      // Check if the number of segments matches
      if (urlSegments.length === routeSegments.length) {
        let isMatch = true;

        // Compare each segment
        for (let i = 0; i < routeSegments.length; i++) {
          const routeSegment = routeSegments[i];
          const urlSegment = urlSegments[i];

          if (routeSegment.startsWith(":")) {
            // Dynamic segment: Extract parameter value
            const paramName = routeSegment.slice(1);
            params[paramName] = urlSegment;
          } else if (routeSegment !== urlSegment) {
            // Static segment: Must match exactly
            isMatch = false;
            break;
          }
        }

        if (isMatch) {
          // Mark the route as active
          route.isActive = true;

          // Check for child routes
          if (route.children && route.children.length > 0) {
            let childMatched = false;

            for (const childRoute of route.children) {
              const childSegments = childRoute.fullPath.split("/").filter(Boolean);

              // Check if the child route matches the remaining segments
              if (urlSegments.length > routeSegments.length) {
                let isChildMatch = true;
                for (let j = 0; j < childSegments.length; j++) {
                  const childSegment = childSegments[j];
                  const urlSegment = urlSegments[routeSegments.length + j];

                  if (childSegment.startsWith(":")) {
                    // Dynamic segment: Just ensure the position exists
                    if (!urlSegment) {
                      isChildMatch = false;
                      break;
                    }
                  } else if (childSegment !== urlSegment) {
                    // Static segment: Must match exactly
                    isChildMatch = false;
                    break;
                  }
                }

                if (isChildMatch) {
                  childRoute.isActive = true; // Mark the child route as active
                  childMatched = true;
                  break; // Stop checking other children if one matches
                }
              }
            }

            // If no child matches, check if there's an index route and mark it as active
            if (!childMatched) {
              const indexChildRoute = route.children.find((child) => child.index);
              if (indexChildRoute) {
                indexChildRoute.isActive = true; // Mark the index child route as active
              }
            }
          }

          // Return the matched route with params and the full parent chain
          return { params, parent: [...(parentChain || []), route] };
        }
      }

      // Store index route if present
      if (route.index) {
        indexRoute = route;
      }

      // Recurse into child routes if they exist
      if (route.children && route.children.length > 0) {
        const match = matchRoutes(urlPath, route.children, [...(parentChain || []), route]);
        if (match) {
          return match; // Return the matched child route with the full parent chain
        }
      }
    }

    // If no match found but an index route exists, return the index route with the parent chain
    if (indexRoute) {
      return { params: {}, parent: [...(parentChain || []), indexRoute] };
    }

    // If no match found and no index route, return null
    return null;
  };

  // First check static routes
  const staticMatch = matchRoutes(urlPath, staticRoutes, parent);
  if (staticMatch) {
    return staticMatch; // Return if a static route matched
  }

  // Then check dynamic routes
  return matchRoutes(urlPath, dynamicRoutes, parent);
};

// Example usage
const routes = [
  {
    fullPath: "/home",
    partialUrl: "/home",
    isActive: false,
    index: false,
    children: [],
  },
  {
    fullPath: "/games/:gameId",
    partialUrl: "/games/:gameId",
    isActive: false,
    index: false,
    children: [
      {
        fullPath: "/games/:gameId/players",
        partialUrl: "players",
        isActive: false,
        index: true,
        children: [],
      },
      {
        fullPath: "/games/:gameId/teams",
        partialUrl: "teams",
        isActive: false,
        index: false,
        children: [],
      },
    ],
  },
  {
    fullPath: "/channels/:channelName",
    partialUrl: "/channels/:channelName",
    index: false,
    isActive: false,
    children: [
      {
        fullPath: "/channels/:channelName/details",
        partialUrl: "details",
        index: true,
        isActive: false,
        children: [],
      },
      {
        fullPath: "/channels/:channelName/settings",
        partialUrl: "settings",
        index: false,
        isActive: false,
        children: [
          {
            fullPath: "/channels/:channelName/settings/account",
            partialUrl: "account",
            index: false,
            isActive: false,
            children: [],
          },
          {
            fullPath: "/channels/:channelName/settings/:profile",
            partialUrl: ":profile",
            index: true,
            isActive: false,
            children: [],
          },
        ],
      },
    ],
  },
  {
    fullPath: "/work/about",
    partialUrl: "/work/about",
    index: false,
    isActive: false,
    children: [
      {
        fullPath: "/work/about/team",
        partialUrl: "team",
        index: true,
        isActive: false,
        children: [],
      },
      {
        fullPath: "/work/about/code",
        partialUrl: "code",
        index: false,
        isActive: false,
        children: [
          {
            fullPath: "/work/about/code/commit",
            partialUrl: "commit",
            index: true,
            isActive: false,
            children: [],
          },
        ],
      },
    ],
  },
];

const checkPath = (fullPath) => {
  const isStatic = !fullPath.includes(":");
  const hasOptionalSegments = fullPath.includes("?");

  return { isStatic, hasOptionalSegments };
};

let topLevelParent = null;
let foundRoute = false;
let params = {};

const matchRoutes = (routes, urlPath, nested = false) => {
  let normalizedUrlPath = urlPath.replace(/\/$/, "");

  for (const route of routes) {
    if (foundRoute) break;
    params = {};

    const { fullPath, children, partialUrl } = route;
    if (!nested) topLevelParent = route;
    foundRoute = false;

    const { isStatic, hasOptionalSegments } = checkPath(fullPath);

    if (isStatic) {
      let usablePath = normalizedUrlPath.replaceAll("/", "");
      const normalizedFullPath = fullPath.replaceAll("/", "");
      const normalizedPartialUrl = partialUrl.replaceAll("/", "");

      if (usablePath.includes(normalizedPartialUrl)) {
        route.isActive = true;
      }

      if (normalizedFullPath === usablePath) {
        // set the property of isActive to the child with index true
        const indexChild = children.find((child) => child.index);
        if (indexChild) {
          indexChild.isActive = true;
        }
        foundRoute = true;
        break;
      }

      if (children.length > 0) {
        matchRoutes(children, urlPath, true);
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
      }

      if (fullPathSegments.length === urlPathSegments.length && staticSegmentsMatch) {
        route.isActive = true;
        const indexChild = children.find((child) => child.index);
        if (indexChild) {
          indexChild.isActive = true;
        }
        foundRoute = true;
        break;
      }
      // if route doesn't match from the above condition the check children
      if (children.length > 0) {
        matchRoutes(children, urlPath, true);
      }
    }
  }
  const route = topLevelParent.isActive ? topLevelParent : null;

  return { route, params };
};

const urlPath = "/work/about";

console.log(JSON.stringify(matchRoutes(routes, urlPath), null, 2));
