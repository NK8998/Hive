import { ReactNode } from "react";

interface OutLetProps {
  matchedChild: ReactNode; // The matched child route component
}

export const OutLet = ({ matchedChild }: OutLetProps) => {
  return <>{matchedChild}</>; // Render the matched child
};
