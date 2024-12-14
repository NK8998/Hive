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
  // Main functions that run for fetching initial component data
  const fetchVideos = useFetchHomeVideos();
  const fetchSelectedVideo = useFetchSelectedVideo();
  // Main functions that run for fetching initial component data

  return (
    <AppRouter cacheEnabled>
      <Route component={<Home />} path='/' prefetch action={fetchVideos} />
      <Route component={<Watch />} path='/watch' prefetch action={fetchSelectedVideo} />
      <Route component={<Channel />} path='/:channelName/:subRoute?' prefetch>
        <Route component={<Features />} path={`/`} prefetch />
        <Route component={<Videos />} path={`/videos`} prefetch />
      </Route>
    </AppRouter>
  );
}

export default App;
