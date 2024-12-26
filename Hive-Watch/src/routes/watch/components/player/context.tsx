import { createContext, useContext, useEffect, useRef, useState } from "react";
import { PlayerContextProps, VideoDetailsProps } from "../../../../types/player_types";
import shaka from "shaka-player/dist/shaka-player.ui.js";

const PlayerContext = createContext<PlayerContextProps | null>(null);

export const PlayerProvider = ({ children }: any) => {
  const [videoDetails, setVideoDetails] = useState<VideoDetailsProps>({});
  const [player, setPlayer] = useState(null);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
  const attempts = useRef(0);
  const mpdUrl = useRef<string>("");

  useEffect(() => {
    if (!player) return;
    player.attach(videoElement);

    player.configure({
      manifest: {
        dash: {
          ignoreMinBufferTime: true,
        },
      },
      streaming: {
        bufferingGoal: 100,
        rebufferingGoal: 2,
      },
    });

    // Listen for error events
    player.addEventListener("error", (event) => {
      console.error("Error code", event.detail);
    });

    player.addEventListener("trackschanged", () => {
      console.log("Tracks have been loaded!");
    });
    player.addEventListener("adaptation", (value) => {});

    // Load the manifest
    player
      .load(mpdUrl.current)
      .then(() => {})
      .catch(onError);
  }, [player]);

  const attatchPlayer = async (mpd_url: string) => {
    const manifestUri = mpd_url || "";

    if (manifestUri.length === 0 || !manifestUri.includes("http") || !videoElement) return;
    mpdUrl.current = mpd_url;
    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
      setPlayer(new shaka.Player());

      const videoContainer = document.querySelector(".captions-container-relative");

      // new shaka.ui.Overlay(playerRef.current, videoContainer, videoElement);
    } else {
      console.error("Shaka Player is not supported on this browser.");
    }
  };

  async function onError(error) {
    detachPlayer();
    console.error("Error code", error.code, "object", error);
    if (attempts.current > 2) {
      // alert user his browser can't play the content based on error.code
      console.error("Your browser cannot play this content unfortunately");
      return;
    }
    attatchPlayer(mpdUrl.current);
    attempts.current += 1;
  }

  async function detachPlayer() {
    if (videoElement) {
      setPlayer(null);
      shaka.Player.unload();
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        videoElement,
        setVideoElement,
        player,
        setPlayer,
        videoDetails,
        setVideoDetails,
        attatchPlayer,
        detachPlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);

  if (!context) throw new Error("Context does not exist");
  return context;
};
