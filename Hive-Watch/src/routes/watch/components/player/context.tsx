import "./utils/shaka_global.js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Chapter,
  PlayerBounds,
  PlayerContextProps,
  VideoDetails,
} from "../../../../types/player_types";

const PlayerContext = createContext<PlayerContextProps | null>(null);

interface playerProviderProps {
  children: ReactNode[] | ReactNode;
  initialDetails: VideoDetails | null;
  scope: string;
  _playerBounds: PlayerBounds | null;
}

export const PlayerProvider = ({
  children,
  initialDetails,
  scope,
  _playerBounds,
}: playerProviderProps) => {
  const [_videoDetails, setVideoDetails] = useState<VideoDetails | null>(
    initialDetails
  );
  const [playerBounds, setPlayerBounds] = useState<PlayerBounds | null>(
    _playerBounds
  );
  const [player, setPlayer] = useState<shaka.Player | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [playerScope, setPlayerScope] = useState<string>(scope);
  const [playerDimensions, setPlayerDimensions] = useState<DOMRect | null>(
    null
  );

  const attempts = useRef(0);

  useLayoutEffect(() => {
    setPlayerBounds(_playerBounds);
  }, [_playerBounds]);

  useEffect(() => {
    setVideoDetails(initialDetails);
  }, [initialDetails?.video_id]);

  useEffect(() => {
    setUpPlayer();
  }, []);

  const getPlayerElements = () => {
    const playerContainer = document.querySelector(
      `.html5-player-container[data-scope="${playerScope}"]`
    ) as HTMLDivElement | null;

    if (!playerContainer) return {};

    const captionsContainer = playerContainer.querySelector(
      ".captions-container-relative"
    ) as HTMLDivElement;

    const videoElement = playerContainer.querySelector(
      ".html5-player"
    ) as HTMLVideoElement;

    // add any other container elements we want to query

    return { playerContainer, captionsContainer, videoElement };
  };

  const loadManifest = () => {
    const manifestUri = _videoDetails?.mpd_url || "";
    if (manifestUri.length === 0 || !manifestUri.includes("http") || !player)
      return;

    console.log("loading...");

    // Load the manifest
    player
      .load(manifestUri)
      .then(() => {
        console.log("manifest loaded");
      })
      .catch(async (error) => {
        await unloadManifest();
        console.error("Error code", error.code, "object", error);
        if (attempts.current > 2) {
          // alert user his browser can't play the content based on error.code
          console.error("Your browser cannot play this content unfortunately");
          return;
        }
        loadManifest();
        attempts.current += 1;
      });
  };

  const setUpPlayer = async () => {
    await unloadManifest();
    const { videoElement, captionsContainer } = getPlayerElements();

    if (!videoElement || !captionsContainer) return;

    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
      const player = new shaka.Player();

      new shaka.ui.Overlay(player, captionsContainer, videoElement);

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
      player.addEventListener("adaptation", (event) => {
        // console.log(event);
      });

      setPlayer(player);
    } else {
      console.error("Shaka Player is not supported on this browser.");
    }
  };

  async function unloadManifest() {
    if (player) {
      await player.unload();
      console.log("unloaded");
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
        playerScope,
        setPlayerScope,
        playerBounds,
        setPlayerBounds,
        playerDimensions,
        setPlayerDimensions,
        loadManifest,
        unloadManifest,
        getPlayerElements,
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
