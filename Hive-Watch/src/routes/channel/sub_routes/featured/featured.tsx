import { useEffect } from "react";
import OutLet from "../../../../AppRouter/components/Outlet";
import Player from "../../../watch/components/player/player";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import { updateInitialFetch } from "../../../../store/routes/channel/slice";
import { useRouteProperties } from "../../../../AppRouter/components/RouteProperties";
import "./featured.css";

export default function Featured() {
  const { featured } = useAppSelector((state) => state.channel);
  const isHidden = useRouteProperties();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isHidden) {
      // or any other function to remove the video so unloading occurs
      dispatch(updateInitialFetch({ featuredVideo: null }));
    } else {
    }
  }, [isHidden]);
  return (
    <div className='featured'>
      <p>These are the featured content</p>
      <Player
        videoDetails={featured.featuredVideo}
        scope={"channel-featured"}
      />
      <OutLet />
    </div>
  );
}
