import { Dispatch } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { RootState } from "../../store/store";

export interface RouteProps {
  element: ReactNode;
  path: string;
  fullPath?: string;
  partialPath?: string;
  timeout?: number | null;
  action?: (
    ...args: any
  ) =>
    | Promise<void>
    | ((dispatch: Dispatch, getState: RootState) => Promise<void>);
  prefetch?: boolean;
  isVisited?: boolean;
  isActive?: boolean;
  isHidden?: boolean;
  children?: ReactNode | ReactNode[]; // children can be a ReactNode or an array of ReactNode
  componentID?: string;
  index?: boolean;
  persist?: boolean;
  classList?: string;
}

export default function Route({
  element,
  persist,
  isVisited,
  isActive,
  classList,
}: RouteProps) {
  if (persist) {
    return isVisited ? (
      <div
        className={`${classList ? classList : ""} hvd-browse`}
        hidden={!isActive}
      >
        {element}
      </div>
    ) : null;
  } else {
    return isActive ? <div className='hvd-browse'> {element}</div> : null;
  }
}
