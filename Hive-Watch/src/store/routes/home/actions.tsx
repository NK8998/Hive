import { Dispatch } from "@reduxjs/toolkit";

import { updateInitialFetch } from "./slice";
import { RootState } from "../../store";

export const fetchVideos = (
  pathname: string,
  search: string
) => {
  return async (
    dispatch: Dispatch,
    getState: RootState
  ) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(pathname, search);

        resolve(null);
      }, 3000);
    });
    dispatch(updateInitialFetch(["vid1", "vid2"]));
  };
};
