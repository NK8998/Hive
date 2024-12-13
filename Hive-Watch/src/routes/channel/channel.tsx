import { Link, useNavigate } from "react-router-dom";
import Featured from "./sub-components/featured/featured";
import ChannelVideos from "./sub-components/videos/videos";
import { ReactNode, useLayoutEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks/hooks";

export default function Channel() {
  const navigate = useNavigate();
  const { channel, subRoute } = useAppSelector((state) => state.app.channelParams);
  const [currentChild, setCurrentChild] = useState<ReactNode>(<Featured />);

  useLayoutEffect(() => {
    const childToRender = () => {
      switch (subRoute) {
        case "featured":
          return <Featured />;
        case "videos":
          return <ChannelVideos />;
        default:
          return <Featured />; // Default to Featured or any other default component
      }
    };
    setCurrentChild(childToRender());
  }, [subRoute]);

  return (
    <div className='route-inner'>
      <h1>Channel</h1>
      <Link to={"/"}>
        <h1>HOME</h1>
      </Link>
      <Link to={"/history"}>to history</Link>
      <div className='channel-content-page-swapper'>
        <button onClick={() => navigate(`/${channel}/featured`)}>Home</button>
        <button onClick={() => navigate(`/${channel}/videos`)}>Videos</button>
        <button onClick={() => navigate(`/${channel}/shorts`)}>Shorts</button>
        <button onClick={() => navigate(`/${channel}/live`)}>Live</button>
        <button onClick={() => navigate(`/${channel}/playlists`)}>Playlists</button>
      </div>
      <div className='channel-content'>{currentChild}</div>
    </div>
  );
}
