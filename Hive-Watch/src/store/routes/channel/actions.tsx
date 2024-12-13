import { AppDispatch } from "../../store";
import { updateFeaturedContent } from "./slice";

export const fetchChannelContent = (currentRoute: string, search: string) => {
  return async (dispatch: AppDispatch) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 3000);
    });
    dispatch(updateFeaturedContent(["vid1", "vid2"]));
  };
};
