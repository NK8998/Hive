import { AppDispatch } from "../../store";
import { updateInitialFetch } from "./slice";

export const fetchHomeVideos = (currentRoute: string, search: string) => {
  return async (dispatch: AppDispatch) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 3000);
    });
    dispatch(updateInitialFetch(["vid1", "vid2"]));
  };
};
