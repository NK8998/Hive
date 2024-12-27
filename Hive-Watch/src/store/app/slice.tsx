import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    windowWidth: window.innerWidth,
    targetRoute: window.location.pathname,
    mainGuideVisible: false,
    miniGuideVisible: false,
  },
  reducers: {
    updateWindowWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
    updateTargetRoute: (state, action) => {
      state.targetRoute = action.payload;
    },
    toggleMainGuideVisibility: (state, action) => {
      state.mainGuideVisible = action.payload;
    },
    toggleMiniGuideVisibility: (state, action) => {
      state.miniGuideVisible = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateWindowWidth, updateTargetRoute, toggleMainGuideVisibility, toggleMiniGuideVisibility } =
  appSlice.actions;

const appReducer = appSlice.reducer;
export default appReducer;
