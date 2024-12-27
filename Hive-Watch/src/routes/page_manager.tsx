import AppRouter from "../AppRouter/AppRouter";
import NotFound from "../AppRouter/components/404/NotFound";
import { useLocation } from "../AppRouter/components/Provider";
import Route from "../AppRouter/components/Route";
import { useAppDispatch } from "../store/hooks/hooks";
import { fetchVideos } from "../store/routes/home/actions";
import { fetchSelectedVideo } from "../store/routes/watch/actions";
import Channel from "./channel/channel";
import Features from "./channel/subRoutes/features";
import Inner from "./channel/subRoutes/inner";
import Inner2 from "./channel/subRoutes/inner2";
import Videos from "./channel/subRoutes/videos";
import History from "./history/history";
import Home from "./home/home";
import Watch from "./watch/watch";

export default function PageManager() {
  const { pathname, search } = useLocation();
  const dispatch = useAppDispatch();

  const handleAction = async (func: any) => {
    await dispatch(func(pathname, search));
  };
  return (
    <div className='page-manager'>
      <AppRouter cacheEnabled>
        <Route
          element={<Home />}
          path='/'
          prefetch
          action={() => handleAction(fetchVideos)}
        />
        <Route
          element={<Watch />}
          path='/watch'
          prefetch
          action={() => handleAction(fetchSelectedVideo)}
        />
        <Route element={<Channel />} path='/:channelName' prefetch>
          <Route element={<Features />} path={`:featured`} index prefetch />
          <Route element={<Videos />} path={`videos/more`} prefetch>
            <Route element={<Inner />} path={"inner"} prefetch>
              <Route element={<Inner2 />} path={":inner2"} prefetch />
              <Route element={<Inner />} path='/shouldwork' prefetch />
            </Route>
          </Route>
        </Route>
        <Route path='/history' element={<History />} prefetch />
        {/* Wild card route always at bottom */}
        <Route path='*' element={<NotFound />} />
      </AppRouter>
    </div>
  );
}
