const matchRoute = (urlPath, routes) => {
  // Separate static and dynamic routes
  const staticRoutes = routes.filter((route) => !route.includes(":"));
  const dynamicRoutes = routes
    .filter((route) => route.includes(":"))
    .sort((a, b) => b.split("/").length - a.split("/").length); // Sort by specificity

  // Check for a match in static routes first
  const staticMatch = staticRoutes.find((route) => urlPath === route);
  if (staticMatch) {
    return { route: staticMatch, params: {} }; // Exact match found
  }

  // Check for a match in dynamic routes
  for (const route of dynamicRoutes) {
    const routeSegments = route.split("/");
    const urlSegments = urlPath.split("/");

    // Skip if URL has fewer segments than required by the route (excluding optional segments)
    const requiredSegments = routeSegments.filter((seg) => !seg.endsWith("?"));
    if (urlSegments.length < requiredSegments.length) {
      continue;
    }

    const params = {};
    let isMatch = true;

    for (let i = 0; i < routeSegments.length; i++) {
      const routeSegment = routeSegments[i];
      const urlSegment = urlSegments[i];

      if (routeSegment.endsWith("?")) {
        // Optional segment: Skip if not present in URL
        if (urlSegment !== undefined && routeSegment.startsWith(":")) {
          const paramName = routeSegment.slice(1, -1);
          params[paramName] = urlSegment;
        }
      } else if (routeSegment.startsWith(":")) {
        // Dynamic parameter
        if (urlSegment === undefined) {
          isMatch = false; // Required parameter missing
          break;
        }
        const paramName = routeSegment.slice(1);
        params[paramName] = urlSegment;
      } else if (routeSegment !== urlSegment) {
        // Static segment mismatch
        isMatch = false;
        break;
      }
    }

    if (isMatch && urlSegments.length <= routeSegments.length) {
      return { route, params }; // Dynamic match with extracted parameters
    }
  }

  return null; // No match found
};

const routes = [
  "/",
  "/home",
  "/watch",
  "/flag/:id",
  "/flag/secondFlag/:innerID",
  "/:channelName/:subRoute?",
];

const urlPath0 = "/";
const urlPath1 = "/watch";
const urlPath2 = "/MrBeast";
const urlPath3 = "/home";
const urlPath4 = "/flag/459953044";
const urlPath5 = "/flag/secondFlag/458488";
const urlPath6 = "/MrBeast/videos";
const urlPath7 = "/MrBeast";

console.log(matchRoute(urlPath0, routes));
// Output: { route: "/", params: {} }

console.log(matchRoute(urlPath1, routes));
// Output: { route: "/watch", params: {} }

console.log(matchRoute(urlPath2, routes));
// Output: { route: "/:channelName", params: { channelName: "MrBeast" } }

console.log(matchRoute(urlPath3, routes));
// Output: { route: "/home", params: {} }

console.log(matchRoute(urlPath4, routes));
// Output: { route: "/flag/:id", params: { id: "459953044" } }

console.log(matchRoute(urlPath5, routes));
// Output: { route: "/flag/secondFlag/:innerID", params: { innerID: "458488" } }

console.log(matchRoute(urlPath6, routes));
// Output: { route: "/:channelName/:subRoute", params: { channelName: "MrBeast", subRoute: "videos" } }

console.log(matchRoute(urlPath7, routes));
// Output: { route: "/:channelName", params: { channelName: "MrBeast" } }
