import { createSlice } from "@reduxjs/toolkit";

export const chanelSlice = createSlice({
  name: "counter",
  initialState: {
    featuredContent: {},
  },
  reducers: {
    updateFeaturedContent: (state, action) => {
      state.featuredContent = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateFeaturedContent } = chanelSlice.actions;

const watchReducer = chanelSlice.reducer;
export default watchReducer;
