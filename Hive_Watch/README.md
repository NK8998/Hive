
# Hive_Watch

Hive_Watch is a React-based video streaming platform built using **React**, **Vite**, and **TypeScript**, with **Redux** for state management. It provides a seamless video-watching experience powered by a custom routing system tailored for advanced features like route persistence.

## Features

### 1. **Custom Router**
Hive_Watch uses a custom router (`AppRouter`) designed to address specific needs not met by existing solutions like React Router. Key features include:
- **Route Persistence**: The `persist` parameter allows inactive routes to remain in the DOM but hidden, enabling state retention when switching between routes.
- **Dynamic & Nested Routes**: Supports dynamic paths, index routes, and multi-level nesting for complex navigation structures.
- **Prerendering**: Routes can be pre-rendered by enabling the `isVisited` property for faster transitions and improved user experience.
- **Action Handling**: Parent routes can have `action` handlers triggered before navigation to fetch data or perform side effects. These handlers ensure UI updates only after successful data retrieval.
- **Error Handling**: Graceful error messages can be displayed if route actions fail.

### 2. **Advanced Video Streaming Features**
- **Dynamic Video Rendering**: Videos are streamed with adaptive bitrate, ensuring optimal playback across devices and network conditions. This is handled by a reusable shaka player component
- **Centralized State Management**: Integrated with **Redux** for efficient state handling, allowing smooth synchronization of video metadata, playback states, and user preferences.

### 3. **Integration with Modern Web Technologies**
- Built with **React + Vite** for fast development and optimized production builds.
- **TypeScript** ensures robust type safety and maintainability.
- **Custom Components**: Implements essential features like `Link`, `useLocation`, and `useParams` for navigation and parameter handling.

## Example Setup

### `Main.tsx`
```tsx
import { AppRouterProvider } from "./AppRouter/components/Provider.tsx";

createRoot(document.getElementById("hvd-app")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouterProvider>
        <App />
      </AppRouterProvider>
    </Provider>
  </StrictMode>
);
```

### `App.tsx`
```tsx
export default function App() {
  const dispatch = useAppDispatch();

  const handleAction = async (func: any) => {
    await dispatch(func());
  };

  return (
    <div className="page-manager">
      <AppRouter persist>
        <Route
          element={<Home />}
          path="/"
          prefetch
          action={() => handleAction(fetchVideos)}
          classList="home"
        />
        <Route
          element={<Watch />}
          path="/watch"
          prefetch
          action={() => handleAction(fetchSelectedVideo)}
          classList="watch"
          isVisited
        />
        {/* Nested Routes */}
        <Route
          element={<Channel />}
          path="/:channelName"
          action={() => handleAction(fetchFeaturedContent)}
          prefetch
        >
          <Route element={<Featured />} path=":featured" index prefetch />
          <Route element={<Videos />} path="videos" prefetch>
            <Route element={<Inner />} path="inner" prefetch>
              <Route element={<Inner2 />} path=":inner2" prefetch />
            </Route>
          </Route>
        </Route>
        <Route
          element={<History />}
          path="/history"
          classList="history"
          prefetch
        />
        <Route path="*" element={<NotFound />} />
      </AppRouter>
    </div>
  );
}
```

### `Route.tsx`
```tsx
export default function Route({
  element,
  persist,
  isVisited,
  isActive,
  classList,
}: RouteProps) {
  if (persist) {
    return isVisited ? (
      <div
        className={`${classList || ""} hvd-browse`}
        hidden={!isActive}
      >
        {element}
      </div>
    ) : null;
  } else {
    return isActive ? <div className="hvd-browse">{element}</div> : null;
  }
}
```

## Key Benefits of the Custom Router
- **Improved UX**: Route persistence reduces delays when revisiting routes, maintaining state and context without unnecessary re-rendering.
- **Prefetching**: Ensures essential routes are ready in advance for a seamless experience.
- **Action-Driven Navigation**: Centralized handling of asynchronous actions tied to navigation, with error handling built-in.
- **Wildcard Routes**: Catch-all route support for handling unmatched paths (e.g., 404 pages or redirections).

## Future Enhancements
- **Improved Child Route Actions**: Extend support for `action` handlers in child routes to provide more granular data fetching capabilities.
- **Enhanced Prefetching**: Optimize the prerendering logic for better resource utilization.
- **Dynamic Import Support**: Integrate dynamic imports for route components to further improve performance.
