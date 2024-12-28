import { useEffect } from "react";
import generateChapters from "../../utils/generate_chapters";
import { usePlayerContext } from "../../context";

export default function Chapters() {
  const { _videoDetails, chapters, setChapters } = usePlayerContext();
  useEffect(() => {
    if (!_videoDetails) return;
    const description = _videoDetails?.description_string ?? "";
    const duration = Math.trunc(_videoDetails?.duration ?? 50);

    setChapters(generateChapters(description, duration));
  }, [_videoDetails]);

  useEffect(() => {
    console.log(chapters);
  }, [chapters]);

  return <div className='chapters-container'></div>;
}
