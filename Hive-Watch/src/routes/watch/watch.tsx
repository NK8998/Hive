import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "../../AppRouter/components/Provider";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import Player from "./components/player/player";
import Secondary from "./components/secondary_content/secondary_content";
import "./watch.css";
import { updateSelectedVideo } from "../../store/routes/watch/slice";
import { useRouteProperties } from "../../AppRouter/components/RouteProperties";
import { PlayerBounds } from "../../types/player_types";

export default function Watch() {
  const { windowWidth } = useAppSelector((state) => state.app);
  const { selectedVideo, theatreMode, fullScreen } = useAppSelector(
    (state) => state.watch
  );
  const [playerBounds, setPlayerBounds] = useState<PlayerBounds | null>(null);
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const isHidden = useRouteProperties();
  const dispatch = useAppDispatch();

  if (!search && pathname === "/watch") {
    navigate("/");
  }

  useEffect(() => {
    if (isHidden) {
      dispatch(updateSelectedVideo(null));
    }
  }, [isHidden]);

  const calculateBoundaries = () => {
    const app = document.querySelector("#hvd-app");
    const secondaryRef = document.querySelector(".secondary-column");
    if (!app || !secondaryRef || isHidden) return;

    const windwowHeight = window.innerHeight;
    let availableSpace;
    let maxHeight;
    let maxWidth;

    if (theatreMode) {
      availableSpace = app.clientWidth;
      maxHeight = 0.795 * windwowHeight;
      maxWidth = availableSpace;
    } else {
      availableSpace = windowWidth - (60 + secondaryRef.clientWidth);
      maxHeight = (73.9 * windwowHeight) / 100;
      maxWidth = 1280;
    }

    if (fullScreen) {
      availableSpace = window.screen.width;
      maxHeight = window.screen.height;
      maxWidth = window.screen.width;
    }

    setPlayerBounds({ maxHeight, maxWidth, availableSpace });
  };

  useLayoutEffect(() => {
    calculateBoundaries();
  }, [windowWidth, theatreMode, fullScreen, isHidden]);

  return (
    <>
      <div className='columns'>
        <div className='main-column'>
          <Player
            videoDetails={selectedVideo}
            scope={"watch-page"}
            playerBounds={playerBounds}
          />
        </div>
        <div className='secondary-column'>
          <Secondary />
        </div>
      </div>
    </>
  );
}
