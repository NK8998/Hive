import { createSlice } from "@reduxjs/toolkit";

export const channelSlice = createSlice({
  name: "channel",
  initialState: {
    featured: { featuredVideo: null },
    videos: [],
    live: [],
    shorts: [],
  },
  reducers: {
    updateInitialFetch: (state, action) => {
      state.featured = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateInitialFetch } = channelSlice.actions;

const channelReducer = channelSlice.reducer;
export default channelReducer;
