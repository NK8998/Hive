import { useEffect } from "react";
import { usePlayerContext } from "../../context";
import { shakaTyped } from "../../utils/typed_shaka";

export default function Captions() {
  const { player } = usePlayerContext();

  useEffect(() => {
    const captionContainer = document.querySelector(".captions-container-relative") as HTMLDivElement;
    const videoElement = document.querySelector(".html5-player") as HTMLVideoElement;

    if (!player || !captionContainer || !videoElement) return;

    while (captionContainer.firstChild) {
      captionContainer.removeChild(captionContainer.firstChild);
    }

    new shakaTyped.ui.Overlay(player, captionContainer, videoElement);
  }, [player]);
  return (
    <div className='captions-container-relative'>
      <div className='captions-inner'></div>
    </div>
  );
}
