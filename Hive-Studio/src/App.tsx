import "./App.css";
import AppRouter from "./AppRouter/AppRouter";
import Route from "./AppRouter/components/Route";
import Channel from "./Routes/channel/channel";
import Features from "./Routes/channel/subRoutes/features";
import Videos from "./Routes/channel/subRoutes/videos";
import Home from "./Routes/home/home";
import Watch from "./Routes/watch/watch";
import useFetchHomeVideos from "./store/routes/home/actions";
import useFetchSelectedVideo from "./store/routes/watch/actions";

function App() {
  // Main functions that run for fetching initial element data
  const fetchVideos = useFetchHomeVideos();
  const fetchSelectedVideo = useFetchSelectedVideo();
  // Main functions that run for fetching initial element data

  return (
    <AppRouter cacheEnabled>
      <Route element={<Home />} path='/' prefetch action={fetchVideos} />
      <Route element={<Watch />} path='/watch' prefetch action={fetchSelectedVideo} />
      <Route element={<Channel />} path='/:channelName' prefetch>
        <Route element={<Features />} path={`featured`} prefetch />
        <Route element={<Videos />} path={`videos`} prefetch />
      </Route>
    </AppRouter>
  );
}

export default App;
