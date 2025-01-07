import { useAppSelector } from "../../../store/hooks/hooks";

export default function MiniGuide() {
  const { windowWidth, miniGuideVisible } = useAppSelector((state) => state.app);

  return (
    <div className={`mini-guide ${!miniGuideVisible && windowWidth > 1200 ? "guide-hidden" : ""}`}></div>
  );
}
