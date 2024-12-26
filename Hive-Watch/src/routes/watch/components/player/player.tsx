import { useEffect, useRef } from "react";
import { VideoDetailsProps } from "../../../../types/player_types";
import "./player.css";
import { PlayerProvider, usePlayerContext } from "./context";

export default function Player({ videoDetails }: VideoDetailsProps) {
  return (
    <PlayerProvider>
      <PlayerContent videoDetails={videoDetails} />
    </PlayerProvider>
  );
}

export function PlayerContent({ videoDetails }: VideoDetailsProps) {
  const { title, mpd_url, video_id } = videoDetails;
  const videoRef = useRef<HTMLVideoElement>(null);
  const { videoElement, setVideoElement, attatchPlayer, detachPlayer, setVideoDetails } = usePlayerContext();

  useEffect(() => {
    if (videoElement) {
      attatchPlayer(mpd_url);
    }

    // Clean up
    return () => {
      detachPlayer();
    };
  }, [video_id, videoElement]);

  useEffect(() => {
    // Initializing the video element
    if (videoRef.current) {
      setVideoElement(videoRef.current);
    }
    setVideoDetails(videoDetails);
  }, []);

  return (
    <div className='html5-player-container'>
      <div className='captions-container-relative'></div>
      <video className='html5-player' ref={videoRef}></video>
    </div>
  );
}

// Should be reusable
