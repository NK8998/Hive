import { ReactNode } from "react";
import { useNavigate } from "./Provider";

interface LinkProps {
  children: ReactNode;
  to: string;
}

export default function Link({ children, to }: LinkProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (to) {
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}
