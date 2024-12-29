import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    initialFetch: [],
  },
  reducers: {
    updateInitialFetch: (state, action) => {
      state.initialFetch = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateInitialFetch } = homeSlice.actions;

const homeReducer = homeSlice.reducer;
export default homeReducer;
