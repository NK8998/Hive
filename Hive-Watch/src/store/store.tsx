import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app/slice.tsx";
import homeReducer from "./routes/home/slice.tsx";

const store = configureStore({
  reducer: {
    home: homeReducer,
    app: appReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
