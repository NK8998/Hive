import { nanoid } from "nanoid";
import { updateSelectedVideo } from "./slice";
import { RootState } from "../../store";
import { Dispatch } from "@reduxjs/toolkit";

export const fetchSelectedVideo = (pathname: string, search: string) => {
  return async (dispatch: Dispatch, getState: RootState) => {
    console.log(pathname, search);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 3000);
    });
    dispatch(updateSelectedVideo({ videoId: nanoid(8), url: "http:://example.com/output.mpd" }));
  };
};
