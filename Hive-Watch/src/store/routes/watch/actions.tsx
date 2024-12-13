import { AppDispatch } from "../../store";
import { updateSelectedVideo } from "./slice";

export const fetchSelectedVideo = (currentRoute: string, search: string) => {
  return async (dispatch: AppDispatch) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 3000);
    });
    dispatch(updateSelectedVideo({ videoId: search, url: "http:://example.com/output.mpd" }));
  };
};
