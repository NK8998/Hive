import { useAppSelector } from "../../store/hooks/hooks";
import "./guide.css";
import MainGuide from "./components/main_guide";
import MiniGuide from "./components/mini_guide";

export default function Guide() {
  const { windowWidth, targetRoute } = useAppSelector((state) => state.app);
  const watchStyle = targetRoute === "/watch" ? "watch-active" : "";
  const resizeStyle = targetRoute !== "/watch" && windowWidth <= 1200 ? "mini-active" : "";

  return (
    <div className={`guide-wrapper ${watchStyle} ${resizeStyle}`}>
      <MainGuide />
      <MiniGuide />
    </div>
  );
}
