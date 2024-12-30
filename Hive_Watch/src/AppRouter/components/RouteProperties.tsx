import { useContext } from "react";
import { ComponentContext } from "./Provider";

export const useRouteProperties = () => {
  const context = useContext(ComponentContext);
  if (!context) throw new Error("React context does not exist");
  return context.isHidden;
};
