import { Dispatch } from "@reduxjs/toolkit";

import { updateInitialFetch } from "./slice";
// import { RootState } from "../../store";

export const fetchVideos = () => {
  return async (dispatch: Dispatch) => {
    await new Promise((resolve) => {
      const { pathname, search } = window.location;
      setTimeout(() => {
        console.log(pathname, search);

        resolve(null);
      }, 1500);
    });
    dispatch(updateInitialFetch(["vid1", "vid2"]));
  };
};
