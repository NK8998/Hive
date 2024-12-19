import { RouteEntry } from "./generateRouteLookup";

// Define the structure for the result of the route matching
interface MatchResult {
  route: RouteEntry | null;
  params: { [key: string]: string };
}

// Helper function to check the properties of a given path
// const checkPath = (fullPath: string) => {
//   const isStatic = !fullPath.includes(":");
//   const hasOptionalSegments = fullPath.includes("?");

//   return { isStatic, hasOptionalSegments };
// };

// Function to reset the isActive state of routes (used for clearing previously matched routes)
const resetCurrentRoutes = (routes: RouteEntry[]) => {
  for (const route of routes) {
    route.isActive = false; // Reset isActive for each route

    // Recursively reset children routes if any
    if (route.children.length > 0) {
      resetCurrentRoutes(route.children);
    }
  }
};

const replaceDynamicParts = (
  firstString: string,
  secondString: string,
  params: { [key: string]: string }
) => {
  // Split both strings by '/' and filter out any empty segments
  const firstParts = firstString.split("/").filter(Boolean);
  const secondParts = secondString
    .split("/")
    .filter(Boolean);

  // Initialize resultString as an array to store the transformed parts
  let resultParts: string[] = [];

  // Index to track the second string (dynamic values)
  let secondPartIndex = 0;

  // Loop over firstParts and replace dynamic placeholders
  for (const part of firstParts) {
    // If this part contains a dynamic segment (i.e., starts with ':')
    if (part.startsWith(":")) {
      const paramName = part.slice(1); // Extract the parameter name from ":param"

      // Add to params object
      if (secondPartIndex < secondParts.length) {
        params[paramName] = secondParts[secondPartIndex];
      }

      // Replace the dynamic part with the corresponding value from secondParts
      resultParts.push(secondParts[secondPartIndex]);
    } else {
      // Otherwise, just add the static part as-is
      resultParts.push(part);
    }
    secondPartIndex++; // Move to the next value in secondParts
  }

  // Join the resultParts back into a string
  const resultString = "/" + resultParts.join("/");

  // Return the final transformed string
  return resultString;
};

// Main function to match routes based on the URL path
export const matchRoute = (
  routes: RouteEntry[], // List of all route entries
  urlPath: string, // URL path to be matched
  currentRoutes: RouteEntry[] // Current routes (used to reset isActive)
): MatchResult => {
  // resetting routes and variables before matching
  if (currentRoutes) {
    resetCurrentRoutes(currentRoutes); // Reset all current routes' states
  }

  // const normalizedUrlPath = urlPath.replace(/\/$/, ""); // Normalize the URL (remove trailing slash)
  let topLevelParent: RouteEntry | null = null; // Variable to track top-level parent route
  let foundRoute = false; // Flag to indicate if a route is found
  let params: { [key: string]: string } = {}; // To store dynamic route parameters

  // Main loop to check each route
  const looper = (
    routes: RouteEntry[], // List of route entries to iterate over
    urlPath: string, // The URL path to match
    nested = false // Flag to check if we are in a nested route
  ) => {
    for (const route of routes) {
      // Stop if route is already found
      if (foundRoute) break;

      // Set topLevelParent if not in a nested route
      if (!nested) topLevelParent = route;

      // Reinitializing values for each iteration
      foundRoute = false;
      params = {}; // Reset params for each route

      const { fullPath, children, partialPath } = route; // Destructure route properties

      const replacedUrl = replaceDynamicParts(
        fullPath,
        urlPath,
        params
      );
      if (urlPath === replacedUrl || partialPath === "/*") {
        route.isActive = true;
        route.isVisited = true;
        foundRoute = true;
        const childIndex = children.find(
          (child) => child.index
        );
        if (childIndex) {
          childIndex.isActive = true;
          childIndex.isVisited = true;
        }
        break;
      }
      if (
        children.length > 0 &&
        urlPath.includes(replacedUrl)
      ) {
        route.isActive = true;
        route.isVisited = true;
        looper(children, urlPath, true);
      } else {
        route.isActive = false;
      }
    }

    // Return the matched route (if any) and parameters
    let route = topLevelParent;

    return { route, params };
  };

  // Call the looper function with initial routes and URL
  const result = looper(routes, urlPath);
  return { route: result.route, params: result.params };
};
