import NotFound from "./404/NotFound";
import { RouteProps } from "./Route";

interface MatchResult {
  route: { props: RouteProps }; // Route that matched the URL
  params: { [key: string]: string }; // Parameters extracted from the dynamic route
}

export const matchRoute = (urlPath: string, routes: { props: RouteProps }[]): MatchResult => {
  // Separate static and dynamic routes
  const staticRoutes = routes.filter((route) => !route.props.path.includes(":"));
  const dynamicRoutes = routes
    .filter((route) => route.props.path.includes(":"))
    .sort((a, b) => b.props.path.split("/").length - a.props.path.split("/").length); // Sort by specificity

  // Check for a match in static routes first
  const staticMatch = staticRoutes.find((route) => urlPath === route.props.path);
  if (staticMatch) {
    return { route: staticMatch, params: {} }; // Exact match found
  }

  // Check for a match in dynamic routes
  for (const route of dynamicRoutes) {
    const routeSegments = route.props.path.split("/");
    const urlSegments = urlPath.split("/");

    // Skip if URL has fewer segments than required by the route (excluding optional segments)
    const requiredSegments = routeSegments.filter((seg) => !seg.endsWith("?"));
    if (urlSegments.length < requiredSegments.length) {
      continue;
    }

    const params: { [key: string]: string } = {}; // Define params type explicitly
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

  return { route: { props: { component: <NotFound />, path: "*" } }, params: {} }; // No match found // No match found
};

// const matchRoute = (urlPath: string, routes: { props: RouteProps }[]): MatchResult => {
//   // Separate static and dynamic routes
//   const staticRoutes = routes.filter((route) => !route.props.path.includes(":"));
//   const dynamicRoutes = routes.filter((route) => route.props.path.includes(":"));

//   // Check for a match in static routes first
//   const staticMatch = staticRoutes.find((route) => urlPath === route.props.path);
//   if (staticMatch) {
//     return { route: staticMatch, params: {} }; // Exact match found
//   }

//   // Check for a match in dynamic routes
//   for (const route of dynamicRoutes) {
//     const routeSegments = route.props.path.split("/");
//     const urlSegments = urlPath.split("/");

//     if (routeSegments.length !== urlSegments.length) {
//       continue; // Skip if the segment counts don't match
//     }

//     const params: { [key: string]: string } = {}; // Define params type explicitly
//     let isMatch = true;

//     for (let i = 0; i < routeSegments.length; i++) {
//       if (routeSegments[i].startsWith(":")) {
//         const paramName = routeSegments[i].slice(1);
//         params[paramName] = urlSegments[i]; // Assign the value to the correct param
//       } else if (routeSegments[i] !== urlSegments[i]) {
//         isMatch = false;
//         break;
//       }
//     }

//     if (isMatch) {
//       return { route, params }; // Dynamic match with extracted parameters
//     }
//   }

//   return { route: { props: { component: <NotFound />, path: "*" } }, params: {} }; // No match found
// };
