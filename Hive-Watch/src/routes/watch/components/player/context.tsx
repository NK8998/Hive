import { createContext, useContext, useRef, useState } from "react";
import { Chapter, PlayerContextProps, VideoDetails } from "../../../../types/player_types";
import { shakaTyped } from "./utils/typed_shaka";

const PlayerContext = createContext<PlayerContextProps | null>(null);

export const PlayerProvider = ({ children }: any) => {
  const [_videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [player, setPlayer] = useState<shaka.Player | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const attempts = useRef(0);

  const attatchPlayer = async () => {
    const videoElement = document.querySelector(".html5-player") as HTMLVideoElement;
    const manifestUri = _videoDetails?.mpd_url || "";

    if (manifestUri.length === 0 || !manifestUri.includes("http") || !videoElement) return;

    shakaTyped.polyfill.installAll();
    if (shakaTyped.Player.isBrowserSupported()) {
      const player = new shakaTyped.Player();

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
        console.error("Error code", event);
      });

      player.addEventListener("trackschanged", () => {
        console.log("Tracks have been loaded!");
      });
      player.addEventListener("adaptation", (value: any) => {});

      // Load the manifest
      player
        .load(manifestUri)
        .then(() => {})
        .catch(onError);

      setPlayer(player);
    } else {
      console.error("Shaka Player is not supported on this browser.");
    }
  };

  async function onError(error: any) {
    detachPlayer();
    console.error("Error code", error.code, "object", error);
    if (attempts.current > 2) {
      // alert user his browser can't play the content based on error.code
      console.error("Your browser cannot play this content unfortunately");
      return;
    }
    attatchPlayer();
    attempts.current += 1;
  }

  async function detachPlayer() {
    if (player) {
      setPlayer(null);
      player.unload();
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        player,
        setPlayer,
        _videoDetails,
        setVideoDetails,
        chapters,
        setChapters,
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
