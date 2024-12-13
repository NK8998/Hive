import { Route, Routes } from "react-router-dom";
import "./App.css";
import PageManager from "./routes/page-manager";

function App() {
  return (
    <Routes>
      <Route path='*' element={<PageManager />} />
    </Routes>
  );
}

export default App;
