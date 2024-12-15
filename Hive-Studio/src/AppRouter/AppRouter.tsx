import { Children, ReactNode, useEffect, useRef, useState } from "react";
import Route, { RouteProps } from "./components/Route";
import { matchRoute } from "./components/routeMatching";
import { useBrowserContext, useLocation } from "./components/Provider";
import routeWrapper from "./components/RouteWrapper";
import { generateRouteLookup } from "./components/utility";

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

  const routeLookup = generateRouteLookup(Children.toArray(children));

  const handleDataFetching = async (action: (...args: any) => Promise<void>) => {
    await action();
  };

  useEffect(() => {
    prevKey.current = key; // To prevent route mismatches
    const wrappedRoutes = routeWrapper(children, pathname);

    const { route, params } = matchRoute(pathname, wrappedRoutes);
    // Make use of the routeLookUp Array only!
    // search through route array  and retrieve the route alongside the child that matches the route
    // Next wrap those in context provider then return them.

    setParams(params);
    // Call the data fetching function if the route has an action
    if (route.props.action) {
      handleDataFetching(route.props.action) // Pass the route action here
        .then(() => {
          if (prevKey.current !== key) return;
          setCurrentRoute(route);
          setVisitedRoutes((prevRoutes) => {
            if (
              !prevRoutes.some(
                (r) => r.props.children.props.path === route.props.children.props.path
              )
            ) {
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
        if (
          !prevRoutes.some((r) => r.props.children.props.path === route.props.children.props.path)
        ) {
          return [...prevRoutes, route]; // Add the route to the list if it's not already present
        }
        return prevRoutes; // Return the previous routes if the route already exists
      });
    }
  }, [pathname]); // Re-run when pathname changes

  return visitedRoutes;
}

// export default function AppRouter({ children }) {
//   const { pathname, key } = useLocation(); // Get current location path
//   const [visitedRoutes, setVisitedRoutes] = useState([]);
//   const [currentRoute, setCurrentRoute] = useState();

//   // const routes = wrappedRoutes.props.children.map((child) => {
//   //   return child.props.children;
//   // });
//   useEffect(() => {
//     const wrappedRoutes = routeWrapper(children);

//     const { route, params } = matchRoute(pathname, wrappedRoutes);

//     setCurrentRoute(route);
//     setVisitedRoutes((prevRoutes) => {
//       if (
//         !prevRoutes.some((r) => r.props.children.props.path === route.props.children.props.path)
//       ) {
//         return [...prevRoutes, route]; // Add the route to the list if it's not already present
//       }
//       return prevRoutes; // Return the previous routes if the route already exists
//     });
//   }, [pathname]);

//   return <>{visitedRoutes}</>;
// }
