import { createSlice } from "@reduxjs/toolkit";

export const historySlice = createSlice({
  name: "counter",
  initialState: {
    watchedVideos: {},
  },
  reducers: {
    updateWatchedVideos: (state, action) => {
      state.watchedVideos = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateWatchedVideos } = historySlice.actions;

const watchReducer = historySlice.reducer;
export default watchReducer;
