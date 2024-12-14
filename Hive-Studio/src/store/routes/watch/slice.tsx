import { createSlice } from "@reduxjs/toolkit";

export const watchSlice = createSlice({
  name: "counter",
  initialState: {
    selectedVideo: {},
  },
  reducers: {
    updateSelectedVideo: (state, action) => {
      state.selectedVideo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSelectedVideo } = watchSlice.actions;

const watchReducer = watchSlice.reducer;
export default watchReducer;
