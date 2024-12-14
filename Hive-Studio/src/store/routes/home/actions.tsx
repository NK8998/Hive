import { useLocation } from "../../../AppRouter/components/Provider";
import { useAppDispatch } from "../../hooks/hooks";
import { updateInitialFetch } from "./slice";

const useFetchHomeVideos = () => {
  const dispatch = useAppDispatch();
  const { pathname, search } = useLocation();
  console.log(pathname, search);

  const fetchVideos = async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 3000);
    });
    dispatch(updateInitialFetch(["vid1", "vid2"]));
  };

  return fetchVideos;
};

export default useFetchHomeVideos;
