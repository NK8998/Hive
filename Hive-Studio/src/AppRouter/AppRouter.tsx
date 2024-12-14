import { ReactNode, useEffect, useRef, useState } from "react";
import Route, { RouteProps } from "./components/Route";
import { matchRoute } from "./components/routeMatching";
import { useBrowserContext, useLocation } from "./components/Provider";

// Define the type for the children of AppRouterProps
interface AppRouterProps {
  children: ReactNode[] & { props: RouteProps }[];
  cacheEnabled: boolean;
}

export default function AppRouter({ children, cacheEnabled = false }: AppRouterProps) {
  const { pathname, key } = useLocation(); // Get current location path
  const prevKey = useRef<string>();
  const [visitedRoutes, setVisitedRoutes] = useState<{ props: RouteProps }[]>([]);
  const [currentRoute, setCurrentRoute] = useState<{ props: RouteProps }>();
  const [error, setError] = useState(false);
  const { setParams } = useBrowserContext();

  const handleDataFetching = async (action: (...args: any) => Promise<void>) => {
    await action();
  };

  useEffect(() => {
    prevKey.current = key; // To prevent route mismatches
    const { route, params } = matchRoute(pathname, children); // Match the route based on the current path
    setParams(params);
    // Call the data fetching function if the route has an action
    if (route.props.action) {
      handleDataFetching(route.props.action) // Pass the route action here
        .then(() => {
          if (prevKey.current !== key) return;
          setCurrentRoute(route);
          setVisitedRoutes((prevRoutes) => {
            if (!prevRoutes.some((r) => r.props.path === route.props.path)) {
              return [...prevRoutes, route]; // Add the route to the list if it's not already present
            }
            return prevRoutes; // Return the previous routes if the route already exists
          });
        })
        .catch((err) => {
          console.error("Something went wrong", err);
          setError(true);
        });
    } else {
      setCurrentRoute(route);
      setVisitedRoutes((prevRoutes) => {
        if (!prevRoutes.some((r) => r.props.path === route.props.path)) {
          return [...prevRoutes, route]; // Add the route to the list if it's not already present
        }
        return prevRoutes; // Return the previous routes if the route already exists
      });
    }
  }, [pathname]); // Re-run when pathname changes

  if (!currentRoute) return null;

  // Conditionally render routes based on cacheEnabled
  if (cacheEnabled) {
    // If caching is enabled, render all visited routes with isHidden toggle
    const routesToRender = visitedRoutes.map((r) => {
      if (r.props.path === currentRoute.props.path) {
        return <Route key={r.props.path} {...r.props} isHidden={false} />; // Show the current route
      } else {
        return <Route key={r.props.path} {...r.props} isHidden={true} />; // Hide non-matching routes
      }
    });

    return <>{routesToRender}</>;
  } else {
    // If caching is disabled, only render the matched route with isHidden set to false
    return <Route key={currentRoute.props.path} {...currentRoute.props} isHidden={false} />;
  }
}
