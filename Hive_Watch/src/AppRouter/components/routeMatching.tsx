import { RouteEntry } from "./generateRouteLookup";
import { replaceDynamicParts } from "./utility";

// Define the structure for the result of the route matching
interface MatchResult {
  route: RouteEntry | null;
  params: { [key: string]: string };
}

export const matchRoute = (
  routes: RouteEntry[], // List of all route entries
  urlPath: string // URL path to be matched
): MatchResult => {
  const normalizedUrlPath =
    urlPath === "/" ? urlPath : urlPath.replace(/\/$/, "");
  let currentTopLevelParent: RouteEntry | null = null;
  let foundRoute: RouteEntry | null = null;
  let params: { [key: string]: string } = {};
  let indexChildId = "";

  // Main loop to check each route
  const looper = (routes: RouteEntry[], urlPath: string, nested = false) => {
    for (const route of routes) {
      const { fullPath, children, partialPath } = route;

      if (!nested) currentTopLevelParent = route;

      if (route.componentID !== indexChildId) {
        // doing this to reset the current route visibility first
        route.isActive = false;
      }

      const { replacedUrl, urlParams } = replaceDynamicParts(
        fullPath,
        normalizedUrlPath,
        params
      );

      // if no route matches then 404 page displayed and is always last in the array of routes
      if (
        (normalizedUrlPath === replacedUrl || partialPath === "/*") &&
        !foundRoute
      ) {
        route.isActive = true;
        route.isVisited = true;
        foundRoute = currentTopLevelParent;
        const indexChild = children.find((child) => child.index);
        if (indexChild) {
          // doing this so index child isn't reset to inactive
          indexChildId = indexChild.componentID;

          indexChild.isActive = true;
          indexChild.isVisited = true;
        }
        params = urlParams;
      }
      if (children.length > 0 && urlPath.includes(replacedUrl)) {
        if (!foundRoute) {
          // to ensure all routes in the hierachy till the current route are active
          route.isActive = true;
          route.isVisited = true;
        }
        looper(children, urlPath, true);
      }
    }

    let route = foundRoute ? foundRoute : currentTopLevelParent;

    return { route, params };
  };

  // Call the looper function with initial routes and URL
  const result = looper(routes, urlPath);
  return { route: result.route, params: result.params };
};
