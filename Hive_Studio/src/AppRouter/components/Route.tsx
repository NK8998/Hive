import { cloneElement, Fragment, isValidElement, ReactElement, ReactNode } from "react";
import { useLocation, useParams } from "./Provider"; // Assuming these hooks provide the necessary params and location
import { OutLet } from "./Outlet";

export interface RouteProps {
  element: ReactNode;
  path: string;
  fullPath?: string;
  partialPath?: string;
  timeout?: number | null;
  action?: (...args: any) => Promise<void>;
  prefetch?: boolean;
  isVisited?: boolean;
  isActive?: boolean;
  isHidden?: boolean;
  children?: ReactNode[] & { props: RouteProps }[]; // This allows nested routes
  componentID?: string;
  index?: boolean;
  cacheEnabled?: boolean;
}

export default function Route({
  element,
  cacheEnabled,
  path,
  fullPath,
  partialPath,
  timeout = 0,
  prefetch = false,
  isVisited,
  action,
  isHidden = true,
  isActive,
  children,
  componentID,
  index = false,
}: RouteProps) {
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
