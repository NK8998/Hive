import { useEffect } from "react";
import { VideoDetailsProps } from "../../../../types/player_types";
import "./player.css";
import { PlayerProvider, usePlayerContext } from "./context";
import Captions from "./components/captions/captions";
import Chapters from "./components/chapters/chapters";
import VideoEl from "./components/videoEl/videoEl";
import { useAppSelector } from "../../../../store/hooks/hooks";

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

  useEffect(() => {
    if (_videoDetails) {
      attatchPlayer();
    }
  }, [_videoDetails, targetRoute]);

  useEffect(() => {
    setVideoDetails(videoDetails);

    if (targetRoute !== "/watch") {
      detachPlayer();
    }

    // Clean up
    return () => {
      detachPlayer();
    };
  }, [video_id, targetRoute]);

  return (
    <div className='html5-player-container'>
      <Captions />
      <Chapters />
      <VideoEl />
    </div>
  );
}

// Should be reusable
