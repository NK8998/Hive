import {
  JSX,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { RouteProps } from "./components/Route";
import { matchRoute } from "./components/routeMatching";
import {
  useBrowserContext,
  useLocation,
} from "./components/Provider";
import routeWrapper from "./components/RouteWrapper";
import {
  generateRouteLookup,
  RouteEntry,
} from "./components/generateRouteLookup";

interface AppRouterProps {
  children: ReactNode[] & { props: RouteProps }[];
  cacheEnabled?: boolean;
}

export default function AppRouter({
  children,
  cacheEnabled = false,
}: AppRouterProps) {
  const { pathname, key } = useLocation();
  const [routeLookup, setRouteLookUp] = useState<
    RouteEntry[]
  >([]);
  const [currentRoutes, setCurrentRoutes] = useState<
    RouteEntry[]
  >([]); // Track routes for caching
  const [wrappedRoutes, setWrappedRoutes] = useState<
    JSX.Element[]
  >([]);
  const prevKey = useRef<string>(null);
  const { setParams } = useBrowserContext();

  // Generate route lookup on initial render
  useEffect(() => {
    const routes = generateRouteLookup(
      children,
      cacheEnabled
    );
    setRouteLookUp(routes);
  }, []);

  const fetchData = async (action: any) => {
    await action();
  };

  const updateUI = (params: any, route: RouteEntry) => {
    if (key !== prevKey.current) return;

    if (cacheEnabled) {
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
  };

  const matchRoutes = () => {
    if (!routeLookup.length) return;
    const { route, params } = matchRoute(
      routeLookup,
      pathname
    );

    if (route && route.action) {
      fetchData(route?.action).then(() => {
        updateUI(params, route);
      });
    } else if (route) {
      updateUI(params, route);
    }
  };

  useEffect(() => {
    const routesWithProvider = routeWrapper(currentRoutes);
    setWrappedRoutes(routesWithProvider);
  }, [currentRoutes]); // Re-wrap the routes when currentRoutes changes

  // Trigger route matching on routeLookup or pathname change
  useEffect(() => {
    prevKey.current = key;
    matchRoutes();
  }, [pathname, routeLookup]); // Ensure currentRoutes is a dependency

  if (routeLookup.length === 0) return null;

  return wrappedRoutes;
}
