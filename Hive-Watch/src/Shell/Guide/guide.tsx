import { useEffect } from "react";
import { toggleGuideVisibility } from "../../store/app/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import "./guide.css";

export default function Guide() {
  const { windowWidth, targetRoute, mainGuideVisible } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const watchStyle = targetRoute === "/watch" ? "watch-active" : "";
  const resizeStyle = targetRoute !== "/watch" && windowWidth <= 1200 ? "mini-active" : "";
  const showTopSection = windowWidth <= 1200 || targetRoute === "/watch";
  // reset it so it doesn't block viewing experience
  useEffect(() => {
    mainGuideVisible && targetRoute === "/watch" && dispatch(toggleGuideVisibility(null));
  }, [targetRoute]);

  return (
    <div className={`guide-wrapper ${watchStyle} ${resizeStyle}`}>
      <div className={`main-guide-outer ${mainGuideVisible ? "show" : ""}`}>
        <div className='main-guide-bg' onClick={() => dispatch(toggleGuideVisibility(null))}></div>
        <div className='main-guide'>
          {showTopSection && (
            <div className='top-part'>
              <button onClick={() => dispatch(toggleGuideVisibility(null))}>Click me</button>
            </div>
          )}
        </div>
      </div>
      <div className='mini-guide'></div>
    </div>
  );
}
