import { useAppSelector } from "../../store/hooks/hooks";
import "./guide.css";
import { useBrowserContext } from "../../AppRouter/components/Provider";
import MainGuide from "./components/main_guide";
import MiniGuide from "./components/mini_guide";

export default function Guide() {
  const { windowWidth } = useAppSelector((state) => state.app);
  const { targetRoute } = useBrowserContext();

  const watchStyle = targetRoute === "/watch" ? "watch-active" : "";
  const resizeStyle =
    targetRoute !== "/watch" && windowWidth <= 1200 ? "mini-active" : "";

  return (
    <div className={`guide-wrapper ${watchStyle} ${resizeStyle}`}>
      <MainGuide />
      <MiniGuide />
    </div>
  );
}
