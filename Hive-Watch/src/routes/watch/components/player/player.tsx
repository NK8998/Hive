// Should be reusable

import { useEffect } from "react";
import { VideoDetails } from "../../../../types/player_types";
import "./player.css";

import { useBrowserContext } from "../../../../AppRouter/components/Provider";
import { PlayerProvider, usePlayerContext } from "./context";
import Captions from "./components/captions/captions";
import Chapters from "./components/chapters/chapters";
import VideoEl from "./components/videoEl/videoEl";
import BottomControls from "./components/bottom_controls/bottom_controls";

interface playerProps {
  videoDetails: VideoDetails | null;
  scope: string;
}

export default function Player({ videoDetails, scope }: playerProps) {
  return (
    <PlayerProvider>
      <PlayerContent videoDetails={videoDetails} scope={scope} />
    </PlayerProvider>
  );
}

interface playerContentProps {
  videoDetails: VideoDetails | null;
  scope: string;
}

export function PlayerContent({ videoDetails, scope }: playerContentProps) {
  const {
    attatchPlayer,
    detachPlayer,
    _videoDetails,
    setVideoDetails,
    playerScope,
    setPlayerScope,
  } = usePlayerContext();
  const { targetRoute } = useBrowserContext();
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
    setPlayerScope(scope);
  }, [videoDetails?.video_id]);

  if (!videoDetails || !playerScope) return null;

  return (
    <div className='html5-player-container' data-scope={scope}>
      <Captions />
      <Chapters />
      <VideoEl />
      <BottomControls />
    </div>
  );
}
