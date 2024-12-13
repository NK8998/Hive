import { AppDispatch } from "../../store";
import { updateWatchedVideos } from "./slice";

export const fetchHistory = (currentRoute: string, search: string) => {
  return async (dispatch: AppDispatch) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 3000);
    });
    dispatch(updateWatchedVideos(["vid1", "vid2"]));
  };
};
