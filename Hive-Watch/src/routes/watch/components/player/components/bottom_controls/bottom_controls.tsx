import { useEffect } from "react";
import { usePlayerContext } from "../../context";

export default function BottomControls() {
  const { player } = usePlayerContext();

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      const videoElement = document.querySelector(".html5-player") as HTMLVideoElement;
      if (e.key === " ") {
        videoElement.paused ? videoElement.play() : videoElement.pause();
      }
    });
  }, [player]);
  return <div className='bottom-controls'></div>;
}
