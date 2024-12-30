import { useEffect } from "react";
import generateChapters from "../../utils/generate_chapters";
import { usePlayerContext } from "../../context";

export default function Chapters() {
  const { _videoDetails, chapters, setChapters, playerDimensions } =
    usePlayerContext();
  useEffect(() => {
    if (!_videoDetails) return;
    const description = _videoDetails?.description_string ?? "";
    const duration = Math.trunc(_videoDetails?.duration ?? 50);

    setChapters(generateChapters(description, duration));
  }, [_videoDetails]);

  useEffect(() => {
    // console.log(playerDimensions);
    // update chapter styles here
  }, [playerDimensions]);
  console.log(chapters);

  // generate chapter containers directly

  return <div className='chapters-container'></div>;
}
