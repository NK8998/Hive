import { Dispatch } from "@reduxjs/toolkit";

import { updateInitialFetch } from "./slice";
import { RootState } from "../../store";

export const fetchVideos = () => {
  return async (dispatch: Dispatch, getState: RootState) => {
    await new Promise((resolve) => {
      const state = getState.home;
      console.log(state);
      const { pathname, search } = window.location;
      setTimeout(() => {
        console.log(pathname, search);

        resolve(null);
      }, 1500);
    });
    dispatch(updateInitialFetch(["vid1", "vid2"]));
  };
};
