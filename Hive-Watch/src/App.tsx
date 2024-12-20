import "./App.css";
import AppRouter from "./AppRouter/AppRouter";
import NotFound from "./AppRouter/components/404/NotFound";
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
import Guide from "./Shell/Guide/guide";
import Masthead from "./Shell/Masthead/masthead";
import { useAppDispatch } from "./store/hooks/hooks";
import { fetchVideos } from "./store/routes/home/actions";
import { fetchSelectedVideo } from "./store/routes/watch/actions";

function App() {
  const { pathname, search } = useLocation();
  const dispatch = useAppDispatch();

  const handleAction = async (func: any) => {
    dispatch(func(pathname, search));
  };

  return (
    <div className='hvd-app'>
      <Masthead />
      <div className='hvd-app-main'>
        <Guide />
        <div className='page-manager'>
          <AppRouter>
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
              action={() =>
                handleAction(fetchSelectedVideo)
              }
            />
            <Route
              element={<Channel />}
              path='/:channelName'
              prefetch
            >
              <Route
                element={<Features />}
                path={`:featured`}
                index
                prefetch
              />
              <Route
                element={<Videos />}
                path={`videos/more`}
                prefetch
              >
                <Route
                  element={<Inner />}
                  path={"inner"}
                  prefetch
                >
                  <Route
                    element={<Inner2 />}
                    path={":inner2"}
                    prefetch
                  />
                  <Route
                    element={<Inner />}
                    path='/shouldwork'
                    prefetch
                  />
                </Route>
              </Route>
            </Route>
            <Route
              path='/history'
              element={<History />}
              prefetch
            />
            {/* Wild card route always at bottom */}
            <Route path='*' element={<NotFound />} />
          </AppRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
