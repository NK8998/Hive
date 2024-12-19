# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Sure! Here's a brief README that you can use for your repository:

---

# React Route Management with Dynamic Parameters and Redux Integration

This project is a custom React router implementation designed to manage dynamic routes with parameters, prefetching, and Redux integration for asynchronous actions. It includes a dynamic routing system that supports paths with parameters (e.g., `:id`) and static paths, along with nested route handling.

## Features

- **Dynamic Route Handling**: Automatically replaces dynamic parameters in the URL with actual values from the URL path (e.g., `:channelName`).
- **Nested Routes**: Supports nested routes with recursive route handling.
- **Prefetching**: Option to prefetch data for routes before navigating.
- **Redux Integration**: Supports asynchronous actions (e.g., fetching data) on route changes using Redux.

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   ```

2. **Install dependencies**:

   ```bash
   cd your-repo-name
   npm install
   ```

3. **Run the application**:

   ```bash
   npm start
   ```

## Key Components

- **`Route`**: A custom component for defining routes with dynamic parameters and nested routes.
- **`ComponentProvider`**: A context provider used to wrap route components and pass data through the component tree.
- **`routeWrapper`**: A higher-order function that wraps routes and their children in a context provider for state management.
- **Redux Integration**: Routes can dispatch asynchronous actions (like fetching data) using Redux's `dispatch` and `getState`.

## Example Usage

### Defining Routes

```tsx
<Route path="/watch/:videoId" element={<Watch />} action={() => dispatch(fetchSelectedVideo(pathname, search))} />
```

This route will match any URL with the path `/watch/:videoId` and trigger the `fetchSelectedVideo` action.

### Nested Routes

```tsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route path="/dashboard/settings" element={<Settings />} />
  <Route path="/dashboard/profile" element={<Profile />} />
</Route>
```

Nested routes are handled recursively, and each route can have its own children.

### Fetching Data on Route Change

```tsx
const fetchSelectedVideo = (pathname: string, search: string) => {
  return async (dispatch: Dispatch, getState: RootState) => {
    console.log(pathname, search);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    dispatch(updateSelectedVideo({ videoId: nanoid(8), url: "http://example.com/output.mpd" }));
  };
};
```

Actions can be dispatched on route change to fetch or update data.

## Contributing

Feel free to submit pull requests or raise issues for any bugs or enhancements.

---

You can customize this as needed, but it should provide a solid foundation for your project's README.

