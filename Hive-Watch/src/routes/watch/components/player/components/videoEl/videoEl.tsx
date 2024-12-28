import { useEffect } from "react";
import { useAppSelector } from "../../../../../../store/hooks/hooks";
import { usePlayerContext } from "../../context";

export default function VideoEl() {
  const { windowWidth } = useAppSelector((state) => state.app);
  const { _videoDetails } = usePlayerContext();

  const calculateWidth = () => {
    const app = document.querySelector("#hvd-app");
    const secondaryRef = document.querySelector(".secondary-column");
    if (!app || !secondaryRef || !_videoDetails) return;

    const aspectRatio =
      _videoDetails?.aspect_ratio > 1.1 ? _videoDetails?.aspect_ratio : 16 / 9;
    const windowWidth = app.clientWidth;
    const windowHeight = window.innerHeight;
    const gaps = window.innerWidth >= 1041 ? 80 : 46;
    const maxVideoHeight = (73.9 * window.innerHeight) / 100;
    const secondaryRefWidth = window.innerWidth >= 1041 ? 400 : 0;

    const remainingSpace = windowWidth - (gaps + secondaryRefWidth);
    // const aspect_ratio = wideScreen ? 1920 / 1080 : 16 / 9;

    let videoHeight =
      remainingSpace * aspectRatio > maxVideoHeight
        ? maxVideoHeight
        : remainingSpace * aspectRatio;
    let videoWidth = videoHeight * aspectRatio;

    // Check if the videoWidth is greater than the remainingSpace
    if (videoWidth > remainingSpace) {
      // Adjust the videoWidth and videoHeight to fit the remaining space
      videoWidth = remainingSpace;
      videoHeight = videoWidth * (1 / aspectRatio);
    }

    if (videoWidth >= 1280) {
      videoWidth = 1280;
      videoHeight = videoWidth * (1 / aspectRatio);
    }

    const newRatio = 16 / 9;
    const theatreWidth = windowWidth;
    const calculatedHeight = windowWidth * (1 / newRatio);
    const maxHeight = 0.795 * windowHeight;
    let theatreHeight = Math.trunc(
      calculatedHeight > maxHeight ? maxHeight : calculatedHeight
    );
    if (theatreHeight < 0.55 * window.screen.height) {
      theatreHeight = Math.trunc(0.55 * window.screen.height);
    }

    document.documentElement.style.setProperty(
      "--normalPlayerHeight",
      `${Math.round(videoHeight)}px`
    );
    document.documentElement.style.setProperty(
      "--normalPlayerWidth",
      `${Math.round(videoWidth)}px`
    );

    document.documentElement.style.setProperty(
      "--theatreHeight",
      `${Math.trunc(theatreHeight)}px`
    );
    document.documentElement.style.setProperty(
      "--theatreWidth",
      `${Math.trunc(theatreWidth - 1)}px`
    );

    document.documentElement.style.setProperty(
      "--fullScreenHeight",
      `${window.screen.height}px`
    );
    document.documentElement.style.setProperty(
      "--fullScreenWidth",
      `${window.screen.width}px`
    );
  };

  useEffect(() => {
    calculateWidth();
  }, [windowWidth, _videoDetails?.video_id]);

  return <video className='html5-player'></video>;
}
