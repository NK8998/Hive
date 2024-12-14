import { cloneElement, isValidElement, ReactElement, ReactNode } from "react";
import { useLocation, useParams } from "./Provider"; // Assuming these hooks provide the necessary params and location
import { OutLet } from "./Outlet";

export interface RouteProps {
  component: ReactNode;
  path: string;
  timeout?: number | null;
  action?: (...args: any) => Promise<void>;
  prefetch?: boolean;
  isVisited?: boolean;
  isHidden?: boolean;
  children?: ReactNode[] & { props: RouteProps }[]; // This allows nested routes
}

export default function Route({
  component,
  path,
  timeout = 0,
  prefetch = false,
  isVisited = false,
  action,
  isHidden = true,
  children,
}: RouteProps) {
  const params = useParams(); // Get params (e.g., channelName, subRoute)
  console.log(params);
  if (!params) return null;

  // Function to find the last dynamic key in the params
  const getLastParam = (params: Record<string, string>) => {
    const keys = Object.keys(params);
    return keys[keys.length - 1]; // Get the last key
  };

  // Get the last dynamic key from params (e.g., 'subRoute', 'id')
  const lastParamKey = getLastParam(params);
  const lastParamValue = params[lastParamKey];

  const matchChild = (child: ReactNode) => {
    if (!child || !isValidElement(child)) return false;

    const childPath = child.props.path;

    // Otherwise, match the child based on the last parameter value
    return childPath.includes(lastParamValue);
  };

  // Find the matched child based on the dynamic params
  let matchedChild = children?.find((child) => matchChild(child));

  // If no matched child is found, return the child with path "/"
  const finalChild = matchedChild || children?.find((child) => child?.props.path === "/");

  // Render the matched child, otherwise render the parent component
  return (
    <div className='route-wrapper' hidden={isHidden}>
      {cloneElement(component as ReactElement, {}, finalChild)}
    </div>
  );
}
