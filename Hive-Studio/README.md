# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Custom Router with Data Fetching and Caching

## Overview
This project implements a custom router for React applications, designed to handle complex routing requirements with features like:

1. **Data Fetching:** Fetches required data for routes before rendering the UI while updating the URL immediately to improve user experience.
2. **Caching:** Optionally caches visited routes to optimize performance and allow smooth transitions between pages.
3. **Dynamic Routing:** Supports both static and dynamic routes with parameterized paths.
4. **Error Handling:** Handles errors gracefully during data fetching.

## Key Features

- **Customizable Data Fetching:** Each route can have an associated action (a Redux thunk) to fetch data.
- **Route Caching:** Configurable caching to preserve visited routes for better performance.
- **Dynamic and Static Routes:** Matches routes dynamically, extracting URL parameters when necessary.
- **TypeScript Support:** Fully typed to prevent common errors and improve maintainability.

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

---

## Usage

### Components

### **AppRouter**
The `AppRouter` component serves as the main router that wraps all `Route` components.

#### Props:
- `children: ReactNode[]`: The list of routes.
- `cacheEnabled: boolean`: If true, caches visited routes.

### **Route**
The `Route` component defines individual routes.

#### Props:
- `component: ReactNode`: The component to render for the route.
- `path: string`: The path for the route.
- `action?: (...args: any[]) => Promise<void>`: Optional thunk action for data fetching.
- `prefetch?: boolean`: Whether to prefetch the route's data.
- `timeout?: number`: Optional timeout for data fetching.
- `isHidden?: boolean`: Whether the route should be hidden.

---

### Example Implementation

```tsx
import React from "react";
import AppRouter from "./AppRouter";
import Route from "./components/Route";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Channel from "./pages/Channel";
import { fetchHomeVideos, fetchSelectedVideo } from "./store/actions";

function App() {
  return (
    <AppRouter cacheEnabled>
      <Route component={<Home />} path="/" prefetch action={fetchHomeVideos} />
      <Route component={<Watch />} path="/watch" prefetch action={fetchSelectedVideo} />
      <Route component={<Channel />} path="/:channelName" prefetch />
    </AppRouter>
  );
}

export default App;
```

---

### Data Fetching

Each route can define an `action` prop, which is a Redux thunk to fetch required data. Example:

```tsx
export const fetchSelectedVideo = (currentRoute: string, search: string) => {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`/api/videos?path=${currentRoute}&search=${search}`);
    const data = await response.json();
    dispatch(updateSelectedVideo(data));
  };
};
```

The `AppRouter` automatically calls the `action` when the route changes and updates the UI after the data is fetched.

---

### Route Matching

The `matchRoute` utility matches the current path to the defined routes. It handles:

- **Static Routes:** Exact matches like `/about` or `/contact`.
- **Dynamic Routes:** Parameterized paths like `/:channelName`.

Example implementation:

```tsx
const matchRoute = (urlPath: string, routes: { props: RouteProps }[]): MatchResult => {
  // Logic to match routes (static and dynamic)
};
```

---

### Error Handling

The `AppRouter` includes error handling for data fetching. If an error occurs during fetching, it:

1. Logs the error to the console.
2. Sets an `error` state that can be used to show an error page or notification.

Example:

```tsx
useEffect(() => {
  handleDataFetching(route.props.action, pathname, search)
    .then(() => setCurrentRoute(route))
    .catch((err) => {
      console.error("Data fetching failed", err);
      setError(true);
    });
}, [pathname]);
```

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature name"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.



