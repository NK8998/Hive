import { cloneElement, isValidElement, ReactElement, ReactNode } from "react";
import { useLocation, useParams } from "./Provider"; // Assuming these hooks provide the necessary params and location
import { OutLet } from "./Outlet";

export interface RouteProps {
  element: ReactNode;
  path: string;
  timeout?: number | null;
  action?: (...args: any) => Promise<void>;
  prefetch?: boolean;
  isVisited?: boolean;
  isHidden?: boolean;
  children?: ReactNode[] & { props: RouteProps }[]; // This allows nested routes
}

export default function Route({
  element,
  path,
  timeout = 0,
  prefetch = false,
  isVisited = false,
  action,
  isHidden = true,
  children,
}: RouteProps) {
  const params = useParams(); // Get params (e.g., channelName, subRoute)
  console.log(path, params);

  return <div className='route-wrapper'>{element}</div>;
}
