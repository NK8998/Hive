import { useEffect } from "react";
import "./captions.css";
import { usePlayerContext } from "../../context";

export default function Captions() {
  const { player } = usePlayerContext();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!player) return;
      if (e.key.toLocaleLowerCase() === "c") {
        const captions_url =
          "https://getting-started8998.s3.ap-south-1.amazonaws.com/HLQKrW-rqrf/captions/captions.vtt";
        player
          ?.addTextTrackAsync(captions_url, "en", "subtitles", "text/vtt")
          .then(function () {
            console.log("Subtitle track added");
          })
          .catch(function (error) {
            console.error("Error adding subtitle track:", error);
          });
        player?.setTextTrackVisibility(true);
      }
    };
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [player]);
  return (
    <div className='captions-container-absolute'>
      <div className='captions-container-relative'></div>
    </div>
  );
}
