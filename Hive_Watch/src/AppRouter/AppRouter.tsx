import {
  JSX,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { RouteProps } from "./components/Route";
import { matchRoute } from "./components/routeMatching";
import { useBrowserContext, useLocation } from "./components/Provider";
import routeWrapper from "./components/RouteWrapper";
import {
  generateRouteLookup,
  RouteEntry,
} from "./components/generateRouteLookup";
import ErrorComponent from "./components/Error/error";

interface AppRouterProps {
  children: ReactNode[] & { props: RouteProps }[];
  persist?: boolean;
}

export default function AppRouter({
  children,
  persist = false,
}: AppRouterProps) {
  // Generate route lookup on initial render
  const routeLookup = useMemo(() => {
    return generateRouteLookup(children, persist);
  }, [children]);

  const alreadyVisitiedChildren = useMemo(() => {
    return routeLookup.filter((r) => r.isVisited);
  }, [children]);

  const { pathname, key, pathWithSearch } = useLocation();
  const [currentRoutes, setCurrentRoutes] = useState<RouteEntry[]>(
    alreadyVisitiedChildren
  ); // Track routes for caching
  const [wrappedRoutes, setWrappedRoutes] = useState<JSX.Element[]>([]);
  const prevKey = useRef<string | null>(null);
  const { setParams, setTargetRoute } = useBrowserContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async (action: any) => {
    await action();
  };

  const updateUI = (params: any, route: RouteEntry) => {
    if (key !== prevKey.current) return;

    if (persist) {
      // Add route to currentRoutes, replacing an existing route if the componentID matches
      setCurrentRoutes((prevRoutes) => {
        const routeIndex = prevRoutes.findIndex(
          (r) => r.componentID === route.componentID
        );

        const updatedRoutes = [...prevRoutes];

        if (routeIndex !== -1) {
          updatedRoutes[routeIndex] = route;
        } else {
          updatedRoutes.push(route);
        }

        return updatedRoutes;
      });
    } else {
      setCurrentRoutes([route]);
    }

    setParams(params);
    setTargetRoute(pathname);
    setLoading(false);
  };

  const matchRoutes = () => {
    if (!routeLookup.length) return;

    const { route, params } = matchRoute(routeLookup, pathname);

    if (!route) {
      setError("An error occured when matching routes");
      return;
    }
    if (route.action && route.prefetch) {
      fetchData(route.action)
        .then(() => {
          setError("");
          updateUI(params, route);
        })
        .catch((error) => {
          console.error("Something went wrong", error);
          setError("An error occured");
        });

      return;
    }

    // proceed normally
    setError("");
    updateUI(params, route);
  };

  useLayoutEffect(() => {
    if (loading) return;
    const routesWithProvider = routeWrapper(currentRoutes);
    setWrappedRoutes(routesWithProvider);
  }, [currentRoutes, loading]); // Re-wrap the routes when currentRoutes changes

  // Trigger route matching on routeLookup or pathname change
  useEffect(() => {
    setLoading(true);

    prevKey.current = key;
    matchRoutes();
  }, [pathWithSearch]); // Ensure currentRoutes is a dependency

  if (routeLookup.length === 0 || wrappedRoutes.length === 0) return null;

  return error ? <ErrorComponent error={error} /> : wrappedRoutes;
}
