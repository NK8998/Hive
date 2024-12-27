import { useEffect } from "react";
import "./App.css";
import PageManager from "./Routes/page_manager";
import Guide from "./Shell/Guide/guide";
import Masthead from "./Shell/Masthead/masthead";
import { useAppDispatch } from "./store/hooks/hooks";
import { updateWindowWidth } from "./store/app/slice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(updateWindowWidth(window.innerWidth));
    });
  }, []);
  return (
    <div className='hvd-app'>
      <Masthead />
      <div className='hvd-app-flexy'>
        <Guide />
        <PageManager />
      </div>
    </div>
  );
}

export default App;
