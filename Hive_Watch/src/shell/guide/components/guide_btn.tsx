import { useBrowserContext } from "../../../AppRouter/components/Provider";
import {
  toggleMainGuideVisibility,
  toggleMiniGuideVisibility,
} from "../../../store/app/slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";

export default function GuideBtn() {
  const { windowWidth, mainGuideVisible, miniGuideVisible } = useAppSelector(
    (state) => state.app
  );

  const dispatch = useAppDispatch();

  const { targetRoute } = useBrowserContext();

  const handleClick = () => {
    if (targetRoute !== "/watch" && windowWidth > 1200) {
      dispatch(toggleMiniGuideVisibility(!miniGuideVisible));
    } else {
      dispatch(toggleMainGuideVisibility(!mainGuideVisible));
    }
  };

  return <button onClick={handleClick}>Click me</button>;
}
