import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VideoDetails } from "../../../types/player_types";

// Define the state type
interface WatchSliceState {
  selectedVideo: VideoDetails | null; // `null` if no video is selected
  theatreMode: boolean;
  fullScreen: boolean;
}

// Initial state with type
const initialState: WatchSliceState = {
  selectedVideo: null,
  theatreMode: false,
  fullScreen: false,
};

export const watchSlice = createSlice({
  name: "watch",
  initialState,
  reducers: {
    // Typing the action payload
    updateSelectedVideo: (
      state,
      action: PayloadAction<VideoDetails | null>
    ) => {
      state.selectedVideo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSelectedVideo } = watchSlice.actions;

// Export the reducer
const watchReducer = watchSlice.reducer;
export default watchReducer;
