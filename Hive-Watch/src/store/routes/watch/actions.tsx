import { nanoid } from "nanoid";
import { updateSelectedVideo } from "./slice";
import { RootState } from "../../store";
import { Dispatch } from "@reduxjs/toolkit";

export const fetchSelectedVideo = (pathname: string, search: string) => {
  return async (dispatch: Dispatch, getState: RootState) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(pathname, search);

        resolve(null);
      }, 1500);
    });
    dispatch(
      updateSelectedVideo({
        videoId: nanoid(8),
        url: "http:://example.com/output.mpd",
      })
    );
  };
};
