import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { nanoid } from "nanoid";

// Define the types for the context
export type AppRouterContextType = {
  params: Record<string, any> | null;
  setParams: (newParams: Record<string, any>) => void;
  location: {
    origin: string;
    pathname: string;
    pathWithSearch: string;
    search: string;
    key: string;
  };
  setLocation: (newLocation: {
    origin: string;
    pathname: string;
    pathWithSearch: string;
    search: string;
    key: string;
  }) => void;
  targetRoute: string;
  setTargetRoute: (...args: any) => void;
};

// Create the context
export const AppRouterContext = createContext<AppRouterContextType | undefined>(
  undefined
);

// Custom hook to use params
export const useParams = () => {
  const context = useContext(AppRouterContext);
  if (!context) {
    throw new Error("useParams must be used within a ParamsProvider");
  }
  return context.params;
};

// Custom hook to use location
export const useLocation = () => {
  const context = useContext(AppRouterContext);
  if (!context) {
    throw new Error("useLocation must be used within a ParamsProvider");
  }
  return { ...context.location };
};

export const useBrowserContext = () => {
  const context = useContext(AppRouterContext);

  if (!context) {
    throw new Error("useLocation must be used within a ParamsProvider");
  }
  return context;
};

export const useNavigate = () => {
  const { pathname, pathWithSearch } = useLocation();

  const navigate = (path: string) => {
    if (path === pathname || path === pathWithSearch) return;
    if (typeof path !== "string" || path.trim() === "") {
      console.warn("Invalid path passed to navigate.");
      return;
    }

    // Push the new path to the history stack
    window.history.pushState(null, "", path);

    // Trigger a popstate event manually to notify any listeners
    const popStateEvent = new PopStateEvent("popstate");
    window.dispatchEvent(popStateEvent);
  };

  return navigate;
};

// ParamsProvider component to wrap the app with context
export const AppRouterProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  //
  const [params, setParams] = useState<Record<string, any> | null>(null);
  //
  const [location, setLocation] = useState({
    origin: window.location.origin,
    pathname: window.location.pathname,
    search: window.location.search,
    pathWithSearch: window.location.pathname + window.location.search,
    key: nanoid(7),
  });

  // use this so that ui updates are syncronized when prefetching is enabled
  const [targetRoute, setTargetRoute] = useState(window.location.pathname);

  useEffect(() => {
    const updateLocation = () => {
      setLocation({
        origin: window.location.origin,
        pathname: window.location.pathname,
        search: window.location.search,
        pathWithSearch: window.location.pathname + window.location.search,
        key: nanoid(7),
      });
    };

    // Wrap pushState and replaceState to detect programmatic navigation
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      updateLocation(); // Trigger update on pushState
    };

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(window.history, args);
      updateLocation(); // Trigger update on replaceState
    };

    // Listen for popstate events (Back/Forward navigation)
    window.addEventListener("popstate", updateLocation);

    // Cleanup on unmount
    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", updateLocation);
    };
  }, []);

  return (
    <AppRouterContext.Provider
      value={{
        params,
        setParams,
        location,
        setLocation,
        targetRoute,
        setTargetRoute,
      }}
    >
      {children}
    </AppRouterContext.Provider>
  );
};

interface ComponentContextProps {
  routeChildren: any;
  isHidden: boolean;
}

export const ComponentContext = createContext<ComponentContextProps | null>(
  null
);

export const ComponentProvider = ({
  children,
  _routeChildren,
  _isHidden,
}: any) => {
  const [routeChildren, setRouteChildren] = useState(_routeChildren);
  const [isHidden, setIShidden] = useState(!_isHidden);

  useLayoutEffect(() => {
    setIShidden(!_isHidden);
  }, [_isHidden]);
  useLayoutEffect(() => {
    setRouteChildren(_routeChildren);
  }, [_routeChildren]);

  return (
    <ComponentContext.Provider value={{ routeChildren, isHidden }}>
      {children}
    </ComponentContext.Provider>
  );
};
