import { useEffect } from "react";
import "./App.css";
import PageManager from "./routes/page_manager";
import Guide from "./shell/guide/guide";
import Masthead from "./shell/masthead/masthead";
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
