import { useLayoutEffect } from "react";
import { useAppSelector } from "../../../../../../store/hooks/hooks";
import { usePlayerContext } from "../../context";

export default function VideoEl() {
  const { theatreMode } = useAppSelector((state) => state.watch);
  const {
    _videoDetails,
    playerBounds,
    getPlayerElements,
    playerScope,
    setPlayerDimensions,
  } = usePlayerContext();

  const calculateWidth = () => {
    if (!_videoDetails || !playerBounds) return;

    const { maxHeight, maxWidth, availableSpace } = playerBounds;

    const { playerContainer } = getPlayerElements();
    let aspectRatio =
      _videoDetails?.aspect_ratio > 1.1 ? _videoDetails?.aspect_ratio : 16 / 9;

    if (theatreMode && playerScope === "watch-page") aspectRatio = 16 / 9;
    let videoHeight =
      availableSpace * aspectRatio > maxHeight
        ? maxHeight
        : availableSpace * aspectRatio;
    let videoWidth = videoHeight * aspectRatio;

    // Check if the videoWidth is greater than the remainingSpace
    if (videoWidth > availableSpace) {
      // Adjust the videoWidth and videoHeight to fit the remaining space
      videoWidth = availableSpace;
      videoHeight = videoWidth * (1 / aspectRatio);
    }

    if (videoWidth > maxWidth) {
      videoWidth = maxWidth;
      videoHeight = videoWidth * (1 / aspectRatio);
    }

    if (!playerContainer) return;
    playerContainer.style.width = `${videoWidth}px`;
    playerContainer.style.height = `${videoHeight}px`;
    requestAnimationFrame(() => {
      setPlayerDimensions(playerContainer.getBoundingClientRect());
    });
  };

  useLayoutEffect(() => {
    calculateWidth();
  }, [_videoDetails?.video_id, playerBounds]);

  return <video className='html5-player'></video>;
}
