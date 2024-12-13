import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Define the shape of your initial state explicitly
interface AppState {
  targetRoute: string;
  channelParams: { channel: string; subRoute: string };
  isFetching: boolean;
  hasErrored: boolean;
}

// Explicitly typing initial state
const initialState: AppState = {
  targetRoute: "",
  channelParams: { channel: "", subRoute: "" },
  isFetching: false,
  hasErrored: false,
};

export const appSlice = createSlice({
  name: "app", // Changed to "app" for more meaningful naming
  initialState, // Now correctly typed
  reducers: {
    updateTargetRoute: (state, action: PayloadAction<string>) => {
      state.targetRoute = action.payload;
    },
    updateChannelParams: (state, action: PayloadAction<{ channel: string; subRoute: string }>) => {
      state.channelParams = action.payload;
    },
    updateFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateTargetRoute, updateChannelParams, updateFetching } = appSlice.actions;

// Properly export reducer with an explicit type
const appReducer = appSlice.reducer;
export default appReducer;
