import { useEffect } from "react";
import { usePlayerContext } from "../../context";

export default function BottomControls() {
  const { player, playerScope } = usePlayerContext();

  useEffect(() => {
    const handleSpaceClick = (e: KeyboardEvent) => {
      e.preventDefault();
      const playerContainer = document.querySelector(
        `.html5-player-container[data-scope="${playerScope}"]`
      );

      if (!playerContainer) return;

      const videoElement = playerContainer.querySelector(
        ".html5-player"
      ) as HTMLVideoElement;

      if (e.key === " ") {
        videoElement.paused ? videoElement.play() : videoElement.pause();
      }
    };

    document.addEventListener("keypress", handleSpaceClick);

    return () => {
      document.removeEventListener("keypress", handleSpaceClick);
    };
  }, [player, playerScope]);
  return <div className='bottom-controls'></div>;
}
