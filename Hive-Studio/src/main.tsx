import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/store.tsx";
import { AppRouterProvider } from "./AppRouter/components/Provider.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppRouterProvider>
      <App />
    </AppRouterProvider>
  </Provider>
);
