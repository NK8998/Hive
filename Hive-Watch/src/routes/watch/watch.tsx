import { useEffect } from "react";
import {
  useBrowserContext,
  useLocation,
  useNavigate,
} from "../../AppRouter/components/Provider";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import Player from "./components/player/player";
import Secondary from "./components/secondary_content/secondary_content";
import "./watch.css";
import { updateSelectedVideo } from "../../store/routes/watch/slice";
import { useRouteProperties } from "../../AppRouter/components/RouteProperties";

export default function Watch() {
  const { selectedVideo } = useAppSelector((state) => state.watch);
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
  return (
    <>
      <div className='columns'>
        <div className='main-column'>
          <Player videoDetails={selectedVideo} scope={"watch-page"} />
        </div>
        <div className='secondary-column'>
          <Secondary />
        </div>
      </div>
    </>
  );
}
