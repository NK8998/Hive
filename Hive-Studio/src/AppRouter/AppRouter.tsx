import { ReactNode, useEffect, useRef, useState } from "react";
import { RouteProps } from "./components/Route";
import { matchRoute } from "./components/routeMatching";
import { useBrowserContext, useLocation } from "./components/Provider";
import routeWrapper from "./components/RouteWrapper";
import { generateRouteLookup } from "./components/utility";
// Define the type for the children of AppRouterProps
interface AppRouterProps {
  children: ReactNode[] & { props: RouteProps }[];
  cacheEnabled?: boolean;
}

export default function AppRouter({ children, cacheEnabled = false }: AppRouterProps) {
  const { pathname, key } = useLocation(); // Get current location path
  const [routeLookup, setRouteLookUp] = useState([]);
  const [currentRoute, setCurrentRoute] = useState([]); // Track routes for caching
  const [wrappedRoutes, setWrappedRoutes] = useState([]);
  const prevKey = useRef<string>(null);
  const { setParams } = useBrowserContext();

  // Generate route lookup on initial render
  useEffect(() => {
    const routes = generateRouteLookup(children, cacheEnabled);
    setRouteLookUp(routes);
  }, []);

  const fetchData = async (action: (...args: any[]) => Promise<void>) => {
    await action();
  };

  const updateUI = (params: any, route: any) => {
    if (key !== prevKey.current) return;

    if (cacheEnabled) {
      // Add route to currentRoute, replacing an existing route if the componentID matches
      setCurrentRoute((prevRoutes) => {
        // Find if the route with the same componentID already exists
        const routeIndex = prevRoutes.findIndex((r) => r.componentID === route.componentID);

        // If the route already exists, replace it
        const updatedRoutes = [...prevRoutes];

        if (routeIndex !== -1) {
          // Replace the existing route with the new one
          updatedRoutes[routeIndex] = route;
        } else {
          // If the route doesn't exist, add it to the array
          updatedRoutes.push(route);
        }

        // Set isVisited to false for all routes except the current one
        const updatedRoutesWithVisitedStatus = updatedRoutes.map((r) => ({
          ...r,
          isActive: r.componentID === route.componentID ? true : false,
        }));

        return updatedRoutesWithVisitedStatus;
      });
    } else {
      setCurrentRoute([route]);
    }

    setParams(params);
  };

  const matchRoutes = () => {
    if (!routeLookup.length) return;
    // Pass a deep clone to matchRoute
    const { route, params } = matchRoute(routeLookup, pathname, currentRoute);

    if (route.action) {
      fetchData(route.action).then(() => {
        updateUI(params, route);
      });
    } else {
      updateUI(params, route);
    }
  };

  useEffect(() => {
    const routesWithProvider = routeWrapper(currentRoute);
    setWrappedRoutes(routesWithProvider);
  }, [currentRoute]); // Re-wrap the routes when currentRoute changes

  // Trigger route matching on routeLookup or pathname change
  useEffect(() => {
    prevKey.current = key;
    matchRoutes();
  }, [pathname, routeLookup]); // Ensure currentRoute is a dependency

  if (routeLookup.length === 0) return null;

  return wrappedRoutes;
}
