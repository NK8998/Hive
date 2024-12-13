import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { updateChannelParams, updateFetching, updateTargetRoute } from "../store/app/slice";
import { matchDynamicPath } from "../utilities/route-matching";
import { useComponentsRegistry } from "./componentsRegistry";

export default function PageManager() {
  // Get the current location information from React Router
  const location = useLocation();

  //
  const dispatch = useAppDispatch();

  // target route used for rendering the correct component in the registry
  const { targetRoute } = useAppSelector((state) => state.app);

  //
  const [componentsRegistry, setComponentsRegistry] = useComponentsRegistry();

  // Ref to track the previous location key
  const prevKey = useRef<string>(null);

  /**
   * Updates the components registry and Redux store based on navigation events
   * @param channelParams - Parameters extracted from the route
   * @param _targetRoute - The resolved target route
   */
  const updateComponents = (
    channelParams: { channel: string; subRoute: string },
    _targetRoute: string
  ) => {
    if (prevKey.current !== location.key) return; // Skip if location key hasn't changed

    // Mark the target route's component as visited
    setComponentsRegistry((prevComponentsRegistry) => {
      return prevComponentsRegistry.map((component) =>
        component.path === _targetRoute ? { ...component, isVisited: true } : component
      );
    });

    // Update Redux state with the new target route and channel parameters
    dispatch(updateTargetRoute(_targetRoute));
    dispatch(updateChannelParams(channelParams));
  };

  /**
   * Handles route navigation, including matching paths and dispatching relevant thunks
   */
  const handleNavigation = async () => {
    let { pathname, search, key } = location;
    prevKey.current = key; // Save the current location key

    let targetRoute = pathname;
    let currentComponent;
    let channelParams = { channel: "", subRoute: "" };

    // Find the static component matching the target route
    currentComponent = componentsRegistry.find((component) => component.path === targetRoute);

    // If no static component is found, match a dynamic route
    if (!currentComponent) {
      currentComponent = componentsRegistry.find((component) => component.type === "dynamic");
      targetRoute = "/@channelName";
      channelParams = matchDynamicPath(pathname); // Extract channel-specific params
    }

    if (!currentComponent) return; // Exit if no component matches

    // Fetch data for the route using the thunk
    dispatch(updateFetching(true));
    dispatch(currentComponent.thunk(targetRoute, search))
      .then(() => {
        updateComponents(channelParams, targetRoute);
      })
      .catch((err) => {
        console.error("Something went wrong", err);
      })
      .finally(() => {
        dispatch(updateFetching(false)); // Stop the loading state
      });
  };

  // React effect to handle navigation when the location changes
  useEffect(() => {
    handleNavigation();
  }, [location]);

  // Render the components based on the registry, showing only visited ones
  const componentsToRender = componentsRegistry.map((registry) => {
    if (!registry.isVisited) return null;

    return (
      <div key={registry.path} className={registry.ref} hidden={registry.path !== targetRoute}>
        {registry.component}
      </div>
    );
  });

  return <div className='page-manager'>{componentsToRender}</div>;
}
