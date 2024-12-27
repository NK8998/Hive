import { useEffect } from "react";
import { usePlayerContext } from "../../context";
import generateChapters from "../../utils/generateChapters";

export default function Chapters() {
  const { _videoDetails, chapters, setChapters } = usePlayerContext();
  useEffect(() => {
    if (!_videoDetails) return;
    const description = _videoDetails?.description_string ?? "";
    const duration = Math.trunc(_videoDetails?.duration ?? 50);

    setChapters(generateChapters(description, duration));
  }, [_videoDetails]);

  return <div className='chapters-container'></div>;
}
