// Should be reusable

import { useEffect } from "react";
import { VideoDetailsProps } from "../../../../types/player_types";
import "./player.css";
import { PlayerProvider, usePlayerContext } from "./context";
import Captions from "./components/captions/captions";
import Chapters from "./components/chapters/chapters";
import VideoEl from "./components/videoEl/videoEl";
import { useAppSelector } from "../../../../store/hooks/hooks";
import BottomControls from "./components/bottom_controls/bottom_controls";

export default function Player({ videoDetails }: VideoDetailsProps) {
  return (
    <PlayerProvider>
      <PlayerContent videoDetails={videoDetails} />
    </PlayerProvider>
  );
}

export function PlayerContent({ videoDetails }: VideoDetailsProps) {
  const { video_id } = videoDetails;
  const { attatchPlayer, detachPlayer, _videoDetails, setVideoDetails } = usePlayerContext();
  const { targetRoute } = useAppSelector((state) => state.app);
  const isWatchPage = targetRoute === "/watch";

  useEffect(() => {
    if (_videoDetails && isWatchPage) {
      attatchPlayer();
    } else if (!isWatchPage) {
      detachPlayer();
    }
  }, [_videoDetails, targetRoute]);

  useEffect(() => {
    setVideoDetails(videoDetails);
  }, [video_id]);

  return (
    <div className='html5-player-container'>
      <Captions />
      <Chapters />
      <VideoEl />
      <BottomControls />
    </div>
  );
}
