import { useContext } from "react";
import { ComponentContext } from "./Provider";

export default function OutLet() {
  const context: any = useContext(ComponentContext);
  if (!context)
    throw new Error("React context does not exist");
  // console.log(context.routeChildren.current);
  return context.routeChildren;
}
