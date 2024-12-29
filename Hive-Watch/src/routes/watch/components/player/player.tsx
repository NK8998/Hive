// Should be reusable

import { useEffect, useState } from "react";
import { VideoDetails } from "../../../../types/player_types";
import "./player.css";

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
    <PlayerProvider initialDetails={videoDetails} scope={scope}>
      <PlayerContent />
    </PlayerProvider>
  );
}

export function PlayerContent({}) {
  const { player, loadManifest, unloadManifest, _videoDetails, playerScope } =
    usePlayerContext();

  useEffect(() => {
    if (_videoDetails) {
      loadManifest();
    } else {
      unloadManifest();
    }
  }, [_videoDetails, player]);

  return (
    <div className='html5-player-container' data-scope={playerScope}>
      <Captions />
      <Chapters />
      <VideoEl />
      <BottomControls />
    </div>
  );
}
