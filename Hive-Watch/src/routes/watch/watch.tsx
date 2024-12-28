import { useLocation, useNavigate } from "../../AppRouter/components/Provider";
import { useAppSelector } from "../../store/hooks/hooks";
import Player from "./components/player/player";
import Secondary from "./components/secondary_content/secondary_content";
import "./watch.css";

export default function Watch() {
  const { selectedVideo } = useAppSelector((state) => state.watch);
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  if (!search && pathname === "/watch") {
    navigate("/");
  }
  return (
    <>
      <div className='columns'>
        <div className='main-column'>
          <Player videoDetails={selectedVideo} scope={"watch-page"} />
        </div>
        <div className='secondary-column'>
          <Secondary />
        </div>
      </div>
    </>
  );
}
