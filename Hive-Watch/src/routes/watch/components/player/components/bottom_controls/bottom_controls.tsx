import { useEffect } from "react";
import { usePlayerContext } from "../../context";

export default function BottomControls() {
  const { player, playerScope, getPlayerElements } = usePlayerContext();

  useEffect(() => {
    const handleSpaceClick = (e: KeyboardEvent) => {
      e.preventDefault();
      const { videoElement } = getPlayerElements();

      if (!videoElement) return;

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
