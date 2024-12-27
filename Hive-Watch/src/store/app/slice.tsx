import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    windowWidth: window.innerWidth,
    targetRoute: window.location.pathname,
    mainGuideVisible: false,
  },
  reducers: {
    updateWindowWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
    updateTargetRoute: (state, action) => {
      state.targetRoute = action.payload;
    },
    toggleGuideVisibility: (state, action) => {
      state.mainGuideVisible = !state.mainGuideVisible;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateWindowWidth, updateTargetRoute, toggleGuideVisibility } = appSlice.actions;

const appReducer = appSlice.reducer;
export default appReducer;
