import { useEffect } from "react";
import "./App.css";
import PageManager from "./routes/page_manager";
import { useAppDispatch } from "./store/hooks/hooks";
import { updateWindowWidth } from "./store/app/slice";
import Guide from "./shell/guide/guide";
import Masthead from "./shell/masthead/masthead";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(updateWindowWidth(window.innerWidth));
    });
  }, []);

  return (
    <>
      <Masthead />
      <div className='hvd-app-flexy'>
        <Guide />
        <PageManager />
      </div>
    </>
  );
}

export default App;
