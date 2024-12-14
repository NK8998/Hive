import { nanoid } from "nanoid";
import { useAppDispatch } from "../../hooks/hooks";
import { updateSelectedVideo } from "./slice";
import { useLocation } from "../../../AppRouter/components/Provider";

const useFetchSelectedVideo = () => {
  const dispatch = useAppDispatch();
  const { pathname, search } = useLocation();
  console.log(pathname, search);

  const fetchSelectedVideo = async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 3000);
    });
    dispatch(updateSelectedVideo({ videoId: nanoid(8), url: "http:://example.com/output.mpd" }));
  };

  return fetchSelectedVideo;
};

export default useFetchSelectedVideo;
