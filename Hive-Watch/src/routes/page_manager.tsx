import AppRouter from "../AppRouter/AppRouter";
import NotFound from "../AppRouter/components/404/NotFound";
import Route from "../AppRouter/components/Route";
import { useAppDispatch } from "../store/hooks/hooks";
import { fetchVideos } from "../store/routes/home/actions";
import { fetchSelectedVideo } from "../store/routes/watch/actions";
import Channel from "./channel/channel";
import Features from "./channel/sub_routes/features";
import Inner from "./channel/sub_routes/inner";
import Inner2 from "./channel/sub_routes/inner2";
import Videos from "./channel/sub_routes/videos";
import History from "./history/history";
import Home from "./home/home";
import Watch from "./watch/watch";

export default function PageManager() {
  const dispatch = useAppDispatch();

  const handleAction = async (func: any) => {
    await dispatch(func());
  };
  return (
    <div className='page-manager'>
      <AppRouter cacheEnabled>
        <Route
          element={<Home />}
          path='/'
          prefetch
          action={() => handleAction(fetchVideos)}
          classList='home'
        />
        <Route
          element={<Watch />}
          path='/watch'
          prefetch
          action={() => handleAction(fetchSelectedVideo)}
          classList='watch'
        />
        <Route
          element={<Channel />}
          path='/:channelName'
          classList='channel'
          prefetch
        >
          <Route element={<Features />} path={`:featured`} index prefetch />
          <Route element={<Videos />} path={`videos/more`} prefetch>
            <Route element={<Inner />} path={"inner"} prefetch>
              <Route element={<Inner2 />} path={":inner2"} prefetch />
              <Route element={<Inner />} path='/shouldwork' prefetch />
            </Route>
          </Route>
        </Route>
        <Route
          path='/history'
          element={<History />}
          classList='history'
          prefetch
        />
        {/* Wild card route always at bottom */}
        <Route path='*' element={<NotFound />} />
      </AppRouter>
    </div>
  );
}
