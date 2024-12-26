import { Dispatch } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { RootState } from "../../store/store";

export interface RouteProps {
  element: ReactNode;
  path: string;
  fullPath?: string;
  partialPath?: string;
  timeout?: number | null;
  action?: (...args: any) => Promise<void> | ((dispatch: Dispatch, getState: RootState) => Promise<void>);
  prefetch?: boolean;
  isVisited?: boolean;
  isActive?: boolean;
  isHidden?: boolean;
  children?: ReactNode | ReactNode[]; // children can be a ReactNode or an array of ReactNode
  componentID?: string;
  index?: boolean;
  cacheEnabled?: boolean;
}

export default function Route({ element, cacheEnabled, isVisited, isActive, children }: RouteProps) {
  // console.log({ isVisited, isActive });
  if (cacheEnabled) {
    return isVisited ? (
      <div className='route-wrapper' hidden={!isActive}>
        {element}
      </div>
    ) : null;
  } else {
    return isActive ? element : null;
  }
}
