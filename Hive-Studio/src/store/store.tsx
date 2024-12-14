import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./routes/home/slice";
import watchReducer from "./routes/watch/slice";

const store = configureStore({
  reducer: {
    home: homeReducer,
    watch: watchReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
