import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./routes/home/slice";
import watchReducer from "./routes/watch/slice";
import appReducer from "./app/slice";
import channelReducer from "./routes/channel/slice";

const store = configureStore({
  reducer: {
    app: appReducer,
    home: homeReducer,
    watch: watchReducer,
    channel: channelReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
