# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# PageManager Routing Mechanism

## Overview
This project uses a custom routing solution built on top of `react-router-dom` to manage page navigation. The custom solution enhances routing by prefetching data for the next page before rendering it, ensuring a smooth and data-driven user experience.

## Key Features
- **Dynamic and Static Routing**: Supports both predefined static routes and dynamic routes (e.g., user-specific or content-specific paths).
- **Data Prefetching**: Fetches required data for the next page before rendering, ensuring components receive the appropriate data.
- **Visited Component Management**: Tracks visited components to determine which pages need to be rendered and which can remain hidden.
- **Redux Integration**: Utilizes Redux for state management, enabling seamless updates to route-related data and global states.

## How It Works
1. **Route Detection**:
   - The `PageManager` listens to route updates through `react-router-dom`'s `useLocation` hook.

2. **Component Matching**:
   - Static routes are matched directly based on the path.
   - For dynamic routes (e.g., `/@channelName`), a utility function (`matchDynamicPath`) extracts the necessary parameters (e.g., `channel` and `subRoute`).

3. **Data Fetching**:
   - Each component in the registry has an associated `thunk` function. This thunk is responsible for fetching the data required by the component.
   - Before rendering the next page, the thunk is dispatched to fetch the relevant data.

4. **Component Rendering**:
   - After data fetching completes, the target component is marked as visited in the registry.
   - The `PageManager` renders the target component, ensuring only the relevant page is visible to the user.

## File Structure
```plaintext
src/
├── routes/                     # Routes-related files
│   ├── pages/                  # Individual folders for each route, containing page-specific components
│   ├── PageManager.tsx         # Main component managing routing and rendering
│   └── componentsRegistry.tsx  # Manages the registry of components
├── store/                      # State management
│   ├── app/                    # Redux slices and actions for managing the entire app
│   ├── hooks/                  # Custom Redux hooks
│   └── routes/                 # Redux slices and actions for route-specific states
├── utilities/                  # Reusable helper functions
│   └── route-matching.tsx      # Utility function for matching dynamic routes
```


## Code Walkthrough
### `PageManager`
The `PageManager` component is responsible for:
1. Listening to route updates.
2. Fetching data for the target route using the associated thunk.
3. Updating the component registry to reflect visited components.
4. Rendering the appropriate component based on the current route.

#### Key Methods
- **`handleNavigation`**:
  Detects the current route and determines whether it is static or dynamic. Dispatches the corresponding thunk to fetch data and updates the registry accordingly.

- **`updateComponents`**:
  Marks the target route's component as visited and updates the Redux store with relevant parameters.

- **`componentsToRender`**:
  Filters and renders only the components marked as visited, hiding others to optimize rendering.

### `componentsRegistry`
This hook provides access to the registry of components. Each component in the registry is defined by:
- **`component`**: The React component to render.
- **`path`**: The route path.
- **`type`**: Indicates if the route is `static` or `dynamic`.
- **`thunk`**: The function to fetch data for the component.
- **`isVisited`**: Boolean indicating if the component has been visited.

## Example
### Component Registration
```tsx
const [componentsRegistry, setComponentsRegistry] = useComponentsRegistry();

const exampleRegistry = [
  {
    component: <Home />,
    path: "/",
    type: "static",
    isVisited: true,
    thunk: fetchHomeVideos,
  },
  {
    component: <Channel />,
    path: "/@channelName",
    type: "dynamic",
    isVisited: false,
    thunk: fetchChannelContent,
  },
];
```

### Dynamic Route Matching
Dynamic paths like `/@channelName` are resolved using `matchDynamicPath`, which extracts parameters such as `channel` and `subRoute`. The resolved data is passed to Redux and used by the relevant component.

## Redux Integration
The solution leverages Redux to:
- Manage global states like `targetRoute`, `channelParams`, and `fetching` status.
- Dispatch thunks for data fetching and state updates.

## Benefits
- **Improved User Experience**: Data is preloaded before rendering, resulting in faster perceived performance.
- **Scalability**: Easily add new routes by updating the component registry.
- **Maintainability**: Clear separation of routing, data fetching, and rendering logic.

## Future Improvements
- Implement caching for fetched data to reduce redundant API calls.
- Enhance error handling for route mismatches and data fetching failures.
- Add tests for the routing and data-fetching mechanisms.

## Conclusion
This custom routing mechanism combines the flexibility of `react-router-dom` with the power of Redux and data prefetching, providing a robust solution for modern web applications.



