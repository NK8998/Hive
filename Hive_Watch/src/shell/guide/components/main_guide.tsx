import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { toggleMainGuideVisibility } from "../../../store/app/slice";
import GuideBtn from "./guide_btn";
import { useBrowserContext } from "../../../AppRouter/components/Provider";

export default function MainGuide() {
  const { windowWidth, mainGuideVisible, miniGuideVisible } = useAppSelector(
    (state) => state.app
  );
  const { targetRoute } = useBrowserContext();
  const dispatch = useAppDispatch();
  const mainGuideOuterRef = useRef<HTMLDivElement>(null);
  const isWatchPage = targetRoute === "/watch";
  const showTopSection = windowWidth <= 1200 || isWatchPage;

  useEffect(() => {
    // if (mainGuideVisible && targetRoute === "/watch") dispatch(toggleMainGuideVisibility(null));

    if (isWatchPage) return;
    // resetting the main guide so its hidden instantly when not needed
    if (windowWidth <= 1200 && mainGuideOuterRef.current) {
      mainGuideOuterRef.current.classList.remove("hide");
      mainGuideOuterRef.current.classList.remove("show");
      dispatch(toggleMainGuideVisibility(false));
    } else if (windowWidth > 1200 && mainGuideOuterRef.current) {
      mainGuideOuterRef.current.classList.remove("hide");
      mainGuideOuterRef.current.classList.remove("show");
      dispatch(toggleMainGuideVisibility(false));
    }
  }, [windowWidth, targetRoute]);

  return (
    <div
      className={`main-guide-outer ${mainGuideVisible ? "show" : "hide"}`}
      ref={mainGuideOuterRef}
    >
      <div
        className='main-guide-bg'
        onClick={() => dispatch(toggleMainGuideVisibility(!mainGuideVisible))}
      ></div>
      <div
        className={`main-guide  ${
          miniGuideVisible && windowWidth > 1200 && !isWatchPage
            ? "guide-hidden"
            : ""
        }`}
      >
        {showTopSection && (
          <div className='top-part'>
            <GuideBtn />
          </div>
        )}
      </div>
    </div>
  );
}
