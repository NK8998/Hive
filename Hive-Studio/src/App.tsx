import "./App.css";
import AppRouter from "./AppRouter/AppRouter";
import { useLocation } from "./AppRouter/components/Provider";
import Route from "./AppRouter/components/Route";
import Channel from "./Routes/channel/channel";
import Features from "./Routes/channel/subRoutes/features";
import Inner from "./Routes/channel/subRoutes/inner";
import Inner2 from "./Routes/channel/subRoutes/inner2";
import Videos from "./Routes/channel/subRoutes/videos";
import History from "./Routes/history/history";
import Home from "./Routes/home/home";
import Watch from "./Routes/watch/watch";
import { useAppDispatch } from "./store/hooks/hooks";
import { fetchVideos } from "./store/routes/home/actions";
import useFetchSelectedVideo, { fetchSelectedVideo } from "./store/routes/watch/actions";

function App() {
  const { pathname, search } = useLocation();
  const dispatch = useAppDispatch();

  return (
    <AppRouter cacheEnabled>
      <Route
        element={<Home />}
        path='/'
        prefetch
        action={() => dispatch(fetchVideos(pathname, search))}
      />
      <Route
        element={<Watch />}
        path='/watch'
        prefetch
        action={() => dispatch(fetchSelectedVideo(pathname, search))}
      />
      <Route element={<Channel />} path='/:channelName' prefetch>
        <Route element={<Features />} path={`:featured`} index prefetch />
        <Route element={<Videos />} path={`videos`} prefetch>
          <Route element={<Inner />} path={"inner"} prefetch>
            <Route element={<Inner2 />} path={":inner2"} prefetch />
          </Route>
        </Route>
      </Route>
      <Route path='/history' element={<History />} prefetch />
    </AppRouter>
  );
}

export default App;
