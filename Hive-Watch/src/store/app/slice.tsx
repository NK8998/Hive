import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    windowWidth: window.innerWidth,
    mainGuideVisible: false,
    miniGuideVisible: false,
  },
  reducers: {
    updateWindowWidth: (state, action) => {
      state.windowWidth = action.payload;
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
export const {
  updateWindowWidth,
  toggleMainGuideVisibility,
  toggleMiniGuideVisibility,
} = appSlice.actions;

const appReducer = appSlice.reducer;
export default appReducer;
